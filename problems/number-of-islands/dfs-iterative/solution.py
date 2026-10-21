"""Number of islands, approach 2: iterative depth-first search. An explicit stack replaces the call stack,
so a huge island cannot overflow it. '1' is land and '0' is water; cells touch only up, down, left and right.
"""


def num_islands(grid):
    rows = len(grid)
    cols = len(grid[0]) if rows else 0
    visited = [[False] * cols for _ in range(rows)]
    directions = ((1, 0), (-1, 0), (0, 1), (0, -1))  # down, up, right, left
    islands = 0

    for r in range(rows):
        for c in range(cols):
            if grid[r][c] != "1" or visited[r][c]:
                continue
            islands += 1  # 1. unexplored land means a new island
            visited[r][c] = True
            stack = [(r, c)]  # 2. cells waiting to be explored
            while stack:
                cr, cc = stack.pop()  # 3. take the most recently added cell
                for dr, dc in directions:
                    nr, nc = cr + dr, cc + dc
                    if 0 <= nr < rows and 0 <= nc < cols and grid[nr][nc] == "1" and not visited[nr][nc]:
                        visited[nr][nc] = True  # 4. mark when pushed, so a cell is never pushed twice
                        stack.append((nr, nc))
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
