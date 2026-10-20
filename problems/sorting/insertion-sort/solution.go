// Insertion sort: grow a sorted prefix by sliding each new value into place.
package main

import (
	"fmt"
	"strings"
)

var testCases = [][]int{
	{7}, {1, 2, 3, 4, 5}, {}, {9, 7, 5, 3, 1}, {4, 2, 4, 1, 2, 4},
	{-3, 5, -1, 0, -8, 2}, {29, -4, 15, 0, 8, -17, 42, 15, 3, -4, 100, 7},
}

func insertionSort(input []int) []int {
	a := append([]int(nil), input...) // copy: slices share memory
	for i := 1; i < len(a); i++ {     // 1. a[:i] is sorted; take the next value
		key := a[i]
		j := i - 1
		// 2. Shift bigger values one slot right. Strict ">" stops at equals (stable).
		for j >= 0 && a[j] > key {
			a[j+1] = a[j]
			j--
		}
		a[j+1] = key // 3. drop the value into the gap
	}
	return a
}

func main() {
	for _, c := range testCases {
		fmt.Println(strings.Trim(fmt.Sprint(insertionSort(c)), "[]"))
	}
}
