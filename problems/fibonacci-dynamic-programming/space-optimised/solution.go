// Fibonacci, approach 4: space-optimised dynamic programming. Each answer needs only the previous two, so keep just those.
package main

import "fmt"

func fib(n int) int64 {
	var previous, current int64 = 0, 1 // F(i - 1) and F(i), starting as F(0) and F(1)
	for i := 0; i < n; i++ {
		previous, current = current, previous+current // 1. slide the two-number window one step to the right
	}
	return previous // 2. after n slides, previous holds F(n); this also handles n = 0
}

func main() {
	cases := []int{0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 15, 20, 25, 30, 35, 40, 45, 46, 47, 50}
	for _, n := range cases {
		fmt.Println(fib(n))
	}
}
