import java.util.Arrays;
import java.util.stream.Collectors;

// Counting sort: count each value, then rebuild the output from the counts.
// Needs a small value range (max - min), because it allocates one counter per possible value.
public class Main {
    static final int[][] TEST_CASES = {
        {7}, {1, 2, 3, 4, 5}, {}, {9, 7, 5, 3, 1}, {4, 2, 4, 1, 2, 4},
        {-3, 5, -1, 0, -8, 2}, {29, -4, 15, 0, 8, -17, 42, 15, 3, -4, 100, 7},
    };

    static int[] countingSort(int[] input) {
        if (input.length == 0) return new int[0];
        // 1. Find the range. `low` is the offset that lets negative numbers use index 0 and up.
        int low = Arrays.stream(input).min().getAsInt();
        int high = Arrays.stream(input).max().getAsInt();
        int[] counts = new int[high - low + 1];
        for (int x : input) counts[x - low]++; // 2. count occurrences
        // 3. Prefix sums: counts[v] becomes the position just after the last v in the output.
        for (int v = 1; v < counts.length; v++) counts[v] += counts[v - 1];
        int[] out = new int[input.length];
        // 4. Walk backwards so equal values keep their input order (stable).
        for (int i = input.length - 1; i >= 0; i--) out[--counts[input[i] - low]] = input[i];
        return out;
    }

    public static void main(String[] args) {
        for (int[] c : TEST_CASES) {
            System.out.println(Arrays.stream(countingSort(c))
                .mapToObj(String::valueOf).collect(Collectors.joining(" ")));
        }
    }
}
