// Linked list, approach 1: reverse a singly linked list iteratively. Re-point every next pointer backwards.
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
	var prev *ListNode // 1. the already reversed part starts empty
	current := head
	for current != nil {
		next := current.Next // 2. save the rest of the list before we cut the link
		current.Next = prev  // 3. point this node backwards
		prev = current       // 4. the reversed part now starts at this node
		current = next       // 5. move on to the saved rest
	}
	return prev // 6. prev is the old tail, which is the new head
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
