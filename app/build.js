// Generates plain Markdown (questions/*.md and the README index) from data/*.json.
// Usage: node app/build.js
const fs = require('fs');
const path = require('path');
const { loadProblems } = require('./problems-lib');
const resourcesLib = require('./resources-lib');

const ROOT = path.join(__dirname, '..');
const DATA_DIR = path.join(ROOT, 'data');
const OUT_DIR = path.join(ROOT, 'questions');
const README = path.join(ROOT, 'README.md');
const LEVELS = ['basic', 'intermediate', 'advanced'];
const START = '<!-- TOPICS:START -->';
const END = '<!-- TOPICS:END -->';
const P_START = '<!-- PROBLEMS:START -->';
const P_END = '<!-- PROBLEMS:END -->';
const PROBLEMS_DIR = path.join(ROOT, 'problems');

const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);

function loadTopics() {
  return fs
    .readdirSync(DATA_DIR)
    .filter((f) => f.endsWith('.json'))
    .map((f) => ({ slug: f.replace(/\.json$/, ''), ...JSON.parse(fs.readFileSync(path.join(DATA_DIR, f), 'utf8')) }))
    .sort((a, b) => a.name.localeCompare(b.name));
}

// Mimics GitHub's heading anchors so the table of contents links work.
function anchorFor(heading, seen) {
  const base = heading.toLowerCase().replace(/[^\p{L}\p{N}\s_-]/gu, '').replace(/\s/g, '-');
  const n = seen.get(base) || 0;
  seen.set(base, n + 1);
  return n ? `${base}-${n}` : base;
}


// ---- resources ("go and check the source") ----------------------------------------------------
const TYPE_LABEL = { 'official-docs': 'Official docs', tutorial: 'Tutorial', article: 'Article', video: 'Video', book: 'Book', course: 'Course', reference: 'Reference', tool: 'Tool', repo: 'Repository' };

function renderResources(items, heading = '## Resources') {
  if (!items || !items.length) return [];
  const out = [heading, '', 'Where to read more at the source. Official docs and references come first.', ''];
  const order = ['official-docs', 'reference', 'tutorial', 'course', 'book', 'article', 'video', 'tool', 'repo'];
  for (const type of order) {
    const group = items.filter((e) => e.type === type);
    if (!group.length) continue;
    out.push(`**${TYPE_LABEL[type]}**`, '');
    for (const e of group) out.push(`- [${e.title}](${e.url}) — ${e.description}${e.level ? ` _(${e.level})_` : ''}`);
    out.push('');
  }
  return out;
}

function renderQuestion(q, number) {
  const star = q.favorite ? '⭐ ' : '';
  const parts = [q.module && `Module: ${q.module}`, q.tags && q.tags.length && `Tags: ${q.tags.join(', ')}`].filter(Boolean);
  const tags = parts.length ? `\n\n_${parts.join(' · ')}_` : '';
  const num = number ? `${number}. ` : '';
  return `### ${num}${star}${q.question}\n\n${q.answer || '_No answer yet._'}${tags}\n`;
}

