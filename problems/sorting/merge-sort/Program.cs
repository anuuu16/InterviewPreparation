// Merge sort: split in half, sort each half, merge the two sorted halves.
int[][] testCases =
[
    [7], [1, 2, 3, 4, 5], [], [9, 7, 5, 3, 1], [4, 2, 4, 1, 2, 4],
    [-3, 5, -1, 0, -8, 2], [29, -4, 15, 0, 8, -17, 42, 15, 3, -4, 100, 7],
];

foreach (var c in testCases)
{
    Console.WriteLine(string.Join(" ", MergeSort(c)));
}

static int[] MergeSort(int[] input)
{
    if (input.Length <= 1) return [.. input]; // 1. base case: already sorted
    int mid = input.Length / 2; // 2. split in the middle (a length, so no overflow)
    int[] left = MergeSort(input[..mid]); // 3. sort each half (range on an array copies it)
    int[] right = MergeSort(input[mid..]);
    return Merge(left, right);
}

static int[] Merge(int[] left, int[] right)
{
    int[] output = new int[left.Length + right.Length]; // the O(n) extra space
    int i = 0, j = 0, k = 0;
    // 4. Repeatedly take the smaller front item. "<=" takes from the left on ties (stable).
    while (i < left.Length && j < right.Length)
    {
        output[k++] = left[i] <= right[j] ? left[i++] : right[j++];
    }
    // 5. One side ran out: copy the rest of the other side.
    while (i < left.Length) output[k++] = left[i++];
    while (j < right.Length) output[k++] = right[j++];
    return output;
}
