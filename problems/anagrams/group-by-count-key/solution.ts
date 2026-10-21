// Anagrams, approach 4: group a list of words with a hash map. The key is the word's letter counts, not its sorted letters.
// Counting is O(k) per word instead of O(k log k) for sorting. Assumes lowercase words.
function groupAnagrams(words: string[]): string[][] {
  const groups = new Map<string, string[]>(); // letter counts -> the words that have those counts
  for (const word of words) {
    const counts: number[] = new Array(26).fill(0); // 1. count how many times each letter appears
    for (const ch of word) counts[ch.charCodeAt(0) - 97]++;
    const key = counts.join(','); // 2. "eat" and "tea" give the same text (arrays compare by reference, so we need text)
    const group = groups.get(key) ?? [];
    group.push(word); // 3. add the word to its group
    groups.set(key, group);
  }
  return [...groups.values()]; // 4. the groups are the map values; their order is not meaningful
}

const cases: string[] = [
  "eat tea tan ate nat bat",
  "",
  "a",
  "ab ba",
  "abc def",
  "listen silent enlist google gogole inlets banana",
  "eat eat tea",
  "z y x",
  "aa a aaa a",
  "cab abc bca xyz zyx yxz aab aba baa",
  "dormitory dirtyroom",
];

// The hash map has no useful order, so sort each group and then the groups to get one fixed output.
for (const text of cases) {
  const words = text.split(' ').filter(Boolean);
  const groups = groupAnagrams(words).map((group) => [...group].sort());
  groups.sort((x, y) => (x[0] < y[0] ? -1 : 1));
  console.log(groups.length ? groups.map((group) => group.join(' ')).join(' | ') : 'empty');
}
