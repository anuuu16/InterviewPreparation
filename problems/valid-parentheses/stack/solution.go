// Valid parentheses, approach 2: stack. Push every opener; each closer must match the opener on top.
package main

import "fmt"

func isValid(s string) bool {
	opener := map[byte]byte{')': '(', ']': '[', '}': '{'} // closer -> the opener it needs
	var stack []byte
	for i := 0; i < len(s); i++ {
		ch := s[i]
		if want, isCloser := opener[ch]; isCloser {
			// 1. a closer: the most recent opener must be its partner
			if len(stack) == 0 || stack[len(stack)-1] != want {
				return false
			}
			stack = stack[:len(stack)-1] // pop
		} else {
			stack = append(stack, ch) // 2. an opener: wait for its partner
		}
	}
	return len(stack) == 0 // 3. leftover openers were never closed
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
