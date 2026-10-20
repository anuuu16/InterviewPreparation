// Two sum, approach 2: sort, then two pointers. Sort the INDICES so original positions survive.
// Rule when several pairs work: smallest first index, then smallest second index.
// Values are long so that the sum of two 32-bit-sized numbers cannot overflow.
using System.Linq;

// The smaller of the current best pair and the pair (i, j), compared index by index.
static (int, int)? Smaller((int, int)? best, int i, int j)
{
    var pair = (Math.Min(i, j), Math.Max(i, j));
    return best is null || pair.CompareTo(best.Value) < 0 ? pair : best;
}

static (int, int)? TwoSum(long[] nums, long target)
{
    // 1. sort the indices by value (ties by index); nums itself stays untouched
    int[] order = Enumerable.Range(0, nums.Length).OrderBy(i => nums[i]).ThenBy(i => i).ToArray();
    int lo = 0, hi = order.Length - 1;
    (int, int)? best = null;
    while (lo < hi)
    {
        long sum = nums[order[lo]] + nums[order[hi]];
        if (sum < target) lo++; // 2. too small: move the left pointer up
        else if (sum > target) hi--; // 3. too big: move the right pointer down
        else if (nums[order[lo]] == nums[order[hi]])
        {
            // 4a. everything between lo and hi is equal: take its two smallest indices
            return Smaller(best, order[lo], order[lo + 1]);
        }
        else
        {
            // 4b. different values: find where the run of equal right values starts
            int h = hi;
            while (nums[order[h - 1]] == nums[order[hi]]) h--;
            best = Smaller(best, order[lo], order[h]); // first index of each run is the best pair
            long left = nums[order[lo]];
            while (nums[order[lo]] == left) lo++; // skip the whole left run
            hi = h - 1;
        }
    }
    return best; // 5. null when nothing matched
}

(long[] Nums, long Target)[] cases =
{
    (new long[] { 2, 7, 11, 15 }, 9L),
    (new long[] { 3, 2, 4 }, 6L),
    (new long[] { 3, 3 }, 6L),
    (new long[] { 1, 2 }, 3L),
    (new long[] { 4, 1, 9, 6, 2, 5 }, 9L),
    (new long[] { -3, 4, 3, 90 }, 0L),
    (new long[] { 0, 4, 3, 0 }, 0L),
    (new long[] { 2, 5, 5, 11 }, 10L),
    (new long[] { 1, 2, 3 }, 7L),
    (new long[] {  }, 5L),
    (new long[] { 5 }, 5L),
    (new long[] { 1, 2, 3, 4, 5 }, 6L),
    (new long[] { 1, 4, 6, 9 }, 10L),
    (new long[] { 2, 2, 2, 2 }, 4L),
    (new long[] { 1, 1, 3, 3 }, 4L),
    (new long[] { 1500000000, 1500000000 }, 3000000000L),
    (new long[] { -2000000000, 3, 2000000000 }, 0L),
    (new long[] { 8, 3, -2, 15, 7, 1, 9, 4, 12, 6, 10, 5 }, 17L),
    (new long[] { 8, 3, -2, 15, 7, 1, 9, 4, 12, 6, 10, 5 }, 100L),
};

foreach (var (nums, target) in cases)
{
    var r = TwoSum(nums, target);
    Console.WriteLine(r is { } p ? $"{p.Item1} {p.Item2}" : "none");
}
