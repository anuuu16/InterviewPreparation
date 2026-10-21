"""Linked list, approach 4: detect a cycle with Floyd's tortoise and hare. Two pointers, one twice as fast; they meet only in a cycle."""

class ListNode:
    def __init__(self, val, next=None):
        self.val = val
        self.next = next


def has_cycle(head):
    slow = head  # the tortoise moves one step at a time
    fast = head  # the hare moves two steps at a time
    while fast is not None and fast.next is not None:  # 1. the hare reaching the end proves there is no cycle
        slow = slow.next  # 2. tortoise: one step
        fast = fast.next.next  # 3. hare: two steps
        if slow is fast:  # 4. inside a cycle the hare catches the tortoise
            return True
    return False

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
