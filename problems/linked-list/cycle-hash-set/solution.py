"""Linked list, approach 3: detect a cycle with a hash set. Remember every node visited; seeing one twice means a cycle."""

class ListNode:
    def __init__(self, val, next=None):
        self.val = val
        self.next = next


def has_cycle(head):
    seen = set()  # objects without __eq__ and __hash__ compare by identity, which is what we want
    node = head
    while node is not None:
        if node in seen:  # 1. we are back at a node we already visited: there is a cycle
            return True
        seen.add(node)  # 2. remember this node
        node = node.next
    return False  # 3. we fell off the end, so the list has an end and no cycle

def from_list(values, cycle_pos=-1):
    """Test helper: build a list from a Python list. cycle_pos >= 0 links the tail back to that node."""
    dummy = ListNode(0)
    tail = dummy
    nodes = []
    for v in values:
        tail.next = ListNode(v)
        tail = tail.next
        nodes.append(tail)
    if cycle_pos >= 0:
        tail.next = nodes[cycle_pos]
    return dummy.next


def to_text(head):
    """Test helper: values separated by spaces, or the word "empty" for an empty list."""
    out = []
    while head:
        out.append(str(head.val))
        head = head.next
    return " ".join(out) if out else "empty"


CASES = [
    ([3, 2, 0, -4], 1),
    ([1, 2], 0),
    ([1], -1),
    ([1], 0),
    ([], -1),
    ([1, 2, 3, 4, 5], -1),
    ([1, 2, 3, 4, 5], 4),
    ([1, 2, 3, 4, 5], 2),
    ([1, 1, 1], -1),
    ([1, 1, 1], 1),
    ([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], -1),
    ([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], 0),
]

for values, pos in CASES:
    print("true" if has_cycle(from_list(values, pos)) else "false")
