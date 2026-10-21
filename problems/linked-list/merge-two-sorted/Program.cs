// Linked list, approach 5: merge two sorted lists. A dummy head node and a tail pointer relink the existing nodes in order.
static ListNode? MergeTwoLists(ListNode? a, ListNode? b)
{
    var dummy = new ListNode(0); // 1. a dummy node removes the special case of an empty result list
    var tail = dummy;
    while (a != null && b != null)
    {
        if (b.Val < a.Val) // 2. take the smaller front node; on a tie take from a (keeps the merge stable)
        {
            tail.Next = b;
            b = b.Next;
        }
        else
        {
            tail.Next = a;
            a = a.Next;
        }
        tail = tail.Next;
    }
    tail.Next = a ?? b; // 3. one list is used up: attach the rest of the other in one step
    return dummy.Next; // 4. skip the dummy
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

(int[] A, int[] B)[] cases =
{
    (new int[] { 1, 2, 4 }, new int[] { 1, 3, 4 }),
    (new int[0], new int[0]),
    (new int[0], new int[] { 0 }),
    (new int[] { 5 }, new int[0]),
    (new int[] { 1, 3, 5 }, new int[] { 2, 4, 6 }),
    (new int[] { 1, 1, 1 }, new int[] { 1, 1 }),
    (new int[] { 1, 2, 3 }, new int[] { 4, 5, 6 }),
    (new int[] { 4, 5, 6 }, new int[] { 1, 2, 3 }),
    (new int[] { -5, -1, 0 }, new int[] { -3, 2 }),
    (new int[] { 1 }, new int[] { 1 }),
    (new int[] { 2, 4, 6, 8 }, new int[] { 1, 3 }),
};

foreach (var (a, b) in cases) Console.WriteLine(ToText(MergeTwoLists(FromArray(a), FromArray(b))));

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
