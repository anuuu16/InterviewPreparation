import java.util.Arrays;
import java.util.stream.Collectors;

// Insertion sort: grow a sorted prefix by sliding each new value into place.
public class Main {
    static final int[][] TEST_CASES = {
        {7}, {1, 2, 3, 4, 5}, {}, {9, 7, 5, 3, 1}, {4, 2, 4, 1, 2, 4},
        {-3, 5, -1, 0, -8, 2}, {29, -4, 15, 0, 8, -17, 42, 15, 3, -4, 100, 7},
    };

    static int[] insertionSort(int[] input) {
        int[] a = input.clone(); // copy before sorting in place
        for (int i = 1; i < a.length; i++) { // 1. a[0..i-1] is sorted; take the next value
            int key = a[i];
            int j = i - 1;
            // 2. Shift bigger values one slot right. Strict ">" stops at equals (stable).
            while (j >= 0 && a[j] > key) {
                a[j + 1] = a[j];
                j--;
            }
            a[j + 1] = key; // 3. drop the value into the gap
        }
        return a;
    }

    public static void main(String[] args) {
        for (int[] c : TEST_CASES) {
            System.out.println(Arrays.stream(insertionSort(c))
                .mapToObj(String::valueOf).collect(Collectors.joining(" ")));
        }
    }
}
