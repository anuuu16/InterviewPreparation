"""Insertion sort: grow a sorted prefix by sliding each new value into place."""

TEST_CASES = [
    [7], [1, 2, 3, 4, 5], [], [9, 7, 5, 3, 1], [4, 2, 4, 1, 2, 4],
    [-3, 5, -1, 0, -8, 2], [29, -4, 15, 0, 8, -17, 42, 15, 3, -4, 100, 7],
]


def insertion_sort(items: list[int]) -> list[int]:
    a = list(items)  # work on a copy so the caller's list is untouched
    for i in range(1, len(a)):  # 1. a[:i] is sorted; take the next value
        key = a[i]
        j = i - 1
        # 2. Shift bigger values one slot right. Strict ">" stops at equals (stable).
        while j >= 0 and a[j] > key:
            a[j + 1] = a[j]
            j -= 1
        a[j + 1] = key  # 3. drop the value into the gap
    return a


for case in TEST_CASES:
    print(" ".join(map(str, insertion_sort(case))))
