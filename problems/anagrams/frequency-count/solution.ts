// Anagrams, approach 2: count the letters. Add one for each letter of a, subtract one for each letter of b.
// The words are anagrams exactly when every count ends at zero. Assumes lowercase letters a to z only.
function isAnagram(a: string, b: string): boolean {
  if (a.length !== b.length) return false; // 1. different lengths can never be anagrams
  const counts: number[] = new Array(26).fill(0); // 2. one counter per letter: counts[0] is 'a', counts[25] is 'z'
  for (let i = 0; i < a.length; i++) {
    counts[a.charCodeAt(i) - 97]++; // 3. a letter of a adds one
    counts[b.charCodeAt(i) - 97]--; //    a letter of b takes one away
  }
  return counts.every((count) => count === 0); // 4. all zero means the two words use the same letters
}

const cases: [string, string][] = [
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
