// Linked list, approach 3: detect a cycle with a hash set. Remember every node visited; seeing one twice means a cycle.
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

public class Main {
    static class ListNode {
        int val;
        ListNode next;

        ListNode(int val) {
            this.val = val;
        }
    }

    static boolean hasCycle(ListNode head) {
        Set<ListNode> seen = new HashSet<>(); // ListNode does not override equals/hashCode, so this compares by identity
        for (ListNode node = head; node != null; node = node.next) {
            if (!seen.add(node)) return true; // 1. add returns false when the node was already there: a cycle
            // 2. otherwise the node is now remembered
        }
        return false; // 3. we fell off the end, so the list has an end and no cycle
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
        record Case(int[] values, int pos) {}
        Case[] cases = {
            new Case(new int[]{3, 2, 0, -4}, 1),
            new Case(new int[]{1, 2}, 0),
            new Case(new int[]{1}, -1),
            new Case(new int[]{1}, 0),
            new Case(new int[]{}, -1),
            new Case(new int[]{1, 2, 3, 4, 5}, -1),
            new Case(new int[]{1, 2, 3, 4, 5}, 4),
            new Case(new int[]{1, 2, 3, 4, 5}, 2),
            new Case(new int[]{1, 1, 1}, -1),
            new Case(new int[]{1, 1, 1}, 1),
            new Case(new int[]{1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12}, -1),
            new Case(new int[]{1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12}, 0),
        };
        for (Case c : cases) System.out.println(hasCycle(fromArray(c.values(), c.pos())));
    }
}
