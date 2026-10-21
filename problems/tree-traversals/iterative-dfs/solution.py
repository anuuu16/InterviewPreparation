"""Tree traversals, approach 2: iterative depth-first search. An explicit stack replaces the call stack."""

class TreeNode:
    def __init__(self, val, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right


def traverse(root, order):
    result = []
    stack = []
    if order == "inorder":
        node = root
        while node is not None or stack:
            while node is not None:  # 1. dive as far left as possible, remembering the path
                stack.append(node)
                node = node.left
            node = stack.pop()  # 2. the leftmost node not yet visited
            result.append(node.val)  # 3. visit it
            node = node.right  # 4. then handle its right subtree the same way
        return result
    # Pre-order and post-order share one loop. Post-order is "node, right, left" reversed at the end.
    if root is not None:
        stack.append(root)
    while stack:
        node = stack.pop()  # 5. take the next node and visit it
        result.append(node.val)
        first, second = (node.right, node.left) if order == "preorder" else (node.left, node.right)  # 6. first is popped last
        for child in (first, second):
            if child is not None:
                stack.append(child)
    if order == "postorder":
        result.reverse()  # 7. reverse "node, right, left" to get "left, right, node"
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
