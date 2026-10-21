// Linked list, approach 2: reverse a singly linked list recursively. Reverse the rest first, then hang this node at its end.
class ListNode {
  constructor(val, next = null) {
    this.val = val;
    this.next = next;
  }
}

function reverseList(head) {
  if (head === null || head.next === null) return head; // 1. base case: empty or single node is already reversed
  const newHead = reverseList(head.next); // 2. reverse everything after this node; newHead is the old tail
  head.next.next = head; // 3. the node after us must now point back at us
  head.next = null; // 4. we become the tail, so we point at nothing (this also prevents a cycle)
  return newHead; // 5. the new head never changes while the recursion unwinds
}

// Test helper: build a list from an array. cyclePos >= 0 links the tail back to that node.
function fromArray(values, cyclePos = -1) {
  const dummy = new ListNode(0);
  let tail = dummy;
  const nodes = [];
  for (const v of values) {
    tail.next = new ListNode(v);
    tail = tail.next;
    nodes.push(tail);
  }
  if (cyclePos >= 0) tail.next = nodes[cyclePos];
  return dummy.next;
}

// Test helper: values separated by spaces, or the word "empty" for an empty list.
function toText(head) {
  const out = [];
  for (let n = head; n; n = n.next) out.push(n.val);
  return out.length ? out.join(' ') : 'empty';
}

const cases = [
  [1, 2, 3, 4, 5],
  [],
  [1],
  [1, 2],
  [1, 2, 3],
  [7, 7, 8],
  [10, 20, 30, 40],
  [-1, 0, 1],
  [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
];

for (const values of cases) console.log(toText(reverseList(fromArray(values))));
