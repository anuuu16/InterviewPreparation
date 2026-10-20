// Quick sort: partition around a pivot, then sort the two sides.
int[][] testCases =
[
    [7], [1, 2, 3, 4, 5], [], [9, 7, 5, 3, 1], [4, 2, 4, 1, 2, 4],
    [-3, 5, -1, 0, -8, 2], [29, -4, 15, 0, 8, -17, 42, 15, 3, -4, 100, 7],
];

foreach (var c in testCases)
{
    Console.WriteLine(string.Join(" ", QuickSort(c)));
}

static int[] QuickSort(int[] input)
{
    int[] a = [.. input]; // sort a copy in place
    Sort(a, 0, a.Length - 1);
    return a;
}

static void Sort(int[] a, int lo, int hi)
{
    while (lo < hi)
    {
        int p = Partition(a, lo, hi); // 3. a[p] is now in its final place
        // 4. Recurse into the smaller side, loop on the larger: stack depth stays O(log n).
        if (p - lo < hi - p)
        {
            Sort(a, lo, p - 1);
            lo = p + 1;
        }
        else
        {
            Sort(a, p + 1, hi);
            hi = p - 1;
        }
    }
}

static int Partition(int[] a, int lo, int hi)
{
    int mid = lo + (hi - lo) / 2; // 1. middle pivot; "(lo + hi) / 2" could overflow
    (a[mid], a[hi]) = (a[hi], a[mid]); // park the pivot at the end
    int pivot = a[hi];
    int store = lo; // everything before `store` is smaller than the pivot
    for (int i = lo; i < hi; i++)
    {
        if (a[i] < pivot) // 2. move smaller values to the left block
        {
            (a[i], a[store]) = (a[store], a[i]);
            store++;
        }
    }
    (a[store], a[hi]) = (a[hi], a[store]); // put the pivot between the two blocks
    return store;
}
