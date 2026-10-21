// Anagrams, approach 1: sort the letters of both words and compare. Two words are anagrams exactly when their sorted letters match.
// Assumes lowercase letters a to z only.
#include <algorithm>
#include <iostream>
#include <string>
#include <utility>
#include <vector>

bool isAnagram(std::string a, std::string b) { // both strings are copies, so sorting does not change the caller's words
    if (a.size() != b.size()) return false; // 1. different lengths can never be anagrams
    std::sort(a.begin(), a.end()); // 2. sort the letters of each word
    std::sort(b.begin(), b.end());
    return a == b; // 3. same letters means the same sorted string
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
