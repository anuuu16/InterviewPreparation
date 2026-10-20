// Merge sort: split in half, sort each half, merge the two sorted halves.
#include <iostream>
#include <vector>

std::vector<int> merge(const std::vector<int>& left, const std::vector<int>& right) {
    std::vector<int> out;
    out.reserve(left.size() + right.size());  // the O(n) extra space
    std::size_t i = 0, j = 0;
    // 4. Repeatedly take the smaller front item. "<=" takes from the left on ties (stable).
    while (i < left.size() && j < right.size()) {
        out.push_back(left[i] <= right[j] ? left[i++] : right[j++]);
    }
    // 5. One side ran out: copy the rest of the other side.
    out.insert(out.end(), left.begin() + i, left.end());
    out.insert(out.end(), right.begin() + j, right.end());
    return out;
}

std::vector<int> mergeSort(const std::vector<int>& input) {
    if (input.size() <= 1) return input;  // 1. base case: already sorted (returns a copy)
    const auto mid = input.begin() + input.size() / 2;  // 2. split in the middle
    // 3. Sort each half; the vector constructors copy the ranges.
    const auto left = mergeSort(std::vector<int>(input.begin(), mid));
    const auto right = mergeSort(std::vector<int>(mid, input.end()));
    return merge(left, right);
}

int main() {
    const std::vector<std::vector<int>> testCases = {
        {7}, {1, 2, 3, 4, 5}, {}, {9, 7, 5, 3, 1}, {4, 2, 4, 1, 2, 4},
        {-3, 5, -1, 0, -8, 2}, {29, -4, 15, 0, 8, -17, 42, 15, 3, -4, 100, 7},
    };
    for (const auto& c : testCases) {
        const auto sorted = mergeSort(c);
        for (std::size_t i = 0; i < sorted.size(); ++i) std::cout << (i ? " " : "") << sorted[i];
        std::cout << "\n";
    }
}
