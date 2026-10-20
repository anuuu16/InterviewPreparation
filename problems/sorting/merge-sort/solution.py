"""Merge sort: split in half, sort each half, merge the two sorted halves."""

TEST_CASES = [
    [7], [1, 2, 3, 4, 5], [], [9, 7, 5, 3, 1], [4, 2, 4, 1, 2, 4],
    [-3, 5, -1, 0, -8, 2], [29, -4, 15, 0, 8, -17, 42, 15, 3, -4, 100, 7],
]


def merge_sort(items: list[int]) -> list[int]:
    if len(items) <= 1:  # 1. base case: 0 or 1 items is already sorted
        return list(items)
    mid = len(items) // 2  # 2. split in the middle (// is integer division)
    left = merge_sort(items[:mid])  # 3. sort each half (slices are copies)
    right = merge_sort(items[mid:])
    return _merge(left, right)


def _merge(left: list[int], right: list[int]) -> list[int]:
    out: list[int] = []
    i = j = 0
    # 4. Repeatedly take the smaller front item. "<=" takes from the left on ties (stable).
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            out.append(left[i])
            i += 1
        else:
            out.append(right[j])
            j += 1
    # 5. One side ran out: the rest of the other side is already sorted.
    out.extend(left[i:])
    out.extend(right[j:])
    return out


for case in TEST_CASES:
    print(" ".join(map(str, merge_sort(case))))
