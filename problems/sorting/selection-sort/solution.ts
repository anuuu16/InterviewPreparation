// Selection sort: find the smallest remaining value and move it to the front.
const testCases: number[][] = [
  [7], [1, 2, 3, 4, 5], [], [9, 7, 5, 3, 1], [4, 2, 4, 1, 2, 4],
  [-3, 5, -1, 0, -8, 2], [29, -4, 15, 0, 8, -17, 42, 15, 3, -4, 100, 7],
];

function selectionSort(input: readonly number[]): number[] {
  const a: number[] = [...input]; // work on a copy so the caller's array is untouched
  for (let i = 0; i < a.length - 1; i++) { // 1. a[0..i-1] is already final
    let min = i;
    for (let j = i + 1; j < a.length; j++) { // 2. scan the unsorted part for the smallest
      if (a[j] < a[min]) min = j;
    }
    // 3. One swap per pass. This long-distance swap is why it is not stable.
    if (min !== i) [a[i], a[min]] = [a[min], a[i]];
  }
  return a;
}

for (const c of testCases) console.log(selectionSort(c).join(" "));
