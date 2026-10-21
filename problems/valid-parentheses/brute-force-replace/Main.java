// Valid parentheses, approach 1: brute force. Delete matching pairs "()", "[]", "{}" until nothing changes.
// A string is valid exactly when this reduces it to the empty string.
public class Main {
    static boolean isValid(String s) {
        String previous;
        do {
            previous = s; // 1. remember the string before this round
            s = s.replace("()", "").replace("[]", "").replace("{}", ""); // 2. remove every adjacent pair
        } while (!s.equals(previous)); // 3. stop when a round removes nothing
        return s.isEmpty(); // 4. valid only if everything was removed
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
