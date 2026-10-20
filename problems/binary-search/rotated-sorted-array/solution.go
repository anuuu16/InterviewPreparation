package main

import "fmt"

// searchRotated searches a sorted slice that was rotated (for example [5 7 9 11 1 3]). No duplicates.
// Key fact: after cutting at mid, at least ONE half is still sorted.
// Invariant: if target is in the slice, its index is inside [lo, hi].
func searchRotated(nums []int, target int) int {
	lo, hi := 0, len(nums)-1 // 1. window [lo, hi], both ends included
	for lo <= hi {
		mid := lo + (hi-lo)/2    // 2. middle, written so it cannot overflow
		if nums[mid] == target { // 3. found it
			return mid
		}
		if nums[lo] <= nums[mid] { // 4. left half [lo..mid] is sorted
			if nums[lo] <= target && target < nums[mid] { // 5. target is inside the sorted half
				hi = mid - 1
			} else { // 6. otherwise it must be in the other half
				lo = mid + 1
			}
		} else { // 7. right half [mid..hi] is sorted
			if nums[mid] < target && target <= nums[hi] {
				lo = mid + 1
			} else {
				hi = mid - 1
			}
		}
	}
	return -1 // 8. window is empty: not found
}

func main() {
	cases := []struct {
		nums   []int
		target int
	}{
		{nil, 5},
		{[]int{7}, 7},
		{[]int{7}, 3},
		{[]int{5, 7, 9, 11, 1, 3}, 1},
		{[]int{5, 7, 9, 11, 1, 3}, 5},
		{[]int{5, 7, 9, 11, 1, 3}, 3},
		{[]int{5, 7, 9, 11, 1, 3}, 11},
		{[]int{5, 7, 9, 11, 1, 3}, 0},
		{[]int{5, 7, 9, 11, 1, 3}, 12},
		{[]int{5, 7, 9, 11, 1, 3}, 6},
		{[]int{1, 3, 5, 7, 9, 11}, 9},
		{[]int{3, 1}, 1},
		{[]int{3, 1}, 3},
		{[]int{24, 27, 30, 33, 36, 39, 42, 45, 48, 51, 54, 57, 0, 3, 6, 9, 12, 15, 18, 21}, 42},
		{[]int{24, 27, 30, 33, 36, 39, 42, 45, 48, 51, 54, 57, 0, 3, 6, 9, 12, 15, 18, 21}, 43},
		{[]int{24, 27, 30, 33, 36, 39, 42, 45, 48, 51, 54, 57, 0, 3, 6, 9, 12, 15, 18, 21}, 0},
	}
	for _, c := range cases {
		fmt.Println(searchRotated(c.nums, c.target))
	}
}
