// Two sum, approach 1: brute force. Try every pair, first index first.
// Rule when several pairs work: smallest first index, then smallest second index.
// Values are long so that the sum of two 32-bit-sized numbers cannot overflow.
static (int, int)? TwoSum(long[] nums, long target)
{
    // 1. pick the first number
    for (int i = 0; i < nums.Length; i++)
    {
        // 2. pick a partner that comes after it, so one element is never used twice
        for (int j = i + 1; j < nums.Length; j++)
        {
            // 3. the loop order already gives the required answer
            if (nums[i] + nums[j] == target) return (i, j);
        }
    }
    return null; // 4. no pair
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
