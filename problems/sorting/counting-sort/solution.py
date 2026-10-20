"""Counting sort: count each value, then rebuild the output from the counts.

Needs a small value range (max - min), because it allocates one counter per possible value.
"""

TEST_CASES = [
    [7], [1, 2, 3, 4, 5], [], [9, 7, 5, 3, 1], [4, 2, 4, 1, 2, 4],
    [-3, 5, -1, 0, -8, 2], [29, -4, 15, 0, 8, -17, 42, 15, 3, -4, 100, 7],
]


def counting_sort(items: list[int]) -> list[int]:
    if not items:
        return []
    # 1. Find the range. `low` is the offset that lets negative numbers use index 0 and up.
    low, high = min(items), max(items)
    counts = [0] * (high - low + 1)
    for x in items:  # 2. count occurrences
        counts[x - low] += 1
    # 3. Prefix sums: counts[v] becomes the position just after the last v in the output.
    for v in range(1, len(counts)):
        counts[v] += counts[v - 1]
    out = [0] * len(items)
    for x in reversed(items):  # 4. walk backwards so equal values keep their input order (stable)
        counts[x - low] -= 1
        out[counts[x - low]] = x
    return out


for case in TEST_CASES:
    print(" ".join(map(str, counting_sort(case))))
