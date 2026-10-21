// Valid parentheses, approach 3: stack with early exits. Same idea as approach 2, but give up as soon as success is impossible.
package main

import "fmt"

func isValid(s string) bool {
	if len(s)%2 == 1 { // 1. brackets come in pairs, so an odd length can never be valid
		return false
	}
	closerFor := map[byte]byte{'(': ')', '[': ']', '{': '}'} // push the closer we expect, so a pop is a plain comparison
	stack := make([]byte, 0, len(s)/2)
	for i := 0; i < len(s); i++ {
		ch := s[i]
		if closer, ok := closerFor[ch]; ok {
			stack = append(stack, closer) // 2. an opener: remember which closer must come
		} else {
			if len(stack) == 0 || stack[len(stack)-1] != ch {
				return false // 3. a wrong closer, or a closer with nothing open
			}
			stack = stack[:len(stack)-1]
		}
		if len(stack) > len(s)-i-1 { // 4. more open brackets than characters left to close them
			return false
		}
	}
	return len(stack) == 0
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
