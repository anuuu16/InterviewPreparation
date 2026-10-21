// Tree traversals, approach 2: iterative depth-first search. An explicit stack replaces the call stack.
import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Deque;
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
        Deque<TreeNode> stack = new ArrayDeque<>(); // ArrayDeque cannot hold null, so we never push null
        if (order.equals("inorder")) {
            TreeNode node = root;
            while (node != null || !stack.isEmpty()) {
                while (node != null) { // 1. dive as far left as possible, remembering the path
                    stack.push(node);
                    node = node.left;
                }
                node = stack.pop(); // 2. the leftmost node not yet visited
                result.add(node.val); // 3. visit it
                node = node.right; // 4. then handle its right subtree the same way
            }
            return result;
        }
        // Pre-order and post-order share one loop. Post-order is "node, right, left" reversed at the end.
        if (root != null) stack.push(root);
        while (!stack.isEmpty()) {
            TreeNode node = stack.pop(); // 5. take the next node and visit it
            result.add(node.val);
            boolean pre = order.equals("preorder");
            TreeNode first = pre ? node.right : node.left; // 6. the child pushed first is popped last
            TreeNode second = pre ? node.left : node.right;
            if (first != null) stack.push(first);
            if (second != null) stack.push(second);
        }
        if (order.equals("postorder")) Collections.reverse(result); // 7. reverse "node, right, left" to get "left, right, node"
        return result;
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
