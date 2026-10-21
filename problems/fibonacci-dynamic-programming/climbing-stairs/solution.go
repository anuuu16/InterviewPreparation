// Climbing stairs: how many different ways can you climb n stairs taking 1 or 2 steps at a time?
// Same recurrence as Fibonacci: ways(n) = ways(n - 1) + ways(n - 2), because the last move was a 1-step or a 2-step.
package main

import "fmt"

func climbStairs(n int) int64 {
	var waysToPrevious, waysToCurrent int64 = 1, 1 // 1. ways(0) = 1 (do nothing) and ways(1) = 1 (one 1-step)
	for stair := 2; stair <= n; stair++ {
		waysToPrevious, waysToCurrent = waysToCurrent, waysToPrevious+waysToCurrent // 2. arrive from one or two stairs below
	}
	return waysToCurrent // 3. ways(n); for n = 0 or 1 the loop does not run and the answer is 1
}

func main() {
	cases := []int{0, 1, 2, 3, 4, 5, 6, 7, 8, 10, 15, 20, 30, 45, 50}
	for _, n := range cases {
		fmt.Println(climbStairs(n))
	}
}
