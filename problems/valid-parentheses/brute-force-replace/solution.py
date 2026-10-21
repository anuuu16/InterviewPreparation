"""Valid parentheses, approach 1: brute force. Delete matching pairs "()", "[]", "{}" until nothing changes.

A string is valid exactly when this reduces it to the empty string.
"""


def is_valid(s):
    while True:
        previous = s  # 1. remember the string before this round
        for pair in ("()", "[]", "{}"):
            s = s.replace(pair, "")  # 2. remove every adjacent pair
        if s == previous:  # 3. stop when a round removes nothing
            break
    return s == ""  # 4. valid only if everything was removed

CASES = [
    "()",
    "()[]{}",
    "(]",
    "([)]",
    "{[]}",
    "",
    "(",
    ")",
    "((",
    "))",
    "(((())))",
    "{[()()]}",
    "([{}])",
    "(()",
    "())",
    "]",
    "()()()()",
    "{{{{}}}}[",
    "((((((((((",
    "[({})](",
    "{[}]",
]

for s in CASES:
    print("true" if is_valid(s) else "false")
