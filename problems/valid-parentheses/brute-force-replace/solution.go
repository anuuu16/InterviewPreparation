// Valid parentheses, approach 1: brute force. Delete matching pairs "()", "[]", "{}" until nothing changes.
// A string is valid exactly when this reduces it to the empty string.
package main

import (
	"fmt"
	"strings"
)

func isValid(s string) bool {
	for {
		previous := s // 1. remember the string before this round
		for _, pair := range []string{"()", "[]", "{}"} {
			s = strings.ReplaceAll(s, pair, "") // 2. remove every adjacent pair
		}
		if s == previous { // 3. stop when a round removes nothing
			break
		}
	}
	return s == "" // 4. valid only if everything was removed
}

func main() {
	cases := []string{
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
	}
	for _, s := range cases {
		fmt.Println(isValid(s))
	}
}
