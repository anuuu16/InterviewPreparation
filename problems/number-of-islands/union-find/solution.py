"""Number of islands, approach 4: union-find (disjoint set). Start with every land cell as its own island,
then merge neighbouring land cells; every successful merge removes one island. '1' is land, '0' is water.
"""


def num_islands(grid):
    rows = len(grid)
    cols = len(grid[0]) if rows else 0
    parent = list(range(rows * cols))  # 1. each cell is its own set; cell (r, c) has id r * cols + c
    size = [1] * (rows * cols)
    islands = sum(row.count("1") for row in grid)

    def find(x):
        while parent[x] != x:
            parent[x] = parent[parent[x]]  # 2. path halving: make the path shorter for next time
            x = parent[x]
        return x

    def union(a, b):
        nonlocal islands
        root_a, root_b = find(a), find(b)
        if root_a == root_b:  # already the same island
            return
        if size[root_a] < size[root_b]:  # 3. union by size: hang the small tree under the big one
            root_a, root_b = root_b, root_a
        parent[root_b] = root_a
        size[root_a] += size[root_b]
        islands -= 1  # 4. two islands became one

    for r in range(rows):
        for c in range(cols):
            if grid[r][c] != "1":
                continue
            if r + 1 < rows and grid[r + 1][c] == "1":  # 5. only look right and down:
                union(r * cols + c, (r + 1) * cols + c)
            if c + 1 < cols and grid[r][c + 1] == "1":  #    each pair is seen once
                union(r * cols + c, r * cols + c + 1)
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
