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
    Console.WriteLine(BinarySearch(nums, target));
}

// Iterative binary search on a SORTED array (ascending).
// Loop invariant: if target is in the array, its index is inside [lo, hi].
static int BinarySearch(int[] nums, int target)
{
    int lo = 0;
    int hi = nums.Length - 1;                // 1. window [lo, hi], both ends included
    while (lo <= hi)                         // 2. an empty window means "not found"
    {
        int mid = lo + (hi - lo) / 2;        // 3. middle, written so it cannot overflow
        if (nums[mid] == target) return mid; // 4. found it
        if (nums[mid] < target) lo = mid + 1; // 5. target can only be on the right
        else hi = mid - 1;                   // 6. target can only be on the left
    }
    return -1;                               // 7. window is empty: not found
}
