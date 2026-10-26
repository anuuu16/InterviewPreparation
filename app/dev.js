// Dev mode: runs the API (:4401) and the UI with hot reload (:4400) together. Ctrl+C stops both.
const { spawn } = require('child_process');
const path = require('path');

const web = path.join(__dirname, 'web');
const vite = path.join(web, 'node_modules', '.bin', process.platform === 'win32' ? 'vite.cmd' : 'vite');
const procs = [
  spawn(process.execPath, [path.join(__dirname, 'server.js')], { stdio: 'inherit', env: { ...process.env, PORT: '4401' } }),
  spawn(vite, [], { cwd: web, stdio: 'inherit', shell: process.platform === 'win32' }),
];

let stopping = false;
const stop = (code) => {
  if (stopping) return;
  stopping = true;
  for (const p of procs) if (!p.killed) p.kill('SIGTERM');
  setTimeout(() => process.exit(code), 300);
};
for (const p of procs) p.on('exit', (code) => stop(code ?? 0));
process.on('SIGINT', () => stop(0));
process.on('SIGTERM', () => stop(0));
