var cases = new (int[] nums, int target)[]
{
    (new int[]{}, 5),
    (new int[]{7}, 7),
    (new int[]{7}, 3),
    (new int[]{5, 7, 9, 11, 1, 3}, 1),
    (new int[]{5, 7, 9, 11, 1, 3}, 5),
    (new int[]{5, 7, 9, 11, 1, 3}, 3),
    (new int[]{5, 7, 9, 11, 1, 3}, 11),
    (new int[]{5, 7, 9, 11, 1, 3}, 0),
    (new int[]{5, 7, 9, 11, 1, 3}, 12),
    (new int[]{5, 7, 9, 11, 1, 3}, 6),
    (new int[]{1, 3, 5, 7, 9, 11}, 9),
    (new int[]{3, 1}, 1),
    (new int[]{3, 1}, 3),
    (new int[]{24, 27, 30, 33, 36, 39, 42, 45, 48, 51, 54, 57, 0, 3, 6, 9, 12, 15, 18, 21}, 42),
    (new int[]{24, 27, 30, 33, 36, 39, 42, 45, 48, 51, 54, 57, 0, 3, 6, 9, 12, 15, 18, 21}, 43),
    (new int[]{24, 27, 30, 33, 36, 39, 42, 45, 48, 51, 54, 57, 0, 3, 6, 9, 12, 15, 18, 21}, 0),
};

foreach (var (nums, target) in cases)
{
    Console.WriteLine(SearchRotated(nums, target));
}

// Search in a sorted array that was rotated (for example [5, 7, 9, 11, 1, 3]). No duplicates.
// Key fact: after cutting at mid, at least ONE half is still sorted.
// Invariant: if target is in the array, its index is inside [lo, hi].
static int SearchRotated(int[] nums, int target)
{
    int lo = 0;
    int hi = nums.Length - 1;                    // 1. window [lo, hi], both ends included
    while (lo <= hi)
    {
        int mid = lo + (hi - lo) / 2;            // 2. middle, written so it cannot overflow
        if (nums[mid] == target) return mid;     // 3. found it
        if (nums[lo] <= nums[mid])               // 4. left half [lo..mid] is sorted
        {
            if (nums[lo] <= target && target < nums[mid]) hi = mid - 1; // 5. target is inside the sorted half
            else lo = mid + 1;                   // 6. otherwise it must be in the other half
        }
        else                                     // 7. right half [mid..hi] is sorted
        {
            if (nums[mid] < target && target <= nums[hi]) lo = mid + 1;
            else hi = mid - 1;
        }
    }
    return -1;                                   // 8. window is empty: not found
}
