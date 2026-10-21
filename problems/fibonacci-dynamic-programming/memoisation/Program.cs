// Fibonacci, approach 2: memoisation (top-down dynamic programming). Same recursion, but every answer is remembered.
// long holds values up to F(92); int would overflow at F(47).
static long Fib(int n)
{
    var memo = new Dictionary<int, long>(); // n -> F(n), filled while we recurse

    long Solve(int k)
    {
        if (k < 2) return k; // 1. base cases
        if (memo.TryGetValue(k, out long known)) return known; // 2. already solved: reuse the answer
        long value = Solve(k - 1) + Solve(k - 2); // 3. solve each subproblem at most once
        memo[k] = value; // 4. remember it for the next caller
        return value;
    }

    return Solve(n);
}

int[] cases = { 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 15, 20, 25, 30, 35, 40, 45, 46, 47, 50 };

foreach (int n in cases) Console.WriteLine(Fib(n));
