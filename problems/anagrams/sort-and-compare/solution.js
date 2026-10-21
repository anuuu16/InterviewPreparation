// Anagrams, approach 1: sort the letters of both words and compare. Two words are anagrams exactly when their sorted letters match.
// Assumes lowercase letters a to z only.
function isAnagram(a, b) {
  if (a.length !== b.length) return false; // 1. different lengths can never be anagrams
  const sortLetters = (word) => [...word].sort().join(''); // 2. the default sort compares UTF-16 codes: fine for letters, wrong for numbers
  return sortLetters(a) === sortLetters(b); // 3. same letters in the same multiset means the same sorted string
}

const cases = [
  ["listen", "silent"],
  ["anagram", "nagaram"],
  ["rat", "car"],
  ["a", "a"],
  ["", ""],
  ["ab", "a"],
  ["aab", "abb"],
  ["abc", "cba"],
  ["aabbcc", "abcabc"],
  ["hello", "world"],
  ["a", "b"],
  ["night", "thing"],
  ["abcd", "abce"],
  ["conversation", "voicesranton"],
  ["dormitory", "dirtyroom"],
  ["schoolmaster", "theclassroom"],
  ["restful", "fluster"],
  ["abcdefghijklmnopqrstuvwxyz", "zyxwvutsrqponmlkjihgfedcba"],
  ["zz", "z"],
  ["zzzz", "zzzy"],
];

for (const [a, b] of cases) console.log(String(isAnagram(a, b)));
