// Bubble sort: repeatedly swap neighbours that are in the wrong order.
const testCases: number[][] = [
  [7], [1, 2, 3, 4, 5], [], [9, 7, 5, 3, 1], [4, 2, 4, 1, 2, 4],
  [-3, 5, -1, 0, -8, 2], [29, -4, 15, 0, 8, -17, 42, 15, 3, -4, 100, 7],
];

function bubbleSort(input: readonly number[]): number[] {
  const a: number[] = [...input]; // work on a copy so the caller's array is untouched
  // 1. Each pass pushes the largest unsorted value to the end, so `end` shrinks.
  for (let end = a.length - 1; end > 0; end--) {
    let swapped = false;
    for (let i = 0; i < end; i++) {
      // 2. Compare neighbours. Strict ">" keeps equal values in order (stable).
      if (a[i] > a[i + 1]) {
        [a[i], a[i + 1]] = [a[i + 1], a[i]]; // 3. swap
        swapped = true;
      }
    }
    if (!swapped) break; // 4. a pass with no swaps means we are done
  }
  return a;
}

for (const c of testCases) console.log(bubbleSort(c).join(" "));