function renderTopic(topic) {
  const qs = topic.questions;
  const out = [`# ${topic.name}`, '', `[← Back to index](../README.md) · [⭐ Favorites](favorites.md)`, ''];
  const hasRes = resourcesLib.read(topic.slug).length > 0;
  out.push(`${qs.length} questions · ${qs.filter((q) => q.favorite).length} favorites${hasRes ? ' · [📚 Resources](#resources)' : ''}`, '');
  const groups = LEVELS.map((level) => ({ level, items: qs.filter((q) => q.level === level) })).filter((g) => g.items.length);
  let n = 0;
  const seen = new Map(LEVELS.map((l) => [cap(l).toLowerCase(), 0]));
  const toc = ['## Contents', ''];
  const body = [];
  const byModule = new Map(); // module -> [{ n, anchor }]
  for (const g of groups) {
    toc.push(`**${cap(g.level)}**`, '');
    body.push(`## ${cap(g.level)}`, '');
    for (const q of g.items) {
      n += 1;
      const heading = `${n}. ${q.favorite ? '⭐ ' : ''}${q.question}`;
      const anchor = anchorFor(heading, seen);
      toc.push(`- [${n}. ${q.question.replace(/([[\]])/g, '\\$1')}](#${anchor})`);
      if (q.module) byModule.set(q.module, [...(byModule.get(q.module) || []), { n, anchor }]);
      body.push(renderQuestion(q, n));
    }
    toc.push('');
  }
  const modules = byModule.size
    ? ['## Browse by module', '', '| Module | Questions |', '| --- | --- |',
        ...[...byModule].sort((a, b) => a[0].localeCompare(b[0])).map(([m, list]) => `| ${m} (${list.length}) | ${list.map((x) => `[${x.n}](#${x.anchor})`).join(' · ')} |`), '']
    : [];
  const res = renderResources(resourcesLib.read(topic.slug));
  return [...out, ...toc, ...modules, ...body, ...(res.length ? ['---', '', ...res] : [])].join('\n');
}

function renderFavorites(topics) {
  const out = ['# ⭐ Favorites', '', '[← Back to index](../README.md)', ''];
  let any = false;
  for (const t of topics) {
    const favs = t.questions.filter((q) => q.favorite);
    if (!favs.length) continue;
    any = true;
    out.push(`## [${t.name}](${t.slug}.md)`, '', ...favs.map((q) => renderQuestion({ ...q, favorite: false })));
  }
  if (!any) out.push('_Nothing starred yet._');
  return out.join('\n');
}

const GROUPS = JSON.parse(fs.readFileSync(path.join(__dirname, 'groups.json'), 'utf8'));
const groupRank = (g) => (GROUPS.includes(g) ? GROUPS.indexOf(g) : GROUPS.length);

function renderIndex(topics) {
  const row = (t) => {
    const n = (lvl) => t.questions.filter((q) => q.level === lvl).length;
    const favs = t.questions.filter((q) => q.favorite).length;
    return `| [${t.name}](questions/${t.slug}.md) | ${t.questions.length} | ${n('basic')} | ${n('intermediate')} | ${n('advanced')} | ${favs} |`;
  };
  const names = [...new Set(topics.map((t) => t.group || 'Other'))].sort((a, b) => groupRank(a) - groupRank(b) || a.localeCompare(b));
  const out = [START];
  for (const g of names) {
    out.push(`**${g}**`, '', '| Topic | Total | Basic | Intermediate | Advanced | ⭐ |', '| --- | ---: | ---: | ---: | ---: | ---: |',
      ...topics.filter((t) => (t.group || 'Other') === g).map(row), '');
  }
  out.push('[⭐ All favorites](questions/favorites.md)', END);
  return out.join('\n');
}


// ---- problems (code library) -------------------------------------------------------------------
/** Move "## " headings down by `by` levels, leaving code fences alone, so notes nest under the page structure. */
function shiftHeadings(md, by) {
  let fence = false;
  return md.split('\n').map((line) => {
    if (/^\s*```/.test(line)) fence = !fence;
    return !fence && /^#{1,6}\s/.test(line) ? '#'.repeat(Math.min(6, line.match(/^#+/)[0].length + by)) + line.replace(/^#+/, '') : line;
  }).join('\n');
}

const yesNo = (v) => (v === true ? 'yes' : v === false ? 'no' : '–');

function renderProblem(p, topics) {
  const byId = new Map(topics.flatMap((t) => t.questions.map((q) => [q.id, { q, t }])));
  const related = (p.related || []).map((id) => byId.get(id)).filter(Boolean)
    .map(({ q, t }) => `[${t.name}: ${q.question.replace(/[[\]]/g, '')}](../../questions/${t.slug}.md)`);
  const out = [`# ${p.title}`, '', '[← All problems](../README.md)', '', `> ${p.summary}`, '',
    `**Level:** ${p.level}${p.tags?.length ? ` · **Tags:** ${p.tags.join(', ')}` : ''}`, ''];
  if (related.length) out.push('**Related interview questions:**', '', ...related.map((r) => `- ${r}`), '');
  out.push(p.overview.trim(), '');
  const res = renderResources(resourcesLib.read(`problem-${p.slug}`), '## Further reading');
  if (res.length) out.push(...res);

  if (p.variants.length) {
    out.push('## Approaches', '', '| Approach | Best | Average | Worst | Space | Stable | In place | Languages |', '| --- | --- | --- | --- | --- | --- | --- | --- |');
    for (const v of p.variants) {
      const c = v.complexity || {};
      out.push(`| [${v.title}](#${anchorFor(v.title, new Map())}) | ${c.best || '–'} | ${c.average || '–'} | ${c.worst || '–'} | ${c.space || '–'} | ${yesNo(v.stable)} | ${yesNo(v.inPlace)} | ${v.files.map((f) => f.name).join(', ')} |`);
    }
    out.push('');
    for (const v of p.variants) {
      out.push(`## ${v.title}`, '', `> ${v.summary}`, '', shiftHeadings(v.notes.trim(), 1), '');
      if (v.files.length) {
        out.push('### Code', '', 'Every example prints the same output and is tested (`npm run problems:test`).', '');
        for (const f of v.files) out.push(`<details><summary>${f.name}</summary>`, '', '```' + f.fence, f.code.trimEnd(), '```', '', '</details>', '');
      }
      if (v.expected.trim()) out.push('### Expected output', '', '```text', v.expected.trim(), '```', '');
    }
  }
  return out.join('\n');
}

function renderProblemsIndex(problems) {
  const out = ['# Problems', '', '[← Back to the main index](../README.md)', '',
    'Popular interview problems with a written guide and tested code in several languages. Each problem explains the idea, how interviewers ask it, real-life uses, and every common approach from simple to optimal.', ''];
  if (!problems.length) return [...out, '_No problems yet._'].join('\n');
  out.push('| Problem | Level | Approaches | Languages | Summary |', '| --- | --- | --- | --- | --- |');
  for (const p of problems) {
    const langs = new Set(p.variants.flatMap((v) => v.files.map((f) => f.name)));
    out.push(`| [${p.title}](${p.slug}/README.md) | ${p.level} | ${p.variants.length} | ${langs.size} | ${p.summary} |`);
  }
  return out.join('\n');
}

function buildProblems(topics, readme) {
  const problems = loadProblems();
  if (!fs.existsSync(PROBLEMS_DIR)) return readme;
  for (const p of problems) fs.writeFileSync(path.join(PROBLEMS_DIR, p.slug, 'README.md'), renderProblem(p, topics));
  fs.writeFileSync(path.join(PROBLEMS_DIR, 'README.md'), renderProblemsIndex(problems));
  const block = [P_START, problems.length
    ? ['| Problem | Approaches | Languages |', '| --- | ---: | ---: |', ...problems.map((p) => `| [${p.title}](problems/${p.slug}/README.md) | ${p.variants.length} | ${new Set(p.variants.flatMap((v) => v.files.map((f) => f.name))).size} |`)].join('\n')
    : '_No problems yet._', P_END].join('\n');
  const re = new RegExp(`${P_START}[\\s\\S]*?${P_END}`);
  return re.test(readme) ? readme.replace(re, () => block) : readme;
}

function build() {
  const topics = loadTopics();
  fs.mkdirSync(OUT_DIR, { recursive: true });
  const keep = new Set(['favorites.md', ...topics.map((t) => `${t.slug}.md`)]);
  for (const f of fs.readdirSync(OUT_DIR)) if (f.endsWith('.md') && !keep.has(f)) fs.unlinkSync(path.join(OUT_DIR, f));
  for (const t of topics) fs.writeFileSync(path.join(OUT_DIR, `${t.slug}.md`), renderTopic(t));
  fs.writeFileSync(path.join(OUT_DIR, 'favorites.md'), renderFavorites(topics));

  const readme = fs.readFileSync(README, 'utf8');
  const re = new RegExp(`${START}[\\s\\S]*?${END}`);
  fs.writeFileSync(README, buildProblems(topics, readme.replace(re, () => renderIndex(topics))));
  return topics;
}

module.exports = { build, renderTopic, loadTopics, DATA_DIR, LEVELS };

if (require.main === module) {
  const topics = build();
  console.log(`Built ${topics.length} topics.`);
}
