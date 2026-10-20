package main

import "fmt"

// linearSearch looks at the items one by one until the target shows up.
// Works on ANY slice (sorted or not). It is the baseline to beat.
func linearSearch(nums []int, target int) int {
	for i, v := range nums { // 1. visit items from left to right
		if v == target { // 2. the first match wins
			return i
		}
	}
	return -1 // 3. looked at everything: not found
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
		fmt.Println(linearSearch(c.nums, c.target))
	}
}
