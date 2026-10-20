# Golang

[← Back to index](../README.md) · [⭐ Favorites](favorites.md)

12 questions · 0 favorites

## Basic

### What are goroutines and how do they differ from OS threads?

Goroutines are lightweight, user-space threads managed by the Go runtime scheduler (M:N model: many goroutines multiplexed on a few OS threads). They start with a small (~2KB) growable stack, are cheap to create (hundreds of thousands are fine), and are scheduled cooperatively/preemptively by the runtime (G-M-P model).

_Tags: concurrency_

### Explain slices vs arrays, and the gotchas of `append`.

An array has fixed length and is a value type. A slice is a small header `{ptr, len, cap}` pointing to an underlying array. Slices share backing storage, so modifying one view can affect another. `append` may reallocate when `cap` is exceeded, so after that the new slice no longer aliases the old one.

```go
a := []int{1, 2, 3}
b := a[:2]
b = append(b, 99) // overwrites a[2] because cap allows it
```
Use `copy` or the full slice expression `a[:2:2]` to avoid aliasing.

_Tags: slices, gotchas_

### How does error handling work in Go?

Errors are values returned as the last result (`error` interface). Check `if err != nil`. Wrap with context using `fmt.Errorf("load config: %w", err)`; inspect with `errors.Is` / `errors.As`. `panic`/`recover` is for truly unrecoverable states, not control flow.

_Tags: errors_

### What is `defer` and when does it run?

`defer` schedules a call to run when the surrounding function returns (LIFO order). Arguments are evaluated at the defer statement. Typical use: closing files/unlocking mutexes. Deferred functions can modify named return values. Beware of defers in loops (they pile up until function exit).

_Tags: basics_

## Intermediate

### Channels: buffered vs unbuffered, and how do you avoid deadlocks and goroutine leaks?

Unbuffered channels synchronise sender and receiver; buffered channels decouple up to `cap`. Deadlock: all goroutines blocked waiting. Leaks: a goroutine blocked forever on send/receive.

Rules: the **sender** closes the channel; receiving on closed channel yields zero value (`v, ok := <-ch`); never send on a closed channel (panic). Always give goroutines an exit path via `context.Context` or a `done` channel, and use `select` with `ctx.Done()`.

_Tags: concurrency, channels_

### How do you use `context.Context` properly?

Pass it as the **first parameter** of functions doing I/O or long work. It carries cancellation, deadlines (`WithTimeout`) and request-scoped values (sparingly). Always `defer cancel()`. Check `ctx.Err()` / `<-ctx.Done()` in loops and pass it into DB/HTTP calls (`http.NewRequestWithContext`). Don't store contexts in structs.

_Tags: context_

### `sync.Mutex` vs channels vs `sync/atomic`: which and when?

- **Channels:** passing ownership of data / coordinating goroutines (pipelines, worker pools).
- **Mutex/RWMutex:** protecting shared state (caches, counters with invariants).
- **atomic:** single-variable counters/flags, lock-free.
- Also: `sync.WaitGroup`, `errgroup`, `sync.Once`, `sync.Pool`.

Proverb: "Don't communicate by sharing memory; share memory by communicating," but a mutex is often simpler and right. Always run tests with `-race`.

_Tags: concurrency, sync_

### How do interfaces work in Go? What does "accept interfaces, return structs" mean?

Interfaces are satisfied **implicitly**: any type with the methods implements it, with no `implements` keyword. Keep them small and define them at the consumer side. Functions should accept narrow interfaces (easy to mock/test) and return concrete types (callers get full capability).

Gotcha: an interface holding a nil pointer is **not** `== nil`: the interface has a type but a nil value.

_Tags: interfaces, design_

### Design a worker pool in Go.

```go
func run(ctx context.Context, jobs <-chan Job, n int) error {
    g, ctx := errgroup.WithContext(ctx)
    for i := 0; i < n; i++ {
        g.Go(func() error {
            for {
                select {
                case <-ctx.Done():
                    return ctx.Err()
                case j, ok := <-jobs:
                    if !ok { return nil }
                    if err := process(ctx, j); err != nil { return err }
                }
            }
        })
    }
    return g.Wait()
}
```
Bounded concurrency, cancellation on first error, clean shutdown when the producer closes `jobs`.

_Tags: concurrency, patterns_

## Advanced

### How does the Go garbage collector work, and how do you reduce GC pressure?

Concurrent, tri-colour mark-and-sweep, non-generational and non-compacting, with short stop-the-world phases. Tuned by `GOGC` (and `GOMEMLIMIT` since 1.19).

Reduce pressure: fewer allocations (preallocate slices/maps, reuse buffers via `sync.Pool`, avoid needless pointers/interface boxing), keep values on the stack (check `go build -gcflags=-m` escape analysis), profile with `pprof` (heap, allocs).

_Tags: gc, performance_

### Explain the Go scheduler (G-M-P) and what happens on a blocking syscall.

**G** = goroutine, **M** = OS thread, **P** = logical processor holding a local run queue (count = `GOMAXPROCS`). An M needs a P to run Gs. Idle Ps steal work from other queues. On a blocking syscall the M is detached from its P, which is handed to another M so other goroutines keep running. The network poller makes network I/O non-blocking for goroutines. Since 1.14 there is async preemption.

_Tags: runtime, scheduler_

### How do you profile and debug a slow or leaking Go service?

Import `net/http/pprof` (or use `runtime/pprof`) and collect CPU, heap, goroutine, block and mutex profiles: `go tool pprof`, flamegraphs. Use `go test -bench -benchmem`, `go test -race`, and `runtime/trace` for scheduling issues. A growing goroutine count is the classic leak sign (blocked channels with no cancellation). Pair with Datadog continuous profiler in production.

_Tags: debugging, pprof_
