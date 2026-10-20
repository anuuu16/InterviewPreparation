public class Main {
    // Linear search: look at the items one by one until the target shows up.
    // Works on ANY array (sorted or not). It is the baseline to beat.
    static int linearSearch(int[] nums, int target) {
        for (int i = 0; i < nums.length; i++) { // 1. visit items from left to right
            if (nums[i] == target) return i;    // 2. the first match wins
        }
        return -1;                              // 3. looked at everything: not found
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
            System.out.println(linearSearch(c.nums(), c.target()));
        }
    }
}
