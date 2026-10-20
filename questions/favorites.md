# ⭐ Favorites

[← Back to index](../README.md)

## [JavaScript](javascript.md)

### What is the difference between `let`, `const` and `var`?

**Short answer:** `var` is function scoped and can be used before its line (it is `undefined`). `let` and `const` are block scoped and cannot be used before their line. `const` also forbids re-assigning the name. Use `const` by default, `let` when you must re-assign, and avoid `var`.

| Feature | `var` | `let` | `const` |
| --- | --- | --- | --- |
| Scope | function | block | block |
| Re-assign | yes | yes | no |
| Re-declare in same scope | yes | no | no |
| Before the declaration line | `undefined` | error (TDZ) | error (TDZ) |

```js
function demo() {
  if (true) {
    var a = 1;   // lives in the whole function
    let b = 2;   // lives only inside this block
  }
  console.log(a);          // prints: 1
  console.log(typeof b);   // prints: undefined (b is not visible here)
}
demo();

const user = { name: "Asha" };
user.name = "Ravi";        // fine: the object is changed, not the binding
// user = {};              // ❌ TypeError: Assignment to constant variable
console.log(user.name);    // prints: Ravi
```

**Gotcha:** `const` does not make a value immutable. It only stops you from pointing the name at something else. Use `Object.freeze` or immutable updates for the value.

**Interview tip:** The classic follow-up is the loop with `setTimeout`. With `var` all callbacks print the last value, with `let` each loop turn gets a fresh variable. See the closures in loops question.

_Module: Functions & Scope · Tags: variables, scope, hoisting_
