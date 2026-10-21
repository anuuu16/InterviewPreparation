// Anagrams, approach 4: group a list of words with a hash map. The key is the word's letter counts, not its sorted letters.
// Counting is O(k) per word instead of O(k log k) for sorting. Assumes lowercase words.
#include <algorithm>
#include <iostream>
#include <sstream>
#include <string>
#include <unordered_map>
#include <utility>
#include <vector>

std::vector<std::vector<std::string>> groupAnagrams(const std::vector<std::string>& words) {
    std::unordered_map<std::string, std::vector<std::string>> groups; // letter counts -> the words that have those counts
    for (const std::string& word : words) {
        int counts[26] = {}; // 1. count how many times each letter appears
        for (char ch : word) counts[ch - 'a']++;
        std::string key; // 2. std::unordered_map has no hash for arrays, so turn the counts into text
        for (int count : counts) key += std::to_string(count) + '#';
        groups[key].push_back(word); // 3. add the word to its group
    }
    std::vector<std::vector<std::string>> result;
    for (auto& entry : groups) result.push_back(std::move(entry.second)); // 4. the order of groups is not meaningful
    return result;
}

int main() {
    std::vector<std::string> cases = {
        "eat tea tan ate nat bat",
        "",
        "a",
        "ab ba",
        "abc def",
        "listen silent enlist google gogole inlets banana",
        "eat eat tea",
        "z y x",
        "aa a aaa a",
        "cab abc bca xyz zyx yxz aab aba baa",
        "dormitory dirtyroom",
    };
    for (const auto& text : cases) {
        std::vector<std::string> words;
        std::istringstream in(text);
        for (std::string w; in >> w;) words.push_back(w);
        // The hash map has no useful order, so sort each group and then the groups to get one fixed output.
        auto groups = groupAnagrams(words);
        for (auto& group : groups) std::sort(group.begin(), group.end());
        std::sort(groups.begin(), groups.end(), [](const auto& x, const auto& y) { return x[0] < y[0]; });
        std::string line;
        for (const auto& group : groups) {
            std::string part;
            for (const auto& w : group) part += (part.empty() ? "" : " ") + w;
            line += (line.empty() ? "" : " | ") + part;
        }
        std::cout << (line.empty() ? "empty" : line) << "\n";
    }
}
