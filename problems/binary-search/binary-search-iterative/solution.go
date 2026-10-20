package main

import "fmt"

// binarySearch works on a SORTED slice (ascending).
// Loop invariant: if target is in the slice, its index is inside [lo, hi].
func binarySearch(nums []int, target int) int {
	lo, hi := 0, len(nums)-1 // 1. window [lo, hi], both ends included
	for lo <= hi {           // 2. an empty window means "not found"
		mid := lo + (hi-lo)/2 // 3. middle, written so it cannot overflow
		switch {
		case nums[mid] == target: // 4. found it
			return mid
		case nums[mid] < target: // 5. target can only be on the right
			lo = mid + 1
		default: // 6. target can only be on the left
			hi = mid - 1
		}
	}
	return -1 // 7. window is empty: not found
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
