// Linked list, approach 2: reverse a singly linked list recursively. Reverse the rest first, then hang this node at its end.
static ListNode? ReverseList(ListNode? head)
{
    if (head == null || head.Next == null) return head; // 1. base case: empty or single node is already reversed
    var newHead = ReverseList(head.Next); // 2. reverse everything after this node; newHead is the old tail
    head.Next.Next = head; // 3. the node after us must now point back at us
    head.Next = null; // 4. we become the tail, so we point at nothing (this also prevents a cycle)
    return newHead; // 5. the new head never changes while the recursion unwinds
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
