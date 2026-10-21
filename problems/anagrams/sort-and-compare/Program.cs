// Anagrams, approach 1: sort the letters of both words and compare. Two words are anagrams exactly when their sorted letters match.
// Assumes lowercase letters a to z only.
static string SortLetters(string word)
{
    char[] letters = word.ToCharArray(); // 2. copy into an array (strings are immutable), then sort the copy
    Array.Sort(letters);
    return new string(letters);
}

static bool IsAnagram(string a, string b)
{
    if (a.Length != b.Length) return false; // 1. different lengths can never be anagrams
    return SortLetters(a) == SortLetters(b); // 3. same letters means the same sorted string
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
