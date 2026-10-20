package main

import "fmt"

// search is the recursive step. Invariant: if target is in the slice, its index is inside [lo, hi].
func search(nums []int, target, lo, hi int) int {
	if lo > hi { // 1. empty window: base case, not found
		return -1
	}
	mid := lo + (hi-lo)/2    // 2. middle, written so it cannot overflow
	if nums[mid] == target { // 3. found it: base case
		return mid
	}
	if nums[mid] < target {
		return search(nums, target, mid+1, hi) // 4. go right
	}
	return search(nums, target, lo, mid-1) // 5. go left
}

func binarySearch(nums []int, target int) int {
	return search(nums, target, 0, len(nums)-1) // 6. start with the whole slice
}

func main() {
	cases := []struct {
		nums   []int
		target int
	}{
		{nil, 5},
		{[]int{7}, 7},
		{[]int{7}, 3},
		{[]int{1, 3, 5, 7, 9, 11}, 1},
		{[]int{1, 3, 5, 7, 9, 11}, 11},
		{[]int{1, 3, 5, 7, 9, 11}, 7},
		{[]int{1, 3, 5, 7, 9, 11}, 0},
		{[]int{1, 3, 5, 7, 9, 11}, 12},
		{[]int{1, 3, 5, 7, 9, 11}, 6},
		{[]int{2, 4, 4, 4, 4, 6, 8}, 4},
		{[]int{0, 3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36, 39, 42, 45, 48, 51, 54, 57}, 42},
		{[]int{0, 3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36, 39, 42, 45, 48, 51, 54, 57}, 43},
		{[]int{5, 5, 5, 5}, 5},
	}
	for _, c := range cases {
		fmt.Println(binarySearch(c.nums, c.target))
	}
}
