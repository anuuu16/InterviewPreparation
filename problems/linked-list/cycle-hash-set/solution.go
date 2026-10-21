// Linked list, approach 3: detect a cycle with a hash set. Remember every node visited; seeing one twice means a cycle.
package main

import (
	"fmt"
	"strconv"
	"strings"
)

type ListNode struct {
	Val  int
	Next *ListNode
}

func hasCycle(head *ListNode) bool {
	seen := make(map[*ListNode]struct{}) // pointer keys compare by address, i.e. by identity
	for node := head; node != nil; node = node.Next {
		if _, ok := seen[node]; ok { // 1. we are back at a node we already visited: there is a cycle
			return true
		}
		seen[node] = struct{}{} // 2. remember this node
	}
	return false // 3. we fell off the end, so the list has an end and no cycle
}

// Test helper: build a list from a slice. cyclePos >= 0 links the tail back to that node.
func fromSlice(values []int, cyclePos int) *ListNode {
	dummy := &ListNode{}
	tail := dummy
	var nodes []*ListNode
	for _, v := range values {
		tail.Next = &ListNode{Val: v}
		tail = tail.Next
		nodes = append(nodes, tail)
	}
	if cyclePos >= 0 {
		tail.Next = nodes[cyclePos]
	}
	return dummy.Next
}

// Test helper: values separated by spaces, or the word "empty" for an empty list.
func toText(head *ListNode) string {
	var out []string
	for n := head; n != nil; n = n.Next {
		out = append(out, strconv.Itoa(n.Val))
	}
	if len(out) == 0 {
		return "empty"
	}
	return strings.Join(out, " ")
}

func main() {
	cases := []struct {
		values []int
		pos    int
	}{
		{[]int{3, 2, 0, -4}, 1},
		{[]int{1, 2}, 0},
		{[]int{1}, -1},
		{[]int{1}, 0},
		{[]int{}, -1},
		{[]int{1, 2, 3, 4, 5}, -1},
		{[]int{1, 2, 3, 4, 5}, 4},
		{[]int{1, 2, 3, 4, 5}, 2},
		{[]int{1, 1, 1}, -1},
		{[]int{1, 1, 1}, 1},
		{[]int{1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12}, -1},
		{[]int{1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12}, 0},
	}
	for _, c := range cases {
		fmt.Println(hasCycle(fromSlice(c.values, c.pos)))
	}
}
