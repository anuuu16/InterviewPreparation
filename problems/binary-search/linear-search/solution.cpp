#include <iostream>
#include <utility>
#include <vector>

// Linear search: look at the items one by one until the target shows up.
// Works on ANY vector (sorted or not). It is the baseline to beat.
int linearSearch(const std::vector<int>& nums, int target) {
    for (int i = 0; i < static_cast<int>(nums.size()); ++i) { // 1. visit items from left to right
        if (nums[i] == target) return i;                      // 2. the first match wins
    }
    return -1;                                                // 3. looked at everything: not found
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
        std::cout << linearSearch(nums, target) << "\n";
    }
    return 0;
}
