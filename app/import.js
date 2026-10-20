// Import questions written as a plain Markdown file into data/<topic>.json, then rebuild the pages.
//
//   node app/import.js questions.md --topic "React"            # add new, update existing (matched by question text)
//   node app/import.js questions.md --topic "React" --replace  # file order becomes the topic order; questions not in the file are removed
//
// File format (see AGENTS.md):
//
//   ## What is X?
//   level: basic
//   tags: hooks, state
//
//   **Short answer:** …Markdown answer…
//
// A line "## " inside a code fence is not treated as a new question.
const fs = require('fs');
const path = require('path');
const { build, DATA_DIR, LEVELS } = require('./build');

const slugify = (s) => s.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

function parse(text) {
  const questions = [];
  let cur = null;
  let fence = false;
  for (const line of text.replace(/\r\n/g, '\n').split('\n')) {
    if (/^\s*```/.test(line)) fence = !fence;
    const h = !fence && line.match(/^## (.+)$/);
    if (h) {
      cur = { question: h[1].trim(), meta: {}, lines: [], inMeta: true };
      questions.push(cur);
      continue;
    }
    if (!cur) continue;
    if (cur.inMeta) {
      const m = line.match(/^(level|tags):\s*(.*)$/);
      if (m) { cur.meta[m[1]] = m[2].trim(); continue; }
      if (!line.trim()) continue;
      cur.inMeta = false;
    }
    cur.lines.push(line);
  }
  return questions.map((q) => ({
    question: q.question,
    answer: q.lines.join('\n').trim(),
    level: q.meta.level,
    tags: (q.meta.tags || '').split(',').map((t) => t.trim()).filter(Boolean),
  }));
}

function main() {
  const args = process.argv.slice(2);
  const file = args.find((a) => !a.startsWith('--') && args[args.indexOf(a) - 1] !== '--topic');
  const topicName = args[args.indexOf('--topic') + 1];
  const replace = args.includes('--replace');
  if (!file || !topicName || args.indexOf('--topic') < 0) {
    console.error('Usage: node app/import.js <file.md> --topic "<Topic name>" [--replace]');
    process.exit(1);
  }

  const incoming = parse(fs.readFileSync(file, 'utf8'));
  const problems = incoming.flatMap((q, i) => [
    !LEVELS.includes(q.level) && `#${i + 1} "${q.question}": level must be one of ${LEVELS.join(', ')} (got "${q.level}")`,
    !q.answer && `#${i + 1} "${q.question}": empty answer`,
  ]).filter(Boolean);
  if (problems.length) {
    console.error(problems.join('\n'));
    process.exit(1);
  }

  const slug = slugify(topicName);
  const dataFile = path.join(DATA_DIR, `${slug}.json`);
  const topic = fs.existsSync(dataFile) ? JSON.parse(fs.readFileSync(dataFile, 'utf8')) : { name: topicName, questions: [] };
  const byText = new Map(topic.questions.map((q) => [q.question, q]));
  let next = topic.questions.reduce((m, q) => Math.max(m, Number((q.id.match(/(\d+)$/) || [])[1] || 0)), 0);

  let added = 0;
  let updated = 0;
  const merged = incoming.map((q) => {
    const old = byText.get(q.question);
    if (old) {
      updated += 1;
      return { ...old, answer: q.answer, level: q.level, tags: q.tags };
    }
    added += 1;
    next += 1;
    return { id: `${slug}-${String(next).padStart(3, '0')}`, question: q.question, answer: q.answer, level: q.level, tags: q.tags, favorite: false };
  });

  const seen = new Set(merged.map((q) => q.question));
  const rest = topic.questions.filter((q) => !seen.has(q.question));
  const removed = replace ? rest : [];
  topic.questions = replace ? merged : [...topic.questions.map((q) => merged.find((m) => m.id === q.id) || q), ...merged.filter((m) => !byText.has(m.question))];

  fs.writeFileSync(dataFile, JSON.stringify(topic, null, 2) + '\n');
  build();
  console.log(`${topic.name}: ${added} added, ${updated} updated, ${removed.length} removed, ${topic.questions.length} total.`);
  const lost = removed.filter((q) => q.favorite);
  if (lost.length) console.warn(`Warning: removed ${lost.length} favorited question(s): ${lost.map((q) => q.question).join('; ')}`);
}

main();
