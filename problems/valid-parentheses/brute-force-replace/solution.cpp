// Valid parentheses, approach 1: brute force. Delete matching pairs "()", "[]", "{}" until nothing changes.
// A string is valid exactly when this reduces it to the empty string.
#include <iostream>
#include <string>
#include <vector>

// C++ has no replace-all in the standard library, so remove one pair at a time.
static bool removeOnePair(std::string& s, const std::string& pair) {
    std::size_t pos = s.find(pair);
    if (pos == std::string::npos) return false;
    s.erase(pos, 2);
    return true;
}

bool isValid(std::string s) { // s is a copy, so the caller's string is not changed
    bool changed = true;
    while (changed) { // 1. repeat until a full round removes nothing
        changed = false;
        for (const char* pair : {"()", "[]", "{}"}) {
            while (removeOnePair(s, pair)) changed = true; // 2. remove every adjacent pair
        }
    }
    return s.empty(); // 3. valid only if everything was removed
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
