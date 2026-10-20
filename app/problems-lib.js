// Reads the code-problem library in problems/ (see AGENTS.md, "Problems").
//
// problems/languages.json            language registry (file names, how to run, which are "core")
// problems/<problem>/problem.json    metadata
// problems/<problem>/overview.md     the concept document
// problems/<problem>/<variant>/      one approach: variant.json, notes.md, expected.txt, one source file per language
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..', 'problems');
const readIf = (p) => (fs.existsSync(p) ? fs.readFileSync(p, 'utf8') : null);
const json = (p) => {
  const raw = readIf(p);
  return raw === null ? null : JSON.parse(raw);
};
const byOrder = (a, b) => (a.order ?? 99) - (b.order ?? 99) || a.title.localeCompare(b.title);

function loadLanguages(root = ROOT) {
  return json(path.join(root, 'languages.json')) || [];
}

function loadProblems(root = ROOT) {
  if (!fs.existsSync(root)) return [];
  const langs = loadLanguages(root);
  const dirs = (p) => fs.readdirSync(p, { withFileTypes: true }).filter((d) => d.isDirectory());

  return dirs(root)
    .map((d) => {
      const dir = path.join(root, d.name);
      const meta = json(path.join(dir, 'problem.json'));
      if (!meta) return null;
      const variants = dirs(dir)
        .map((v) => {
          const vd = path.join(dir, v.name);
          const vm = json(path.join(vd, 'variant.json'));
          if (!vm) return null;
          const files = langs
            .map((l) => {
              const code = readIf(path.join(vd, l.file));
              return code === null ? null : { language: l.id, name: l.name, fence: l.fence, file: l.file, core: !!l.core, code };
            })
            .filter(Boolean);
          return { slug: v.name, ...vm, notes: readIf(path.join(vd, 'notes.md')) ?? '', expected: readIf(path.join(vd, 'expected.txt')) ?? '', files };
        })
        .filter(Boolean)
        .sort(byOrder);
      return { slug: d.name, ...meta, overview: readIf(path.join(dir, 'overview.md')) ?? '', variants };
    })
    .filter(Boolean)
    .sort(byOrder);
}

module.exports = { ROOT, loadLanguages, loadProblems };
