// Heap sort: build a max-heap, then keep moving the biggest value to the end.
int[][] testCases =
[
    [7], [1, 2, 3, 4, 5], [], [9, 7, 5, 3, 1], [4, 2, 4, 1, 2, 4],
    [-3, 5, -1, 0, -8, 2], [29, -4, 15, 0, 8, -17, 42, 15, 3, -4, 100, 7],
];

foreach (var c in testCases)
{
    Console.WriteLine(string.Join(" ", HeapSort(c)));
}

static int[] HeapSort(int[] input)
{
    int[] a = [.. input]; // sort a copy in place
    // 1. Build a max-heap: start at the last parent and sift each one down.
    for (int i = a.Length / 2 - 1; i >= 0; i--) SiftDown(a, i, a.Length);
    for (int end = a.Length - 1; end > 0; end--)
    {
        (a[0], a[end]) = (a[end], a[0]); // 2. the root is the max: move it to its final slot
        SiftDown(a, 0, end); // 3. the heap is now one smaller; repair it
    }
    return a;
}

// Push a[i] down until both children are smaller. Children of i are 2i+1 and 2i+2.
static void SiftDown(int[] a, int i, int size)
{
    while (true)
    {
        int child = 2 * i + 1;
        if (child >= size) return;
        if (child + 1 < size && a[child + 1] > a[child]) child++; // pick the bigger child
        if (a[i] >= a[child]) return;
        (a[i], a[child]) = (a[child], a[i]);
        i = child;
    }
}
