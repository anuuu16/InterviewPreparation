// LRU cache, approach 2: a hash map from key to node, plus a doubly linked list ordered by recent use.
// The map finds a node in O(1); the list moves or removes a node in O(1) because it knows both neighbours.
// get returns -1 when the key is missing (values in this exercise are never negative).
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class Main {
    static class Node {
        final int key;
        int value;
        Node prev, next;

        Node(int key, int value) {
            this.key = key;
            this.value = value;
        }
    }

    static class LRUCache {
        private final int capacity;
        private final Map<Integer, Node> nodes = new HashMap<>(); // key -> node
        private final Node head = new Node(0, 0); // 1. sentinels: dummy nodes at both ends, so no node has a null neighbour
        private final Node tail = new Node(0, 0);

        LRUCache(int capacity) {
            this.capacity = capacity;
            head.next = tail; // most recently used sits right after head, least recently used right before tail
            tail.prev = head;
        }

        private void unlink(Node node) {
            node.prev.next = node.next; // 2. connect the two neighbours to each other
            node.next.prev = node.prev;
        }

        private void pushFront(Node node) {
            node.prev = head; // 3. insert right after the head sentinel
            node.next = head.next;
            head.next.prev = node;
            head.next = node;
        }

        int get(int key) {
            Node node = nodes.get(key);
            if (node == null) return -1;
            unlink(node); // 4. a read makes the node the most recently used
            pushFront(node);
            return node.value;
        }

        void put(int key, int value) {
            Node node = nodes.get(key);
            if (node != null) {
                node.value = value;
                unlink(node);
                pushFront(node);
                return;
            }
            if (nodes.size() == capacity) {
                Node lru = tail.prev; // 5. full: the node before the tail sentinel is the least recently used
                unlink(lru);
                nodes.remove(lru.key); // the node stores its key, so we can remove the map entry too
            }
            node = new Node(key, value);
            nodes.put(key, node);
            pushFront(node);
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
