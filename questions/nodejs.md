# Node.js

[← Back to index](../README.md) · [⭐ Favorites](favorites.md)

10 questions · 0 favorites

## Basic

### How does the Node.js event loop work?

Node runs JS on a single thread with libuv handling async I/O (and a thread pool for fs, crypto, DNS). The loop phases: **timers** -> pending callbacks -> poll (I/O) -> **check** (`setImmediate`) -> close callbacks.

Between each callback, `process.nextTick` runs first, then promise microtasks. Never block the loop with CPU-heavy synchronous work.

_Tags: event-loop_

### What is the difference between `process.nextTick`, `setImmediate` and `setTimeout(fn, 0)`?

- `nextTick`: runs right after the current operation, before promise microtasks and before the loop continues. Can starve I/O if abused.
- `setImmediate`: runs in the check phase, after the poll phase.
- `setTimeout(0)`: runs in the timers phase after at least ~1ms.

From the main module, `timeout` vs `immediate` order is non-deterministic; inside an I/O callback, `setImmediate` always runs first.

_Tags: event-loop, async_

### CommonJS vs ES modules in Node?

CJS: `require`, synchronous, dynamic, `module.exports`. ESM: `import`/`export`, static analysis (tree-shaking), async loading, top-level `await`, enabled with `.mjs` or `"type": "module"`. ESM has no `__dirname` (use `import.meta.url`), and `require`-ing ESM isn't straightforward. Interop is the main migration pain.

_Tags: modules_

## Intermediate

### What are Streams and why use them?

Streams process data in chunks instead of loading it all into memory: Readable, Writable, Duplex, Transform. They give **backpressure** (a slow consumer signals the producer to pause).

```js
import { pipeline } from 'node:stream/promises';
await pipeline(fs.createReadStream('big.csv'), parseTransform, zlib.createGzip(), fs.createWriteStream('out.gz'));
```
Use `pipeline` (handles errors and cleanup) rather than manual `.pipe()`.

_Tags: streams, performance_

### How do you scale a Node.js app to use all CPU cores?

- **`cluster`** module / PM2: multiple processes sharing a port.
- **`worker_threads`** for CPU-bound tasks inside one process (shared memory via `SharedArrayBuffer`).
- In containers, prefer **one process per container** and scale horizontally with Kubernetes replicas + a load balancer; keep apps stateless (sessions in Redis, not memory).

_Tags: scaling, concurrency_

### How do you handle errors properly in async Node code?

- Use `async/await` with `try/catch`; always return/await promises (no floating promises).
- Centralised Express/Nest error middleware or exception filters; custom error classes with status codes.
- Listen to `unhandledRejection`/`uncaughtException` only to log and **exit**, letting the orchestrator restart. State may be corrupt after an uncaught exception.
- Distinguish operational errors (bad input, timeouts) from programmer errors (bugs).

_Tags: errors, async_

### Express vs NestJS vs Fastify: how do you choose?

- **Express:** minimal, huge ecosystem, but you define structure yourself.
- **Fastify:** faster, schema-based validation/serialisation, good plugin model.
- **NestJS:** opinionated (modules, DI, decorators, guards, pipes, interceptors), TypeScript-first; scales well for big teams and microservices. (You used it in MyLiveCV.)

Choose structure vs freedom based on team size and codebase lifespan.

_Tags: frameworks, nestjs_

### How do you secure a Node.js API?

- Validate all input (zod/class-validator), parameterised queries, escape output.
- AuthN/AuthZ: short-lived JWT or sessions, refresh rotation, RBAC/ABAC checks server-side.
- `helmet`, strict CORS, rate limiting, request size limits.
- Secrets from a vault/env, never in git; `npm audit`/dependency pinning, lockfiles.
- Don't run as root in the container; keep images minimal.

_Tags: security_

## Advanced

### How do you find and fix a memory leak or high CPU in a Node service?

1. Observe: RSS/heap growth, GC pauses, event-loop lag (Datadog / `perf_hooks.monitorEventLoopDelay`).
2. Capture heap snapshots (`--inspect`, Chrome DevTools, `v8.writeHeapSnapshot`) at two points and diff; look at retained size.
3. CPU: `--cpu-prof` or `clinic.js` flamegraphs.

Usual leaks: unbounded caches/Maps, listeners never removed, closures holding large objects, unresolved promises, timers never cleared.

_Tags: debugging, performance_

### How does backpressure work with HTTP and what happens if you ignore it?

`writable.write()` returns `false` when its buffer exceeds `highWaterMark`; you should wait for `'drain'`. If ignored, data piles up in memory, causing high RSS and potential OOM when a client is slow. `pipeline` / `pipe` handle this automatically.

_Tags: streams_
