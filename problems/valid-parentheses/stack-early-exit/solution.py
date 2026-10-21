"""Valid parentheses, approach 3: stack with early exits. Same idea as approach 2, but give up as soon as success is impossible."""

CLOSER_FOR = {"(": ")", "[": "]", "{": "}"}  # push the closer we expect, so a pop is a plain comparison


def is_valid(s):
    if len(s) % 2 == 1:  # 1. brackets come in pairs, so an odd length can never be valid
        return False
    stack = []
    for i, ch in enumerate(s):
        if ch in CLOSER_FOR:
            stack.append(CLOSER_FOR[ch])  # 2. an opener: remember which closer must come
        elif not stack or stack.pop() != ch:
            return False  # 3. a wrong closer, or a closer with nothing open
        if len(stack) > len(s) - i - 1:  # 4. more open brackets than characters left to close them
            return False
    return not stack

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
