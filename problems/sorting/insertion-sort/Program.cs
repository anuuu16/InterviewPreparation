// Insertion sort: grow a sorted prefix by sliding each new value into place.
int[][] testCases =
[
    [7], [1, 2, 3, 4, 5], [], [9, 7, 5, 3, 1], [4, 2, 4, 1, 2, 4],
    [-3, 5, -1, 0, -8, 2], [29, -4, 15, 0, 8, -17, 42, 15, 3, -4, 100, 7],
];

foreach (var c in testCases)
{
    Console.WriteLine(string.Join(" ", InsertionSort(c)));
}

static int[] InsertionSort(int[] input)
{
    int[] a = [.. input]; // copy so the caller's array is untouched
    for (int i = 1; i < a.Length; i++) // 1. a[0..i-1] is sorted; take the next value
    {
        int key = a[i];
        int j = i - 1;
        // 2. Shift bigger values one slot right. Strict ">" stops at equals (stable).
        while (j >= 0 && a[j] > key)
        {
            a[j + 1] = a[j];
            j--;
        }
        a[j + 1] = key; // 3. drop the value into the gap
    }
    return a;
}
