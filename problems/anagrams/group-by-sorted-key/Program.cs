// Anagrams, approach 3: group a list of words with a hash map. The key is the word's letters sorted:
// all anagrams share the same key. Assumes lowercase words.
static List<List<string>> GroupAnagrams(string[] words)
{
    var groups = new Dictionary<string, List<string>>(); // sorted letters -> the words that have those letters
    foreach (string word in words)
    {
        char[] letters = word.ToCharArray();
        Array.Sort(letters);
        string key = new string(letters); // 1. "eat", "tea" and "ate" all become "aet"
        if (!groups.TryGetValue(key, out var group)) // 2. the first word with this key starts a group
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
