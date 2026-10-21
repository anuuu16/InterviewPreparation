"""Anagrams, approach 3: group a list of words with a hash map. The key is the word's letters sorted:
all anagrams share the same key. Assumes lowercase words.
"""
from collections import defaultdict


def group_anagrams(words):
    groups = defaultdict(list)  # sorted letters -> the words that have those letters
    for word in words:
        key = "".join(sorted(word))  # 1. "eat", "tea" and "ate" all become "aet"
        groups[key].append(word)  # 2. defaultdict starts a new group; 3. add the word to its group
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
