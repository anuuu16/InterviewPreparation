var cases = new (int[] nums, int target)[]
{
    (new int[]{}, 5),
    (new int[]{7}, 7),
    (new int[]{7}, 3),
    (new int[]{1, 3, 5, 7, 9, 11}, 1),
    (new int[]{1, 3, 5, 7, 9, 11}, 11),
    (new int[]{1, 3, 5, 7, 9, 11}, 7),
    (new int[]{1, 3, 5, 7, 9, 11}, 0),
    (new int[]{1, 3, 5, 7, 9, 11}, 12),
    (new int[]{1, 3, 5, 7, 9, 11}, 6),
    (new int[]{2, 4, 4, 4, 4, 6, 8}, 4),
    (new int[]{0, 3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36, 39, 42, 45, 48, 51, 54, 57}, 42),
    (new int[]{0, 3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36, 39, 42, 45, 48, 51, 54, 57}, 43),
    (new int[]{5, 5, 5, 5}, 5),
};

foreach (var (nums, target) in cases)
{
    Console.WriteLine(LinearSearch(nums, target));
}

// Linear search: look at the items one by one until the target shows up.
// Works on ANY array (sorted or not). It is the baseline to beat.
static int LinearSearch(int[] nums, int target)
{
    for (int i = 0; i < nums.Length; i++) // 1. visit items from left to right
    {
        if (nums[i] == target) return i;  // 2. the first match wins
    }
    return -1;                            // 3. looked at everything: not found
}
