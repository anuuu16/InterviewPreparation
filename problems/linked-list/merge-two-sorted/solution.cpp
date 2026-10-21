// Linked list, approach 5: merge two sorted lists. A dummy head node and a tail pointer relink the existing nodes in order.
#include <iostream>
#include <memory>
#include <string>
#include <vector>

struct ListNode {
    int val;
    ListNode* next;
    explicit ListNode(int v) : val(v), next(nullptr) {}
};

ListNode* mergeTwoLists(ListNode* a, ListNode* b) {
    ListNode dummy(0); // 1. a dummy node (on the stack) removes the special case of an empty result list
    ListNode* tail = &dummy;
    while (a != nullptr && b != nullptr) {
        if (b->val < a->val) { // 2. take the smaller front node; on a tie take from a (keeps the merge stable)
            tail->next = b;
            b = b->next;
        } else {
            tail->next = a;
            a = a->next;
        }
        tail = tail->next;
    }
    tail->next = (a != nullptr) ? a : b; // 3. one list is used up: attach the rest of the other in one step
    return dummy.next; // 4. skip the dummy
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
        std::vector<int> a, b;
    };
    std::vector<Case> cases = {
        {{1, 2, 4}, {1, 3, 4}},
        {{}, {}},
        {{}, {0}},
        {{5}, {}},
        {{1, 3, 5}, {2, 4, 6}},
        {{1, 1, 1}, {1, 1}},
        {{1, 2, 3}, {4, 5, 6}},
        {{4, 5, 6}, {1, 2, 3}},
        {{-5, -1, 0}, {-3, 2}},
        {{1}, {1}},
        {{2, 4, 6, 8}, {1, 3}},
    };
    for (const auto& c : cases) {
        Pool pool;
        std::cout << toText(mergeTwoLists(fromVector(c.a, pool), fromVector(c.b, pool))) << "\n";
    }
}
