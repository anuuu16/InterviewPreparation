// Anagrams, approach 4: group a list of words with a hash map. The key is the word's letter counts, not its sorted letters.
// Counting is O(k) per word instead of O(k log k) for sorting. Assumes lowercase words.
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

public class Main {
    static List<List<String>> groupAnagrams(String[] words) {
        Map<String, List<String>> groups = new HashMap<>(); // letter counts -> the words that have those counts
        for (String word : words) {
            int[] counts = new int[26]; // 1. count how many times each letter appears
            for (char ch : word.toCharArray()) counts[ch - 'a']++;
            String key = Arrays.toString(counts); // 2. an int[] uses identity equality, so turn the counts into text
            groups.computeIfAbsent(key, k -> new ArrayList<>()).add(word); // 3. add the word to its group
        }
        return new ArrayList<>(groups.values()); // 4. the groups are the map values; their order is not meaningful
    }

    public static void main(String[] args) {
        String[] cases = {
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
        for (String text : cases) {
            String[] words = text.isEmpty() ? new String[0] : text.split(" ");
            // The hash map has no useful order, so sort each group and then the groups to get one fixed output.
            List<List<String>> groups = groupAnagrams(words);
            for (List<String> group : groups) Collections.sort(group);
            groups.sort(Comparator.comparing(group -> group.get(0)));
            System.out.println(groups.isEmpty() ? "empty" : groups.stream().map(group -> String.join(" ", group)).collect(Collectors.joining(" | ")));
        }
    }
}
