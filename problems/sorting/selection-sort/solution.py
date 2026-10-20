"""Selection sort: find the smallest remaining value and move it to the front."""

TEST_CASES = [
    [7], [1, 2, 3, 4, 5], [], [9, 7, 5, 3, 1], [4, 2, 4, 1, 2, 4],
    [-3, 5, -1, 0, -8, 2], [29, -4, 15, 0, 8, -17, 42, 15, 3, -4, 100, 7],
]


def selection_sort(items: list[int]) -> list[int]:
    a = list(items)  # work on a copy so the caller's list is untouched
    for i in range(len(a) - 1):  # 1. a[:i] is already final
        # 2. Scan the unsorted part for the index of the smallest value.
        smallest = min(range(i, len(a)), key=a.__getitem__)
        # 3. One swap per pass. This long-distance swap is why it is not stable.
        a[i], a[smallest] = a[smallest], a[i]
    return a


for case in TEST_CASES:
    print(" ".join(map(str, selection_sort(case))))
