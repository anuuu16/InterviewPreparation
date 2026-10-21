// Number of islands, approach 2: iterative depth-first search. An explicit stack replaces the call stack,
// so a huge island cannot overflow it. '1' is land and '0' is water; cells touch only up, down, left and right.
import java.util.ArrayDeque;
import java.util.Deque;

public class Main {
    static int numIslands(String[] grid) {
        int rows = grid.length;
        int cols = rows == 0 ? 0 : grid[0].length();
        boolean[][] visited = new boolean[rows][cols];
        int[][] directions = {{1, 0}, {-1, 0}, {0, 1}, {0, -1}}; // down, up, right, left
        int islands = 0;

        for (int r = 0; r < rows; r++) {
            for (int c = 0; c < cols; c++) {
                if (grid[r].charAt(c) != '1' || visited[r][c]) continue;
                islands++; // 1. unexplored land means a new island
                visited[r][c] = true;
                Deque<int[]> stack = new ArrayDeque<>(); // 2. cells waiting to be explored
                stack.push(new int[] {r, c});
                while (!stack.isEmpty()) {
                    int[] cell = stack.pop(); // 3. take the most recently added cell
                    for (int[] d : directions) {
                        int nr = cell[0] + d[0];
                        int nc = cell[1] + d[1];
                        if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && grid[nr].charAt(nc) == '1' && !visited[nr][nc]) {
                            visited[nr][nc] = true; // 4. mark when pushed, so a cell is never pushed twice
                            stack.push(new int[] {nr, nc});
                        }
                    }
                }
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
