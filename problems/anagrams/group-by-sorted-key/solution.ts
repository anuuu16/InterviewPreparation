// Anagrams, approach 3: group a list of words with a hash map. The key is the word's letters sorted:
// all anagrams share the same key. Assumes lowercase words.
function groupAnagrams(words: string[]): string[][] {
  const groups = new Map<string, string[]>(); // sorted letters -> the words that have those letters
  for (const word of words) {
    const key = [...word].sort().join(''); // 1. "eat", "tea" and "ate" all become "aet"
    const group = groups.get(key) ?? []; // 2. the first word with this key starts a group
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
