// Fibonacci, approach 2: memoisation (top-down dynamic programming). Same recursion, but every answer is remembered.
package main

import "fmt"

func fib(n int) int64 {
	memo := make(map[int]int64) // n -> F(n), filled while we recurse
	var solve func(k int) int64
	solve = func(k int) int64 {
		if k < 2 { // 1. base cases
			return int64(k)
		}
		if v, ok := memo[k]; ok { // 2. already solved: reuse the answer, skip the whole subtree
			return v
		}
		v := solve(k-1) + solve(k-2) // 3. solve each subproblem at most once
		memo[k] = v                  // 4. remember it for the next caller
		return v
	}
	return solve(n)
}

func main() {
	cases := []int{0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 15, 20, 25, 30, 35, 40, 45, 46, 47, 50}
	for _, n := range cases {
		fmt.Println(fib(n))
	}
}
