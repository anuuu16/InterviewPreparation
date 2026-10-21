// Number of islands, approach 3: breadth-first search. A queue explores the island in rings around the first cell,
// and never recurses. '1' is land and '0' is water; cells touch only up, down, left and right.
function numIslands(grid: string[]): number {
  const rows = grid.length;
  const cols = rows === 0 ? 0 : grid[0].length;
  const visited: boolean[][] = Array.from({ length: rows }, () => new Array<boolean>(cols).fill(false));
  const directions: [number, number][] = [[1, 0], [-1, 0], [0, 1], [0, -1]]; // down, up, right, left
  let islands = 0;

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (grid[r][c] !== '1' || visited[r][c]) continue;
      islands++; // 1. unexplored land means a new island
      visited[r][c] = true;
      const queue: [number, number][] = [[r, c]]; // 2. cells waiting to be explored (a head index avoids the slow Array.shift)
      for (let head = 0; head < queue.length; head++) {
        const [cr, cc] = queue[head]; // 3. take the oldest waiting cell
        for (const [dr, dc] of directions) {
          const nr = cr + dr;
          const nc = cc + dc;
          if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && grid[nr][nc] === '1' && !visited[nr][nc]) {
            visited[nr][nc] = true; // 4. mark when added, so a cell is never added twice
            queue.push([nr, nc]);
          }
        }
      }
    }
  }
  return islands;
}

const cases: string[] = [
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
