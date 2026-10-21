// Valid parentheses, approach 2: stack. Push every opener; each closer must match the opener on top.
static bool IsValid(string s)
{
    var opener = new Dictionary<char, char> { [')'] = '(', [']'] = '[', ['}'] = '{' }; // closer -> the opener it needs
    var stack = new Stack<char>();
    foreach (char ch in s)
    {
        if (opener.TryGetValue(ch, out char want))
        {
            // 1. a closer: the most recent opener must be its partner
            if (!stack.TryPop(out char top) || top != want) return false;
        }
        else
        {
            stack.Push(ch); // 2. an opener: wait for its partner
        }
    }
    return stack.Count == 0; // 3. leftover openers were never closed
}

string[] cases =
{
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

foreach (var s in cases) Console.WriteLine(IsValid(s) ? "true" : "false");
