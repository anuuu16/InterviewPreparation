// Fibonacci, approach 4: space-optimised dynamic programming. Each answer needs only the previous two, so keep just those.
// long holds values up to F(92); int would overflow at F(47).
static long Fib(int n)
{
    long previous = 0; // F(i - 1), starting as F(0)
    long current = 1; // F(i), starting as F(1)
    for (int i = 0; i < n; i++)
    {
        (previous, current) = (current, previous + current); // 1. slide the two-number window one step to the right
    }
    return previous; // 2. after n slides, previous holds F(n); this also handles n = 0
}

int[] cases = { 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 15, 20, 25, 30, 35, 40, 45, 46, 47, 50 };

foreach (int n in cases) Console.WriteLine(Fib(n));
