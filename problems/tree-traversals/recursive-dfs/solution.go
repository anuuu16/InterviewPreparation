// Tree traversals, approach 1: recursive depth-first search. The only difference between the three orders
// is WHEN the node is visited: before its children (pre), between them (in) or after them (post).
package main

import (
	"fmt"
	"strconv"
	"strings"
)

type TreeNode struct {
	Val         int
	Left, Right *TreeNode
}

func traverse(root *TreeNode, order string) []int {
	var result []int
	var visit func(node *TreeNode) // declared first so the closure can call itself
	visit = func(node *TreeNode) {
		if node == nil { // 1. base case: an empty subtree has nothing to visit
			return
		}
		if order == "preorder" { // 2. pre-order: node first
			result = append(result, node.Val)
		}
		visit(node.Left)        // 3. the whole left subtree
		if order == "inorder" { // 4. in-order: node between its subtrees
			result = append(result, node.Val)
		}
		visit(node.Right)         // 5. the whole right subtree
		if order == "postorder" { // 6. post-order: node last
			result = append(result, node.Val)
		}
	}
	visit(root)
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
