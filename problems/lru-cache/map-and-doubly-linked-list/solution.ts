// LRU cache, approach 2: a hash map from key to node, plus a doubly linked list ordered by recent use.
// The map finds a node in O(1); the list moves or removes a node in O(1) because it knows both neighbours.
// get returns -1 when the key is missing (values in this exercise are never negative).
class Node {
  key: number;
  value: number;
  prev: Node | null = null;
  next: Node | null = null;

  constructor(key: number, value: number) {
    this.key = key;
    this.value = value;
  }
}

class LRUCache {
  private readonly capacity: number;
  private readonly nodes = new Map<number, Node>(); // key -> node
  private readonly head = new Node(0, 0); // 1. sentinels: dummy nodes at both ends, so no node ever has a null neighbour
  private readonly tail = new Node(0, 0);

  constructor(capacity: number) {
    this.capacity = capacity;
    this.head.next = this.tail; // most recently used sits right after head, least recently used right before tail
    this.tail.prev = this.head;
  }

  private unlink(node: Node): void {
    node.prev!.next = node.next; // 2. connect the two neighbours to each other
    node.next!.prev = node.prev;
  }

  private pushFront(node: Node): void {
    node.prev = this.head; // 3. insert right after the head sentinel
    node.next = this.head.next;
    this.head.next!.prev = node;
    this.head.next = node;
  }

  get(key: number): number {
    const node = this.nodes.get(key);
    if (node === undefined) return -1;
    this.unlink(node); // 4. a read makes the node the most recently used
    this.pushFront(node);
    return node.value;
  }

  put(key: number, value: number): void {
    const existing = this.nodes.get(key);
    if (existing !== undefined) {
      existing.value = value;
      this.unlink(existing);
      this.pushFront(existing);
      return;
    }
    if (this.nodes.size === this.capacity) {
      const lru = this.tail.prev!; // 5. full: the node before the tail sentinel is the least recently used
      this.unlink(lru);
      this.nodes.delete(lru.key); // the node stores its key, so we can remove the map entry too
    }
    const node = new Node(key, value);
    this.nodes.set(key, node);
    this.pushFront(node);
  }
}

const scenarios: [number, string][] = [
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
  const results: string[] = [];
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
