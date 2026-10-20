// Two sum, approach 1: brute force. Try every pair, first index first.
// Rule when several pairs work: smallest first index, then smallest second index.
// Values are long long so that the sum of two 32-bit-sized numbers cannot overflow.
#include <iostream>
#include <optional>
#include <utility>
#include <vector>

std::optional<std::pair<int, int>> twoSum(const std::vector<long long>& nums, long long target) {
    int n = static_cast<int>(nums.size());
    // 1. pick the first number
    for (int i = 0; i < n; i++) {
        // 2. pick a partner that comes after it, so one element is never used twice
        for (int j = i + 1; j < n; j++) {
            // 3. the loop order already gives the required answer
            if (nums[i] + nums[j] == target) return std::make_pair(i, j);
        }
    }
    return std::nullopt; // 4. no pair
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
