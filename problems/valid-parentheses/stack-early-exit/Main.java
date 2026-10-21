// Valid parentheses, approach 3: stack with early exits. Same idea as approach 2, but give up as soon as success is impossible.
import java.util.ArrayDeque;
import java.util.Deque;
import java.util.Map;

public class Main {
    static boolean isValid(String s) {
        if (s.length() % 2 == 1) return false; // 1. brackets come in pairs, so an odd length can never be valid
        Map<Character, Character> closerFor = Map.of('(', ')', '[', ']', '{', '}'); // push the closer we expect
        Deque<Character> stack = new ArrayDeque<>();
        for (int i = 0; i < s.length(); i++) {
            char ch = s.charAt(i);
            if (closerFor.containsKey(ch)) {
                stack.push(closerFor.get(ch)); // 2. an opener: remember which closer must come
            } else if (stack.isEmpty() || stack.pop() != ch) {
                return false; // 3. a wrong closer, or a closer with nothing open
            }
            if (stack.size() > s.length() - i - 1) return false; // 4. more open brackets than characters left to close them
        }
        return stack.isEmpty();
    }

    public static void main(String[] args) {
        String[] cases = {
            "()",
            "()[]{}",
            "(]",
            "([)]",
            "{[]}",
            "",
            "(",
            ")",
            "((",
            "))",
            "(((())))",
            "{[()()]}",
            "([{}])",
            "(()",
            "())",
            "]",
            "()()()()",
            "{{{{}}}}[",
            "((((((((((",
            "[({})](",
            "{[}]",
        };
        for (String s : cases) System.out.println(isValid(s));
    }
}
