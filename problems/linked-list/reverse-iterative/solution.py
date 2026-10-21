"""Linked list, approach 1: reverse a singly linked list iteratively. Re-point every next pointer backwards."""

class ListNode:
    def __init__(self, val, next=None):
        self.val = val
        self.next = next


def reverse_list(head):
    prev = None  # 1. the already reversed part starts empty
    current = head
    while current is not None:
        next_node = current.next  # 2. save the rest of the list before we cut the link
        current.next = prev  # 3. point this node backwards
        prev = current  # 4. the reversed part now starts at this node
        current = next_node  # 5. move on to the saved rest
    return prev  # 6. prev is the old tail, which is the new head

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
    [1, 2, 3, 4, 5],
    [],
    [1],
    [1, 2],
    [1, 2, 3],
    [7, 7, 8],
    [10, 20, 30, 40],
    [-1, 0, 1],
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
]

for values in CASES:
    print(to_text(reverse_list(from_list(values))))
