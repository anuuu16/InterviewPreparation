// Quick sort: partition around a pivot, then sort the two sides.
const testCases = [
  [7], [1, 2, 3, 4, 5], [], [9, 7, 5, 3, 1], [4, 2, 4, 1, 2, 4],
  [-3, 5, -1, 0, -8, 2], [29, -4, 15, 0, 8, -17, 42, 15, 3, -4, 100, 7],
];

function quickSort(input) {
  const a = [...input]; // sort a copy in place
  sort(a, 0, a.length - 1);
  return a;
}

function sort(a, lo, hi) {
  while (lo < hi) {
    const p = partition(a, lo, hi); // 3. a[p] is now in its final place
    // 4. Recurse into the smaller side, loop on the larger: stack depth stays O(log n).
    if (p - lo < hi - p) {
      sort(a, lo, p - 1);
      lo = p + 1;
    } else {
      sort(a, p + 1, hi);
      hi = p - 1;
    }
  }
}

function partition(a, lo, hi) {
  const mid = lo + Math.floor((hi - lo) / 2); // 1. middle pivot: sorted input is no longer the worst case
  [a[mid], a[hi]] = [a[hi], a[mid]]; // park the pivot at the end
  const pivot = a[hi];
  let store = lo; // everything before `store` is smaller than the pivot
  for (let i = lo; i < hi; i++) {
    if (a[i] < pivot) { // 2. move smaller values to the left block
      [a[i], a[store]] = [a[store], a[i]];
      store++;
    }
  }
  [a[store], a[hi]] = [a[hi], a[store]]; // put the pivot between the two blocks
  return store;
}

for (const c of testCases) console.log(quickSort(c).join(" "));
