// Insertion sort: grow a sorted prefix by sliding each new value into place.
#include <iostream>
#include <vector>

std::vector<int> insertionSort(std::vector<int> a) {  // by value: we sort our own copy
    for (std::size_t i = 1; i < a.size(); ++i) {      // 1. a[0..i-1] is sorted; take the next value
        const int key = a[i];
        std::size_t j = i;  // j is the gap position; unsigned, so we avoid "j - 1 >= 0"
        // 2. Shift bigger values one slot right. Strict ">" stops at equals (stable).
        while (j > 0 && a[j - 1] > key) {
            a[j] = a[j - 1];
            --j;
        }
        a[j] = key;  // 3. drop the value into the gap
    }
    return a;
}

int main() {
    const std::vector<std::vector<int>> testCases = {
        {7}, {1, 2, 3, 4, 5}, {}, {9, 7, 5, 3, 1}, {4, 2, 4, 1, 2, 4},
        {-3, 5, -1, 0, -8, 2}, {29, -4, 15, 0, 8, -17, 42, 15, 3, -4, 100, 7},
    };
    for (const auto& c : testCases) {
        const auto sorted = insertionSort(c);
        for (std::size_t i = 0; i < sorted.size(); ++i) std::cout << (i ? " " : "") << sorted[i];
        std::cout << "\n";
    }
}
