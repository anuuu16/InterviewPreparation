// LRU cache, approach 1: a hash map for the values plus a plain vector that remembers the usage order.
// Lookups are fast, but moving a key to "most recent" means scanning the vector, so get and put cost O(n).
// get returns -1 when the key is missing (values in this exercise are never negative).
#include <algorithm>
#include <iostream>
#include <sstream>
#include <string>
#include <unordered_map>
#include <utility>
#include <vector>

class LRUCache {
public:
    explicit LRUCache(int capacity) : capacity_(capacity) {}

    int get(int key) {
        auto it = values_.find(key);
        if (it == values_.end()) return -1;
        touch(key); // a read counts as a use
        return it->second;
    }

    void put(int key, int value) {
        if (values_.count(key)) {
            touch(key); // updating an existing key also counts as a use
        } else {
            if (static_cast<int>(values_.size()) == capacity_) {
                values_.erase(order_.front()); // 3. full: evict the front, the least recently used
                order_.erase(order_.begin());
            }
            order_.push_back(key);
        }
        values_[key] = value;
    }

private:
    void touch(int key) {
        order_.erase(std::find(order_.begin(), order_.end(), key)); // 1. find the key (O(n)) and cut it out
        order_.push_back(key); // 2. put it at the back: most recently used
    }

    int capacity_;
    std::unordered_map<int, int> values_; // key -> value
    std::vector<int> order_; // keys from least (front) to most (back) recently used
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
