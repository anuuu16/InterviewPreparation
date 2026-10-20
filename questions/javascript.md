# JavaScript

[← Back to index](../README.md) · [⭐ Favorites](favorites.md)

4 questions · 0 favorites

## Contents

**Basic**

- [1. What is the difference between `let`, `const` and `var`?](#1-what-is-the-difference-between-let-const-and-var)
- [2. What is the difference between `==` and `===`?](#2-what-is-the-difference-between--and-)

**Intermediate**

- [3. What is a closure?](#3-what-is-a-closure)

**Advanced**

- [4. Explain the event loop.](#4-explain-the-event-loop)

## Basic

### 1. What is the difference between `let`, `const` and `var`?

`var` is function-scoped and hoisted (initialised as `undefined`). `let` and `const` are block-scoped and live in the temporal dead zone until declared. `const` prevents reassignment of the binding, not mutation of the value.

_Tags: scope_

### 2. What is the difference between `==` and `===`?

`==` coerces types before comparing (`0 == '0'` is true); `===` compares value and type with no coercion. Prefer `===`.

_Tags: types_

## Intermediate

### 3. What is a closure?

A function that retains access to variables from its enclosing lexical scope even after that outer function has returned. Used for private state, factories, and callbacks.

_Tags: functions_

## Advanced

### 4. Explain the event loop.

JS runs on one thread with a call stack. Async work is handled by the host (timers, I/O) which queues callbacks. After the stack empties, the loop drains the microtask queue (promises, `queueMicrotask`) fully, then takes one macrotask (timers, I/O), and repeats.

_Tags: async_
