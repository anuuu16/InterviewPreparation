#include <iostream>
#include <utility>
#include <vector>

// Lower bound: the first index whose value is >= target (nums.size() if none).
// Upper bound: the first index whose value is > target (nums.size() if none).
// (The standard library has std::lower_bound / std::upper_bound; we write them to see how they work.)
// Window is half-open [lo, hi). Invariant: everything before lo is on the "left side",
// everything from hi on is on the "right side", and the answer is in [lo, hi].
int lowerBound(const std::vector<int>& nums, int target) {
    int lo = 0;
    int hi = static_cast<int>(nums.size()); // 1. hi is one past the end (not a valid index)
    while (lo < hi) {                       // 2. stop when the window is empty
        int mid = lo + (hi - lo) / 2;       // 3. middle, written so it cannot overflow
        if (nums[mid] < target) lo = mid + 1; // 4. mid is too small: answer is to the right
        else hi = mid;                      // 5. mid could be the answer: keep it
    }
    return lo;
}

int upperBound(const std::vector<int>& nums, int target) {
    int lo = 0;
    int hi = static_cast<int>(nums.size());
    while (lo < hi) {
        int mid = lo + (hi - lo) / 2;
        if (nums[mid] <= target) lo = mid + 1; // 6. same loop, only "<=" instead of "<"
        else hi = mid;
    }
    return lo;
}

std::pair<int, int> findRange(const std::vector<int>& nums, int target) {
    int first = lowerBound(nums, target);
    if (first == static_cast<int>(nums.size()) || nums[first] != target) return {-1, -1}; // 7. target absent
    return {first, upperBound(nums, target) - 1};                                       // 8. last = one before upper bound
}

int main() {
    const std::vector<std::pair<std::vector<int>, int>> cases = {
        {{}, 5},
        {{7}, 7},
        {{7}, 3},
        {{1, 3, 5, 7, 9, 11}, 1},
        {{1, 3, 5, 7, 9, 11}, 11},
        {{1, 3, 5, 7, 9, 11}, 7},
        {{1, 3, 5, 7, 9, 11}, 0},
        {{1, 3, 5, 7, 9, 11}, 12},
        {{1, 3, 5, 7, 9, 11}, 6},
        {{2, 4, 4, 4, 4, 6, 8}, 4},
        {{0, 3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36, 39, 42, 45, 48, 51, 54, 57}, 42},
        {{0, 3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36, 39, 42, 45, 48, 51, 54, 57}, 43},
        {{5, 5, 5, 5}, 5},
    };
    for (const auto& [nums, target] : cases) {
        auto [first, last] = findRange(nums, target);
        std::cout << first << " " << last << "\n";
    }
    return 0;
}
