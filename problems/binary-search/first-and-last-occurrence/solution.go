package main

import "fmt"

// lowerBound returns the first index whose value is >= target (len(nums) if none).
// upperBound returns the first index whose value is > target (len(nums) if none).
// Window is half-open [lo, hi). Invariant: everything before lo is on the "left side",
// everything from hi on is on the "right side", and the answer is in [lo, hi].
func lowerBound(nums []int, target int) int {
	lo, hi := 0, len(nums) // 1. hi is one past the end (not a valid index)
	for lo < hi {          // 2. stop when the window is empty
		mid := lo + (hi-lo)/2   // 3. middle, written so it cannot overflow
		if nums[mid] < target { // 4. mid is too small: answer is to the right
			lo = mid + 1
		} else { // 5. mid could be the answer: keep it
			hi = mid
		}
	}
	return lo
}

func upperBound(nums []int, target int) int {
	lo, hi := 0, len(nums)
	for lo < hi {
		mid := lo + (hi-lo)/2
		if nums[mid] <= target { // 6. same loop, only "<=" instead of "<"
			lo = mid + 1
		} else {
			hi = mid
		}
	}
	return lo
}

func findRange(nums []int, target int) (int, int) {
	first := lowerBound(nums, target)
	if first == len(nums) || nums[first] != target { // 7. target absent
		return -1, -1
	}
	return first, upperBound(nums, target) - 1 // 8. last = one before upper bound
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
		first, last := findRange(c.nums, c.target)
		fmt.Println(first, last)
	}
}
