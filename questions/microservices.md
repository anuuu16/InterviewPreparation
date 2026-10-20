# Microservices

[← Back to index](../README.md) · [⭐ Favorites](favorites.md)

12 questions · 0 favorites

## Basic

### Monolith vs microservices: when would you NOT choose microservices?

Microservices buy independent deployment/scaling and team autonomy at the price of distributed-systems complexity (network failures, data consistency, observability, deployment tooling). Prefer a (modular) monolith when the team is small, the domain is unclear, or you lack CI/CD and monitoring maturity. Split along business boundaries (bounded contexts) when team/scale pain actually appears.

_Tags: architecture_

### Sync (REST/gRPC) vs async (message broker) communication: trade-offs?

- **Sync:** simple request/response and immediate result, but creates temporal coupling and cascading failures; needs timeouts, retries, circuit breakers.
- **Async (Kafka/RabbitMQ/Service Bus):** decoupled, buffers load spikes, enables event-driven flows; but eventual consistency, harder debugging, need idempotency and ordering strategy.

gRPC: binary, typed contracts (protobuf), streaming, good for internal service-to-service calls.

_Tags: communication_

### What is an API Gateway and what does it do?

A single entry point in front of services: routing, authentication, rate limiting, TLS termination, request aggregation, caching, and protocol translation. Related: **BFF** (Backend-for-Frontend), a gateway tailored per client type (web, mobile, seat-back screen). Risk: becoming a bottleneck or a new monolith; keep business logic out of it.

_Tags: gateway_

## Intermediate

### How do you handle distributed transactions? Explain the Saga pattern.

Avoid 2PC across services. A **saga** is a sequence of local transactions, each publishing an event/command to trigger the next; on failure, run **compensating actions** to undo earlier steps.
- **Choreography:** services react to events (simple, but flow is hard to see).
- **Orchestration:** a coordinator drives steps (clear flow, central point to maintain).

Needs idempotent steps and persistent saga state.

_Tags: data, saga_

### What are the Outbox pattern and idempotency, and why do they matter?

Problem: updating the DB **and** publishing an event isn't atomic. **Outbox:** write the event to an `outbox` table in the same DB transaction; a relay (poller/CDC like Debezium) publishes it reliably. Delivery is at-least-once, so consumers must be **idempotent**: dedupe by message id / idempotency key, or make operations naturally repeatable (upserts).

_Tags: messaging, reliability_

### Explain the Circuit Breaker, retry with backoff, timeout and bulkhead patterns.

- **Timeout:** never wait forever; set per-call deadlines.
- **Retry with exponential backoff + jitter:** only for idempotent/transient failures; cap attempts to avoid retry storms.
- **Circuit breaker:** after N failures, "open" and fail fast; probe via half-open to recover.
- **Bulkhead:** isolate resources (pools) per dependency so one slow service can't exhaust all threads.

Typically provided by a library (Polly, resilience4j, Go libs) or a service mesh.

_Tags: resilience_

### How do you manage data across microservices? (database per service, CQRS, event sourcing)

Each service owns its data; others access it via API/events, never the shared DB. Cross-service reads: API composition or **CQRS** read models fed by events. **Event sourcing** stores state as an append-only event log (great audit/replay, but complex). Accept **eventual consistency** and design the UX and invariants for it.

_Tags: data, cqrs_

### How do you do observability in a microservice system?

The three pillars plus correlation:
- **Logs:** structured (JSON) with a **correlation/trace id** propagated through headers.
- **Metrics:** RED (rate, errors, duration) per service, USE for resources, SLIs/SLOs and alerting.
- **Distributed tracing:** OpenTelemetry to follow a request across services.

Tools: Datadog APM/dashboards/monitors. Add health endpoints (liveness/readiness) and synthetic checks.

_Tags: observability, datadog_

### API versioning and contract evolution without breaking consumers?

Prefer **backward-compatible** changes: add optional fields, don't remove/rename. Version via URL/header when breaking changes are unavoidable and run versions side by side with deprecation windows. Use consumer-driven **contract tests** (Pact) and schema registries (protobuf/Avro compatibility rules) in CI.

_Tags: api, contracts_

## Advanced

### How do you design for high availability and handle a cascading failure?

Redundancy across zones, stateless services with autoscaling, health checks, graceful degradation (serve cached/partial data), load shedding, rate limits, timeouts + circuit breakers to contain failure, queue buffering, and capacity headroom. Test it: chaos experiments, load tests, game days. Post-incident: blameless review and action items.

_Tags: reliability_

### Service mesh (Istio/Linkerd): what problem does it solve and what does it cost?

Sidecar (or ambient) proxies handle mTLS, retries/timeouts, traffic shifting (canary), policy and telemetry uniformly, with no library per language. Costs: extra latency/resources, operational complexity, steep learning curve. Worth it with many services/polyglot stacks and strict security needs.

_Tags: service-mesh, kubernetes_

### Walk me through how you would design a connected in-flight entertainment platform (FlytEDGE-style).

A good structure for a system-design answer:
1. **Requirements:** content catalogue and streaming to seatbacks/devices, intermittent satellite connectivity, per-airline branding, analytics, thousands of aircraft.
2. **Cloud <-> aircraft:** cloud publishes content/config; an onboard server syncs when connected, with delta sync and resumable transfers; offline-first behaviour onboard.
3. **Services:** catalogue, personalisation, playback/entitlement, telemetry ingestion, config/feature flags; React front-ends on a shared Nx monorepo.
4. **Data:** per-service stores, event stream for analytics, caches/CDN for media.
5. **Ops:** Kubernetes on Azure, GitLab CI/CD, Datadog, staged rollouts/canaries, automated cross-browser testing.
6. **Trade-offs:** consistency vs availability when offline, bandwidth costs, security of aircraft networks.

Adapt this to what you really built and the numbers you can quote.

_Tags: system-design, project_
