// Number of islands, approach 2: iterative depth-first search. An explicit stack replaces the call stack,
// so a huge island cannot overflow it. '1' is land and '0' is water; cells touch only up, down, left and right.
#include <array>
#include <iostream>
#include <queue>
#include <sstream>
#include <stack>
#include <string>
#include <utility>
#include <vector>

int numIslands(const std::vector<std::string>& grid) {
    int rows = static_cast<int>(grid.size()); // cast first: size() - 1 on an empty container would wrap around
    int cols = rows == 0 ? 0 : static_cast<int>(grid[0].size());
    std::vector<std::vector<char>> visited(rows, std::vector<char>(cols, 0));
    const std::array<std::pair<int, int>, 4> directions = {{{1, 0}, {-1, 0}, {0, 1}, {0, -1}}}; // down, up, right, left
    int islands = 0;

    for (int r = 0; r < rows; r++) {
        for (int c = 0; c < cols; c++) {
            if (grid[r][c] != '1' || visited[r][c]) continue;
            islands++; // 1. unexplored land means a new island
            visited[r][c] = 1;
            std::stack<std::pair<int, int>> stack; // 2. cells waiting to be explored
            stack.push({r, c});
            while (!stack.empty()) {
                auto [cr, cc] = stack.top(); // 3. take the most recently added cell
                stack.pop();
                for (const auto& [dr, dc] : directions) {
                    int nr = cr + dr, nc = cc + dc;
                    if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && grid[nr][nc] == '1' && !visited[nr][nc]) {
                        visited[nr][nc] = 1; // 4. mark when pushed, so a cell is never pushed twice
                        stack.push({nr, nc});
                    }
                }
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
