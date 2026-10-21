// Linked list, approach 5: merge two sorted lists. A dummy head node and a tail pointer relink the existing nodes in order.
class ListNode {
  constructor(val, next = null) {
    this.val = val;
    this.next = next;
  }
}

function mergeTwoLists(a, b) {
  const dummy = new ListNode(0); // 1. a dummy node removes the special case of an empty result list
  let tail = dummy;
  while (a !== null && b !== null) {
    if (b.val < a.val) { // 2. take the smaller front node; on a tie take from a (keeps the merge stable)
      tail.next = b;
      b = b.next;
    } else {
      tail.next = a;
      a = a.next;
    }
    tail = tail.next;
  }
  tail.next = a !== null ? a : b; // 3. one list is used up: attach the rest of the other in one step
  return dummy.next; // 4. skip the dummy
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
  [[1, 2, 4], [1, 3, 4]],
  [[], []],
  [[], [0]],
  [[5], []],
  [[1, 3, 5], [2, 4, 6]],
  [[1, 1, 1], [1, 1]],
  [[1, 2, 3], [4, 5, 6]],
  [[4, 5, 6], [1, 2, 3]],
  [[-5, -1, 0], [-3, 2]],
  [[1], [1]],
  [[2, 4, 6, 8], [1, 3]],
];

for (const [a, b] of cases) console.log(toText(mergeTwoLists(fromArray(a), fromArray(b))));
