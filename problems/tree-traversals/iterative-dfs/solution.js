// Tree traversals, approach 2: iterative depth-first search. An explicit stack replaces the call stack.
class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function traverse(root, order) {
  const result = [];
  const stack = [];
  if (order === 'inorder') {
    let node = root;
    while (node !== null || stack.length > 0) {
      while (node !== null) { // 1. dive as far left as possible, remembering the path
        stack.push(node);
        node = node.left;
      }
      node = stack.pop(); // 2. the leftmost node not yet visited
      result.push(node.val); // 3. visit it
      node = node.right; // 4. then handle its right subtree the same way
    }
    return result;
  }
  // Pre-order and post-order share one loop. Post-order is "node, right, left" reversed at the end.
  if (root !== null) stack.push(root);
  while (stack.length > 0) {
    const node = stack.pop(); // 5. take the next node and visit it
    result.push(node.val);
    const first = order === 'preorder' ? node.right : node.left; // 6. the child pushed first is popped last
    const second = order === 'preorder' ? node.left : node.right;
    if (first !== null) stack.push(first);
    if (second !== null) stack.push(second);
  }
  if (order === 'postorder') result.reverse(); // 7. reverse "node, right, left" to get "left, right, node"
  return result;
}

// Test helper: build a tree from level-order text. The word "null" marks a missing child.
function buildTree(text) {
  const tokens = text.split(' ').filter(Boolean);
  if (tokens.length === 0 || tokens[0] === 'null') return null;
  const root = new TreeNode(Number(tokens[0]));
  const queue = [root];
  let i = 1;
  const make = () => {
    if (i >= tokens.length) return null;
    const token = tokens[i++];
    if (token === 'null') return null;
    const node = new TreeNode(Number(token));
    queue.push(node);
    return node;
  };
  for (let head = 0; head < queue.length; head++) {
    queue[head].left = make();
    queue[head].right = make();
  }
  return root;
}

const cases = [
  ["1 null 2 3", 'preorder'],
  ["1 null 2 3", 'inorder'],
  ["1 null 2 3", 'postorder'],
  ["", 'inorder'],
  ["1", 'preorder'],
  ["1 2 3 4 5 6 7", 'preorder'],
  ["1 2 3 4 5 6 7", 'inorder'],
  ["1 2 3 4 5 6 7", 'postorder'],
  ["1 2 null 3 null 4", 'preorder'],
  ["1 2 null 3 null 4", 'postorder'],
  ["1 null 2 null 3 null 4", 'inorder'],
  ["1 null 2 null 3 null 4", 'postorder'],
  ["4 2 7 1 3 6 9", 'inorder'],
  ["3 9 20 null null 15 7", 'preorder'],
  ["3 9 20 null null 15 7", 'inorder'],
  ["3 9 20 null null 15 7", 'postorder'],
  ["5 3 8 1 4 7 9 null 2", 'inorder'],
  ["1 2 3 null 4 null 5", 'preorder'],
  ["1 2 3 null 4 null 5", 'postorder'],
];

for (const [text, order] of cases) {
  const values = traverse(buildTree(text), order);
  console.log(values.length ? values.join(' ') : 'empty');
}
