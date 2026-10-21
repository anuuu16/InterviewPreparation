// Valid parentheses, approach 3: stack with early exits. Same idea as approach 2, but give up as soon as success is impossible.
static bool IsValid(string s)
{
    if (s.Length % 2 == 1) return false; // 1. brackets come in pairs, so an odd length can never be valid
    var closerFor = new Dictionary<char, char> { ['('] = ')', ['['] = ']', ['{'] = '}' }; // push the closer we expect
    var stack = new Stack<char>();
    for (int i = 0; i < s.Length; i++)
    {
        char ch = s[i];
        if (closerFor.TryGetValue(ch, out char closer))
            stack.Push(closer); // 2. an opener: remember which closer must come
        else if (!stack.TryPop(out char top) || top != ch)
            return false; // 3. a wrong closer, or a closer with nothing open
        if (stack.Count > s.Length - i - 1) return false; // 4. more open brackets than characters left to close them
    }
    return stack.Count == 0;
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
