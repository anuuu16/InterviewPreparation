// Anagrams, approach 4: group a list of words with a hash map. The key is the word's letter counts, not its sorted letters.
// Counting is O(k) per word instead of O(k log k) for sorting. Assumes lowercase words.
package main

import (
	"fmt"
	"sort"
	"strings"
)

func groupAnagrams(words []string) [][]string {
	groups := make(map[[26]int][]string) // letter counts -> the words that have those counts
	for _, word := range words {
		var counts [26]int // 1. count how many times each letter appears
		for i := 0; i < len(word); i++ {
			counts[word[i]-'a']++
		}
		groups[counts] = append(groups[counts], word) // 2. arrays are comparable in Go, so [26]int is a valid map key; 3. add the word
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
