// Number of islands, approach 2: iterative depth-first search. An explicit stack replaces the call stack,
// so a huge island cannot overflow it. '1' is land and '0' is water; cells touch only up, down, left and right.
static int NumIslands(string[] grid)
{
    int rows = grid.Length;
    int cols = rows == 0 ? 0 : grid[0].Length;
    var visited = new bool[rows, cols];
    (int, int)[] directions = { (1, 0), (-1, 0), (0, 1), (0, -1) }; // down, up, right, left
    int islands = 0;

    for (int r = 0; r < rows; r++)
    {
        for (int c = 0; c < cols; c++)
        {
            if (grid[r][c] != '1' || visited[r, c]) continue;
            islands++; // 1. unexplored land means a new island
            visited[r, c] = true;
            var stack = new Stack<(int, int)>(); // 2. cells waiting to be explored
            stack.Push((r, c));
            while (stack.Count > 0)
            {
                var (cr, cc) = stack.Pop(); // 3. take the most recently added cell
                foreach (var (dr, dc) in directions)
                {
                    int nr = cr + dr, nc = cc + dc;
                    if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && grid[nr][nc] == '1' && !visited[nr, nc])
                    {
                        visited[nr, nc] = true; // 4. mark when pushed, so a cell is never pushed twice
                        stack.Push((nr, nc));
                    }
                }
            }
        }
    }
    return islands;
}

string[] cases =
{
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
};

// Each case is the rows of a grid separated by spaces. '1' is land and '0' is water.
foreach (string text in cases)
    Console.WriteLine(NumIslands(text.Split(' ', StringSplitOptions.RemoveEmptyEntries)));
