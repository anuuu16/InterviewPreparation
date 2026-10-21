// Tree traversals, approach 3: breadth-first search (level order). A queue holds the nodes of the current level.
import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.List;
import java.util.Queue;
import java.util.stream.Collectors;

public class Main {
    static class TreeNode {
        int val;
        TreeNode left, right;

        TreeNode(int val) {
            this.val = val;
        }
    }

    static List<List<Integer>> levelOrder(TreeNode root) {
        List<List<Integer>> levels = new ArrayList<>();
        if (root == null) return levels;
        Queue<TreeNode> queue = new ArrayDeque<>();
        queue.add(root); // 1. start with the root alone as level 0
        while (!queue.isEmpty()) {
            List<Integer> level = new ArrayList<>();
            for (int count = queue.size(); count > 0; count--) { // 2. freeze the size: this many nodes are on the current level
                TreeNode node = queue.remove();
                level.add(node.val);
                if (node.left != null) queue.add(node.left); // 3. children join the back of the queue
                if (node.right != null) queue.add(node.right);
            }
            levels.add(level); // 4. one finished level
        }
        return levels;
    }

    // Test helper: build a tree from level-order text. The word "null" marks a missing child.
    static TreeNode buildTree(String text) {
        String[] tokens = text.isEmpty() ? new String[0] : text.split(" ");
        if (tokens.length == 0 || tokens[0].equals("null")) return null;
        TreeNode root = new TreeNode(Integer.parseInt(tokens[0]));
        List<TreeNode> queue = new ArrayList<>(List.of(root));
        int pos = 1;
        for (int head = 0; head < queue.size() && pos < tokens.length; head++) {
            TreeNode node = queue.get(head);
            if (!tokens[pos++].equals("null")) {
                node.left = new TreeNode(Integer.parseInt(tokens[pos - 1]));
                queue.add(node.left);
            }
            if (pos < tokens.length && !tokens[pos++].equals("null")) {
                node.right = new TreeNode(Integer.parseInt(tokens[pos - 1]));
                queue.add(node.right);
            }
        }
        return root;
    }

    static String join(List<Integer> values) {
        return values.stream().map(String::valueOf).collect(Collectors.joining(" "));
    }

    public static void main(String[] args) {
        String[] cases = {
            "1 null 2 3",
            "",
            "1",
            "1 2 3 4 5 6 7",
            "1 2 null 3 null 4",
            "1 null 2 null 3 null 4",
            "4 2 7 1 3 6 9",
            "3 9 20 null null 15 7",
            "5 3 8 1 4 7 9 null 2",
            "1 2 3 null 4 null 5",
            "10 -5 15 -8 null 12 20",
        };
        for (String text : cases) {
            List<List<Integer>> levels = levelOrder(buildTree(text));
            System.out.println(levels.isEmpty() ? "empty" : levels.stream().map(Main::join).collect(Collectors.joining(" | ")));
        }
    }
}
