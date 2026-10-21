// Anagrams, approach 1: sort the letters of both words and compare. Two words are anagrams exactly when their sorted letters match.
// Assumes lowercase letters a to z only.
package main

import (
	"fmt"
	"slices"
)

func sortLetters(word string) string {
	letters := []byte(word) // 2. copy the bytes (strings are immutable), then sort the copy
	slices.Sort(letters)
	return string(letters)
}

func isAnagram(a, b string) bool {
	if len(a) != len(b) { // 1. different lengths can never be anagrams
		return false
	}
	return sortLetters(a) == sortLetters(b) // 3. same letters means the same sorted string
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
