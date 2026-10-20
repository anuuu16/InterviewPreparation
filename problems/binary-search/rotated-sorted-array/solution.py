# Search in a sorted list that was rotated (for example [5, 7, 9, 11, 1, 3]). No duplicates.
# Key fact: after cutting at mid, at least ONE half is still sorted.
# Invariant: if target is in the list, its index is inside [lo, hi].
def search_rotated(nums, target):
    lo, hi = 0, len(nums) - 1                 # 1. window [lo, hi], both ends included
    while lo <= hi:
        mid = lo + (hi - lo) // 2             # 2. middle
        if nums[mid] == target:               # 3. found it
            return mid
        if nums[lo] <= nums[mid]:             # 4. left half [lo..mid] is sorted
            if nums[lo] <= target < nums[mid]:  # 5. target is inside the sorted half
                hi = mid - 1
            else:                             # 6. otherwise it must be in the other half
                lo = mid + 1
        else:                                 # 7. right half [mid..hi] is sorted
            if nums[mid] < target <= nums[hi]:
                lo = mid + 1
            else:
                hi = mid - 1
    return -1                                 # 8. window is empty: not found


CASES = [
    [[], 5],
    [[7], 7],
    [[7], 3],
    [[5, 7, 9, 11, 1, 3], 1],
    [[5, 7, 9, 11, 1, 3], 5],
    [[5, 7, 9, 11, 1, 3], 3],
    [[5, 7, 9, 11, 1, 3], 11],
    [[5, 7, 9, 11, 1, 3], 0],
    [[5, 7, 9, 11, 1, 3], 12],
    [[5, 7, 9, 11, 1, 3], 6],
    [[1, 3, 5, 7, 9, 11], 9],
    [[3, 1], 1],
    [[3, 1], 3],
    [[24, 27, 30, 33, 36, 39, 42, 45, 48, 51, 54, 57, 0, 3, 6, 9, 12, 15, 18, 21], 42],
    [[24, 27, 30, 33, 36, 39, 42, 45, 48, 51, 54, 57, 0, 3, 6, 9, 12, 15, 18, 21], 43],
    [[24, 27, 30, 33, 36, 39, 42, 45, 48, 51, 54, 57, 0, 3, 6, 9, 12, 15, 18, 21], 0],
]

if __name__ == "__main__":
    for nums, target in CASES:
        print(search_rotated(nums, target))
