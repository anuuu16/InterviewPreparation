// Linked list, approach 1: reverse a singly linked list iteratively. Re-point every next pointer backwards.
class ListNode {
  constructor(val, next = null) {
    this.val = val;
    this.next = next;
  }
}

function reverseList(head) {
  let prev = null; // 1. the already reversed part starts empty
  let current = head;
  while (current !== null) {
    const next = current.next; // 2. save the rest of the list before we cut the link
    current.next = prev; // 3. point this node backwards
    prev = current; // 4. the reversed part now starts at this node
    current = next; // 5. move on to the saved rest
  }
  return prev; // 6. prev is the old tail, which is the new head
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
