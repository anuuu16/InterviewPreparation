// Local manager UI. Edits data/*.json and regenerates the Markdown on every change.
// Usage: node app/server.js  (then open http://localhost:3000)
const http = require('http');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { spawn } = require('child_process');
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


// ---- optional Piper text-to-speech (see tools/piper/README.md) -------------------------------
// If Piper is installed we start it as a child process and proxy /api/tts/*; otherwise the UI
// silently uses the browser's own voices.
const PIPER_DIR = path.join(__dirname, '..', 'tools', 'piper');
const PIPER_PORT = Number(process.env.PIPER_PORT || 5199);
const piper = { child: null, ready: false, voices: [], note: '' };

function piperRequest(method, urlPath, body) {
  return new Promise((resolve, reject) => {
    const req = http.request({ host: '127.0.0.1', port: PIPER_PORT, path: urlPath, method, headers: body ? { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(body) } : {}, timeout: 30000 }, resolve);
    req.on('timeout', () => req.destroy(new Error('Piper timed out')));
    req.on('error', reject);
    req.end(body);
  });
}

async function piperHealth() {
  const res = await piperRequest('GET', '/health');
  let raw = '';
  for await (const c of res) raw += c;
  return JSON.parse(raw);
}

function startPiper() {
  if (process.env.TTS === 'off') { piper.note = 'disabled (TTS=off)'; return; }
  const py = path.join(PIPER_DIR, '.venv', process.platform === 'win32' ? 'Scripts/python.exe' : 'bin/python');
  const voices = path.join(PIPER_DIR, 'voices');
  if (!fs.existsSync(py) || !fs.existsSync(voices) || !fs.readdirSync(voices).some((f) => f.endsWith('.onnx'))) {
    piper.note = 'not installed';
    console.log('Piper TTS: not installed, using browser voices (npm run tts:setup to add it).');
    return;
  }
  const child = spawn(py, [path.join(PIPER_DIR, 'server.py'), '--port', String(PIPER_PORT)], { stdio: ['ignore', 'inherit', 'inherit'] });
  piper.child = child;
  child.on('exit', (code) => { piper.ready = false; piper.child = null; piper.note = `stopped (exit ${code})`; });
  child.on('error', (e) => { piper.note = `could not start: ${e.message}`; });
  const stop = () => child.kill();
  process.on('exit', stop);
  for (const sig of ['SIGINT', 'SIGTERM']) process.on(sig, () => { stop(); process.exit(0); });

  (async () => { // wait for the model server to come up
    for (let i = 0; i < 40 && piper.child; i += 1) {
      try {
        piper.voices = (await piperHealth()).voices;
        piper.ready = true;
        piper.note = '';
        console.log(`Piper TTS ready: ${piper.voices.map((v) => v.id).join(', ')}`);
        return;
      } catch { await new Promise((r) => setTimeout(r, 500)); }
    }
    if (!piper.ready) piper.note = piper.note || 'did not start in time';
  })();
}

async function readRaw(req, limit = 64 * 1024) {
  const chunks = [];
  let size = 0;
  for await (const c of req) {
    size += c.length;
    if (size > limit) throw { status: 413, message: 'Body too large' };
    chunks.push(c);
  }
  return Buffer.concat(chunks).toString('utf8');
}

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
    if (url === '/api/tts/status') {
      return send(200, { available: piper.ready, voices: piper.ready ? piper.voices : [], note: piper.ready ? '' : piper.note });
    }
    if (url === '/api/tts/speak' && req.method === 'POST') {
      if (!piper.ready) return send(503, { error: 'Piper is not available' });
      const upstream = await piperRequest('POST', '/speak', await readRaw(req));
      res.writeHead(upstream.statusCode || 502, { 'Content-Type': upstream.headers['content-type'] || 'application/octet-stream' });
      return upstream.pipe(res);
    }
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
  startPiper();
  console.log(`Interview Prep manager: http://localhost:${PORT}`);
});
