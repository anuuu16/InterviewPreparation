// Tree traversals, approach 3: breadth-first search (level order). A queue holds the nodes of the current level.
static List<List<int>> LevelOrder(TreeNode? root)
{
    var levels = new List<List<int>>();
    if (root == null) return levels;
    var queue = new Queue<TreeNode>();
    queue.Enqueue(root); // 1. start with the root alone as level 0
    while (queue.Count > 0)
    {
        var level = new List<int>();
        for (int count = queue.Count; count > 0; count--) // 2. freeze the size: this many nodes are on the current level
        {
            var node = queue.Dequeue();
            level.Add(node.Val);
            if (node.Left != null) queue.Enqueue(node.Left); // 3. children join the back of the queue
            if (node.Right != null) queue.Enqueue(node.Right);
        }
        levels.Add(level); // 4. one finished level
    }
    return levels;
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

string[] cases =
{
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

foreach (var text in cases)
{
    var levels = LevelOrder(BuildTree(text));
    Console.WriteLine(levels.Count == 0 ? "empty" : string.Join(" | ", levels.Select(level => string.Join(" ", level))));
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
