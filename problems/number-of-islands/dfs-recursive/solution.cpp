// Number of islands, approach 1: recursive depth-first search. Find a land cell, then explore its whole island.
// '1' is land and '0' is water. Cells touch only up, down, left and right (not diagonally).
#include <iostream>
#include <queue>
#include <sstream>
#include <stack>
#include <string>
#include <utility>
#include <vector>

static void explore(const std::vector<std::string>& grid, std::vector<std::vector<char>>& visited, int r, int c) {
    int rows = static_cast<int>(grid.size());
    int cols = static_cast<int>(grid[0].size());
    if (r < 0 || r >= rows || c < 0 || c >= cols) return; // 1. off the grid
    if (grid[r][c] != '1' || visited[r][c]) return; // 2. water, or land we already explored
    visited[r][c] = 1; // 3. mark before going deeper, so we never come back here
    explore(grid, visited, r + 1, c); // 4. the four neighbours
    explore(grid, visited, r - 1, c);
    explore(grid, visited, r, c + 1);
    explore(grid, visited, r, c - 1);
}

int numIslands(const std::vector<std::string>& grid) {
    int rows = static_cast<int>(grid.size()); // cast first: size() - 1 on an empty container would wrap around
    int cols = rows == 0 ? 0 : static_cast<int>(grid[0].size());
    std::vector<std::vector<char>> visited(rows, std::vector<char>(cols, 0)); // keeps the input unchanged
    int islands = 0;
    for (int r = 0; r < rows; r++) {
        for (int c = 0; c < cols; c++) {
            if (grid[r][c] == '1' && !visited[r][c]) {
                islands++; // 5. unexplored land means a new island
                explore(grid, visited, r, c); // explore marks every cell of it
            }
        }
    }
    return islands;
}

int main() {
    std::vector<std::string> cases = {
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
    for (const auto& text : cases) {
        std::vector<std::string> rows;
        std::istringstream in(text);
        for (std::string row; in >> row;) rows.push_back(row);
        std::cout << numIslands(rows) << "\n";
    }
}
