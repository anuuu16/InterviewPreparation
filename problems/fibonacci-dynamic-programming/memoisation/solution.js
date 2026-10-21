// Fibonacci, approach 2: memoisation (top-down dynamic programming). Same recursion, but every answer is remembered.
// Numbers are exact up to F(78); beyond that use BigInt.
function fib(n) {
  const memo = new Map(); // n -> F(n), filled while we recurse
  function solve(k) {
    if (k < 2) return k; // 1. base cases
    if (memo.has(k)) return memo.get(k); // 2. already solved: reuse the answer, skip the whole subtree
    const value = solve(k - 1) + solve(k - 2); // 3. solve each subproblem at most once
    memo.set(k, value); // 4. remember it for the next caller
    return value;
  }
  return solve(n);
}

const cases = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 15, 20, 25, 30, 35, 40, 45, 46, 47, 50];

for (const n of cases) console.log(String(fib(n)));
