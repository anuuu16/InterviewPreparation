// Counting sort: count each value, then rebuild the output from the counts.
// Needs a small value range (max - min), because it allocates one counter per possible value.
int[][] testCases =
[
    [7], [1, 2, 3, 4, 5], [], [9, 7, 5, 3, 1], [4, 2, 4, 1, 2, 4],
    [-3, 5, -1, 0, -8, 2], [29, -4, 15, 0, 8, -17, 42, 15, 3, -4, 100, 7],
];

foreach (var c in testCases)
{
    Console.WriteLine(string.Join(" ", CountingSort(c)));
}

static int[] CountingSort(int[] input)
{
    if (input.Length == 0) return [];
    // 1. Find the range. `low` is the offset that lets negative numbers use index 0 and up.
    int low = input.Min();
    int high = input.Max();
    int[] counts = new int[high - low + 1];
    foreach (int x in input) counts[x - low]++; // 2. count occurrences
    // 3. Prefix sums: counts[v] becomes the position just after the last v in the output.
    for (int v = 1; v < counts.Length; v++) counts[v] += counts[v - 1];
    int[] output = new int[input.Length];
    // 4. Walk backwards so equal values keep their input order (stable).
    for (int i = input.Length - 1; i >= 0; i--) output[--counts[input[i] - low]] = input[i];
    return output;
}
