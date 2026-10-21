// Valid parentheses, approach 2: stack. Push every opener; each closer must match the opener on top.
function isValid(s: string): boolean {
  const opener = new Map<string, string>([[')', '('], [']', '['], ['}', '{']]); // closer -> the opener it needs
  const stack: string[] = [];
  for (const ch of s) {
    if (opener.has(ch)) {
      // 1. a closer: the most recent opener must be its partner (pop on empty gives undefined)
      if (stack.pop() !== opener.get(ch)) return false;
    } else {
      stack.push(ch); // 2. an opener: wait for its partner
    }
  }
  return stack.length === 0; // 3. leftover openers were never closed
}

const cases: string[] = [
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
