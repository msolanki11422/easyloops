# String Operations and Manipulation

## Problem Statement

Write a program that reads a single line of text and prints two lines:
1. `Length: <number>` — the number of characters in the string.
2. `Upper: <uppercase>` — the same string converted to uppercase.

## Input Format

The input consists of 1 line:
```
Line 1: any string
```

## Test Cases
**Input (`input.txt`):**
```
hello
```
**Expected Output (`expected.txt`):**
```
Length: 5
Upper: HELLO
```

## How to Test Your Solution
1. Copy your template file: `cp templates/python_template.py solution.py`
2. Implement your solution in the `solve()` function
3. Test with: `cat input.txt | python solution.py > output.txt`
4. Compare: `diff output.txt expected.txt`
5. If `diff` shows nothing, your solution is correct! ✅

## Learning Objectives
- Practice string length calculation
- Practice uppercasing strings

## Implementation Guidelines
### Python Example Structure:
```python
def solve():
    import sys
    s = sys.stdin.readline().rstrip('\n')
    print('Length:', len(s))
    print('Upper:', s.upper())
```

### Go Example Structure:
```go
func solve() {
    scanner := bufio.NewScanner(os.Stdin)
    scanner.Scan()
    s := scanner.Text()
    fmt.Printf("Length: %d\n", len(s))
    fmt.Println("Upper:", strings.ToUpper(s))
}
```

## Constraints
- String length up to 100 characters

## Hints
- Remember that newline characters should not be counted in the length
