// Curated links ("go and check the source"): official docs, tutorials, references.
//
// resources/<topic>.json                  links for a topic, e.g. resources/react.json
// problems/<problem>/resources.json       links for a code problem (key "problem-<slug>")
//
// Each file is an array of { title, url, type, description, level?, module? }, most important first.
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const DIR = path.join(ROOT, 'resources');
const PROBLEMS = path.join(ROOT, 'problems');
const TYPES = ['official-docs', 'tutorial', 'article', 'video', 'book', 'course', 'reference', 'tool', 'repo'];
const LEVELS = ['beginner', 'intermediate', 'advanced'];
const KEY = /^(problem-)?[a-z0-9-]+$/;

function fileFor(key) {
  if (!KEY.test(key)) throw { status: 400, message: 'Bad key' };
  return key.startsWith('problem-') ? path.join(PROBLEMS, key.slice(8), 'resources.json') : path.join(DIR, `${key}.json`);
}

function read(key) {
  const f = fileFor(key);
  return fs.existsSync(f) ? JSON.parse(fs.readFileSync(f, 'utf8')) : [];
}

function write(key, items) {
  const f = fileFor(key);
  if (key.startsWith('problem-') && !fs.existsSync(path.dirname(f))) throw { status: 404, message: 'No such problem' };
  fs.mkdirSync(path.dirname(f), { recursive: true });
  if (items.length) fs.writeFileSync(f, JSON.stringify(items, null, 2) + '\n');
  else if (fs.existsSync(f)) fs.unlinkSync(f);
}

/** Why an entry is not acceptable, or '' when it is fine. */
function problem(e) {
  if (!e || typeof e !== 'object') return 'entry must be an object';
  if (typeof e.title !== 'string' || !e.title.trim()) return 'title is required';
  if (typeof e.url !== 'string' || !/^https:\/\/[^\s]+$/.test(e.url.trim())) return 'url must start with https://';
  if (!TYPES.includes(e.type)) return `type must be one of ${TYPES.join(', ')}`;
  if (typeof e.description !== 'string' || !e.description.trim()) return 'description is required (what will the reader find?)';
  if (e.level !== undefined && !LEVELS.includes(e.level)) return `level must be one of ${LEVELS.join(', ')}`;
  return '';
}

function clean(e) {
  const out = { title: e.title.trim(), url: e.url.trim(), type: e.type, description: e.description.trim() };
  if (e.level) out.level = e.level;
  if (typeof e.module === 'string' && e.module.trim()) out.module = e.module.trim();
  return out;
}

function listAll() {
  const out = {};
  if (fs.existsSync(DIR)) for (const f of fs.readdirSync(DIR).filter((x) => x.endsWith('.json'))) out[f.replace(/\.json$/, '')] = read(f.replace(/\.json$/, ''));
  if (fs.existsSync(PROBLEMS)) {
    for (const d of fs.readdirSync(PROBLEMS, { withFileTypes: true }).filter((x) => x.isDirectory())) {
      const f = path.join(PROBLEMS, d.name, 'resources.json');
      if (fs.existsSync(f)) out[`problem-${d.name}`] = JSON.parse(fs.readFileSync(f, 'utf8'));
    }
  }
  return out;
}

function add(key, entry) {
  const why = problem(entry);
  if (why) throw { status: 400, message: why };
  const items = read(key);
  const e = clean(entry);
  if (items.some((x) => x.url === e.url)) throw { status: 409, message: 'That link is already listed' };
  items.push(e);
  write(key, items);
  return e;
}

function remove(key, url) {
  write(key, read(key).filter((x) => x.url !== url));
}

module.exports = { listAll, read, add, remove, problem, TYPES, LEVELS };
