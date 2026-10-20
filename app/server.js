// Local manager UI. Edits data/*.json and regenerates the Markdown on every change.
// Usage: node app/server.js  (then open http://localhost:3000)
const http = require('http');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { build, DATA_DIR, LEVELS } = require('./build');

const PORT = process.env.PORT || 3000;
const DIST = path.join(__dirname, 'web', 'dist');
const TYPES = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml', '.json': 'application/json', '.png': 'image/png', '.woff2': 'font/woff2' };
const SLUG = /^[a-z0-9-]+$/;
const file = (slug) => path.join(DATA_DIR, `${slug}.json`);

const read = (slug) => JSON.parse(fs.readFileSync(file(slug), 'utf8'));
const save = (slug, topic) => {
  fs.writeFileSync(file(slug), JSON.stringify(topic, null, 2) + '\n');
  build();
};
const slugify = (s) => s.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

function clean(body, base = {}) {
  const q = { ...base };
  if (typeof body.question === 'string') q.question = body.question.trim();
  if (typeof body.answer === 'string') q.answer = body.answer.trim();
  if (LEVELS.includes(body.level)) q.level = body.level;
  if (Array.isArray(body.tags)) q.tags = body.tags.map((t) => String(t).trim()).filter(Boolean);
  if (typeof body.favorite === 'boolean') q.favorite = body.favorite;
  return q;
}

const routes = [];
const route = (method, pattern, fn) => routes.push({ method, re: new RegExp(`^${pattern}$`), fn });

route('GET', '/api/topics', () =>
  fs.readdirSync(DATA_DIR).filter((f) => f.endsWith('.json')).map((f) => {
    const slug = f.replace(/\.json$/, '');
    return { slug, name: read(slug).name };
  }));
route('GET', '/api/all', () =>
  fs.readdirSync(DATA_DIR).filter((f) => f.endsWith('.json')).map((f) => {
    const slug = f.replace(/\.json$/, '');
    return { slug, ...read(slug) };
  }).sort((a, b) => a.name.localeCompare(b.name)));
route('POST', '/api/topics', ({ body }) => {
  const name = String(body.name || '').trim();
  const slug = slugify(name);
  if (!slug) throw { status: 400, message: 'Name required' };
  if (fs.existsSync(file(slug))) throw { status: 409, message: 'Topic exists' };
  save(slug, { name, questions: [] });
  return { slug, name };
});
route('GET', '/api/topics/([a-z0-9-]+)', ({ m }) => read(m[1]));
route('POST', '/api/topics/([a-z0-9-]+)/questions', ({ m, body }) => {
  const t = read(m[1]);
  const q = clean(body, { id: crypto.randomUUID(), question: '', answer: '', level: 'basic', tags: [], favorite: false });
  if (!q.question) throw { status: 400, message: 'Question required' };
  t.questions.push(q);
  save(m[1], t);
  return q;
});
route('PUT', '/api/topics/([a-z0-9-]+)/questions/([\\w-]+)', ({ m, body }) => {
  const t = read(m[1]);
  const i = t.questions.findIndex((q) => q.id === m[2]);
  if (i < 0) throw { status: 404, message: 'Not found' };
  t.questions[i] = clean(body, t.questions[i]);
  save(m[1], t);
  return t.questions[i];
});
route('DELETE', '/api/topics/([a-z0-9-]+)/questions/([\\w-]+)', ({ m }) => {
  const t = read(m[1]);
  t.questions = t.questions.filter((q) => q.id !== m[2]);
  save(m[1], t);
  return { ok: true };
});

const readBody = (req) =>
  new Promise((resolve, reject) => {
    let s = '';
    req.on('data', (c) => (s += c));
    req.on('end', () => {
      try { resolve(s ? JSON.parse(s) : {}); } catch { reject({ status: 400, message: 'Bad JSON' }); }
    });
  });

http.createServer(async (req, res) => {
  const url = req.url.split('?')[0];
  const send = (status, data, type = 'application/json') => {
    res.writeHead(status, { 'Content-Type': type });
    res.end(type === 'application/json' ? JSON.stringify(data) : data);
  };
  try {
    if (url.startsWith('/api/')) {
      for (const r of routes) {
        const m = r.method === req.method && url.match(r.re);
        if (m) return send(200, r.fn({ m, body: req.method === 'GET' || req.method === 'DELETE' ? {} : await readBody(req) }));
      }
      return send(404, { error: 'Not found' });
    }
    if (!fs.existsSync(DIST)) {
      return send(503, 'UI not built yet. Run: npm run setup', 'text/plain');
    }
    // static files from the built UI; unknown paths fall back to index.html (single-page app)
    const rel = path.normalize(decodeURIComponent(url)).replace(/^([/\\]|\.\.)+/, '');
    let file = path.join(DIST, rel);
    if (!file.startsWith(DIST) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) file = path.join(DIST, 'index.html');
    send(200, fs.readFileSync(file), TYPES[path.extname(file)] || 'application/octet-stream');
  } catch (e) {
    if (e.status) return send(e.status, { error: e.message });
    if (e.code === 'ENOENT') return send(404, { error: 'Not found' });
    console.error(e);
    send(500, { error: 'Server error' });
  }
}).listen(PORT, '127.0.0.1', () => {
  build();
  console.log(`Interview Prep manager: http://localhost:${PORT}`);
});
