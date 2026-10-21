// Linked list, approach 5: merge two sorted lists. A dummy head node and a tail pointer relink the existing nodes in order.
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

func mergeTwoLists(a, b *ListNode) *ListNode {
	dummy := &ListNode{} // 1. a dummy node removes the special case of an empty result list
	tail := dummy
	for a != nil && b != nil {
		if b.Val < a.Val { // 2. take the smaller front node; on a tie take from a (keeps the merge stable)
			tail.Next, b = b, b.Next
		} else {
			tail.Next, a = a, a.Next
		}
		tail = tail.Next
	}
	if a != nil { // 3. one list is used up: attach the rest of the other in one step
		tail.Next = a
	} else {
		tail.Next = b
	}
	return dummy.Next // 4. skip the dummy
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
	cases := []struct{ a, b []int }{
		{[]int{1, 2, 4}, []int{1, 3, 4}},
		{[]int{}, []int{}},
		{[]int{}, []int{0}},
		{[]int{5}, []int{}},
		{[]int{1, 3, 5}, []int{2, 4, 6}},
		{[]int{1, 1, 1}, []int{1, 1}},
		{[]int{1, 2, 3}, []int{4, 5, 6}},
		{[]int{4, 5, 6}, []int{1, 2, 3}},
		{[]int{-5, -1, 0}, []int{-3, 2}},
		{[]int{1}, []int{1}},
		{[]int{2, 4, 6, 8}, []int{1, 3}},
	}
	for _, c := range cases {
		fmt.Println(toText(mergeTwoLists(fromSlice(c.a, -1), fromSlice(c.b, -1))))
	}
}
