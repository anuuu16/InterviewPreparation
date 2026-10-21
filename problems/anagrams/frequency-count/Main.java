// Anagrams, approach 2: count the letters. Add one for each letter of a, subtract one for each letter of b.
// The words are anagrams exactly when every count ends at zero. Assumes lowercase letters a to z only.
import java.util.Arrays;

public class Main {
    static boolean isAnagram(String a, String b) {
        if (a.length() != b.length()) return false; // 1. different lengths can never be anagrams
        int[] counts = new int[26]; // 2. one counter per letter: counts[0] is 'a'; ints start at zero
        for (int i = 0; i < a.length(); i++) {
            counts[a.charAt(i) - 'a']++; // 3. a letter of a adds one
            counts[b.charAt(i) - 'a']--; //    a letter of b takes one away
        }
        return Arrays.stream(counts).allMatch(count -> count == 0); // 4. all zero means the same letters
    }

    public static void main(String[] args) {
        String[][] cases = {
            {"listen", "silent"},
            {"anagram", "nagaram"},
            {"rat", "car"},
            {"a", "a"},
            {"", ""},
            {"ab", "a"},
            {"aab", "abb"},
            {"abc", "cba"},
            {"aabbcc", "abcabc"},
            {"hello", "world"},
            {"a", "b"},
            {"night", "thing"},
            {"abcd", "abce"},
            {"conversation", "voicesranton"},
            {"dormitory", "dirtyroom"},
            {"schoolmaster", "theclassroom"},
            {"restful", "fluster"},
            {"abcdefghijklmnopqrstuvwxyz", "zyxwvutsrqponmlkjihgfedcba"},
            {"zz", "z"},
            {"zzzz", "zzzy"},
        };
        for (String[] c : cases) System.out.println(isAnagram(c[0], c[1]));
    }
}
