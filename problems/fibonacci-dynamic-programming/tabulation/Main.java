// Fibonacci, approach 3: tabulation (bottom-up dynamic programming). Fill a table from the smallest subproblem upwards.
// long holds values up to F(92); int would overflow at F(47).
public class Main {
    static long fib(int n) {
        if (n < 2) return n; // 1. tiny inputs need no table
        long[] table = new long[n + 1]; // 2. table[i] will hold F(i); the default value is 0
        table[1] = 1;
        for (int i = 2; i <= n; i++) {
            table[i] = table[i - 1] + table[i - 2]; // 3. both smaller answers are already in the table
        }
        return table[n]; // 4. the answer is the last cell
    }

    public static void main(String[] args) {
        int[] cases = {0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 15, 20, 25, 30, 35, 40, 45, 46, 47, 50};
        for (int n : cases) System.out.println(fib(n));
    }
}
