// Notes and feedback on questions, stored in feedback/<topic>.json (one array per topic).
//
// kind "note"      personal study note; never acted on by agents
// kind "feedback"  a request to the author/agent: fix, expand, correct. Agents list open ones with `npm run feedback`.
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const DIR = path.join(__dirname, '..', 'feedback');
const KINDS = ['note', 'feedback'];
const TYPES = ['more-detail', 'code-issue', 'incorrect', 'unclear', 'missing', 'other'];
const STATUSES = ['open', 'resolved'];
const SLUG = /^[a-z0-9-]+$/;

const fileFor = (topic) => {
  if (!SLUG.test(topic)) throw { status: 400, message: 'Bad topic' };
  return path.join(DIR, `${topic}.json`);
};

function readTopic(topic) {
  const f = fileFor(topic);
  return fs.existsSync(f) ? JSON.parse(fs.readFileSync(f, 'utf8')) : [];
}

function writeTopic(topic, entries) {
  fs.mkdirSync(DIR, { recursive: true });
  const f = fileFor(topic);
  if (entries.length) fs.writeFileSync(f, JSON.stringify(entries, null, 2) + '\n');
  else if (fs.existsSync(f)) fs.unlinkSync(f);
}

function listAll() {
  if (!fs.existsSync(DIR)) return [];
  return fs.readdirSync(DIR).filter((f) => f.endsWith('.json')).flatMap((f) => {
    const topic = f.replace(/\.json$/, '');
    return readTopic(topic).map((e) => ({ ...e, topic }));
  });
}

function add({ topic, question = null, kind, type, text }) {
  text = String(text || '').trim();
  if (!text) throw { status: 400, message: 'Text required' };
  if (!KINDS.includes(kind)) throw { status: 400, message: 'kind must be note or feedback' };
  if (kind === 'feedback' && !TYPES.includes(type)) type = 'other';
  const entry = {
    id: `fb-${Date.now().toString(36)}${crypto.randomBytes(2).toString('hex')}`,
    question: question || null,
    kind,
    ...(kind === 'feedback' ? { type } : {}),
    text,
    status: 'open',
    createdAt: new Date().toISOString(),
  };
  const entries = readTopic(topic);
  entries.push(entry);
  writeTopic(topic, entries);
  return { ...entry, topic };
}

function locate(id) {
  const hit = listAll().find((e) => e.id === id);
  if (!hit) throw { status: 404, message: 'Not found' };
  return hit;
}

function update(id, patch) {
  const hit = locate(id);
  const entries = readTopic(hit.topic);
  const e = entries.find((x) => x.id === id);
  if (typeof patch.text === 'string' && patch.text.trim()) e.text = patch.text.trim();
  if (STATUSES.includes(patch.status)) {
    e.status = patch.status;
    if (patch.status === 'resolved') e.resolvedAt = new Date().toISOString();
    else { delete e.resolvedAt; delete e.resolution; }
  }
  if (typeof patch.resolution === 'string' && e.status === 'resolved') e.resolution = patch.resolution.trim();
  writeTopic(hit.topic, entries);
  return { ...e, topic: hit.topic };
}

function remove(id) {
  const hit = locate(id);
  writeTopic(hit.topic, readTopic(hit.topic).filter((x) => x.id !== id));
}

module.exports = { listAll, add, update, remove, KINDS, TYPES };
