// Tree traversals, approach 1: recursive depth-first search. The only difference between the three orders
// is WHEN the node is visited: before its children (pre), between them (in) or after them (post).
static List<int> Traverse(TreeNode? root, string order)
{
    var result = new List<int>();

    void Visit(TreeNode? node)
    {
        if (node == null) return; // 1. base case: an empty subtree has nothing to visit
        if (order == "preorder") result.Add(node.Val); // 2. pre-order: node first
        Visit(node.Left); // 3. the whole left subtree
        if (order == "inorder") result.Add(node.Val); // 4. in-order: node between its subtrees
        Visit(node.Right); // 5. the whole right subtree
        if (order == "postorder") result.Add(node.Val); // 6. post-order: node last
    }

    Visit(root);
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
