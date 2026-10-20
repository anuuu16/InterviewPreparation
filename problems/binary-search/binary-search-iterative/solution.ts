// Iterative binary search on a SORTED array (ascending).
// Loop invariant: if target is in the array, its index is inside [lo, hi].
function binarySearch(nums: number[], target: number): number {
  let lo = 0;
  let hi = nums.length - 1;                      // 1. window [lo, hi], both ends included
  while (lo <= hi) {                             // 2. an empty window means "not found"
    const mid = lo + Math.floor((hi - lo) / 2);  // 3. middle, written so it cannot overflow
    if (nums[mid] === target) return mid;        // 4. found it
    if (nums[mid] < target) lo = mid + 1;        // 5. target can only be on the right
    else hi = mid - 1;                           // 6. target can only be on the left
  }
  return -1;                                     // 7. window is empty: not found
}

const cases: Array<[number[], number]> = [
    [[], 5],
    [[7], 7],
    [[7], 3],
    [[1, 3, 5, 7, 9, 11], 1],
    [[1, 3, 5, 7, 9, 11], 11],
    [[1, 3, 5, 7, 9, 11], 7],
    [[1, 3, 5, 7, 9, 11], 0],
    [[1, 3, 5, 7, 9, 11], 12],
    [[1, 3, 5, 7, 9, 11], 6],
    [[2, 4, 4, 4, 4, 6, 8], 4],
    [[0, 3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36, 39, 42, 45, 48, 51, 54, 57], 42],
    [[0, 3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36, 39, 42, 45, 48, 51, 54, 57], 43],
    [[5, 5, 5, 5], 5],
];

for (const [nums, target] of cases) {
  console.log(binarySearch(nums, target));
}
