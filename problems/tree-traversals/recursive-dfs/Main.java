// Tree traversals, approach 1: recursive depth-first search. The only difference between the three orders
// is WHEN the node is visited: before its children (pre), between them (in) or after them (post).
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

public class Main {
    static class TreeNode {
        int val;
        TreeNode left, right;

        TreeNode(int val) {
            this.val = val;
        }
    }

    static List<Integer> traverse(TreeNode root, String order) {
        List<Integer> result = new ArrayList<>();
        visit(root, order, result);
        return result;
    }

    static void visit(TreeNode node, String order, List<Integer> result) {
        if (node == null) return; // 1. base case: an empty subtree has nothing to visit
        if (order.equals("preorder")) result.add(node.val); // 2. pre-order: node first
        visit(node.left, order, result); // 3. the whole left subtree
        if (order.equals("inorder")) result.add(node.val); // 4. in-order: node between its subtrees
        visit(node.right, order, result); // 5. the whole right subtree
        if (order.equals("postorder")) result.add(node.val); // 6. post-order: node last
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
        String[][] cases = {
            {"1 null 2 3", "preorder"},
            {"1 null 2 3", "inorder"},
            {"1 null 2 3", "postorder"},
            {"", "inorder"},
            {"1", "preorder"},
            {"1 2 3 4 5 6 7", "preorder"},
            {"1 2 3 4 5 6 7", "inorder"},
            {"1 2 3 4 5 6 7", "postorder"},
            {"1 2 null 3 null 4", "preorder"},
            {"1 2 null 3 null 4", "postorder"},
            {"1 null 2 null 3 null 4", "inorder"},
            {"1 null 2 null 3 null 4", "postorder"},
            {"4 2 7 1 3 6 9", "inorder"},
            {"3 9 20 null null 15 7", "preorder"},
            {"3 9 20 null null 15 7", "inorder"},
            {"3 9 20 null null 15 7", "postorder"},
            {"5 3 8 1 4 7 9 null 2", "inorder"},
            {"1 2 3 null 4 null 5", "preorder"},
            {"1 2 3 null 4 null 5", "postorder"},
        };
        for (String[] c : cases) {
            List<Integer> values = traverse(buildTree(c[0]), c[1]);
            System.out.println(values.isEmpty() ? "empty" : join(values));
        }
    }
}
