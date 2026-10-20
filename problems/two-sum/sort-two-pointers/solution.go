// Two sum, approach 2: sort, then two pointers. Sort the INDICES so original positions survive.
// Rule when several pairs work: smallest first index, then smallest second index.
package main

import (
	"fmt"
	"sort"
)

type pair struct{ a, b int }

// smaller returns the better of the current best pair and the pair (i, j).
func smaller(best *pair, i, j int) *pair {
	p := pair{min(i, j), max(i, j)}
	if best == nil || p.a < best.a || (p.a == best.a && p.b < best.b) {
		return &p
	}
	return best
}

func twoSum(nums []int, target int) (int, int, bool) {
	// 1. sort the indices by value (ties by index); nums itself stays untouched
	order := make([]int, len(nums))
	for i := range order {
		order[i] = i
	}
	sort.Slice(order, func(x, y int) bool {
		a, b := order[x], order[y]
		return nums[a] < nums[b] || (nums[a] == nums[b] && a < b)
	})
	lo, hi := 0, len(order)-1
	var best *pair
	for lo < hi {
		sum := nums[order[lo]] + nums[order[hi]]
		switch {
		case sum < target: // 2. too small: move the left pointer up
			lo++
		case sum > target: // 3. too big: move the right pointer down
			hi--
		case nums[order[lo]] == nums[order[hi]]:
			// 4a. everything between lo and hi is equal: take its two smallest indices
			best = smaller(best, order[lo], order[lo+1])
			lo = hi
		default:
			// 4b. different values: find where the run of equal right values starts
			h := hi
			for nums[order[h-1]] == nums[order[hi]] {
				h--
			}
			best = smaller(best, order[lo], order[h]) // first index of each run is the best pair
			left := nums[order[lo]]
			for nums[order[lo]] == left {
				lo++ // skip the whole left run
			}
			hi = h - 1
		}
	}
	if best == nil { // 5. nothing matched
		return 0, 0, false
	}
	return best.a, best.b, true
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
