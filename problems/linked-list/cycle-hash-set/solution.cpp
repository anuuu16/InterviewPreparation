// Linked list, approach 3: detect a cycle with a hash set. Remember every node visited; seeing one twice means a cycle.
#include <iostream>
#include <memory>
#include <string>
#include <unordered_set>
#include <vector>

struct ListNode {
    int val;
    ListNode* next;
    explicit ListNode(int v) : val(v), next(nullptr) {}
};

bool hasCycle(const ListNode* head) {
    std::unordered_set<const ListNode*> seen; // pointers hash by address, i.e. by identity
    for (const ListNode* node = head; node != nullptr; node = node->next) {
        if (!seen.insert(node).second) return true; // 1. insert reports false when the node was already there: a cycle
        // 2. otherwise the node is now remembered
    }
    return false; // 3. we fell off the end, so the list has an end and no cycle
}

// Test helpers. The pool owns every node, so nothing leaks even when the list has a cycle.
using Pool = std::vector<std::unique_ptr<ListNode>>;

// Build a list from a vector. cyclePos >= 0 links the tail back to that node.
ListNode* fromVector(const std::vector<int>& values, Pool& pool, int cyclePos = -1) {
    ListNode* head = nullptr;
    ListNode* tail = nullptr;
    std::vector<ListNode*> nodes;
    for (int v : values) {
        pool.push_back(std::make_unique<ListNode>(v));
        ListNode* node = pool.back().get();
        if (tail) tail->next = node; else head = node;
        tail = node;
        nodes.push_back(node);
    }
    if (cyclePos >= 0) tail->next = nodes[cyclePos];
    return head;
}

// Values separated by spaces, or the word "empty" for an empty list.
std::string toText(const ListNode* head) {
    std::string out;
    for (const ListNode* n = head; n; n = n->next) out += (out.empty() ? "" : " ") + std::to_string(n->val);
    return out.empty() ? "empty" : out;
}

int main() {
    struct Case {
        std::vector<int> values;
        int pos;
    };
    std::vector<Case> cases = {
        {{3, 2, 0, -4}, 1},
        {{1, 2}, 0},
        {{1}, -1},
        {{1}, 0},
        {{}, -1},
        {{1, 2, 3, 4, 5}, -1},
        {{1, 2, 3, 4, 5}, 4},
        {{1, 2, 3, 4, 5}, 2},
        {{1, 1, 1}, -1},
        {{1, 1, 1}, 1},
        {{1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12}, -1},
        {{1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12}, 0},
    };
    for (const auto& c : cases) {
        Pool pool;
        std::cout << (hasCycle(fromVector(c.values, pool, c.pos)) ? "true" : "false") << "\n";
    }
}
