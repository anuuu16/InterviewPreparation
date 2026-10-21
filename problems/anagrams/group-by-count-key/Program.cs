// Anagrams, approach 4: group a list of words with a hash map. The key is the word's letter counts, not its sorted letters.
// Counting is O(k) per word instead of O(k log k) for sorting. Assumes lowercase words.
static List<List<string>> GroupAnagrams(string[] words)
{
    var groups = new Dictionary<string, List<string>>(); // letter counts -> the words that have those counts
    foreach (string word in words)
    {
        var counts = new int[26]; // 1. count how many times each letter appears
        foreach (char ch in word) counts[ch - 'a']++;
        string key = string.Join(",", counts); // 2. an int[] uses reference equality, so turn the counts into text
        if (!groups.TryGetValue(key, out var group))
        {
            group = new List<string>();
            groups[key] = group;
        }
        group.Add(word); // 3. add the word to its group
    }
    return groups.Values.ToList(); // 4. the groups are the dictionary values; their order is not meaningful
}

string[] cases =
{
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
};

foreach (string text in cases)
{
    // The dictionary has no useful order, so sort each group and then the groups to get one fixed output.
    var groups = GroupAnagrams(text.Split(' ', StringSplitOptions.RemoveEmptyEntries));
    foreach (var group in groups) group.Sort(StringComparer.Ordinal);
    groups.Sort((x, y) => string.CompareOrdinal(x[0], y[0]));
    Console.WriteLine(groups.Count == 0 ? "empty" : string.Join(" | ", groups.Select(group => string.Join(" ", group))));
}
