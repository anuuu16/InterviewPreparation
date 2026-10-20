## Intuition

Imagine people standing in a line, and you want them ordered by height. You walk along the line and look at each pair of neighbours. If the left person is taller, they swap places. When you reach the end, the tallest person has "bubbled" to the end of the line. Walk again, and the second tallest settles next to them. Keep going until a whole walk needs no swaps.

It is slow, but it is the easiest sort to explain, so interviewers use it as a warm-up.

## Walkthrough

Sort `[5, 2, 4, 1, 3]`. Each pass compares neighbours from the left and stops one place earlier than the pass before.

| Pass | Swaps made | Array after the pass |
| --- | --- | --- |
| start | | `5 2 4 1 3` |
| 1 | 5 and 2, 5 and 4, 5 and 1, 5 and 3 | `2 4 1 3 5` |
| 2 | 4 and 1, 4 and 3 | `2 1 3 4 5` |
| 3 | 2 and 1 | `1 2 3 4 5` |
| 4 | none, so stop | `1 2 3 4 5` |

After pass 1 the largest value (5) is in its final place. After pass 2 the two largest are in place, and so on. That is why each pass can stop one step earlier.

## Complexity

| Case | Time | Why |
| --- | --- | --- |
| Best | O(n) | Already sorted: one pass finds no swap and the early exit stops. |
| Average | O(n²) | About n passes, each doing up to n comparisons. |
| Worst | O(n²) | Reverse sorted: every comparison swaps. |
| Space | O(1) | Only a few variables; the work is done inside the array copy. |

Why n²? There are up to n-1 passes. Pass k does n-k comparisons. Adding them up gives n(n-1)/2, which grows like n². Doubling the input makes it about four times slower. Without the early exit (step 4) the best case would also be O(n²).

## Code explanation

1. The outer loop runs the passes. `end` is the last index still to be checked. It shrinks because the biggest values are already placed.
2. The inner loop compares each pair `a[i]` and `a[i + 1]`. We use strict `>`, so equal values are never swapped. That keeps the sort **stable** (equal items keep their original order).
3. The swap moves the bigger value to the right.
4. If a full pass made no swap, the array is sorted and we stop early.

| Language | Difference |
| --- | --- |
| JavaScript / TypeScript | `[a[i], a[j]] = [a[j], a[i]]` swaps with array destructuring. `[...input]` copies. |
| Python | `a[i], a[j] = a[j], a[i]` swaps with tuple unpacking. `list(items)` copies. |
| Go | Same tuple swap. Slices share memory, so `append([]int(nil), input...)` makes a real copy. |
| Java | No tuple swap: use a temporary variable. `input.clone()` copies the array. |
| C# | `(a[i], a[j]) = (a[j], a[i])` is a tuple swap. `[.. input]` copies (C# 12). |
| C++ | `std::swap`. The vector is passed by value, which is the copy. The loops are written so the unsigned `size_t` index never goes below zero. |

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

- Use it to teach, or for tiny lists where simplicity matters more than speed.
- Do not use it for real data. Insertion sort is just as simple and usually faster, and the standard library `sort` is far faster for large input.

## Interview notes

- Say the early-exit optimisation out loud. It shows you know the best case is O(n).
- Expected follow-up: "Is it stable?" Yes, because we only swap when the left value is strictly bigger.
- Mistake to avoid: using `>=` in the comparison. It still sorts, but it swaps equal values for nothing and loses stability.

## Real-life usage

Almost never in production. It appears in teaching, and in rare embedded cases where code size matters more than speed. Libraries use hybrids such as Timsort or introsort instead.
