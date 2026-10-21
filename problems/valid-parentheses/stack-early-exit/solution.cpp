// Valid parentheses, approach 3: stack with early exits. Same idea as approach 2, but give up as soon as success is impossible.
#include <iostream>
#include <string>
#include <unordered_map>
#include <vector>

bool isValid(const std::string& s) {
    if (s.size() % 2 == 1) return false; // 1. brackets come in pairs, so an odd length can never be valid
    const std::unordered_map<char, char> closerFor = {{'(', ')'}, {'[', ']'}, {'{', '}'}}; // push the closer we expect
    std::string stack; // a std::string works well as a stack of chars
    const int n = static_cast<int>(s.size());
    for (int i = 0; i < n; i++) {
        auto it = closerFor.find(s[i]);
        if (it != closerFor.end()) {
            stack.push_back(it->second); // 2. an opener: remember which closer must come
        } else {
            if (stack.empty() || stack.back() != s[i]) return false; // 3. a wrong closer, or a closer with nothing open
            stack.pop_back();
        }
        if (static_cast<int>(stack.size()) > n - i - 1) return false; // 4. more open brackets than characters left to close them
    }
    return stack.empty();
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
