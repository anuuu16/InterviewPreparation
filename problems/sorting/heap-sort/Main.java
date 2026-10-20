import java.util.Arrays;
import java.util.stream.Collectors;

// Heap sort: build a max-heap, then keep moving the biggest value to the end.
public class Main {
    static final int[][] TEST_CASES = {
        {7}, {1, 2, 3, 4, 5}, {}, {9, 7, 5, 3, 1}, {4, 2, 4, 1, 2, 4},
        {-3, 5, -1, 0, -8, 2}, {29, -4, 15, 0, 8, -17, 42, 15, 3, -4, 100, 7},
    };

    static int[] heapSort(int[] input) {
        int[] a = input.clone(); // sort a copy in place
        // 1. Build a max-heap: start at the last parent and sift each one down.
        for (int i = a.length / 2 - 1; i >= 0; i--) siftDown(a, i, a.length);
        for (int end = a.length - 1; end > 0; end--) {
            int tmp = a[0]; // 2. the root is the max: move it to its final slot
            a[0] = a[end];
            a[end] = tmp;
            siftDown(a, 0, end); // 3. the heap is now one smaller; repair it
        }
        return a;
    }

    // Push a[i] down until both children are smaller. Children of i are 2i+1 and 2i+2.
    static void siftDown(int[] a, int i, int size) {
        while (true) {
            int child = 2 * i + 1;
            if (child >= size) return;
            if (child + 1 < size && a[child + 1] > a[child]) child++; // pick the bigger child
            if (a[i] >= a[child]) return;
            int tmp = a[i];
            a[i] = a[child];
            a[child] = tmp;
            i = child;
        }
    }

    public static void main(String[] args) {
        for (int[] c : TEST_CASES) {
            System.out.println(Arrays.stream(heapSort(c))
                .mapToObj(String::valueOf).collect(Collectors.joining(" ")));
        }
    }
}
