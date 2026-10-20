#!/usr/bin/env node
/**
 * Frees the ports used by the study app (PORT, default 3000) and the Piper TTS server (PIPER_PORT, default 5199),
 * so a stale run never blocks `npm start`.
 *
 *   npm run kill            stop leftovers of this app (only processes that look like app/server.js or piper/server.py)
 *   npm run kill -- --force also stop whatever else listens on those ports
 *
 * It runs automatically before `npm start` (prestart). Zero dependencies. macOS and Linux (needs `lsof`).
 */
const { execSync } = require('child_process');

const force = process.argv.includes('--force');
const quiet = process.argv.includes('--quiet');
const ports = [Number(process.env.PORT || 3000), Number(process.env.PIPER_PORT || 5199)];
const log = (m) => { if (!quiet) console.log(m); };

if (process.platform === 'win32') {
  log('kill: not supported on Windows. Close the old terminal, or use Task Manager.');
  process.exit(0);
}

const run = (cmd) => { try { return execSync(cmd, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim(); } catch { return ''; } };
const looksOurs = (cmd) => /app\/server\.js|piper\/server\.py|interview-prep/i.test(cmd);

let killed = 0;
for (const port of ports) {
  const pids = run(`lsof -ti tcp:${port} -sTCP:LISTEN`).split(/\s+/).filter(Boolean).map(Number).filter((p) => p !== process.pid);
  for (const pid of pids) {
    const cmd = run(`ps -p ${pid} -o command=`);
    if (!force && !looksOurs(cmd)) {
      log(`kill: port ${port} is used by another program (pid ${pid}: ${cmd.slice(0, 60)}). Left alone; use --force to stop it.`);
      continue;
    }
    try {
      process.kill(pid, 'SIGTERM');
      killed += 1;
      log(`kill: stopped pid ${pid} on port ${port}`);
    } catch (e) {
      log(`kill: could not stop pid ${pid}: ${e.message}`);
    }
  }
}
if (!killed) log('kill: nothing to stop.');
if (killed) execSync('sleep 0.5'); // give the ports a moment to close
