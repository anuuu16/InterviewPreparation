// Fibonacci, approach 2: memoisation (top-down dynamic programming). Same recursion, but every answer is remembered.
// long holds values up to F(92); int would overflow at F(47).
import java.util.HashMap;
import java.util.Map;

public class Main {
    static long fib(int n) {
        return solve(n, new HashMap<>());
    }

    static long solve(int k, Map<Integer, Long> memo) {
        if (k < 2) return k; // 1. base cases
        Long known = memo.get(k);
        if (known != null) return known; // 2. already solved: reuse the answer, skip the whole subtree
        long value = solve(k - 1, memo) + solve(k - 2, memo); // 3. solve each subproblem at most once
        memo.put(k, value); // 4. remember it for the next caller
        return value;
    }

    public static void main(String[] args) {
        int[] cases = {0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 15, 20, 25, 30, 35, 40, 45, 46, 47, 50};
        for (int n : cases) System.out.println(fib(n));
    }
}
