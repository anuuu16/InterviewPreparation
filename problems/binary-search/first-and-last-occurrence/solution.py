# Lower bound: the first index whose value is >= target (or len(nums) if none).
# Upper bound: the first index whose value is > target (or len(nums) if none).
# Window is half-open [lo, hi). Invariant: everything before lo is on the "left side",
# everything from hi on is on the "right side", and the answer is in [lo, hi].
def lower_bound(nums, target):
    lo, hi = 0, len(nums)            # 1. hi is one past the end (not a valid index)
    while lo < hi:                   # 2. stop when the window is empty
        mid = lo + (hi - lo) // 2    # 3. middle
        if nums[mid] < target:       # 4. mid is too small: answer is to the right
            lo = mid + 1
        else:                        # 5. mid could be the answer: keep it
            hi = mid
    return lo


def upper_bound(nums, target):
    lo, hi = 0, len(nums)
    while lo < hi:
        mid = lo + (hi - lo) // 2
        if nums[mid] <= target:      # 6. same loop, only "<=" instead of "<"
            lo = mid + 1
        else:
            hi = mid
    return lo


def find_range(nums, target):
    first = lower_bound(nums, target)
    if first == len(nums) or nums[first] != target:  # 7. target absent
        return -1, -1
    return first, upper_bound(nums, target) - 1      # 8. last = one before upper bound


CASES = [
    [[], 5],
    [[7], 7],
    [[7], 3],
    [[1, 3, 5, 7, 9, 11], 1],
    [[1, 3, 5, 7, 9, 11], 11],
    [[1, 3, 5, 7, 9, 11], 7],
    [[1, 3, 5, 7, 9, 11], 0],
    [[1, 3, 5, 7, 9, 11], 12],
    [[1, 3, 5, 7, 9, 11], 6],
    [[2, 4, 4, 4, 4, 6, 8], 4],
    [[0, 3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36, 39, 42, 45, 48, 51, 54, 57], 42],
    [[0, 3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36, 39, 42, 45, 48, 51, 54, 57], 43],
    [[5, 5, 5, 5], 5],
]

if __name__ == "__main__":
    for nums, target in CASES:
        first, last = find_range(nums, target)
        print(first, last)
