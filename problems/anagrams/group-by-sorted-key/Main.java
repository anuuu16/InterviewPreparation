// Anagrams, approach 3: group a list of words with a hash map. The key is the word's letters sorted:
// all anagrams share the same key. Assumes lowercase words.
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
        Map<String, List<String>> groups = new HashMap<>(); // sorted letters -> the words that have those letters
        for (String word : words) {
            char[] letters = word.toCharArray();
            Arrays.sort(letters);
            String key = new String(letters); // 1. "eat", "tea" and "ate" all become "aet"
            groups.computeIfAbsent(key, k -> new ArrayList<>()).add(word); // 2. start a group if needed, 3. add the word
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
