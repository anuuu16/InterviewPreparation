// Number of islands, approach 4: union-find (disjoint set). Start with every land cell as its own island,
// then merge neighbouring land cells; every successful merge removes one island. '1' is land, '0' is water.
function numIslands(grid) {
  const rows = grid.length;
  const cols = rows === 0 ? 0 : grid[0].length;
  const parent = Array.from({ length: rows * cols }, (_, i) => i); // 1. each cell is its own set; cell (r, c) has id r * cols + c
  const size = new Array(rows * cols).fill(1);
  let islands = 0;

  function find(x) {
    while (parent[x] !== x) {
      parent[x] = parent[parent[x]]; // 2. path halving: make the path shorter for next time
      x = parent[x];
    }
    return x;
  }

  function union(a, b) {
    let rootA = find(a);
    let rootB = find(b);
    if (rootA === rootB) return; // already the same island
    if (size[rootA] < size[rootB]) [rootA, rootB] = [rootB, rootA]; // 3. union by size: hang the small tree under the big one
    parent[rootB] = rootA;
    size[rootA] += size[rootB];
    islands--; // 4. two islands became one
  }

  for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) if (grid[r][c] === '1') islands++;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (grid[r][c] !== '1') continue;
      if (r + 1 < rows && grid[r + 1][c] === '1') union(r * cols + c, (r + 1) * cols + c); // 5. only look right and down:
      if (c + 1 < cols && grid[r][c + 1] === '1') union(r * cols + c, r * cols + c + 1); //    each pair is seen once
    }
  }
  return islands;
}

const cases = [
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
];

// Each case is the rows of a grid separated by spaces. '1' is land and '0' is water.
for (const text of cases) console.log(numIslands(text.split(' ').filter(Boolean)));
