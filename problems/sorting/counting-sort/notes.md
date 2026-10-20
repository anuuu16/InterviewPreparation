## Intuition

All the sorts above compare two items. Counting sort does not compare at all. Imagine sorting exam marks from 0 to 100: make 101 buckets, drop each paper into the bucket with its mark, then read the buckets from 0 to 100. If you only record how many papers are in each bucket, you do not even need the papers, just the counts.

This only works for **integers (or things you can map to small integers) in a small range**.

## Walkthrough

Sort `[4, 2, -1, 2, 4]`. The smallest value is -1, so we **offset** every value by -1 (subtract `min`) to get indexes 0 and up. The range is -1 to 4, so `k = 6` counters.

| Value | -1 | 0 | 1 | 2 | 3 | 4 |
| --- | --- | --- | --- | --- | --- | --- |
| Index (value - min) | 0 | 1 | 2 | 3 | 4 | 5 |
| Count | 1 | 0 | 0 | 2 | 0 | 2 |
| Prefix sum | 1 | 1 | 1 | 3 | 3 | 5 |

A prefix sum is a running total. The prefix sum for a value says where the **end** of that value's block is in the output: all `-1`s end at position 1, all `2`s end at position 3, and so on.

Now walk the input **backwards** and drop each value just before its block end:

| Input item | Output slot used | Output so far |
| --- | --- | --- |
| 4 (last) | 4 | `_ _ _ _ 4` |
| 2 | 2 | `_ _ 2 _ 4` |
| -1 | 0 | `-1 _ 2 _ 4` |
| 2 | 1 | `-1 2 2 _ 4` |
| 4 (first) | 3 | `-1 2 2 4 4` |

Going backwards keeps equal values in their original order, so the sort is stable. That matters when you sort records by an integer key.

## Complexity

| Case | Time | Why |
| --- | --- | --- |
| Best | O(n + k) | One pass to find min and max, one to count, one over the k counters, one to place. |
| Average | O(n + k) | Same. It does not depend on the order of the input. |
| Worst | O(n + k) | Same. |
| Space | O(n + k) | k counters plus an output array of n. |

Here n is the number of items and k = max - min + 1 is the size of the value range. If k is about the same size as n, the sort is linear, which beats the O(n log n) limit of comparison sorts (that limit only applies to algorithms that compare). If k is huge, such as sorting 10 numbers between 0 and a billion, the counters array is enormous and the sort is slow and wasteful.

## Code explanation

1. **Find the range** (`min` and `max`) and allocate `max - min + 1` counters. The offset `min` makes negative numbers work. For an empty input we return early, because there is no min or max.
2. **Count** how many times each value appears.
3. **Prefix sums** turn counts into end positions in the output.
4. **Place items walking backwards**, decrementing the counter first. Backwards keeps it stable.

Limitations: only integer-like keys; the range `max - min + 1` must fit in memory (and in an `int`: a range near 2³² would overflow a 32-bit int); it is not in place.

| Language | Difference |
| --- | --- |
| JavaScript / TypeScript | `Math.min(...input)` is fine here but spreads the array into arguments, which fails for very large arrays (use a loop). |
| Python | `min` and `max` are built in; `reversed(items)` walks backwards. |
| Go | `min` and `max` built-ins need Go 1.21+. `make([]int, k)` gives zeroed counters. |
| Java | `Arrays.stream(input).min().getAsInt()`. |
| C# | `input.Min()` and `input.Max()` from LINQ. |
| C++ | `std::minmax_element` finds both in one pass; counters are `size_t`. |

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

Counting sort has one extra edge case of its own: negative numbers, which the offset by `min` handles (cases 6 and 7). A wide range such as `[0, 1000000000]` would need a billion counters, so it is the wrong tool there.

## When to use it (and when not)

- Use it for integers (or small enums, ages, scores, grades, bytes) in a **small known range**, especially with many duplicates.
- Do not use it for floats, strings, or integers with a huge range. Use a comparison sort, or radix sort for big integers.

## Interview notes

- Say: "It is O(n + k), where k is the value range. It is not comparison based, so it beats n log n when k is small. It is stable, which is why radix sort uses it."
- Expected follow-up: "What if values are negative?" Subtract `min`. "What if the range is huge?" Do not use it; use radix sort or a comparison sort.
- Mistake to avoid: forgetting the offset for negatives, or an empty-array crash when finding min and max.

## Real-life usage

Counting a small alphabet (letters in a string, byte histograms), sorting ages, grades or ratings, and as the stable inner step of **radix sort** for large integers and fixed-length strings. Standard libraries do not use it for general sorting because they cannot know the range in advance.
