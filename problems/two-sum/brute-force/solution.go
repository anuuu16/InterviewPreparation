// Two sum, approach 1: brute force. Try every pair, first index first.
// Rule when several pairs work: smallest first index, then smallest second index.
package main

import "fmt"

func twoSum(nums []int, target int) (int, int, bool) {
	// 1. pick the first number
	for i := 0; i < len(nums); i++ {
		// 2. pick a partner that comes after it, so one element is never used twice
		for j := i + 1; j < len(nums); j++ {
			// 3. the loop order already gives the required answer
			if nums[i]+nums[j] == target {
				return i, j, true
			}
		}
	}
	return 0, 0, false // 4. no pair
}

func main() {
	cases := []struct {
		nums   []int
		target int
	}{
		{[]int{2, 7, 11, 15}, 9},
		{[]int{3, 2, 4}, 6},
		{[]int{3, 3}, 6},
		{[]int{1, 2}, 3},
		{[]int{4, 1, 9, 6, 2, 5}, 9},
		{[]int{-3, 4, 3, 90}, 0},
		{[]int{0, 4, 3, 0}, 0},
		{[]int{2, 5, 5, 11}, 10},
		{[]int{1, 2, 3}, 7},
		{[]int{}, 5},
		{[]int{5}, 5},
		{[]int{1, 2, 3, 4, 5}, 6},
		{[]int{1, 4, 6, 9}, 10},
		{[]int{2, 2, 2, 2}, 4},
		{[]int{1, 1, 3, 3}, 4},
		{[]int{1500000000, 1500000000}, 3000000000},
		{[]int{-2000000000, 3, 2000000000}, 0},
		{[]int{8, 3, -2, 15, 7, 1, 9, 4, 12, 6, 10, 5}, 17},
		{[]int{8, 3, -2, 15, 7, 1, 9, 4, 12, 6, 10, 5}, 100},
	}
	for _, c := range cases {
		if i, j, ok := twoSum(c.nums, c.target); ok {
			fmt.Println(i, j)
		} else {
			fmt.Println("none")
		}
	}
}
