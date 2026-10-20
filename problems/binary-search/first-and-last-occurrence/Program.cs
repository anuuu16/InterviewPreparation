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
    var (first, last) = FindRange(nums, target);
    Console.WriteLine($"{first} {last}");
}

// Lower bound: the first index whose value is >= target (nums.Length if none).
// Upper bound: the first index whose value is > target (nums.Length if none).
// Window is half-open [lo, hi). Invariant: everything before lo is on the "left side",
// everything from hi on is on the "right side", and the answer is in [lo, hi].
static int LowerBound(int[] nums, int target)
{
    int lo = 0;
    int hi = nums.Length;                 // 1. hi is one past the end (not a valid index)
    while (lo < hi)                       // 2. stop when the window is empty
    {
        int mid = lo + (hi - lo) / 2;     // 3. middle, written so it cannot overflow
        if (nums[mid] < target) lo = mid + 1; // 4. mid is too small: answer is to the right
        else hi = mid;                    // 5. mid could be the answer: keep it
    }
    return lo;
}

static int UpperBound(int[] nums, int target)
{
    int lo = 0;
    int hi = nums.Length;
    while (lo < hi)
    {
        int mid = lo + (hi - lo) / 2;
        if (nums[mid] <= target) lo = mid + 1; // 6. same loop, only "<=" instead of "<"
        else hi = mid;
    }
    return lo;
}

static (int First, int Last) FindRange(int[] nums, int target)
{
    int first = LowerBound(nums, target);
    if (first == nums.Length || nums[first] != target) return (-1, -1); // 7. target absent
    return (first, UpperBound(nums, target) - 1);                      // 8. last = one before upper bound
}
