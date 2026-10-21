"""LRU cache, approach 1: a hash map for the values plus a plain list that remembers the usage order.

Lookups are fast, but moving a key to "most recent" means scanning the list, so get and put cost O(n).
get returns -1 when the key is missing (values in this exercise are never negative).
"""


class LRUCache:
    def __init__(self, capacity):
        self.capacity = capacity
        self.values = {}  # key -> value
        self.order = []  # keys from least recently used (front) to most recently used (back)

    def _touch(self, key):
        self.order.remove(key)  # 1. find the key in the list (O(n)) and cut it out
        self.order.append(key)  # 2. put it at the back: most recently used

    def get(self, key):
        if key not in self.values:
            return -1
        self._touch(key)  # a read counts as a use
        return self.values[key]

    def put(self, key, value):
        if key in self.values:
            self._touch(key)  # updating an existing key also counts as a use
        else:
            if len(self.values) == self.capacity:
                oldest = self.order.pop(0)  # 3. full: evict the front of the list, the least recently used
                del self.values[oldest]
            self.order.append(key)
        self.values[key] = value

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
