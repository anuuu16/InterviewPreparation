// Fibonacci, approach 3: tabulation (bottom-up dynamic programming). Fill a table from the smallest subproblem upwards.
// Numbers are exact up to F(78); beyond that use BigInt.
function fib(n: number): number {
  if (n < 2) return n; // 1. tiny inputs need no table
  const table: number[] = new Array(n + 1).fill(0); // 2. table[i] will hold F(i)
  table[1] = 1;
  for (let i = 2; i <= n; i++) {
    table[i] = table[i - 1] + table[i - 2]; // 3. both smaller answers are already in the table
  }
  return table[n]; // 4. the answer is the last cell
}

const cases: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 15, 20, 25, 30, 35, 40, 45, 46, 47, 50];

for (const n of cases) console.log(String(fib(n)));
