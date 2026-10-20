// Runs every solution file in problems/ and checks its output against expected.txt.
//
//   node app/problems-test.js                       # everything
//   node app/problems-test.js sorting               # one problem
//   node app/problems-test.js sorting/quick-sort    # one approach
//   node app/problems-test.js --lang go,python      # only some languages
//   node app/problems-test.js --root /some/dir      # another problems directory
//
// Languages whose toolchain is not installed are skipped (not failed). Exit code 1 on any failure.
const fs = require('fs');
const os = require('os');
const path = require('path');
const { spawnSync } = require('child_process');
const { ROOT, loadProblems, loadLanguages } = require('./problems-lib');

const args = process.argv.slice(2);
const opt = (name) => (args.includes(name) ? args[args.indexOf(name) + 1] : undefined);
const root = opt('--root') ? path.resolve(opt('--root')) : ROOT;
const onlyLangs = opt('--lang') ? opt('--lang').split(',') : null;
const filter = args.find((a, i) => !a.startsWith('--') && !['--lang', '--root'].includes(args[i - 1]));
const [onlyProblem, onlyVariant] = filter ? filter.split('/') : [];

const langs = Object.fromEntries(loadLanguages(root).map((l) => [l.id, l]));
const have = (cmd) => spawnSync('sh', ['-c', `command -v ${cmd}`]).status === 0;
const norm = (s) => s.replace(/\r\n/g, '\n').split('\n').map((l) => l.trimEnd()).join('\n').trim();

function exec(cmd, argv, cwd, timeout = 120000) {
  const env = { ...process.env, DOTNET_NOLOGO: '1', DOTNET_CLI_TELEMETRY_OPTOUT: '1', DOTNET_SKIP_FIRST_TIME_EXPERIENCE: '1' };
  return spawnSync(cmd, argv, { cwd, env, encoding: 'utf8', timeout, maxBuffer: 10 * 1024 * 1024 });
}

function runOne(lang, file) {
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'ip-prob-'));
  try {
    const out = path.join(tmp, 'out');
    const sub = (a) => a.replace('{file}', file).replace('{out}', out);
    if (lang.special === 'dotnet') {
      fs.writeFileSync(path.join(tmp, 'app.csproj'),
        '<Project Sdk="Microsoft.NET.Sdk"><PropertyGroup><OutputType>Exe</OutputType><TargetFramework>net8.0</TargetFramework><Nullable>enable</Nullable><ImplicitUsings>enable</ImplicitUsings></PropertyGroup></Project>');
      fs.copyFileSync(file, path.join(tmp, 'Program.cs'));
      return exec('dotnet', ['run', '--project', tmp, '--nologo', '-v', 'q'], tmp);
    }
    if (lang.compile) {
      const c = lang.compile.map(sub);
      const built = exec(c[0], c.slice(1), tmp);
      if (built.status !== 0) return built;
    }
    const r = lang.run.map(sub);
    return exec(r[0], r.slice(1), path.dirname(file));
  } finally {
    fs.rmSync(tmp, { recursive: true, force: true });
  }
}

let pass = 0, fail = 0, skip = 0;
const missing = new Set();
for (const p of loadProblems(root)) {
  if (onlyProblem && p.slug !== onlyProblem) continue;
  for (const v of p.variants) {
    if (onlyVariant && v.slug !== onlyVariant) continue;
    const expected = norm(v.expected);
    for (const f of v.files) {
      if (onlyLangs && !onlyLangs.includes(f.language)) continue;
      const lang = langs[f.language];
      const tool = lang.special || (lang.compile ? lang.compile[0] : lang.run[0]);
      const label = `${p.slug}/${v.slug} [${f.language}]`;
      if (!have(tool)) { skip += 1; missing.add(tool); console.log(`SKIP ${label} (${tool} not installed)`); continue; }
      if (f.language === 'go' && have('gofmt')) { // Go files must be gofmt-formatted
        const unformatted = exec('gofmt', ['-l', path.join(root, p.slug, v.slug, f.file)], root).stdout.trim();
        if (unformatted) { fail += 1; console.log(`FAIL ${label}\n  not gofmt-formatted: run gofmt -w on the file`); continue; }
      }
      const t0 = Date.now();
      const r = runOne(lang, path.join(root, p.slug, v.slug, f.file));
      const ms = Date.now() - t0;
      if (r.status === 0 && norm(r.stdout) === expected) { pass += 1; console.log(`PASS ${label} (${ms} ms)`); continue; }
      fail += 1;
      console.log(`FAIL ${label}`);
      if (r.status !== 0) console.log(`  exit ${r.status}${r.error ? ' ' + r.error.message : ''}\n  ${(r.stderr || r.stdout || '').trim().split('\n').slice(0, 6).join('\n  ')}`);
      else console.log(`  expected:\n    ${expected.split('\n').join('\n    ')}\n  got:\n    ${norm(r.stdout).split('\n').join('\n    ')}`);
    }
  }
}
console.log(`\n${pass} passed, ${fail} failed, ${skip} skipped${missing.size ? ` (missing: ${[...missing].join(', ')})` : ''}`);
process.exit(fail ? 1 : 0);
