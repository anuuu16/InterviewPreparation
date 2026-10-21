// Valid parentheses, approach 1: brute force. Delete matching pairs "()", "[]", "{}" until nothing changes.
// A string is valid exactly when this reduces it to the empty string.
function isValid(s) {
  let previous;
  do {
    previous = s; // 1. remember the string before this round
    s = s.replaceAll('()', '').replaceAll('[]', '').replaceAll('{}', ''); // 2. remove every adjacent pair
  } while (s !== previous); // 3. stop when a round removes nothing
  return s.length === 0; // 4. valid only if everything was removed
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
