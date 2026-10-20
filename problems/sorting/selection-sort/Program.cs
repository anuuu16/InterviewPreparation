// Selection sort: find the smallest remaining value and move it to the front.
int[][] testCases =
[
    [7], [1, 2, 3, 4, 5], [], [9, 7, 5, 3, 1], [4, 2, 4, 1, 2, 4],
    [-3, 5, -1, 0, -8, 2], [29, -4, 15, 0, 8, -17, 42, 15, 3, -4, 100, 7],
];

foreach (var c in testCases)
{
    Console.WriteLine(string.Join(" ", SelectionSort(c)));
}

static int[] SelectionSort(int[] input)
{
    int[] a = [.. input]; // copy so the caller's array is untouched
    for (int i = 0; i < a.Length - 1; i++) // 1. a[0..i-1] is already final
    {
        int smallest = i;
        for (int j = i + 1; j < a.Length; j++) // 2. scan the unsorted part for the smallest
        {
            if (a[j] < a[smallest]) smallest = j;
        }
        // 3. One swap per pass. This long-distance swap is why it is not stable.
        (a[i], a[smallest]) = (a[smallest], a[i]);
    }
    return a;
}
