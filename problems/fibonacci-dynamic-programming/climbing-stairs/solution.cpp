// Climbing stairs: how many different ways can you climb n stairs taking 1 or 2 steps at a time?
// Same recurrence as Fibonacci: ways(n) = ways(n - 1) + ways(n - 2), because the last move was a 1-step or a 2-step.
// long long holds the answer up to n = 91; int would overflow at n = 46.
#include <iostream>
#include <vector>

long long climbStairs(int n) {
    long long waysToPrevious = 1; // 1. ways(0) = 1: standing at the bottom is one way (do nothing)
    long long waysToCurrent = 1; // ways(1) = 1: a single 1-step
    for (int stair = 2; stair <= n; stair++) {
        long long next = waysToPrevious + waysToCurrent; // 2. arrive from one or two stairs below
        waysToPrevious = waysToCurrent;
        waysToCurrent = next;
    }
    return waysToCurrent; // 3. ways(n); for n = 0 or 1 the loop does not run and the answer is 1
}

int main() {
    std::vector<int> cases = {0, 1, 2, 3, 4, 5, 6, 7, 8, 10, 15, 20, 30, 45, 50};
    for (int n : cases) std::cout << climbStairs(n) << "\n";
}
