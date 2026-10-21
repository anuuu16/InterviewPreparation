// Linked list, approach 3: detect a cycle with a hash set. Remember every node visited; seeing one twice means a cycle.
static bool HasCycle(ListNode? head)
{
    var seen = new HashSet<ListNode>(); // a class without Equals/GetHashCode overrides is compared by reference
    for (var node = head; node != null; node = node.Next)
    {
        if (!seen.Add(node)) return true; // 1. Add returns false when the node was already there: a cycle
        // 2. otherwise the node is now remembered
    }
    return false; // 3. we fell off the end, so the list has an end and no cycle
}

// Test helper: build a list from an array. cyclePos >= 0 links the tail back to that node.
static ListNode? FromArray(int[] values, int cyclePos = -1)
{
    var dummy = new ListNode(0);
    var tail = dummy;
    var nodes = new List<ListNode>();
    foreach (int v in values)
    {
        tail.Next = new ListNode(v);
        tail = tail.Next;
        nodes.Add(tail);
    }
    if (cyclePos >= 0) tail.Next = nodes[cyclePos];
    return dummy.Next;
}

(int[] Values, int Pos)[] cases =
{
    (new int[] { 3, 2, 0, -4 }, 1),
    (new int[] { 1, 2 }, 0),
    (new int[] { 1 }, -1),
    (new int[] { 1 }, 0),
    (new int[0], -1),
    (new int[] { 1, 2, 3, 4, 5 }, -1),
    (new int[] { 1, 2, 3, 4, 5 }, 4),
    (new int[] { 1, 2, 3, 4, 5 }, 2),
    (new int[] { 1, 1, 1 }, -1),
    (new int[] { 1, 1, 1 }, 1),
    (new int[] { 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12 }, -1),
    (new int[] { 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12 }, 0),
};

foreach (var (values, pos) in cases) Console.WriteLine(HasCycle(FromArray(values, pos)) ? "true" : "false");

// In top-level programs, type declarations must come after the statements.
class ListNode
{
    public int Val;
    public ListNode? Next;

    public ListNode(int val)
    {
        Val = val;
    }
}
