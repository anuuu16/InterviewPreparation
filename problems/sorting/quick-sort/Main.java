import java.util.Arrays;
import java.util.stream.Collectors;

// Quick sort: partition around a pivot, then sort the two sides.
public class Main {
    static final int[][] TEST_CASES = {
        {7}, {1, 2, 3, 4, 5}, {}, {9, 7, 5, 3, 1}, {4, 2, 4, 1, 2, 4},
        {-3, 5, -1, 0, -8, 2}, {29, -4, 15, 0, 8, -17, 42, 15, 3, -4, 100, 7},
    };

    static int[] quickSort(int[] input) {
        int[] a = input.clone(); // sort a copy in place
        sort(a, 0, a.length - 1);
        return a;
    }

    static void sort(int[] a, int lo, int hi) {
        while (lo < hi) {
            int p = partition(a, lo, hi); // 3. a[p] is now in its final place
            // 4. Recurse into the smaller side, loop on the larger: stack depth stays O(log n).
            if (p - lo < hi - p) {
                sort(a, lo, p - 1);
                lo = p + 1;
            } else {
                sort(a, p + 1, hi);
                hi = p - 1;
            }
        }
    }

    static int partition(int[] a, int lo, int hi) {
        int mid = lo + (hi - lo) / 2; // 1. middle pivot; "(lo + hi) / 2" could overflow
        swap(a, mid, hi); // park the pivot at the end
        int pivot = a[hi];
        int store = lo; // everything before `store` is smaller than the pivot
        for (int i = lo; i < hi; i++) {
            if (a[i] < pivot) { // 2. move smaller values to the left block
                swap(a, i, store++);
            }
        }
        swap(a, store, hi); // put the pivot between the two blocks
        return store;
    }

    static void swap(int[] a, int i, int j) {
        int tmp = a[i];
        a[i] = a[j];
        a[j] = tmp;
    }

    public static void main(String[] args) {
        for (int[] c : TEST_CASES) {
            System.out.println(Arrays.stream(quickSort(c))
                .mapToObj(String::valueOf).collect(Collectors.joining(" ")));
        }
    }
}
