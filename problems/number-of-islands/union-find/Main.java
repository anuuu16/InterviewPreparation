// Number of islands, approach 4: union-find (disjoint set). Start with every land cell as its own island,
// then merge neighbouring land cells; every successful merge removes one island. '1' is land, '0' is water.
public class Main {
    static int[] parent;
    static int[] size;
    static int islands;

    static int find(int x) {
        while (parent[x] != x) {
            parent[x] = parent[parent[x]]; // 2. path halving: make the path shorter for next time
            x = parent[x];
        }
        return x;
    }

    static void union(int a, int b) {
        int rootA = find(a);
        int rootB = find(b);
        if (rootA == rootB) return; // already the same island
        if (size[rootA] < size[rootB]) { // 3. union by size: hang the small tree under the big one
            int tmp = rootA;
            rootA = rootB;
            rootB = tmp;
        }
        parent[rootB] = rootA;
        size[rootA] += size[rootB];
        islands--; // 4. two islands became one
    }

    static int numIslands(String[] grid) {
        int rows = grid.length;
        int cols = rows == 0 ? 0 : grid[0].length();
        parent = new int[rows * cols]; // 1. each cell is its own set; cell (r, c) has id r * cols + c
        size = new int[rows * cols];
        for (int i = 0; i < parent.length; i++) {
            parent[i] = i;
            size[i] = 1;
        }
        islands = 0;
        for (int r = 0; r < rows; r++) {
            for (int c = 0; c < cols; c++) if (grid[r].charAt(c) == '1') islands++;
        }
        for (int r = 0; r < rows; r++) {
            for (int c = 0; c < cols; c++) {
                if (grid[r].charAt(c) != '1') continue;
                if (r + 1 < rows && grid[r + 1].charAt(c) == '1') union(r * cols + c, (r + 1) * cols + c); // 5. only right and down
                if (c + 1 < cols && grid[r].charAt(c + 1) == '1') union(r * cols + c, r * cols + c + 1); // each pair is seen once
            }
        }
        return islands;
    }

    public static void main(String[] args) {
        String[] cases = {
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
        for (String text : cases) {
            String[] rows = text.isEmpty() ? new String[0] : text.split(" ");
            System.out.println(numIslands(rows));
        }
    }
}
