"""Anagrams, approach 2: count the letters. Add one for each letter of a, subtract one for each letter of b.

The words are anagrams exactly when every count ends at zero. Assumes lowercase letters a to z only.
(In real code, collections.Counter(a) == collections.Counter(b) does the same and also works for any characters.)
"""


def is_anagram(a, b):
    if len(a) != len(b):  # 1. different lengths can never be anagrams
        return False
    counts = [0] * 26  # 2. one counter per letter: counts[0] is 'a', counts[25] is 'z'
    for x, y in zip(a, b):
        counts[ord(x) - ord("a")] += 1  # 3. a letter of a adds one
        counts[ord(y) - ord("a")] -= 1  #    a letter of b takes one away
    return not any(counts)  # 4. all zero means the two words use the same letters

CASES = [
    ("listen", "silent"),
    ("anagram", "nagaram"),
    ("rat", "car"),
    ("a", "a"),
    ("", ""),
    ("ab", "a"),
    ("aab", "abb"),
    ("abc", "cba"),
    ("aabbcc", "abcabc"),
    ("hello", "world"),
    ("a", "b"),
    ("night", "thing"),
    ("abcd", "abce"),
    ("conversation", "voicesranton"),
    ("dormitory", "dirtyroom"),
    ("schoolmaster", "theclassroom"),
    ("restful", "fluster"),
    ("abcdefghijklmnopqrstuvwxyz", "zyxwvutsrqponmlkjihgfedcba"),
    ("zz", "z"),
    ("zzzz", "zzzy"),
]

for a, b in CASES:
    print("true" if is_anagram(a, b) else "false")
