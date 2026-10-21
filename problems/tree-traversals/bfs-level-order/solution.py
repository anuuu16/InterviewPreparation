"""Tree traversals, approach 3: breadth-first search (level order). A queue holds the nodes of the current level."""

from collections import deque

class TreeNode:
    def __init__(self, val, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right


def level_order(root):
    levels = []
    if root is None:
        return levels
    queue = deque([root])  # 1. start with the root alone as level 0
    while queue:
        level = []
        for _ in range(len(queue)):  # 2. freeze the size: exactly this many nodes are on the current level
            node = queue.popleft()
            level.append(node.val)
            if node.left is not None:  # 3. children join the back of the queue for the next level
                queue.append(node.left)
            if node.right is not None:
                queue.append(node.right)
        levels.append(level)  # 4. one finished level
    return levels

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
]

for text in CASES:
    levels = level_order(build_tree(text))
    print(" | ".join(" ".join(map(str, level)) for level in levels) if levels else "empty")
