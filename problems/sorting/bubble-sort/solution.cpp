// Bubble sort: repeatedly swap neighbours that are in the wrong order.
#include <iostream>
#include <utility>
#include <vector>

std::vector<int> bubbleSort(std::vector<int> a) {  // by value: the caller's vector is a copy
    // 1. Each pass pushes the largest unsorted value to the end, so `end` shrinks.
    for (std::size_t end = a.size(); end > 1; --end) {
        bool swapped = false;
        for (std::size_t i = 0; i + 1 < end; ++i) {
            // 2. Compare neighbours. Strict ">" keeps equal values in order (stable).
            if (a[i] > a[i + 1]) {
                std::swap(a[i], a[i + 1]);  // 3. swap
                swapped = true;
            }
        }
        if (!swapped) break;  // 4. a pass with no swaps means we are done
    }
    return a;
}

int main() {
    const std::vector<std::vector<int>> testCases = {
        {7}, {1, 2, 3, 4, 5}, {}, {9, 7, 5, 3, 1}, {4, 2, 4, 1, 2, 4},
        {-3, 5, -1, 0, -8, 2}, {29, -4, 15, 0, 8, -17, 42, 15, 3, -4, 100, 7},
    };
    for (const auto& c : testCases) {
        const auto sorted = bubbleSort(c);
        for (std::size_t i = 0; i < sorted.size(); ++i) std::cout << (i ? " " : "") << sorted[i];
        std::cout << "\n";
    }
}
