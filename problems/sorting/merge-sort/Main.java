import java.util.Arrays;
import java.util.stream.Collectors;

// Merge sort: split in half, sort each half, merge the two sorted halves.
public class Main {
    static final int[][] TEST_CASES = {
        {7}, {1, 2, 3, 4, 5}, {}, {9, 7, 5, 3, 1}, {4, 2, 4, 1, 2, 4},
        {-3, 5, -1, 0, -8, 2}, {29, -4, 15, 0, 8, -17, 42, 15, 3, -4, 100, 7},
    };

    static int[] mergeSort(int[] input) {
        if (input.length <= 1) return input.clone(); // 1. base case: already sorted
        int mid = input.length / 2; // 2. split in the middle (a length, so no overflow)
        int[] left = mergeSort(Arrays.copyOfRange(input, 0, mid)); // 3. sort each half
        int[] right = mergeSort(Arrays.copyOfRange(input, mid, input.length));
        return merge(left, right);
    }

    static int[] merge(int[] left, int[] right) {
        int[] out = new int[left.length + right.length]; // the O(n) extra space
        int i = 0, j = 0, k = 0;
        // 4. Repeatedly take the smaller front item. "<=" takes from the left on ties (stable).
        while (i < left.length && j < right.length) {
            out[k++] = left[i] <= right[j] ? left[i++] : right[j++];
        }
        // 5. One side ran out: copy the rest of the other side.
        while (i < left.length) out[k++] = left[i++];
        while (j < right.length) out[k++] = right[j++];
        return out;
    }

    public static void main(String[] args) {
        for (int[] c : TEST_CASES) {
            System.out.println(Arrays.stream(mergeSort(c))
                .mapToObj(String::valueOf).collect(Collectors.joining(" ")));
        }
    }
}
