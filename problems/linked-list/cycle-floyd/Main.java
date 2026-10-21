// Linked list, approach 4: detect a cycle with Floyd's tortoise and hare. Two pointers, one twice as fast; they meet only in a cycle.
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

    static boolean hasCycle(ListNode head) {
        ListNode slow = head; // the tortoise moves one step at a time
        ListNode fast = head; // the hare moves two steps at a time
        while (fast != null && fast.next != null) { // 1. the hare reaching the end proves there is no cycle
            slow = slow.next; // 2. tortoise: one step
            fast = fast.next.next; // 3. hare: two steps
            if (slow == fast) return true; // 4. inside a cycle the hare catches the tortoise (== compares references)
        }
        return false;
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
