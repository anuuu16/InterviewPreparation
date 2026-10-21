// LRU cache, approach 2: a hash map from key to node, plus a doubly linked list ordered by recent use.
// The map finds a node in O(1); the list moves or removes a node in O(1) because it knows both neighbours.
// get returns -1 when the key is missing (values in this exercise are never negative).
#include <iostream>
#include <memory>
#include <sstream>
#include <string>
#include <unordered_map>
#include <utility>
#include <vector>

class LRUCache {
public:
    explicit LRUCache(int capacity) : capacity_(capacity) {
        head_.next = &tail_; // 1. sentinels: two dummy nodes (members, so no allocation) at both ends
        tail_.prev = &head_; // most recently used sits right after head, least recently used right before tail
    }

    int get(int key) {
        auto it = nodes_.find(key);
        if (it == nodes_.end()) return -1;
        Node* node = it->second.get();
        unlink(node); // 4. a read makes the node the most recently used
        pushFront(node);
        return node->value;
    }

    void put(int key, int value) {
        auto it = nodes_.find(key);
        if (it != nodes_.end()) {
            it->second->value = value;
            unlink(it->second.get());
            pushFront(it->second.get());
            return;
        }
        if (static_cast<int>(nodes_.size()) == capacity_) {
            Node* lru = tail_.prev; // 5. full: the node before the tail sentinel is the least recently used
            unlink(lru);
            nodes_.erase(lru->key); // erasing the owning unique_ptr frees the node
        }
        auto node = std::make_unique<Node>(key, value);
        pushFront(node.get());
        nodes_[key] = std::move(node);
    }

private:
    struct Node {
        int key = 0, value = 0;
        Node* prev = nullptr;
        Node* next = nullptr;
        Node() = default;
        Node(int k, int v) : key(k), value(v) {}
    };

    static void unlink(Node* node) {
        node->prev->next = node->next; // 2. connect the two neighbours to each other
        node->next->prev = node->prev;
    }

    void pushFront(Node* node) {
        node->prev = &head_; // 3. insert right after the head sentinel
        node->next = head_.next;
        head_.next->prev = node;
        head_.next = node;
    }

    int capacity_;
    Node head_, tail_;
    std::unordered_map<int, std::unique_ptr<Node>> nodes_; // key -> node (the map owns the nodes)
};

int main() {
    std::vector<std::pair<int, std::string>> scenarios = {
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
    for (const auto& [capacity, script] : scenarios) {
        LRUCache cache(capacity);
        std::string results;
        std::istringstream ops(script);
        for (std::string op; std::getline(ops, op, ';');) {
            std::istringstream in(op);
            std::string name;
            int key, value;
            in >> name >> key;
            if (name == "put") {
                in >> value;
                cache.put(key, value);
            } else {
                int found = cache.get(key);
                results += (results.empty() ? "" : " ") + (found == -1 ? std::string("-") : std::to_string(found)); // -1 means "not in the cache"
            }
        }
        std::cout << results << "\n";
    }
}
