// Heap sort: build a max-heap, then keep moving the biggest value to the end.
package main

import (
	"fmt"
	"strings"
)

var testCases = [][]int{
	{7}, {1, 2, 3, 4, 5}, {}, {9, 7, 5, 3, 1}, {4, 2, 4, 1, 2, 4},
	{-3, 5, -1, 0, -8, 2}, {29, -4, 15, 0, 8, -17, 42, 15, 3, -4, 100, 7},
}

func heapSort(input []int) []int {
	a := append([]int(nil), input...) // sort a copy in place
	// 1. Build a max-heap: start at the last parent and sift each one down.
	for i := len(a)/2 - 1; i >= 0; i-- {
		siftDown(a, i, len(a))
	}
	for end := len(a) - 1; end > 0; end-- {
		a[0], a[end] = a[end], a[0] // 2. the root is the max: move it to its final slot
		siftDown(a, 0, end)         // 3. the heap is now one smaller; repair it
	}
	return a
}

// siftDown pushes a[i] down until both children are smaller. Children of i are 2i+1 and 2i+2.
func siftDown(a []int, i, size int) {
	for {
		child := 2*i + 1
		if child >= size {
			return
		}
		if child+1 < size && a[child+1] > a[child] {
			child++ // pick the bigger child
		}
		if a[i] >= a[child] {
			return
		}
		a[i], a[child] = a[child], a[i]
		i = child
	}
}

func main() {
	for _, c := range testCases {
		fmt.Println(strings.Trim(fmt.Sprint(heapSort(c)), "[]"))
	}
}
