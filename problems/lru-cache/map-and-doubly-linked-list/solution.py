"""LRU cache, approach 2: a hash map from key to node, plus a doubly linked list ordered by recent use.

The map finds a node in O(1); the list moves or removes a node in O(1) because it knows both neighbours.
get returns -1 when the key is missing (values in this exercise are never negative).
"""


class Node:
    __slots__ = ("key", "value", "prev", "next")

    def __init__(self, key, value):
        self.key = key
        self.value = value
        self.prev = None
        self.next = None


class LRUCache:
    def __init__(self, capacity):
        self.capacity = capacity
        self.nodes = {}  # key -> node
        self.head = Node(0, 0)  # 1. sentinels: dummy nodes at both ends, so no node ever has a None neighbour
        self.tail = Node(0, 0)
        self.head.next = self.tail  # most recently used sits right after head, least recently used right before tail
        self.tail.prev = self.head

    def _unlink(self, node):
        node.prev.next = node.next  # 2. connect the two neighbours to each other
        node.next.prev = node.prev

    def _push_front(self, node):
        node.prev = self.head  # 3. insert right after the head sentinel
        node.next = self.head.next
        self.head.next.prev = node
        self.head.next = node

    def get(self, key):
        node = self.nodes.get(key)
        if node is None:
            return -1
        self._unlink(node)  # 4. a read makes the node the most recently used
        self._push_front(node)
        return node.value

    def put(self, key, value):
        node = self.nodes.get(key)
        if node is not None:
            node.value = value
            self._unlink(node)
            self._push_front(node)
            return
        if len(self.nodes) == self.capacity:
            lru = self.tail.prev  # 5. full: the node before the tail sentinel is the least recently used
            self._unlink(lru)
            del self.nodes[lru.key]  # the node stores its key, so we can remove the map entry too
        node = Node(key, value)
        self.nodes[key] = node
        self._push_front(node)

SCENARIOS = [
    (2, "put 1 1; put 2 2; get 1; put 3 3; get 2; put 4 4; get 1; get 3; get 4"),
    (1, "put 2 1; get 2; put 3 2; get 2; get 3"),
    (2, "put 1 1; put 2 2; put 1 10; put 3 3; get 1; get 2; get 3"),
    (3, "put 1 1; put 2 2; put 3 3; get 1; get 2; put 4 4; get 3; get 1; get 2; get 4"),
    (2, "get 5; put 5 50; get 5"),
    (2, "put 1 1; put 2 2; get 2; get 1; put 3 3; get 2; get 1; get 3"),
    (1, "put 1 1; put 1 2; get 1; put 2 3; get 1; get 2"),
    (3, "put 0 0; get 0; put 1 0; get 1"),
    (2, "get 1; get 2"),
    (4, "put 1 10; put 2 20; put 3 30; put 4 40; put 5 50; get 1; get 2; put 6 60; get 3; get 5; get 6; get 4"),
    (3, "put 1 1; get 1; get 1; put 2 2; put 3 3; put 4 4; get 1; get 2; get 4; put 5 5; get 3; get 4; get 5"),
]

for capacity, script in SCENARIOS:
    cache = LRUCache(capacity)
    results = []
    for op in script.split(";"):
        name, key, *rest = op.split()
        if name == "put":
            cache.put(int(key), int(rest[0]))
        else:
            found = cache.get(int(key))
            results.append("-" if found == -1 else str(found))  # -1 means "not in the cache"
    print(" ".join(results))
