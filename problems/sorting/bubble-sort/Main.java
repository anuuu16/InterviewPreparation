import java.util.Arrays;
import java.util.stream.Collectors;

// Bubble sort: repeatedly swap neighbours that are in the wrong order.
public class Main {
    static final int[][] TEST_CASES = {
        {7}, {1, 2, 3, 4, 5}, {}, {9, 7, 5, 3, 1}, {4, 2, 4, 1, 2, 4},
        {-3, 5, -1, 0, -8, 2}, {29, -4, 15, 0, 8, -17, 42, 15, 3, -4, 100, 7},
    };

    static int[] bubbleSort(int[] input) {
        int[] a = input.clone(); // arrays are mutable objects: copy before sorting
        // 1. Each pass pushes the largest unsorted value to the end, so `end` shrinks.
        for (int end = a.length - 1; end > 0; end--) {
            boolean swapped = false;
            for (int i = 0; i < end; i++) {
                // 2. Compare neighbours. Strict ">" keeps equal values in order (stable).
                if (a[i] > a[i + 1]) {
                    int tmp = a[i]; // 3. swap (Java has no tuple swap)
                    a[i] = a[i + 1];
                    a[i + 1] = tmp;
                    swapped = true;
                }
            }
            if (!swapped) break; // 4. a pass with no swaps means we are done
        }
        return a;
    }

    public static void main(String[] args) {
        for (int[] c : TEST_CASES) {
            System.out.println(Arrays.stream(bubbleSort(c))
                .mapToObj(String::valueOf).collect(Collectors.joining(" ")));
        }
    }
}
