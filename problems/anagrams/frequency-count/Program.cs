// Anagrams, approach 2: count the letters. Add one for each letter of a, subtract one for each letter of b.
// The words are anagrams exactly when every count ends at zero. Assumes lowercase letters a to z only.
static bool IsAnagram(string a, string b)
{
    if (a.Length != b.Length) return false; // 1. different lengths can never be anagrams
    var counts = new int[26]; // 2. one counter per letter: counts[0] is 'a'; ints start at zero
    for (int i = 0; i < a.Length; i++)
    {
        counts[a[i] - 'a']++; // 3. a letter of a adds one
        counts[b[i] - 'a']--; //    a letter of b takes one away
    }
    return counts.All(count => count == 0); // 4. all zero means the same letters
}

(string, string)[] cases =
{
    ("listen", "silent"),
    ("anagram", "nagaram"),
    ("rat", "car"),
    ("a", "a"),
    ("", ""),
    ("ab", "a"),
    ("aab", "abb"),
    ("abc", "cba"),
    ("aabbcc", "abcabc"),
    ("hello", "world"),
    ("a", "b"),
    ("night", "thing"),
    ("abcd", "abce"),
    ("conversation", "voicesranton"),
    ("dormitory", "dirtyroom"),
    ("schoolmaster", "theclassroom"),
    ("restful", "fluster"),
    ("abcdefghijklmnopqrstuvwxyz", "zyxwvutsrqponmlkjihgfedcba"),
    ("zz", "z"),
    ("zzzz", "zzzy"),
};

foreach (var (a, b) in cases) Console.WriteLine(IsAnagram(a, b) ? "true" : "false");
