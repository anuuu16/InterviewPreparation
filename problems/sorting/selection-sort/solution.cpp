// Selection sort: find the smallest remaining value and move it to the front.
#include <iostream>
#include <utility>
#include <vector>

std::vector<int> selectionSort(std::vector<int> a) {  // by value: we sort our own copy
    for (std::size_t i = 0; i + 1 < a.size(); ++i) {  // 1. a[0..i-1] is already final
        std::size_t smallest = i;
        for (std::size_t j = i + 1; j < a.size(); ++j) {  // 2. scan the unsorted part
            if (a[j] < a[smallest]) smallest = j;
        }
        // 3. One swap per pass. This long-distance swap is why it is not stable.
        std::swap(a[i], a[smallest]);
    }
    return a;
}

int main() {
    const std::vector<std::vector<int>> testCases = {
        {7}, {1, 2, 3, 4, 5}, {}, {9, 7, 5, 3, 1}, {4, 2, 4, 1, 2, 4},
        {-3, 5, -1, 0, -8, 2}, {29, -4, 15, 0, 8, -17, 42, 15, 3, -4, 100, 7},
    };
    for (const auto& c : testCases) {
        const auto sorted = selectionSort(c);
        for (std::size_t i = 0; i < sorted.size(); ++i) std::cout << (i ? " " : "") << sorted[i];
        std::cout << "\n";
    }
}
