// Number of islands, approach 4: union-find (disjoint set). Start with every land cell as its own island,
// then merge neighbouring land cells; every successful merge removes one island. '1' is land, '0' is water.
#include <iostream>
#include <numeric>
#include <sstream>
#include <string>
#include <utility>
#include <vector>

int numIslands(const std::vector<std::string>& grid) {
    int rows = static_cast<int>(grid.size()); // cast first: size() - 1 on an empty container would wrap around
    int cols = rows == 0 ? 0 : static_cast<int>(grid[0].size());
    std::vector<int> parent(rows * cols); // 1. each cell is its own set; cell (r, c) has id r * cols + c
    std::iota(parent.begin(), parent.end(), 0);
    std::vector<int> size(rows * cols, 1);
    int islands = 0;

    auto find = [&](int x) {
        while (parent[x] != x) {
            parent[x] = parent[parent[x]]; // 2. path halving: make the path shorter for next time
            x = parent[x];
        }
        return x;
    };
    auto unite = [&](int a, int b) { // "union" is a reserved word in C++
        int rootA = find(a), rootB = find(b);
        if (rootA == rootB) return; // already the same island
        if (size[rootA] < size[rootB]) std::swap(rootA, rootB); // 3. union by size: hang the small tree under the big one
        parent[rootB] = rootA;
        size[rootA] += size[rootB];
        islands--; // 4. two islands became one
    };

    for (int r = 0; r < rows; r++)
        for (int c = 0; c < cols; c++)
            if (grid[r][c] == '1') islands++;

    for (int r = 0; r < rows; r++) {
        for (int c = 0; c < cols; c++) {
            if (grid[r][c] != '1') continue;
            if (r + 1 < rows && grid[r + 1][c] == '1') unite(r * cols + c, (r + 1) * cols + c); // 5. only look right and down:
            if (c + 1 < cols && grid[r][c + 1] == '1') unite(r * cols + c, r * cols + c + 1); //    each pair is seen once
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
