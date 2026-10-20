// Two sum, approach 2: sort, then two pointers. Sort the INDICES so original positions survive.
// Rule when several pairs work: smallest first index, then smallest second index.
// Values are long long so that the sum of two 32-bit-sized numbers cannot overflow.
#include <algorithm>
#include <iostream>
#include <numeric>
#include <optional>
#include <utility>
#include <vector>

using Pair = std::optional<std::pair<int, int>>;

// The smaller of the current best pair and the pair (i, j), compared index by index.
Pair smaller(const Pair& best, int i, int j) {
    std::pair<int, int> p{std::min(i, j), std::max(i, j)};
    return (!best || p < *best) ? Pair(p) : best;
}

Pair twoSum(const std::vector<long long>& nums, long long target) {
    // 1. sort the indices by value (ties by index); nums itself stays untouched
    std::vector<int> order(nums.size());
    std::iota(order.begin(), order.end(), 0);
    std::sort(order.begin(), order.end(), [&](int a, int b) {
        return nums[a] != nums[b] ? nums[a] < nums[b] : a < b;
    });
    int lo = 0, hi = static_cast<int>(order.size()) - 1;
    Pair best;
    while (lo < hi) {
        long long sum = nums[order[lo]] + nums[order[hi]];
        if (sum < target) {
            lo++; // 2. too small: move the left pointer up
        } else if (sum > target) {
            hi--; // 3. too big: move the right pointer down
        } else if (nums[order[lo]] == nums[order[hi]]) {
            // 4a. everything between lo and hi is equal: take its two smallest indices
            return smaller(best, order[lo], order[lo + 1]);
        } else {
            // 4b. different values: find where the run of equal right values starts
            int h = hi;
            while (nums[order[h - 1]] == nums[order[hi]]) h--;
            best = smaller(best, order[lo], order[h]); // first index of each run is the best pair
            long long left = nums[order[lo]];
            while (nums[order[lo]] == left) lo++; // skip the whole left run
            hi = h - 1;
        }
    }
    return best; // 5. empty when nothing matched
}

struct Case {
    std::vector<long long> nums;
    long long target;
};

int main() {
    std::vector<Case> cases = {
        {{2, 7, 11, 15}, 9},
        {{3, 2, 4}, 6},
        {{3, 3}, 6},
        {{1, 2}, 3},
        {{4, 1, 9, 6, 2, 5}, 9},
        {{-3, 4, 3, 90}, 0},
        {{0, 4, 3, 0}, 0},
        {{2, 5, 5, 11}, 10},
        {{1, 2, 3}, 7},
        {{}, 5},
        {{5}, 5},
        {{1, 2, 3, 4, 5}, 6},
        {{1, 4, 6, 9}, 10},
        {{2, 2, 2, 2}, 4},
        {{1, 1, 3, 3}, 4},
        {{1500000000, 1500000000}, 3000000000},
        {{-2000000000, 3, 2000000000}, 0},
        {{8, 3, -2, 15, 7, 1, 9, 4, 12, 6, 10, 5}, 17},
        {{8, 3, -2, 15, 7, 1, 9, 4, 12, 6, 10, 5}, 100},
    };
    for (const auto& c : cases) {
        auto r = twoSum(c.nums, c.target);
        if (r) std::cout << r->first << " " << r->second << "\n";
        else std::cout << "none\n";
    }
}
