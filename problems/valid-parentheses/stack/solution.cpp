// Valid parentheses, approach 2: stack. Push every opener; each closer must match the opener on top.
#include <iostream>
#include <stack>
#include <string>
#include <unordered_map>
#include <vector>

bool isValid(const std::string& s) {
    const std::unordered_map<char, char> opener = {{')', '('}, {']', '['}, {'}', '{'}}; // closer -> the opener it needs
    std::stack<char> st;
    for (char ch : s) {
        auto it = opener.find(ch);
        if (it != opener.end()) {
            // 1. a closer: the most recent opener must be its partner (top() on an empty stack is undefined)
            if (st.empty() || st.top() != it->second) return false;
            st.pop();
        } else {
            st.push(ch); // 2. an opener: wait for its partner
        }
    }
    return st.empty(); // 3. leftover openers were never closed
}

int main() {
    std::vector<std::string> cases = {
        "()",
        "()[]{}",
        "(]",
        "([)]",
        "{[]}",
        "",
        "(",
        ")",
        "((",
        "))",
        "(((())))",
        "{[()()]}",
        "([{}])",
        "(()",
        "())",
        "]",
        "()()()()",
        "{{{{}}}}[",
        "((((((((((",
        "[({})](",
        "{[}]",
    };
    for (const auto& s : cases) std::cout << (isValid(s) ? "true" : "false") << "\n";
}
