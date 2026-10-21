"""Anagrams, approach 4: group a list of words with a hash map. The key is the word's letter counts, not its sorted letters.

Counting is O(k) per word instead of O(k log k) for sorting. Assumes lowercase words.
"""
from collections import defaultdict


def group_anagrams(words):
    groups = defaultdict(list)  # letter counts -> the words that have those counts
    for word in words:
        counts = [0] * 26  # 1. count how many times each letter appears
        for ch in word:
            counts[ord(ch) - ord("a")] += 1
        groups[tuple(counts)].append(word)  # 2. a tuple is hashable (a list is not); 3. add the word to its group
    return list(groups.values())  # 4. the groups are the dict values

CASES = [
    "eat tea tan ate nat bat",
    "",
    "a",
    "ab ba",
    "abc def",
    "listen silent enlist google gogole inlets banana",
    "eat eat tea",
    "z y x",
    "aa a aaa a",
    "cab abc bca xyz zyx yxz aab aba baa",
    "dormitory dirtyroom",
]

# The dict has no useful order for the caller, so sort each group and then the groups to get one fixed output.
for text in CASES:
    groups = sorted((sorted(group) for group in group_anagrams(text.split())), key=lambda group: group[0])
    print(" | ".join(" ".join(group) for group in groups) if groups else "empty")
