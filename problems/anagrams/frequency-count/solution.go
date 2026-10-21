// Anagrams, approach 2: count the letters. Add one for each letter of a, subtract one for each letter of b.
// The words are anagrams exactly when every count ends at zero. Assumes lowercase letters a to z only.
package main

import "fmt"

func isAnagram(a, b string) bool {
	if len(a) != len(b) { // 1. different lengths can never be anagrams
		return false
	}
	var counts [26]int // 2. one counter per letter: counts[0] is 'a'; an array's zero value is all zeros
	for i := 0; i < len(a); i++ {
		counts[a[i]-'a']++ // 3. a letter of a adds one
		counts[b[i]-'a']-- //    a letter of b takes one away
	}
	return counts == [26]int{} // 4. arrays are comparable in Go: all zero means the same letters
}

func main() {
	cases := [][2]string{
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
	}
	for _, c := range cases {
		fmt.Println(isAnagram(c[0], c[1]))
	}
}
