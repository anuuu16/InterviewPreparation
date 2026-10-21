"""Valid parentheses, approach 2: stack. Push every opener; each closer must match the opener on top."""

OPENER = {")": "(", "]": "[", "}": "{"}  # closer -> the opener it needs


def is_valid(s):
    stack = []
    for ch in s:
        if ch in OPENER:
            # 1. a closer: the most recent opener must be its partner (pop on an empty list raises)
            if not stack or stack.pop() != OPENER[ch]:
                return False
        else:
            stack.append(ch)  # 2. an opener: wait for its partner
    return not stack  # 3. leftover openers were never closed

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
