// Checks that every link in resources/ and problems/*/resources.json still responds.
//
//   npm run resources:check            # all
//   npm run resources:check -- react   # one key (topic slug or problem-<slug>)
//
// 2xx/3xx is fine. 403/429/999 usually means the site blocks scripts: reported as "unverified", not failed.
// Anything else (404, 5xx, DNS errors, timeouts) fails with exit code 1.
const { listAll } = require('./resources-lib');

const only = process.argv.slice(2).filter((a) => !a.startsWith('--'));
const all = listAll();
const jobs = Object.entries(all).filter(([k]) => !only.length || only.includes(k)).flatMap(([key, items]) => items.map((e) => ({ key, ...e })));

async function probe(url) {
  const opts = (method) => ({ method, redirect: 'follow', signal: AbortSignal.timeout(15000), headers: { 'User-Agent': 'Mozilla/5.0 (link-checker; interview-prep)', Accept: 'text/html,*/*' } });
  try {
    let res = await fetch(url, opts('HEAD'));
    if (res.status === 405 || res.status === 403 || res.status === 404 || res.status >= 500) res = await fetch(url, opts('GET')); // some servers mishandle HEAD
    return { status: res.status, final: res.url };
  } catch (e) {
    return { status: 0, error: e.cause?.code || e.name || String(e) };
  }
}

(async () => {
  let bad = 0, soft = 0, ok = 0;
  const queue = [...jobs];
  const workers = Array.from({ length: 8 }, async () => {
    for (let j; (j = queue.shift()); ) {
      const r = await probe(j.url);
      const label = `${j.key}: ${j.title} <${j.url}>`;
      if (r.status >= 200 && r.status < 400) ok += 1;
      else if ([403, 429, 999].includes(r.status)) { soft += 1; console.log(`UNVERIFIED (${r.status}) ${label}`); }
      else { bad += 1; console.log(`FAIL (${r.status || r.error}) ${label}`); }
    }
  });
  await Promise.all(workers);
  console.log(`\n${jobs.length} link(s): ${ok} ok, ${soft} unverified, ${bad} failed`);
  process.exit(bad ? 1 : 0);
})();
