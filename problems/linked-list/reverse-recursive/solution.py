"""Linked list, approach 2: reverse a singly linked list recursively. Reverse the rest first, then hang this node at its end."""

class ListNode:
    def __init__(self, val, next=None):
        self.val = val
        self.next = next


def reverse_list(head):
    if head is None or head.next is None:  # 1. base case: empty or single node is already reversed
        return head
    new_head = reverse_list(head.next)  # 2. reverse everything after this node; new_head is the old tail
    head.next.next = head  # 3. the node after us must now point back at us
    head.next = None  # 4. we become the tail, so we point at nothing (this also prevents a cycle)
    return new_head  # 5. the new head never changes while the recursion unwinds

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
