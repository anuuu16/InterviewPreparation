// Anagrams, approach 1: sort the letters of both words and compare. Two words are anagrams exactly when their sorted letters match.
// Assumes lowercase letters a to z only.
import java.util.Arrays;

public class Main {
    static boolean isAnagram(String a, String b) {
        if (a.length() != b.length()) return false; // 1. different lengths can never be anagrams
        char[] first = a.toCharArray(); // 2. copy into arrays (strings are immutable), then sort the copies
        char[] second = b.toCharArray();
        Arrays.sort(first);
        Arrays.sort(second);
        return Arrays.equals(first, second); // 3. same letters means equal sorted arrays
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
