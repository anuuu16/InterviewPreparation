// Tree traversals, approach 3: breadth-first search (level order). A queue holds the nodes of the current level.
class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function levelOrder(root) {
  const levels = [];
  if (root === null) return levels;
  let queue = [root]; // 1. start with the root alone as level 0
  while (queue.length > 0) {
    const level = [];
    const next = [];
    for (const node of queue) { // 2. everything currently in the queue belongs to the same level
      level.push(node.val);
      if (node.left !== null) next.push(node.left); // 3. children wait for the next round
      if (node.right !== null) next.push(node.right);
    }
    levels.push(level);
    queue = next; // 4. the next level becomes the queue
  }
  return levels;
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
];

for (const text of cases) {
  const levels = levelOrder(buildTree(text));
  console.log(levels.length ? levels.map((level) => level.join(' ')).join(' | ') : 'empty');
}
