// LRU cache, approach 1: a hash map for the values plus a plain list that remembers the usage order.
// Lookups are fast, but moving a key to "most recent" means scanning the list, so get and put cost O(n).
// get returns -1 when the key is missing (values in this exercise are never negative).
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class Main {
    static class LRUCache {
        private final int capacity;
        private final Map<Integer, Integer> values = new HashMap<>(); // key -> value
        private final List<Integer> order = new ArrayList<>(); // keys from least (front) to most (back) recently used

        LRUCache(int capacity) {
            this.capacity = capacity;
        }

        private void touch(int key) {
            order.remove(Integer.valueOf(key)); // 1. find the key (O(n)) and cut it out; remove(int) would mean an index!
            order.add(key); // 2. put it at the back: most recently used
        }

        int get(int key) {
            Integer value = values.get(key);
            if (value == null) return -1;
            touch(key); // a read counts as a use
            return value;
        }

        void put(int key, int value) {
            if (values.containsKey(key)) {
                touch(key); // updating an existing key also counts as a use
            } else {
                if (values.size() == capacity) {
                    values.remove(order.remove(0)); // 3. full: evict the front of the list, the least recently used
                }
                order.add(key);
            }
            values.put(key, value);
        }
    }

    public static void main(String[] args) {
        Object[][] scenarios = {
            {2, "put 1 1; put 2 2; get 1; put 3 3; get 2; put 4 4; get 1; get 3; get 4"},
            {1, "put 2 1; get 2; put 3 2; get 2; get 3"},
            {2, "put 1 1; put 2 2; put 1 10; put 3 3; get 1; get 2; get 3"},
            {3, "put 1 1; put 2 2; put 3 3; get 1; get 2; put 4 4; get 3; get 1; get 2; get 4"},
            {2, "get 5; put 5 50; get 5"},
            {2, "put 1 1; put 2 2; get 2; get 1; put 3 3; get 2; get 1; get 3"},
            {1, "put 1 1; put 1 2; get 1; put 2 3; get 1; get 2"},
            {3, "put 0 0; get 0; put 1 0; get 1"},
            {2, "get 1; get 2"},
            {4, "put 1 10; put 2 20; put 3 30; put 4 40; put 5 50; get 1; get 2; put 6 60; get 3; get 5; get 6; get 4"},
            {3, "put 1 1; get 1; get 1; put 2 2; put 3 3; put 4 4; get 1; get 2; get 4; put 5 5; get 3; get 4; get 5"},
        };
        for (Object[] sc : scenarios) {
            LRUCache cache = new LRUCache((int) sc[0]);
            List<String> results = new ArrayList<>();
            for (String op : ((String) sc[1]).split(";")) {
                String[] parts = op.trim().split(" ");
                int key = Integer.parseInt(parts[1]);
                if (parts[0].equals("put")) {
                    cache.put(key, Integer.parseInt(parts[2]));
                } else {
                    int found = cache.get(key);
                    results.add(found == -1 ? "-" : String.valueOf(found)); // -1 means "not in the cache"
                }
            }
            System.out.println(String.join(" ", results));
        }
    }
}
