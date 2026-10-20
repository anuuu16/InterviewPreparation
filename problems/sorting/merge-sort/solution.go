// Merge sort: split in half, sort each half, merge the two sorted halves.
package main

import (
	"fmt"
	"strings"
)

var testCases = [][]int{
	{7}, {1, 2, 3, 4, 5}, {}, {9, 7, 5, 3, 1}, {4, 2, 4, 1, 2, 4},
	{-3, 5, -1, 0, -8, 2}, {29, -4, 15, 0, 8, -17, 42, 15, 3, -4, 100, 7},
}

func mergeSort(input []int) []int {
	if len(input) <= 1 { // 1. base case: 0 or 1 items is already sorted
		return append([]int(nil), input...)
	}
	mid := len(input) / 2 // 2. split in the middle
	// 3. Sort each half. Sub-slices share memory, but we only read them and return new slices.
	left := mergeSort(input[:mid])
	right := mergeSort(input[mid:])
	return merge(left, right)
}

func merge(left, right []int) []int {
	out := make([]int, 0, len(left)+len(right)) // the O(n) extra space lives here
	i, j := 0, 0
	// 4. Repeatedly take the smaller front item. "<=" takes from the left on ties (stable).
	for i < len(left) && j < len(right) {
		if left[i] <= right[j] {
			out = append(out, left[i])
			i++
		} else {
			out = append(out, right[j])
			j++
		}
	}
	// 5. One side ran out: the rest of the other side is already sorted.
	out = append(out, left[i:]...)
	return append(out, right[j:]...)
}

func main() {
	for _, c := range testCases {
		fmt.Println(strings.Trim(fmt.Sprint(mergeSort(c)), "[]"))
	}
}
