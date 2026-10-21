// Writes the JSON the hosted (static) site reads: the question bank, problems, resources and group order.
// Only data/ is exported. personal/ (private, git-ignored) is never included.
// Usage: node app/export-static.js [outDir]   (default app/web/dist-static/static)
const fs = require('fs');
const path = require('path');
const { DATA_DIR } = require('./build');
const resources = require('./resources-lib');
const problemsLib = require('./problems-lib');

const out = path.resolve(process.argv[2] || path.join(__dirname, 'web', 'dist-static', 'static'));
fs.mkdirSync(out, { recursive: true });
const topics = fs.readdirSync(DATA_DIR).filter((f) => f.endsWith('.json'))
  .map((f) => ({ slug: f.replace(/\.json$/, ''), ...JSON.parse(fs.readFileSync(path.join(DATA_DIR, f), 'utf8')) }))
  .sort((a, b) => a.name.localeCompare(b.name));
const write = (name, data) => fs.writeFileSync(path.join(out, name), JSON.stringify(data));
write('all.json', topics);
write('problems.json', problemsLib.loadProblems());
write('resources.json', resources.listAll());
write('groups.json', JSON.parse(fs.readFileSync(path.join(__dirname, 'groups.json'), 'utf8')));
console.log(`Exported ${topics.length} topics to ${out}`);
