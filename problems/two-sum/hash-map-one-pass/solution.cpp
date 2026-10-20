// Two sum, approach 3: hash map, one pass. Walk from the right and remember the nearest index of each value.
// Rule when several pairs work: smallest first index, then smallest second index.
// Values are long long so that the sum of two 32-bit-sized numbers cannot overflow.
#include <iostream>
#include <optional>
#include <unordered_map>
#include <utility>
#include <vector>

std::optional<std::pair<int, int>> twoSum(const std::vector<long long>& nums, long long target) {
    std::unordered_map<long long, int> seen; // value -> smallest index to the right of i
    std::optional<std::pair<int, int>> best;
    for (int i = static_cast<int>(nums.size()) - 1; i >= 0; i--) {
        // 1. which value would complete nums[i]?
        auto it = seen.find(target - nums[i]);
        // 2. look BEFORE storing nums[i], so an element is never paired with itself
        if (it != seen.end()) best = std::make_pair(i, it->second); // 3. a later find has a smaller i
        seen[nums[i]] = i; // 4. overwrite: the newer index is the smaller one
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
