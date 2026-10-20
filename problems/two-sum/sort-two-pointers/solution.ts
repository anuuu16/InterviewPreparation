// Two sum, approach 2: sort, then two pointers. Sort the INDICES so original positions survive.
// Rule when several pairs work: smallest first index, then smallest second index.
// Smaller of the current best pair and the pair (i, j), compared index by index.
function smaller(best: [number, number] | null, i: number, j: number): [number, number] | null {
  const a = Math.min(i, j);
  const b = Math.max(i, j);
  if (best === null || a < best[0] || (a === best[0] && b < best[1])) return [a, b];
  return best;
}

function twoSum(nums: number[], target: number): [number, number] | null {
  // 1. sort the indices by value (ties by index); nums itself stays untouched
  const order = nums.map((_, i) => i).sort((a, b) => nums[a] - nums[b] || a - b);
  let lo = 0;
  let hi = order.length - 1;
  let best: [number, number] | null = null;
  while (lo < hi) {
    const sum = nums[order[lo]] + nums[order[hi]];
    if (sum < target) lo++; // 2. too small: move the left pointer up
    else if (sum > target) hi--; // 3. too big: move the right pointer down
    else if (nums[order[lo]] === nums[order[hi]]) {
      // 4a. everything between lo and hi is equal: take its two smallest indices
      return smaller(best, order[lo], order[lo + 1]);
    } else {
      // 4b. different values: find where the run of equal right values starts
      let h = hi;
      while (nums[order[h - 1]] === nums[order[hi]]) h--;
      best = smaller(best, order[lo], order[h]); // first index of each run is the best pair
      const left = nums[order[lo]];
      while (nums[order[lo]] === left) lo++; // skip the whole left run
      hi = h - 1;
    }
  }
  return best; // 5. null when nothing matched
}

const cases: [number[], number][] = [
  [[2, 7, 11, 15], 9],
  [[3, 2, 4], 6],
  [[3, 3], 6],
  [[1, 2], 3],
  [[4, 1, 9, 6, 2, 5], 9],
  [[-3, 4, 3, 90], 0],
  [[0, 4, 3, 0], 0],
  [[2, 5, 5, 11], 10],
  [[1, 2, 3], 7],
  [[], 5],
  [[5], 5],
  [[1, 2, 3, 4, 5], 6],
  [[1, 4, 6, 9], 10],
  [[2, 2, 2, 2], 4],
  [[1, 1, 3, 3], 4],
  [[1500000000, 1500000000], 3000000000],
  [[-2000000000, 3, 2000000000], 0],
  [[8, 3, -2, 15, 7, 1, 9, 4, 12, 6, 10, 5], 17],
  [[8, 3, -2, 15, 7, 1, 9, 4, 12, 6, 10, 5], 100],
];

for (const [nums, target] of cases) {
  const r = twoSum(nums, target);
  console.log(r ? `${r[0]} ${r[1]}` : 'none');
}
