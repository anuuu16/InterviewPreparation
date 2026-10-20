public class Main {
    // Recursive binary search: the same idea, but each step calls itself on a smaller window.
    // Invariant: if target is in the array, its index is inside [lo, hi].
    static int search(int[] nums, int target, int lo, int hi) {
        if (lo > hi) return -1;                       // 1. empty window: base case, not found
        int mid = lo + (hi - lo) / 2;                 // 2. middle, written so it cannot overflow
        if (nums[mid] == target) return mid;          // 3. found it: base case
        if (nums[mid] < target) return search(nums, target, mid + 1, hi); // 4. go right
        return search(nums, target, lo, mid - 1);                         // 5. go left
    }

    static int binarySearch(int[] nums, int target) {
        return search(nums, target, 0, nums.length - 1); // 6. start with the whole array
    }

    record Case(int[] nums, int target) {}

    public static void main(String[] args) {
        Case[] cases = {
        new Case(new int[]{}, 5),
        new Case(new int[]{7}, 7),
        new Case(new int[]{7}, 3),
        new Case(new int[]{1, 3, 5, 7, 9, 11}, 1),
        new Case(new int[]{1, 3, 5, 7, 9, 11}, 11),
        new Case(new int[]{1, 3, 5, 7, 9, 11}, 7),
        new Case(new int[]{1, 3, 5, 7, 9, 11}, 0),
        new Case(new int[]{1, 3, 5, 7, 9, 11}, 12),
        new Case(new int[]{1, 3, 5, 7, 9, 11}, 6),
        new Case(new int[]{2, 4, 4, 4, 4, 6, 8}, 4),
        new Case(new int[]{0, 3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36, 39, 42, 45, 48, 51, 54, 57}, 42),
        new Case(new int[]{0, 3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36, 39, 42, 45, 48, 51, 54, 57}, 43),
        new Case(new int[]{5, 5, 5, 5}, 5),
        };
        for (Case c : cases) {
            System.out.println(binarySearch(c.nums(), c.target()));
        }
    }
}
