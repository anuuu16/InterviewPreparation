// Linked list, approach 1: reverse a singly linked list iteratively. Re-point every next pointer backwards.
static ListNode? ReverseList(ListNode? head)
{
    ListNode? prev = null; // 1. the already reversed part starts empty
    var current = head;
    while (current != null)
    {
        var next = current.Next; // 2. save the rest of the list before we cut the link
        current.Next = prev; // 3. point this node backwards
        prev = current; // 4. the reversed part now starts at this node
        current = next; // 5. move on to the saved rest
    }
    return prev; // 6. prev is the old tail, which is the new head
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

// Test helper: values separated by spaces, or the word "empty" for an empty list.
static string ToText(ListNode? head)
{
    var parts = new List<string>();
    for (var n = head; n != null; n = n.Next) parts.Add(n.Val.ToString());
    return parts.Count == 0 ? "empty" : string.Join(" ", parts);
}

int[][] cases =
{
    new int[] { 1, 2, 3, 4, 5 },
    new int[0],
    new int[] { 1 },
    new int[] { 1, 2 },
    new int[] { 1, 2, 3 },
    new int[] { 7, 7, 8 },
    new int[] { 10, 20, 30, 40 },
    new int[] { -1, 0, 1 },
    new int[] { 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 },
};

foreach (var values in cases) Console.WriteLine(ToText(ReverseList(FromArray(values))));

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
