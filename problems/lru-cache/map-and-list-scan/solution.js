// LRU cache, approach 1: a hash map for the values plus a plain list that remembers the usage order.
// Lookups are fast, but moving a key to "most recent" means scanning the list, so get and put cost O(n).
// get returns -1 when the key is missing (values in this exercise are never negative).
class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.values = new Map(); // key -> value
    this.order = []; // keys from least recently used (front) to most recently used (back)
  }

  touch(key) {
    this.order.splice(this.order.indexOf(key), 1); // 1. find the key in the list (O(n)) and cut it out
    this.order.push(key); // 2. put it at the back: most recently used
  }

  get(key) {
    if (!this.values.has(key)) return -1;
    this.touch(key); // a read counts as a use
    return this.values.get(key);
  }

  put(key, value) {
    if (this.values.has(key)) {
      this.touch(key); // updating an existing key also counts as a use
    } else {
      if (this.values.size === this.capacity) {
        this.values.delete(this.order.shift()); // 3. full: evict the front of the list, the least recently used
      }
      this.order.push(key);
    }
    this.values.set(key, value);
  }
}

const scenarios = [
  [2, "put 1 1; put 2 2; get 1; put 3 3; get 2; put 4 4; get 1; get 3; get 4"],
  [1, "put 2 1; get 2; put 3 2; get 2; get 3"],
  [2, "put 1 1; put 2 2; put 1 10; put 3 3; get 1; get 2; get 3"],
  [3, "put 1 1; put 2 2; put 3 3; get 1; get 2; put 4 4; get 3; get 1; get 2; get 4"],
  [2, "get 5; put 5 50; get 5"],
  [2, "put 1 1; put 2 2; get 2; get 1; put 3 3; get 2; get 1; get 3"],
  [1, "put 1 1; put 1 2; get 1; put 2 3; get 1; get 2"],
  [3, "put 0 0; get 0; put 1 0; get 1"],
  [2, "get 1; get 2"],
  [4, "put 1 10; put 2 20; put 3 30; put 4 40; put 5 50; get 1; get 2; put 6 60; get 3; get 5; get 6; get 4"],
  [3, "put 1 1; get 1; get 1; put 2 2; put 3 3; put 4 4; get 1; get 2; get 4; put 5 5; get 3; get 4; get 5"],
];

for (const [capacity, script] of scenarios) {
  const cache = new LRUCache(capacity);
  const results = [];
  for (const op of script.split(';')) {
    const [name, key, value] = op.trim().split(' ');
    if (name === 'put') {
      cache.put(Number(key), Number(value));
    } else {
      const found = cache.get(Number(key));
      results.push(found === -1 ? '-' : String(found)); // -1 means "not in the cache"
    }
  }
  console.log(results.join(' '));
}
