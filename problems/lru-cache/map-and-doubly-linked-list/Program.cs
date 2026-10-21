// LRU cache, approach 2: a hash map from key to node, plus a doubly linked list ordered by recent use.
// The map finds a node in O(1); the list moves or removes a node in O(1) because it knows both neighbours.
// Get returns -1 when the key is missing (values in this exercise are never negative).
(int Capacity, string Script)[] scenarios =
{
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
};

foreach (var (capacity, script) in scenarios)
{
    var cache = new LRUCache(capacity);
    var results = new List<string>();
    foreach (string op in script.Split(';'))
    {
        string[] parts = op.Trim().Split(' ');
        int key = int.Parse(parts[1]);
        if (parts[0] == "put")
        {
            cache.Put(key, int.Parse(parts[2]));
        }
        else
        {
            int found = cache.Get(key);
            results.Add(found == -1 ? "-" : found.ToString()); // -1 means "not in the cache"
        }
    }
    Console.WriteLine(string.Join(" ", results));
}

// In top-level programs, type declarations must come after the statements.
class Node
{
    public int Key, Value;
    public Node? Prev, Next;

    public Node(int key, int value)
    {
        Key = key;
        Value = value;
    }
}

class LRUCache
{
    private readonly int capacity;
    private readonly Dictionary<int, Node> nodes = new(); // key -> node
    private readonly Node head = new(0, 0); // 1. sentinels: dummy nodes at both ends, so no node has a null neighbour
    private readonly Node tail = new(0, 0);

    public LRUCache(int capacity)
    {
        this.capacity = capacity;
        head.Next = tail; // most recently used sits right after head, least recently used right before tail
        tail.Prev = head;
    }

    private static void Unlink(Node node)
    {
        node.Prev!.Next = node.Next; // 2. connect the two neighbours to each other
        node.Next!.Prev = node.Prev;
    }

    private void PushFront(Node node)
    {
        node.Prev = head; // 3. insert right after the head sentinel
        node.Next = head.Next;
        head.Next!.Prev = node;
        head.Next = node;
    }

    public int Get(int key)
    {
        if (!nodes.TryGetValue(key, out var node)) return -1;
        Unlink(node); // 4. a read makes the node the most recently used
        PushFront(node);
        return node.Value;
    }

    public void Put(int key, int value)
    {
        if (nodes.TryGetValue(key, out var existing))
        {
            existing.Value = value;
            Unlink(existing);
            PushFront(existing);
            return;
        }
        if (nodes.Count == capacity)
        {
            var lru = tail.Prev!; // 5. full: the node before the tail sentinel is the least recently used
            Unlink(lru);
            nodes.Remove(lru.Key); // the node stores its key, so we can remove the map entry too
        }
        var node = new Node(key, value);
        nodes[key] = node;
        PushFront(node);
    }
}
