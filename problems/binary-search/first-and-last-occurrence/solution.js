// Lower bound: the first index whose value is >= target (or nums.length if none).
// Upper bound: the first index whose value is > target (or nums.length if none).
// Window is half-open [lo, hi). Invariant: everything before lo is on the "left side",
// everything from hi on is on the "right side", and the answer is in [lo, hi].
function lowerBound(nums, target) {
  let lo = 0;
  let hi = nums.length;                         // 1. hi is one past the end (not a valid index)
  while (lo < hi) {                             // 2. stop when the window is empty
    const mid = lo + Math.floor((hi - lo) / 2); // 3. middle, written so it cannot overflow
    if (nums[mid] < target) lo = mid + 1;       // 4. mid is too small: answer is to the right
    else hi = mid;                              // 5. mid could be the answer: keep it
  }
  return lo;
}

function upperBound(nums, target) {
  let lo = 0;
  let hi = nums.length;
  while (lo < hi) {
    const mid = lo + Math.floor((hi - lo) / 2);
    if (nums[mid] <= target) lo = mid + 1;      // 6. same loop, only "<=" instead of "<"
    else hi = mid;
  }
  return lo;
}

function findRange(nums, target) {
  const first = lowerBound(nums, target);
  if (first === nums.length || nums[first] !== target) return [-1, -1]; // 7. target absent
  return [first, upperBound(nums, target) - 1];                        // 8. last = one before upper bound
}

const cases = [
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
  const [first, last] = findRange(nums, target);
  console.log(`${first} ${last}`);
}
