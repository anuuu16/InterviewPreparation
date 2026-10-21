// LRU cache, approach 2: a hash map from key to node, plus a doubly linked list ordered by recent use.
// The map finds a node in O(1); the list moves or removes a node in O(1) because it knows both neighbours.
// Get returns -1 when the key is missing (values in this exercise are never negative).
package main

import (
	"fmt"
	"strconv"
	"strings"
)

type node struct {
	key, value int
	prev, next *node
}

type LRUCache struct {
	capacity   int
	nodes      map[int]*node // key -> node
	head, tail *node         // sentinels: dummy nodes at both ends, so no node ever has a nil neighbour
}

func NewLRUCache(capacity int) *LRUCache {
	c := &LRUCache{capacity: capacity, nodes: make(map[int]*node), head: &node{}, tail: &node{}} // 1. create the sentinels
	c.head.next = c.tail                                                                         // most recently used sits right after head, least recently used right before tail
	c.tail.prev = c.head
	return c
}

func (c *LRUCache) unlink(n *node) {
	n.prev.next = n.next // 2. connect the two neighbours to each other
	n.next.prev = n.prev
}

func (c *LRUCache) pushFront(n *node) {
	n.prev = c.head // 3. insert right after the head sentinel
	n.next = c.head.next
	c.head.next.prev = n
	c.head.next = n
}

func (c *LRUCache) Get(key int) int {
	n, ok := c.nodes[key]
	if !ok {
		return -1
	}
	c.unlink(n) // 4. a read makes the node the most recently used
	c.pushFront(n)
	return n.value
}

func (c *LRUCache) Put(key, value int) {
	if n, ok := c.nodes[key]; ok {
		n.value = value
		c.unlink(n)
		c.pushFront(n)
		return
	}
	if len(c.nodes) == c.capacity {
		lru := c.tail.prev // 5. full: the node before the tail sentinel is the least recently used
		c.unlink(lru)
		delete(c.nodes, lru.key) // the node stores its key, so we can remove the map entry too
	}
	n := &node{key: key, value: value}
	c.nodes[key] = n
	c.pushFront(n)
}

func main() {
	scenarios := []struct {
		capacity int
		script   string
	}{
		{2, "put 1 1; put 2 2; get 1; put 3 3; get 2; put 4 4; get 1; get 3; get 4"},
		{1, "put 2 1; get 2; put 3 2; get 2; get 3"},
		{2, "put 1 1; put 2 2; put 1 10; put 3 3; get 1; get 2; get 3"},
		{3, "put 1 1; put 2 2; put 3 3; get 1; get 2; put 4 4; get 3; get 1; get 2; get 4"},
		{2, "get 5; put 5 50; get 5"},
		{2, "put 1 1; put 2 2; get 2; get 1; put 3 3; get 2; get 1; get 3"},
		{1, "put 1 1; put 1 2; get 1; put 2 3; get 1; get 2"},
		{3, "put 0 0; get 0; put 1 0; get 1"},
		{2, "get 1; get 2"},
		{4, "put 1 10; put 2 20; put 3 30; put 4 40; put 5 50; get 1; get 2; put 6 60; get 3; get 5; get 6; get 4"},
		{3, "put 1 1; get 1; get 1; put 2 2; put 3 3; put 4 4; get 1; get 2; get 4; put 5 5; get 3; get 4; get 5"},
	}
	for _, sc := range scenarios {
		cache := NewLRUCache(sc.capacity)
		var results []string
		for _, op := range strings.Split(sc.script, ";") {
			parts := strings.Fields(op)
			key, _ := strconv.Atoi(parts[1])
			if parts[0] == "put" {
				value, _ := strconv.Atoi(parts[2])
				cache.Put(key, value)
			} else if found := cache.Get(key); found == -1 { // -1 means "not in the cache"
				results = append(results, "-")
			} else {
				results = append(results, strconv.Itoa(found))
			}
		}
		fmt.Println(strings.Join(results, " "))
	}
}
