"""Anagrams, approach 1: sort the letters of both words and compare.

Two words are anagrams exactly when their sorted letters match. Assumes lowercase letters a to z only.
"""


def is_anagram(a, b):
    if len(a) != len(b):  # 1. different lengths can never be anagrams
        return False
    return sorted(a) == sorted(b)  # 2. sorted() returns a new list of letters; 3. equal lists mean equal letters

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
