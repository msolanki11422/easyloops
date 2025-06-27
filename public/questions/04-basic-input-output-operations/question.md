# Basic Input/Output Operations

## Problem Statement

Write a program that reads a single line from **stdin** and prints the exact same line back to **stdout** prefixed by `You entered: `.

## Input Format

The input consists of 1 line:
```
Line 1: a string to echo
```

## Test Cases
**Input (`input.txt`):**
```
Hello
```
**Expected Output (`expected.txt`):**
```
You entered: Hello
```

## How to Test Your Solution
1. Copy your template file: `cp templates/python_template.py solution.py`
2. Implement your solution in the `solve()` function
3. Test with: `cat input.txt | python solution.py > output.txt`
4. Compare: `diff output.txt expected.txt`
5. If `diff` shows nothing, your solution is correct! ✅

## Learning Objectives
- Practice reading from standard input
- Practice printing to standard output
- Understand how basic I/O works in the chosen language

## Implementation Guidelines
### Python Example Structure:
```python
def solve():
    import sys
    line = sys.stdin.readline().rstrip('\n')
    print(f"You entered: {line}")
```

### Go Example Structure:
```go
func solve() {
    scanner := bufio.NewScanner(os.Stdin)
    scanner.Scan()
    line := scanner.Text()
    fmt.Println("You entered:", line)
}
```

## Constraints
- Input line may contain spaces and punctuation
- Output format must match exactly

## Hints
- Remember to remove the trailing newline when reading input
