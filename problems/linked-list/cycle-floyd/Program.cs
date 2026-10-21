// Linked list, approach 4: detect a cycle with Floyd's tortoise and hare. Two pointers, one twice as fast; they meet only in a cycle.
static bool HasCycle(ListNode? head)
{
    var slow = head; // the tortoise moves one step at a time
    var fast = head; // the hare moves two steps at a time
    while (fast != null && fast.Next != null) // 1. the hare reaching the end proves there is no cycle
    {
        slow = slow!.Next; // 2. tortoise: one step
        fast = fast.Next.Next; // 3. hare: two steps
        if (ReferenceEquals(slow, fast)) return true; // 4. inside a cycle the hare catches the tortoise
    }
    return false;
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
