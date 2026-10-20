// Recursive binary search: the same idea, but each step calls itself on a smaller window.
// Invariant: if target is in the array, its index is inside [lo, hi].
function search(nums: number[], target: number, lo: number, hi: number): number {
  if (lo > hi) return -1;                        // 1. empty window: base case, not found
  const mid = lo + Math.floor((hi - lo) / 2);    // 2. middle, written so it cannot overflow
  if (nums[mid] === target) return mid;          // 3. found it: base case
  if (nums[mid] < target) return search(nums, target, mid + 1, hi); // 4. go right
  return search(nums, target, lo, mid - 1);                         // 5. go left
}

function binarySearch(nums: number[], target: number): number {
  return search(nums, target, 0, nums.length - 1); // 6. start with the whole array
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
