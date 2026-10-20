// Generates plain Markdown (questions/*.md and the README index) from data/*.json.
// Usage: node app/build.js
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const DATA_DIR = path.join(ROOT, 'data');
const OUT_DIR = path.join(ROOT, 'questions');
const README = path.join(ROOT, 'README.md');
const LEVELS = ['basic', 'intermediate', 'advanced'];
const START = '<!-- TOPICS:START -->';
const END = '<!-- TOPICS:END -->';

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
  out.push(`${qs.length} questions · ${qs.filter((q) => q.favorite).length} favorites`, '');
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
  return [...out, ...toc, ...modules, ...body].join('\n');
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

function renderIndex(topics) {
  const rows = topics.map((t) => {
    const n = (lvl) => t.questions.filter((q) => q.level === lvl).length;
    const favs = t.questions.filter((q) => q.favorite).length;
    return `| [${t.name}](questions/${t.slug}.md) | ${t.questions.length} | ${n('basic')} | ${n('intermediate')} | ${n('advanced')} | ${favs} |`;
  });
  return [
    START,
    '| Topic | Total | Basic | Intermediate | Advanced | ⭐ |',
    '| --- | ---: | ---: | ---: | ---: | ---: |',
    ...rows,
    '',
    '[⭐ All favorites](questions/favorites.md)',
    END,
  ].join('\n');
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
  fs.writeFileSync(README, readme.replace(re, () => renderIndex(topics)));
  return topics;
}

module.exports = { build, loadTopics, DATA_DIR, LEVELS };

if (require.main === module) {
  const topics = build();
  console.log(`Built ${topics.length} topics.`);
}
