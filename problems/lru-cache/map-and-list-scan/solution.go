// LRU cache, approach 1: a hash map for the values plus a plain slice that remembers the usage order.
// Lookups are fast, but moving a key to "most recent" means scanning the slice, so Get and Put cost O(n).
// Get returns -1 when the key is missing (values in this exercise are never negative).
package main

import (
	"fmt"
	"slices"
	"strconv"
	"strings"
)

type LRUCache struct {
	capacity int
	values   map[int]int // key -> value
	order    []int       // keys from least recently used (front) to most recently used (back)
}

func NewLRUCache(capacity int) *LRUCache {
	return &LRUCache{capacity: capacity, values: make(map[int]int)}
}

func (c *LRUCache) touch(key int) {
	i := slices.Index(c.order, key)          // 1. find the key in the slice (O(n))
	c.order = slices.Delete(c.order, i, i+1) // cut it out
	c.order = append(c.order, key)           // 2. put it at the back: most recently used
}

func (c *LRUCache) Get(key int) int {
	value, ok := c.values[key]
	if !ok {
		return -1
	}
	c.touch(key) // a read counts as a use
	return value
}

func (c *LRUCache) Put(key, value int) {
	if _, ok := c.values[key]; ok {
		c.touch(key) // updating an existing key also counts as a use
	} else {
		if len(c.values) == c.capacity {
			delete(c.values, c.order[0]) // 3. full: evict the front of the slice, the least recently used
			c.order = c.order[1:]
		}
		c.order = append(c.order, key)
	}
	c.values[key] = value
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
