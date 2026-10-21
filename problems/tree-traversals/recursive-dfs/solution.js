// Tree traversals, approach 1: recursive depth-first search. The only difference between the three orders
// is WHEN the node is visited: before its children (pre), between them (in) or after them (post).
class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function traverse(root, order) {
  const result = [];
  function visit(node) {
    if (node === null) return; // 1. base case: an empty subtree has nothing to visit
    if (order === 'preorder') result.push(node.val); // 2. pre-order: node first
    visit(node.left); // 3. the whole left subtree
    if (order === 'inorder') result.push(node.val); // 4. in-order: node between its subtrees
    visit(node.right); // 5. the whole right subtree
    if (order === 'postorder') result.push(node.val); // 6. post-order: node last
  }
  visit(root);
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
