// Tree traversals, approach 2: iterative depth-first search. An explicit stack replaces the call stack.
#include <algorithm>
#include <iostream>
#include <memory>
#include <sstream>
#include <stack>
#include <string>
#include <utility>
#include <vector>

struct TreeNode {
    int val;
    TreeNode* left = nullptr;
    TreeNode* right = nullptr;
    explicit TreeNode(int v) : val(v) {}
};

std::vector<int> traverse(const TreeNode* root, const std::string& order) {
    std::vector<int> result;
    std::stack<const TreeNode*> stack;
    if (order == "inorder") {
        const TreeNode* node = root;
        while (node != nullptr || !stack.empty()) {
            while (node != nullptr) { // 1. dive as far left as possible, remembering the path
                stack.push(node);
                node = node->left;
            }
            node = stack.top(); // 2. the leftmost node not yet visited
            stack.pop();
            result.push_back(node->val); // 3. visit it
            node = node->right; // 4. then handle its right subtree the same way
        }
        return result;
    }
    // Pre-order and post-order share one loop. Post-order is "node, right, left" reversed at the end.
    if (root != nullptr) stack.push(root);
    while (!stack.empty()) {
        const TreeNode* node = stack.top(); // 5. take the next node and visit it
        stack.pop();
        result.push_back(node->val);
        bool pre = order == "preorder";
        const TreeNode* first = pre ? node->right : node->left; // 6. the child pushed first is popped last
        const TreeNode* second = pre ? node->left : node->right;
        if (first != nullptr) stack.push(first);
        if (second != nullptr) stack.push(second);
    }
    if (order == "postorder") std::reverse(result.begin(), result.end()); // 7. reverse "node, right, left"
    return result;
}

// Test helpers. The pool owns every node.
using Pool = std::vector<std::unique_ptr<TreeNode>>;

// Build a tree from level-order text. The word "null" marks a missing child.
TreeNode* buildTree(const std::string& text, Pool& pool) {
    std::istringstream in(text);
    std::vector<std::string> tokens;
    for (std::string t; in >> t;) tokens.push_back(t);
    if (tokens.empty() || tokens[0] == "null") return nullptr;
    std::size_t pos = 0;
    auto make = [&]() -> TreeNode* {
        if (pos >= tokens.size()) return nullptr;
        const std::string& token = tokens[pos++];
        if (token == "null") return nullptr;
        pool.push_back(std::make_unique<TreeNode>(std::stoi(token)));
        return pool.back().get();
    };
    TreeNode* root = make();
    std::vector<TreeNode*> queue = {root};
    for (std::size_t head = 0; head < queue.size(); head++) {
        queue[head]->left = make();
        queue[head]->right = make();
        if (queue[head]->left) queue.push_back(queue[head]->left);
        if (queue[head]->right) queue.push_back(queue[head]->right);
    }
    return root;
}

std::string join(const std::vector<int>& values) {
    std::string out;
    for (int v : values) out += (out.empty() ? "" : " ") + std::to_string(v);
    return out;
}

int main() {
    std::vector<std::pair<std::string, std::string>> cases = {
        {"1 null 2 3", "preorder"},
        {"1 null 2 3", "inorder"},
        {"1 null 2 3", "postorder"},
        {"", "inorder"},
        {"1", "preorder"},
        {"1 2 3 4 5 6 7", "preorder"},
        {"1 2 3 4 5 6 7", "inorder"},
        {"1 2 3 4 5 6 7", "postorder"},
        {"1 2 null 3 null 4", "preorder"},
        {"1 2 null 3 null 4", "postorder"},
        {"1 null 2 null 3 null 4", "inorder"},
        {"1 null 2 null 3 null 4", "postorder"},
        {"4 2 7 1 3 6 9", "inorder"},
        {"3 9 20 null null 15 7", "preorder"},
        {"3 9 20 null null 15 7", "inorder"},
        {"3 9 20 null null 15 7", "postorder"},
        {"5 3 8 1 4 7 9 null 2", "inorder"},
        {"1 2 3 null 4 null 5", "preorder"},
        {"1 2 3 null 4 null 5", "postorder"},
    };
    for (const auto& [text, order] : cases) {
        Pool pool;
        auto values = traverse(buildTree(text, pool), order);
        std::cout << (values.empty() ? "empty" : join(values)) << "\n";
    }
}
