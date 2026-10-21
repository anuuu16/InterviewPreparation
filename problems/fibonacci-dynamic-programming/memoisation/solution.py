"""Fibonacci, approach 2: memoisation (top-down dynamic programming). Same recursion, but every answer is remembered.

The standard library can do this for you: put @functools.cache on the naive function.
"""


def fib(n):
    memo = {}  # n -> F(n), filled while we recurse

    def solve(k):
        if k < 2:  # 1. base cases
            return k
        if k in memo:  # 2. already solved: reuse the answer, skip the whole subtree
            return memo[k]
        memo[k] = solve(k - 1) + solve(k - 2)  # 3. solve each subproblem at most once, 4. and remember it
        return memo[k]

    return solve(n)

CASES = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 15, 20, 25, 30, 35, 40, 45, 46, 47, 50]

for n in CASES:
    print(fib(n))
