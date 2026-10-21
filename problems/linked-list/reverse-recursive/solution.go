// Linked list, approach 2: reverse a singly linked list recursively. Reverse the rest first, then hang this node at its end.
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

func reverseList(head *ListNode) *ListNode {
	if head == nil || head.Next == nil { // 1. base case: empty or single node is already reversed
		return head
	}
	newHead := reverseList(head.Next) // 2. reverse everything after this node; newHead is the old tail
	head.Next.Next = head             // 3. the node after us must now point back at us
	head.Next = nil                   // 4. we become the tail, so we point at nothing (this also prevents a cycle)
	return newHead                    // 5. the new head never changes while the recursion unwinds
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
	cases := [][]int{
		[]int{1, 2, 3, 4, 5},
		[]int{},
		[]int{1},
		[]int{1, 2},
		[]int{1, 2, 3},
		[]int{7, 7, 8},
		[]int{10, 20, 30, 40},
		[]int{-1, 0, 1},
		[]int{1, 2, 3, 4, 5, 6, 7, 8, 9, 10},
	}
	for _, values := range cases {
		fmt.Println(toText(reverseList(fromSlice(values, -1))))
	}
}
