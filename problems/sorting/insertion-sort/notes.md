## Intuition

This is how most people sort playing cards in their hand. You pick up one card at a time. You slide it left past every card that is bigger, until it fits. The cards in your hand are always in order.

The big advantage: if the cards are already nearly in order, each new card barely moves, so it is very fast.

## Walkthrough

Sort `[5, 2, 4, 1, 3]`. The bar `|` marks the sorted part on the left.

| Step | Value taken | What happens | Array after the step |
| --- | --- | --- | --- |
| start | | `5` alone is sorted | `5 \| 2 4 1 3` |
| 1 | 2 | shift 5 right, place 2 | `2 5 \| 4 1 3` |
| 2 | 4 | shift 5 right, place 4 | `2 4 5 \| 1 3` |
| 3 | 1 | shift 5, 4, 2 right, place 1 | `1 2 4 5 \| 3` |
| 4 | 3 | shift 5, 4 right, place 3 | `1 2 3 4 5` |

## Complexity

| Case | Time | Why |
| --- | --- | --- |
| Best | O(n) | Already sorted: each value is compared once and does not move. |
| Average | O(n²) | On average each value moves about halfway back through the sorted part. |
| Worst | O(n²) | Reverse sorted: each value moves all the way to the front, 1 + 2 + ... + (n-1) shifts. |
| Space | O(1) | One temporary value (`key`). |

A useful way to think about it: the time is O(n + d), where d is the number of **inversions** (pairs that are in the wrong order). Sorted input has d = 0. Reverse input has about n²/2 inversions. Each shift removes exactly one inversion.

## Code explanation

1. Take the next value (`key`) from the unsorted part. Everything to its left is already sorted.
2. Shift every bigger value one step right. The loop stops when the next value is not bigger. Strict `>` means equal values are not passed, so the sort is **stable**.
3. Put `key` in the gap that opened up.

Shifting (one write per step) is cheaper than swapping (three writes per step), which is why insertion sort beats bubble sort in practice.

| Language | Difference |
| --- | --- |
| JavaScript / TypeScript / Python / Go / Java / C# | Plain index loops with `j >= 0`. |
| C++ | The index is `size_t` (unsigned), so `j >= 0` would always be true. The code keeps `j` as the gap position and checks `j > 0 && a[j - 1] > key`. |
| Go, Java, C# | Arrays and slices have fixed length, so we only overwrite existing slots. Python lists could use `insert`, but that hides the O(n) shift. |

## Edge cases and tests

Every solution in every language runs the same seven cases, in this order, and prints one line per case: the sorted values separated by single spaces.

| # | Input | Output line | What it checks |
| --- | --- | --- | --- |
| 1 | `[7]` | `7` | one item: nothing to do, no crash |
| 2 | `[1, 2, 3, 4, 5]` | `1 2 3 4 5` | already sorted |
| 3 | `[]` | (an empty line) | empty input must not crash and must print an empty line |
| 4 | `[9, 7, 5, 3, 1]` | `1 3 5 7 9` | reverse sorted, the worst case for several algorithms |
| 5 | `[4, 2, 4, 1, 2, 4]` | `1 2 2 4 4 4` | duplicates |
| 6 | `[-3, 5, -1, 0, -8, 2]` | `-8 -3 -1 0 2 5` | negative numbers and zero |
| 7 | `[29, -4, 15, 0, 8, -17, 42, 15, 3, -4, 100, 7]` | `-17 -4 -4 0 3 7 8 15 15 29 42 100` | longer mixed input with repeats |

Output rule (same in every approach and language): an empty result prints an empty line, with no placeholder. The empty case sits in the middle of the list on purpose. The test runner trims blank lines at the very start and end of the output, and a blank line in the middle survives that trimming. Each function returns a new sorted list and never changes the test data, so one case cannot affect another.

## When to use it (and when not)

- Use it for small arrays (roughly under 20-50 items) and for nearly sorted data.
- Use it as the finishing step of faster algorithms. It is also good for "online" sorting, when items arrive one at a time.
- Do not use it for large random data: O(n²).

## Interview notes

- Say: "It is O(n²) in the worst case but O(n) on nearly sorted data, and it is stable and in place."
- Expected follow-up: "Why do real libraries use it?" For small slices, its low overhead beats O(n log n) algorithms. Timsort and introsort both switch to it for short runs.
- Mistake to avoid: an off-by-one in the shifting loop (`j >= 0`, and writing the key at `j + 1`).

## Real-life usage

Very common, but hidden inside other sorts. Timsort (Python, Java object sorting, JavaScript engines) uses binary insertion sort on small runs. Introsort-style sorts (C++ `std::sort` in common implementations) finish small partitions with insertion sort. It is also how you keep a small sorted list up to date as new items arrive.
