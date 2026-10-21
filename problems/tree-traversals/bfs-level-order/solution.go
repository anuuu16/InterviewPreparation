// Tree traversals, approach 3: breadth-first search (level order). A queue holds the nodes of the current level.
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

func levelOrder(root *TreeNode) [][]int {
	var levels [][]int
	if root == nil {
		return levels
	}
	queue := []*TreeNode{root} // 1. start with the root alone as level 0
	for len(queue) > 0 {
		var level []int
		for _, node := range queue { // 2. everything currently in the queue belongs to the same level
			level = append(level, node.Val)
		}
		var next []*TreeNode
		for _, node := range queue {
			if node.Left != nil { // 3. children wait for the next round
				next = append(next, node.Left)
			}
			if node.Right != nil {
				next = append(next, node.Right)
			}
		}
		levels = append(levels, level)
		queue = next // 4. the next level becomes the queue
	}
	return levels
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
	cases := []string{
		"1 null 2 3",
		"",
		"1",
		"1 2 3 4 5 6 7",
		"1 2 null 3 null 4",
		"1 null 2 null 3 null 4",
		"4 2 7 1 3 6 9",
		"3 9 20 null null 15 7",
		"5 3 8 1 4 7 9 null 2",
		"1 2 3 null 4 null 5",
		"10 -5 15 -8 null 12 20",
	}
	for _, text := range cases {
		levels := levelOrder(buildTree(text))
		if len(levels) == 0 {
			fmt.Println("empty")
			continue
		}
		parts := make([]string, len(levels))
		for i, level := range levels {
			parts[i] = joinInts(level)
		}
		fmt.Println(strings.Join(parts, " | "))
	}
}
