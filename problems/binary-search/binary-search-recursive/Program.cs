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

// Recursive binary search: the same idea, but each step calls itself on a smaller window.
// Invariant: if target is in the array, its index is inside [lo, hi].
static int Search(int[] nums, int target, int lo, int hi)
{
    if (lo > hi) return -1;                       // 1. empty window: base case, not found
    int mid = lo + (hi - lo) / 2;                 // 2. middle, written so it cannot overflow
    if (nums[mid] == target) return mid;          // 3. found it: base case
    if (nums[mid] < target) return Search(nums, target, mid + 1, hi); // 4. go right
    return Search(nums, target, lo, mid - 1);                         // 5. go left
}

static int BinarySearch(int[] nums, int target) =>
    Search(nums, target, 0, nums.Length - 1); // 6. start with the whole array
