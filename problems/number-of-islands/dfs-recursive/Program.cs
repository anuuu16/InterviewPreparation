// Number of islands, approach 1: recursive depth-first search. Find a land cell, then explore its whole island.
// '1' is land and '0' is water. Cells touch only up, down, left and right (not diagonally).
static int NumIslands(string[] grid)
{
    int rows = grid.Length;
    int cols = rows == 0 ? 0 : grid[0].Length;
    var visited = new bool[rows, cols]; // keeps the input unchanged; booleans start as false

    void Explore(int r, int c)
    {
        if (r < 0 || r >= rows || c < 0 || c >= cols) return; // 1. off the grid
        if (grid[r][c] != '1' || visited[r, c]) return; // 2. water, or land we already explored
        visited[r, c] = true; // 3. mark before going deeper, so we never come back here
        Explore(r + 1, c); // 4. the four neighbours
        Explore(r - 1, c);
        Explore(r, c + 1);
        Explore(r, c - 1);
    }

    int islands = 0;
    for (int r = 0; r < rows; r++)
    {
        for (int c = 0; c < cols; c++)
        {
            if (grid[r][c] == '1' && !visited[r, c])
            {
                islands++; // 5. unexplored land means a new island
                Explore(r, c); // explore marks every cell of it
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
