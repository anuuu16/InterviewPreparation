#include <iostream>
#include <utility>
#include <vector>

// Search in a sorted vector that was rotated (for example [5, 7, 9, 11, 1, 3]). No duplicates.
// Key fact: after cutting at mid, at least ONE half is still sorted.
// Invariant: if target is in the vector, its index is inside [lo, hi].
int searchRotated(const std::vector<int>& nums, int target) {
    int lo = 0;
    int hi = static_cast<int>(nums.size()) - 1;  // 1. window [lo, hi], both ends included
    while (lo <= hi) {
        int mid = lo + (hi - lo) / 2;            // 2. middle, written so it cannot overflow
        if (nums[mid] == target) return mid;     // 3. found it
        if (nums[lo] <= nums[mid]) {             // 4. left half [lo..mid] is sorted
            if (nums[lo] <= target && target < nums[mid]) hi = mid - 1; // 5. target is inside the sorted half
            else lo = mid + 1;                   // 6. otherwise it must be in the other half
        } else {                                 // 7. right half [mid..hi] is sorted
            if (nums[mid] < target && target <= nums[hi]) lo = mid + 1;
            else hi = mid - 1;
        }
    }
    return -1;                                   // 8. window is empty: not found
}

int main() {
    const std::vector<std::pair<std::vector<int>, int>> cases = {
        {{}, 5},
        {{7}, 7},
        {{7}, 3},
        {{5, 7, 9, 11, 1, 3}, 1},
        {{5, 7, 9, 11, 1, 3}, 5},
        {{5, 7, 9, 11, 1, 3}, 3},
        {{5, 7, 9, 11, 1, 3}, 11},
        {{5, 7, 9, 11, 1, 3}, 0},
        {{5, 7, 9, 11, 1, 3}, 12},
        {{5, 7, 9, 11, 1, 3}, 6},
        {{1, 3, 5, 7, 9, 11}, 9},
        {{3, 1}, 1},
        {{3, 1}, 3},
        {{24, 27, 30, 33, 36, 39, 42, 45, 48, 51, 54, 57, 0, 3, 6, 9, 12, 15, 18, 21}, 42},
        {{24, 27, 30, 33, 36, 39, 42, 45, 48, 51, 54, 57, 0, 3, 6, 9, 12, 15, 18, 21}, 43},
        {{24, 27, 30, 33, 36, 39, 42, 45, 48, 51, 54, 57, 0, 3, 6, 9, 12, 15, 18, 21}, 0},
    };
    for (const auto& [nums, target] : cases) {
        std::cout << searchRotated(nums, target) << "\n";
    }
    return 0;
}
