// Heap sort: build a max-heap, then keep moving the biggest value to the end.
#include <iostream>
#include <utility>
#include <vector>

// Push a[i] down until both children are smaller. Children of i are 2i+1 and 2i+2.
void siftDown(std::vector<int>& a, std::size_t i, std::size_t size) {
    for (;;) {
        std::size_t child = 2 * i + 1;
        if (child >= size) return;
        if (child + 1 < size && a[child + 1] > a[child]) ++child;  // pick the bigger child
        if (a[i] >= a[child]) return;
        std::swap(a[i], a[child]);
        i = child;
    }
}

std::vector<int> heapSort(std::vector<int> a) {  // by value: we sort our own copy
    // 1. Build a max-heap: start at the last parent and sift each one down.
    //    (i + 1 counts down to 1, which avoids a negative unsigned index.)
    for (std::size_t i = a.size() / 2; i-- > 0;) siftDown(a, i, a.size());
    for (std::size_t end = a.size(); end-- > 1;) {
        std::swap(a[0], a[end]);  // 2. the root is the max: move it to its final slot
        siftDown(a, 0, end);      // 3. the heap is now one smaller; repair it
    }
    return a;
}

int main() {
    const std::vector<std::vector<int>> testCases = {
        {7}, {1, 2, 3, 4, 5}, {}, {9, 7, 5, 3, 1}, {4, 2, 4, 1, 2, 4},
        {-3, 5, -1, 0, -8, 2}, {29, -4, 15, 0, 8, -17, 42, 15, 3, -4, 100, 7},
    };
    for (const auto& c : testCases) {
        const auto sorted = heapSort(c);
        for (std::size_t i = 0; i < sorted.size(); ++i) std::cout << (i ? " " : "") << sorted[i];
        std::cout << "\n";
    }
}
