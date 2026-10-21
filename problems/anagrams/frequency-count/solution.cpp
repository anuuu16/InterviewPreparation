// Anagrams, approach 2: count the letters. Add one for each letter of a, subtract one for each letter of b.
// The words are anagrams exactly when every count ends at zero. Assumes lowercase letters a to z only.
#include <algorithm>
#include <array>
#include <iostream>
#include <string>
#include <utility>
#include <vector>

bool isAnagram(const std::string& a, const std::string& b) {
    if (a.size() != b.size()) return false; // 1. different lengths can never be anagrams
    std::array<int, 26> counts{}; // 2. one counter per letter: counts[0] is 'a'; {} sets every counter to zero
    for (std::size_t i = 0; i < a.size(); i++) {
        counts[a[i] - 'a']++; // 3. a letter of a adds one
        counts[b[i] - 'a']--; //    a letter of b takes one away
    }
    return std::all_of(counts.begin(), counts.end(), [](int count) { return count == 0; }); // 4. all zero means the same letters
}

int main() {
    std::vector<std::pair<std::string, std::string>> cases = {
        {"listen", "silent"},
        {"anagram", "nagaram"},
        {"rat", "car"},
        {"a", "a"},
        {"", ""},
        {"ab", "a"},
        {"aab", "abb"},
        {"abc", "cba"},
        {"aabbcc", "abcabc"},
        {"hello", "world"},
        {"a", "b"},
        {"night", "thing"},
        {"abcd", "abce"},
        {"conversation", "voicesranton"},
        {"dormitory", "dirtyroom"},
        {"schoolmaster", "theclassroom"},
        {"restful", "fluster"},
        {"abcdefghijklmnopqrstuvwxyz", "zyxwvutsrqponmlkjihgfedcba"},
        {"zz", "z"},
        {"zzzz", "zzzy"},
    };
    for (const auto& [a, b] : cases) std::cout << (isAnagram(a, b) ? "true" : "false") << "\n";
}
