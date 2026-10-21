// Anagrams, approach 3: group a list of words with a hash map. The key is the word's letters sorted:
// all anagrams share the same key. Assumes lowercase words.
package main

import (
	"fmt"
	"slices"
	"sort"
	"strings"
)

func groupAnagrams(words []string) [][]string {
	groups := make(map[string][]string) // sorted letters -> the words that have those letters
	for _, word := range words {
		letters := []byte(word)
		slices.Sort(letters)
		key := string(letters)                  // 1. "eat", "tea" and "ate" all become "aet"
		groups[key] = append(groups[key], word) // 2. a missing key gives a nil slice, so append starts a group; 3. add the word
	}
	result := make([][]string, 0, len(groups))
	for _, group := range groups { // 4. map iteration order is random in Go, so the order of groups is not meaningful
		result = append(result, group)
	}
	return result
}

func main() {
	cases := []string{
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
	}
	for _, text := range cases {
		// Map iteration order is random in Go, so sort each group and then the groups to get one fixed output.
		groups := groupAnagrams(strings.Fields(text))
		for _, group := range groups {
			sort.Strings(group)
		}
		sort.Slice(groups, func(i, j int) bool { return groups[i][0] < groups[j][0] })
		if len(groups) == 0 {
			fmt.Println("empty")
			continue
		}
		parts := make([]string, len(groups))
		for i, group := range groups {
			parts[i] = strings.Join(group, " ")
		}
		fmt.Println(strings.Join(parts, " | "))
	}
}
