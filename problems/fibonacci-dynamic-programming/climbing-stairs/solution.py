"""Climbing stairs: how many different ways can you climb n stairs taking 1 or 2 steps at a time?

Same recurrence as Fibonacci: ways(n) = ways(n - 1) + ways(n - 2), because the last move was a 1-step or a 2-step.
"""


def climb_stairs(n):
    ways_to_previous = 1  # 1. ways(0) = 1: standing at the bottom is one way (do nothing)
    ways_to_current = 1  # ways(1) = 1: a single 1-step
    for _ in range(2, n + 1):
        ways_to_previous, ways_to_current = ways_to_current, ways_to_previous + ways_to_current  # 2. from one or two below
    return ways_to_current  # 3. ways(n); for n = 0 or 1 the loop does not run and the answer is 1

CASES = [0, 1, 2, 3, 4, 5, 6, 7, 8, 10, 15, 20, 30, 45, 50]

for n in CASES:
    print(climb_stairs(n))
