"""Heap sort: build a max-heap, then keep moving the biggest value to the end."""

TEST_CASES = [
    [7], [1, 2, 3, 4, 5], [], [9, 7, 5, 3, 1], [4, 2, 4, 1, 2, 4],
    [-3, 5, -1, 0, -8, 2], [29, -4, 15, 0, 8, -17, 42, 15, 3, -4, 100, 7],
]


def heap_sort(items: list[int]) -> list[int]:
    a = list(items)  # sort a copy in place
    # 1. Build a max-heap: start at the last parent and sift each one down.
    for i in range(len(a) // 2 - 1, -1, -1):
        _sift_down(a, i, len(a))
    for end in range(len(a) - 1, 0, -1):
        a[0], a[end] = a[end], a[0]  # 2. the root is the max: move it to its final slot
        _sift_down(a, 0, end)  # 3. the heap is now one smaller; repair it
    return a


def _sift_down(a: list[int], i: int, size: int) -> None:
    """Push a[i] down until both children are smaller. Children of i are 2i+1 and 2i+2."""
    while True:
        child = 2 * i + 1
        if child >= size:
            return
        if child + 1 < size and a[child + 1] > a[child]:
            child += 1  # pick the bigger child
        if a[i] >= a[child]:
            return
        a[i], a[child] = a[child], a[i]
        i = child


for case in TEST_CASES:
    print(" ".join(map(str, heap_sort(case))))
