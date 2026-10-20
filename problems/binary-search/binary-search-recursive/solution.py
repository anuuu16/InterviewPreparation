# Recursive binary search: the same idea, but each step calls itself on a smaller window.
# Invariant: if target is in the list, its index is inside [lo, hi].
def search(nums, target, lo, hi):
    if lo > hi:                      # 1. empty window: base case, not found
        return -1
    mid = lo + (hi - lo) // 2        # 2. middle
    if nums[mid] == target:          # 3. found it: base case
        return mid
    if nums[mid] < target:
        return search(nums, target, mid + 1, hi)  # 4. go right
    return search(nums, target, lo, mid - 1)      # 5. go left


def binary_search(nums, target):
    return search(nums, target, 0, len(nums) - 1)  # 6. start with the whole list


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
