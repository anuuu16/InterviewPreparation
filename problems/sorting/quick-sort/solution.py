"""Quick sort: partition around a pivot, then sort the two sides."""

TEST_CASES = [
    [7], [1, 2, 3, 4, 5], [], [9, 7, 5, 3, 1], [4, 2, 4, 1, 2, 4],
    [-3, 5, -1, 0, -8, 2], [29, -4, 15, 0, 8, -17, 42, 15, 3, -4, 100, 7],
]


def quick_sort(items: list[int]) -> list[int]:
    a = list(items)  # sort a copy in place
    _sort(a, 0, len(a) - 1)
    return a


def _sort(a: list[int], lo: int, hi: int) -> None:
    while lo < hi:
        p = _partition(a, lo, hi)  # 3. a[p] is now in its final place
        # 4. Recurse into the smaller side, loop on the larger: stack depth stays O(log n).
        # (CPython's recursion limit is about 1000, so this matters here.)
        if p - lo < hi - p:
            _sort(a, lo, p - 1)
            lo = p + 1
        else:
            _sort(a, p + 1, hi)
            hi = p - 1


def _partition(a: list[int], lo: int, hi: int) -> int:
    mid = lo + (hi - lo) // 2  # 1. middle pivot: sorted input is no longer the worst case
    a[mid], a[hi] = a[hi], a[mid]  # park the pivot at the end
    pivot = a[hi]
    store = lo  # everything before `store` is smaller than the pivot
    for i in range(lo, hi):
        if a[i] < pivot:  # 2. move smaller values to the left block
            a[i], a[store] = a[store], a[i]
            store += 1
    a[store], a[hi] = a[hi], a[store]  # put the pivot between the two blocks
    return store


for case in TEST_CASES:
    print(" ".join(map(str, quick_sort(case))))
