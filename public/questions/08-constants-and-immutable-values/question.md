# Constants and Immutable Values

## Problem Statement

Define a constant named `MAX` with the value `100`. Read an integer from standard input and output `Within limit` if the number is less than or equal to `MAX`; otherwise output `Exceeds limit`.

## Input Format

The input consists of 1 line:
```
Line 1: integer value
```

## Test Cases
**Input (`input.txt`):**
```
50
```
**Expected Output (`expected.txt`):**
```
Within limit
```

## How to Test Your Solution
1. Copy your template file: `cp templates/python_template.py solution.py`
2. Implement your solution in the `solve()` function
3. Test with: `cat input.txt | python solution.py > output.txt`
4. Compare: `diff output.txt expected.txt`
5. If `diff` shows nothing, your solution is correct! ✅

## Learning Objectives
- Understand the use of constants
- Practice simple conditional output

## Implementation Guidelines
### Python Example Structure:
```python
MAX = 100

def solve():
    import sys
    n = int(sys.stdin.readline())
    if n <= MAX:
        print('Within limit')
    else:
        print('Exceeds limit')
```

### Go Example Structure:
```go
const MAX = 100

func solve() {
    scanner := bufio.NewScanner(os.Stdin)
    scanner.Scan()
    n, _ := strconv.Atoi(scanner.Text())
    if n <= MAX {
        fmt.Println("Within limit")
    } else {
        fmt.Println("Exceeds limit")
    }
}
```

## Constraints
- Input is an integer
- Output must match exactly

## Hints
- Define the constant outside of the `solve` function if your language supports it
