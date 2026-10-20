"""Two sum, approach 3: hash map, one pass. Walk from the right and remember the nearest index of each value.

Rule when several pairs work: smallest first index, then smallest second index.
"""


def two_sum(nums, target):
    seen = {}  # value -> smallest index to the right of i
    best = None
    for i in range(len(nums) - 1, -1, -1):
        # 1. which value would complete nums[i]?
        j = seen.get(target - nums[i])
        # 2. look BEFORE storing nums[i], so an element is never paired with itself
        if j is not None:
            best = (i, j)  # 3. i only gets smaller, so a later find is always better
        seen[nums[i]] = i  # 4. overwrite: the newer index is the smaller one
    return best  # 5. None when nothing matched


CASES = [
    ([2, 7, 11, 15], 9),
    ([3, 2, 4], 6),
    ([3, 3], 6),
    ([1, 2], 3),
    ([4, 1, 9, 6, 2, 5], 9),
    ([-3, 4, 3, 90], 0),
    ([0, 4, 3, 0], 0),
    ([2, 5, 5, 11], 10),
    ([1, 2, 3], 7),
    ([], 5),
    ([5], 5),
    ([1, 2, 3, 4, 5], 6),
    ([1, 4, 6, 9], 10),
    ([2, 2, 2, 2], 4),
    ([1, 1, 3, 3], 4),
    ([1500000000, 1500000000], 3000000000),
    ([-2000000000, 3, 2000000000], 0),
    ([8, 3, -2, 15, 7, 1, 9, 4, 12, 6, 10, 5], 17),
    ([8, 3, -2, 15, 7, 1, 9, 4, 12, 6, 10, 5], 100),
]

for nums, target in CASES:
    pair = two_sum(nums, target)
    print(f"{pair[0]} {pair[1]}" if pair else "none")
