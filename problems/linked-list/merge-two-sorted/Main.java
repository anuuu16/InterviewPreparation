// Linked list, approach 5: merge two sorted lists. A dummy head node and a tail pointer relink the existing nodes in order.
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

    static ListNode mergeTwoLists(ListNode a, ListNode b) {
        ListNode dummy = new ListNode(0); // 1. a dummy node removes the special case of an empty result list
        ListNode tail = dummy;
        while (a != null && b != null) {
            if (b.val < a.val) { // 2. take the smaller front node; on a tie take from a (keeps the merge stable)
                tail.next = b;
                b = b.next;
            } else {
                tail.next = a;
                a = a.next;
            }
            tail = tail.next;
        }
        tail.next = (a != null) ? a : b; // 3. one list is used up: attach the rest of the other in one step
        return dummy.next; // 4. skip the dummy
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
        record Case(int[] a, int[] b) {}
        Case[] cases = {
            new Case(new int[]{1, 2, 4}, new int[]{1, 3, 4}),
            new Case(new int[]{}, new int[]{}),
            new Case(new int[]{}, new int[]{0}),
            new Case(new int[]{5}, new int[]{}),
            new Case(new int[]{1, 3, 5}, new int[]{2, 4, 6}),
            new Case(new int[]{1, 1, 1}, new int[]{1, 1}),
            new Case(new int[]{1, 2, 3}, new int[]{4, 5, 6}),
            new Case(new int[]{4, 5, 6}, new int[]{1, 2, 3}),
            new Case(new int[]{-5, -1, 0}, new int[]{-3, 2}),
            new Case(new int[]{1}, new int[]{1}),
            new Case(new int[]{2, 4, 6, 8}, new int[]{1, 3}),
        };
        for (Case c : cases) System.out.println(toText(mergeTwoLists(fromArray(c.a(), -1), fromArray(c.b(), -1))));
    }
}
