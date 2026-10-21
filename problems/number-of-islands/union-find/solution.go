// Number of islands, approach 4: union-find (disjoint set). Start with every land cell as its own island,
// then merge neighbouring land cells; every successful merge removes one island. '1' is land, '0' is water.
package main

import (
	"fmt"
	"strings"
)

func numIslands(grid []string) int {
	rows := len(grid)
	cols := 0
	if rows > 0 {
		cols = len(grid[0])
	}
	parent := make([]int, rows*cols) // 1. each cell is its own set; cell (r, c) has id r*cols+c
	size := make([]int, rows*cols)
	for i := range parent {
		parent[i], size[i] = i, 1
	}
	islands := 0

	find := func(x int) int {
		for parent[x] != x {
			parent[x] = parent[parent[x]] // 2. path halving: make the path shorter for next time
			x = parent[x]
		}
		return x
	}
	union := func(a, b int) {
		rootA, rootB := find(a), find(b)
		if rootA == rootB { // already the same island
			return
		}
		if size[rootA] < size[rootB] { // 3. union by size: hang the small tree under the big one
			rootA, rootB = rootB, rootA
		}
		parent[rootB] = rootA
		size[rootA] += size[rootB]
		islands-- // 4. two islands became one
	}

	for r := 0; r < rows; r++ {
		for c := 0; c < cols; c++ {
			if grid[r][c] == '1' {
				islands++
			}
		}
	}
	for r := 0; r < rows; r++ {
		for c := 0; c < cols; c++ {
			if grid[r][c] != '1' {
				continue
			}
			if r+1 < rows && grid[r+1][c] == '1' { // 5. only look right and down: each pair is seen once
				union(r*cols+c, (r+1)*cols+c)
			}
			if c+1 < cols && grid[r][c+1] == '1' {
				union(r*cols+c, r*cols+c+1)
			}
		}
	}
	return islands
}

func main() {
	cases := []string{
		"11110 11010 11000 00000",
		"11000 11000 00100 00011",
		"",
		"0",
		"1",
		"000 000",
		"111 111 111",
		"101 010 101",
		"1 0 1 0 1",
		"10101",
		"11011 10001 00100 10001 11011",
		"11111 10001 10101 10001 11111",
		"11111 00001 11111 10000 11111",
		"110011 110011 001100 001100 110011 110011",
		"10 01",
	}
	// Each case is the rows of a grid separated by spaces. '1' is land and '0' is water.
	for _, text := range cases {
		fmt.Println(numIslands(strings.Fields(text)))
	}
}
