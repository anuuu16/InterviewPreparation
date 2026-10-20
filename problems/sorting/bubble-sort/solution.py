"""Bubble sort: repeatedly swap neighbours that are in the wrong order."""

TEST_CASES = [
    [7], [1, 2, 3, 4, 5], [], [9, 7, 5, 3, 1], [4, 2, 4, 1, 2, 4],
    [-3, 5, -1, 0, -8, 2], [29, -4, 15, 0, 8, -17, 42, 15, 3, -4, 100, 7],
]


def bubble_sort(items: list[int]) -> list[int]:
    a = list(items)  # work on a copy so the caller's list is untouched
    # 1. Each pass pushes the largest unsorted value to the end, so `end` shrinks.
    for end in range(len(a) - 1, 0, -1):
        swapped = False
        for i in range(end):
            # 2. Compare neighbours. Strict ">" keeps equal values in order (stable).
            if a[i] > a[i + 1]:
                a[i], a[i + 1] = a[i + 1], a[i]  # 3. swap
                swapped = True
        if not swapped:  # 4. a pass with no swaps means we are done
            break
    return a


for case in TEST_CASES:
    print(" ".join(map(str, bubble_sort(case))))
