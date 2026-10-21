// Linked list, approach 4: detect a cycle with Floyd's tortoise and hare. Two pointers, one twice as fast; they meet only in a cycle.
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
	slow, fast := head, head              // tortoise: one step at a time, hare: two steps at a time
	for fast != nil && fast.Next != nil { // 1. the hare reaching the end proves there is no cycle
		slow = slow.Next      // 2. tortoise: one step
		fast = fast.Next.Next // 3. hare: two steps
		if slow == fast {     // 4. inside a cycle the hare catches the tortoise
			return true
		}
	}
	return false
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
