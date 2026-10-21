"""Number of islands, approach 1: recursive depth-first search. Find a land cell, then explore its whole island.

'1' is land and '0' is water. Cells touch only up, down, left and right (not diagonally).
"""


def num_islands(grid):
    rows = len(grid)
    cols = len(grid[0]) if rows else 0
    visited = [[False] * cols for _ in range(rows)]  # keeps the input unchanged

    def explore(r, c):
        if r < 0 or r >= rows or c < 0 or c >= cols:  # 1. off the grid
            return
        if grid[r][c] != "1" or visited[r][c]:  # 2. water, or land we already explored
            return
        visited[r][c] = True  # 3. mark before going deeper, so we never come back here
        explore(r + 1, c)  # 4. the four neighbours
        explore(r - 1, c)
        explore(r, c + 1)
        explore(r, c - 1)

    islands = 0
    for r in range(rows):
        for c in range(cols):
            if grid[r][c] == "1" and not visited[r][c]:
                islands += 1  # 5. unexplored land means a new island
                explore(r, c)  # explore marks every cell of it
    return islands

CASES = [
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
]

# Each case is the rows of a grid separated by spaces. '1' is land and '0' is water.
for text in CASES:
    print(num_islands(text.split()))
