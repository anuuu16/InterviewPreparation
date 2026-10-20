// Merge sort: split in half, sort each half, merge the two sorted halves.
const testCases = [
  [7], [1, 2, 3, 4, 5], [], [9, 7, 5, 3, 1], [4, 2, 4, 1, 2, 4],
  [-3, 5, -1, 0, -8, 2], [29, -4, 15, 0, 8, -17, 42, 15, 3, -4, 100, 7],
];

function mergeSort(input) {
  if (input.length <= 1) return [...input]; // 1. base case: 0 or 1 items is already sorted
  const mid = input.length >> 1; // 2. split in the middle (no overflow: it is a length)
  const left = mergeSort(input.slice(0, mid)); // 3. sort each half
  const right = mergeSort(input.slice(mid));
  return merge(left, right);
}

function merge(left, right) {
  const out = [];
  let i = 0;
  let j = 0;
  // 4. Repeatedly take the smaller front item. "<=" takes from the left on ties (stable).
  while (i < left.length && j < right.length) {
    out.push(left[i] <= right[j] ? left[i++] : right[j++]);
  }
  // 5. One side ran out: the rest of the other side is already sorted.
  return out.concat(left.slice(i), right.slice(j));
}

for (const c of testCases) console.log(mergeSort(c).join(" "));
