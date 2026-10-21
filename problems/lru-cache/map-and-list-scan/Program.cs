// LRU cache, approach 1: a hash map for the values plus a plain list that remembers the usage order.
// Lookups are fast, but moving a key to "most recent" means scanning the list, so Get and Put cost O(n).
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
class LRUCache
{
    private readonly int capacity;
    private readonly Dictionary<int, int> values = new(); // key -> value
    private readonly List<int> order = new(); // keys from least (front) to most (back) recently used

    public LRUCache(int capacity)
    {
        this.capacity = capacity;
    }

    private void Touch(int key)
    {
        order.Remove(key); // 1. find the key in the list (O(n)) and cut it out
        order.Add(key); // 2. put it at the back: most recently used
    }

    public int Get(int key)
    {
        if (!values.TryGetValue(key, out int value)) return -1;
        Touch(key); // a read counts as a use
        return value;
    }

    public void Put(int key, int value)
    {
        if (values.ContainsKey(key))
        {
            Touch(key); // updating an existing key also counts as a use
        }
        else
        {
            if (values.Count == capacity)
            {
                values.Remove(order[0]); // 3. full: evict the front of the list, the least recently used
                order.RemoveAt(0);
            }
            order.Add(key);
        }
        values[key] = value;
    }
}
