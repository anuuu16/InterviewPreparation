// Checks data/*.json for structural problems and common authoring mistakes.
//
//   node app/validate.js            # errors fail (exit 1); style issues are warnings
//   node app/validate.js --strict   # warnings fail too
//   node app/validate.js --go       # also compile-check standalone Go examples (needs Go installed)
//   node app/validate.js react go   # only the named topics (file names without .json)
const fs = require('fs');
const os = require('os');
const path = require('path');
const { execFileSync } = require('child_process');
const { DATA_DIR, LEVELS } = require('./build');

const args = process.argv.slice(2);
const strict = args.includes('--strict');
const checkGo = args.includes('--go');
const only = args.filter((a) => !a.startsWith('--'));

const MERMAID_TYPES = /^(flowchart|graph|sequenceDiagram|stateDiagram(-v2)?|classDiagram|erDiagram|gantt|pie|journey|mindmap|timeline|gitGraph)\b/;
const errors = [];
const warnings = [];
const err = (where, msg) => errors.push(`${where}: ${msg}`);
const warn = (where, msg) => warnings.push(`${where}: ${msg}`);

function fences(answer) {
  const out = [];
  let open = null;
  for (const line of answer.split('\n')) {
    const m = line.match(/^\s*```(\w*)/);
    if (!m) { if (open) open.body.push(line); continue; }
    if (open) { out.push(open); open = null; } else open = { lang: m[1], body: [] };
  }
  return { blocks: out, unclosed: open !== null };
}

function checkAnswer(where, q) {
  const a = q.answer;
  const { blocks, unclosed } = fences(a);
  if (unclosed) err(where, 'unclosed code fence');
  for (const b of blocks) {
    const code = b.body.join('\n');
    if (!b.lang) warn(where, 'code fence without a language tag');
    if (b.lang === 'mermaid') {
      if (!MERMAID_TYPES.test(code.trim())) err(where, `mermaid block does not start with a diagram type: "${code.trim().split('\n')[0]}"`);
      if (/^[ \t]*subgraph[ \t]+\w+[ \t]+[^\[\s]/m.test(code)) err(where, 'mermaid: subgraph title with spaces needs an id, e.g. subgraph H["My title"]');
      if (/-\.[A-Za-z][^.\n]*\.->/.test(code)) warn(where, 'mermaid: write dotted edge labels with spaces: -. label .->');
      if (code.split('\n').length > 40) warn(where, 'mermaid diagram is long; keep it to about 12 nodes');
    }
  }
  if (/<(div|span|p|br|img|details|table)\b/i.test(a.replace(/```[\s\S]*?```/g, ''))) warn(where, 'raw HTML in answer; it is skipped when read aloud');
  if (/^#{1,3}\s/m.test(a.replace(/```[\s\S]*?```/g, ''))) err(where, 'headings above #### are reserved for the page structure; use #### or bold');
  if (!/^\*\*Short answer:?\*\*/.test(a)) warn(where, 'answer should start with **Short answer:** (used by Brief narration)');
  if (!/\*\*Interview tip:?\*\*/i.test(a)) warn(where, 'no **Interview tip:** paragraph');
  const words = a.replace(/```[\s\S]*?```/g, '').split(/\s+/).length;
  if (words < 90) warn(where, `answer is short (${words} words of prose)`);
  if (words > 900) warn(where, `answer is very long (${words} words); consider splitting`);
  if (!q.question.trim().endsWith('?') && !/[.:]$/.test(q.question.trim())) warn(where, 'question should end with "?" (or "." for an instruction)');
  if (q.tags.length === 0) warn(where, 'no tags');
}

function goCheck(topic) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'ip-go-'));
  fs.writeFileSync(path.join(root, 'go.mod'), 'module chk\n\ngo 1.22\n');
  let n = 0;
  for (const q of topic.questions) {
    fences(q.answer).blocks.forEach((b, i) => {
      const code = b.body.join('\n');
      if (b.lang !== 'go' || !code.startsWith('package main') || !code.includes('func main()')) return;
      const imports = (code.match(/import\s*(\([^)]*\)|"[^"]+")/) || [''])[0].match(/"([^"]+)"/g) || [];
      if (imports.some((s) => s.replace(/"/g, '').split('/')[0].includes('.'))) return; // external modules
      const dir = path.join(root, `${q.id}_${i}`);
      fs.mkdirSync(dir);
      fs.writeFileSync(path.join(dir, 'main.go'), code);
      n += 1;
      try {
        execFileSync('go', ['vet', `./${path.basename(dir)}`], { cwd: root, stdio: 'pipe' });
      } catch (e) {
        const msg = String(e.stderr).split('\n').slice(0, 3).join(' | ');
        // examples for newer Go releases can't compile on an older local toolchain
        if (/slices\.Sorted|maps\.Keys|slices\.Collect|\/src\/iter|range over func/.test(msg)) warn(`${topic.slug}/${q.id}`, 'example needs a newer Go than the local toolchain; not compiled');
        else err(`${topic.slug}/${q.id}`, `go vet failed: ${msg}`);
      }
    });
  }
  fs.rmSync(root, { recursive: true, force: true });
  console.log(`  ${topic.slug}: compiled ${n} Go example(s)`);
}

const files = fs.readdirSync(DATA_DIR).filter((f) => f.endsWith('.json') && (!only.length || only.includes(f.replace('.json', ''))));
let total = 0;
for (const f of files) {
  const slug = f.replace('.json', '');
  let topic;
  try {
    topic = { slug, ...JSON.parse(fs.readFileSync(path.join(DATA_DIR, f), 'utf8')) };
  } catch (e) {
    err(f, `invalid JSON: ${e.message}`);
    continue;
  }
  if (!topic.name || !Array.isArray(topic.questions)) { err(f, 'needs "name" and "questions"'); continue; }
  const ids = new Set();
  const titles = new Set();
  const idRe = new RegExp(`^${slug.replace(/[-]/g, '\\-')}-\\d+$`);
  topic.questions.forEach((q, i) => {
    total += 1;
    const where = `${slug}/${q.id || '#' + (i + 1)}`;
    if (typeof q.id !== 'string' || !idRe.test(q.id)) err(where, `id must look like ${slug}-001`);
    else if (ids.has(q.id)) err(where, 'duplicate id');
    ids.add(q.id);
    if (typeof q.question !== 'string' || !q.question.trim()) err(where, 'empty question');
    else if (titles.has(q.question)) err(where, 'duplicate question text');
    titles.add(q.question);
    if (!LEVELS.includes(q.level)) err(where, `level must be one of ${LEVELS.join(', ')}`);
    if (typeof q.answer !== 'string' || !q.answer.trim()) err(where, 'empty answer');
    if (!Array.isArray(q.tags)) err(where, 'tags must be an array');
    if (typeof q.favorite !== 'boolean') err(where, 'favorite must be true/false');
    if (typeof q.answer === 'string' && Array.isArray(q.tags) && typeof q.question === 'string') checkAnswer(where, q);
  });
  const counts = LEVELS.map((l) => `${topic.questions.filter((q) => q.level === l).length} ${l}`).join(', ');
  console.log(`${topic.name}: ${topic.questions.length} questions (${counts})`);
  if (checkGo && slug === 'golang') goCheck(topic);
}

for (const w of warnings.slice(0, 60)) console.warn(`warn  ${w}`);
if (warnings.length > 60) console.warn(`warn  … and ${warnings.length - 60} more warnings`);
for (const e of errors) console.error(`ERROR ${e}`);
console.log(`\n${total} questions checked: ${errors.length} error(s), ${warnings.length} warning(s).`);
process.exit(errors.length || (strict && warnings.length) ? 1 : 0);
