"""Tree traversals, approach 1: recursive depth-first search. The only difference between the three orders
is WHEN the node is visited: before its children (pre), between them (in) or after them (post).
"""

class TreeNode:
    def __init__(self, val, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right


def traverse(root, order):
    result = []

    def visit(node):
        if node is None:  # 1. base case: an empty subtree has nothing to visit
            return
        if order == "preorder":  # 2. pre-order: node first
            result.append(node.val)
        visit(node.left)  # 3. the whole left subtree
        if order == "inorder":  # 4. in-order: node between its subtrees
            result.append(node.val)
        visit(node.right)  # 5. the whole right subtree
        if order == "postorder":  # 6. post-order: node last
            result.append(node.val)

    visit(root)
    return result

def build_tree(text):
    """Test helper: build a tree from level-order text. The word "null" marks a missing child."""
    tokens = text.split()
    if not tokens or tokens[0] == "null":
        return None
    root = TreeNode(int(tokens[0]))
    queue = [root]
    pos = 1

    def make():
        nonlocal pos
        if pos >= len(tokens):
            return None
        token = tokens[pos]
        pos += 1
        if token == "null":
            return None
        node = TreeNode(int(token))
        queue.append(node)
        return node

    for node in queue:  # the list grows while we loop, which is what we want
        node.left = make()
        node.right = make()
    return root


CASES = [
    ("1 null 2 3", "preorder"),
    ("1 null 2 3", "inorder"),
    ("1 null 2 3", "postorder"),
    ("", "inorder"),
    ("1", "preorder"),
    ("1 2 3 4 5 6 7", "preorder"),
    ("1 2 3 4 5 6 7", "inorder"),
    ("1 2 3 4 5 6 7", "postorder"),
    ("1 2 null 3 null 4", "preorder"),
    ("1 2 null 3 null 4", "postorder"),
    ("1 null 2 null 3 null 4", "inorder"),
    ("1 null 2 null 3 null 4", "postorder"),
    ("4 2 7 1 3 6 9", "inorder"),
    ("3 9 20 null null 15 7", "preorder"),
    ("3 9 20 null null 15 7", "inorder"),
    ("3 9 20 null null 15 7", "postorder"),
    ("5 3 8 1 4 7 9 null 2", "inorder"),
    ("1 2 3 null 4 null 5", "preorder"),
    ("1 2 3 null 4 null 5", "postorder"),
]

for text, order in CASES:
    values = traverse(build_tree(text), order)
    print(" ".join(map(str, values)) if values else "empty")
