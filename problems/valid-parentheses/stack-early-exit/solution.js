// Valid parentheses, approach 3: stack with early exits. Same idea as approach 2, but give up as soon as success is impossible.
function isValid(s) {
  if (s.length % 2 === 1) return false; // 1. brackets come in pairs, so an odd length can never be valid
  const closerFor = new Map([['(', ')'], ['[', ']'], ['{', '}']]); // push the closer we expect, so a pop is a plain comparison
  const stack = [];
  for (let i = 0; i < s.length; i++) {
    const ch = s[i];
    if (closerFor.has(ch)) {
      stack.push(closerFor.get(ch)); // 2. an opener: remember which closer must come
    } else if (stack.pop() !== ch) {
      return false; // 3. a wrong closer, or a closer with nothing open
    }
    if (stack.length > s.length - i - 1) return false; // 4. more open brackets than characters left to close them
  }
  return stack.length === 0;
}

const cases = [
  "()",
  "()[]{}",
  "(]",
  "([)]",
  "{[]}",
  "",
  "(",
  ")",
  "((",
  "))",
  "(((())))",
  "{[()()]}",
  "([{}])",
  "(()",
  "())",
  "]",
  "()()()()",
  "{{{{}}}}[",
  "((((((((((",
  "[({})](",
  "{[}]",
];

for (const s of cases) console.log(String(isValid(s)));
