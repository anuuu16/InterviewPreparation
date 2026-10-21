// Linked list, approach 1: reverse a singly linked list iteratively. Re-point every next pointer backwards.
#include <iostream>
#include <memory>
#include <string>
#include <vector>

struct ListNode {
    int val;
    ListNode* next;
    explicit ListNode(int v) : val(v), next(nullptr) {}
};

ListNode* reverseList(ListNode* head) {
    ListNode* prev = nullptr; // 1. the already reversed part starts empty
    ListNode* current = head;
    while (current != nullptr) {
        ListNode* next = current->next; // 2. save the rest of the list before we cut the link
        current->next = prev; // 3. point this node backwards
        prev = current; // 4. the reversed part now starts at this node
        current = next; // 5. move on to the saved rest
    }
    return prev; // 6. prev is the old tail, which is the new head
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
    std::vector<std::vector<int>> cases = {
        {1, 2, 3, 4, 5},
        {},
        {1},
        {1, 2},
        {1, 2, 3},
        {7, 7, 8},
        {10, 20, 30, 40},
        {-1, 0, 1},
        {1, 2, 3, 4, 5, 6, 7, 8, 9, 10},
    };
    for (const auto& values : cases) {
        Pool pool;
        std::cout << toText(reverseList(fromVector(values, pool))) << "\n";
    }
}
