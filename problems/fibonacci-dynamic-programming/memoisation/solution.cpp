// Fibonacci, approach 2: memoisation (top-down dynamic programming). Same recursion, but every answer is remembered.
// long long holds values up to F(92); int would overflow at F(47).
#include <iostream>
#include <unordered_map>
#include <vector>

static long long solve(int k, std::unordered_map<int, long long>& memo) {
    if (k < 2) return k; // 1. base cases
    auto it = memo.find(k);
    if (it != memo.end()) return it->second; // 2. already solved: reuse the answer, skip the whole subtree
    long long value = solve(k - 1, memo) + solve(k - 2, memo); // 3. solve each subproblem at most once
    memo[k] = value; // 4. remember it for the next caller
    return value;
}

long long fib(int n) {
    std::unordered_map<int, long long> memo;
    return solve(n, memo);
}

int main() {
    std::vector<int> cases = {0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 15, 20, 25, 30, 35, 40, 45, 46, 47, 50};
    for (int n : cases) std::cout << fib(n) << "\n";
}
