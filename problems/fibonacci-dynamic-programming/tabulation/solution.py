"""Fibonacci, approach 3: tabulation (bottom-up dynamic programming). Fill a table from the smallest subproblem upwards."""


def fib(n):
    if n < 2:  # 1. tiny inputs need no table
        return n
    table = [0] * (n + 1)  # 2. table[i] will hold F(i)
    table[1] = 1
    for i in range(2, n + 1):
        table[i] = table[i - 1] + table[i - 2]  # 3. both smaller answers are already in the table
    return table[n]  # 4. the answer is the last cell

CASES = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 15, 20, 25, 30, 35, 40, 45, 46, 47, 50]

for n in CASES:
    print(fib(n))
