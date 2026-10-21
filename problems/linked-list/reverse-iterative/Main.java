// Linked list, approach 1: reverse a singly linked list iteratively. Re-point every next pointer backwards.
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
        ListNode prev = null; // 1. the already reversed part starts empty
        ListNode current = head;
        while (current != null) {
            ListNode next = current.next; // 2. save the rest of the list before we cut the link
            current.next = prev; // 3. point this node backwards
            prev = current; // 4. the reversed part now starts at this node
            current = next; // 5. move on to the saved rest
        }
        return prev; // 6. prev is the old tail, which is the new head
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
