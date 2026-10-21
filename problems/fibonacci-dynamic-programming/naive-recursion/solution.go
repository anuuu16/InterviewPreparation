// Fibonacci, approach 1: naive recursion. Direct translation of the definition. Very slow: it repeats the same work.
// F(0) = 0, F(1) = 1, F(n) = F(n - 1) + F(n - 2). int64 holds values up to F(92).
package main

import "fmt"

func fib(n int) int64 {
	if n < 2 { // 1. base cases: F(0) = 0 and F(1) = 1
		return int64(n)
	}
	return fib(n-1) + fib(n-2) // 2. two smaller problems, solved from scratch every time
}

func main() {
	cases := []int{0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 15, 20, 25, 27, 30}
	for _, n := range cases {
		fmt.Println(fib(n))
	}
}
