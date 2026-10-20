// Quick sort: partition around a pivot, then sort the two sides.
#include <iostream>
#include <utility>
#include <vector>

// lo and hi are signed so that hi = -1 (empty range) works without wrap-around.
int partition(std::vector<int>& a, int lo, int hi) {
    const int mid = lo + (hi - lo) / 2;  // 1. middle pivot; "(lo + hi) / 2" could overflow
    std::swap(a[mid], a[hi]);            // park the pivot at the end
    const int pivot = a[hi];
    int store = lo;  // everything before `store` is smaller than the pivot
    for (int i = lo; i < hi; ++i) {
        if (a[i] < pivot) std::swap(a[i], a[store++]);  // 2. move smaller values to the left block
    }
    std::swap(a[store], a[hi]);  // put the pivot between the two blocks
    return store;
}

void sort(std::vector<int>& a, int lo, int hi) {
    while (lo < hi) {
        const int p = partition(a, lo, hi);  // 3. a[p] is now in its final place
        // 4. Recurse into the smaller side, loop on the larger: stack depth stays O(log n).
        if (p - lo < hi - p) {
            sort(a, lo, p - 1);
            lo = p + 1;
        } else {
            sort(a, p + 1, hi);
            hi = p - 1;
        }
    }
}

std::vector<int> quickSort(std::vector<int> a) {  // by value: we sort our own copy
    sort(a, 0, static_cast<int>(a.size()) - 1);
    return a;
}

int main() {
    const std::vector<std::vector<int>> testCases = {
        {7}, {1, 2, 3, 4, 5}, {}, {9, 7, 5, 3, 1}, {4, 2, 4, 1, 2, 4},
        {-3, 5, -1, 0, -8, 2}, {29, -4, 15, 0, 8, -17, 42, 15, 3, -4, 100, 7},
    };
    for (const auto& c : testCases) {
        const auto sorted = quickSort(c);
        for (std::size_t i = 0; i < sorted.size(); ++i) std::cout << (i ? " " : "") << sorted[i];
        std::cout << "\n";
    }
}
