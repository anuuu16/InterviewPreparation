// Tree traversals, approach 3: breadth-first search (level order). A queue holds the nodes of the current level.
#include <iostream>
#include <memory>
#include <queue>
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

std::vector<std::vector<int>> levelOrder(const TreeNode* root) {
    std::vector<std::vector<int>> levels;
    if (root == nullptr) return levels;
    std::queue<const TreeNode*> queue;
    queue.push(root); // 1. start with the root alone as level 0
    while (!queue.empty()) {
        std::vector<int> level;
        for (std::size_t count = queue.size(); count > 0; count--) { // 2. freeze the size: this many nodes are on the current level
            const TreeNode* node = queue.front();
            queue.pop();
            level.push_back(node->val);
            if (node->left != nullptr) queue.push(node->left); // 3. children join the back of the queue
            if (node->right != nullptr) queue.push(node->right);
        }
        levels.push_back(std::move(level)); // 4. one finished level
    }
    return levels;
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
    std::vector<std::string> cases = {
        "1 null 2 3",
        "",
        "1",
        "1 2 3 4 5 6 7",
        "1 2 null 3 null 4",
        "1 null 2 null 3 null 4",
        "4 2 7 1 3 6 9",
        "3 9 20 null null 15 7",
        "5 3 8 1 4 7 9 null 2",
        "1 2 3 null 4 null 5",
        "10 -5 15 -8 null 12 20",
    };
    for (const auto& text : cases) {
        Pool pool;
        auto levels = levelOrder(buildTree(text, pool));
        std::string line;
        for (const auto& level : levels) line += (line.empty() ? "" : " | ") + join(level);
        std::cout << (line.empty() ? "empty" : line) << "\n";
    }
}
