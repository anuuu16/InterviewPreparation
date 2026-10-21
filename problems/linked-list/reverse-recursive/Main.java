// Linked list, approach 2: reverse a singly linked list recursively. Reverse the rest first, then hang this node at its end.
import java.util.ArrayList;
import java.util.List;

public class Main {
    static class ListNode {
        int val;
        ListNode next;

        ListNode(int val) {
            this.val = val;
        }
    }

    static ListNode reverseList(ListNode head) {
        if (head == null || head.next == null) return head; // 1. base case: empty or single node is already reversed
        ListNode newHead = reverseList(head.next); // 2. reverse everything after this node; newHead is the old tail
        head.next.next = head; // 3. the node after us must now point back at us
        head.next = null; // 4. we become the tail, so we point at nothing (this also prevents a cycle)
        return newHead; // 5. the new head never changes while the recursion unwinds
    }

    // Test helper: build a list from an array. cyclePos >= 0 links the tail back to that node.
    static ListNode fromArray(int[] values, int cyclePos) {
        ListNode dummy = new ListNode(0);
        ListNode tail = dummy;
        List<ListNode> nodes = new ArrayList<>();
        for (int v : values) {
            tail.next = new ListNode(v);
            tail = tail.next;
            nodes.add(tail);
        }
        if (cyclePos >= 0) tail.next = nodes.get(cyclePos);
        return dummy.next;
    }

    // Test helper: values separated by spaces, or the word "empty" for an empty list.
    static String toText(ListNode head) {
        StringBuilder sb = new StringBuilder();
        for (ListNode n = head; n != null; n = n.next) {
            if (sb.length() > 0) sb.append(' ');
            sb.append(n.val);
        }
        return sb.length() == 0 ? "empty" : sb.toString();
    }

    public static void main(String[] args) {
        int[][] cases = {
            new int[]{1, 2, 3, 4, 5},
            new int[]{},
            new int[]{1},
            new int[]{1, 2},
            new int[]{1, 2, 3},
            new int[]{7, 7, 8},
            new int[]{10, 20, 30, 40},
            new int[]{-1, 0, 1},
            new int[]{1, 2, 3, 4, 5, 6, 7, 8, 9, 10},
        };
        for (int[] values : cases) System.out.println(toText(reverseList(fromArray(values, -1))));
    }
}
