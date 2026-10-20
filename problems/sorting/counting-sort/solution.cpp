// Counting sort: count each value, then rebuild the output from the counts.
// Needs a small value range (max - min), because it allocates one counter per possible value.
#include <algorithm>
#include <iostream>
#include <vector>

std::vector<int> countingSort(const std::vector<int>& input) {
    if (input.empty()) return {};
    // 1. Find the range. `low` is the offset that lets negative numbers use index 0 and up.
    const auto [lowIt, highIt] = std::minmax_element(input.begin(), input.end());
    const int low = *lowIt;
    std::vector<std::size_t> counts(static_cast<std::size_t>(*highIt - low) + 1, 0);
    for (int x : input) ++counts[x - low];  // 2. count occurrences
    // 3. Prefix sums: counts[v] becomes the position just after the last v in the output.
    for (std::size_t v = 1; v < counts.size(); ++v) counts[v] += counts[v - 1];
    std::vector<int> out(input.size());
    // 4. Walk backwards so equal values keep their input order (stable).
    for (auto it = input.rbegin(); it != input.rend(); ++it) out[--counts[*it - low]] = *it;
    return out;
}

int main() {
    const std::vector<std::vector<int>> testCases = {
        {7}, {1, 2, 3, 4, 5}, {}, {9, 7, 5, 3, 1}, {4, 2, 4, 1, 2, 4},
        {-3, 5, -1, 0, -8, 2}, {29, -4, 15, 0, 8, -17, 42, 15, 3, -4, 100, 7},
    };
    for (const auto& c : testCases) {
        const auto sorted = countingSort(c);
        for (std::size_t i = 0; i < sorted.size(); ++i) std::cout << (i ? " " : "") << sorted[i];
        std::cout << "\n";
    }
}
