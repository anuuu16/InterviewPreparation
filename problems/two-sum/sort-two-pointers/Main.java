// Two sum, approach 2: sort, then two pointers. Sort the INDICES so original positions survive.
// Rule when several pairs work: smallest first index, then smallest second index.
// Values are long so that the sum of two 32-bit-sized numbers cannot overflow.
import java.util.Arrays;
import java.util.Comparator;

public class Main {
    // The smaller of the current best pair and the pair (i, j), compared index by index.
    static int[] smaller(int[] best, int i, int j) {
        int a = Math.min(i, j), b = Math.max(i, j);
        if (best == null || a < best[0] || (a == best[0] && b < best[1])) return new int[] {a, b};
        return best;
    }

    static int[] twoSum(long[] nums, long target) {
        // 1. sort the indices by value (ties by index); nums itself stays untouched
        Integer[] order = new Integer[nums.length];
        for (int i = 0; i < order.length; i++) order[i] = i;
        Arrays.sort(order, Comparator.comparingLong((Integer i) -> nums[i]).thenComparingInt(i -> i));
        int lo = 0, hi = order.length - 1;
        int[] best = null;
        while (lo < hi) {
            long sum = nums[order[lo]] + nums[order[hi]];
            if (sum < target) {
                lo++; // 2. too small: move the left pointer up
            } else if (sum > target) {
                hi--; // 3. too big: move the right pointer down
            } else if (nums[order[lo]] == nums[order[hi]]) {
                // 4a. everything between lo and hi is equal: take its two smallest indices
                return smaller(best, order[lo], order[lo + 1]);
            } else {
                // 4b. different values: find where the run of equal right values starts
                int h = hi;
                while (nums[order[h - 1]] == nums[order[hi]]) h--;
                best = smaller(best, order[lo], order[h]); // first index of each run is the best pair
                long left = nums[order[lo]];
                while (nums[order[lo]] == left) lo++; // skip the whole left run
                hi = h - 1;
            }
        }
        return best; // 5. null when nothing matched
    }

    record Case(long[] nums, long target) {}

    public static void main(String[] args) {
        Case[] cases = {
            new Case(new long[]{2, 7, 11, 15}, 9L),
            new Case(new long[]{3, 2, 4}, 6L),
            new Case(new long[]{3, 3}, 6L),
            new Case(new long[]{1, 2}, 3L),
            new Case(new long[]{4, 1, 9, 6, 2, 5}, 9L),
            new Case(new long[]{-3, 4, 3, 90}, 0L),
            new Case(new long[]{0, 4, 3, 0}, 0L),
            new Case(new long[]{2, 5, 5, 11}, 10L),
            new Case(new long[]{1, 2, 3}, 7L),
            new Case(new long[]{}, 5L),
            new Case(new long[]{5}, 5L),
            new Case(new long[]{1, 2, 3, 4, 5}, 6L),
            new Case(new long[]{1, 4, 6, 9}, 10L),
            new Case(new long[]{2, 2, 2, 2}, 4L),
            new Case(new long[]{1, 1, 3, 3}, 4L),
            new Case(new long[]{1500000000, 1500000000}, 3000000000L),
            new Case(new long[]{-2000000000, 3, 2000000000}, 0L),
            new Case(new long[]{8, 3, -2, 15, 7, 1, 9, 4, 12, 6, 10, 5}, 17L),
            new Case(new long[]{8, 3, -2, 15, 7, 1, 9, 4, 12, 6, 10, 5}, 100L),
        };
        for (Case c : cases) {
            int[] r = twoSum(c.nums(), c.target());
            System.out.println(r == null ? "none" : r[0] + " " + r[1]);
        }
    }
}
