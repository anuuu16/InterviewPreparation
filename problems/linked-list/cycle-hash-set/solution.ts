// Linked list, approach 3: detect a cycle with a hash set. Remember every node visited; seeing one twice means a cycle.
class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val: number, next: ListNode | null = null) {
    this.val = val;
    this.next = next;
  }
}

function hasCycle(head: ListNode | null): boolean {
  const seen = new Set<ListNode>(); // a Set of objects compares by identity (the node itself), not by value
  for (let node = head; node !== null; node = node.next) {
    if (seen.has(node)) return true; // 1. we are back at a node we already visited: there is a cycle
    seen.add(node); // 2. remember this node
  }
  return false; // 3. we fell off the end, so the list has an end and no cycle
}

// Test helper: build a list from an array. cyclePos >= 0 links the tail back to that node.
function fromArray(values: number[], cyclePos: number = -1): ListNode | null {
  const dummy = new ListNode(0);
  let tail = dummy;
  const nodes: ListNode[] = [];
  for (const v of values) {
    tail.next = new ListNode(v);
    tail = tail.next;
    nodes.push(tail);
  }
  if (cyclePos >= 0) tail.next = nodes[cyclePos];
  return dummy.next;
}

// Test helper: values separated by spaces, or the word "empty" for an empty list.
function toText(head: ListNode | null) {
  const out: number[] = [];
  for (let n = head; n; n = n.next) out.push(n.val);
  return out.length ? out.join(' ') : 'empty';
}

const cases: [number[], number][] = [
  [[3, 2, 0, -4], 1],
  [[1, 2], 0],
  [[1], -1],
  [[1], 0],
  [[], -1],
  [[1, 2, 3, 4, 5], -1],
  [[1, 2, 3, 4, 5], 4],
  [[1, 2, 3, 4, 5], 2],
  [[1, 1, 1], -1],
  [[1, 1, 1], 1],
  [[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], -1],
  [[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], 0],
];

for (const [values, pos] of cases) console.log(String(hasCycle(fromArray(values, pos))));
