// Quick sort: partition around a pivot, then sort the two sides.
package main

import (
	"fmt"
	"strings"
)

var testCases = [][]int{
	{7}, {1, 2, 3, 4, 5}, {}, {9, 7, 5, 3, 1}, {4, 2, 4, 1, 2, 4},
	{-3, 5, -1, 0, -8, 2}, {29, -4, 15, 0, 8, -17, 42, 15, 3, -4, 100, 7},
}

func quickSort(input []int) []int {
	a := append([]int(nil), input...) // sort a copy in place
	sort(a, 0, len(a)-1)
	return a
}

func sort(a []int, lo, hi int) {
	for lo < hi {
		p := partition(a, lo, hi) // 3. a[p] is now in its final place
		// 4. Recurse into the smaller side, loop on the larger: stack depth stays O(log n).
		if p-lo < hi-p {
			sort(a, lo, p-1)
			lo = p + 1
		} else {
			sort(a, p+1, hi)
			hi = p - 1
		}
	}
}

func partition(a []int, lo, hi int) int {
	mid := lo + (hi-lo)/2         // 1. middle pivot: sorted input is no longer the worst case
	a[mid], a[hi] = a[hi], a[mid] // park the pivot at the end
	pivot := a[hi]
	store := lo // everything before store is smaller than the pivot
	for i := lo; i < hi; i++ {
		if a[i] < pivot { // 2. move smaller values to the left block
			a[i], a[store] = a[store], a[i]
			store++
		}
	}
	a[store], a[hi] = a[hi], a[store] // put the pivot between the two blocks
	return store
}

func main() {
	for _, c := range testCases {
		fmt.Println(strings.Trim(fmt.Sprint(quickSort(c)), "[]"))
	}
}
