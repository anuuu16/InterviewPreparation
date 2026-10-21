// Tree traversals, approach 2: iterative depth-first search. An explicit stack replaces the call stack.
static List<int> Traverse(TreeNode? root, string order)
{
    var result = new List<int>();
    var stack = new Stack<TreeNode>();
    if (order == "inorder")
    {
        var node = root;
        while (node != null || stack.Count > 0)
        {
            while (node != null) // 1. dive as far left as possible, remembering the path
            {
                stack.Push(node);
                node = node.Left;
            }
            node = stack.Pop(); // 2. the leftmost node not yet visited
            result.Add(node.Val); // 3. visit it
            node = node.Right; // 4. then handle its right subtree the same way
        }
        return result;
    }
    // Pre-order and post-order share one loop. Post-order is "node, right, left" reversed at the end.
    if (root != null) stack.Push(root);
    while (stack.Count > 0)
    {
        var node = stack.Pop(); // 5. take the next node and visit it
        result.Add(node.Val);
        bool pre = order == "preorder";
        var first = pre ? node.Right : node.Left; // 6. the child pushed first is popped last
        var second = pre ? node.Left : node.Right;
        if (first != null) stack.Push(first);
        if (second != null) stack.Push(second);
    }
    if (order == "postorder") result.Reverse(); // 7. reverse "node, right, left" to get "left, right, node"
    return result;
}

// Test helper: build a tree from level-order text. The word "null" marks a missing child.
static TreeNode? BuildTree(string text)
{
    var tokens = text.Split(' ', StringSplitOptions.RemoveEmptyEntries);
    if (tokens.Length == 0 || tokens[0] == "null") return null;
    var root = new TreeNode(int.Parse(tokens[0]));
    var queue = new List<TreeNode> { root };
    int pos = 1;
    TreeNode? Make()
    {
        if (pos >= tokens.Length) return null;
        string token = tokens[pos++];
        if (token == "null") return null;
        var node = new TreeNode(int.Parse(token));
        queue.Add(node);
        return node;
    }
    for (int head = 0; head < queue.Count; head++)
    {
        queue[head].Left = Make();
        queue[head].Right = Make();
    }
    return root;
}

string[][] cases =
{
    new[] { "1 null 2 3", "preorder" },
    new[] { "1 null 2 3", "inorder" },
    new[] { "1 null 2 3", "postorder" },
    new[] { "", "inorder" },
    new[] { "1", "preorder" },
    new[] { "1 2 3 4 5 6 7", "preorder" },
    new[] { "1 2 3 4 5 6 7", "inorder" },
    new[] { "1 2 3 4 5 6 7", "postorder" },
    new[] { "1 2 null 3 null 4", "preorder" },
    new[] { "1 2 null 3 null 4", "postorder" },
    new[] { "1 null 2 null 3 null 4", "inorder" },
    new[] { "1 null 2 null 3 null 4", "postorder" },
    new[] { "4 2 7 1 3 6 9", "inorder" },
    new[] { "3 9 20 null null 15 7", "preorder" },
    new[] { "3 9 20 null null 15 7", "inorder" },
    new[] { "3 9 20 null null 15 7", "postorder" },
    new[] { "5 3 8 1 4 7 9 null 2", "inorder" },
    new[] { "1 2 3 null 4 null 5", "preorder" },
    new[] { "1 2 3 null 4 null 5", "postorder" },
};

foreach (var c in cases)
{
    var values = Traverse(BuildTree(c[0]), c[1]);
    Console.WriteLine(values.Count == 0 ? "empty" : string.Join(" ", values));
}

// In top-level programs, type declarations must come after the statements.
class TreeNode
{
    public int Val;
    public TreeNode? Left, Right;

    public TreeNode(int val)
    {
        Val = val;
    }
}
