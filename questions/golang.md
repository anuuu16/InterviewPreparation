# Golang

[← Back to index](../README.md) · [⭐ Favorites](favorites.md)

126 questions · 0 favorites · [📚 Resources](#resources)

## Contents

**Basic**

- [1. What is Go, and why do companies choose it for backend services?](#1-what-is-go-and-why-do-companies-choose-it-for-backend-services)
- [2. What is a Go package, a module, and what does `go.mod` do?](#2-what-is-a-go-package-a-module-and-what-does-gomod-do)
- [3. What are zero values in Go, and why do they matter?](#3-what-are-zero-values-in-go-and-why-do-they-matter)
- [4. What is the difference between `var`, `:=` and `const`?](#4-what-is-the-difference-between-var--and-const)
- [5. How do `const` and `iota` work? Give a typical use.](#5-how-do-const-and-iota-work-give-a-typical-use)
- [6. Explain Go's basic types and how type conversion works.](#6-explain-gos-basic-types-and-how-type-conversion-works)
- [7. What are arrays and slices? Why are slices used almost everywhere?](#7-what-are-arrays-and-slices-why-are-slices-used-almost-everywhere)
- [8. What do `len`, `cap` and slicing (`s\[a:b\]`) mean? How does a slice look inside?](#8-what-do-len-cap-and-slicing-sab-mean-how-does-a-slice-look-inside)
- [9. How do maps work in Go, and what are the common mistakes?](#9-how-do-maps-work-in-go-and-what-are-the-common-mistakes)
- [10. How are strings, bytes and runes related in Go?](#10-how-are-strings-bytes-and-runes-related-in-go)
- [11. How do structs and methods work in Go (no classes)?](#11-how-do-structs-and-methods-work-in-go-no-classes)
- [12. What are pointers in Go, and when should you use them?](#12-what-are-pointers-in-go-and-when-should-you-use-them)
- [13. Value receiver vs pointer receiver: how do you choose?](#13-value-receiver-vs-pointer-receiver-how-do-you-choose)
- [14. What are interfaces in Go and how are they implemented?](#14-what-are-interfaces-in-go-and-how-are-they-implemented)
- [15. How does error handling work in Go? Why no exceptions?](#15-how-does-error-handling-work-in-go-why-no-exceptions)
- [16. What does `defer` do? Explain order and argument evaluation.](#16-what-does-defer-do-explain-order-and-argument-evaluation)
- [17. What are `panic` and `recover`? When is it OK to use them?](#17-what-are-panic-and-recover-when-is-it-ok-to-use-them)
- [18. Explain `for`, `range` and `switch` in Go. What is different from other languages?](#18-explain-for-range-and-switch-in-go-what-is-different-from-other-languages)
- [19. How do functions work in Go: multiple returns, variadic, named returns, closures?](#19-how-do-functions-work-in-go-multiple-returns-variadic-named-returns-closures)
- [20. How does `init()` work and what is the package initialisation order?](#20-how-does-init-work-and-what-is-the-package-initialisation-order)
- [21. How does Go decide what is public or private?](#21-how-does-go-decide-what-is-public-or-private)
- [22. How do embedding and composition replace inheritance in Go?](#22-how-do-embedding-and-composition-replace-inheritance-in-go)
- [23. What Go tools should every developer know (`go fmt`, `vet`, `test`, `build`, `run`)?](#23-what-go-tools-should-every-developer-know-go-fmt-vet-test-build-run)
- [24. What are generics in Go and when should you use them? (Go 1.18+)](#24-what-are-generics-in-go-and-when-should-you-use-them-go-118)
- [25. What is a goroutine and how do you start one?](#25-what-is-a-goroutine-and-how-do-you-start-one)
- [26. How do channels work? Explain buffered vs unbuffered.](#26-how-do-channels-work-explain-buffered-vs-unbuffered)
- [27. How does `select` work with channels?](#27-how-does-select-work-with-channels)
- [28. What is `sync.WaitGroup` and how do you use it correctly?](#28-what-is-syncwaitgroup-and-how-do-you-use-it-correctly)

**Intermediate**

- [29. \[Tech Lead\] A Go service has become slow in production. How do you approach it?](#29-tech-lead-a-go-service-has-become-slow-in-production-how-do-you-approach-it)
- [30. \[Tech Lead\] How do you use `pprof` to find CPU hot spots and memory problems?](#30-tech-lead-how-do-you-use-pprof-to-find-cpu-hot-spots-and-memory-problems)
- [31. \[Tech Lead\] When do you use the Go execution tracer (`go tool trace`) instead of pprof?](#31-tech-lead-when-do-you-use-the-go-execution-tracer-go-tool-trace-instead-of-pprof)
- [32. \[Tech Lead\] How do you reduce memory allocations and GC pressure in Go?](#32-tech-lead-how-do-you-reduce-memory-allocations-and-gc-pressure-in-go)
- [33. \[Tech Lead\] How do you find and fix a memory leak in a running Go service?](#33-tech-lead-how-do-you-find-and-fix-a-memory-leak-in-a-running-go-service)
- [34. \[Tech Lead\] How do you load test a Go service and read the results correctly?](#34-tech-lead-how-do-you-load-test-a-go-service-and-read-the-results-correctly)
- [35. \[Tech Lead\] Under high load the service gets slow but CPU is low. What could be wrong?](#35-tech-lead-under-high-load-the-service-gets-slow-but-cpu-is-low-what-could-be-wrong)
- [36. \[Tech Lead\] How do you tune the Go runtime inside containers (`GOMAXPROCS`, `GOMEMLIMIT`, `GOGC`, CPU limits)?](#36-tech-lead-how-do-you-tune-the-go-runtime-inside-containers-gomaxprocs-gomemlimit-gogc-cpu-limits)
- [37. \[Tech Lead\] The app crashed in production. How do you find out which module or line broke it?](#37-tech-lead-the-app-crashed-in-production-how-do-you-find-out-which-module-or-line-broke-it)
- [38. \[Tech Lead\] How do you read a Go panic stack trace?](#38-tech-lead-how-do-you-read-a-go-panic-stack-trace)
- [39. \[Tech Lead\] Which Go errors can NOT be recovered with `recover()`?](#39-tech-lead-which-go-errors-can-not-be-recovered-with-recover)
- [40. \[Tech Lead\] How do you make sure a panic in a goroutine does not take down the whole service?](#40-tech-lead-how-do-you-make-sure-a-panic-in-a-goroutine-does-not-take-down-the-whole-service)
- [41. \[Tech Lead\] How do you design error handling across a whole codebase so errors tell you which module failed?](#41-tech-lead-how-do-you-design-error-handling-across-a-whole-codebase-so-errors-tell-you-which-module-failed)
- [42. \[Tech Lead\] What logs, metrics and alerts do you set up so you find the broken module fast?](#42-tech-lead-what-logs-metrics-and-alerts-do-you-set-up-so-you-find-the-broken-module-fast)
- [43. \[Tech Lead\] Walk me through your incident process for a production crash (detect, mitigate, fix, learn).](#43-tech-lead-walk-me-through-your-incident-process-for-a-production-crash-detect-mitigate-fix-learn)
- [44. \[Tech Lead\] How do you design a Go service for high concurrency: bounded concurrency, queues and backpressure?](#44-tech-lead-how-do-you-design-a-go-service-for-high-concurrency-bounded-concurrency-queues-and-backpressure)
- [45. \[Tech Lead\] What is load shedding and how do you protect a service from overload?](#45-tech-lead-what-is-load-shedding-and-how-do-you-protect-a-service-from-overload)
- [46. \[Tech Lead\] How do you propagate timeouts and deadlines across services (timeout budgets)?](#46-tech-lead-how-do-you-propagate-timeouts-and-deadlines-across-services-timeout-budgets)
- [47. \[Tech Lead\] Why is p99 latency high in a Go service, and what is tail latency?](#47-tech-lead-why-is-p99-latency-high-in-a-go-service-and-what-is-tail-latency)
- [48. \[Tech Lead\] You must optimise a slow endpoint end to end. What is your checklist?](#48-tech-lead-you-must-optimise-a-slow-endpoint-end-to-end-what-is-your-checklist)
- [49. \[Tech Lead\] How do you find and fix N+1 queries and other database performance issues in a Go service?](#49-tech-lead-how-do-you-find-and-fix-n1-queries-and-other-database-performance-issues-in-a-go-service)
- [50. \[Tech Lead\] How do you debug a Go service in production without restarting it?](#50-tech-lead-how-do-you-debug-a-go-service-in-production-without-restarting-it)
- [51. \[Tech Lead\] How do you capacity-plan and scale a Go service on Kubernetes?](#51-tech-lead-how-do-you-capacity-plan-and-scale-a-go-service-on-kubernetes)
- [52. \[Tech Lead\] What do you enforce in code reviews and CI for a Go team?](#52-tech-lead-what-do-you-enforce-in-code-reviews-and-ci-for-a-go-team)
- [53. \[Tech Lead\] How do you prevent performance regressions from reaching production?](#53-tech-lead-how-do-you-prevent-performance-regressions-from-reaching-production)
- [54. How does `append` grow a slice, and what are the aliasing gotchas?](#54-how-does-append-grow-a-slice-and-what-are-the-aliasing-gotchas)
- [55. Why is an interface holding a nil pointer not equal to nil?](#55-why-is-an-interface-holding-a-nil-pointer-not-equal-to-nil)
- [56. How do type assertions and type switches work?](#56-how-do-type-assertions-and-type-switches-work)
- [57. How do you wrap, compare and inspect errors (`%w`, `errors.Is`, `errors.As`, `errors.Join`)?](#57-how-do-you-wrap-compare-and-inspect-errors-w-errorsis-errorsas-errorsjoin)
- [58. What is `context.Context` and how do you use it for cancellation and timeouts?](#58-what-is-contextcontext-and-how-do-you-use-it-for-cancellation-and-timeouts)
- [59. When do you use `sync.Mutex` and `sync.RWMutex`? Show a safe cache.](#59-when-do-you-use-syncmutex-and-syncrwmutex-show-a-safe-cache)
- [60. What is the `sync/atomic` package and when is it better than a mutex?](#60-what-is-the-syncatomic-package-and-when-is-it-better-than-a-mutex)
- [61. What are `sync.Once` and `sync.OnceValue` used for?](#61-what-are-synconce-and-synconcevalue-used-for)
- [62. What is `sync.Pool` and when should you use it?](#62-what-is-syncpool-and-when-should-you-use-it)
- [63. How does `errgroup` help run goroutines that can fail?](#63-how-does-errgroup-help-run-goroutines-that-can-fail)
- [64. Show a worker pool pattern in Go and explain how it works.](#64-show-a-worker-pool-pattern-in-go-and-explain-how-it-works)
- [65. Explain fan-out and fan-in with an example.](#65-explain-fan-out-and-fan-in-with-an-example)
- [66. What is a pipeline in Go and how do you stop it early without leaking goroutines?](#66-what-is-a-pipeline-in-go-and-how-do-you-stop-it-early-without-leaking-goroutines)
- [67. How do you limit concurrency (semaphore pattern) in Go?](#67-how-do-you-limit-concurrency-semaphore-pattern-in-go)
- [68. How do you rate limit in Go (ticker, `x/time/rate`)?](#68-how-do-you-rate-limit-in-go-ticker-xtimerate)
- [69. What is a goroutine leak? How do you detect and prevent it?](#69-what-is-a-goroutine-leak-how-do-you-detect-and-prevent-it)
- [70. What is a data race? How does the race detector help?](#70-what-is-a-data-race-how-does-the-race-detector-help)
- [71. What causes a deadlock in Go and how do you debug one?](#71-what-causes-a-deadlock-in-go-and-how-do-you-debug-one)
- [72. Who should close a channel, and how do you shut down goroutines cleanly?](#72-who-should-close-a-channel-and-how-do-you-shut-down-goroutines-cleanly)
- [73. How do generic constraints work, and what do `slices` and `maps` packages offer (Go 1.21+)?](#73-how-do-generic-constraints-work-and-what-do-slices-and-maps-packages-offer-go-121)
- [74. What changed with loop variables in Go 1.22 and why does it matter?](#74-what-changed-with-loop-variables-in-go-122-and-why-does-it-matter)
- [75. What is the functional options pattern and why is it popular?](#75-what-is-the-functional-options-pattern-and-why-is-it-popular)
- [76. Explain `io.Reader` and `io.Writer`. Why are they so important?](#76-explain-ioreader-and-iowriter-why-are-they-so-important)
- [77. How do you work with time in Go (`time.Duration`, formatting, time zones, timers)?](#77-how-do-you-work-with-time-in-go-timeduration-formatting-time-zones-timers)
- [78. How does JSON encoding and decoding work (`encoding/json`, struct tags)?](#78-how-does-json-encoding-and-decoding-work-encodingjson-struct-tags)
- [79. Why can't you assign to a struct field inside a map, and what are the copy semantics of structs, slices and maps?](#79-why-cant-you-assign-to-a-struct-field-inside-a-map-and-what-are-the-copy-semantics-of-structs-slices-and-maps)
- [80. How do you write table-driven tests in Go?](#80-how-do-you-write-table-driven-tests-in-go)
- [81. How do subtests, `t.Parallel`, `t.Helper`, `t.Cleanup` and `TestMain` work?](#81-how-do-subtests-tparallel-thelper-tcleanup-and-testmain-work)
- [82. How do you mock dependencies and test HTTP handlers in Go?](#82-how-do-you-mock-dependencies-and-test-http-handlers-in-go)
- [83. How do you write benchmarks and read the results?](#83-how-do-you-write-benchmarks-and-read-the-results)
- [84. What is fuzz testing in Go (1.18+) and when is it useful?](#84-what-is-fuzz-testing-in-go-118-and-when-is-it-useful)
- [85. How do you build an HTTP server with only the standard library (Go 1.22 routing)?](#85-how-do-you-build-an-http-server-with-only-the-standard-library-go-122-routing)
- [86. What is middleware in Go HTTP and how do you write it?](#86-what-is-middleware-in-go-http-and-how-do-you-write-it)
- [87. How should you configure the Go HTTP client (timeouts, reuse, closing bodies)?](#87-how-should-you-configure-the-go-http-client-timeouts-reuse-closing-bodies)
- [88. How do you implement graceful shutdown of a Go service?](#88-how-do-you-implement-graceful-shutdown-of-a-go-service)
- [89. How does `database/sql` work, and how do you tune the connection pool?](#89-how-does-databasesql-work-and-how-do-you-tune-the-connection-pool)
- [90. How do you use transactions correctly in Go?](#90-how-do-you-use-transactions-correctly-in-go)
- [91. `database/sql` vs pgx vs sqlx vs sqlc vs GORM: how do you choose?](#91-databasesql-vs-pgx-vs-sqlx-vs-sqlc-vs-gorm-how-do-you-choose)
- [92. How do you structure a Go project? (`cmd`, `internal`, `pkg` and layered design)](#92-how-do-you-structure-a-go-project-cmd-internal-pkg-and-layered-design)
- [93. How do you do dependency injection in Go without a framework?](#93-how-do-you-do-dependency-injection-in-go-without-a-framework)
- [94. How do you handle configuration and secrets in a Go service?](#94-how-do-you-handle-configuration-and-secrets-in-a-go-service)
- [95. How does structured logging with `log/slog` (Go 1.21+) work?](#95-how-does-structured-logging-with-logslog-go-121-work)
- [96. How do Go modules handle versions, `replace`, `vendor`, workspaces and major versions?](#96-how-do-go-modules-handle-versions-replace-vendor-workspaces-and-major-versions)
- [97. How do you cross-compile Go and use build tags and `-ldflags`?](#97-how-do-you-cross-compile-go-and-use-build-tags-and--ldflags)
- [98. How do you build a small, secure Docker image for a Go service?](#98-how-do-you-build-a-small-secure-docker-image-for-a-go-service)
- [99. How do you build a gRPC service in Go, and when do you choose gRPC over REST?](#99-how-do-you-build-a-grpc-service-in-go-and-when-do-you-choose-grpc-over-rest)
- [100. How do you implement retries with exponential backoff and jitter in Go?](#100-how-do-you-implement-retries-with-exponential-backoff-and-jitter-in-go)
- [101. How does a circuit breaker work, and how do you add one in Go?](#101-how-does-a-circuit-breaker-work-and-how-do-you-add-one-in-go)
- [102. How do you avoid duplicate work with `singleflight` and add caching?](#102-how-do-you-avoid-duplicate-work-with-singleflight-and-add-caching)
- [103. How do you build a reliable message consumer (Kafka/RabbitMQ) in Go?](#103-how-do-you-build-a-reliable-message-consumer-kafkarabbitmq-in-go)
- [104. How do you validate input and map errors to HTTP responses in a clean way?](#104-how-do-you-validate-input-and-map-errors-to-http-responses-in-a-clean-way)
- [105. How do you add tracing and metrics to a Go service (OpenTelemetry, Datadog)?](#105-how-do-you-add-tracing-and-metrics-to-a-go-service-opentelemetry-datadog)
- [106. What is reflection in Go and when should you avoid it?](#106-what-is-reflection-in-go-and-when-should-you-avoid-it)

**Advanced**

- [107. Explain the Go scheduler (G-M-P model) in detail.](#107-explain-the-go-scheduler-g-m-p-model-in-detail)
- [108. How does Go's garbage collector work, and how does it keep pauses short?](#108-how-does-gos-garbage-collector-work-and-how-does-it-keep-pauses-short)
- [109. What is escape analysis? How does Go decide between stack and heap?](#109-what-is-escape-analysis-how-does-go-decide-between-stack-and-heap)
- [110. How are slices, maps and strings implemented internally?](#110-how-are-slices-maps-and-strings-implemented-internally)
- [111. How are channels implemented, and what happens inside a send or receive?](#111-how-are-channels-implemented-and-what-happens-inside-a-send-or-receive)
- [112. How are interfaces represented in memory, and what does dynamic dispatch cost?](#112-how-are-interfaces-represented-in-memory-and-what-does-dynamic-dispatch-cost)
- [113. What does the Go memory model guarantee? Explain happens-before.](#113-what-does-the-go-memory-model-guarantee-explain-happens-before)
- [114. When should you use `sync.Map`, and what are better alternatives for concurrent maps?](#114-when-should-you-use-syncmap-and-what-are-better-alternatives-for-concurrent-maps)
- [115. What is false sharing and how does struct layout affect performance?](#115-what-is-false-sharing-and-how-does-struct-layout-affect-performance)
- [116. What are the costs and risks of `unsafe` and cgo?](#116-what-are-the-costs-and-risks-of-unsafe-and-cgo)
- [117. What are the common `context` pitfalls and anti-patterns?](#117-what-are-the-common-context-pitfalls-and-anti-patterns)
- [118. How do Go generics work under the hood, and what are their performance trade-offs?](#118-how-do-go-generics-work-under-the-hood-and-what-are-their-performance-trade-offs)
- [119. What are iterators (`iter.Seq`, range-over-func) added in Go 1.23?](#119-what-are-iterators-iterseq-range-over-func-added-in-go-123)
- [120. Design a thread-safe LRU cache with TTL in Go.](#120-design-a-thread-safe-lru-cache-with-ttl-in-go)
- [121. Design a rate limiter for an API with many pods (distributed rate limiting).](#121-design-a-rate-limiter-for-an-api-with-many-pods-distributed-rate-limiting)
- [122. Design a job scheduler or worker system in Go that runs on several Kubernetes pods without duplicate work.](#122-design-a-job-scheduler-or-worker-system-in-go-that-runs-on-several-kubernetes-pods-without-duplicate-work)
- [123. Spot the concurrency bugs: what is wrong with these snippets?](#123-spot-the-concurrency-bugs-what-is-wrong-with-these-snippets)
- [124. Classic concurrency exercise: print odd and even numbers alternately with two goroutines.](#124-classic-concurrency-exercise-print-odd-and-even-numbers-alternately-with-two-goroutines)
- [125. How do you do zero-downtime deployments and safe database migrations for a Go service?](#125-how-do-you-do-zero-downtime-deployments-and-safe-database-migrations-for-a-go-service)
- [126. How would you build a Kubernetes controller or operator in Go?](#126-how-would-you-build-a-kubernetes-controller-or-operator-in-go)

## Browse by module

| Module | Questions |
| --- | --- |
| Concurrency (26) | [25](#25-what-is-a-goroutine-and-how-do-you-start-one) · [26](#26-how-do-channels-work-explain-buffered-vs-unbuffered) · [27](#27-how-does-select-work-with-channels) · [28](#28-what-is-syncwaitgroup-and-how-do-you-use-it-correctly) · [44](#44-tech-lead-how-do-you-design-a-go-service-for-high-concurrency-bounded-concurrency-queues-and-backpressure) · [58](#58-what-is-contextcontext-and-how-do-you-use-it-for-cancellation-and-timeouts) · [59](#59-when-do-you-use-syncmutex-and-syncrwmutex-show-a-safe-cache) · [60](#60-what-is-the-syncatomic-package-and-when-is-it-better-than-a-mutex) · [61](#61-what-are-synconce-and-synconcevalue-used-for) · [62](#62-what-is-syncpool-and-when-should-you-use-it) · [63](#63-how-does-errgroup-help-run-goroutines-that-can-fail) · [64](#64-show-a-worker-pool-pattern-in-go-and-explain-how-it-works) · [65](#65-explain-fan-out-and-fan-in-with-an-example) · [66](#66-what-is-a-pipeline-in-go-and-how-do-you-stop-it-early-without-leaking-goroutines) · [67](#67-how-do-you-limit-concurrency-semaphore-pattern-in-go) · [68](#68-how-do-you-rate-limit-in-go-ticker-xtimerate) · [69](#69-what-is-a-goroutine-leak-how-do-you-detect-and-prevent-it) · [70](#70-what-is-a-data-race-how-does-the-race-detector-help) · [71](#71-what-causes-a-deadlock-in-go-and-how-do-you-debug-one) · [72](#72-who-should-close-a-channel-and-how-do-you-shut-down-goroutines-cleanly) · [74](#74-what-changed-with-loop-variables-in-go-122-and-why-does-it-matter) · [113](#113-what-does-the-go-memory-model-guarantee-explain-happens-before) · [114](#114-when-should-you-use-syncmap-and-what-are-better-alternatives-for-concurrent-maps) · [117](#117-what-are-the-common-context-pitfalls-and-anti-patterns) · [123](#123-spot-the-concurrency-bugs-what-is-wrong-with-these-snippets) · [124](#124-classic-concurrency-exercise-print-odd-and-even-numbers-alternately-with-two-goroutines) |
| Debugging & Reliability (10) | [37](#37-tech-lead-the-app-crashed-in-production-how-do-you-find-out-which-module-or-line-broke-it) · [38](#38-tech-lead-how-do-you-read-a-go-panic-stack-trace) · [39](#39-tech-lead-which-go-errors-can-not-be-recovered-with-recover) · [40](#40-tech-lead-how-do-you-make-sure-a-panic-in-a-goroutine-does-not-take-down-the-whole-service) · [43](#43-tech-lead-walk-me-through-your-incident-process-for-a-production-crash-detect-mitigate-fix-learn) · [45](#45-tech-lead-what-is-load-shedding-and-how-do-you-protect-a-service-from-overload) · [46](#46-tech-lead-how-do-you-propagate-timeouts-and-deadlines-across-services-timeout-budgets) · [50](#50-tech-lead-how-do-you-debug-a-go-service-in-production-without-restarting-it) · [100](#100-how-do-you-implement-retries-with-exponential-backoff-and-jitter-in-go) · [101](#101-how-does-a-circuit-breaker-work-and-how-do-you-add-one-in-go) |
| Design & Patterns (7) | [75](#75-what-is-the-functional-options-pattern-and-why-is-it-popular) · [92](#92-how-do-you-structure-a-go-project-cmd-internal-pkg-and-layered-design) · [93](#93-how-do-you-do-dependency-injection-in-go-without-a-framework) · [120](#120-design-a-thread-safe-lru-cache-with-ttl-in-go) · [121](#121-design-a-rate-limiter-for-an-api-with-many-pods-distributed-rate-limiting) · [122](#122-design-a-job-scheduler-or-worker-system-in-go-that-runs-on-several-kubernetes-pods-without-duplicate-work) · [126](#126-how-would-you-build-a-kubernetes-controller-or-operator-in-go) |
| Errors & Panics (5) | [15](#15-how-does-error-handling-work-in-go-why-no-exceptions) · [16](#16-what-does-defer-do-explain-order-and-argument-evaluation) · [17](#17-what-are-panic-and-recover-when-is-it-ok-to-use-them) · [41](#41-tech-lead-how-do-you-design-error-handling-across-a-whole-codebase-so-errors-tell-you-which-module-failed) · [57](#57-how-do-you-wrap-compare-and-inspect-errors-w-errorsis-errorsas-errorsjoin) |
| HTTP & Microservices (7) | [85](#85-how-do-you-build-an-http-server-with-only-the-standard-library-go-122-routing) · [86](#86-what-is-middleware-in-go-http-and-how-do-you-write-it) · [87](#87-how-should-you-configure-the-go-http-client-timeouts-reuse-closing-bodies) · [88](#88-how-do-you-implement-graceful-shutdown-of-a-go-service) · [99](#99-how-do-you-build-a-grpc-service-in-go-and-when-do-you-choose-grpc-over-rest) · [103](#103-how-do-you-build-a-reliable-message-consumer-kafkarabbitmq-in-go) · [104](#104-how-do-you-validate-input-and-map-errors-to-http-responses-in-a-clean-way) |
| Interfaces & Generics (10) | [14](#14-what-are-interfaces-in-go-and-how-are-they-implemented) · [24](#24-what-are-generics-in-go-and-when-should-you-use-them-go-118) · [55](#55-why-is-an-interface-holding-a-nil-pointer-not-equal-to-nil) · [56](#56-how-do-type-assertions-and-type-switches-work) · [73](#73-how-do-generic-constraints-work-and-what-do-slices-and-maps-packages-offer-go-121) · [76](#76-explain-ioreader-and-iowriter-why-are-they-so-important) · [106](#106-what-is-reflection-in-go-and-when-should-you-avoid-it) · [112](#112-how-are-interfaces-represented-in-memory-and-what-does-dynamic-dispatch-cost) · [118](#118-how-do-go-generics-work-under-the-hood-and-what-are-their-performance-trade-offs) · [119](#119-what-are-iterators-iterseq-range-over-func-added-in-go-123) |
| Language Fundamentals (9) | [1](#1-what-is-go-and-why-do-companies-choose-it-for-backend-services) · [3](#3-what-are-zero-values-in-go-and-why-do-they-matter) · [4](#4-what-is-the-difference-between-var--and-const) · [5](#5-how-do-const-and-iota-work-give-a-typical-use) · [6](#6-explain-gos-basic-types-and-how-type-conversion-works) · [18](#18-explain-for-range-and-switch-in-go-what-is-different-from-other-languages) · [19](#19-how-do-functions-work-in-go-multiple-returns-variadic-named-returns-closures) · [20](#20-how-does-init-work-and-what-is-the-package-initialisation-order) · [21](#21-how-does-go-decide-what-is-public-or-private) |
| Observability & Operations (4) | [42](#42-tech-lead-what-logs-metrics-and-alerts-do-you-set-up-so-you-find-the-broken-module-fast) · [51](#51-tech-lead-how-do-you-capacity-plan-and-scale-a-go-service-on-kubernetes) · [95](#95-how-does-structured-logging-with-logslog-go-121-work) · [105](#105-how-do-you-add-tracing-and-metrics-to-a-go-service-opentelemetry-datadog) |
| Performance & Load (10) | [29](#29-tech-lead-a-go-service-has-become-slow-in-production-how-do-you-approach-it) · [30](#30-tech-lead-how-do-you-use-pprof-to-find-cpu-hot-spots-and-memory-problems) · [31](#31-tech-lead-when-do-you-use-the-go-execution-tracer-go-tool-trace-instead-of-pprof) · [34](#34-tech-lead-how-do-you-load-test-a-go-service-and-read-the-results-correctly) · [35](#35-tech-lead-under-high-load-the-service-gets-slow-but-cpu-is-low-what-could-be-wrong) · [47](#47-tech-lead-why-is-p99-latency-high-in-a-go-service-and-what-is-tail-latency) · [48](#48-tech-lead-you-must-optimise-a-slow-endpoint-end-to-end-what-is-your-checklist) · [49](#49-tech-lead-how-do-you-find-and-fix-n1-queries-and-other-database-performance-issues-in-a-go-service) · [53](#53-tech-lead-how-do-you-prevent-performance-regressions-from-reaching-production) · [102](#102-how-do-you-avoid-duplicate-work-with-singleflight-and-add-caching) |
| Runtime & Memory (10) | [32](#32-tech-lead-how-do-you-reduce-memory-allocations-and-gc-pressure-in-go) · [33](#33-tech-lead-how-do-you-find-and-fix-a-memory-leak-in-a-running-go-service) · [36](#36-tech-lead-how-do-you-tune-the-go-runtime-inside-containers-gomaxprocs-gomemlimit-gogc-cpu-limits) · [107](#107-explain-the-go-scheduler-g-m-p-model-in-detail) · [108](#108-how-does-gos-garbage-collector-work-and-how-does-it-keep-pauses-short) · [109](#109-what-is-escape-analysis-how-does-go-decide-between-stack-and-heap) · [110](#110-how-are-slices-maps-and-strings-implemented-internally) · [111](#111-how-are-channels-implemented-and-what-happens-inside-a-send-or-receive) · [115](#115-what-is-false-sharing-and-how-does-struct-layout-affect-performance) · [116](#116-what-are-the-costs-and-risks-of-unsafe-and-cgo) |
| Standard Library & Data (5) | [77](#77-how-do-you-work-with-time-in-go-timeduration-formatting-time-zones-timers) · [78](#78-how-does-json-encoding-and-decoding-work-encodingjson-struct-tags) · [89](#89-how-does-databasesql-work-and-how-do-you-tune-the-connection-pool) · [90](#90-how-do-you-use-transactions-correctly-in-go) · [91](#91-databasesql-vs-pgx-vs-sqlx-vs-sqlc-vs-gorm-how-do-you-choose) |
| Testing (5) | [80](#80-how-do-you-write-table-driven-tests-in-go) · [81](#81-how-do-subtests-tparallel-thelper-tcleanup-and-testmain-work) · [82](#82-how-do-you-mock-dependencies-and-test-http-handlers-in-go) · [83](#83-how-do-you-write-benchmarks-and-read-the-results) · [84](#84-what-is-fuzz-testing-in-go-118-and-when-is-it-useful) |
| Tooling & Delivery (8) | [2](#2-what-is-a-go-package-a-module-and-what-does-gomod-do) · [23](#23-what-go-tools-should-every-developer-know-go-fmt-vet-test-build-run) · [52](#52-tech-lead-what-do-you-enforce-in-code-reviews-and-ci-for-a-go-team) · [94](#94-how-do-you-handle-configuration-and-secrets-in-a-go-service) · [96](#96-how-do-go-modules-handle-versions-replace-vendor-workspaces-and-major-versions) · [97](#97-how-do-you-cross-compile-go-and-use-build-tags-and--ldflags) · [98](#98-how-do-you-build-a-small-secure-docker-image-for-a-go-service) · [125](#125-how-do-you-do-zero-downtime-deployments-and-safe-database-migrations-for-a-go-service) |
| Types & Data Structures (10) | [7](#7-what-are-arrays-and-slices-why-are-slices-used-almost-everywhere) · [8](#8-what-do-len-cap-and-slicing-sab-mean-how-does-a-slice-look-inside) · [9](#9-how-do-maps-work-in-go-and-what-are-the-common-mistakes) · [10](#10-how-are-strings-bytes-and-runes-related-in-go) · [11](#11-how-do-structs-and-methods-work-in-go-no-classes) · [12](#12-what-are-pointers-in-go-and-when-should-you-use-them) · [13](#13-value-receiver-vs-pointer-receiver-how-do-you-choose) · [22](#22-how-do-embedding-and-composition-replace-inheritance-in-go) · [54](#54-how-does-append-grow-a-slice-and-what-are-the-aliasing-gotchas) · [79](#79-why-cant-you-assign-to-a-struct-field-inside-a-map-and-what-are-the-copy-semantics-of-structs-slices-and-maps) |

## Basic

### 1. What is Go, and why do companies choose it for backend services?

**Short answer:** Go is a small, statically typed, compiled language made at Google. It is popular for backend services because it is simple to read, builds to one fast binary, and makes concurrency easy.

**Why teams pick it**

| Feature | What it means for you |
| --- | --- |
| Compiles to one static binary | Easy Docker images (tiny `scratch` or `distroless` images), easy deploys |
| Fast compile times | Short feedback loop, quick CI |
| Goroutines + channels | Handle thousands of connections without callback hell |
| Garbage collected | No manual `free`, but still low latency |
| Strong standard library | `net/http`, `encoding/json`, `testing` are production-ready |
| Opinionated tooling | `gofmt`, `go vet`, `go test` are built in, so code looks the same everywhere |

**Where it shines:** APIs, microservices, CLIs, Kubernetes operators, network tools. Docker and Kubernetes themselves are written in Go.

**Where it is a weaker fit:** heavy UI work, data science, or code that needs very rich type-level features.

```go
package main

import "fmt"

func main() {
	fmt.Println("Hello, Go!") // prints: Hello, Go!
}
```

**Interview tip:** Mention one real reason from your own work, for example "our services on Kubernetes were Go because the binaries are small and start fast".

_Module: Language Fundamentals · Tags: intro, basics_

### 2. What is a Go package, a module, and what does `go.mod` do?

**Short answer:** A *package* is a folder of `.go` files that share the same `package name`. A *module* is a collection of packages that are versioned together. `go.mod` describes the module and its dependencies.

**Think of it like this**
- Package = a folder (a unit of code you import).
- Module = the whole project or library (a unit of versioning).

```text
orders-service/          <- module  (go.mod lives here)
├── go.mod
├── main.go              <- package main
└── internal/
    └── billing/
        └── billing.go   <- package billing
```

```go
// go.mod
module github.com/acme/orders-service

go 1.22

require github.com/google/uuid v1.6.0
```

**Useful commands**

```bash
go mod init github.com/acme/orders-service   # create go.mod
go get github.com/google/uuid@v1.6.0         # add / upgrade a dependency
go mod tidy                                   # remove unused, add missing
```

- `go.sum` stores checksums so downloads cannot be tampered with. Commit it.
- Packages in a folder named `internal/` can only be imported by code inside the parent module. Great for hiding implementation details.
- The executable entry point is always `package main` with `func main()`.

_Module: Tooling & Delivery · Tags: modules, basics_

### 3. What are zero values in Go, and why do they matter?

**Short answer:** Every variable in Go has a value even if you do not set one. That default is called the *zero value*. This removes a whole class of "uninitialised variable" bugs.

| Type | Zero value |
| --- | --- |
| `int`, `float64` | `0` |
| `bool` | `false` |
| `string` | `""` (empty) |
| pointer, slice, map, channel, func, interface | `nil` |
| struct | each field gets its own zero value |

```go
package main

import "fmt"

type User struct {
	Name   string
	Age    int
	Active bool
}

func main() {
	var n int
	var s string
	var u User
	var m map[string]int
	var items []string

	fmt.Println(n, s == "", u, m == nil, items == nil)
	// prints: 0 true { 0 false} true true
}
```

**Make your types useful at zero value.** The standard library does this: a `sync.Mutex` or `bytes.Buffer` works right away without a constructor.

```go
var mu sync.Mutex // ready to use
mu.Lock()
```

**Gotcha:** a `nil` slice is fine to read and `append` to. A `nil` map is fine to read, but **writing to it panics** (see the maps question).

_Module: Language Fundamentals · Tags: basics, types_

### 4. What is the difference between `var`, `:=` and `const`?

**Short answer:** `var` declares a variable (can be used anywhere). `:=` is a short declaration that works only inside functions and infers the type. `const` declares a value that never changes and is known at compile time.

```go
package main

import "fmt"

var appName = "orders" // package level: must use var

const MaxRetries = 3 // constant, cannot change

func main() {
	var count int = 5      // explicit type
	var total = 10         // type inferred (int)
	name := "Anu"          // short form, inside functions only
	a, b := 1, 2           // declare several at once

	name = "Anubhav"       // assign (no colon) to change
	fmt.Println(appName, count, total, name, a, b, MaxRetries)
}
```

**Rules to remember**
1. `:=` needs **at least one new variable** on the left side.
2. In `:=` with an existing variable, that variable is *reused*, not recreated, **if in the same scope**.
3. Unused local variables and unused imports are **compile errors**.

**Classic bug: shadowing**

```go
err := doA()
if true {
	result, err := doB() // ❌ new err in this block; outer err is untouched
	_ = result
	_ = err
}
// outer err still holds doA's error
```

Use `go vet -vettool=shadow` or your linter (`govet` with shadow enabled) to catch it.

_Module: Language Fundamentals · Tags: basics, variables_

### 5. How do `const` and `iota` work? Give a typical use.

**Short answer:** `iota` is a counter that starts at 0 inside a `const` block and goes up by 1 for each line. It is mostly used to make enums.

```go
package main

import "fmt"

type Status int

const (
	Pending Status = iota // 0
	Paid                  // 1
	Shipped               // 2
	Delivered             // 3
)

// String makes printing readable.
func (s Status) String() string {
	return [...]string{"Pending", "Paid", "Shipped", "Delivered"}[s]
}

func main() {
	var s Status = Shipped
	fmt.Println(s, int(s)) // prints: Shipped 2
}
```

**Tricks**

```go
const (
	_  = iota             // skip 0
	KB = 1 << (10 * iota) // 1024
	MB                    // 1048576
	GB                    // 1073741824
)
```

**Things to know**
- Constants can be **untyped** (`const x = 5` can be used as int, float, etc.). This makes numeric code flexible.
- Go has no `enum` keyword. A named type + constants + a `String()` method is the idiom.
- Start real enums at 1 (or add an explicit `Unknown`) if the zero value should mean "not set". Otherwise a forgotten field silently becomes the first value.

_Module: Language Fundamentals · Tags: basics, enum_

### 6. Explain Go's basic types and how type conversion works.

**Short answer:** Go has `int`, `uint`, `float64`, `bool`, `string`, `byte` (= `uint8`), `rune` (= `int32`) and more. Go **never converts types automatically**. You must convert explicitly.

```go
package main

import (
	"fmt"
	"strconv"
)

func main() {
	var i int = 42
	var f float64 = float64(i) // explicit conversion
	// var bad float64 = i      // ❌ compile error: mismatched types

	// string <-> number needs strconv, NOT string(i)
	s := strconv.Itoa(i)        // "42"
	n, err := strconv.Atoi("123")
	fmt.Println(f, s, n, err)   // prints: 42 42 123 <nil>

	fmt.Println(string(rune(65))) // prints: A  (rune -> string)
	fmt.Println(string(rune(i)))  // prints: *  (code point 42, not "42")
}
```

**Good to know**
- `int` size depends on the machine (64-bit on modern systems). Use `int64`/`int32` when the size matters (databases, wire formats).
- Integer overflow **wraps around silently**. No exception.
- For money use integers in the smallest unit (paise/cents) or a decimal library, never `float64`.
- Converting a number to `string` with `string(65)` gives `"A"`, not `"65"`. `go vet` warns about it.

_Module: Language Fundamentals · Tags: basics, types_

### 7. What are arrays and slices? Why are slices used almost everywhere?

**Short answer:** An array has a fixed length that is part of its type, and it is copied when passed around. A slice is a flexible *window* onto an array and can grow with `append`.

```go
package main

import "fmt"

func main() {
	arr := [3]int{1, 2, 3} // array: length 3 is part of the type
	arr2 := arr            // full copy
	arr2[0] = 99
	fmt.Println(arr, arr2) // prints: [1 2 3] [99 2 3]

	s := []int{1, 2, 3}    // slice: no length in the type
	s = append(s, 4)
	fmt.Println(s, len(s)) // prints: [1 2 3 4] 4
}
```

| | Array | Slice |
| --- | --- | --- |
| Size | fixed | grows |
| Passing to function | copied | header copied (shares data) |
| Comparison with `==` | yes | no (only to `nil`) |
| Common use | rare (fixed buffers, hashes) | everywhere |

**Creating slices**

```go
a := []int{1, 2, 3}           // literal
b := make([]int, 0, 10)       // length 0, capacity 10
c := a[1:3]                    // sub-slice: shares memory with a
```

**Tip:** if you know the size in advance, `make([]T, 0, n)` avoids repeated reallocation.

_Module: Types & Data Structures · Tags: basics, slices_

### 8. What do `len`, `cap` and slicing (`s[a:b]`) mean? How does a slice look inside?

**Short answer:** A slice is a small struct with three fields: a pointer to an array, a length, and a capacity. `len` is how many elements you can see. `cap` is how many fit before Go must allocate a bigger array.

```mermaid
flowchart LR
    subgraph H["Slice header"]
        P["ptr"]
        L["len = 3"]
        C["cap = 5"]
    end
    P --> A0
    subgraph B["Backing array"]
        A0["10"] --- A1["20"] --- A2["30"] --- A3["_"] --- A4["_"]
    end
```

The header points to the first element. Only `len` elements are visible. Two more slots are free.

```go
package main

import "fmt"

func main() {
	s := make([]int, 3, 5)
	s[0], s[1], s[2] = 10, 20, 30
	fmt.Println(len(s), cap(s)) // prints: 3 5

	t := s[1:3]                  // elements 20, 30
	fmt.Println(t, len(t), cap(t)) // prints: [20 30] 2 4
	// cap(t) = 4 because it starts at index 1 of a 5-slot array

	t[0] = 999
	fmt.Println(s) // prints: [10 999 30]  <- s changed too (shared memory)
}
```

**Remember**
- `s[a:b]` includes `a`, excludes `b`.
- Sub-slices **share** the same memory. Changing one can change the other.
- To get an independent copy: `c := append([]int(nil), s...)` or `copy`.

_Module: Types & Data Structures · Tags: slices, internals_

### 9. How do maps work in Go, and what are the common mistakes?

**Short answer:** A map is a hash table: `map[KeyType]ValueType`. Lookups, inserts and deletes are on average O(1). Keys must be comparable (`==` works), so slices, maps and functions cannot be keys.

```go
package main

import "fmt"

func main() {
	stock := map[string]int{"apple": 5}
	stock["banana"] = 3

	qty, ok := stock["mango"] // "comma ok" tells missing from zero
	fmt.Println(qty, ok)      // prints: 0 false

	delete(stock, "apple")
	fmt.Println(len(stock))   // prints: 1

	for k, v := range stock { // order is RANDOM on purpose
		fmt.Println(k, v)
	}
}
```

**Mistakes**
1. **Writing to a nil map panics.**
   ```go
   var m map[string]int
   m["a"] = 1 // ❌ panic: assignment to entry in nil map
   m = make(map[string]int) // ✅ initialise first
   ```
2. **Assuming order.** Iteration order is random. Sort keys if you need order.
3. **Concurrent access.** Reading and writing from several goroutines crashes the program (`fatal error: concurrent map writes`). Protect with a mutex or use `sync.Map`.
4. Missing key returns the zero value. Use `v, ok := m[k]` when "absent" matters.

**Set trick:** `map[string]struct{}` uses zero memory for values.

_Module: Types & Data Structures · Tags: maps, basics_

### 10. How are strings, bytes and runes related in Go?

**Short answer:** A `string` is an immutable sequence of **bytes** (usually UTF-8). A `rune` is one Unicode code point. One character can take 1 to 4 bytes, so `len(s)` counts bytes, not characters.

```go
package main

import (
	"fmt"
	"unicode/utf8"
)

func main() {
	s := "Go语言"
	fmt.Println(len(s))                    // prints: 8   (bytes: 2 + 3 + 3)
	fmt.Println(utf8.RuneCountInString(s)) // prints: 4   (characters)

	for i, r := range s { // range decodes runes
		fmt.Println(i, string(r)) // 0 G, 1 o, 2 语, 5 言
	}

	fmt.Println(s[0])         // prints: 71  (a byte, not "G")
	fmt.Println(string(s[0])) // prints: G
}
```

**Rules of thumb**
- `for i, r := range str` gives **runes** (with the byte index `i`).
- `str[i]` gives a **byte**.
- Strings are immutable. To change characters, convert: `[]rune(s)` or `[]byte(s)`.
- Building a string in a loop with `+=` copies every time. Use `strings.Builder`.

```go
var b strings.Builder
for i := 0; i < 3; i++ {
	fmt.Fprintf(&b, "item-%d ", i)
}
fmt.Println(b.String()) // prints: item-0 item-1 item-2
```

_Module: Types & Data Structures · Tags: strings, unicode_

### 11. How do structs and methods work in Go (no classes)?

**Short answer:** Go has no classes. You define data with a `struct` and attach behaviour with *methods* (functions with a receiver). There is no inheritance. You compose instead.

```go
package main

import "fmt"

type Account struct {
	Owner   string
	Balance float64
}

// Method with a pointer receiver: can change the account.
func (a *Account) Deposit(amount float64) {
	a.Balance += amount
}

// Method with a value receiver: only reads.
func (a Account) Summary() string {
	return fmt.Sprintf("%s has %.2f", a.Owner, a.Balance)
}

func main() {
	acc := Account{Owner: "Anu"} // Balance is 0 (zero value)
	acc.Deposit(100)
	fmt.Println(acc.Summary()) // prints: Anu has 100.00
}
```

**Good to know**
- Use **named fields** when creating structs (`Account{Owner: "Anu"}`). It survives field reordering.
- A constructor is just a normal function by convention: `func NewAccount(owner string) *Account`.
- Fields starting with a capital letter are exported (visible to other packages).
- Structs are comparable with `==` if all their fields are.
- Struct tags (`` `json:"owner"` ``) add metadata for encoders.

_Module: Types & Data Structures · Tags: structs, methods_

### 12. What are pointers in Go, and when should you use them?

**Short answer:** A pointer holds the memory address of a value. `&x` gets the address, `*p` follows it. Go passes **everything by value**, so you use pointers when a function must change the original or when copying a big struct is wasteful.

```go
package main

import "fmt"

func addOne(n int)     { n++ }  // changes a copy
func addOnePtr(n *int) { *n++ } // changes the original

func main() {
	x := 5
	addOne(x)
	fmt.Println(x) // prints: 5

	addOnePtr(&x)
	fmt.Println(x) // prints: 6
}
```

**Use a pointer when**
- The function/method must modify the value.
- The struct is large, or contains something that must not be copied (a mutex).
- You need to express "no value" (`nil`), for example optional fields in JSON: `*string`.

**Do not use a pointer when** the value is small and read-only (ints, small structs, strings). Copies are cheap and avoid heap allocations.

**Differences from C**
- No pointer arithmetic.
- `nil` pointer dereference **panics** at runtime. Check for `nil` where a nil is possible.
- Go's garbage collector frees memory. Returning a pointer to a local variable is safe:

```go
func newCounter() *int {
	c := 0
	return &c // ✅ Go moves c to the heap automatically
}
```

_Module: Types & Data Structures · Tags: pointers, basics_

### 13. Value receiver vs pointer receiver: how do you choose?

**Short answer:** Use a **pointer receiver** if the method changes the struct, or the struct is big, or it contains a mutex. Use a **value receiver** for small, immutable-style types. **Do not mix** both on the same type.

```go
type Counter struct{ n int }

func (c Counter) ValueInc()  { c.n++ } // works on a copy, no effect
func (c *Counter) PtrInc()   { c.n++ } // changes the real counter

func main() {
	c := Counter{}
	c.ValueInc()
	c.PtrInc()
	fmt.Println(c.n) // prints: 1
}
```

**Method sets matter for interfaces**

| Type | Methods it has |
| --- | --- |
| `T` | value-receiver methods only |
| `*T` | value **and** pointer receiver methods |

So if `PtrInc` has a pointer receiver, only `*Counter` implements an interface that requires `PtrInc`:

```go
type Incrementer interface{ PtrInc() }

var _ Incrementer = &Counter{} // ✅
// var _ Incrementer = Counter{} // ❌ does not compile
```

**Checklist**
1. Mutates state? Pointer.
2. Contains `sync.Mutex`, `bytes.Buffer`, etc.? Pointer (copying breaks it).
3. Large struct? Pointer.
4. Otherwise small value type (like `time.Time`)? Value.
5. If one method needs a pointer, make **all** methods pointer receivers for consistency.

_Module: Types & Data Structures · Tags: methods, pointers, interfaces_

### 14. What are interfaces in Go and how are they implemented?

**Short answer:** An interface is a list of method signatures. A type implements it **automatically** by having those methods. There is no `implements` keyword. This is called *implicit* (structural) typing.

```go
package main

import "fmt"

type Notifier interface {
	Notify(msg string) error
}

type EmailNotifier struct{ To string }

func (e EmailNotifier) Notify(msg string) error {
	fmt.Println("email to", e.To, ":", msg)
	return nil
}

type SMSNotifier struct{ Phone string }

func (s SMSNotifier) Notify(msg string) error {
	fmt.Println("sms to", s.Phone, ":", msg)
	return nil
}

func alert(n Notifier) { _ = n.Notify("server down") }

func main() {
	alert(EmailNotifier{To: "ops@acme.com"})
	alert(SMSNotifier{Phone: "98xxxx"})
}
```

```mermaid
flowchart LR
    A["alert(n Notifier)"] --> I{{"Notifier interface"}}
    E["EmailNotifier"] -. implements .-> I
    S["SMSNotifier"] -. implements .-> I
```

**Why it is powerful**
- The *consumer* defines the interface it needs, so packages stay decoupled.
- Easy testing: pass a fake that has the same methods.
- Small interfaces are best (`io.Reader` has one method).

**Proverb:** "Accept interfaces, return structs."

The empty interface `interface{}` (alias `any`) can hold anything. Use it rarely, because you lose type safety.

_Module: Interfaces & Generics · Tags: interfaces, basics_

### 15. How does error handling work in Go? Why no exceptions?

**Short answer:** Functions that can fail return an `error` as the last value. The caller checks it right away. Go prefers errors as plain values so the control flow is visible in the code.

```go
package main

import (
	"errors"
	"fmt"
	"os"
)

func readConfig(path string) ([]byte, error) {
	data, err := os.ReadFile(path)
	if err != nil {
		// add context and keep the original error with %w
		return nil, fmt.Errorf("read config %q: %w", path, err)
	}
	return data, nil
}

func main() {
	_, err := readConfig("missing.yaml")
	if errors.Is(err, os.ErrNotExist) {
		fmt.Println("config not found:", err)
	}
}
// prints: config not found: read config "missing.yaml": open missing.yaml: no such file or directory
```

**Habits of good Go error handling**
1. Never ignore an error silently. If you really mean to, write `_ =` and a comment.
2. Add context when you pass it up (`%w`), so logs read like a story.
3. Handle an error **once**: either log it or return it, not both (you get duplicate logs).
4. Return early on errors. Keep the happy path unindented.

```go
if err != nil {
	return err
}
// happy path continues here
```

**Interview tip:** If asked "isn't `if err != nil` repetitive?", answer that it is explicit, makes every failure point visible in code review, and costs nothing at runtime.

_Module: Errors & Panics · Tags: errors, basics_

### 16. What does `defer` do? Explain order and argument evaluation.

**Short answer:** `defer` schedules a function call to run **when the surrounding function returns**, no matter how it returns (normal, early `return`, or panic). Deferred calls run in **last-in, first-out** order.

```go
package main

import "fmt"

func main() {
	defer fmt.Println("1st defer")
	defer fmt.Println("2nd defer")
	fmt.Println("body")
}
// prints:
// body
// 2nd defer
// 1st defer
```

**Typical use: cleanup next to the setup**

```go
f, err := os.Open("data.txt")
if err != nil {
	return err
}
defer f.Close() // runs even if later code returns early or panics
```

**Arguments are evaluated immediately, not at the end**

```go
x := 1
defer fmt.Println("deferred x =", x) // captures 1 now
x = 100
// prints: deferred x = 1
```

To read the *latest* value, use a closure: `defer func() { fmt.Println(x) }()`.

**Gotchas**
- `defer` inside a **loop** waits until the whole function ends. Opening 10,000 files in a loop with defer keeps them all open. Put the loop body in a helper function.
- Deferred functions can change **named return values**:

```go
func safeDiv(a, b int) (res int, err error) {
	defer func() {
		if r := recover(); r != nil {
			err = fmt.Errorf("recovered: %v", r)
		}
	}()
	return a / b, nil
}
```
- `defer mu.Unlock()` right after `mu.Lock()` is the standard pattern.

_Module: Errors & Panics · Tags: defer, basics_

### 17. What are `panic` and `recover`? When is it OK to use them?

**Short answer:** `panic` stops normal execution, runs the deferred functions, and crashes the program unless something calls `recover` in a deferred function. Use panic only for **programmer errors or impossible states**, not for normal failures (use `error` for those).

```go
package main

import "fmt"

func risky() {
	panic("something went very wrong")
}

func safe() {
	defer func() {
		if r := recover(); r != nil {
			fmt.Println("recovered:", r)
		}
	}()
	risky()
	fmt.Println("never printed")
}

func main() {
	safe()
	fmt.Println("program continues") // prints after: recovered: something went very wrong
}
```

```mermaid
flowchart TD
    A["panic called"] --> B["run deferred functions (LIFO)"]
    B --> C{"recover() called<br/>in a deferred func?"}
    C -- yes --> D["panic stops, function returns normally"]
    C -- no --> E["unwind to caller, repeat"]
    E --> F["program crashes with stack trace"]
```

**When it is acceptable**
- Startup problems that cannot be fixed (bad config, `template.Must`).
- Truly unreachable code.
- At the top of an HTTP handler or goroutine, to **log and survive** a bug (middleware that recovers).

**Rules**
- `recover` only works **inside a deferred function**.
- A panic in one goroutine cannot be recovered by another goroutine. It kills the whole process.
- Never use panic as control flow for expected cases such as "user not found".

_Module: Errors & Panics · Tags: panic, errors_

### 18. Explain `for`, `range` and `switch` in Go. What is different from other languages?

**Short answer:** Go has only one loop keyword, `for`, which covers while-loops, classic loops, and range loops. `switch` does not fall through by default and can switch on conditions with no value.

```go
package main

import "fmt"

func main() {
	// classic
	for i := 0; i < 3; i++ {
		fmt.Print(i, " ") // 0 1 2
	}

	// while-style
	n := 3
	for n > 0 {
		n--
	}

	// range over a slice: index and value
	for i, v := range []string{"a", "b"} {
		fmt.Println(i, v)
	}

	// range over an integer (Go 1.22+)
	for i := range 3 {
		fmt.Print(i, " ") // 0 1 2
	}

	// infinite loop with break
	for {
		break
	}
}
```

**switch**

```go
score := 82
switch {
case score >= 90:
	fmt.Println("A")
case score >= 75:
	fmt.Println("B") // runs, then exits (no fallthrough)
default:
	fmt.Println("C")
}
```

- Use `fallthrough` explicitly if you really want the next case to run.
- `switch x := v.(type)` is a **type switch** (see the interface questions).
- `break`/`continue` accept labels to leave outer loops: `outer: for ... { break outer }`.
- `range` over a map gives random order; over a channel it reads until the channel closes.

_Module: Language Fundamentals · Tags: control-flow, basics_

### 19. How do functions work in Go: multiple returns, variadic, named returns, closures?

**Short answer:** Functions are first-class values. They can return multiple values, take a variable number of arguments, and capture variables from outside (closures).

```go
package main

import "fmt"

// multiple returns: the (value, error) pattern
func divide(a, b float64) (float64, error) {
	if b == 0 {
		return 0, fmt.Errorf("divide by zero")
	}
	return a / b, nil
}

// variadic: nums is a []int inside the function
func sum(nums ...int) int {
	total := 0
	for _, n := range nums {
		total += n
	}
	return total
}

// closure: the returned func remembers "count"
func counter() func() int {
	count := 0
	return func() int {
		count++
		return count
	}
}

func main() {
	r, _ := divide(10, 4)
	fmt.Println(r)                  // 2.5
	fmt.Println(sum(1, 2, 3))       // 6
	fmt.Println(sum([]int{4, 5}...)) // 9  (spread a slice)

	next := counter()
	fmt.Println(next(), next(), next()) // 1 2 3
}
```

**Named returns** document the results and work with `defer`, but avoid "naked returns" in long functions because they hide what is returned:

```go
func parse(s string) (n int, err error) {
	n, err = strconv.Atoi(s)
	return // naked return: fine in tiny functions only
}
```

**Tip:** Functions can be stored in variables, passed as arguments, and used as `map` values. This is how the *functional options* and middleware patterns are built.

_Module: Language Fundamentals · Tags: functions, closures_

### 20. How does `init()` work and what is the package initialisation order?

**Short answer:** `init()` is a special function that runs automatically once when a package is loaded, before `main()`. Package-level variables are initialised first, then `init()` functions run.

**Order**

```mermaid
flowchart TD
    A["Imported packages are initialised first<br/>(dependencies before dependents)"] --> B["Package-level variables (in dependency order)"]
    B --> C["init() functions (in file order, top to bottom)"]
    C --> D["main()"]
```

```go
package main

import "fmt"

var a = initA() // runs 1st

func initA() int {
	fmt.Println("var a")
	return 1
}

func init() { fmt.Println("init 1") } // runs 2nd
func init() { fmt.Println("init 2") } // runs 3rd (several are allowed)

func main() { fmt.Println("main") }   // runs last
// prints: var a / init 1 / init 2 / main
```

**Why many teams avoid heavy `init()`**
- Hidden side effects: importing a package silently runs code.
- Hard to test, and the order across files is easy to get wrong.
- Failures are hard to handle (you can only panic or exit).

**Fine uses:** registering drivers or codecs (`import _ "github.com/lib/pq"`), setting up constant tables. Prefer explicit `NewX()` constructors for real setup.

_Module: Language Fundamentals · Tags: init, packages_

### 21. How does Go decide what is public or private?

**Short answer:** By the first letter of the name. A capital letter means **exported** (visible outside the package). A lowercase letter means **unexported** (visible only inside the package).

```go
package billing

type Invoice struct { // exported type
	ID     string // exported field
	amount int    // unexported field: only package billing can touch it
}

func NewInvoice(id string, amount int) *Invoice { // exported constructor
	return &Invoice{ID: id, amount: amount}
}

func (i *Invoice) Total() int { return i.amount } // getter for the hidden field

func validate(i *Invoice) bool { return i.amount > 0 } // private helper
```

**Design benefits**
- You control the public API and can change private parts freely.
- Use `internal/` folders to hide whole packages from outside the module.
- Do not write `GetX()`. In Go a getter is just `X()`, and a setter is `SetX()`.

**Gotcha:** JSON and other encoders (using reflection) can only see **exported** fields. An unexported field is silently skipped when encoding.

_Module: Language Fundamentals · Tags: packages, visibility_

### 22. How do embedding and composition replace inheritance in Go?

**Short answer:** You can put one struct inside another **without a field name** (embedding). The outer struct then gets the inner struct's fields and methods promoted. It looks like inheritance but it is just composition.

```go
package main

import "fmt"

type Logger struct{ Prefix string }

func (l Logger) Log(msg string) { fmt.Println(l.Prefix + msg) }

type Service struct {
	Logger         // embedded
	Name   string
}

func main() {
	s := Service{Logger: Logger{Prefix: "[orders] "}, Name: "orders"}
	s.Log("started") // promoted method. prints: [orders] started
	s.Logger.Log("also works")
}
```

**Important differences from inheritance**
- There is no "is-a" polymorphism through the embedded type. `Service` is **not** a subtype of `Logger`. But because `Service` gets `Log`, it satisfies an interface that needs `Log`.
- If the outer type defines the same method name, it **wins** (shadows the inner one).
- You can embed an **interface** in a struct to override only some methods (handy in tests):

```go
type fakeStore struct {
	Store // embedded interface; unimplemented methods panic if called
}
func (f fakeStore) Get(id string) string { return "stub" }
```

**Interview tip:** Say "favour composition over inheritance", and show you know that promoted methods are only syntax sugar for calling `s.Logger.Log`.

_Module: Types & Data Structures · Tags: embedding, composition_

### 23. What Go tools should every developer know (`go fmt`, `vet`, `test`, `build`, `run`)?

**Short answer:** The `go` command has everything for the daily loop: format, check, test, build, run, and manage dependencies.

| Command | What it does |
| --- | --- |
| `go run .` | Compile and run now (no binary kept) |
| `go build ./...` | Compile everything; produces a binary for `main` packages |
| `go test ./...` | Run all tests in the module |
| `go test -race ./...` | Tests with the **race detector** (use in CI) |
| `go test -cover` | Show test coverage |
| `go vet ./...` | Find suspicious code (wrong printf formats, copied locks) |
| `gofmt -w .` / `go fmt ./...` | Format code in the one official style |
| `go mod tidy` | Clean up dependencies |
| `go doc fmt.Println` | Read docs in the terminal |
| `go install pkg@version` | Install a tool |

**Also useful**
- `golangci-lint run` bundles many linters (staticcheck, errcheck, govet...). Run it in CI.
- `go generate` runs commands listed in `//go:generate` comments (mocks, stringers, protobuf).
- `pprof`, `go tool trace` for performance work.

**Why interviewers ask:** they want to see that you run `-race` and `vet` in CI, and that code style is never debated because `gofmt` decides.

_Module: Tooling & Delivery · Tags: tooling, basics_

### 24. What are generics in Go and when should you use them? (Go 1.18+)

**Short answer:** Generics let you write one function or type that works with many types, with the compiler still checking them. A *type parameter* goes in square brackets.

```go
package main

import "fmt"

// Number is a constraint: T must be one of these types.
type Number interface {
	~int | ~int64 | ~float64
}

func Sum[T Number](items []T) T {
	var total T
	for _, v := range items {
		total += v
	}
	return total
}

// Generic type
type Stack[T any] struct{ items []T }

func (s *Stack[T]) Push(v T) { s.items = append(s.items, v) }
func (s *Stack[T]) Pop() (T, bool) {
	var zero T
	if len(s.items) == 0 {
		return zero, false
	}
	v := s.items[len(s.items)-1]
	s.items = s.items[:len(s.items)-1]
	return v, true
}

func main() {
	fmt.Println(Sum([]int{1, 2, 3}))        // 6
	fmt.Println(Sum([]float64{1.5, 2.5}))   // 4

	st := &Stack[string]{}
	st.Push("a")
	v, _ := st.Pop()
	fmt.Println(v) // a
}
```

**Constraints:** `any` (no limit), `comparable` (works with `==`, map keys), or your own interface with a type list. `~int` means "int and any type whose underlying type is int".

**Use generics for:** collections, `Map/Filter/Reduce` helpers, repository base types, utilities that would otherwise need `interface{}` and casts.

**Do not use them** when a normal interface does the job, or just to avoid writing two lines of code. Prefer simple and readable.

_Module: Interfaces & Generics · Tags: generics_

### 25. What is a goroutine and how do you start one?

**Short answer:** A goroutine is a very light function that runs at the same time as other code. Start one by putting `go` before a function call. The Go runtime schedules thousands of them onto a few OS threads.

```go
package main

import (
	"fmt"
	"time"
)

func say(msg string) {
	for i := 0; i < 2; i++ {
		fmt.Println(msg, i)
		time.Sleep(10 * time.Millisecond)
	}
}

func main() {
	go say("goroutine") // runs concurrently
	say("main")
	// ⚠️ if main returns, ALL goroutines are killed immediately
}
```

**Key points**
- A goroutine starts with about 2 KB of stack that grows when needed. OS threads need around 1 MB+.
- `main` does not wait for goroutines. Use a `sync.WaitGroup` or channels to wait.
- Goroutines are *not* automatically cleaned up if they block forever (a **goroutine leak**).
- Output order is not guaranteed.

**Concurrency vs parallelism:** concurrency is *structuring* a program as independent tasks. Parallelism is *running* them at the same moment on several CPU cores. Go gives you concurrency; the runtime gives parallelism if cores are available.

_Module: Concurrency · Tags: goroutines, concurrency_

### 26. How do channels work? Explain buffered vs unbuffered.

**Short answer:** A channel is a typed pipe to send values between goroutines safely. An **unbuffered** channel makes the sender and receiver meet (both wait for each other). A **buffered** channel has room for N values, so sends only block when it is full.

```go
package main

import "fmt"

func main() {
	// unbuffered: send blocks until someone receives
	ch := make(chan string)
	go func() { ch <- "hello" }()
	fmt.Println(<-ch) // hello

	// buffered: can hold 2 values without a receiver
	jobs := make(chan int, 2)
	jobs <- 1
	jobs <- 2
	// jobs <- 3 // would block forever here (buffer full, nobody reading)
	close(jobs)

	for j := range jobs { // reads until closed and empty
		fmt.Println(j)
	}
}
```

```mermaid
sequenceDiagram
    participant P as Producer goroutine
    participant C as Channel (unbuffered)
    participant R as Receiver goroutine
    P->>C: send value (blocks)
    R->>C: receive (ready)
    C-->>R: value delivered
    C-->>P: send completes
```

**Rules**
1. Receiving from a **closed** channel returns the zero value immediately (`v, ok := <-ch`, `ok == false`).
2. **Sending to a closed channel panics.** Only the sender should close, and only once.
3. A `nil` channel blocks forever on send and receive (useful in `select` to disable a case).
4. Directional types document intent: `chan<- int` (send only), `<-chan int` (receive only).

**When to use buffered:** to absorb short bursts or limit concurrency (semaphore). Not to "fix" a deadlock.

_Module: Concurrency · Tags: channels, concurrency_

### 27. How does `select` work with channels?

**Short answer:** `select` waits on several channel operations at once and runs the first one that is ready. If many are ready, it picks one at random. A `default` case makes it non-blocking.

```go
package main

import (
	"fmt"
	"time"
)

func main() {
	result := make(chan string)
	go func() {
		time.Sleep(50 * time.Millisecond)
		result <- "done"
	}()

	select {
	case r := <-result:
		fmt.Println(r)
	case <-time.After(20 * time.Millisecond):
		fmt.Println("timeout") // prints this: the work is too slow
	}
}
```

**Common patterns**

```go
// 1. Non-blocking send/receive
select {
case ch <- v:
default:
	fmt.Println("channel full, dropping")
}

// 2. Stop on cancellation (the most common)
for {
	select {
	case <-ctx.Done():
		return ctx.Err()
	case job := <-jobs:
		handle(job)
	}
}
```

**Gotchas**
- `time.After` inside a hot loop creates a timer on every iteration. Use `time.NewTimer` and `Reset`.
- A `select {}` with no cases blocks forever.
- Setting a channel variable to `nil` disables that case, handy after a channel closes.

_Module: Concurrency · Tags: select, concurrency_

### 28. What is `sync.WaitGroup` and how do you use it correctly?

**Short answer:** A `WaitGroup` lets one goroutine wait until a group of goroutines have finished. You `Add` before starting, each worker calls `Done` when finished, and the waiter calls `Wait`.

```go
package main

import (
	"fmt"
	"sync"
)

func main() {
	var wg sync.WaitGroup
	results := make([]int, 5)

	for i := 0; i < 5; i++ {
		wg.Add(1) // ✅ add BEFORE starting the goroutine
		go func() {
			defer wg.Done()
			results[i] = i * i // each goroutine writes its own index: safe
		}()
	}

	wg.Wait() // block until the counter is 0
	fmt.Println(results) // prints: [0 1 4 9 16]
}
```

**Mistakes**
1. Calling `wg.Add(1)` *inside* the goroutine. `Wait` may run first and return too early.
2. Forgetting `Done` on an error path. Always `defer wg.Done()`.
3. Copying a `WaitGroup` (pass a pointer, `*sync.WaitGroup`).
4. Reusing it before `Wait` has returned.

**Note on loop variables:** before Go 1.22 the closure above would have shared one `i`. From Go 1.22 each iteration gets its own copy. For older versions pass it as an argument: `go func(i int) {...}(i)`.

If workers can fail, use `errgroup` (see the concurrency section) instead of a bare WaitGroup.

_Module: Concurrency · Tags: sync, concurrency_

## Intermediate

### 29. [Tech Lead] A Go service has become slow in production. How do you approach it?

**Short answer:** Do not guess. First **measure** to find *where* the time or resources go, then change one thing, then measure again. A calm, repeatable method beats clever ideas.

```mermaid
flowchart TD
    A["Alert: latency up / errors up"] --> B["1. Scope: which endpoint, since when,<br/>what changed (deploy, traffic, data)?"]
    B --> C["2. Look at golden signals:<br/>rate, errors, duration, saturation"]
    C --> D{"Where is the time?"}
    D -->|"CPU high"| E["CPU profile (pprof)"]
    D -->|"Memory / GC high"| F["Heap + alloc profile"]
    D -->|"CPU low but slow"| G["Waiting: DB, downstream,<br/>locks, pool, network"]
    G --> H["Traces + block/mutex profile + DB metrics"]
    E --> I["3. Form a hypothesis, change ONE thing"]
    F --> I
    H --> I
    I --> J["4. Re-measure (load test / benchmark)"]
    J --> K["5. Ship behind a flag, watch dashboards, write it down"]
```

**Step 1: scope and recent changes.** Most incidents follow a change: deploy, config, traffic spike, a big customer, data growth. `git log`, deploy markers in Datadog, feature flags.

**Step 2: golden signals** for each service
- **Rate** (requests/sec), **Errors** (5xx %, timeouts), **Duration** (p50, p95, p99), **Saturation** (CPU, memory, goroutines, DB pool usage, queue length).

**Step 3: decide *what kind* of slow it is**

| Symptom | Likely cause | Tool |
| --- | --- | --- |
| High CPU | hot loop, JSON/regex, too many allocations -> GC | CPU profile |
| High memory, long GC | allocations, leaks | heap/alloc profile |
| Low CPU but high latency | waiting on DB / other service / locks / pool | traces, block + mutex profile |
| Slow only under load | contention, pool exhaustion, CPU throttling in K8s | load test + metrics |
| Growing goroutines | leak, blocked calls with no timeout | goroutine profile |

**Interview tip:** say the sentence "measure, hypothesise, change one thing, re-measure". Then walk through a real case. Interviewers want a method and evidence, not a list of tricks.

_Module: Performance & Load · Tags: performance, tech-lead, methodology_

### 30. [Tech Lead] How do you use `pprof` to find CPU hot spots and memory problems?

**Short answer:** `pprof` samples what your program is doing and shows which functions use the most CPU, allocate the most memory, or block the most. You expose it on an **internal** port, grab a profile from the running service, and open it as a flame graph.

**1. Enable it (on a private port, never the public one)**

```go
package main

import (
	"log"
	"net/http"
	_ "net/http/pprof" // registers /debug/pprof/* on http.DefaultServeMux
)

func main() {
	go func() {
		// bind to localhost or an internal-only port
		log.Println(http.ListenAndServe("localhost:6060", nil))
	}()
	select {} // your real server runs here
}
```

**2. Collect and view**

```bash
# CPU for 30 seconds, opens a web UI with flame graph
go tool pprof -http=:8081 "http://localhost:6060/debug/pprof/profile?seconds=30"

# Heap: what is holding memory now
go tool pprof -http=:8081 http://localhost:6060/debug/pprof/heap

# Who ALLOCATES the most (even if memory is freed later = GC pressure)
go tool pprof -sample_index=alloc_space http://localhost:6060/debug/pprof/heap

# Goroutines: are they stuck?
curl "http://localhost:6060/debug/pprof/goroutine?debug=1"

# Compare two heap profiles (leak hunting)
go tool pprof -base heap1.pb.gz heap2.pb.gz
```

On Kubernetes: `kubectl port-forward pod/orders-abc 6060:6060`, then run the same commands.

**3. Read it**
- **flat** = time spent *in* that function itself. **cum** = including everything it calls.
- In the flame graph the **wide** boxes are the expensive ones. Start at the widest box that is *your* code.
- Useful text commands inside `pprof`: `top`, `top -cum`, `list FuncName` (line-by-line), `web`.

**Other profiles**

| Profile | Shows | Enable |
| --- | --- | --- |
| `profile` | CPU time | on by default |
| `heap` / `allocs` | memory in use / total allocated | default |
| `goroutine` | stacks of all goroutines | default |
| `block` | where goroutines wait on channels/locks | `runtime.SetBlockProfileRate(1)` |
| `mutex` | lock contention | `runtime.SetMutexProfileFraction(5)` |

**Safety:** the endpoints expose internals. Protect them (internal port, network policy, auth). Profiling overhead is small (a few %), so it is safe to use in production for 30 seconds.

**Better still:** *continuous profiling* (Datadog Profiler, Pyroscope, Grafana) records profiles all the time so you can compare "before and after the deploy".

_Module: Performance & Load · Tags: pprof, performance, tech-lead_

### 31. [Tech Lead] When do you use the Go execution tracer (`go tool trace`) instead of pprof?

**Short answer:** `pprof` tells you **how much** time is spent where (a summary). The execution **tracer** records **what happened over time**: when goroutines ran, when they waited, when GC paused everything. Use it for latency problems that pprof cannot explain: scheduling delays, GC pauses, goroutines waiting, uneven work across cores.

```go
// in a test or a debug endpoint
f, _ := os.Create("trace.out")
trace.Start(f)
defer trace.Stop()
// ... run the slow scenario ...
```

```bash
# or from a running service with pprof enabled
curl -o trace.out "http://localhost:6060/debug/pprof/trace?seconds=5"
go tool trace trace.out    # opens a browser UI
```

**What to look at in the UI**
- **Goroutine analysis:** per function, time spent *executing*, *waiting on channels/locks*, *waiting on syscalls*, *waiting to be scheduled*.
- **Timeline view:** each CPU (P) as a row. Gaps mean idle CPUs while work waits, which suggests a bottleneck such as a lock or a single goroutine doing everything.
- **GC events:** how long are stop-the-world pauses, how often does GC run.
- **Synchronisation blocking profile:** which channel/mutex made goroutines wait.

**Picking the tool**

| Question | Tool |
| --- | --- |
| Which function burns CPU? | `pprof` CPU |
| Who allocates the memory? | `pprof` heap/allocs |
| Why is p99 high although CPU is low? | **trace**, block/mutex profile |
| Are my goroutines running in parallel? | **trace** |
| Is GC pausing my requests? | **trace** + `GODEBUG=gctrace=1` |

**Tip:** keep traces short (a few seconds). They are large and heavy to load.

_Module: Performance & Load · Tags: trace, performance, tech-lead_

### 32. [Tech Lead] How do you reduce memory allocations and GC pressure in Go?

**Short answer:** Go's garbage collector must scan and clean every object you allocate. Fewer allocations means less GC work, lower CPU, and steadier latency. The strategy: **measure with pprof, find the allocation hot spots, then remove allocations from hot paths.**

**Find allocations**

```bash
go test -bench=. -benchmem          # allocs/op and B/op per function
go build -gcflags="-m" ./...        # shows what "escapes to heap"
go tool pprof -sample_index=alloc_space heap.pb.gz
GODEBUG=gctrace=1 ./app             # prints every GC cycle
```

**Common wins**

| Technique | Before | After |
| --- | --- | --- |
| Pre-size slices and maps | `append` grows many times | `make([]T, 0, n)`, `make(map[K]V, n)` |
| `strings.Builder` | `s += x` in a loop | one buffer |
| Reuse buffers | new `bytes.Buffer` per request | `sync.Pool` |
| Avoid needless pointers | `[]*Item` (many small objects) | `[]Item` (one block) |
| Avoid interface boxing in hot paths | `fmt.Sprintf` for simple joins | `strconv.AppendInt`, concatenation |
| Avoid `[]byte` <-> `string` copies | convert back and forth | keep one form |
| Stream instead of load | `io.ReadAll` a 200 MB body | `bufio`, `json.Decoder`, `io.Copy` |

**Example**

```go
// ❌ many allocations
func ids(users []User) []string {
	var out []string
	for _, u := range users {
		out = append(out, fmt.Sprintf("%d", u.ID))
	}
	return out
}

// ✅ one allocation for the slice, cheap number conversion
func idsFast(users []User) []string {
	out := make([]string, 0, len(users))
	for _, u := range users {
		out = append(out, strconv.Itoa(u.ID))
	}
	return out
}
```

**GC knobs (use after code fixes, not instead of them)**
- `GOGC=100` default: GC runs when the heap doubles. Higher = less GC, more memory.
- `GOMEMLIMIT=900MiB` (Go 1.19+): soft memory limit. GC works harder as you approach it. In a container set it to about 90% of the pod's memory limit to avoid OOM kills.

**Warning:** do not make code ugly for a 2% gain. Optimise only what the profile shows is hot, and keep a benchmark as proof.

_Module: Runtime & Memory · Tags: performance, gc, memory, tech-lead_

### 33. [Tech Lead] How do you find and fix a memory leak in a running Go service?

**Short answer:** Go has a GC, but you can still "leak" by keeping references to things you no longer need or by leaking goroutines. Symptoms: memory (RSS) rises steadily, never drops after load, ends in `OOMKilled`. Diagnosis uses two heap profiles taken some time apart and compared.

```mermaid
flowchart TD
    A["Memory graph rises and never falls"] --> B{"Goroutine count also rising?"}
    B -- yes --> C["Goroutine leak: pprof goroutine,<br/>find where they are stuck"]
    B -- no --> D["Heap profile #1 (inuse_space)"]
    D --> E["Wait: normal traffic 30-60 min"]
    E --> F["Heap profile #2"]
    F --> G["go tool pprof -base #1 #2<br/>what GREW?"]
    G --> H["Read the code path: who still holds the reference?"]
```

**Commands**

```bash
curl -o heap1.pb.gz http://localhost:6060/debug/pprof/heap
# ... wait under load ...
curl -o heap2.pb.gz http://localhost:6060/debug/pprof/heap
go tool pprof -http=:8081 -base heap1.pb.gz heap2.pb.gz
```

**Typical causes of "leaks" in Go**

| Cause | Example | Fix |
| --- | --- | --- |
| Unbounded cache or map | `map[userID]*Session` never cleaned | TTL/size limit (LRU) |
| Goroutines never end | blocked channel send/receive | context, buffered chan, close |
| Timers/tickers not stopped | `time.NewTicker` without `Stop()` | `defer t.Stop()` |
| Big array kept alive by a small slice | `small := big[:10]` | copy: `slices.Clone` |
| Global slice only appended to | metrics/events list | bound it, flush periodically |
| `defer` in long-running loop | closes never run | move to helper function |
| HTTP bodies not closed | `resp.Body` | `defer resp.Body.Close()` |
| Listeners/subscribers never removed | observer lists | unsubscribe on close |

**Is it really a leak?** Go may keep memory for reuse. Look at `inuse_space` (live objects) and the **trend**, not just RSS. Also check `GOMEMLIMIT`, because a container limit with a high `GOGC` can look like growth.

**Prevent:** memory dashboards with alerts, load tests that run for hours (soak tests), `goleak` in unit tests, and a heap profile in your incident runbook.

_Module: Runtime & Memory · Tags: memory, debugging, tech-lead_

### 34. [Tech Lead] How do you load test a Go service and read the results correctly?

**Short answer:** A load test sends realistic traffic at a controlled rate and shows how latency, errors, and resource usage change as load grows. The goal is to find the **limit** (where it breaks), the **bottleneck**, and to prove a fix worked.

**Tools:** `k6` (scripts in JS, great reports), `vegeta` (Go, constant rate), `wrk`/`wrk2`, `hey`, `ghz` (for gRPC), Locust.

```bash
# vegeta: 200 requests/second for 60 seconds, then show a report
echo "GET http://orders.staging/orders/42" | \
  vegeta attack -rate=200 -duration=60s | vegeta report
```

**Types of test**

| Test | Question it answers |
| --- | --- |
| Smoke | Does it work at all under tiny load? |
| Load | Does it meet the SLO at expected peak? |
| Stress | At what load does it break, and *how* (gracefully?) |
| Spike | Does it survive a sudden 10x jump and recover? |
| Soak | Does it stay stable for hours (leaks, pool exhaustion)? |

**How to run it well**
1. Test an environment that looks like production (same CPU/memory limits, DB size, replicas).
2. Use **realistic data and request mix**, not one URL repeated.
3. Increase load in steps (ramp) and watch the dashboards at each step.
4. Use an **open model** (fixed arrival rate) rather than "N users in a loop". Closed-loop tools slow down when the server slows down and hide the problem (*coordinated omission*).
5. Look at **p95/p99 latency and error rate**, not averages.
6. While it runs, record: CPU, memory, GC, goroutines, DB pool wait, downstream latency.

```mermaid
flowchart LR
    A["Define SLO<br/>(p99 under 300ms, errors under 0.1%)"] --> B["Ramp load in steps"]
    B --> C{"SLO still met?"}
    C -- yes --> B
    C -- no --> D["Find the first saturated resource"]
    D --> E["Profile, fix, repeat"]
```

**What the knee looks like:** latency is flat, then suddenly shoots up as a resource saturates. The load just before the knee is your safe capacity. Keep a headroom (for example run at 60-70% of it).

**Never** load test production dependencies you do not own (third-party APIs) without permission. Mock them.

_Module: Performance & Load · Tags: load-testing, performance, tech-lead_

### 35. [Tech Lead] Under high load the service gets slow but CPU is low. What could be wrong?

**Short answer:** If CPU is low but requests are slow, the program is **waiting**, not working. Typical reasons: an exhausted connection pool, slow downstream calls, lock contention, too few worker goroutines, or CPU throttling by Kubernetes.

**Checklist**

| Suspect | How to confirm | Fix |
| --- | --- | --- |
| **DB pool exhausted** | `db.Stats()` shows `WaitCount`/`WaitDuration` rising; DB shows connections idle | Raise pool size carefully, shorten transactions, add indexes, fix long queries |
| **Slow downstream service** | Traces show long child span | Timeouts, circuit breaker, cache, async |
| **No timeouts** | Goroutine count grows; stuck in `net/http` read | Add timeouts to client/server/DB |
| **Lock contention** | mutex/block profile, trace | Shrink critical section, shard locks, atomics, copy-on-write |
| **Unbuffered/serial pipeline** | trace: gaps, one busy goroutine | Add workers, buffer, batch |
| **K8s CPU throttling** | `container_cpu_cfs_throttled_periods_total` high although "CPU usage" looks ok | Raise/remove CPU limit, set GOMAXPROCS to the limit |
| **GC pauses** | `gctrace`, trace | Fewer allocations, `GOMEMLIMIT` |
| **Network/DNS** | high connect time | Keep-alives, bigger idle pool, DNS cache |
| **Ephemeral port exhaustion** | `TIME_WAIT` sockets, "cannot assign address" | Reuse one `http.Client`, raise `MaxIdleConnsPerHost` |

**Watching the DB pool in Go**

```go
s := db.Stats()
log.Printf("open=%d inUse=%d idle=%d waitCount=%d waitTime=%s",
	s.OpenConnections, s.InUse, s.Idle, s.WaitCount, s.WaitDuration)
// export these as metrics; rising WaitDuration = requests queue for a connection
```

**Little's Law** helps explain it: `concurrent requests = arrival rate x time in system`. If a query slows from 20 ms to 200 ms at 500 req/s, you suddenly need 100 concurrent connections instead of 10. The pool (size 20) becomes the queue, and latency explodes while CPU sits idle.

**Interview tip:** answer with a *process*: check saturation signals, then traces, then block/mutex profiles, and name the top three suspects (DB pool, downstream, locks).

_Module: Performance & Load · Tags: performance, load, tech-lead, debugging_

### 36. [Tech Lead] How do you tune the Go runtime inside containers (`GOMAXPROCS`, `GOMEMLIMIT`, `GOGC`, CPU limits)?

**Short answer:** Go reads the **host's** CPU count and memory unless you tell it otherwise. In Kubernetes your pod may have a limit of 2 CPUs on a 64-core node. If `GOMAXPROCS` is 64, the runtime runs too many threads, the kernel throttles the pod, and latency suffers. Align Go with the container limits.

**GOMAXPROCS**
- Controls how many OS threads run Go code at the same time.
- Newer Go (1.25+) respects the container CPU limit automatically. For older versions use Uber's library:

```go
import _ "go.uber.org/automaxprocs" // sets GOMAXPROCS from the cgroup CPU limit at startup
```
- Or set it in the Deployment from the limit: `GOMAXPROCS` = `resourceFieldRef limits.cpu`.

**GOMEMLIMIT** (Go 1.19+)
- A *soft* memory ceiling. As the heap nears it, GC runs more often so you avoid being OOM-killed.
- Rule of thumb: about 85-90% of the container memory limit (leave room for stacks, cgo, and non-heap memory).

```yaml
resources:
  requests: { cpu: "500m", memory: "512Mi" }
  limits:   { memory: "512Mi" }          # CPU limit optional, see below
env:
  - name: GOMEMLIMIT
    value: "450MiB"
  - name: GOMAXPROCS
    valueFrom: { resourceFieldRef: { resource: limits.cpu } }
```

**GOGC**
- Default 100: GC starts when the heap has grown 100% since the last cycle. Raise it to trade memory for lower CPU. Combine with `GOMEMLIMIT` for safety.

**CPU limits and throttling**
- A CPU *limit* is enforced in 100 ms windows. A bursty Go service can use its quota in 20 ms and then be **frozen** for 80 ms, which shows up as p99 spikes even though average CPU is low.
- Many teams set CPU **requests** but no (or generous) CPU **limits**, and set memory requests = limits. Follow your platform's policy, but *watch the throttling metric*.

```mermaid
flowchart LR
    A["Node: 64 cores"] --> B["Pod limit: 2 CPU"]
    B --> C{"GOMAXPROCS = 64?"}
    C -- yes --> D["Too many threads, throttled, high p99"]
    C -- "no (=2)" --> E["Runtime matches quota, steady latency"]
```

**Monitor:** `container_cpu_cfs_throttled_seconds_total`, heap in use vs limit, GC pause time, and restarts with reason `OOMKilled`.

_Module: Runtime & Memory · Tags: kubernetes, performance, runtime, tech-lead_

### 37. [Tech Lead] The app crashed in production. How do you find out which module or line broke it?

**Short answer:** Start from the **crash output**. When a Go program panics it prints the error and a **stack trace** with package names, file names and line numbers of every function in the chain. Combine that with logs around the same time, the deployed version, and traces/metrics to know the cause and the context.

```mermaid
flowchart TD
    A["Pod restarted / alert fires"] --> B["Get the exit reason<br/>kubectl describe pod"]
    B --> C{"Reason?"}
    C -->|"Error, exit code 2"| D["Go panic: read logs --previous<br/>find 'panic:' and stack trace"]
    C -->|"OOMKilled, exit 137"| E["Memory: heap profile, GOMEMLIMIT, leak?"]
    C -->|"Liveness probe failed"| F["Hung or deadlocked: goroutine dump,<br/>probe config"]
    C -->|"Exit 1 (log.Fatal)"| G["Startup/config error: read the last log line"]
    D --> H["Top frame under 'goroutine N [running]' = where it died"]
    H --> I["Check version/commit, recent deploy, request id, input"]
    I --> J["Reproduce with a test, fix, add a regression test"]
```

**Step by step**

1. **Exit reason**
   ```bash
   kubectl get pod orders-7d9 -o wide
   kubectl describe pod orders-7d9      # Last State: Terminated, Reason, Exit Code
   kubectl logs orders-7d9 --previous   # logs of the crashed container
   ```
   | Exit code | Meaning |
   | --- | --- |
   | `2` | Go panic or fatal runtime error |
   | `1` | `os.Exit(1)` / `log.Fatal` (start-up failure) |
   | `137` | Killed with SIGKILL: usually **OOMKilled** |
   | `139` | Segfault (cgo/unsafe) |
   | `143` | SIGTERM received (normal shutdown) |

2. **Read the stack trace** (see the next question for how).
3. **Find the context:** structured logs with `request_id`, `trace_id`, user/tenant id, input size; which deployment version (git commit in logs).
4. **Error tracking tool** (Sentry, Datadog Error Tracking) groups the same crash, counts users affected, and links to the release.
5. **Reproduce** locally or in a test using the same input; write a failing test first, then fix.

**Make crashes easy to diagnose *before* they happen**
- Log the version/commit at startup and on every line (or as a tag).
- Recover from panics in HTTP handlers and goroutines, and **log the stack** (`debug.Stack()`), then decide to continue or exit.
- Wrap errors with context: `fmt.Errorf("orders.Place: charge card: %w", err)`.
- Use `slog` with `AddSource: true` so every log line includes file and line.
- Set `GOTRACEBACK=all` (or `crash`) to see all goroutines in a fatal error.

_Module: Debugging & Reliability · Tags: crash, debugging, tech-lead, observability_

### 38. [Tech Lead] How do you read a Go panic stack trace?

**Short answer:** Read it **top to bottom**. The first line says *what* happened. The first function listed under the goroutine is *where* it happened. The following lines are the callers, from the innermost to the outermost. Package paths tell you **which module** is involved.

```text
panic: runtime error: invalid memory address or nil pointer dereference
[signal SIGSEGV: segmentation violation code=0x1 addr=0x0 pc=0x4a1b2c]

goroutine 18 [running]:
github.com/acme/orders/internal/billing.(*Service).Charge(0x0, {0xc000012345, 0x4})
        /src/internal/billing/service.go:42 +0x2c
github.com/acme/orders/internal/order.(*Service).Place(0xc0000a4000, {0x7a1b60, 0xc0000b2000})
        /src/internal/order/service.go:77 +0x9a
main.main.func1({0x7a2f10, 0xc0000c4000}, 0xc0000d6000)
        /src/cmd/orders-api/main.go:31 +0x45
net/http.HandlerFunc.ServeHTTP(...)
        /usr/local/go/src/net/http/server.go:2136
created by net/http.(*Server).Serve in goroutine 1
```

**How to read it**

| Part | Meaning here |
| --- | --- |
| `invalid memory address or nil pointer dereference` | Used a nil pointer (most common Go panic) |
| `goroutine 18 [running]` | The goroutine that crashed and its state |
| First frame: `billing.(*Service).Charge(0x0, ...)` | Crashed in package **billing**, method `Charge` at `service.go:42`. The first argument (the receiver) is `0x0`, so the `*Service` was **nil** |
| Next frames | Who called it: `order.Service.Place` (line 77), then the handler in `main.go:31` |
| `created by ...` | Which code started this goroutine |

So: the `order` module called `billing.Charge` on a nil `*billing.Service`, usually because it was never injected (wiring bug in `main`).

**Other common panics**

| Message | Typical cause |
| --- | --- |
| `index out of range [5] with length 3` | Off-by-one, empty slice |
| `assignment to entry in nil map` | Map never initialised |
| `interface conversion: interface {} is string, not int` | Unsafe type assertion |
| `close of closed channel` / `send on closed channel` | Channel lifecycle bug |
| `slice bounds out of range` | Bad `s[a:b]` |
| `integer divide by zero` | Missing check |

**Tips**
- Frames from `runtime/` and `net/http/` are plumbing. Jump to the first frame from **your** module path.
- Build with `-trimpath` carefully: it shortens paths but keeps package names. Keep the same commit handy to open the exact line.
- Stack traces can be huge with many goroutines. Search for `[running]` and for the goroutine marked `panic`.
- If the trace is only in a log aggregator, make sure multi-line logs are not split into separate entries (log as one JSON field).

_Module: Debugging & Reliability · Tags: crash, debugging, tech-lead_

### 39. [Tech Lead] Which Go errors can NOT be recovered with `recover()`?

**Short answer:** Normal `panic`s can be recovered. But the runtime also has **fatal errors** that kill the process immediately, and `recover` cannot stop them. They signal a broken program state, so the right response is to fix the bug and let the orchestrator restart the pod.

| Fatal error | Why it happens |
| --- | --- |
| `fatal error: concurrent map writes` / `concurrent map read and map write` | Unsynchronised map access from several goroutines |
| `fatal error: all goroutines are asleep - deadlock!` | Every goroutine is blocked |
| `fatal error: out of memory` / `runtime: out of memory` | Heap cannot grow (or the OS OOM-killer sends SIGKILL, which no program can catch) |
| `runtime: goroutine stack exceeds 1000000000-byte limit` | Infinite recursion (stack overflow) |
| `fatal error: unlock of unlocked mutex` | Wrong mutex usage |
| `SIGKILL` from Kubernetes/OOM killer | No code runs at all |

```go
func main() {
	defer func() { fmt.Println("recovered:", recover()) }()

	m := map[int]int{}
	for i := 0; i < 100; i++ {
		go func() {
			for {
				m[i] = i // ❌ concurrent writes: fatal error, recover() is NOT called
			}
		}()
	}
	select {}
}
```

**Also remember:** a panic in **any** goroutine without its own `recover` terminates the **whole** process. A `recover` in `main` or in the HTTP server does not protect goroutines you started yourself.

**What to do about it**
1. Run tests with `-race` in CI to catch the unsynchronised map cases early.
2. Protect shared maps with a mutex or use `sync.Map`.
3. Limit recursion depth when walking user-supplied trees (JSON, ASTs).
4. Set memory requests/limits and `GOMEMLIMIT` so you see a clean pattern of memory growth before kills.
5. Alert on pod restarts and look at the termination reason.

**Interview tip:** explain that `recover` is a safety net for *bugs in request handling*, not a substitute for correct concurrency.

_Module: Debugging & Reliability · Tags: panic, crash, runtime, tech-lead_

### 40. [Tech Lead] How do you make sure a panic in a goroutine does not take down the whole service?

**Short answer:** A panic in a goroutine that is not recovered **crashes the entire program**. So wrap every goroutine you start with a small helper that recovers, logs the stack trace (with context), increments a metric, and decides what to do next.

```go
package safe

import (
	"log/slog"
	"runtime/debug"
)

// Go runs fn in a new goroutine and turns panics into logs + metrics.
func Go(name string, fn func()) {
	go func() {
		defer func() {
			if r := recover(); r != nil {
				slog.Error("goroutine panic",
					"goroutine", name,
					"panic", r,
					"stack", string(debug.Stack()),
				)
				// panicCounter.WithLabelValues(name).Inc()
			}
		}()
		fn()
	}()
}
```

Usage:

```go
safe.Go("send-welcome-email", func() { sendEmail(user) })
```

**For HTTP handlers**, `net/http` already recovers panics per request (it logs and closes the connection). But you usually want your own recovery middleware to return a clean `500`, add the request id, and report to your error tracker (see the middleware question).

**Design choices**

| Choice | When |
| --- | --- |
| Recover, log, **continue** | Independent background job; one failure must not stop others |
| Recover, log, then **exit** | State might be corrupt; let Kubernetes restart a clean pod |
| Do not recover | Startup code (fail fast) |

**Rules**
- `recover()` must be called **directly inside the deferred function**.
- After recovering, you do not know the state of shared data. For long-lived workers, restart the worker loop with a fresh state, with backoff to avoid a crash loop.
- Alert on the panic counter. A recovered panic is still a bug.
- Use `errgroup` for goroutine groups; it does not recover panics for you, so wrap the function you pass to it.

_Module: Debugging & Reliability · Tags: panic, goroutines, resilience, tech-lead_

### 41. [Tech Lead] How do you design error handling across a whole codebase so errors tell you which module failed?

**Short answer:** Agree on a few team conventions: (1) wrap errors with context as they travel upward, (2) use typed or sentinel errors for conditions callers must react to, (3) log only once at the boundary, (4) map errors to HTTP/gRPC codes in one place. Then a single log line tells the whole story: *what* failed, *where*, and *why*.

**1. Wrap with the operation name**

```go
// internal/billing/service.go
func (s *Service) Charge(ctx context.Context, orderID string) error {
	if err := s.gateway.Pay(ctx, orderID); err != nil {
		return fmt.Errorf("billing.Charge order=%s: %w", orderID, err)
	}
	return nil
}

// internal/order/service.go
func (s *Service) Place(ctx context.Context, o Order) error {
	if err := s.billing.Charge(ctx, o.ID); err != nil {
		return fmt.Errorf("order.Place: %w", err)
	}
	return nil
}

// Final log line reads like a path:
// order.Place: billing.Charge order=A-1: gateway.Pay: dial tcp 10.0.0.4:443: i/o timeout
```

**2. A small shared error type for services**

```go
type Kind int

const (
	KindUnknown Kind = iota
	KindInvalid       // 400/422
	KindNotFound      // 404
	KindConflict      // 409
	KindUnavailable   // 503, retryable
)

type Error struct {
	Op   string // "billing.Charge"
	Kind Kind
	Err  error
}

func (e *Error) Error() string { return e.Op + ": " + e.Err.Error() }
func (e *Error) Unwrap() error { return e.Err }
```

**3. Log once at the boundary** (handler, consumer loop, `main`), with fields: `request_id`, `op`, `kind`, and the full error string. Lower layers only return errors.

**4. One translation layer** from `Kind` to HTTP status or gRPC code.

```mermaid
flowchart LR
    A["storage: sql error"] -->|wrap op + cause| B["billing: Charge"]
    B -->|wrap| C["order: Place"]
    C --> D["HTTP handler (boundary)"]
    D --> E["log ONCE with request_id"]
    D --> F["map Kind to status code"]
```

**Team rules worth writing down**
- Never ignore errors. Never `panic` for expected failures.
- Do not log *and* return.
- Errors are about the failure, not the user: do not leak internals in API responses.
- Add context that helps debug (ids, sizes), never secrets.
- Retryable vs non-retryable should be visible from the error (`errors.Is(err, ErrUnavailable)`).

**Stack traces?** Go errors do not carry stack traces by default. Wrapping with operation names is usually enough and cheaper. If you want traces for unexpected errors, capture `debug.Stack()` at the boundary or use an error-tracking SDK.

_Module: Errors & Panics · Tags: errors, design, tech-lead, observability_

### 42. [Tech Lead] What logs, metrics and alerts do you set up so you find the broken module fast?

**Short answer:** Combine the **three pillars** with a common id so you can jump between them: *metrics* tell you something is wrong, *traces* tell you where, *logs* tell you why.

```mermaid
flowchart LR
    M["Metrics: alert fires<br/>(error rate up)"] --> T["Traces: slowest / failing spans<br/>show the module"]
    T --> L["Logs filtered by trace_id<br/>show the exact error"]
    L --> C["Code: stack trace + version"]
```

**Logs**
- JSON via `slog`. Fields on every line: `service`, `version`, `env`, `request_id`/`trace_id`, `op` or `module`, `user/tenant id` (if allowed).
- Log level discipline. Errors have the wrapped message and the stack for panics.
- Sample noisy debug logs; keep them cheap.

**Metrics (per service, per endpoint)**
- **RED:** request rate, error rate (by status class), duration histogram (p50/p95/p99).
- **Saturation:** CPU, memory, goroutines, GC pause, DB pool in use / wait time, queue length, consumer lag.
- **Business:** orders placed, payments failed, so you notice problems users feel.
- **Dependency metrics:** latency and errors per downstream (DB, Redis, payments API), including circuit-breaker state.
- Add a `module` or `component` label (low cardinality!) to error counters.

**Traces**
- OpenTelemetry spans around handlers, DB calls, outbound calls, and key business steps. A failed span shows which module.

**Alerts (page only for things users feel)**
- SLO burn rate: "error budget being used 10x too fast".
- p99 latency above target for 5 minutes.
- Pod restarts / `OOMKilled` / `CrashLoopBackOff`.
- Consumer lag above threshold, queue depth growing.
- Everything else is a *ticket or dashboard*, not a page.

**Dashboards**: one overview per service ("is it healthy?") plus drill-downs per dependency. Add deploy markers so you can see "this started after release 1.4.2".

**Runbooks:** for each alert, a short page: what it means, first three checks, how to mitigate (rollback, scale up, toggle flag), who to call.

**Careful with:** high-cardinality labels (user id, request id as a metric label) because they explode metric storage. Put them in logs/traces instead.

_Module: Observability & Operations · Tags: observability, datadog, tech-lead_

### 43. [Tech Lead] Walk me through your incident process for a production crash (detect, mitigate, fix, learn).

**Short answer:** First **stop the bleeding** (restore service), *then* find the root cause. Keep clear roles, communicate often, and finish with a blameless post-mortem that produces real action items.

```mermaid
flowchart LR
    A["Detect<br/>alert / user report"] --> B["Triage<br/>severity, owner (incident lead)"]
    B --> C["Mitigate<br/>rollback, scale, feature flag, failover"]
    C --> D["Diagnose<br/>logs, traces, profiles, diff of changes"]
    D --> E["Fix<br/>patch + test + staged rollout"]
    E --> F["Learn<br/>blameless post-mortem, actions"]
    F --> A
```

**1. Detect** by alerts, not customers. Check the SLO dashboard.

**2. Triage (first 5 minutes)**
- What is the user impact and since when?
- Assign an **incident lead** (coordinates), a **scribe** (timeline), and people to investigate. Open a dedicated channel.
- Set severity (SEV1: major outage, SEV2: degraded...).

**3. Mitigate before you understand**
- Was there a deploy? **Roll back** (`kubectl rollout undo deployment/orders`).
- Turn off a feature flag, scale replicas, shed load, fail over to another region.
- Restore service first. Root cause can wait an hour.

**4. Diagnose with evidence**
- Timeline: what changed (deploy, config, traffic, data)?
- `kubectl describe` and `logs --previous`, stack trace, traces, dashboards, pprof if the pod is still alive.
- Form hypotheses, test one at a time, write them in the channel.

**5. Fix properly**
- Reproduce with a failing test. Fix. Review. Roll out gradually (canary).
- Check related code for the same bug class.

**6. Learn (blameless post-mortem)**
- Timeline, impact, root cause(s), what went well, what did not, **action items with owners and dates**: better alerts, tests, circuit breaker, runbook, rollout safety.
- Focus on system and process, not people.

**As a Technical Lead:** you stay calm, keep communication clear (status updates every 15-30 min to stakeholders), protect the engineers who are debugging from interruptions, and make sure the follow-up work actually gets scheduled.

_Module: Debugging & Reliability · Tags: incident, leadership, tech-lead_

### 44. [Tech Lead] How do you design a Go service for high concurrency: bounded concurrency, queues and backpressure?

**Short answer:** Go makes it easy to start a goroutine per request, but **unlimited concurrency is a bug waiting for traffic**. Every resource (CPU, memory, DB connections, downstream APIs) is finite. Design explicit limits, queues, and a plan for what happens when the limits are reached.

```mermaid
flowchart LR
    C["Clients"] --> L{"Admission control<br/>(rate limit / max in-flight)"}
    L -- rejected --> R["429 / 503 fast"]
    L -- accepted --> Q[("bounded queue")]
    Q --> W["worker pool (N goroutines)"]
    W --> DB[("DB pool (M conns)")]
    W --> X["downstream API (bulkhead)"]
```

**Principles**

1. **Bound everything:** goroutines, queue length, connections, request body size, batch size.
2. **Apply backpressure:** when a stage is full, slow down or reject the producer. A full buffered channel is a natural signal.
3. **Fail fast** when overloaded (return `503` + `Retry-After`) instead of accepting work you cannot finish. Queueing delay is latency the user feels.
4. **Timeouts on everything**, shrinking as you go deeper (see the deadline question).
5. **Bulkheads:** separate pools per dependency so one slow API cannot use all your workers.

**Example: limit in-flight requests**

```go
func LimitInFlight(max int, next http.Handler) http.Handler {
	sem := make(chan struct{}, max)
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		select {
		case sem <- struct{}{}:
			defer func() { <-sem }()
			next.ServeHTTP(w, r)
		default: // too busy: shed load immediately
			w.Header().Set("Retry-After", "1")
			http.Error(w, "server busy", http.StatusServiceUnavailable)
		}
	})
}
```

**Sizing the numbers (Little's Law):** `in-flight = throughput x latency`. To serve 500 req/s with 40 ms average latency you need about `500 x 0.04 = 20` requests in flight. A limit of 100 gives headroom without letting things explode.

**Async work:** for slow or non-critical jobs, accept the request, write to a durable queue (Kafka/RabbitMQ/DB outbox), reply `202 Accepted`, and process with workers. Scale workers independently.

**Scale out vs up:** stateless Go pods scale horizontally with an HPA on CPU or custom metrics (queue depth, in-flight). Keep an eye on shared limits such as total DB connections.

_Module: Concurrency · Tags: concurrency, scalability, tech-lead_

### 45. [Tech Lead] What is load shedding and how do you protect a service from overload?

**Short answer:** Load shedding means deliberately rejecting some requests when the service is near its limit, so the requests you *do* accept finish quickly and the service does not collapse. A system that says "no" early survives; a system that says "yes" to everything slows down for everyone and then dies.

```mermaid
flowchart TD
    A["Traffic spike"] --> B{"Overloaded?<br/>(queue, in-flight, latency)"}
    B -- no --> C["Serve normally"]
    B -- yes --> D["Shed: reject low-priority<br/>requests with 429/503"]
    D --> E["Protect: critical traffic,<br/>health checks, writes"]
    E --> F["Recover, then ramp back up"]
```

**Techniques (use several)**

| Technique | How |
| --- | --- |
| **Max in-flight limit** | Semaphore per service/endpoint; reject the rest |
| **Rate limiting** | Per client/API key (token bucket), `429 Too Many Requests` |
| **Queue with a small bound** | When full, reject; never use an unbounded queue |
| **Priority/criticality** | Shed batch/analytics calls first, keep checkout/login |
| **Deadline checks** | If a request has already waited longer than its timeout, drop it instead of doing useless work |
| **Adaptive limits** | Lower the limit when latency rises (AIMD / "concurrency limits") |
| **Cache or degrade** | Serve stale cache, partial results, or a simpler response |
| **Autoscaling** | Helps with sustained load, but too slow for sudden spikes. Shed while pods start |

**Client side cooperates:** well-behaved clients retry with backoff + jitter, respect `Retry-After`, and use circuit breakers. Bad retry behaviour (retry storms) can turn a small failure into an outage.

**Detect overload using the right signals:** queue length, in-flight count, p99 latency, and CPU. Do not wait for errors.

**Example check using the request deadline**

```go
if dl, ok := r.Context().Deadline(); ok && time.Until(dl) < 50*time.Millisecond {
	http.Error(w, "deadline too close", http.StatusServiceUnavailable)
	return // do not start work that cannot finish
}
```

**Interview tip:** mention that you test overload behaviour with a stress/spike test and verify that the service degrades gracefully and **recovers** after the spike.

_Module: Debugging & Reliability · Tags: resilience, scalability, tech-lead_

### 46. [Tech Lead] How do you propagate timeouts and deadlines across services (timeout budgets)?

**Short answer:** Give the *whole request* a deadline at the edge and pass it down through `context`. Each downstream call gets **less** time than its caller, so the caller still has time to respond. Without this, a slow dependency causes work to continue long after the user has given up.

```mermaid
sequenceDiagram
    participant U as Client (waits 3s)
    participant G as Gateway (timeout 3s)
    participant O as Orders (budget about 2.5s)
    participant P as Payments (budget about 1.5s)
    participant D as DB (budget about 500ms)
    U->>G: request
    G->>O: deadline = now + 2.5s
    O->>P: deadline = now + 1.5s
    P->>D: deadline = now + 500ms
    Note over G,D: each layer leaves time for its own work and for retries
```

**In Go it is automatic if you use the context everywhere**

```go
func (s *Service) Place(ctx context.Context, o Order) error {
	// never extend the caller's deadline: WithTimeout picks the EARLIER one
	ctx, cancel := context.WithTimeout(ctx, 1500*time.Millisecond)
	defer cancel()

	if err := s.payments.Charge(ctx, o); err != nil { // gRPC/HTTP client uses ctx
		return fmt.Errorf("order.Place: %w", err)
	}
	return s.store.Save(ctx, o) // DB call uses ctx too
}
```

- gRPC sends the remaining deadline in a header; the server sees it in `ctx`.
- For HTTP use `http.NewRequestWithContext(ctx, ...)`. Some teams add a header like `X-Request-Deadline`.
- `r.Context()` is cancelled automatically when the client disconnects.

**Rules of thumb**
1. **Every** network call has a timeout. No exceptions.
2. Total budget = sum of steps + a safety margin. Downstream timeout < upstream timeout.
3. Retries must fit inside the remaining budget. Check `ctx.Err()` before retrying.
4. Different timeouts for connect, TLS, and response read (HTTP transport), plus the overall `Client.Timeout`.
5. Surface timeouts as `504`/`DeadlineExceeded`, and chart them. A rising timeout rate is an early warning.

**Common bug:** creating `context.Background()` deep in the code (dropping the caller's context), so cancellations and deadlines stop propagating. Pass `ctx` as the first parameter everywhere.

_Module: Debugging & Reliability · Tags: timeouts, context, microservices, tech-lead_

### 47. [Tech Lead] Why is p99 latency high in a Go service, and what is tail latency?

**Short answer:** *Tail latency* is the slow end of requests (p99, p99.9). Averages hide it. A service with a 50 ms average can have a 2 s p99, and when one user action calls 10 services, the chance that **at least one** hits its slow tail becomes large. Users feel the tail.

**Common causes in Go systems**

| Cause | Looks like | Fix |
| --- | --- | --- |
| **GC pauses / GC CPU** | periodic spikes | fewer allocations, `GOMEMLIMIT`, check `gctrace` |
| **CPU throttling (K8s limits)** | spikes in bursts, low avg CPU | adjust limits, `GOMAXPROCS` |
| **Lock contention** | latency grows with concurrency | smaller critical sections, sharding, atomics |
| **Connection pool waits** | slow only under load | tune pool, shorten queries |
| **Cold caches / cold starts** | first requests after deploy | warm-up, readiness after warm |
| **Slow query on specific input** | one tenant or one id | indexes, query plans, per-tenant metrics |
| **Retries and timeouts** | latency = timeout x attempts | smaller timeouts, budgets, circuit breaker |
| **Large payloads** | big JSON bodies | pagination, streaming, compression |
| **Noisy neighbours** | random node-specific slowness | pod anti-affinity, node metrics |
| **Head-of-line blocking** | one slow request blocks others on a shared connection/worker | separate pools, timeouts |

**How to investigate**
1. Use histograms to see the p50/p95/p99 gap. Break down **by endpoint, tenant, and pod**: is the tail from one pod (bad node) or everywhere?
2. Look at traces of *slow* requests specifically (tail-based sampling keeps the slowest).
3. Correlate spikes with GC cycles, deploys, cron jobs, and autoscaling events.
4. Use the execution tracer and block/mutex profiles for waits.

**Techniques to cut the tail**
- **Timeouts + hedged requests:** if a call to a replicated service is slower than its usual p95, send a second request to another replica and take the first answer (only for idempotent reads; adds load).
- **Request coalescing** (`singleflight`) so duplicates do not pile up.
- **Load shedding** and queue bounds so overload does not inflate latency.
- Keep **headroom**: run at 60-70% of capacity, not 95%. Queueing theory says latency rises sharply near full utilisation.

**Interview tip:** say "I look at percentiles, not averages, and I find whether the tail is caused by *waiting* (pool, locks, throttling) or *work* (CPU, GC)".

_Module: Performance & Load · Tags: performance, latency, tech-lead_

### 48. [Tech Lead] You must optimise a slow endpoint end to end. What is your checklist?

**Short answer:** Work from the biggest wins to the smallest, using traces to find where the time goes. Usually the answer is in the **database or network calls**, not in Go code.

```mermaid
flowchart TD
    A["Trace the slow request"] --> B{"Where is most of the time?"}
    B -->|DB| C["Queries: N+1, missing index,<br/>too many columns, no pagination"]
    B -->|"Other services"| D["Parallelise, cache, batch,<br/>timeouts, remove calls"]
    B -->|"Our code CPU"| E["pprof: algorithm, JSON,<br/>regex, allocations"]
    B -->|"Waiting"| F["Locks, pool sizes, queues"]
    C --> G["Fix largest first, then re-measure"]
    D --> G
    E --> G
    F --> G
```

**Checklist**

1. **Database**
   - N+1 queries (a loop calling the DB per row): use `JOIN`, `WHERE id = ANY($1)`, or batch loading.
   - Missing/unused indexes: `EXPLAIN (ANALYZE, BUFFERS)`.
   - Select only needed columns; paginate (keyset pagination for large tables).
   - Reuse connections; keep transactions short.
2. **Calls to other services**
   - Run independent calls in parallel (`errgroup`).
   - Cache stable data (in-memory + Redis), use `singleflight`.
   - Batch many small calls into one.
3. **Do less work:** compute lazily, avoid loading data you do not return, move heavy work async (queue) and return `202`.
4. **Payload:** smaller JSON (omit unused fields), gzip/brotli, stream large responses, HTTP/2.
5. **CPU in Go:** pprof; replace expensive regex, avoid repeated JSON encode/decode, reduce allocations, better data structures (map instead of nested loops).
6. **Concurrency:** worker pools with limits, avoid lock contention, no goroutine per tiny task.
7. **Infrastructure:** right-sized pods, `GOMAXPROCS`/`GOMEMLIMIT`, keep-alive connections, CDN for static content.

**Example: parallelise independent calls**

```go
g, ctx := errgroup.WithContext(ctx)
var user User
var orders []Order

g.Go(func() (err error) { user, err = users.Get(ctx, id); return })
g.Go(func() (err error) { orders, err = orderSvc.List(ctx, id); return })

if err := g.Wait(); err != nil {
	return err
}
// total time = max(users, orders) instead of the sum
```

**Always:** write down the *before* numbers, change one thing at a time, and keep a benchmark or load test to prove the *after*. Premature optimisation of the wrong layer wastes time.

_Module: Performance & Load · Tags: performance, optimization, tech-lead_

### 49. [Tech Lead] How do you find and fix N+1 queries and other database performance issues in a Go service?

**Short answer:** An **N+1** problem is when you run one query to get a list, then one extra query for *each* item. 100 orders become 101 queries. It is invisible in small tests and deadly in production. Fix it by loading related data in one or two queries.

```go
// ❌ N+1: one query for orders, then one per order for its customer
orders, _ := db.QueryContext(ctx, `SELECT id, customer_id FROM orders LIMIT 100`)
for orders.Next() {
	var o Order
	orders.Scan(&o.ID, &o.CustomerID)
	db.QueryRowContext(ctx, `SELECT name FROM customers WHERE id = $1`, o.CustomerID).Scan(&o.CustomerName)
}

// ✅ 1 query with a JOIN
rows, _ := db.QueryContext(ctx, `
	SELECT o.id, c.name
	FROM orders o
	JOIN customers c ON c.id = o.customer_id
	LIMIT 100`)

// ✅ or 2 queries (batch load by ids)
rows, _ = db.QueryContext(ctx, `SELECT id, name FROM customers WHERE id = ANY($1)`, pq.Array(ids))
```

**How to detect it**
- Count queries per request in traces (a long list of identical spans is the giveaway).
- Log slow queries and query counts per request in dev.
- Enable `pg_stat_statements` (PostgreSQL) to see the most-called and slowest statements.
- ORMs (GORM) hide it: turn on SQL logging in development.

**Other database fixes**

| Problem | Fix |
| --- | --- |
| Slow `WHERE`/`ORDER BY` | Add the right index; check with `EXPLAIN (ANALYZE, BUFFERS)`; watch for sequential scans on big tables |
| `OFFSET 100000` pagination | Keyset pagination: `WHERE id > $last ORDER BY id LIMIT 50` |
| `SELECT *` | Select only the columns you use |
| Many small inserts | Batch: multi-row `INSERT`, `COPY`, pgx `Batch` |
| Long transactions | Keep them short; no network calls inside |
| Pool exhaustion | Tune pool; shorter queries; PgBouncer |
| Hot rows / lock waits | Smaller transactions, consistent lock order, optimistic concurrency |
| Repeated identical reads | Cache with TTL, `singleflight` |

**Pooling math:** `pods x MaxOpenConns` must stay under the database's `max_connections`. For example 30 pods x 20 = 600, which is too many for a default Postgres. Use PgBouncer or lower the per-pod limit.

**Interview tip:** describe a time you found one via traces and how the fix reduced latency or database load, with numbers.

_Module: Performance & Load · Tags: database, performance, tech-lead_

### 50. [Tech Lead] How do you debug a Go service in production without restarting it?

**Short answer:** Use read-only, low-overhead tools: logs, metrics, traces, a goroutine dump, `pprof`, and (carefully) a debug sidecar or ephemeral container. Avoid changes that need a redeploy until you know what you are looking for.

**Toolbox, from safest to heaviest**

1. **Dashboards, logs, traces** (always first).
2. **Goroutine dump** — see everything the process is doing right now:
   ```bash
   curl "http://localhost:6060/debug/pprof/goroutine?debug=2"
   kill -QUIT <pid>      # prints all goroutine stacks to stderr (then the process exits!)
   ```
   `debug=2` on the HTTP endpoint does **not** kill the process; `SIGQUIT` does.
3. **pprof** CPU/heap/block/mutex profiles (30 s, a few % overhead).
4. **Runtime stats:** export `runtime.NumGoroutine()`, `runtime.ReadMemStats`, GC pause, and `db.Stats()` as metrics.
5. **Change log level at runtime** (an admin endpoint or config reload) to turn on debug logs for a limited time.
6. **Feature flags / dynamic config** to switch code paths without a deploy.
7. **`kubectl debug`** with an ephemeral container for a shell and tools next to a distroless container:
   ```bash
   kubectl debug -it pod/orders-7d9 --image=busybox --target=orders-api
   ```
8. **Delve (`dlv attach`)** can attach to a running process, but it **pauses** it. Use on a pod that is already out of rotation, never on a busy one.
9. **Core dump:** `GOTRACEBACK=crash` makes a fatal error produce a core file for post-mortem analysis (needs the OS configured for core dumps).

**Make it easy before you need it**
- Expose `/debug/pprof` on an **internal** port, with network policy and auth.
- Embed build info (version, commit) and print it at startup. In Go 1.18+ `debug.ReadBuildInfo()` includes `vcs.revision`.
- Keep a **runbook** with the exact commands for your environment.
- Use **continuous profiling** so history is available even after a pod restarts.

**Safety rules:** do not put sensitive data in logs while debugging; limit how long debug mode is on; take the pod out of the load balancer before any invasive tool; record what you did in the incident timeline.

_Module: Debugging & Reliability · Tags: debugging, production, tech-lead_

### 51. [Tech Lead] How do you capacity-plan and scale a Go service on Kubernetes?

**Short answer:** Measure how much one pod can handle at your latency target, then size replicas for peak traffic with headroom, and let the autoscaler handle the daily swings. Verify with load tests, not guesses.

**Step 1: find per-pod capacity**
- Load test one pod with production-like limits. Find the highest request rate where p99 is still within the SLO. Suppose it is **300 req/s**.
- Use 60-70% of that as the safe target: about **200 req/s per pod**.

**Step 2: size for peak**
- Peak traffic 3,000 req/s -> `3000 / 200 = 15` pods.
- Add redundancy: spread over at least 3 zones/nodes and survive losing one (so choose 18-20).

```mermaid
flowchart LR
    A["Load test: 300 req/s per pod at SLO"] --> B["Target 200 req/s per pod (about 65%)"]
    C["Peak: 3000 req/s"] --> D["15 pods + N+1/zone spare = about 18"]
    B --> D
    D --> E["HPA between min 6 and max 30"]
```

**Step 3: autoscale**
- **HPA** on CPU is simple and works when CPU tracks load. Better signals: requests per pod, in-flight requests, queue depth (KEDA) for async workers.
- Set sensible **min replicas** (for availability) and **max** (so you do not exhaust the database).
- Scale-up must be faster than the spike, otherwise combine with load shedding.

**Step 4: protect shared limits**
- Total DB connections = pods x pool size.
- Downstream API quotas.
- Use `PodDisruptionBudget`, readiness probes, and graceful shutdown so scaling/rolling updates do not drop requests.

**Right-size resources**
- Requests: based on observed steady usage (P90) so the scheduler packs properly.
- Memory limit: above the peak plus `GOMEMLIMIT` margin.
- Watch **CPU throttling**; keep `GOMAXPROCS` aligned with limits.

**Scale vertically or horizontally?** Go services usually scale **horizontally** (stateless, small pods). Vertical scaling helps with big in-memory caches or CPU-heavy tasks.

**Cost and review:** track cost per request, review capacity each quarter or before big launches (for example, airline fleet roll-out), and run a game day to verify failover.

_Module: Observability & Operations · Tags: scalability, kubernetes, capacity, tech-lead_

### 52. [Tech Lead] What do you enforce in code reviews and CI for a Go team?

**Short answer:** Automate everything that a tool can check (formatting, lint, race detection, vulnerabilities, tests) so reviews focus on design, correctness, and maintainability. Write the team conventions down in the repo so they are applied consistently.

**CI pipeline (GitLab CI example)**

```yaml
stages: [lint, test, build, scan]

lint:
  stage: lint
  image: golangci/golangci-lint:latest
  script: [golangci-lint run ./...]

test:
  stage: test
  image: golang:1.22
  script:
    - go vet ./...
    - go test -race -cover -coverprofile=cover.out ./...
    - go tool cover -func=cover.out | tail -1

vuln:
  stage: scan
  image: golang:1.22
  script:
    - go install golang.org/x/vuln/cmd/govulncheck@latest
    - govulncheck ./...
```

**Automatic gates:** `gofmt`, `go vet`, `golangci-lint` (errcheck, staticcheck, govet, gosec, ineffassign), `go test -race`, `govulncheck`, container image scan, `go mod tidy` drift check, coverage threshold on changed code (not a vanity 100%).

**Human review checklist (what tools cannot see)**

| Area | Questions |
| --- | --- |
| Errors | Handled once? Wrapped with context? No ignored errors? |
| Concurrency | Who owns each goroutine and how does it stop? Shared state protected? Channels closed by the sender? |
| Context | First parameter, passed to every I/O call? Timeouts set? |
| Resources | `Close`/`Cancel`/`Stop` deferred? Response bodies closed? |
| API design | Small interfaces defined by the consumer? Exported names minimal? |
| Tests | Table-driven, edge cases, no sleeping for sync, race-free? |
| Observability | Logs, metrics, traces on new paths? No secrets or PII in logs? |
| Performance | Hot path allocations? Unbounded loops/queries/queues? |
| Security | Input validated? SQL parameterised? Authz checked server side? |
| Operations | Config via env? Graceful shutdown? Migrations safe and backward compatible? |

**Team practices**
- A short `CONTRIBUTING.md`/style guide (Uber Go Style Guide and Effective Go are good bases).
- Small PRs, clear description with "why", link the ticket, screenshots/metrics for performance changes.
- ADRs (architecture decision records) for big choices.
- Be kind and specific in review comments; separate "must fix" from "suggestion".
- Mentor: pair on tricky concurrency code and explain *why*, not only *what*.

_Module: Tooling & Delivery · Tags: leadership, code-review, ci, tech-lead_

### 53. [Tech Lead] How do you prevent performance regressions from reaching production?

**Short answer:** Make performance a **tested, visible, gated** property just like correctness: benchmarks for hot paths, load tests in the pipeline, dashboards with deploy markers, canary releases with automatic rollback, and SLO alerts.

```mermaid
flowchart LR
    A["PR"] --> B["Unit + race tests"]
    B --> C["Benchmarks compared with main<br/>(benchstat)"]
    C --> D["Deploy to staging"]
    D --> E["Automated load test<br/>against SLO"]
    E --> F["Canary 5% in production"]
    F --> G{"Error rate / p99 OK?"}
    G -- yes --> H["Roll out 100%"]
    G -- no --> I["Auto rollback + alert"]
```

**1. Microbenchmarks for hot paths**

```bash
go test -bench=Encode -benchmem -count=10 ./... > new.txt
git stash; go test -bench=Encode -benchmem -count=10 ./... > old.txt
benchstat old.txt new.txt
# shows a % change with statistical significance
```
Fail the CI job if a critical benchmark gets more than, say, 10% slower (be careful about noisy runners; compare relative to a baseline run on the same machine).

**2. Load tests in staging**
- A k6/vegeta scenario for the 3-5 most important endpoints, run on each release candidate. Assert thresholds (`p95 < 300ms`, `errors < 0.1%`).

**3. Canary releases and progressive delivery**
- Send a small share of traffic to the new version (Argo Rollouts / Flagger / mesh weights), compare its metrics with the old one, auto-rollback on regression.

**4. Observability**
- Deploy markers on dashboards, continuous profiling (compare flame graphs before/after), alerts on SLO burn rate.

**5. Guardrails in code**
- Max page size and body size, timeouts, bounded queues, query limits.
- Feature flags so heavy features can be disabled quickly.

**6. Culture**
- A "performance budget" per endpoint written in the design doc.
- Post-mortems for regressions lead to a new test or alert.

**Interview tip:** explain that you cannot rely on reviewers to spot a slow change by eye; you need automated evidence at three stages: pre-merge, pre-release, and in production.

_Module: Performance & Load · Tags: performance, ci, tech-lead_

### 54. How does `append` grow a slice, and what are the aliasing gotchas?

**Short answer:** `append` adds items. If there is spare capacity, it writes into the *same* array. If not, Go allocates a bigger array, copies the data, and returns a slice that points to the **new** array. You must always use the returned value: `s = append(s, x)`.

```go
package main

import "fmt"

func main() {
	a := make([]int, 3, 4) // len 3, cap 4
	b := append(a, 100)    // fits: shares the same array
	c := append(a, 200)    // also fits: overwrites the same slot!

	fmt.Println(b[3], c[3]) // prints: 200 200  (surprise!)

	d := append(b, 300) // cap exceeded: new array allocated
	d[0] = 999
	fmt.Println(b[0], d[0]) // prints: 0 999  (no longer shared)
}
```

```mermaid
flowchart LR
    A["a: len 3, cap 4"] --> M["array [0 0 0 _ ]"]
    B["b = append(a, 100)"] --> M
    C["c = append(a, 200)"] --> M
    D["d = append(b, 300)<br/>cap exceeded"] --> N["NEW array [0 0 0 200 300 _ _ _]"]
```

**Growth:** capacity roughly doubles for small slices and grows by about 1.25x for large ones (exact rules change between versions, so never depend on them).

**How to stay safe**
1. Always assign the result of `append` back.
2. When handing a slice to code that may append, limit its capacity with a full slice expression: `s[:n:n]`.
3. Need an independent copy? `copy(dst, src)` or `slices.Clone(s)` (Go 1.21+).
4. Pre-size with `make([]T, 0, n)` when you know `n`.
5. A sub-slice keeps the **whole** big array alive in memory. If you keep a tiny piece of a huge slice, copy it out.

_Module: Types & Data Structures · Tags: slices, gotchas_

### 55. Why is an interface holding a nil pointer not equal to nil?

**Short answer:** An interface value has two parts: a *type* and a *value*. It is `nil` only when **both** are empty. If you put a nil pointer of type `*MyErr` inside an `error` interface, the type part is set, so the interface is **not** nil.

```go
package main

import "fmt"

type MyErr struct{}

func (*MyErr) Error() string { return "my error" }

func mayFail(fail bool) error {
	var e *MyErr // nil pointer
	if fail {
		e = &MyErr{}
	}
	return e // ❌ returns (type=*MyErr, value=nil): not a nil error!
}

func main() {
	err := mayFail(false)
	fmt.Println(err == nil) // prints: false  (surprise!)
}
```

```mermaid
flowchart LR
    subgraph NilInterface["error(nil)"]
        T1["type: nil"]
        V1["value: nil"]
    end
    subgraph Trap["error holding (*MyErr)(nil)"]
        T2["type: *MyErr"]
        V2["value: nil"]
    end
```

**Fix:** return a literal `nil` on the success path.

```go
func mayFail(fail bool) error {
	if fail {
		return &MyErr{}
	}
	return nil // ✅
}
```

**Rule:** functions should return the `error` interface type, never a concrete pointer type like `*MyErr`, and should return `nil` explicitly.

**Interview tip:** this is a favourite trick question. Draw the two-box (type, value) picture.

_Module: Interfaces & Generics · Tags: interfaces, gotchas_

### 56. How do type assertions and type switches work?

**Short answer:** They let you get the concrete type back out of an interface value. A type assertion `v.(T)` checks one type. A type switch checks several.

```go
package main

import "fmt"

type Shape interface{ Area() float64 }
type Circle struct{ R float64 }
type Square struct{ S float64 }

func (c Circle) Area() float64 { return 3.14 * c.R * c.R }
func (s Square) Area() float64 { return s.S * s.S }

func describe(s Shape) {
	// type switch
	switch v := s.(type) {
	case Circle:
		fmt.Println("circle radius", v.R)
	case Square:
		fmt.Println("square side", v.S)
	default:
		fmt.Println("unknown shape")
	}
}

func main() {
	var s Shape = Circle{R: 2}

	c, ok := s.(Circle) // safe form: no panic
	fmt.Println(c.R, ok) // 2 true

	_, ok = s.(Square)
	fmt.Println(ok) // false

	// sq := s.(Square) // ❌ panics: interface conversion
	describe(s)
}
```

**Tips**
- Always use the `v, ok :=` form unless you are certain.
- You can assert to an **interface** to check optional behaviour:
  ```go
  if st, ok := err.(interface{ Timeout() bool }); ok && st.Timeout() { /* retry */ }
  ```
- Too many type switches often means the interface is missing a method. Prefer adding the method.

_Module: Interfaces & Generics · Tags: interfaces, types_

### 57. How do you wrap, compare and inspect errors (`%w`, `errors.Is`, `errors.As`, `errors.Join`)?

**Short answer:** Wrap errors with `fmt.Errorf("...: %w", err)` to add context but keep the cause. Use `errors.Is` to check for a specific error value and `errors.As` to find a specific error *type* anywhere in the chain.

```go
package main

import (
	"errors"
	"fmt"
)

// sentinel error: a fixed value callers compare with
var ErrNotFound = errors.New("not found")

// custom error type: carries extra data
type ValidationError struct {
	Field string
}

func (e *ValidationError) Error() string { return "invalid " + e.Field }

func find(id string) error {
	return fmt.Errorf("find user %s: %w", id, ErrNotFound)
}

func validate() error {
	return fmt.Errorf("signup: %w", &ValidationError{Field: "email"})
}

func main() {
	err := find("42")
	fmt.Println(errors.Is(err, ErrNotFound)) // true (walks the chain)

	var ve *ValidationError
	if errors.As(validate(), &ve) { // fills ve if found
		fmt.Println("bad field:", ve.Field) // email
	}

	// Go 1.20+: combine several errors
	both := errors.Join(errors.New("db down"), errors.New("cache down"))
	fmt.Println(both)
}
```

```mermaid
flowchart LR
    A["signup: ..."] -->|Unwrap| B["find user 42: ..."] -->|Unwrap| C["ErrNotFound"]
```

**When to use which**
- Sentinel (`ErrNotFound`) for simple, expected conditions.
- Custom type when the caller needs data (field name, HTTP status).
- Do not compare errors with `==` or by string. `Is` and `As` survive wrapping.
- Do **not** wrap with `%w` if you do not want callers to depend on the inner error. Use `%v` to hide it.

_Module: Errors & Panics · Tags: errors_

### 58. What is `context.Context` and how do you use it for cancellation and timeouts?

**Short answer:** A `Context` carries a cancellation signal, a deadline, and request-scoped values across API boundaries and goroutines. You pass it as the **first parameter** of any function that does I/O or may run long. When the context is cancelled, all work using it should stop.

```go
package main

import (
	"context"
	"fmt"
	"time"
)

func slowQuery(ctx context.Context) error {
	select {
	case <-time.After(2 * time.Second): // pretend the DB is slow
		return nil
	case <-ctx.Done():
		return ctx.Err() // context.DeadlineExceeded or context.Canceled
	}
}

func main() {
	ctx, cancel := context.WithTimeout(context.Background(), 500*time.Millisecond)
	defer cancel() // ALWAYS call cancel to release resources

	err := slowQuery(ctx)
	fmt.Println(err) // prints: context deadline exceeded
}
```

```mermaid
flowchart TD
    R["Background()"] --> A["WithTimeout 5s (HTTP request)"]
    A --> B["WithCancel (worker group)"]
    B --> C["goroutine 1"]
    B --> D["goroutine 2"]
    A -. "timeout fires" .-> B
    B -. "cancel propagates" .-> C
    B -. "cancel propagates" .-> D
```

Cancelling a parent cancels all children (a tree).

**Rules**
1. First parameter, named `ctx`. Never store it inside a struct.
2. Always `defer cancel()` after `WithCancel/WithTimeout/WithDeadline`.
3. Pass it down into DB calls, HTTP calls (`http.NewRequestWithContext`) and other goroutines.
4. Use `context.Background()` at the top (main, tests) and `context.TODO()` when unsure.
5. `WithValue` only for request-scoped data (trace id, user id), with a private key type. Never for optional function arguments.

```go
type ctxKey string
ctx = context.WithValue(ctx, ctxKey("traceID"), "abc-123")
```

_Module: Concurrency · Tags: context, concurrency_

### 59. When do you use `sync.Mutex` and `sync.RWMutex`? Show a safe cache.

**Short answer:** A mutex lets only one goroutine at a time into a *critical section*, protecting shared data. An `RWMutex` allows many readers at once or one writer. Use `RWMutex` when reads are much more frequent than writes.

```go
package main

import (
	"fmt"
	"sync"
)

type Cache struct {
	mu   sync.RWMutex
	data map[string]string
}

func NewCache() *Cache {
	return &Cache{data: make(map[string]string)}
}

func (c *Cache) Get(key string) (string, bool) {
	c.mu.RLock() // many readers can hold this together
	defer c.mu.RUnlock()
	v, ok := c.data[key]
	return v, ok
}

func (c *Cache) Set(key, val string) {
	c.mu.Lock() // exclusive
	defer c.mu.Unlock()
	c.data[key] = val
}

func main() {
	c := NewCache()
	c.Set("a", "1")
	fmt.Println(c.Get("a")) // 1 true
}
```

**Rules**
- Keep the lock held for the **shortest** time. Never do I/O or call unknown callbacks while holding it.
- `defer mu.Unlock()` right after `Lock()`.
- **Never copy** a struct that contains a mutex (`go vet` warns). Use pointer receivers.
- Go mutexes are **not re-entrant**. Locking twice in the same goroutine deadlocks.
- Keep the mutex next to the data it guards and say so in a comment.

**Mutex vs channel:** use a mutex to protect state; use channels to pass ownership or coordinate. Both are valid, pick the simpler one.

_Module: Concurrency · Tags: sync, mutex_

### 60. What is the `sync/atomic` package and when is it better than a mutex?

**Short answer:** Atomic operations read or modify one variable in a single, uninterruptible step using special CPU instructions. They are cheaper than a mutex for simple counters and flags, but only work on a single value.

```go
package main

import (
	"fmt"
	"sync"
	"sync/atomic"
)

func main() {
	var hits atomic.Int64 // Go 1.19+ typed atomics (preferred)
	var wg sync.WaitGroup

	for i := 0; i < 1000; i++ {
		wg.Add(1)
		go func() {
			defer wg.Done()
			hits.Add(1) // safe without a lock
		}()
	}
	wg.Wait()
	fmt.Println(hits.Load()) // prints: 1000
}
```

**Useful operations:** `Add`, `Load`, `Store`, `Swap`, `CompareAndSwap` (CAS). `atomic.Value` / `atomic.Pointer[T]` store a whole object that is replaced as a unit (good for config reload: build a new config, `Store` it, readers `Load`).

**Use atomics for:** counters, metrics, "is shutting down" flags, swapping immutable snapshots.

**Use a mutex when:** you need to update **several fields** together or keep an invariant. Two atomics are not atomic *together*.

**Gotcha:** plain `counter++` from many goroutines is a data race even though it looks tiny (read, add, write are 3 steps).

_Module: Concurrency · Tags: sync, atomic_

### 61. What are `sync.Once` and `sync.OnceValue` used for?

**Short answer:** `sync.Once` runs a function **exactly one time**, even if many goroutines call it at once. Everyone else waits until it finishes. It is the standard way to do lazy, thread-safe initialisation.

```go
package main

import (
	"fmt"
	"sync"
)

type Config struct{ DSN string }

var (
	once sync.Once
	cfg  *Config
)

func GetConfig() *Config {
	once.Do(func() {
		fmt.Println("loading config...") // printed one time only
		cfg = &Config{DSN: "postgres://localhost/app"}
	})
	return cfg
}

func main() {
	var wg sync.WaitGroup
	for i := 0; i < 5; i++ {
		wg.Add(1)
		go func() { defer wg.Done(); _ = GetConfig() }()
	}
	wg.Wait()
	fmt.Println(GetConfig().DSN)
}
```

**Newer helpers (Go 1.21+)**

```go
getCfg := sync.OnceValue(func() *Config { return &Config{DSN: "x"} })
c := getCfg() // computed once, cached
```
`OnceFunc` and `OnceValues` (for a value + error) work the same way.

**Notes**
- If the function panics, `Once` still counts it as done.
- Do not use double-checked locking by hand. It is easy to get wrong. Use `Once`.
- Other uses: close a channel safely only once (`once.Do(func(){ close(done) })`).

_Module: Concurrency · Tags: sync, patterns_

### 62. What is `sync.Pool` and when should you use it?

**Short answer:** `sync.Pool` keeps a cache of reusable temporary objects (like buffers) so you create fewer allocations and give the garbage collector less work. The runtime may empty the pool at any GC, so it is only a performance helper, never storage.

```go
package main

import (
	"bytes"
	"fmt"
	"sync"
)

var bufPool = sync.Pool{
	New: func() any { return new(bytes.Buffer) }, // used when pool is empty
}

func render(name string) string {
	buf := bufPool.Get().(*bytes.Buffer)
	defer func() {
		buf.Reset()      // ✅ clean before returning it
		bufPool.Put(buf) // give it back
	}()

	buf.WriteString("Hello, ")
	buf.WriteString(name)
	return buf.String()
}

func main() { fmt.Println(render("Anu")) } // Hello, Anu
```

**Use it for:** hot paths that allocate many short-lived, same-sized objects: JSON encoders, byte buffers, parsers. The standard library does this in `fmt` and `net/http`.

**Do not use it:**
- To cache business data or hold connections (items can vanish).
- Without measuring. Check `go test -bench -benchmem` first. Pools add complexity.
- With objects that keep references to big data. Reset them before `Put`, or they hold memory and leak data between requests.

_Module: Concurrency · Tags: sync, performance_

### 63. How does `errgroup` help run goroutines that can fail?

**Short answer:** `errgroup` (from `golang.org/x/sync/errgroup`) is a `WaitGroup` that also collects the **first error** and can **cancel** the other goroutines through a shared context. It is the neat way to run parallel work and stop early on failure.

```go
package main

import (
	"context"
	"fmt"
	"time"

	"golang.org/x/sync/errgroup"
)

func fetch(ctx context.Context, name string, d time.Duration, fail bool) error {
	select {
	case <-time.After(d):
		if fail {
			return fmt.Errorf("%s failed", name)
		}
		fmt.Println(name, "ok")
		return nil
	case <-ctx.Done():
		fmt.Println(name, "cancelled")
		return ctx.Err()
	}
}

func main() {
	g, ctx := errgroup.WithContext(context.Background())

	g.Go(func() error { return fetch(ctx, "users", 50*time.Millisecond, true) })
	g.Go(func() error { return fetch(ctx, "orders", 500*time.Millisecond, false) })

	if err := g.Wait(); err != nil { // first non-nil error
		fmt.Println("error:", err)
	}
}
// prints: orders cancelled, then error: users failed
```

**Extra features**
- `g.SetLimit(n)` limits how many goroutines run at once (bounded concurrency).
- `g.TryGo` starts a goroutine only if there is room.

**Remember:** goroutines must *watch the ctx* to actually stop. `errgroup` only cancels the context; it cannot kill a goroutine.

_Module: Concurrency · Tags: errgroup, concurrency_

### 64. Show a worker pool pattern in Go and explain how it works.

**Short answer:** A fixed number of worker goroutines read jobs from one channel and write results to another. It limits concurrency (so you do not start 1 million goroutines or overload the database) and reuses workers.

```mermaid
flowchart LR
    P["Producer"] --> J[("jobs channel")]
    J --> W1["worker 1"]
    J --> W2["worker 2"]
    J --> W3["worker 3"]
    W1 --> R[("results channel")]
    W2 --> R
    W3 --> R
    R --> C["Collector"]
```

```go
package main

import (
	"fmt"
	"sync"
)

func worker(id int, jobs <-chan int, results chan<- int, wg *sync.WaitGroup) {
	defer wg.Done()
	for n := range jobs { // ends when jobs is closed
		results <- n * n // pretend this is slow work
	}
}

func main() {
	jobs := make(chan int)
	results := make(chan int)

	var wg sync.WaitGroup
	for i := 1; i <= 3; i++ {
		wg.Add(1)
		go worker(i, jobs, results, &wg)
	}

	// close results when all workers are done
	go func() { wg.Wait(); close(results) }()

	// send jobs, then close to tell workers "no more"
	go func() {
		for n := 1; n <= 5; n++ {
			jobs <- n
		}
		close(jobs)
	}()

	sum := 0
	for r := range results {
		sum += r
	}
	fmt.Println(sum) // prints: 55
}
```

**Who closes what:** the producer closes `jobs`; a helper goroutine closes `results` after all workers finish. Closing in the wrong place causes panics or deadlocks.

**Production additions:** `context` for cancellation, error collection (`errgroup`), retries, metrics for queue length, and a bounded `jobs` buffer for backpressure.

_Module: Concurrency · Tags: patterns, concurrency_

### 65. Explain fan-out and fan-in with an example.

**Short answer:** *Fan-out* means starting several goroutines that read from the same channel to share the work. *Fan-in* means merging the outputs of several channels back into one channel.

```mermaid
flowchart LR
    S["source"] --> A["worker A"]
    S --> B["worker B"]
    S --> C["worker C"]
    A --> M["merge"]
    B --> M
    C --> M
    M --> O["single output channel"]
```

```go
package main

import (
	"fmt"
	"sync"
)

func gen(nums ...int) <-chan int {
	out := make(chan int)
	go func() {
		defer close(out)
		for _, n := range nums {
			out <- n
		}
	}()
	return out
}

func square(in <-chan int) <-chan int {
	out := make(chan int)
	go func() {
		defer close(out)
		for n := range in {
			out <- n * n
		}
	}()
	return out
}

// fan-in: merge many channels into one
func merge(cs ...<-chan int) <-chan int {
	out := make(chan int)
	var wg sync.WaitGroup
	wg.Add(len(cs))
	for _, c := range cs {
		go func() {
			defer wg.Done()
			for v := range c {
				out <- v
			}
		}()
	}
	go func() { wg.Wait(); close(out) }()
	return out
}

func main() {
	in := gen(1, 2, 3, 4, 5, 6)
	// fan-out: 3 workers read from the same input
	a, b, c := square(in), square(in), square(in)

	total := 0
	for v := range merge(a, b, c) {
		total += v
	}
	fmt.Println(total) // prints: 91
}
```

**Note:** the order of results is not preserved. If order matters, attach an index to each job and sort at the end.

_Module: Concurrency · Tags: patterns, concurrency_

### 66. What is a pipeline in Go and how do you stop it early without leaking goroutines?

**Short answer:** A pipeline is a chain of stages connected by channels. Each stage receives values, does one job, and sends results on. To stop early, every stage must also watch a `done` channel or a `context`, so nobody is left blocked on a send.

```mermaid
flowchart LR
    G["generate"] --> F["filter"] --> T["transform"] --> S["sink"]
    X["ctx.Done()"] -. cancels .-> G
    X -. cancels .-> F
    X -. cancels .-> T
```

```go
package main

import (
	"context"
	"fmt"
)

func generate(ctx context.Context) <-chan int {
	out := make(chan int)
	go func() {
		defer close(out)
		for i := 1; ; i++ { // infinite source
			select {
			case out <- i:
			case <-ctx.Done(): // ✅ stop when asked
				return
			}
		}
	}()
	return out
}

func double(ctx context.Context, in <-chan int) <-chan int {
	out := make(chan int)
	go func() {
		defer close(out)
		for n := range in {
			select {
			case out <- n * 2:
			case <-ctx.Done():
				return
			}
		}
	}()
	return out
}

func main() {
	ctx, cancel := context.WithCancel(context.Background())
	for v := range double(ctx, generate(ctx)) {
		fmt.Println(v)
		if v >= 6 {
			break
		}
	}
	cancel() // generate and double exit instead of blocking forever
}
```

**Why the `select` on send matters:** without it, after `main` stops reading, `out <- i` blocks forever. That goroutine leaks and holds memory.

**Rule:** every goroutine you start needs a clear way to finish.

_Module: Concurrency · Tags: patterns, concurrency, leaks_

### 67. How do you limit concurrency (semaphore pattern) in Go?

**Short answer:** Use a buffered channel as a counter of "tickets". Take a ticket before starting work and give it back when done. Only N goroutines can hold tickets at once.

```go
package main

import (
	"fmt"
	"sync"
	"time"
)

func main() {
	const maxParallel = 3
	sem := make(chan struct{}, maxParallel) // capacity = limit
	var wg sync.WaitGroup

	for i := 1; i <= 8; i++ {
		wg.Add(1)
		sem <- struct{}{} // acquire: blocks if 3 are running
		go func() {
			defer wg.Done()
			defer func() { <-sem }() // release
			fmt.Println("calling API", i)
			time.Sleep(100 * time.Millisecond)
		}()
	}
	wg.Wait()
}
```

**Other ways**
- `errgroup` with `g.SetLimit(3)`: simplest in most code.
- `golang.org/x/sync/semaphore`: weighted semaphore with context support (acquire 5 units for a big job, 1 for a small one).
- A worker pool (fixed workers reading a channel).

**Why limit?** Protect a database or third-party API from too many parallel calls, avoid running out of file descriptors, memory, or hitting rate limits.

**Tip:** acquire the semaphore *before* `go`, so you do not create millions of goroutines that just wait.

_Module: Concurrency · Tags: concurrency, patterns_

### 68. How do you rate limit in Go (ticker, `x/time/rate`)?

**Short answer:** For a simple fixed pace use `time.Ticker`. For real APIs use the **token bucket** from `golang.org/x/time/rate`: tokens refill at a steady rate, and a request needs a token to proceed. A burst size allows short spikes.

```go
package main

import (
	"context"
	"fmt"
	"time"

	"golang.org/x/time/rate"
)

func main() {
	// 5 requests per second, burst of 2
	limiter := rate.NewLimiter(rate.Limit(5), 2)
	ctx := context.Background()

	start := time.Now()
	for i := 1; i <= 6; i++ {
		if err := limiter.Wait(ctx); err != nil { // blocks until allowed
			return
		}
		fmt.Printf("request %d at %v\n", i, time.Since(start).Round(100*time.Millisecond))
	}
}
```

```mermaid
flowchart LR
    R["tokens refill 5/s"] --> B(("bucket: max 2"))
    Q["request"] --> B
    B -- "token available" --> OK["allow"]
    B -- "empty" --> W["wait or reject (429)"]
```

**Three methods**
- `Wait(ctx)`: block until a token is available.
- `Allow()`: returns `false` immediately if no token (good for HTTP handlers returning `429`).
- `Reserve()`: get the delay and decide yourself.

**Per-user limits:** keep a `map[userID]*rate.Limiter` guarded by a mutex, and clean up old entries. In a multi-pod deployment, in-memory limiters are per pod. Use Redis or an API gateway for a global limit.

_Module: Concurrency · Tags: rate-limit, concurrency_

### 69. What is a goroutine leak? How do you detect and prevent it?

**Short answer:** A goroutine leak is a goroutine that never finishes, usually because it is blocked forever on a channel, a lock, or I/O. Each leaked goroutine holds memory (and anything it references), so the service slowly grows until it is killed.

**Classic leak**

```go
func firstResult(urls []string) string {
	ch := make(chan string) // ❌ unbuffered
	for _, u := range urls {
		go func() { ch <- fetch(u) }() // all but one will block forever
	}
	return <-ch // reads only the first
}
```

**Fix 1: buffered channel so senders never block**

```go
ch := make(chan string, len(urls))
```

**Fix 2: use a context and `select`** so slow goroutines can exit when the caller is done.

**Common causes**
- Sending/receiving on a channel nobody else uses anymore.
- Missing `close` so `for range ch` never ends.
- `time.After` or tickers never stopped (`ticker.Stop()`).
- HTTP calls with no timeout.
- Starting goroutines in a request handler without tying them to `r.Context()`.

**Detect**
- Watch `runtime.NumGoroutine()` (export it as a metric; it should be flat, not climbing).
- `pprof` goroutine profile: `/debug/pprof/goroutine?debug=1` shows where goroutines are stuck.
- In tests use `go.uber.org/goleak` to fail if goroutines remain after a test.

**Prevent:** give every goroutine an owner and an exit condition (context, close, or done channel).

_Module: Concurrency · Tags: leaks, concurrency, debugging_

### 70. What is a data race? How does the race detector help?

**Short answer:** A data race happens when two goroutines access the same variable at the same time and at least one of them writes, without synchronisation. The result is unpredictable. Go's race detector finds these at runtime.

```go
package main

import (
	"fmt"
	"sync"
)

func main() {
	counter := 0
	var wg sync.WaitGroup
	for i := 0; i < 1000; i++ {
		wg.Add(1)
		go func() {
			defer wg.Done()
			counter++ // ❌ read-modify-write, not atomic: DATA RACE
		}()
	}
	wg.Wait()
	fmt.Println(counter) // often less than 1000, changes every run
}
```

**Run with the detector**

```bash
go run -race main.go
go test -race ./...
```

It prints both conflicting accesses with stack traces. **It only reports races that actually happen during that run**, so you need good tests that exercise concurrency.

**Fixes:** `sync.Mutex`, `sync/atomic`, or confine the data to one goroutine and communicate with channels.

**Facts to remember**
- Race detector slows the program 5-10x and uses more memory. Use it in tests/CI, not in production.
- Races on maps can crash the process (`concurrent map writes`).
- Races can corrupt interface values and slices (multi-word values), not just counters.
- "It works on my machine" is a classic sign of a race.

_Module: Concurrency · Tags: race, concurrency, testing_

### 71. What causes a deadlock in Go and how do you debug one?

**Short answer:** A deadlock is when goroutines wait for each other forever. If **all** goroutines are blocked, the runtime stops with `fatal error: all goroutines are asleep - deadlock!`. If only some are stuck, the program keeps running silently, which is worse.

**Examples**

```go
// 1. Unbuffered send with no receiver
ch := make(chan int)
ch <- 1 // ❌ blocks forever

// 2. Lock ordering
// goroutine A: lock(a) then lock(b)
// goroutine B: lock(b) then lock(a)  -> each waits for the other

// 3. Locking a mutex twice in the same goroutine
mu.Lock()
mu.Lock() // ❌ Go mutexes are not re-entrant

// 4. WaitGroup counter never reaches zero (missing Done)
```

```mermaid
flowchart LR
    A["goroutine A holds lock 1"] -- "wants lock 2" --> B["goroutine B holds lock 2"]
    B -- "wants lock 1" --> A
```

**Prevention**
- Always lock multiple mutexes in the **same global order**.
- Use `defer mu.Unlock()`.
- Do not hold a lock while sending on a channel or calling out to unknown code.
- Use `select` with `ctx.Done()` or a timeout instead of blocking forever.

**Debugging**
1. Send `SIGQUIT` (`kill -QUIT <pid>`) to dump all goroutine stacks, or open `/debug/pprof/goroutine?debug=2`.
2. Look for many goroutines stuck in `chan send`, `chan receive`, `sync.Mutex.Lock`, `semacquire`.
3. Reproduce with `-race` and add timeouts to tests (`go test -timeout 30s`).

_Module: Concurrency · Tags: deadlock, concurrency, debugging_

### 72. Who should close a channel, and how do you shut down goroutines cleanly?

**Short answer:** The **sender** closes the channel, and only when it is sure no more values will be sent. A receiver should never close it. When there are many senders, close it from one coordinator after they all finish (use a `WaitGroup`). To tell goroutines "stop", use a `context` or a `done` channel.

**Rules**
1. Closing is a *signal to receivers*: "no more data".
2. Sending on a closed channel **panics**; closing twice **panics**.
3. You do not have to close every channel. Close only when receivers rely on it (`range`).

**A done channel**

```go
package main

import (
	"fmt"
	"sync"
	"time"
)

func worker(id int, done <-chan struct{}, wg *sync.WaitGroup) {
	defer wg.Done()
	for {
		select {
		case <-done: // closing done wakes EVERY worker
			fmt.Println("worker", id, "stopping")
			return
		default:
			time.Sleep(10 * time.Millisecond) // do some work
		}
	}
}

func main() {
	done := make(chan struct{})
	var wg sync.WaitGroup
	for i := 1; i <= 3; i++ {
		wg.Add(1)
		go worker(i, done, &wg)
	}
	time.Sleep(30 * time.Millisecond)
	close(done) // broadcast
	wg.Wait()   // wait until all are really finished
}
```

**Why `struct{}`?** It takes zero bytes. Nothing is sent, closing is the signal.

**Modern way:** `ctx.Done()` is exactly such a channel, so prefer a `context` and cancel it.

**Graceful shutdown order:** stop accepting new work, cancel the context, wait (`wg.Wait`) with a deadline, then exit.

_Module: Concurrency · Tags: channels, shutdown, concurrency_

### 73. How do generic constraints work, and what do `slices` and `maps` packages offer (Go 1.21+)?

**Short answer:** A constraint says which types a type parameter may be. Go 1.21 added standard `slices`, `maps` and `cmp` packages so you rarely write generic helpers yourself.

```go
package main

import (
	"cmp"
	"fmt"
	"maps"
	"slices"
	"strings"
)

type User struct {
	Name string
	Age  int
}

func main() {
	nums := []int{5, 2, 8}
	slices.Sort(nums)
	fmt.Println(nums, slices.Contains(nums, 8)) // [2 5 8] true

	idx, found := slices.BinarySearch(nums, 5)
	fmt.Println(idx, found) // 1 true

	users := []User{{"Zoya", 30}, {"Ali", 25}}
	slices.SortFunc(users, func(a, b User) int {
		return cmp.Compare(a.Name, b.Name)
	})
	fmt.Println(users) // [{Ali 25} {Zoya 30}]

	m := map[string]int{"b": 2, "a": 1}
	keys := slices.Sorted(maps.Keys(m)) // 1.23+ iterator helpers
	fmt.Println(keys)                    // [a b]

	fmt.Println(slices.IndexFunc(users, func(u User) bool {
		return strings.HasPrefix(u.Name, "Z")
	})) // 1
}
```

**Built-ins you get for free**
- `min(a, b, c)`, `max(...)` (1.21) and `clear(mapOrSlice)` (1.21).
- `cmp.Ordered` constraint: all types that support `<`.
- `comparable`: types that support `==` (map keys).

**Writing your own constraint**

```go
type Numeric interface{ ~int | ~float64 }

func Map[T, U any](in []T, f func(T) U) []U {
	out := make([]U, 0, len(in))
	for _, v := range in {
		out = append(out, f(v))
	}
	return out
}
```

**Limits to know:** methods cannot have their own type parameters (only the type can). Keep generic code simple.

_Module: Interfaces & Generics · Tags: generics, stdlib_

### 74. What changed with loop variables in Go 1.22 and why does it matter?

**Short answer:** Before Go 1.22, a `for` loop reused **one** variable for all iterations, so closures and goroutines created inside the loop all saw the *last* value. From Go 1.22 (when `go.mod` says `go 1.22` or higher) each iteration has its **own** variable.

```go
package main

import (
	"fmt"
	"sync"
)

func main() {
	var wg sync.WaitGroup
	for i := 0; i < 3; i++ {
		wg.Add(1)
		go func() {
			defer wg.Done()
			fmt.Println(i)
		}()
	}
	wg.Wait()
}
// Go < 1.22: often prints 3 3 3   (all share one i)
// Go >= 1.22: prints 0 1 2 in some order
```

**Old workarounds (still seen in older code)**

```go
for i := 0; i < 3; i++ {
	i := i // copy into a new variable
	go func() { fmt.Println(i) }()
}
// or
go func(n int) { fmt.Println(n) }(i)
```

**Important:** the behaviour depends on the `go` version in `go.mod`, not just the compiler you installed. A module that says `go 1.21` still gets the old behaviour.

**Interview tip:** this was a famous source of bugs. Mentioning that it was changed in 1.22 and that the version in `go.mod` controls it shows you keep up with the language.

_Module: Concurrency · Tags: go-1.22, gotchas, concurrency_

### 75. What is the functional options pattern and why is it popular?

**Short answer:** It is a way to build objects with many optional settings using functions as options. Callers write `NewServer(WithPort(9000), WithTimeout(5*time.Second))`. You can add new options later **without breaking** existing callers.

```go
package main

import (
	"fmt"
	"time"
)

type Server struct {
	host    string
	port    int
	timeout time.Duration
}

// Option changes a Server.
type Option func(*Server)

func WithPort(p int) Option { return func(s *Server) { s.port = p } }
func WithTimeout(d time.Duration) Option {
	return func(s *Server) { s.timeout = d }
}

func NewServer(host string, opts ...Option) *Server {
	s := &Server{host: host, port: 8080, timeout: 30 * time.Second} // defaults
	for _, opt := range opts {
		opt(s)
	}
	return s
}

func main() {
	a := NewServer("localhost")
	b := NewServer("localhost", WithPort(9000), WithTimeout(5*time.Second))
	fmt.Println(*a, *b)
	// {localhost 8080 30s} {localhost 9000 5s}
}
```

**Compared with other approaches**

| Approach | Problem |
| --- | --- |
| Many constructor arguments | Unreadable, breaks callers when you add one |
| A big config struct | Cannot tell "not set" from zero value; fine for simple cases |
| Builder (method chaining) | More code; less common in Go |
| **Functional options** | Defaults are clear, easy to extend, self-documenting |

**When not to use:** a small struct with 2-3 required fields is fine with a plain config struct. Do not over-engineer.

_Module: Design & Patterns · Tags: patterns, design_

### 76. Explain `io.Reader` and `io.Writer`. Why are they so important?

**Short answer:** They are two tiny interfaces that almost all I/O in Go is built on. Anything that can be read (file, network connection, HTTP body, string, gzip stream) is an `io.Reader`. Anything that can be written to is an `io.Writer`. Because they are small, you can plug them together like pipes.

```go
type Reader interface { Read(p []byte) (n int, err error) }
type Writer interface { Write(p []byte) (n int, err error) }
```

```go
package main

import (
	"compress/gzip"
	"io"
	"os"
	"strings"
)

func main() {
	src := strings.NewReader("hello hello hello hello") // a Reader
	dst, _ := os.Create("out.gz")                        // a Writer
	defer dst.Close()

	gz := gzip.NewWriter(dst) // wraps a Writer, is itself a Writer
	defer gz.Close()

	io.Copy(gz, src) // streams chunk by chunk, low memory
}
```

```mermaid
flowchart LR
    A["strings.Reader"] -->|io.Copy| B["gzip.Writer"] --> C["os.File"]
```

**Helpers worth knowing**
- `io.Copy`, `io.ReadAll`, `io.TeeReader` (copy while reading), `io.MultiWriter` (write to many places), `io.LimitReader` (protect from huge bodies), `io.Pipe`.
- `bufio.Reader/Scanner/Writer` add buffering and line reading.

**Design lesson:** accept `io.Reader`/`io.Writer` in your functions instead of file names. Your code becomes easy to test (use `strings.NewReader` or `bytes.Buffer`) and works with any source.

**Gotcha:** `Read` may return `n > 0` **and** `io.EOF` together. Process the bytes first, then check the error. Always `Close` response bodies.

_Module: Interfaces & Generics · Tags: io, interfaces_

### 77. How do you work with time in Go (`time.Duration`, formatting, time zones, timers)?

**Short answer:** Use `time.Time` for moments and `time.Duration` for lengths of time. Go formats dates with a **reference time**: `Mon Jan 2 15:04:05 MST 2006` (that is 01/02 03:04:05PM '06 -0700). You write the layout using those exact numbers.

```go
package main

import (
	"fmt"
	"time"
)

func main() {
	timeout := 2 * time.Second // Duration: multiply a constant, never a bare int
	fmt.Println(timeout, timeout.Milliseconds()) // 2s 2000

	t := time.Date(2025, time.March, 9, 14, 30, 0, 0, time.UTC)
	fmt.Println(t.Format("2006-01-02 15:04"))      // 2025-03-09 14:30
	fmt.Println(t.Format(time.RFC3339))            // 2025-03-09T14:30:00Z

	parsed, err := time.Parse("2006-01-02", "2025-12-25")
	fmt.Println(parsed.Weekday(), err) // Thursday <nil>

	ist, _ := time.LoadLocation("Asia/Kolkata")
	fmt.Println(t.In(ist).Format(time.RFC3339)) // 2025-03-09T20:00:00+05:30

	fmt.Println(t.Add(48 * time.Hour).Sub(t)) // 48h0m0s
}
```

**Tips**
- Store and send times in **UTC**, convert to local only for display.
- Compare with `t.Before(u)`, `t.After(u)`, `t.Equal(u)`, not `==` (it also compares location and monotonic clock).
- `time.Since(start)` measures elapsed time using the monotonic clock, which is immune to clock changes.
- Use `time.NewTimer`/`NewTicker` and always `Stop()` them. Prefer them over `time.After` inside loops.
- In tests, inject a clock (`func() time.Time`) so you can control time.

_Module: Standard Library & Data · Tags: time, stdlib_

### 78. How does JSON encoding and decoding work (`encoding/json`, struct tags)?

**Short answer:** `json.Marshal` turns a Go value into JSON bytes and `json.Unmarshal` does the reverse. Go uses **struct tags** to control field names and options. Only **exported** fields are included.

```go
package main

import (
	"encoding/json"
	"fmt"
	"strings"
)

type User struct {
	ID       int      `json:"id"`
	Name     string   `json:"name"`
	Email    string   `json:"email,omitempty"` // skipped when empty
	Password string   `json:"-"`               // never encoded
	Nickname *string  `json:"nickname"`        // null if nil
	Tags     []string `json:"tags"`
}

func main() {
	u := User{ID: 1, Name: "Anu", Password: "secret"}
	b, _ := json.Marshal(u)
	fmt.Println(string(b))
	// {"id":1,"name":"Anu","nickname":null,"tags":null}

	var in User
	err := json.NewDecoder(strings.NewReader(`{"id":7,"name":"Ria","extra":1}`)).Decode(&in)
	fmt.Println(in.ID, in.Name, err) // 7 Ria <nil>  (unknown fields ignored)
}
```

**Good practices**
- For HTTP use `json.NewDecoder(r.Body).Decode(&v)`. Add `dec.DisallowUnknownFields()` for strict APIs and limit the body with `http.MaxBytesReader`.
- A `nil` slice encodes as `null`, an empty slice as `[]`. Initialise slices if the client expects `[]`.
- Use pointers or `omitempty` to tell "missing" from "zero" (`0`, `false`, `""`).
- Numbers decoded into `interface{}` become `float64`. Use `json.Number` or typed structs for big ints.
- Implement `MarshalJSON`/`UnmarshalJSON` for custom formats (for example enums as strings).
- `encoding/json` uses reflection and is slowish. For hot paths consider generated encoders, but measure first.

_Module: Standard Library & Data · Tags: json, stdlib_

### 79. Why can't you assign to a struct field inside a map, and what are the copy semantics of structs, slices and maps?

**Short answer:** Map values are not *addressable*. When you read `m[k]` you get a **copy**, so changing a field on the copy would be useless, and Go refuses to compile it. Store pointers in the map, or copy, modify, and write back.

```go
package main

import "fmt"

type Item struct{ Qty int }

func main() {
	items := map[string]Item{"pen": {Qty: 1}}
	// items["pen"].Qty = 5 // ❌ compile error: cannot assign to struct field

	it := items["pen"] // copy out
	it.Qty = 5
	items["pen"] = it // ✅ write back
	fmt.Println(items) // map[pen:{5}]

	ptrs := map[string]*Item{"pen": {Qty: 1}}
	ptrs["pen"].Qty = 5 // ✅ pointer: modifies the same Item
	fmt.Println(ptrs["pen"].Qty) // 5
}
```

**What is copied when passing to a function?**

| Type | What is copied | Effect |
| --- | --- | --- |
| `int`, `string`, `bool` | the value | caller unaffected |
| struct | whole struct (all fields) | caller unaffected (but nested slices/maps/pointers still share) |
| array | whole array | caller unaffected |
| slice | the 3-word header | **shares** elements; `append` may not be seen by the caller |
| map | pointer to the map | **shares** the same map |
| channel, pointer, func | the reference | shares |

```go
func addItem(s []int)       { s = append(s, 1) } // caller's len unchanged
func addItemPtr(s *[]int)   { *s = append(*s, 1) }
func setKey(m map[string]int) { m["a"] = 1 }      // caller sees this
```

**Gotcha:** "shallow copy": copying a struct that holds a slice copies only the slice header. Both structs then see the same elements.

_Module: Types & Data Structures · Tags: maps, structs, gotchas_

### 80. How do you write table-driven tests in Go?

**Short answer:** You put all test cases in a slice of structs (a "table") and loop over them, running each as a subtest. Adding a case is one new line, and failures show exactly which case broke.

```go
// price.go
package price

func Discount(total float64, member bool) float64 {
	switch {
	case member && total >= 100:
		return total * 0.8
	case member:
		return total * 0.9
	default:
		return total
	}
}
```

```go
// price_test.go
package price

import "testing"

func TestDiscount(t *testing.T) {
	tests := []struct {
		name   string
		total  float64
		member bool
		want   float64
	}{
		{"guest pays full", 50, false, 50},
		{"member small order", 50, true, 45},
		{"member big order", 200, true, 160},
		{"boundary at 100", 100, true, 80},
	}

	for _, tc := range tests {
		t.Run(tc.name, func(t *testing.T) {
			got := Discount(tc.total, tc.member)
			if got != tc.want {
				t.Errorf("Discount(%v, %v) = %v, want %v", tc.total, tc.member, got, tc.want)
			}
		})
	}
}
```

```bash
go test ./...                       # run all
go test -run TestDiscount/boundary  # run one case
go test -v -cover -race ./...
```

**Rules of thumb**
- Test file ends with `_test.go`; test functions are `TestXxx(t *testing.T)`.
- Use `t.Errorf` to continue after a failure, `t.Fatalf` to stop that test.
- Name cases like sentences. Include **edge cases**: empty input, zero, boundaries, errors.
- Print got **and** want in the message.
- Compare complex values with `reflect.DeepEqual` or `github.com/google/go-cmp/cmp` (shows a readable diff).

_Module: Testing · Tags: testing_

### 81. How do subtests, `t.Parallel`, `t.Helper`, `t.Cleanup` and `TestMain` work?

**Short answer:** They are the tools that make tests organised, fast and tidy.

| Tool | What it gives you |
| --- | --- |
| `t.Run(name, fn)` | A named subtest; run or filter it with `-run` |
| `t.Parallel()` | Run this test at the same time as other parallel tests |
| `t.Helper()` | Marks a helper so failures point at the *caller's* line |
| `t.Cleanup(fn)` | Runs `fn` when the test ends (like `defer`, but works with subtests/helpers) |
| `t.TempDir()` | A temp folder that is deleted automatically |
| `t.Setenv(k, v)` | Sets an env var for this test only |
| `TestMain(m)` | One-time setup/teardown for the whole package |

```go
package store

import (
	"os"
	"testing"
)

func newTestStore(t *testing.T) *Store {
	t.Helper() // errors are reported where newTestStore was called
	s, err := Open(t.TempDir() + "/db")
	if err != nil {
		t.Fatalf("open: %v", err)
	}
	t.Cleanup(func() { s.Close() })
	return s
}

func TestStore(t *testing.T) {
	for _, name := range []string{"alpha", "beta"} {
		t.Run(name, func(t *testing.T) {
			t.Parallel() // Go 1.22+: loop variable is safe here
			s := newTestStore(t)
			_ = s
		})
	}
}

func TestMain(m *testing.M) {
	// start a shared resource once, e.g. a test container
	code := m.Run()
	os.Exit(code)
}
```

**Gotchas**
- Before Go 1.22, parallel subtests in a loop needed `tc := tc` to copy the loop variable.
- Parallel tests must not share mutable state without locks. Use `-race`.
- Keep unit tests fast and independent. Put slow integration tests behind a build tag or `testing.Short()`.

_Module: Testing · Tags: testing_

### 82. How do you mock dependencies and test HTTP handlers in Go?

**Short answer:** Depend on a small **interface**, then pass a hand-written fake in tests. For HTTP handlers use `net/http/httptest`, which lets you call a handler without starting a real server.

```go
package orders

import (
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"testing"
)

// consumer-side interface: only what the handler needs
type Store interface {
	Get(id string) (string, error)
}

type fakeStore struct{ data map[string]string }

func (f fakeStore) Get(id string) (string, error) {
	v, ok := f.data[id]
	if !ok {
		return "", http.ErrMissingFile // any error
	}
	return v, nil
}

func Handler(s Store) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		v, err := s.Get(r.PathValue("id"))
		if err != nil {
			http.Error(w, "not found", http.StatusNotFound)
			return
		}
		json.NewEncoder(w).Encode(map[string]string{"order": v})
	}
}

func TestHandler(t *testing.T) {
	mux := http.NewServeMux()
	mux.Handle("GET /orders/{id}", Handler(fakeStore{data: map[string]string{"1": "book"}}))

	req := httptest.NewRequest("GET", "/orders/1", nil)
	rec := httptest.NewRecorder()
	mux.ServeHTTP(rec, req)

	if rec.Code != http.StatusOK {
		t.Fatalf("status = %d", rec.Code)
	}
}
```

**Options for mocks**
- **Hand-written fakes**: simplest and very readable. Start here.
- **Generated mocks** (`gomock`/`mockery`) when interfaces are big and you want call assertions.
- `testify/assert` and `require` for shorter assertions (optional).
- `httptest.NewServer` to fake an *external* HTTP API your code calls.
- Real dependencies via **testcontainers** for integration tests (Postgres, Redis, Kafka).

**Design hint:** if mocking is painful, the code probably has too many dependencies or too-large interfaces.

_Module: Testing · Tags: testing, mocking, http_

### 83. How do you write benchmarks and read the results?

**Short answer:** Write a function `BenchmarkXxx(b *testing.B)` that runs the code `b.N` times. Go increases `N` until the timing is stable and reports nanoseconds per operation. Add `-benchmem` to see memory allocations.

```go
package concat

import (
	"strings"
	"testing"
)

func joinPlus(parts []string) string {
	s := ""
	for _, p := range parts {
		s += p // new string every time
	}
	return s
}

func joinBuilder(parts []string) string {
	var b strings.Builder
	for _, p := range parts {
		b.WriteString(p)
	}
	return b.String()
}

var parts = strings.Split(strings.Repeat("go,", 200), ",")

func BenchmarkPlus(b *testing.B) {
	for i := 0; i < b.N; i++ {
		joinPlus(parts)
	}
}

func BenchmarkBuilder(b *testing.B) {
	for i := 0; i < b.N; i++ {
		joinBuilder(parts)
	}
}
```

```bash
go test -bench=. -benchmem
# BenchmarkPlus-8     12000   98000 ns/op   110000 B/op   200 allocs/op
# BenchmarkBuilder-8 300000    4000 ns/op     1500 B/op     8 allocs/op
```

**Reading it:** `ns/op` is time per call, `B/op` bytes allocated per call, `allocs/op` number of allocations. Fewer allocations usually means less GC pressure.

**Tips**
- Use `b.ResetTimer()` after expensive setup; `b.ReportAllocs()` to always show allocations.
- Save the result of the call to a package variable so the compiler cannot remove the code.
- Run several times and compare with `benchstat` before and after your change.
- Benchmark on a quiet machine. Close other apps.
- **Measure before optimising.** Use `pprof` to find the real hot spots.

_Module: Testing · Tags: testing, performance, benchmark_

### 84. What is fuzz testing in Go (1.18+) and when is it useful?

**Short answer:** Fuzzing feeds your function many automatically generated, random-ish inputs to find crashes and wrong behaviour you did not think of. Go's fuzzer is built in and remembers inputs that failed.

```go
package parse

import (
	"strconv"
	"testing"
)

// Property: formatting a number and parsing it again gives the same number.
func FuzzRoundTrip(f *testing.F) {
	f.Add(int64(0)) // seed corpus: starting examples
	f.Add(int64(-42))
	f.Add(int64(1 << 40))

	f.Fuzz(func(t *testing.T, n int64) {
		s := strconv.FormatInt(n, 10)
		got, err := strconv.ParseInt(s, 10, 64)
		if err != nil || got != n {
			t.Fatalf("round trip failed for %d: got %d err %v", n, got, err)
		}
	})
}
```

```bash
go test -fuzz=FuzzRoundTrip -fuzztime=30s
```

When it finds a failure, it saves the input to `testdata/fuzz/FuzzRoundTrip/...`. From then on a normal `go test` replays it as a regression test. Commit that file.

**Best targets**
- Parsers and decoders (JSON/protobuf/custom formats).
- Anything handling untrusted input: validators, URL/path sanitising.
- Round-trip properties (encode then decode).

**Not good for:** code with heavy I/O or slow runtime. Keep each fuzz run fast and deterministic.

_Module: Testing · Tags: testing, fuzzing_

### 85. How do you build an HTTP server with only the standard library (Go 1.22 routing)?

**Short answer:** `net/http` is production-ready. Since Go 1.22 the built-in `ServeMux` supports methods and path parameters, so many services do not need a router library.

```go
package main

import (
	"encoding/json"
	"log"
	"net/http"
	"time"
)

type Order struct {
	ID   string `json:"id"`
	Item string `json:"item"`
}

func getOrder(w http.ResponseWriter, r *http.Request) {
	id := r.PathValue("id") // from the {id} pattern
	writeJSON(w, http.StatusOK, Order{ID: id, Item: "book"})
}

func createOrder(w http.ResponseWriter, r *http.Request) {
	var o Order
	if err := json.NewDecoder(http.MaxBytesReader(w, r.Body, 1<<20)).Decode(&o); err != nil {
		http.Error(w, "bad json", http.StatusBadRequest)
		return
	}
	writeJSON(w, http.StatusCreated, o)
}

func writeJSON(w http.ResponseWriter, code int, v any) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(code)
	json.NewEncoder(w).Encode(v)
}

func main() {
	mux := http.NewServeMux()
	mux.HandleFunc("GET /orders/{id}", getOrder)
	mux.HandleFunc("POST /orders", createOrder)

	srv := &http.Server{
		Addr:              ":8080",
		Handler:           mux,
		ReadHeaderTimeout: 5 * time.Second, // ✅ never use the zero-timeout default
		ReadTimeout:       10 * time.Second,
		WriteTimeout:      10 * time.Second,
		IdleTimeout:       60 * time.Second,
	}
	log.Fatal(srv.ListenAndServe())
}
```

**Key points**
- Handlers have the signature `func(w http.ResponseWriter, r *http.Request)`. A `Handler` is any type with `ServeHTTP`.
- **Set server timeouts**. The defaults have none, which lets slow clients hold connections open forever (Slowloris).
- Write headers *before* the body; the first `Write` sends status `200` if you did not set one.
- Each request runs in its own goroutine, so shared state in handlers needs synchronisation.
- Use `r.Context()` so work stops when the client disconnects.

**When to add a router:** chi or gin if you want route groups, middleware stacks, or a bigger ecosystem. For simple services, std lib is enough.

_Module: HTTP & Microservices · Tags: http, net/http_

### 86. What is middleware in Go HTTP and how do you write it?

**Short answer:** Middleware is a function that wraps an `http.Handler` and returns a new one. It runs code before and/or after the real handler: logging, auth, recovery, request IDs, metrics, CORS.

```mermaid
flowchart LR
    R["request"] --> L["Logging"] --> A["Auth"] --> Rec["Recover"] --> H["Handler"]
    H --> Rec --> A --> L --> S["response"]
```

```go
package main

import (
	"log"
	"net/http"
	"time"
)

type Middleware func(http.Handler) http.Handler

func Logging(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		start := time.Now()
		next.ServeHTTP(w, r) // call the next handler
		log.Printf("%s %s took %v", r.Method, r.URL.Path, time.Since(start))
	})
}

func Recover(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		defer func() {
			if rec := recover(); rec != nil {
				log.Printf("panic: %v", rec)
				http.Error(w, "internal error", http.StatusInternalServerError)
			}
		}()
		next.ServeHTTP(w, r)
	})
}

func APIKey(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		if r.Header.Get("X-API-Key") != "secret" {
			http.Error(w, "unauthorized", http.StatusUnauthorized)
			return // do NOT call next
		}
		next.ServeHTTP(w, r)
	})
}

// Chain applies middleware so the first listed runs outermost.
func Chain(h http.Handler, m ...Middleware) http.Handler {
	for i := len(m) - 1; i >= 0; i-- {
		h = m[i](h)
	}
	return h
}

func main() {
	mux := http.NewServeMux()
	mux.HandleFunc("GET /ping", func(w http.ResponseWriter, r *http.Request) { w.Write([]byte("pong")) })
	log.Fatal(http.ListenAndServe(":8080", Chain(mux, Logging, Recover, APIKey)))
}
```

**Tips**
- Pass request-scoped data (user id, trace id) to later handlers with `r = r.WithContext(context.WithValue(...))`.
- To record the status code in logging, wrap `http.ResponseWriter` in your own struct.
- Order matters: put `Recover` near the outside so it catches panics from everything inside.

_Module: HTTP & Microservices · Tags: http, middleware, patterns_

### 87. How should you configure the Go HTTP client (timeouts, reuse, closing bodies)?

**Short answer:** Create **one shared** `http.Client` with a timeout and reuse it. The default client has **no timeout**, so a slow server can hang your goroutine forever. Always close the response body and read it fully so the connection can be reused.

```go
package main

import (
	"context"
	"fmt"
	"io"
	"net"
	"net/http"
	"time"
)

var client = &http.Client{
	Timeout: 10 * time.Second, // whole request, including reading the body
	Transport: &http.Transport{
		DialContext:           (&net.Dialer{Timeout: 3 * time.Second}).DialContext,
		TLSHandshakeTimeout:   3 * time.Second,
		MaxIdleConns:          100,
		MaxIdleConnsPerHost:   20, // default is only 2!
		IdleConnTimeout:       90 * time.Second,
		ResponseHeaderTimeout: 5 * time.Second,
	},
}

func get(ctx context.Context, url string) ([]byte, error) {
	req, err := http.NewRequestWithContext(ctx, http.MethodGet, url, nil)
	if err != nil {
		return nil, err
	}
	resp, err := client.Do(req)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close() // ✅ always close

	if resp.StatusCode != http.StatusOK { // non-2xx is NOT an error by default
		return nil, fmt.Errorf("unexpected status %s", resp.Status)
	}
	return io.ReadAll(io.LimitReader(resp.Body, 1<<20)) // cap the size
}

func main() {
	b, err := get(context.Background(), "https://example.com")
	fmt.Println(len(b), err)
}
```

**Why it matters**
- Creating a new client or transport per request loses connection reuse, causing slow TLS handshakes and exhausted ports.
- A forgotten `Body.Close()` leaks connections and goroutines.
- `MaxIdleConnsPerHost` defaults to 2. If you call one service heavily, raise it.

**Production add-ons:** retries with backoff for idempotent calls, a circuit breaker, tracing headers, and a context deadline from the incoming request.

_Module: HTTP & Microservices · Tags: http, client, production_

### 88. How do you implement graceful shutdown of a Go service?

**Short answer:** Listen for `SIGINT`/`SIGTERM`, stop accepting new requests, give in-flight requests time to finish (`srv.Shutdown(ctx)`), then close other resources (DB, queues) and exit. This is essential on Kubernetes, where pods get `SIGTERM` during every deploy.

```mermaid
sequenceDiagram
    participant K as Kubernetes
    participant S as Go service
    K->>S: SIGTERM
    S->>S: readiness fails (stop new traffic)
    S->>S: srv.Shutdown(ctx) waits for in-flight requests
    S->>S: close DB / flush logs / stop workers
    S-->>K: exit 0
    Note over K,S: if not done in terminationGracePeriodSeconds, SIGKILL
```

```go
package main

import (
	"context"
	"errors"
	"log"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"
)

func main() {
	srv := &http.Server{Addr: ":8080", Handler: http.DefaultServeMux}

	// ctx is cancelled when SIGINT/SIGTERM arrives
	ctx, stop := signal.NotifyContext(context.Background(), os.Interrupt, syscall.SIGTERM)
	defer stop()

	go func() {
		if err := srv.ListenAndServe(); err != nil && !errors.Is(err, http.ErrServerClosed) {
			log.Fatalf("listen: %v", err)
		}
	}()

	<-ctx.Done() // wait for the signal
	log.Println("shutting down...")

	shutdownCtx, cancel := context.WithTimeout(context.Background(), 20*time.Second)
	defer cancel()
	if err := srv.Shutdown(shutdownCtx); err != nil {
		log.Printf("forced shutdown: %v", err)
	}
	// close DB, flush telemetry, stop background workers here
}
```

**Kubernetes tips**
- Keep `terminationGracePeriodSeconds` (default 30s) longer than your shutdown timeout.
- Pods are removed from Service endpoints while they receive SIGTERM, but this is asynchronous. A short `preStop` sleep (a few seconds) avoids dropped requests.
- Make background workers watch the same context so they stop too.
- `ErrServerClosed` is the *normal* result of `Shutdown`, not a failure.

_Module: HTTP & Microservices · Tags: shutdown, kubernetes, production_

### 89. How does `database/sql` work, and how do you tune the connection pool?

**Short answer:** `sql.DB` is **not** a single connection. It is a thread-safe **pool** of connections. You create it once, share it, and use the `...Context` methods so queries can be cancelled. You do not close it per query.

```go
package main

import (
	"context"
	"database/sql"
	"fmt"
	"time"

	_ "github.com/jackc/pgx/v5/stdlib" // registers the "pgx" driver
)

type User struct {
	ID    int
	Email string
}

func main() {
	db, err := sql.Open("pgx", "postgres://user:pass@localhost:5432/app")
	if err != nil {
		panic(err)
	}
	defer db.Close()

	// pool tuning
	db.SetMaxOpenConns(20)                  // hard cap on connections
	db.SetMaxIdleConns(10)                  // kept ready for reuse
	db.SetConnMaxLifetime(30 * time.Minute) // recycle (helps with load balancers / failover)
	db.SetConnMaxIdleTime(5 * time.Minute)

	ctx, cancel := context.WithTimeout(context.Background(), 2*time.Second)
	defer cancel()

	var u User
	err = db.QueryRowContext(ctx, "SELECT id, email FROM users WHERE id = $1", 1).
		Scan(&u.ID, &u.Email) // $1 is a parameter: safe from SQL injection
	if err == sql.ErrNoRows {
		fmt.Println("not found")
		return
	}
	fmt.Println(u, err)
}
```

**Rules**
- **Always use placeholders** (`$1`, `?`). Never build SQL with `fmt.Sprintf` from user input.
- `Query` returns `*Rows`. **Close it** (`defer rows.Close()`) and check `rows.Err()` after the loop, otherwise you leak a connection.
- `sql.ErrNoRows` is returned by `QueryRow().Scan` when nothing matches.
- Handle `NULL` with `sql.NullString` or pointers.
- Total connections across all pods must stay below the database limit. 20 pods x 20 conns = 400 connections to PostgreSQL. Use PgBouncer or lower the numbers.

_Module: Standard Library & Data · Tags: database, sql, production_

### 90. How do you use transactions correctly in Go?

**Short answer:** Start a transaction with `BeginTx`, do your queries through the `tx` object, then `Commit`. Use `defer tx.Rollback()` right after beginning. After a successful commit the rollback does nothing, and on any early return it cleans up.

```go
package main

import (
	"context"
	"database/sql"
	"fmt"
)

func transfer(ctx context.Context, db *sql.DB, from, to int, amount int) error {
	tx, err := db.BeginTx(ctx, &sql.TxOptions{Isolation: sql.LevelReadCommitted})
	if err != nil {
		return err
	}
	defer tx.Rollback() // safe no-op after Commit

	res, err := tx.ExecContext(ctx,
		"UPDATE accounts SET balance = balance - $1 WHERE id = $2 AND balance >= $1", amount, from)
	if err != nil {
		return fmt.Errorf("debit: %w", err)
	}
	if n, _ := res.RowsAffected(); n == 0 {
		return fmt.Errorf("insufficient funds")
	}

	if _, err := tx.ExecContext(ctx,
		"UPDATE accounts SET balance = balance + $1 WHERE id = $2", amount, to); err != nil {
		return fmt.Errorf("credit: %w", err)
	}
	return tx.Commit()
}
```

**Common mistakes**
1. Using `db.Exec` inside a transaction instead of `tx.Exec`. That runs *outside* the transaction on another connection.
2. Forgetting to rollback on error paths, which holds a connection and locks.
3. Long transactions that include network calls. They hold locks and starve the pool.
4. Not handling serialization failures or deadlocks: retry the whole transaction.

**Pattern: `withTx` helper**

```go
func withTx(ctx context.Context, db *sql.DB, fn func(*sql.Tx) error) error {
	tx, err := db.BeginTx(ctx, nil)
	if err != nil {
		return err
	}
	defer tx.Rollback()
	if err := fn(tx); err != nil {
		return err
	}
	return tx.Commit()
}
```

_Module: Standard Library & Data · Tags: database, transactions_

### 91. `database/sql` vs pgx vs sqlx vs sqlc vs GORM: how do you choose?

**Short answer:** They sit on a spectrum from "write SQL yourself" to "let the library write SQL". For most Go services, plain SQL with `pgx` or `sqlc` gives the best clarity and performance.

| Tool | Style | Good for | Watch out |
| --- | --- | --- | --- |
| `database/sql` | Raw SQL, manual `Scan` | Standard, portable, no magic | Repetitive scanning code |
| `pgx` | Raw SQL, PostgreSQL-native | Fast, rich Postgres types, `COPY`, batches | Postgres-only (if you use the native API) |
| `sqlx` | Raw SQL + struct scanning | Less boilerplate, still plain SQL | Runtime mapping errors |
| `sqlc` | You write SQL, it **generates** type-safe Go | Compile-time safety, no reflection | Needs a schema and a build step |
| GORM (ORM) | Methods build queries | Fast CRUD prototyping, migrations | Hidden queries, N+1, hard to tune |

**Example: sqlc**

```sql
-- name: GetUser :one
SELECT id, email FROM users WHERE id = $1;
```

```go
// generated code; you just call it
user, err := queries.GetUser(ctx, 42)
```

**How to decide**
- Team knows SQL and wants predictable performance: `sqlc` or `pgx`.
- Many simple CRUD tables, fast delivery: GORM can be fine. Log the generated SQL and watch for N+1.
- Whatever you pick: use **migrations** (`golang-migrate`, `goose`, `atlas`), keep them in git, and run them in CI/CD, not inside random app startup code.

**Interview tip:** explain a real trade-off, for example "an ORM hid an N+1 query that we found in Datadog traces, so for hot paths we use explicit SQL".

_Module: Standard Library & Data · Tags: database, orm, design_

### 92. How do you structure a Go project? (`cmd`, `internal`, `pkg` and layered design)

**Short answer:** There is no official layout. Start simple and grow. A common, healthy structure separates *entry points* from *business logic* and hides internals.

```text
orders-service/
├── go.mod
├── cmd/
│   └── orders-api/
│       └── main.go          # wires everything, starts the server
├── internal/                # cannot be imported by other modules
│   ├── order/               # domain: types + business rules
│   │   ├── order.go
│   │   └── service.go
│   ├── httpapi/             # handlers, routing, middleware
│   ├── storage/             # DB implementation of interfaces
│   └── config/
├── migrations/
└── Dockerfile
```

```mermaid
flowchart LR
    H["httpapi (handlers)"] --> S["order (service / business rules)"]
    S --> I{{"Store interface"}}
    P["storage (Postgres)"] -. implements .-> I
    M["cmd/main.go"] --> H
    M --> P
```

Dependencies point **inward**: handlers depend on the service; the service depends on an interface; the storage package implements it. `main` is the only place that knows all the pieces.

**Guidelines**
- Package by **responsibility**, not by type. Avoid `models/`, `controllers/`, `utils/`.
- Name packages short and lowercase, with no underscores. `order.Service` reads better than `orderservice.OrderService`.
- Avoid import cycles by keeping interfaces where they are *used*.
- `pkg/` is optional and debated. Use it only if you really want to expose a library to other modules.
- Do not create 20 folders on day one. Split when a package grows or has a clear boundary.

_Module: Design & Patterns · Tags: design, project-layout_

### 93. How do you do dependency injection in Go without a framework?

**Short answer:** Pass dependencies in through **constructors** (as interfaces or concrete types) and wire everything together in `main`. No magic, no reflection. Tools like Wire (compile-time codegen) or Fx exist but are optional.

```go
package main

import "fmt"

// --- ports (interfaces owned by the consumer) ---
type OrderStore interface{ Save(id string) error }
type Notifier interface{ Send(msg string) error }

// --- business service ---
type OrderService struct {
	store    OrderStore
	notifier Notifier
}

func NewOrderService(s OrderStore, n Notifier) *OrderService {
	return &OrderService{store: s, notifier: n}
}

func (o *OrderService) Place(id string) error {
	if err := o.store.Save(id); err != nil {
		return fmt.Errorf("save: %w", err)
	}
	return o.notifier.Send("order " + id + " placed")
}

// --- adapters ---
type memStore struct{}

func (memStore) Save(id string) error { fmt.Println("saved", id); return nil }

type logNotifier struct{}

func (logNotifier) Send(m string) error { fmt.Println("notify:", m); return nil }

// --- composition root ---
func main() {
	svc := NewOrderService(memStore{}, logNotifier{})
	_ = svc.Place("A-1")
}
```

**Why it is good**
- Tests pass fakes (`NewOrderService(fakeStore{}, fakeNotifier{})`).
- Dependencies are visible in the constructor signature.
- Swap implementations (in-memory, Postgres, Kafka) without touching business code.

**Anti-patterns**
- Global variables and `init()` that set up DB connections.
- Passing a giant "App" struct that contains everything everywhere (a service locator).
- Interfaces with 15 methods. Keep them small and local.

_Module: Design & Patterns · Tags: design, di_

### 94. How do you handle configuration and secrets in a Go service?

**Short answer:** Follow the **12-factor** idea: read configuration from environment variables (or a mounted file), validate it at startup, and fail fast if something is missing. Never hard-code secrets or commit them.

```go
package main

import (
	"fmt"
	"os"
	"strconv"
	"time"
)

type Config struct {
	Port        int
	DatabaseURL string
	Timeout     time.Duration
}

func mustEnv(key string) string {
	v := os.Getenv(key)
	if v == "" {
		fmt.Fprintf(os.Stderr, "missing env var %s\n", key)
		os.Exit(1) // fail fast at startup
	}
	return v
}

func envInt(key string, def int) int {
	if v, err := strconv.Atoi(os.Getenv(key)); err == nil {
		return v
	}
	return def
}

func Load() Config {
	return Config{
		Port:        envInt("PORT", 8080),
		DatabaseURL: mustEnv("DATABASE_URL"),
		Timeout:     5 * time.Second,
	}
}

func main() {
	os.Setenv("DATABASE_URL", "postgres://localhost/app") // demo only
	fmt.Printf("%+v\n", Load())
}
```

**Libraries:** `kelseyhightower/envconfig`, `caarlos0/env`, `spf13/viper` (files + env + flags; heavier).

**In Kubernetes**
- Non-secret config: `ConfigMap` as env vars or mounted files.
- Secrets: `Secret` objects, or better, Azure Key Vault / external-secrets / CSI driver.
- To support **hot reload** of a mounted file, watch it and swap an `atomic.Pointer[Config]`.

**Rules:** validate (ports, URLs, durations) in one place; never log secrets; keep a single `Config` struct passed explicitly rather than reading env vars all over the code.

_Module: Tooling & Delivery · Tags: config, production_

### 95. How does structured logging with `log/slog` (Go 1.21+) work?

**Short answer:** `slog` is the standard structured logger. Instead of a free text sentence it writes a message plus **key-value pairs**, usually as JSON, which tools like Datadog can search and filter.

```go
package main

import (
	"context"
	"log/slog"
	"os"
)

func main() {
	logger := slog.New(slog.NewJSONHandler(os.Stdout, &slog.HandlerOptions{
		Level: slog.LevelInfo,
	}))
	slog.SetDefault(logger)

	slog.Info("order placed", "order_id", "A-1", "amount", 499)
	// {"time":"...","level":"INFO","msg":"order placed","order_id":"A-1","amount":499}

	// attach fields once, reuse
	reqLog := logger.With("request_id", "r-123", "user", 42)
	reqLog.Warn("slow query", "ms", 1800)

	// group related fields
	slog.Error("payment failed",
		slog.Group("payment", slog.String("provider", "razorpay"), slog.Int("attempt", 3)),
		"err", os.ErrDeadlineExceeded)

	slog.InfoContext(context.Background(), "with context") // handlers can read ctx values (trace ids)
}
```

**Good practices**
- Use levels meaningfully: `Debug` (dev detail), `Info` (business events), `Warn` (recoverable), `Error` (needs attention).
- Include `request_id`/`trace_id` in every request log. Pass a logger via context or attach through middleware.
- Log an error **once**, at the layer that handles it. Do not log and return.
- **Never log** passwords, tokens, or personal data.
- Logs go to **stdout** in containers; the platform collects them.
- Before 1.21 teams used `zap` or `zerolog`. They are still faster in extreme cases, but `slog` is enough for most.

_Module: Observability & Operations · Tags: logging, observability, go-1.21_

### 96. How do Go modules handle versions, `replace`, `vendor`, workspaces and major versions?

**Short answer:** Go uses **semantic versioning** with *minimal version selection*: it picks the **lowest** version that satisfies all requirements, which makes builds predictable. Major versions v2 and above appear in the import path.

```text
require github.com/redis/go-redis/v9 v9.5.1
                                  ^^ major version is part of the path (v2+)
```

| Feature | Use |
| --- | --- |
| `go get pkg@v1.4.0` | Pin or upgrade a version |
| `go get -u ./...` | Upgrade dependencies |
| `go mod tidy` | Add missing, drop unused |
| `go mod why pkg` | Why is this dependency here? |
| `go list -m -u all` | Show available updates |
| `replace` directive | Use a local folder or a fork while developing |
| `go mod vendor` | Copy deps into `vendor/` for offline/hermetic builds |
| `go.work` workspace | Develop several modules together without editing `go.mod` |
| `GOPRIVATE=gitlab.com/acme/*` | Do not use the public proxy/checksum DB for private repos |

```go
// go.mod: temporary local override
replace github.com/acme/shared => ../shared
```

**Private modules in GitLab CI:** set `GOPRIVATE`, and give the job access with a token in `~/.netrc` or `git config url."https://oauth2:$TOKEN@gitlab.com/".insteadOf`.

**Good habits**
- Commit `go.mod` and `go.sum`.
- Don't leave `replace` to local paths in committed code.
- Run `govulncheck ./...` in CI to find known vulnerable dependencies.
- Releasing a breaking change means a new major version path (`/v2`).

_Module: Tooling & Delivery · Tags: modules, tooling_

### 97. How do you cross-compile Go and use build tags and `-ldflags`?

**Short answer:** Go cross-compiles by setting `GOOS` and `GOARCH`. No extra toolchain is needed (unless you use cgo). Build tags include or exclude files for different platforms or purposes. `-ldflags -X` injects values such as the version at build time.

```bash
# Linux binary from a Mac, for ARM64 servers
GOOS=linux GOARCH=arm64 go build -o app-linux-arm64 ./cmd/orders-api

# Small, static binary with version info
CGO_ENABLED=0 go build -trimpath \
  -ldflags="-s -w -X main.version=1.4.2 -X main.commit=$(git rev-parse --short HEAD)" \
  -o app ./cmd/orders-api
```

```go
package main

import "fmt"

var (
	version = "dev" // overwritten by -ldflags
	commit  = "none"
)

func main() { fmt.Println("version", version, "commit", commit) }
```

**Build tags**

```go
//go:build integration

package store_test // only compiled with: go test -tags=integration ./...
```

```go
//go:build linux
// file only builds on Linux; also file names like store_windows.go are automatic
```

**Flags explained**
- `CGO_ENABLED=0` -> pure Go, fully static, works in `scratch`/`distroless` images.
- `-s -w` strip debug info for a smaller binary.
- `-trimpath` removes local paths for reproducible builds.

**Use cases:** one CI job builds for many platforms; separate slow integration tests from unit tests; show `--version` in the CLI and in logs for easy debugging.

_Module: Tooling & Delivery · Tags: build, tooling_

### 98. How do you build a small, secure Docker image for a Go service?

**Short answer:** Use a **multi-stage build**: compile in a full Go image, then copy just the binary into a tiny runtime image. The result is often 10-30 MB, starts instantly, and has a minimal attack surface.

```dockerfile
# ---- build stage ----
FROM golang:1.22 AS build
WORKDIR /src

# 1. copy go.mod/go.sum first so dependency download is cached
COPY go.mod go.sum ./
RUN go mod download

# 2. copy the rest and build a static binary
COPY . .
RUN CGO_ENABLED=0 GOOS=linux go build -trimpath -ldflags="-s -w" -o /out/app ./cmd/orders-api

# ---- runtime stage ----
FROM gcr.io/distroless/static-debian12:nonroot
COPY --from=build /out/app /app
EXPOSE 8080
USER nonroot:nonroot
ENTRYPOINT ["/app"]
```

```mermaid
flowchart LR
    A["golang:1.22 (about 800 MB)<br/>compile"] -->|copy binary only| B["distroless static (about 2 MB)<br/>run"]
```

**Why this is good practice**
- **Layer caching:** dependencies change rarely, so `go mod download` stays cached.
- **Non-root user** and no shell or package manager inside the final image.
- `scratch` works too, but you must copy CA certificates and timezone data yourself if the app makes HTTPS calls or uses time zones. `distroless` already has them.
- Add a `.dockerignore` (`.git`, `bin/`, `*.md`).
- Scan images (Trivy) and pin versions (or digests) of base images.

**Kubernetes tip:** read-only root filesystem, drop all capabilities, set CPU/memory requests, and rely on the logs going to stdout.

_Module: Tooling & Delivery · Tags: docker, deployment, kubernetes_

### 99. How do you build a gRPC service in Go, and when do you choose gRPC over REST?

**Short answer:** With gRPC you define your API in a `.proto` file, generate Go code, and implement the generated server interface. It uses HTTP/2 and binary Protocol Buffers, so it is fast, strongly typed, and supports streaming.

```proto
// orders.proto
syntax = "proto3";
package orders.v1;
option go_package = "github.com/acme/orders/gen/orders/v1;ordersv1";

service OrderService {
  rpc GetOrder(GetOrderRequest) returns (Order);
  rpc WatchOrders(WatchRequest) returns (stream Order); // server streaming
}

message GetOrderRequest { string id = 1; }
message WatchRequest {}
message Order { string id = 1; string item = 2; }
```

```bash
protoc --go_out=. --go-grpc_out=. orders.proto   # or use buf
```

```go
type server struct {
	ordersv1.UnimplementedOrderServiceServer // forward compatibility
}

func (s *server) GetOrder(ctx context.Context, req *ordersv1.GetOrderRequest) (*ordersv1.Order, error) {
	if req.Id == "" {
		return nil, status.Error(codes.InvalidArgument, "id is required")
	}
	return &ordersv1.Order{Id: req.Id, Item: "book"}, nil
}

func main() {
	lis, _ := net.Listen("tcp", ":9090")
	g := grpc.NewServer()
	ordersv1.RegisterOrderServiceServer(g, &server{})
	g.Serve(lis)
}
```

| | REST + JSON | gRPC |
| --- | --- | --- |
| Contract | OpenAPI (optional) | `.proto` (required, generates code) |
| Payload | text, bigger | binary, smaller and faster |
| Streaming | awkward (SSE/WebSocket) | built in (4 modes) |
| Browser support | native | needs gRPC-Web |
| Debugging | easy with curl | needs grpcurl/Postman |
| Best for | public APIs, browsers | internal service-to-service calls |

**Production features:** deadlines on every call (`context`), interceptors (middleware) for auth/logging/tracing, `status` codes instead of HTTP codes, load balancing (client-side or through a mesh), and **backward-compatible schema changes** (never reuse field numbers).

_Module: HTTP & Microservices · Tags: grpc, microservices_

### 100. How do you implement retries with exponential backoff and jitter in Go?

**Short answer:** Retry only **transient** failures of **idempotent** operations. Wait longer after each failure (exponential backoff) and add random *jitter* so many clients do not retry at exactly the same moment (thundering herd). Always honour the context.

```go
package main

import (
	"context"
	"errors"
	"fmt"
	"math/rand"
	"time"
)

var errTemporary = errors.New("temporary failure")

func retry(ctx context.Context, attempts int, base time.Duration, fn func() error) error {
	var err error
	for i := 0; i < attempts; i++ {
		if err = fn(); err == nil {
			return nil
		}
		if !errors.Is(err, errTemporary) { // do not retry permanent errors
			return err
		}
		// backoff: base * 2^i, plus up to 50% jitter
		d := base << i
		d += time.Duration(rand.Int63n(int64(d / 2)))

		select {
		case <-time.After(d):
		case <-ctx.Done():
			return ctx.Err()
		}
	}
	return fmt.Errorf("after %d attempts: %w", attempts, err)
}

func main() {
	calls := 0
	err := retry(context.Background(), 4, 50*time.Millisecond, func() error {
		calls++
		if calls < 3 {
			return errTemporary
		}
		return nil
	})
	fmt.Println(calls, err) // prints: 3 <nil>
}
```

```mermaid
flowchart LR
    A["try 1 fails"] -->|wait 50ms| B["try 2 fails"] -->|wait 100ms| C["try 3 fails"] -->|wait 200ms| D["try 4"]
```

**What to retry:** network timeouts, `503`, `429` (respect `Retry-After`), deadlock/serialization errors. **Not:** `400`, `401`, `404`, validation errors.

**Safety rules**
- Cap the attempts and the total time.
- Make writes idempotent (idempotency key) before you retry them.
- Retries multiply load. Combine them with a circuit breaker and a retry budget so you do not hammer a failing service.

_Module: Debugging & Reliability · Tags: resilience, patterns_

### 101. How does a circuit breaker work, and how do you add one in Go?

**Short answer:** A circuit breaker watches calls to a dependency. After too many failures it **opens** and fails immediately (no waiting on a broken service). After a pause it goes **half-open** and lets a few trial calls through. If they succeed, it **closes** again.

```mermaid
stateDiagram-v2
    [*] --> Closed
    Closed --> Open: failures exceed threshold
    Open --> HalfOpen: after cool-down timeout
    HalfOpen --> Closed: trial calls succeed
    HalfOpen --> Open: a trial call fails
```

```go
package main

import (
	"errors"
	"fmt"
	"time"

	"github.com/sony/gobreaker"
)

func main() {
	cb := gobreaker.NewCircuitBreaker(gobreaker.Settings{
		Name:        "payments-api",
		MaxRequests: 2,                // trial calls allowed in half-open
		Timeout:     10 * time.Second, // how long to stay open
		ReadyToTrip: func(c gobreaker.Counts) bool {
			return c.ConsecutiveFailures >= 5
		},
	})

	_, err := cb.Execute(func() (any, error) {
		return nil, errors.New("payments down")
	})
	fmt.Println(err)

	// when open:  err == gobreaker.ErrOpenState (fail fast, no network call)
}
```

**Why use it**
- Protects your service: threads/goroutines are not stuck waiting on a dead dependency.
- Gives the failing service room to recover.
- Lets you serve a **fallback** (cached data, default response, queue for later).

**Together with other patterns:** timeouts (always), retries (small and with backoff), bulkheads (separate pools), and fallbacks. A service mesh (Istio) can also do it outside your code.

**Tuning:** thresholds based on error *rate* over a window are better than a raw count for high traffic. Alert when a breaker opens.

_Module: Debugging & Reliability · Tags: resilience, patterns_

### 102. How do you avoid duplicate work with `singleflight` and add caching?

**Short answer:** When many requests ask for the same expensive thing at the same time (a *cache stampede*), `singleflight` makes only **one** call do the work while the others wait and share its result.

```go
package main

import (
	"fmt"
	"sync"
	"time"

	"golang.org/x/sync/singleflight"
)

var group singleflight.Group

func loadProfile(id string) (string, error) {
	v, err, shared := group.Do(id, func() (any, error) {
		fmt.Println("hitting the database for", id) // printed once
		time.Sleep(100 * time.Millisecond)
		return "profile-" + id, nil
	})
	_ = shared // true if the result was shared by several callers
	return v.(string), err
}

func main() {
	var wg sync.WaitGroup
	for i := 0; i < 5; i++ {
		wg.Add(1)
		go func() { defer wg.Done(); fmt.Println(loadProfile("42")) }()
	}
	wg.Wait()
}
```

```mermaid
flowchart LR
    A["req 1"] --> S{"singleflight key=42"}
    B["req 2"] --> S
    C["req 3"] --> S
    S -->|one call| DB[("database")]
    DB --> S --> A
    S --> B
    S --> C
```

**Cache layers**
1. **In-process** (map + mutex, or `ristretto` / `bigcache` / `golang-lru`): fastest, but per pod and can be stale.
2. **Shared** (Redis): consistent across pods, adds a network hop.
3. **HTTP/CDN** caching with `Cache-Control` and ETags.

**Patterns:** *cache-aside* (check cache, else load and store), TTLs with a bit of random jitter, negative caching (cache "not found" briefly), and explicit invalidation on writes.

**Remember:** if the first call fails or is cancelled, everyone sharing it gets the same error. Be careful with per-request contexts inside a shared call.

_Module: Performance & Load · Tags: caching, concurrency, performance_

### 103. How do you build a reliable message consumer (Kafka/RabbitMQ) in Go?

**Short answer:** Message systems usually deliver **at least once**, so the same message can arrive twice. A reliable consumer processes messages **idempotently**, acknowledges (commits) only **after** the work succeeds, handles poison messages with retries and a dead-letter queue, and shuts down gracefully.

```mermaid
flowchart LR
    T[("topic / queue")] --> C["consumer"]
    C --> P{"process OK?"}
    P -- yes --> A["ack / commit offset"]
    P -- "temporary error" --> R["retry with backoff"]
    R --> P
    P -- "permanent error / too many retries" --> D[("dead-letter queue")]
```

```go
func (c *Consumer) Run(ctx context.Context) error {
	for {
		msg, err := c.reader.FetchMessage(ctx) // does not commit yet
		if err != nil {
			if ctx.Err() != nil {
				return nil // shutting down
			}
			return err
		}

		if err := c.handle(ctx, msg); err != nil {
			c.sendToDLQ(ctx, msg, err) // poison message: park it, keep going
		}
		// commit only after handling (or parking) the message
		if err := c.reader.CommitMessages(ctx, msg); err != nil {
			return err
		}
	}
}

func (c *Consumer) handle(ctx context.Context, msg kafka.Message) error {
	id := string(msg.Key)
	done, err := c.store.AlreadyProcessed(ctx, id) // idempotency check
	if err != nil || done {
		return err
	}
	// ... business logic + mark processed in the SAME DB transaction
	return nil
}
```

**Key ideas**
- **Idempotency:** store a processed-message id (or use upserts) in the same transaction as the side effect.
- **Ordering:** Kafka guarantees order only **within a partition**. Use the entity id as the key to keep one entity's events in order.
- **Scaling:** consumers in a group share partitions. More consumers than partitions do nothing.
- **Backpressure:** control batch size and concurrency; bounded worker pool per partition.
- **Outbox pattern** on the producer side so DB write and event publish are consistent.
- Monitor **consumer lag** (Datadog / Prometheus) and alert when it grows.

_Module: HTTP & Microservices · Tags: messaging, kafka, microservices_

### 104. How do you validate input and map errors to HTTP responses in a clean way?

**Short answer:** Validate at the edge (handler), return clear `4xx` errors, and keep a single place that translates your domain errors into HTTP status codes. Internal details should never leak to the client.

```go
package main

import (
	"encoding/json"
	"errors"
	"net/http"
	"strings"
)

// domain errors
var (
	ErrNotFound = errors.New("not found")
	ErrConflict = errors.New("conflict")
)

type ValidationError struct{ Fields map[string]string }

func (v *ValidationError) Error() string { return "validation failed" }

type CreateUser struct {
	Email string `json:"email"`
	Age   int    `json:"age"`
}

func (u CreateUser) Validate() error {
	f := map[string]string{}
	if !strings.Contains(u.Email, "@") {
		f["email"] = "must be a valid email"
	}
	if u.Age < 18 {
		f["age"] = "must be 18 or older"
	}
	if len(f) > 0 {
		return &ValidationError{Fields: f}
	}
	return nil
}

// one place that maps errors -> status + body
func writeError(w http.ResponseWriter, err error) {
	var ve *ValidationError
	code, body := http.StatusInternalServerError, map[string]any{"error": "internal error"}

	switch {
	case errors.As(err, &ve):
		code, body = http.StatusUnprocessableEntity, map[string]any{"error": "validation failed", "fields": ve.Fields}
	case errors.Is(err, ErrNotFound):
		code, body = http.StatusNotFound, map[string]any{"error": "not found"}
	case errors.Is(err, ErrConflict):
		code, body = http.StatusConflict, map[string]any{"error": "already exists"}
	}
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(code)
	json.NewEncoder(w).Encode(body)
}

func main() {}
```

**Status codes cheat sheet:** `400` malformed request, `401` not logged in, `403` not allowed, `404` not found, `409` conflict, `422` valid JSON but invalid data, `429` too many requests, `500` our bug, `503` dependency down.

**Libraries:** `go-playground/validator` uses struct tags (`validate:"required,email"`). Fine for simple rules; write explicit code for business rules.

**Log the real error** (with trace id) but return only a safe message to the client.

_Module: HTTP & Microservices · Tags: http, errors, api_

### 105. How do you add tracing and metrics to a Go service (OpenTelemetry, Datadog)?

**Short answer:** Use **OpenTelemetry (OTel)** to create *traces* (a request's journey across services) and *metrics*, and send them to a backend such as Datadog. Instrument HTTP/gRPC/DB with ready-made wrappers and propagate the trace context between services.

```mermaid
sequenceDiagram
    participant U as Client
    participant A as API gateway
    participant O as Orders service
    participant D as Database
    U->>A: request (trace-id=abc)
    A->>O: call (header traceparent: abc)
    O->>D: query (child span)
    D-->>O: rows
    O-->>A: response
    Note over A,O: all spans share trace-id abc, so one trace shows the full path
```

```go
package main

import (
	"context"
	"net/http"

	"go.opentelemetry.io/otel"
	"go.opentelemetry.io/contrib/instrumentation/net/http/otelhttp"
)

func getOrder(w http.ResponseWriter, r *http.Request) {
	ctx, span := otel.Tracer("orders").Start(r.Context(), "load-order")
	defer span.End()

	loadFromDB(ctx) // pass ctx so the DB span becomes a child
	w.Write([]byte("ok"))
}

func loadFromDB(ctx context.Context) {}

func main() {
	mux := http.NewServeMux()
	mux.HandleFunc("GET /orders/{id}", getOrder)

	// wraps every request in a span automatically
	http.ListenAndServe(":8080", otelhttp.NewHandler(mux, "orders-api"))
}
```

**What to measure (RED method for services)**
- **R**ate: requests per second.
- **E**rrors: failed requests per second.
- **D**uration: latency percentiles (p50, p95, p99), not averages.
For resources use **USE**: utilisation, saturation, errors.

**Go-specific signals worth dashboards:** goroutine count, GC pause time, heap size, DB pool wait time, event/queue lag.

**Datadog options:** the OTel Collector/Agent receives OTLP; or use `dd-trace-go`. Add `trace_id` to your logs so you can jump from a log line to the full trace.

**Practical:** sample traces in production (for example 5-10%), tag spans with low-cardinality attributes, and never put secrets or personal data in span attributes.

_Module: Observability & Operations · Tags: observability, opentelemetry, datadog_

### 106. What is reflection in Go and when should you avoid it?

**Short answer:** The `reflect` package lets a program inspect and change values and types **at runtime** (field names, tags, methods). Libraries like `encoding/json`, ORMs, and validators use it. It is powerful but slower, less type-safe, and harder to read.

```go
package main

import (
	"fmt"
	"reflect"
)

type User struct {
	Name  string `json:"name" validate:"required"`
	Email string `json:"email"`
	age   int    // unexported
}

func main() {
	u := User{Name: "Anu", Email: "a@x.com"}
	t := reflect.TypeOf(u)
	v := reflect.ValueOf(u)

	for i := 0; i < t.NumField(); i++ {
		f := t.Field(i)
		if !f.IsExported() {
			continue
		}
		fmt.Printf("%s = %v (json tag: %q)\n", f.Name, v.Field(i), f.Tag.Get("json"))
	}
	// Name = Anu (json tag: "name")
	// Email = a@x.com (json tag: "email")

	// to change a value, you need a pointer
	pv := reflect.ValueOf(&u).Elem()
	pv.FieldByName("Name").SetString("Anubhav")
	fmt.Println(u.Name) // Anubhav
}
```

**Costs**
- 10-100x slower than direct code; allocates more.
- Errors show up at runtime (panics), not at compile time.
- Cannot access unexported fields.

**Prefer instead:** generics (1.18+), interfaces, code generation (`go generate`, `sqlc`, `stringer`).

**Use it when:** you are writing a framework or library that must handle unknown types (serialisers, dependency injection, test helpers like `reflect.DeepEqual`). In application code, it is usually a smell.

_Module: Interfaces & Generics · Tags: reflection, advanced-topics_

## Advanced

### 107. Explain the Go scheduler (G-M-P model) in detail.

**Short answer:** The Go runtime has its own scheduler that runs many goroutines (**G**) on a small number of OS threads (**M**). A **P** (processor) is the permission slip a thread needs to run Go code, and it owns a queue of runnable goroutines. The number of Ps is `GOMAXPROCS` (default: CPU count).

```mermaid
flowchart TD
    subgraph GQ["Global run queue"]
        G1["G"] --- G2["G"]
    end
    subgraph P0["P0"]
        LQ0["local queue: G G G"]
    end
    subgraph P1["P1"]
        LQ1["local queue: G G"]
    end
    P0 --- M0["M0 (OS thread)"] --- C0["CPU core"]
    P1 --- M1["M1 (OS thread)"] --- C1["CPU core"]
    GQ -.-> P0
    P1 -. "work stealing" .-> LQ0
```

| Letter | What | Count |
| --- | --- | --- |
| **G** | goroutine: stack + program counter + state | thousands to millions |
| **M** | OS thread ("machine") | grows as needed (blocked syscalls) |
| **P** | logical processor with a local run queue | `GOMAXPROCS` |

**How scheduling works**
1. A new goroutine goes into the current P's local queue (a "run next" slot makes the newest one run quickly).
2. An M with a P picks a G from its local queue and runs it.
3. If the local queue is empty, the P checks the **global queue**, the **network poller**, and then **steals** half of another P's queue (work stealing). This keeps all cores busy.
4. Every so often (1/61 ticks) the scheduler checks the global queue to avoid starving it.

**When a goroutine blocks**
- **Channel/mutex/sleep:** the G is parked (set aside), the M immediately runs another G. Cheap, no OS thread is blocked.
- **Network I/O:** handled by the *netpoller* (epoll/kqueue). The G parks until the socket is ready; no thread is blocked.
- **Blocking syscall (file I/O, cgo):** the M is stuck in the kernel, so the runtime **detaches the P** and gives it to another M (creating one if needed). When the syscall returns, the G tries to get a P back.

**Preemption:** since Go 1.14 the runtime can interrupt a goroutine that runs too long (async preemption via signals). Before that, a tight loop without function calls could starve others.

**Why it matters in practice**
- Goroutines are cheap because switching them is a user-space operation (~100-200 ns vs microseconds for threads).
- CPU-bound goroutines beyond `GOMAXPROCS` do not run faster. In containers, match `GOMAXPROCS` to the CPU limit.
- Many blocking cgo calls or syscalls create many threads.
- `runtime.Gosched()` yields voluntarily; `runtime.LockOSThread()` pins a goroutine to a thread (needed for some C libraries/GUI).

_Module: Runtime & Memory · Tags: runtime, scheduler, internals_

### 108. How does Go's garbage collector work, and how does it keep pauses short?

**Short answer:** Go uses a **concurrent, tri-color, mark-and-sweep** garbage collector. It does most of its work *while your program runs*, with only very short stop-the-world (STW) pauses (typically well under a millisecond). It is **non-generational** and **non-moving**.

**Tri-color idea**
- **White:** not seen yet (candidate garbage).
- **Grey:** reachable, but its children are not scanned yet.
- **Black:** reachable and fully scanned.

```mermaid
flowchart LR
    R["Roots: stacks, globals"] --> A["A (grey)"]
    A --> B["B (white)"]
    A --> C["C (white)"]
    X["X (white, unreachable)"]
    note["Mark: grey objects are scanned and turned black.<br/>At the end every white object is garbage and is swept."]
```

**Phases**

```mermaid
sequenceDiagram
    participant P as Your goroutines
    participant G as GC workers
    G->>P: 1. Sweep termination (short STW)
    G->>G: 2. Mark (concurrent, uses about 25% CPU)
    P-->>G: write barrier records pointer changes while marking
    G->>P: 3. Mark termination (short STW)
    G->>G: 4. Sweep (concurrent, lazy)
```

1. **Mark setup** (tiny STW): turn on the *write barrier*.
2. **Concurrent mark:** GC goroutines walk the object graph from roots. The write barrier makes sure pointers changed by running code are not missed.
3. **Mark termination** (tiny STW): finish marking.
4. **Sweep:** free white objects; done lazily and concurrently.

**When does it start?** When the heap grows by `GOGC` percent (default 100) over the live heap after the last cycle, or when approaching `GOMEMLIMIT`. A *pacer* starts the GC early enough to finish before the heap target is reached.

**GC assist:** if your goroutines allocate faster than the GC can mark, they are made to help with marking, which slows the request. That is how heavy allocation turns into latency.

**What it costs you**
- CPU for marking (roughly proportional to the amount of **live pointer-containing memory**, not garbage).
- Extra memory headroom (about 2x live heap with `GOGC=100`).

**Tuning, in order of preference**
1. Allocate less (pre-size, reuse, avoid pointers in hot structures).
2. Set `GOMEMLIMIT` in containers.
3. Adjust `GOGC` (higher = fewer GCs, more RAM).
4. Watch `GODEBUG=gctrace=1` and the pprof/trace views.

**Interview tip:** emphasise "latency-oriented, concurrent, no compaction, no generations" and that pause times do not grow with heap size much, but CPU cost does.

_Module: Runtime & Memory · Tags: gc, runtime, internals_

### 109. What is escape analysis? How does Go decide between stack and heap?

**Short answer:** The compiler decides at **compile time** whether a variable can live on the cheap **stack** (freed automatically when the function returns) or must **escape** to the **heap** (managed by the GC). If a value's address might be used after the function returns, it escapes.

```go
package main

type User struct{ Name string }

func stackOnly() int {
	u := User{Name: "a"} // does not escape: stays on the stack
	return len(u.Name)
}

func escapes() *User {
	u := User{Name: "a"}
	return &u // address returned: u escapes to the heap
}

func main() { _ = stackOnly(); _ = escapes() }
```

```bash
go build -gcflags="-m" .
# ./main.go:9:2: moved to heap: u        <- from escapes()
```

**Stack vs heap**

| | Stack | Heap |
| --- | --- | --- |
| Allocation cost | almost free (move a pointer) | slower (allocator + GC work) |
| Freed by | function return | garbage collector |
| Cache friendliness | very good | worse |

**Common reasons a value escapes**
- Returning a pointer to a local variable.
- Storing a pointer in a heap object, global, or sending it on a channel.
- Putting a value in an `interface{}`/`any` (boxing), for example passing it to `fmt.Println`.
- A closure captures it and the closure escapes.
- Size is unknown at compile time (`make([]int, n)` with variable `n`), or too large for the stack.
- Calling through an interface or function value (the compiler cannot see what happens to the argument).

**Practical advice**
- Do not contort your code to avoid escapes. Use `-gcflags=-m` and benchmarks (`-benchmem`) only on hot paths.
- Returning small structs **by value** often avoids heap allocation.
- Goroutine stacks start small (2 KB) and **grow** by copying, so deep recursion works but costs.
- "Pointers are faster" is a myth for small data. A pointer often *forces* a heap allocation.

_Module: Runtime & Memory · Tags: memory, performance, internals_

### 110. How are slices, maps and strings implemented internally?

**Short answer:** Each is a small header (plus a pointer to data) managed by the runtime. Knowing the layout explains the copying and performance rules.

**Slice** = 3 words (24 bytes on 64-bit)

```go
type slice struct {
	array unsafe.Pointer // pointer to first element
	len   int
	cap   int
}
```
Passing a slice copies these three words, not the data.

**String** = 2 words: pointer to bytes + length. Immutable, so substrings (`s[2:5]`) share memory with the original (and can keep a big string alive).

**Map** = pointer to a hash table.
- Classic implementation (Go up to 1.23): array of **buckets**, each holding 8 key/value pairs plus "tophash" bytes for quick filtering. The hash picks a bucket; overflow buckets chain when full. When the load factor passes about 6.5, the table **grows** and entries are moved **incrementally** (a few buckets per write) to avoid long pauses.
- Go 1.24 switched to a **Swiss table** design (open addressing, group probing). Same behaviour, better speed and memory in many cases.
- Iteration order is randomised on purpose, so nobody depends on it.
- Not safe for concurrent use. The runtime detects concurrent write and aborts the program.

```mermaid
flowchart LR
    K["key"] --> H["hash(key)"]
    H --> B["bucket index = low bits"]
    H --> T["tophash = high 8 bits"]
    B --> BK["bucket: 8 slots + overflow pointer"]
    T --> BK
```

**Consequences worth remembering**

| Fact | Consequence |
| --- | --- |
| Slice header is copied | Functions can modify elements but not the caller's length/capacity |
| Sub-slices share the array | Aliasing bugs; memory retention |
| Map is a pointer | Passing a map shares it; `nil` map reads are fine, writes panic |
| Map memory rarely shrinks | A map that once held 1M entries keeps its buckets after deletes. Re-create it to release memory |
| Map keys must be comparable | Slices/maps/funcs cannot be keys |
| String concatenation allocates | Use `strings.Builder` |
| `len(string)` is O(1) bytes | Counting characters needs `utf8.RuneCountInString` |
| Map lookup is O(1) average | But hashing big keys or many collisions costs more |

**Tip:** `make(map[K]V, n)` pre-sizes the table and avoids growth work when you know `n`.

_Module: Runtime & Memory · Tags: internals, slices, maps_

### 111. How are channels implemented, and what happens inside a send or receive?

**Short answer:** A channel is a runtime struct (`hchan`) with a ring buffer, a lock, and two wait queues (blocked senders and blocked receivers). Operations lock the channel, and either copy data directly, use the buffer, or **park** the goroutine in a wait queue.

```mermaid
flowchart LR
    subgraph hchan
        BUF["ring buffer (size = cap)"]
        SQ["sendq: waiting senders (sudog)"]
        RQ["recvq: waiting receivers (sudog)"]
        LK["mutex"]
        CL["closed flag"]
    end
```

**Send `ch <- v`**

```mermaid
flowchart TD
    A["lock channel"] --> B{"receiver waiting in recvq?"}
    B -- yes --> C["copy value straight to that receiver, wake it"]
    B -- no --> D{"buffer has space?"}
    D -- yes --> E["copy into buffer"]
    D -- no --> F["park sender in sendq (goroutine sleeps)"]
```

**Receive `<-ch`** is the mirror image: take from a waiting sender, or from the buffer, or park in `recvq`. When a buffered channel is full and a receiver takes a value, a waiting sender's value moves into the buffer and the sender wakes.

**Facts you can derive**
- **Unbuffered** channel: no buffer, so send and receive must *meet*. The value is copied directly between goroutine stacks.
- **FIFO:** both the buffer and the wait queues are first-in, first-out.
- **Close:** sets the flag and wakes *all* waiting receivers (they get zero values) and panics waiting senders. That is why closing is a good broadcast signal.
- **nil channel** has no struct: operations block forever. In `select` a nil channel case is never chosen.
- **`select`** locks the involved channels in a global order (avoid deadlock), checks each case in a random order, and if none are ready, enqueues the goroutine on all of them and sleeps.

**Performance notes**
- Channels use a mutex internally. A channel send/receive costs on the order of 50-100 ns uncontended. Fine for coordination, but a mutex or atomic is cheaper for protecting a counter.
- Sending large values copies them. Send pointers or small structs.
- Heavy contention on one channel can bottleneck. Shard work across several channels.

**Rule:** channels are for *communication and ownership transfer*; mutexes for *protecting shared state*.

_Module: Runtime & Memory · Tags: channels, runtime, internals_

### 112. How are interfaces represented in memory, and what does dynamic dispatch cost?

**Short answer:** An interface value is a **two-word pair**: a pointer to type information and a pointer to the data. For non-empty interfaces the first word points to an **itab** (interface table) that contains the concrete type and a table of function pointers for the interface's methods. Calling a method through an interface is an indirect call through that table.

```mermaid
flowchart LR
    subgraph "Interface value (iface)"
        T["itab pointer"]
        D["data pointer"]
    end
    T --> IT["itab: interface type, concrete type, method table"]
    IT --> M["fun[0] = (*File).Read ..."]
    D --> V["the concrete value (usually on the heap)"]
```

- `interface{}` / `any` (empty interface) uses a simpler form: **type pointer + data pointer** (`eface`).
- The `itab` for a (interface, concrete type) pair is created once and cached.

**What this explains**
1. **Nil interface gotcha:** an interface is `nil` only if *both* words are nil. A nil `*MyErr` in an `error` has a non-nil type word.
2. **Boxing allocates:** putting a non-pointer value in an interface may copy it to the heap (small ints and zero values have optimisations).
3. **Method call cost:** an indirect call prevents inlining and some optimisations. It costs a few nanoseconds more than a direct call. Irrelevant in most code, relevant in tight loops.
4. **Type assertion** `v.(T)` compares the type word. `v.(Interface)` looks up (and caches) an itab, which is slower.
5. **Comparison:** two interfaces are equal if types are equal *and* values are equal. Comparing interfaces that hold uncomparable types (slices, maps) **panics**.

```go
var a any = []int{1}
var b any = []int{1}
// fmt.Println(a == b) // ❌ panic: comparing uncomparable type []int
```

**Practical guidance**
- Use interfaces at boundaries (for tests/decoupling), not for every internal call in a hot loop.
- The compiler can sometimes *devirtualize* a call when it can prove the concrete type (especially with profile-guided optimisation, PGO).
- Generics avoid boxing in many cases, but the implementation (see the generics question) still has some dictionary-based indirection.

_Module: Interfaces & Generics · Tags: interfaces, internals, performance_

### 113. What does the Go memory model guarantee? Explain happens-before.

**Short answer:** The memory model defines **when a write by one goroutine is guaranteed to be seen by a read in another**. Without a *happens-before* relationship between them, a read may see an old value, a new value, or (for multi-word values) a mix. Synchronisation operations create happens-before edges.

**Happens-before edges created by synchronisation**

| Operation A | happens before | Operation B |
| --- | --- | --- |
| `go f()` statement | -> | the start of `f` |
| Send on a channel | -> | the matching receive completes |
| Close of a channel | -> | a receive that returns because it is closed |
| Receive from an **unbuffered** channel | -> | the matching send completes |
| `mu.Unlock()` | -> | the next `mu.Lock()` |
| `once.Do(f)` finishing `f` | -> | any `Do` returning |
| `wg.Done()` | -> | `wg.Wait()` returning |
| An atomic write | -> | an atomic read that sees that value |

```go
package main

import "fmt"

var msg string
var done = make(chan struct{})

func main() {
	go func() {
		msg = "hello"      // (1) write
		close(done)        // (2) close: happens-before the receive below
	}()
	<-done                 // (3) sees close
	fmt.Println(msg)       // (4) guaranteed to print "hello"
}
```

**Broken example (no synchronisation)**

```go
var ready bool
var data int

go func() { data = 42; ready = true }()
for !ready { }          // ❌ data race: may spin forever (compiler may hoist the read)
fmt.Println(data)       // may print 0
```

**Key points**
- A **data race** (conflicting access without happens-before) makes the program's behaviour undefined for multi-word values. Go is more forgiving than C++ (races on single words are not undefined behaviour), but you must still treat them as bugs.
- The compiler and CPU may **reorder** instructions. Synchronisation prevents visible reordering across the edges above.
- "It works because I added a `time.Sleep`" is not synchronisation.
- Go atomics are *sequentially consistent* (simple to reason about).
- `-race` checks for violations at runtime.

**Mental model:** if two goroutines touch the same data, there must be a channel operation, a lock, an atomic, a `WaitGroup`, or a `Once` that orders them.

_Module: Concurrency · Tags: memory-model, concurrency, internals_

### 114. When should you use `sync.Map`, and what are better alternatives for concurrent maps?

**Short answer:** `sync.Map` is a concurrent map optimised for two cases: (1) keys are written **once** and read **many times** (a cache that only grows), and (2) different goroutines work on **disjoint sets of keys**. For general read/write workloads, a normal `map` with `sync.RWMutex` is usually simpler and as fast or faster.

```go
package main

import (
	"fmt"
	"sync"
)

func main() {
	var m sync.Map
	m.Store("a", 1)

	v, ok := m.Load("a")
	fmt.Println(v, ok) // 1 true

	actual, loaded := m.LoadOrStore("b", 2) // atomic "get or create"
	fmt.Println(actual, loaded)             // 2 false

	m.Range(func(k, v any) bool { // iteration
		fmt.Println(k, v)
		return true
	})
}
```

**Downsides:** keys and values are `any` (no type safety, boxing), no `len`, awkward compound operations. (A generic wrapper helps.)

**Alternatives**

| Option | Use when |
| --- | --- |
| `map` + `sync.RWMutex` | Default choice. Easy and typed. |
| **Sharded map** (N maps, each with its own lock, pick by `hash(key) % N`) | High contention on one lock |
| `sync.Map` | Mostly reads, write-once keys, or disjoint keys |
| **Copy-on-write** with `atomic.Pointer[map[K]V]` | Rarely updated config/lookup tables: build a new map, swap the pointer, readers never lock |
| Channel-owned map (one goroutine owns the map, others send requests) | You want strict ownership and ordering |
| Library caches (`ristretto`, `bigcache`, `freecache`) | Need eviction, TTL, size limits |

**Sharded map sketch**

```go
type Sharded[V any] struct {
	shards [16]struct {
		mu sync.RWMutex
		m  map[string]V
	}
}

func (s *Sharded[V]) shard(key string) int {
	h := fnv.New32a()
	h.Write([]byte(key))
	return int(h.Sum32()) % len(s.shards)
}
```

**Interview tip:** benchmark! Say "I'd start with RWMutex, measure with `-race` and a benchmark under real contention, and move to sharding or `sync.Map` only if the profile shows lock contention".

_Module: Concurrency · Tags: sync, maps, performance_

### 115. What is false sharing and how does struct layout affect performance?

**Short answer:** CPUs load memory in **cache lines** (usually 64 bytes). If two goroutines on different cores write to *different variables that sit in the same cache line*, the cores keep invalidating each other's cache. The code is correct but slow. This is **false sharing**. Separately, struct field order affects size because of **padding** for alignment.

```go
package main

import (
	"fmt"
	"unsafe"
)

type Bad struct {
	a bool  // 1 byte + 7 padding
	b int64 // 8
	c bool  // 1 byte + 7 padding
}

type Good struct {
	b int64 // 8
	a bool  // 1
	c bool  // 1  (+6 padding at the end)
}

func main() {
	fmt.Println(unsafe.Sizeof(Bad{}), unsafe.Sizeof(Good{})) // prints: 24 16
}
```

Tip: put fields in decreasing size order (the `fieldalignment` analyzer can suggest it).

**False sharing example**

```go
type Counters struct {
	a uint64 // updated by goroutine 1
	b uint64 // updated by goroutine 2 -> same 64-byte cache line as a!
}

// fix: pad so each hot field lives on its own cache line
type PaddedCounters struct {
	a uint64
	_ [56]byte
	b uint64
	_ [56]byte
}
```

```mermaid
flowchart LR
    subgraph L["one cache line (64 bytes)"]
        A["a (core 1 writes)"] --- B["b (core 2 writes)"]
    end
    C1["Core 1"] -->|writes a| L
    C2["Core 2"] -->|writes b| L
    L -. "line bounces between cores" .-> C1
    L -.-> C2
```

**When it matters:** per-core/per-goroutine counters or stats updated millions of times per second, lock-free structures, ring buffers. In normal business code it almost never matters.

**Other layout tips**
- `[]Item` (contiguous values) is faster to iterate than `[]*Item` (pointer chasing = cache misses) and is easier on the GC.
- "Struct of arrays" can beat "array of structs" when you scan one field.
- Use `golang.org/x/sys/cpu.CacheLinePad` for portable padding.
- Verify with a benchmark; do not pad blindly.

_Module: Runtime & Memory · Tags: performance, memory, internals_

### 116. What are the costs and risks of `unsafe` and cgo?

**Short answer:** `unsafe` lets you bypass the type system (pointer arithmetic, reinterpret memory). cgo lets Go call C code. Both are powerful escape hatches that cost safety, portability, and sometimes performance. Use them only when you must.

**`unsafe`**

```go
import "unsafe"

// zero-copy string <-> []byte (Go 1.20+ helpers)
func bytesToString(b []byte) string { return unsafe.String(unsafe.SliceData(b), len(b)) }
```

- **Risk:** the returned string shares memory with `b`. If `b` is modified later, the "immutable" string changes: bugs that are very hard to find.
- Not covered by Go 1 compatibility promises beyond documented patterns. Layout can change.
- The GC and escape analysis cannot protect you from invalid pointers.
- Use only after a profile proves a hot spot, wrap it in a tiny, well-tested function, and comment *why* it is safe.

**cgo**

```go
/*
#include <stdlib.h>
int add(int a, int b) { return a + b; }
*/
import "C"

func main() { println(C.add(1, 2)) }
```

| Cost | Detail |
| --- | --- |
| **Call overhead** | about 50-100 ns per call, roughly 30-50x a Go function call. Batch calls |
| **Threads** | A C call blocks an OS thread; many slow C calls create many threads |
| **Build** | Needs a C compiler; no easy cross-compile; no `scratch` static binary unless carefully linked; slower builds |
| **GC** | Passing Go pointers to C has strict rules (`runtime.Pinner`, no pointers to Go pointers) |
| **Debugging** | Stack traces and tools are harder; C memory is not managed by Go |
| **Crashes** | A segfault in C kills the process (exit 139) and `recover` cannot help |
| **Binary** | Less portable and larger |

**Alternatives:** a pure-Go library, a separate process/microservice speaking gRPC, WebAssembly, or generating code.

**Typical legitimate uses:** SQLite (mattn/go-sqlite3; a pure-Go option exists), hardware or OS libraries, image/video codecs, very mature C libraries with no Go equivalent.

**Setting for static builds:** `CGO_ENABLED=0` forces pure Go and is the default choice for containers.

_Module: Runtime & Memory · Tags: unsafe, cgo, internals_

### 117. What are the common `context` pitfalls and anti-patterns?

**Short answer:** Context is simple but easy to misuse. Most bugs come from forgetting to cancel, dropping the parent context, storing it, or abusing `WithValue`.

**1. Forgetting `cancel()` (leaks the timer/goroutine until the parent ends)**

```go
ctx, cancel := context.WithTimeout(parent, 5*time.Second)
defer cancel() // ✅ always, even if the work finishes early
```
`go vet` has a `lostcancel` check for this.

**2. Breaking the chain with `context.Background()`**

```go
func (s *Svc) Save(ctx context.Context, o Order) error {
	return s.db.ExecContext(context.Background(), q) // ❌ ignores caller's cancellation/deadline
}
```

**3. Running work that outlives the request using the request context**

```go
func handler(w http.ResponseWriter, r *http.Request) {
	go sendEmail(r.Context()) // ❌ cancelled as soon as the response is written
}
// ✅ use a detached context for fire-and-forget work
//   go sendEmail(context.WithoutCancel(r.Context())) // Go 1.21+, keeps values, drops cancellation
// or better: put the job on a queue.
```

**4. Storing contexts in structs** — a context is per-call. Pass it as the first parameter.

**5. Abusing `WithValue`**

```go
type ctxKey struct{}                        // ✅ private type avoids collisions
ctx = context.WithValue(ctx, ctxKey{}, user)
```
- Only for request-scoped data crossing API boundaries (trace id, auth principal). **Never** for optional parameters, config, or dependencies. Values are untyped and invisible in function signatures.

**6. Ignoring `ctx.Done()` in long loops or blocking calls**

```go
for _, item := range items {
	select {
	case <-ctx.Done():
		return ctx.Err()
	default:
	}
	process(item)
}
```

**7. Wrong error handling:** distinguish `context.Canceled` (caller gave up, not your bug, do not alert) from `context.DeadlineExceeded` (a timeout, maybe a dependency problem).

**8. Using a cancelled context for cleanup.** Cleanup after cancellation (like rolling back or flushing) needs a fresh short context: `context.WithTimeout(context.WithoutCancel(ctx), 2*time.Second)`.

**Useful newer helpers:** `context.WithCancelCause`, `context.Cause(ctx)` (why was it cancelled), `context.AfterFunc` (Go 1.21+).

_Module: Concurrency · Tags: context, gotchas, concurrency_

### 118. How do Go generics work under the hood, and what are their performance trade-offs?

**Short answer:** Go compiles generic code using **GC shape stenciling with dictionaries**. The compiler generates one copy of a function for each *GC shape* (types with the same memory layout, for example all pointer types share one shape) and passes a hidden *dictionary* with type-specific information. This balances binary size against speed.

```mermaid
flowchart TD
    F["func Max[T cmp.Ordered](a, b T) T"] --> S1["shape: int (and named types with underlying int)"]
    F --> S2["shape: float64"]
    F --> S3["shape: string"]
    F --> S4["shape: pointer (all *T share one copy + dictionary)"]
```

**What it means**
- For **basic types** (`int`, `float64`, `string`) you usually get specialised, fast code, similar to hand-written code.
- For **pointer types and interfaces**, many types share one copy, and operations that depend on the exact type (method calls on `T`) go through the dictionary, which is like an indirect call.
- Method calls on a type parameter via an interface constraint are *not always* inlined, so a generic version can be slower than the direct one in micro-benchmarks. The difference rarely matters outside hot loops.

```go
func Sum[T ~int | ~float64](xs []T) T {
	var s T
	for _, x := range xs {
		s += x // fast: arithmetic on a known shape
	}
	return s
}
```

**Compared with `interface{}`:** generics avoid boxing and type assertions, keep compile-time type safety, and are normally *faster* than the `any`-based approach.

**Limitations**
- No generic methods (only types and functions can have type parameters).
- No operator overloading or specialisation.
- Type inference works for function arguments, but not always for return-only parameters.
- A type parameter cannot be used in type switches without converting to `any` first.

**Guidelines**
1. Use generics for containers and algorithms that are identical across types (Set, Map/Filter, Stack, cache).
2. Use interfaces when behaviour differs per type (polymorphism).
3. Do not use generics just to avoid copy-pasting two lines.
4. Benchmark hot paths.

_Module: Interfaces & Generics · Tags: generics, internals, performance_

### 119. What are iterators (`iter.Seq`, range-over-func) added in Go 1.23?

**Short answer:** Go 1.23 lets you write `for ... range` over a **function**. An iterator is a function that calls a `yield` callback for each item. The standard `iter` package names the shapes: `iter.Seq[V]` (one value) and `iter.Seq2[K, V]` (two values). It gives a standard way to iterate lazily over custom collections, without allocating a slice.

```go
package main

import (
	"fmt"
	"iter"
	"maps"
	"slices"
)

// An iterator: yield each even number up to n
func Evens(n int) iter.Seq[int] {
	return func(yield func(int) bool) {
		for i := 0; i <= n; i += 2 {
			if !yield(i) { // the loop body asked to stop (break)
				return
			}
		}
	}
}

func main() {
	for v := range Evens(10) {
		if v > 6 {
			break
		}
		fmt.Print(v, " ") // 0 2 4 6
	}
	fmt.Println()

	// standard library helpers now return/accept iterators
	m := map[string]int{"b": 2, "a": 1}
	keys := slices.Sorted(maps.Keys(m)) // [a b]
	fmt.Println(keys)

	for i, v := range slices.All([]string{"x", "y"}) {
		fmt.Println(i, v)
	}
}
```

**How it works:** the compiler turns the loop body into a function and passes it as `yield`. `break`, `return`, `continue`, and `defer` inside the loop keep working as you would expect.

**Pull iterators:** `iter.Pull(seq)` converts a push iterator into `next()`/`stop()` for cases where you need to step manually (merge two sequences).

**Why use them**
- Lazy: no need to build a full slice (`maps.Keys`, tree traversal, database rows, file lines).
- Composable pipelines (`Filter`, `Map`, `Take`).
- Works with the standard `slices`/`maps` packages.

**Caveats:** if `yield` returns false you must stop and return (ignoring it can panic). Debugging and stack traces through iterators are slightly more complex. Concurrency is up to you; the iterator runs in the caller's goroutine.

_Module: Interfaces & Generics · Tags: go-1.23, iterators, generics_

### 120. Design a thread-safe LRU cache with TTL in Go.

**Short answer:** Combine a **hash map** (O(1) lookup) with a **doubly linked list** (O(1) move-to-front and eviction), protect both with a mutex, and store an expiry time on each entry. Evict the least-recently-used item when over capacity, and treat expired entries as misses.

```mermaid
flowchart LR
    M["map[key] to list element"] --> N2
    subgraph LIST["doubly linked list (front = most recent)"]
        N1["k1"] --- N2["k2"] --- N3["k3 (LRU)"]
    end
    G["Get(k2)"] -->|move to front| N1
    P["Put over capacity"] -->|remove back| N3
```

```go
package cache

import (
	"container/list"
	"sync"
	"time"
)

type entry[K comparable, V any] struct {
	key     K
	value   V
	expires time.Time
}

type LRU[K comparable, V any] struct {
	mu    sync.Mutex
	cap   int
	ttl   time.Duration
	ll    *list.List          // front = most recently used
	items map[K]*list.Element // key -> element in ll
	now   func() time.Time    // injectable clock for tests
}

func New[K comparable, V any](capacity int, ttl time.Duration) *LRU[K, V] {
	return &LRU[K, V]{cap: capacity, ttl: ttl, ll: list.New(),
		items: make(map[K]*list.Element), now: time.Now}
}

func (c *LRU[K, V]) Get(k K) (V, bool) {
	c.mu.Lock()
	defer c.mu.Unlock()

	var zero V
	el, ok := c.items[k]
	if !ok {
		return zero, false
	}
	e := el.Value.(*entry[K, V])
	if c.now().After(e.expires) { // expired: remove, report miss
		c.remove(el)
		return zero, false
	}
	c.ll.MoveToFront(el)
	return e.value, true
}

func (c *LRU[K, V]) Put(k K, v V) {
	c.mu.Lock()
	defer c.mu.Unlock()

	exp := c.now().Add(c.ttl)
	if el, ok := c.items[k]; ok { // update existing
		e := el.Value.(*entry[K, V])
		e.value, e.expires = v, exp
		c.ll.MoveToFront(el)
		return
	}
	c.items[k] = c.ll.PushFront(&entry[K, V]{key: k, value: v, expires: exp})
	if c.ll.Len() > c.cap {
		c.remove(c.ll.Back()) // evict the least recently used
	}
}

func (c *LRU[K, V]) remove(el *list.Element) {
	c.ll.Remove(el)
	delete(c.items, el.Value.(*entry[K, V]).key)
}
```

**Design discussion points**
- `Get` **mutates** the list (move to front), so a plain `RWMutex` read lock is not enough. Use a full mutex, or approximate LRU, or shard the cache into N independent LRUs to reduce contention.
- Expired entries are removed lazily on access. Add a background sweeper (ticker + `Stop` on close) if memory matters.
- **Cache stampede:** combine with `singleflight` for loads.
- **Metrics:** hits, misses, evictions, size.
- Production libraries: `hashicorp/golang-lru`, `ristretto` (TinyLFU, high concurrency), `bigcache` (avoids GC scanning with a huge byte slab).
- Distributed: Redis; local cache in front for hot keys, with short TTLs for consistency.

_Module: Design & Patterns · Tags: design, cache, data-structures_

### 121. Design a rate limiter for an API with many pods (distributed rate limiting).

**Short answer:** In-memory limiters only count requests per pod, so with 10 pods a "100 per minute" limit becomes up to 1,000. For a true global limit keep the counters in a shared store (usually **Redis**) and update them atomically, or limit at the gateway. Pick an algorithm based on accuracy and cost.

**Algorithms**

| Algorithm | How | Pros / cons |
| --- | --- | --- |
| **Fixed window** | counter per minute | Simple, cheap; bursts at window edges (2x) |
| **Sliding window log** | store timestamps | Exact, but memory heavy |
| **Sliding window counter** | weighted sum of this + previous window | Good approximation, cheap |
| **Token bucket** | tokens refill at rate r, capacity b | Allows bursts, smooth; most common |
| **Leaky bucket** | queue drains at fixed rate | Smooth output; adds latency |

```mermaid
sequenceDiagram
    participant C as Client
    participant A as API pod
    participant R as Redis
    C->>A: request (api key K)
    A->>R: EVAL token_bucket.lua K
    R-->>A: allowed / retry-after
    alt allowed
        A-->>C: 200
    else limited
        A-->>C: 429 + Retry-After
    end
```

**Atomic check in Redis (Lua script runs atomically)**

```lua
-- KEYS[1]=bucket key, ARGV: rate(tokens/sec), capacity, now(ms), cost
local data = redis.call("HMGET", KEYS[1], "tokens", "ts")
local tokens = tonumber(data[1]) or tonumber(ARGV[2])
local ts = tonumber(data[2]) or tonumber(ARGV[3])
local elapsed = math.max(0, tonumber(ARGV[3]) - ts) / 1000
tokens = math.min(tonumber(ARGV[2]), tokens + elapsed * tonumber(ARGV[1]))
local allowed = tokens >= tonumber(ARGV[4])
if allowed then tokens = tokens - tonumber(ARGV[4]) end
redis.call("HSET", KEYS[1], "tokens", tokens, "ts", ARGV[3])
redis.call("PEXPIRE", KEYS[1], 60000)
return allowed and 1 or 0
```

**Go side (go-redis)**

```go
allowed, err := script.Run(ctx, rdb, []string{"rl:" + apiKey},
	ratePerSec, capacity, time.Now().UnixMilli(), 1).Bool()
if err != nil {
	// decide: fail open (allow) or fail closed (deny) when Redis is down
}
```

**Design decisions to discuss**
- **Key:** per user, API key, IP, endpoint, or tenant; different limits per plan.
- **Fail open vs closed** if Redis is unavailable (usually fail open with a local fallback limiter, so the limiter itself is not a single point of failure).
- **Latency:** an extra Redis call per request. Reduce with local pre-limits, batching tokens ("take 10 at a time"), or doing it at the API gateway/ingress/mesh (NGINX, Envoy, Kong).
- **Clock:** use the Redis server time, not pod clocks.
- **Response:** `429` with `Retry-After` and `X-RateLimit-*` headers. Log/metric rejected counts per key.
- **Scale:** Redis Cluster shards by key; hot keys can still be a bottleneck.

_Module: Design & Patterns · Tags: design, rate-limit, distributed-systems_

### 122. Design a job scheduler or worker system in Go that runs on several Kubernetes pods without duplicate work.

**Short answer:** Decide the guarantee first: **at-least-once** (simple, requires idempotent jobs) or **exactly-once effect** (idempotency + dedup). Then choose a coordination method: a **queue** (best default), **database row locking** (`SELECT ... FOR UPDATE SKIP LOCKED`), or **leader election** (only one pod runs the scheduler).

```mermaid
flowchart LR
    API["API / cron"] --> DB[("jobs table or queue")]
    subgraph Pods
        W1["worker pod 1"]
        W2["worker pod 2"]
        W3["worker pod 3"]
    end
    DB -->|"claim job (SKIP LOCKED)"| W1
    DB --> W2
    DB --> W3
    W1 -->|"heartbeat / lease"| DB
```

**Pattern A: Postgres as a queue (small to medium scale)**

```sql
-- each worker atomically claims a few jobs
UPDATE jobs SET status = 'running', locked_until = now() + interval '5 minutes', attempts = attempts + 1
WHERE id IN (
  SELECT id FROM jobs
  WHERE status = 'queued' AND run_at <= now()
  ORDER BY run_at
  LIMIT 10
  FOR UPDATE SKIP LOCKED     -- other workers skip rows already locked
)
RETURNING id, payload;
```
- A crashed worker leaves `running` rows. A *reaper* resets rows whose `locked_until` passed back to `queued` (the **lease** idea).
- Retries with backoff, max attempts, then a `failed`/dead status.

**Pattern B: message broker** (Kafka/RabbitMQ/SQS/Azure Service Bus)
- Consumers in a group each get a share. Ack after success. DLQ for poison messages. Best for throughput.

**Pattern C: leader election for singleton work** (scheduled cron-style tasks)
- Use a Kubernetes **Lease** (`client-go` `leaderelection`) or a DB advisory lock. Only the leader schedules; if it dies, another pod takes over after the lease expires.
- Or use a Kubernetes `CronJob` (simplest if work is batch).

**Must-have properties**
1. **Idempotent handlers** (a job may run twice): use a dedup key, upserts, or "already processed" table in the same transaction.
2. **Leases + heartbeats** so stuck jobs get retried; make job duration < lease or extend the lease.
3. **Graceful shutdown:** on SIGTERM stop claiming, finish or release the current job.
4. **Backoff and DLQ**; metrics: queue depth, age of oldest job, success/fail, duration.
5. **Priorities / fairness** across tenants so one customer cannot starve others.
6. **Observability:** job id in logs/traces.

**Worker loop in Go (shape)**

```go
for {
	jobs, err := store.Claim(ctx, 10)
	if err != nil || len(jobs) == 0 {
		select {
		case <-time.After(time.Second):
		case <-ctx.Done():
			return
		}
		continue
	}
	for _, j := range jobs {
		pool <- struct{}{} // bounded concurrency
		go func() {
			defer func() { <-pool }()
			store.Finish(ctx, j.ID, run(ctx, j))
		}()
	}
}
```

_Module: Design & Patterns · Tags: design, distributed-systems, kubernetes_

### 123. Spot the concurrency bugs: what is wrong with these snippets?

**Short answer:** Interviewers often show short code and ask what is wrong. Train your eye on the same patterns: shared state without locks, goroutines that never finish, wrong channel ownership, and ignored errors.

**Bug 1: data race on a map and a counter**

```go
var stats = map[string]int{}

func handle(path string) {
	stats[path]++ // ❌ concurrent map write + non-atomic increment
}
```
Fix: guard with a `sync.Mutex`, or use per-key atomics, or a channel-owned map.

**Bug 2: goroutine leak (no receiver)**

```go
func first(urls []string) string {
	ch := make(chan string)
	for _, u := range urls {
		go func() { ch <- fetch(u) }() // ❌ all but the first block forever
	}
	return <-ch
}
```
Fix: `make(chan string, len(urls))` and/or pass a cancellable `ctx`.

**Bug 3: `WaitGroup.Add` inside the goroutine**

```go
go func() {
	wg.Add(1) // ❌ Wait() may already have returned
	defer wg.Done()
}()
wg.Wait()
```
Fix: call `Add` before `go`.

**Bug 4: closing a channel from the receiver, or twice**

```go
for v := range ch {
	if v == 0 {
		close(ch) // ❌ producer may still send, causing a panic
	}
}
```
Fix: the **sender** closes; use `done`/context to stop senders.

**Bug 5: lock copied by value**

```go
type Counter struct {
	mu sync.Mutex
	n  int
}

func (c Counter) Inc() { // ❌ value receiver copies the mutex
	c.mu.Lock()
	c.n++
	c.mu.Unlock()
}
```
Fix: pointer receiver. `go vet` reports "passes lock by value".

**Bug 6: ignoring the error from the group**

```go
var wg sync.WaitGroup
for _, id := range ids {
	wg.Add(1)
	go func() { defer wg.Done(); process(id) }() // ❌ errors vanish, unbounded goroutines
}
```
Fix: `errgroup` with `SetLimit`.

**Bug 7: `time.After` in a loop**

```go
for {
	select {
	case v := <-ch:
		handle(v)
	case <-time.After(time.Minute): // ❌ new timer each loop, held until it fires
	}
}
```
Fix: `time.NewTimer` + `Reset`, or a context with timeout.

**Bug 8: loop variable captured (before Go 1.22)**

```go
for _, v := range items {
	go func() { use(v) }() // ❌ all see the last v in Go < 1.22
}
```

**Bug 9: holding a lock while calling out**

```go
mu.Lock()
res := callRemoteService() // ❌ holds the lock during network I/O
mu.Unlock()
```

**How to present your answer:** name the bug class, explain the failure scenario in one sentence, show the fix, and mention the tool that finds it (`go vet`, `-race`, `goleak`).

_Module: Concurrency · Tags: concurrency, interview, gotchas_

### 124. Classic concurrency exercise: print odd and even numbers alternately with two goroutines.

**Short answer:** Two goroutines must take turns. Use two unbuffered channels as "it's your turn" signals, or one channel that passes the turn token back and forth. The exercise tests whether you can coordinate goroutines and shut them down cleanly.

```mermaid
sequenceDiagram
    participant M as main
    participant O as odd goroutine
    participant E as even goroutine
    M->>O: oddTurn <- struct{}
    O->>O: print 1
    O->>E: evenTurn <- struct{}
    E->>E: print 2
    E->>O: oddTurn <- struct{}
    O->>O: print 3
```

```go
package main

import (
	"fmt"
	"sync"
)

func main() {
	const max = 10
	oddTurn := make(chan struct{})
	evenTurn := make(chan struct{})
	var wg sync.WaitGroup
	wg.Add(2)

	go func() { // prints odd numbers
		defer wg.Done()
		for i := 1; i <= max; i += 2 {
			<-oddTurn // wait for my turn
			fmt.Println(i)
			if i+1 <= max {
				evenTurn <- struct{}{} // hand over
			}
		}
	}()

	go func() { // prints even numbers
		defer wg.Done()
		for i := 2; i <= max; i += 2 {
			<-evenTurn
			fmt.Println(i)
			if i+1 <= max {
				oddTurn <- struct{}{}
			}
		}
	}()

	oddTurn <- struct{}{} // start with odd
	wg.Wait()
}
// prints 1 2 3 ... 10, one per line
```

**Why it works:** each goroutine blocks on its own channel until the other one signals. Only one runs at a time, so output is strictly alternating. The checks `i+1 <= max` stop the last goroutine from sending to a partner that already finished (which would deadlock).

**Variations interviewers ask**
1. **Three goroutines** printing in a round-robin (A, B, C, A, B, C...): use a ring of three channels.
2. **Print in order from N workers:** give each result its index, collect, then print in order (or chain channels).
3. **Ping-pong** between two goroutines using one channel.
4. **Sequential output from parallel tasks:** a slice of result channels, read them in order.

```go
// ordered results from parallel work
res := make([]chan int, n)
for i := range res {
	res[i] = make(chan int, 1)
	go func() { res[i] <- compute(i) }()
}
for _, c := range res {
	fmt.Println(<-c) // always in order
}
```

**Interview tip:** talk through ownership (who closes, who waits) and what happens at the end. A solution that prints correctly but deadlocks at exit is a failed answer.

_Module: Concurrency · Tags: concurrency, interview, puzzle_

### 125. How do you do zero-downtime deployments and safe database migrations for a Go service?

**Short answer:** Combine a **rolling or canary deployment** (new pods start before old ones stop, gated by readiness probes, with graceful shutdown) with **backward-compatible database changes** (the *expand and contract* pattern) so old and new versions can run side by side.

```mermaid
flowchart LR
    A["1. Expand:<br/>add new column/table (nullable)"] --> B["2. Deploy app v2<br/>writes both old and new"]
    B --> C["3. Backfill<br/>old rows in batches"]
    C --> D["4. Deploy app v3<br/>reads new only"]
    D --> E["5. Contract:<br/>drop old column later"]
```

**Deployment side (Kubernetes)**
- `strategy: RollingUpdate` with `maxUnavailable: 0`, `maxSurge: 1` (or 25%).
- **Readiness probe** must only pass when the app can serve (DB connected, caches warm).
- **Graceful shutdown** on SIGTERM + a short `preStop` sleep so the pod leaves load balancers before it stops accepting connections (see the shutdown question).
- `PodDisruptionBudget` and multiple replicas across zones.
- Canary or blue-green (Argo Rollouts) with automatic rollback on error-rate/latency regression.
- Feature flags to decouple *deploy* from *release*.

**Database side: rules for safe migrations**

| Change | Unsafe way | Safe way |
| --- | --- | --- |
| Rename a column | `ALTER ... RENAME` (old pods break) | Add new column, dual-write, backfill, switch reads, drop old |
| Add a NOT NULL column | Add with NOT NULL and no default on a big table (locks) | Add nullable, backfill in batches, then add the constraint (`NOT VALID` + `VALIDATE`) |
| Add an index | `CREATE INDEX` (blocks writes) | `CREATE INDEX CONCURRENTLY` (PostgreSQL) |
| Drop a column | While old code still reads it | First ship code that no longer uses it, drop later |
| Big data change | One huge `UPDATE` | Batches with small transactions and sleeps |

**Process**
- Migrations are versioned files (`golang-migrate`, `goose`, `atlas`), reviewed like code, tested on a copy of production-size data.
- Run migrations as a **separate step/job** before the rollout, not in every pod's startup (many pods would race, and a slow migration would fail readiness).
- Migrations must be **backward-compatible with the version currently running** (N-1 rule), so a rollback of the app is safe.
- Keep a rollback plan; remember that data changes are harder to undo than code.

**API compatibility** matters too: tolerate unknown fields, add fields instead of changing them, version breaking changes, and keep consumers (mobile apps, other services) working during the rollout.

_Module: Tooling & Delivery · Tags: deployment, database, kubernetes, tech-lead_

### 126. How would you build a Kubernetes controller or operator in Go?

**Short answer:** A controller runs a **reconcile loop**: watch some Kubernetes objects, compare the **desired state** (the spec) with the **actual state**, and take actions to make them match. Operators package this with a **Custom Resource Definition (CRD)** so you can manage your own application kinds with `kubectl`. In Go you normally use **controller-runtime** (Kubebuilder or Operator SDK) on top of **client-go**.

```mermaid
flowchart LR
    U["kubectl apply (CR: MyApp)"] --> API["API server / etcd"]
    API -- "watch events" --> C["Controller (informer + work queue)"]
    C --> R["Reconcile(request)"]
    R -->|"read desired + actual"| API
    R -->|"create/update Deployments, Services..."| API
    R -->|"update .status"| API
```

```go
// Reconcile is called with the name of the object that changed.
func (r *MyAppReconciler) Reconcile(ctx context.Context, req ctrl.Request) (ctrl.Result, error) {
	var app v1.MyApp
	if err := r.Get(ctx, req.NamespacedName, &app); err != nil {
		return ctrl.Result{}, client.IgnoreNotFound(err) // deleted: nothing to do
	}

	// desired: a Deployment with app.Spec.Replicas
	dep := desiredDeployment(&app)
	if err := ctrl.SetControllerReference(&app, dep, r.Scheme); err != nil {
		return ctrl.Result{}, err
	}

	// create or update so the actual state matches
	_, err := ctrl.CreateOrUpdate(ctx, r.Client, dep, func() error {
		dep.Spec.Replicas = &app.Spec.Replicas
		return nil
	})
	if err != nil {
		return ctrl.Result{}, err // returning an error requeues with backoff
	}

	app.Status.Ready = true
	return ctrl.Result{}, r.Status().Update(ctx, &app)
}
```

**Key principles**
1. **Level-triggered, not edge-triggered:** reconcile looks at the *current* state, not at "what event happened". Missing an event is not fatal.
2. **Idempotent:** running reconcile ten times gives the same result.
3. **Owner references** so child objects are garbage-collected with the parent.
4. **Status subresource** for reporting; **finalizers** for cleanup of external resources.
5. **Leader election** so only one controller instance acts (run 2+ replicas for HA).
6. **Requeue** with `RequeueAfter` for periodic checks.
7. Use **informers/caches** (not repeated API calls) to read objects efficiently.

**When to write an operator:** you manage stateful or complex software (databases, message brokers, fleet configuration) and want automation like upgrades, backups, scaling encoded in code. Do not write one if a Helm chart or a simple Deployment is enough.

_Module: Design & Patterns · Tags: kubernetes, operators, client-go_

---

## Resources

Where to read more at the source. Official docs and references come first.

**Official docs**

- [Go documentation](https://go.dev/doc/) — Official starting point: tutorials, guides, the FAQ and release notes. _(beginner)_
- [Diagnostics](https://go.dev/doc/diagnostics) — Profiling, tracing, debugging and runtime statistics: which tool answers which question. _(intermediate)_
- [A Guide to the Go Garbage Collector](https://go.dev/doc/gc-guide) — How the GC works and how GOGC and GOMEMLIMIT tune it. _(advanced)_

**Reference**

- [Effective Go](https://go.dev/doc/effective_go) — The classic guide to writing idiomatic Go: naming, interfaces, concurrency, errors. _(intermediate)_
- [The Go Programming Language Specification](https://go.dev/ref/spec) — The exact rules of the language. Use it to settle arguments about slices, method sets or conversions. _(advanced)_
- [The Go Memory Model](https://go.dev/ref/mem) — What one goroutine is guaranteed to see of another's writes (happens-before). _(advanced)_
- [Standard library reference (pkg.go.dev)](https://pkg.go.dev/std) — Searchable docs for every standard package with runnable examples. _(intermediate)_
- [Go Modules Reference](https://go.dev/ref/mod) — go.mod, versions, replace, workspaces and private modules in detail. _(intermediate)_
- [Go Code Review Comments](https://go.dev/wiki/CodeReviewComments) — The checklist Go reviewers use: naming, errors, interfaces, concurrency. _(intermediate)_
- [Uber Go Style Guide](https://github.com/uber-go/guide/blob/master/style.md) — A widely used team style guide with reasons for each rule. _(intermediate)_

**Tutorial**

- [A Tour of Go](https://go.dev/tour/) — Interactive, in-browser walkthrough of the language basics. The best first hour with Go. _(beginner)_
- [Go by Example](https://gobyexample.com) — Short annotated programs for each feature: goroutines, channels, JSON, testing. _(beginner)_
- [Tutorial: Getting started with fuzzing](https://go.dev/doc/tutorial/fuzz) — Write your first fuzz test with the built-in fuzzer. _(intermediate)_

**Article**

- [The Go Blog](https://go.dev/blog/) — Articles by the Go team: design decisions, new features, patterns. _(intermediate)_
- [Go Concurrency Patterns: Pipelines and cancellation](https://go.dev/blog/pipelines) — Pipelines, fan-out/fan-in and stopping goroutines cleanly. _(intermediate)_
- [Working with Errors in Go 1.13](https://go.dev/blog/go1.13-errors) — How wrapping with %w, errors.Is and errors.As work and why they exist. _(intermediate)_
- [An Introduction to Generics](https://go.dev/blog/intro-generics) — What generics are, constraints, and when to use them. _(intermediate)_
- [Profiling Go Programs](https://go.dev/blog/pprof) — A worked pprof session: find and fix a CPU hot spot. _(intermediate)_
- [Structured logging with slog](https://go.dev/blog/slog) — The standard structured logger introduced in Go 1.21. _(intermediate)_
