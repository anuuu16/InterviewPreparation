## Intuition

Think of a pile of numbered cards face up on a table. You find the smallest card and put it first. Then you find the smallest of the remaining cards and put it second. You repeat until the pile is gone. The sorted part grows from the left, one final card at a time.

Selection sort does very few **swaps** (at most n-1), but it always does a lot of **comparisons**.

## Walkthrough

Sort `[5, 2, 4, 1, 3]`. The bar `|` separates the sorted part (left) from the unsorted part (right).

| Pass | Smallest in the unsorted part | Swap | Array after the pass |
| --- | --- | --- | --- |
| start | | | `\| 5 2 4 1 3` |
| 1 | 1 (index 3) | with index 0 | `1 \| 2 4 5 3` |
| 2 | 2 (index 1) | already in place | `1 2 \| 4 5 3` |
| 3 | 3 (index 4) | with index 2 | `1 2 3 \| 5 4` |
| 4 | 4 (index 4) | with index 3 | `1 2 3 4 \| 5` |

Why it is not stable: sort `[3a, 3b, 1]`. The smallest is `1`, and swapping it with `3a` gives `[1, 3b, 3a]`. The two equal threes changed order.

## Complexity

| Case | Time | Why |
| --- | --- | --- |
| Best | O(n²) | Even for sorted input it still scans the whole unsorted part to be sure. |
| Average | O(n²) | n-1 passes, each scanning the rest. |
| Worst | O(n²) | Same number of comparisons for every input. |
| Space | O(1) | Only the index of the smallest value. |

The number of comparisons is (n-1) + (n-2) + ... + 1 = n(n-1)/2, for every input. The number of swaps is at most n-1, which is the one good thing about it: if writing to memory is expensive (for example flash memory), fewer writes help.

## Code explanation

1. The outer loop fixes position `i`. Everything left of `i` is final.
2. The inner loop scans the unsorted part and remembers the index of the smallest value. In Python we use `min(range(...), key=...)` to find that index.
3. One swap puts the smallest value at `i`. The swap jumps over other items, and that is why equal values can change order.

| Language | Difference |
| --- | --- |
| JavaScript / TypeScript | Destructuring swap. We skip the swap when `min === i`. |
| Python | `min(..., key=a.__getitem__)` finds the index of the smallest value in one expression. |
| Go | Tuple swap. Slices share memory, so we copy first. |
| Java | Temporary variable for the swap. |
| C# | Tuple swap `(a[i], a[smallest]) = (a[smallest], a[i])`. |
| C++ | `std::swap`; loop bound `i + 1 < a.size()` avoids unsigned underflow on an empty vector. |

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

- Use it when writes are far more expensive than reads, or to show the idea of "grow a sorted prefix".
- Do not use it when you need stability, or for anything but tiny inputs. It never gets faster on nearly sorted data, unlike insertion sort.

## Interview notes

- Say: "It does at most n-1 swaps but always n²/2 comparisons."
- Expected follow-up: "Why is it not stable?" Use the `[3a, 3b, 1]` example. A stable version exists (insert instead of swap) but it is then close to insertion sort.
- Mistake to avoid: forgetting the sorted/unsorted boundary and scanning the whole array every pass.

## Real-life usage

Rare. It is a teaching tool. A related idea, "find the best item, take it out", appears in top-K selection (quickselect or a heap), where you do not need to sort everything.
