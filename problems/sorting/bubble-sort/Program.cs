// Bubble sort: repeatedly swap neighbours that are in the wrong order.
int[][] testCases =
[
    [7], [1, 2, 3, 4, 5], [], [9, 7, 5, 3, 1], [4, 2, 4, 1, 2, 4],
    [-3, 5, -1, 0, -8, 2], [29, -4, 15, 0, 8, -17, 42, 15, 3, -4, 100, 7],
];

foreach (var c in testCases)
{
    Console.WriteLine(string.Join(" ", BubbleSort(c)));
}

static int[] BubbleSort(int[] input)
{
    int[] a = [.. input]; // copy so the caller's array is untouched
    // 1. Each pass pushes the largest unsorted value to the end, so `end` shrinks.
    for (int end = a.Length - 1; end > 0; end--)
    {
        bool swapped = false;
        for (int i = 0; i < end; i++)
        {
            // 2. Compare neighbours. Strict ">" keeps equal values in order (stable).
            if (a[i] > a[i + 1])
            {
                (a[i], a[i + 1]) = (a[i + 1], a[i]); // 3. swap with a tuple
                swapped = true;
            }
        }
        if (!swapped) break; // 4. a pass with no swaps means we are done
    }
    return a;
}
