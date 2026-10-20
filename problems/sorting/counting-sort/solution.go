// Counting sort: count each value, then rebuild the output from the counts.
// Needs a small value range (max - min), because it allocates one counter per possible value.
package main

import (
	"fmt"
	"strings"
)

var testCases = [][]int{
	{7}, {1, 2, 3, 4, 5}, {}, {9, 7, 5, 3, 1}, {4, 2, 4, 1, 2, 4},
	{-3, 5, -1, 0, -8, 2}, {29, -4, 15, 0, 8, -17, 42, 15, 3, -4, 100, 7},
}

func countingSort(input []int) []int {
	if len(input) == 0 {
		return []int{}
	}
	// 1. Find the range. low is the offset that lets negative numbers use index 0 and up.
	low, high := input[0], input[0]
	for _, x := range input {
		low, high = min(low, x), max(high, x) // min and max are built in since Go 1.21
	}
	counts := make([]int, high-low+1)
	for _, x := range input { // 2. count occurrences
		counts[x-low]++
	}
	// 3. Prefix sums: counts[v] becomes the position just after the last v in the output.
	for v := 1; v < len(counts); v++ {
		counts[v] += counts[v-1]
	}
	out := make([]int, len(input))
	for i := len(input) - 1; i >= 0; i-- { // 4. walk backwards so equal values keep their input order (stable)
		counts[input[i]-low]--
		out[counts[input[i]-low]] = input[i]
	}
	return out
}

func main() {
	for _, c := range testCases {
		fmt.Println(strings.Trim(fmt.Sprint(countingSort(c)), "[]"))
	}
}
