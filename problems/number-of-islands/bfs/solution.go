// Number of islands, approach 3: breadth-first search. A queue explores the island in rings around the first cell,
// and never recurses. '1' is land and '0' is water; cells touch only up, down, left and right.
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
	visited := make([][]bool, rows)
	for r := range visited {
		visited[r] = make([]bool, cols)
	}
	directions := [4][2]int{{1, 0}, {-1, 0}, {0, 1}, {0, -1}} // down, up, right, left
	islands := 0

	for r := 0; r < rows; r++ {
		for c := 0; c < cols; c++ {
			if grid[r][c] != '1' || visited[r][c] {
				continue
			}
			islands++ // 1. unexplored land means a new island
			visited[r][c] = true
			queue := [][2]int{{r, c}} // 2. cells waiting to be explored
			for len(queue) > 0 {
				cell := queue[0] // 3. take the oldest waiting cell
				queue = queue[1:]
				for _, d := range directions {
					nr, nc := cell[0]+d[0], cell[1]+d[1]
					if nr >= 0 && nr < rows && nc >= 0 && nc < cols && grid[nr][nc] == '1' && !visited[nr][nc] {
						visited[nr][nc] = true // 4. mark when added, so a cell is never added twice
						queue = append(queue, [2]int{nr, nc})
					}
				}
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
