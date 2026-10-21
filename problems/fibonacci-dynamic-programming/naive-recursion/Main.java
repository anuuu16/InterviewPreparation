// Fibonacci, approach 1: naive recursion. Direct translation of the definition. Very slow: it repeats the same work.
// F(0) = 0, F(1) = 1, F(n) = F(n - 1) + F(n - 2). long holds values up to F(92); int would overflow at F(47).
public class Main {
    static long fib(int n) {
        if (n < 2) return n; // 1. base cases: F(0) = 0 and F(1) = 1
        return fib(n - 1) + fib(n - 2); // 2. two smaller problems, solved from scratch every time
    }

    public static void main(String[] args) {
        int[] cases = {0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 15, 20, 25, 27, 30};
        for (int n : cases) System.out.println(fib(n));
    }
}
