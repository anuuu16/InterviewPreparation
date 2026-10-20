// Work through feedback left in the study app. Used by agents (see AGENTS.md, "Feedback loop").
//
//   npm run feedback                          # open feedback, grouped by topic
//   npm run feedback -- --topic react         # one topic
//   npm run feedback -- --notes               # include personal notes (normally hidden)
//   npm run feedback -- --all                 # include resolved items
//   npm run feedback -- show <id>             # one item with the current question text/answer
//   npm run feedback -- resolve <id> "what you changed"
//   npm run feedback -- reopen <id>
const fs = require('fs');
const path = require('path');
const { listAll, update } = require('./feedback-lib');
const { DATA_DIR } = require('./build');

const args = process.argv.slice(2);
const flag = (n) => args.includes(n);
const opt = (n) => (flag(n) ? args[args.indexOf(n) + 1] : undefined);
const [cmd, id, ...rest] = args;

const topics = {};
for (const f of fs.readdirSync(DATA_DIR).filter((x) => x.endsWith('.json'))) topics[f.replace('.json', '')] = JSON.parse(fs.readFileSync(path.join(DATA_DIR, f), 'utf8'));
const questionOf = (e) => (e.question && topics[e.topic] ? topics[e.topic].questions.find((q) => q.id === e.question) : null);
const where = (e) => (e.question ? `${e.question}${questionOf(e) ? ` — ${questionOf(e).question}` : ' (question no longer exists)'}` : `topic "${e.topic}" (whole subject)`);

if (cmd === 'resolve' || cmd === 'reopen') {
  if (!id) { console.error(`Usage: npm run feedback -- ${cmd} <id>${cmd === 'resolve' ? ' "what you changed"' : ''}`); process.exit(1); }
  const e = update(id, cmd === 'resolve' ? { status: 'resolved', resolution: rest.join(' ') } : { status: 'open' });
  console.log(`${cmd === 'resolve' ? 'Resolved' : 'Reopened'} ${e.id}`);
} else if (cmd === 'show') {
  const e = listAll().find((x) => x.id === id);
  if (!e) { console.error('Not found'); process.exit(1); }
  const q = questionOf(e);
  console.log(`${e.id}  [${e.kind}${e.type ? ': ' + e.type : ''}]  ${e.status}  ${e.createdAt}\nAbout: ${where(e)}\n\n${e.text}\n${e.resolution ? `\nResolution: ${e.resolution}\n` : ''}`);
  if (q) console.log(`----- current answer (${q.level}${q.module ? ', ' + q.module : ''}) -----\n${q.answer}`);
} else {
  const all = flag('--all');
  const notes = flag('--notes');
  const only = opt('--topic');
  const list = listAll()
    .filter((e) => (all || e.status === 'open') && (notes || e.kind === 'feedback') && (!only || e.topic === only))
    .sort((a, b) => a.topic.localeCompare(b.topic) || String(a.question).localeCompare(String(b.question)) || a.createdAt.localeCompare(b.createdAt));
  if (!list.length) { console.log('No open feedback. Nothing to fix.'); process.exit(0); }
  let last = '';
  for (const e of list) {
    if (e.topic !== last) { console.log(`\n## ${e.topic}`); last = e.topic; }
    console.log(`\n- ${e.id}  [${e.kind}${e.type ? ': ' + e.type : ''}]${e.status === 'resolved' ? ' (resolved)' : ''}\n  About: ${where(e)}\n  ${e.text.replace(/\n/g, '\n  ')}${e.resolution ? `\n  Resolution: ${e.resolution}` : ''}`);
  }
  console.log(`\n${list.length} item(s). Fix them in data/<topic>.json (or via npm run import), then: npm run feedback -- resolve <id> "what you changed"`);
}
