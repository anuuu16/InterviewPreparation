// Counting sort: count each value, then rebuild the output from the counts.
// Needs a small value range (max - min), because it allocates one counter per possible value.
const testCases = [
  [7], [1, 2, 3, 4, 5], [], [9, 7, 5, 3, 1], [4, 2, 4, 1, 2, 4],
  [-3, 5, -1, 0, -8, 2], [29, -4, 15, 0, 8, -17, 42, 15, 3, -4, 100, 7],
];

function countingSort(input) {
  if (input.length === 0) return [];
  // 1. Find the range. `min` is the offset that lets negative numbers use index 0 and up.
  const min = Math.min(...input); // fine for small inputs; use a loop for huge arrays
  const max = Math.max(...input);
  const counts = new Array(max - min + 1).fill(0);
  for (const x of input) counts[x - min]++; // 2. count occurrences
  // 3. Prefix sums: counts[v] becomes the position just after the last v in the output.
  for (let v = 1; v < counts.length; v++) counts[v] += counts[v - 1];
  const out = new Array(input.length);
  // 4. Walk backwards so equal values keep their input order (stable).
  for (let i = input.length - 1; i >= 0; i--) out[--counts[input[i] - min]] = input[i];
  return out;
}

for (const c of testCases) console.log(countingSort(c).join(" "));
