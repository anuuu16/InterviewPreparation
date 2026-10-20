# React

[← Back to index](../README.md) · [⭐ Favorites](favorites.md)

12 questions · 0 favorites

## Basic

### What is the virtual DOM and how does reconciliation work?

React keeps a lightweight tree of JS objects describing the UI. On each render it builds a new tree, **diffs** it against the previous one, and applies only the minimal DOM changes.

Diffing heuristics:
- Elements of different types produce different subtrees (old one is unmounted, new one mounted).
- Lists are matched by `key`; stable keys let React move items instead of re-creating them.
- Same type + same position means the node is updated in place.

_Tags: fundamentals_

### Why do list items need a stable `key`, and why is the array index a bad key?

`key` is how React identifies an item across renders. With index keys, inserting/removing/reordering shifts every index, so React reuses the wrong component instances, causing wrong state (e.g. input text sticking to the wrong row) and wasted renders. Use a stable unique id from the data.

_Tags: lists_

### Controlled vs uncontrolled components?

- **Controlled:** form value lives in React state; `value` + `onChange` drive the input. Single source of truth, easy validation.
- **Uncontrolled:** the DOM keeps the value; you read it via a `ref` (or `FormData`) when needed. Less re-rendering, simpler for big forms or file inputs.

_Tags: forms_

### How do `useEffect` dependencies work, and what is cleanup for?

The effect runs after render, and re-runs when any value in the dependency array changed (`Object.is`). `[]` runs once on mount; no array runs after every render. The returned cleanup runs before the next run and on unmount (unsubscribe, clear timers, abort fetches).

Common bug: stale closures from missing deps. Fix by adding the dep, using the functional setter (`setX(x => x + 1)`), or a ref. Don't silence the lint rule.

_Tags: hooks_

## Intermediate

### When do `useMemo`, `useCallback` and `React.memo` actually help?

They help only when a re-render is measurably expensive or when referential equality matters:
- `React.memo` skips re-rendering a child if props are shallow-equal.
- `useCallback`/`useMemo` keep function/object identity stable so memoized children and effect deps don't change every render.

They cost memory and comparisons, so don't wrap everything. Profile first. Often better: move state down, lift content up (`children`), or split components.

_Tags: performance, hooks_

### How do you avoid unnecessary re-renders with Context?

Every consumer re-renders when the context value identity changes. Mitigations:
- Memoize the provider value (`useMemo`).
- Split contexts (state vs dispatch, or by domain).
- Keep fast-changing state out of context (use a store with selectors such as Redux, Zustand or `useSyncExternalStore`).
- Wrap expensive children in `React.memo`.

_Tags: context, performance_

### Redux vs Context vs local state: how do you decide?

- **Local state** by default.
- **Context** for low-frequency, app-wide values (theme, auth user, locale).
- **Redux (Toolkit)** when state is large, shared, updated often, needs devtools/time-travel, middleware, or predictable patterns across a big team.
- **Server state** (React Query/RTK Query) for fetched data: caching, dedup, refetch, invalidation, instead of hand-rolling in Redux.

_Tags: state, redux_

### Explain how React 18 concurrent features work (`useTransition`, `useDeferredValue`, Suspense).

Rendering became interruptible. Updates can be marked **non-urgent**:
- `useTransition` / `startTransition`: keeps the UI responsive (typing) while a heavy update (filtering a big list) renders in the background and can be discarded.
- `useDeferredValue`: gives a lagging copy of a value for expensive children.
- **Suspense** lets a subtree show a fallback while data/code loads, and works with streaming SSR.

Rendering must be pure, because React may call it multiple times or throw work away.

_Tags: react-18, performance_

### How would you structure and optimise a large React + TypeScript app (e.g. an Nx monorepo)?

- **Nx/monorepo:** apps + shared libs (ui, data-access, utils, feature libs) with enforced module boundaries (tags and lint rules); affected-only builds/tests and remote caching in CI.
- **Code splitting:** `React.lazy` + route-level splitting, bundle analysis, tree-shakeable imports.
- **Types:** strict TS, shared API types (generated from OpenAPI/GraphQL), discriminated unions for UI states.
- **Perf:** virtualization for long lists (react-window), image/asset optimisation, memoization where profiled, Web Vitals tracking (Datadog RUM).
- **Quality:** component tests (RTL), E2E (Selenium/Cypress/Playwright), visual regression (Percy).

_Tags: architecture, typescript, nx_

## Advanced

### What causes a stale closure in hooks, and how do you fix it?

A function captures the values from the render it was created in. If an effect/timer/event listener lives longer than that render, it sees old state.

```js
useEffect(() => {
  const id = setInterval(() => setCount(count + 1), 1000); // stuck on initial count
  return () => clearInterval(id);
}, []);
```
Fixes: functional update `setCount(c => c + 1)`, add the dependency, or keep the latest value in a `ref` that's updated each render.

_Tags: hooks, closures_

### How does Server-Side Rendering / hydration work, and what are the pitfalls?

The server renders HTML (fast first paint, SEO), the client then **hydrates**: React attaches event handlers to the existing markup, expecting identical output.

Pitfalls: hydration mismatches (using `window`, `Date.now()`, `Math.random()` during render), large JS before interactivity, and duplicate data fetching. Mitigations: `useEffect` for browser-only work, streaming SSR + Suspense, selective hydration, and Server Components to ship less JS.

_Tags: ssr, react-18_

### How do you test React components and what do you avoid?

Test behaviour as the user sees it: React Testing Library (`getByRole`, `userEvent`), mock the network boundary (MSW) rather than internal modules, and assert on visible output. Avoid testing implementation details (state names, internals, snapshot overuse). Pyramid: many unit/component tests, fewer integration tests, a few E2E flows (Selenium/Cypress on BrowserStack for cross-browser), plus visual diffs for UI regressions.

_Tags: testing_
