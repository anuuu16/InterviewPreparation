"""Linked list, approach 5: merge two sorted lists. A dummy head node and a tail pointer relink the existing nodes in order."""

class ListNode:
    def __init__(self, val, next=None):
        self.val = val
        self.next = next


def merge_two_lists(a, b):
    dummy = ListNode(0)  # 1. a dummy node removes the special case of an empty result list
    tail = dummy
    while a is not None and b is not None:
        if b.val < a.val:  # 2. take the smaller front node; on a tie take from a (keeps the merge stable)
            tail.next, b = b, b.next
        else:
            tail.next, a = a, a.next
        tail = tail.next
    tail.next = a if a is not None else b  # 3. one list is used up: attach the rest of the other in one step
    return dummy.next  # 4. skip the dummy

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
    ([1, 2, 4], [1, 3, 4]),
    ([], []),
    ([], [0]),
    ([5], []),
    ([1, 3, 5], [2, 4, 6]),
    ([1, 1, 1], [1, 1]),
    ([1, 2, 3], [4, 5, 6]),
    ([4, 5, 6], [1, 2, 3]),
    ([-5, -1, 0], [-3, 2]),
    ([1], [1]),
    ([2, 4, 6, 8], [1, 3]),
]

for a, b in CASES:
    print(to_text(merge_two_lists(from_list(a), from_list(b))))
