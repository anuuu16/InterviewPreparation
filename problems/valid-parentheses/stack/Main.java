// Valid parentheses, approach 2: stack. Push every opener; each closer must match the opener on top.
import java.util.ArrayDeque;
import java.util.Deque;
import java.util.Map;

public class Main {
    static boolean isValid(String s) {
        Map<Character, Character> opener = Map.of(')', '(', ']', '[', '}', '{'); // closer -> the opener it needs
        Deque<Character> stack = new ArrayDeque<>(); // ArrayDeque is the modern stack; java.util.Stack is legacy
        for (char ch : s.toCharArray()) {
            if (opener.containsKey(ch)) {
                // 1. a closer: the most recent opener must be its partner
                if (stack.isEmpty() || stack.pop() != opener.get(ch)) return false;
            } else {
                stack.push(ch); // 2. an opener: wait for its partner
            }
        }
        return stack.isEmpty(); // 3. leftover openers were never closed
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
