# Iterative binary search on a SORTED list (ascending).
# Loop invariant: if target is in the list, its index is inside [lo, hi].
def binary_search(nums, target):
    lo, hi = 0, len(nums) - 1        # 1. window [lo, hi], both ends included
    while lo <= hi:                  # 2. an empty window means "not found"
        mid = lo + (hi - lo) // 2    # 3. middle (Python ints never overflow; same habit as other languages)
        if nums[mid] == target:      # 4. found it
            return mid
        if nums[mid] < target:       # 5. target can only be on the right
            lo = mid + 1
        else:                        # 6. target can only be on the left
            hi = mid - 1
    return -1                        # 7. window is empty: not found


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
        print(binary_search(nums, target))
