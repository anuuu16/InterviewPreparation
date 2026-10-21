// Tree traversals, approach 2: iterative depth-first search. An explicit stack replaces the call stack.
package main

import (
	"fmt"
	"slices"
	"strconv"
	"strings"
)

type TreeNode struct {
	Val         int
	Left, Right *TreeNode
}

func traverse(root *TreeNode, order string) []int {
	var result []int
	var stack []*TreeNode
	if order == "inorder" {
		node := root
		for node != nil || len(stack) > 0 {
			for node != nil { // 1. dive as far left as possible, remembering the path
				stack = append(stack, node)
				node = node.Left
			}
			node = stack[len(stack)-1] // 2. the leftmost node not yet visited
			stack = stack[:len(stack)-1]
			result = append(result, node.Val) // 3. visit it
			node = node.Right                 // 4. then handle its right subtree the same way
		}
		return result
	}
	// Pre-order and post-order share one loop. Post-order is "node, right, left" reversed at the end.
	if root != nil {
		stack = append(stack, root)
	}
	for len(stack) > 0 {
		node := stack[len(stack)-1] // 5. take the next node and visit it
		stack = stack[:len(stack)-1]
		result = append(result, node.Val)
		first, second := node.Left, node.Right // 6. the child pushed first is popped last
		if order == "preorder" {
			first, second = node.Right, node.Left
		}
		for _, child := range []*TreeNode{first, second} {
			if child != nil {
				stack = append(stack, child)
			}
		}
	}
	if order == "postorder" {
		slices.Reverse(result) // 7. reverse "node, right, left" to get "left, right, node"
	}
	return result
}

// Test helper: build a tree from level-order text. The word "null" marks a missing child.
func buildTree(text string) *TreeNode {
	tokens := strings.Fields(text)
	if len(tokens) == 0 || tokens[0] == "null" {
		return nil
	}
	newNode := func(token string) *TreeNode {
		if token == "null" {
			return nil
		}
		v, _ := strconv.Atoi(token)
		return &TreeNode{Val: v}
	}
	root := newNode(tokens[0])
	queue := []*TreeNode{root}
	for i := 1; len(queue) > 0 && i < len(tokens); {
		node := queue[0]
		queue = queue[1:]
		if node.Left = newNode(tokens[i]); node.Left != nil {
			queue = append(queue, node.Left)
		}
		i++
		if i < len(tokens) {
			if node.Right = newNode(tokens[i]); node.Right != nil {
				queue = append(queue, node.Right)
			}
			i++
		}
	}
	return root
}

func joinInts(values []int) string {
	parts := make([]string, len(values))
	for i, v := range values {
		parts[i] = strconv.Itoa(v)
	}
	return strings.Join(parts, " ")
}

func main() {
	cases := []struct{ text, order string }{
		{"1 null 2 3", "preorder"},
		{"1 null 2 3", "inorder"},
		{"1 null 2 3", "postorder"},
		{"", "inorder"},
		{"1", "preorder"},
		{"1 2 3 4 5 6 7", "preorder"},
		{"1 2 3 4 5 6 7", "inorder"},
		{"1 2 3 4 5 6 7", "postorder"},
		{"1 2 null 3 null 4", "preorder"},
		{"1 2 null 3 null 4", "postorder"},
		{"1 null 2 null 3 null 4", "inorder"},
		{"1 null 2 null 3 null 4", "postorder"},
		{"4 2 7 1 3 6 9", "inorder"},
		{"3 9 20 null null 15 7", "preorder"},
		{"3 9 20 null null 15 7", "inorder"},
		{"3 9 20 null null 15 7", "postorder"},
		{"5 3 8 1 4 7 9 null 2", "inorder"},
		{"1 2 3 null 4 null 5", "preorder"},
		{"1 2 3 null 4 null 5", "postorder"},
	}
	for _, c := range cases {
		values := traverse(buildTree(c.text), c.order)
		if len(values) == 0 {
			fmt.Println("empty")
		} else {
			fmt.Println(joinInts(values))
		}
	}
}
