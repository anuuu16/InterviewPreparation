"""Fibonacci, approach 1: naive recursion. Direct translation of the definition. Very slow: it repeats the same work.

F(0) = 0, F(1) = 1, F(n) = F(n - 1) + F(n - 2). Python integers never overflow.
"""


def fib(n):
    if n < 2:  # 1. base cases: F(0) = 0 and F(1) = 1
        return n
    return fib(n - 1) + fib(n - 2)  # 2. two smaller problems, solved from scratch every time

CASES = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 15, 20, 25, 27, 30]

for n in CASES:
    print(fib(n))
