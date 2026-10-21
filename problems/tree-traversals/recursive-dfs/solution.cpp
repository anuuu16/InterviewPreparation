// Tree traversals, approach 1: recursive depth-first search. The only difference between the three orders
// is WHEN the node is visited: before its children (pre), between them (in) or after them (post).
#include <iostream>
#include <memory>
#include <sstream>
#include <string>
#include <utility>
#include <vector>

struct TreeNode {
    int val;
    TreeNode* left = nullptr;
    TreeNode* right = nullptr;
    explicit TreeNode(int v) : val(v) {}
};

static void visit(const TreeNode* node, const std::string& order, std::vector<int>& result) {
    if (node == nullptr) return; // 1. base case: an empty subtree has nothing to visit
    if (order == "preorder") result.push_back(node->val); // 2. pre-order: node first
    visit(node->left, order, result); // 3. the whole left subtree
    if (order == "inorder") result.push_back(node->val); // 4. in-order: node between its subtrees
    visit(node->right, order, result); // 5. the whole right subtree
    if (order == "postorder") result.push_back(node->val); // 6. post-order: node last
}

std::vector<int> traverse(const TreeNode* root, const std::string& order) {
    std::vector<int> result;
    visit(root, order, result);
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
