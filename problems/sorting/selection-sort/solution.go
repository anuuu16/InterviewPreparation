// Selection sort: find the smallest remaining value and move it to the front.
package main

import (
	"fmt"
	"strings"
)

var testCases = [][]int{
	{7}, {1, 2, 3, 4, 5}, {}, {9, 7, 5, 3, 1}, {4, 2, 4, 1, 2, 4},
	{-3, 5, -1, 0, -8, 2}, {29, -4, 15, 0, 8, -17, 42, 15, 3, -4, 100, 7},
}

func selectionSort(input []int) []int {
	a := append([]int(nil), input...) // copy: slices share memory
	for i := 0; i < len(a)-1; i++ {   // 1. a[:i] is already final
		smallest := i
		for j := i + 1; j < len(a); j++ { // 2. scan the unsorted part for the smallest
			if a[j] < a[smallest] {
				smallest = j
			}
		}
		// 3. One swap per pass. This long-distance swap is why it is not stable.
		a[i], a[smallest] = a[smallest], a[i]
	}
	return a
}

func main() {
	for _, c := range testCases {
		fmt.Println(strings.Trim(fmt.Sprint(selectionSort(c)), "[]"))
	}
}
