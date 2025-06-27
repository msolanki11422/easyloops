# Arithmetic Operators

## Problem Statement

Write a program that reads two integers and performs basic arithmetic operations. The program should output the results of addition, subtraction, multiplication, integer division, and modulo in the specified format.

## Input Format

The input consists of 2 lines:
```
Line 1: First integer
Line 2: Second integer (non-zero)
```

## Test Cases
**Input (`input.txt`):**
```
7
3
```
**Expected Output (`expected.txt`):**
```
Sum: 10
Difference: 4
Product: 21
Quotient: 2
Remainder: 1
```

## How to Test Your Solution
1. Copy your template file: `cp templates/python_template.py solution.py`
2. Implement your solution in the `solve()` function
3. Test with: `cat input.txt | python solution.py > output.txt`
4. Compare: `diff output.txt expected.txt`
5. If `diff` shows nothing, your solution is correct! ✅

## Learning Objectives
- Practice arithmetic operators (+, -, *, /, %)
- Reinforce integer input and output
- Understand integer division behavior

## Implementation Guidelines
### Python Example Structure:
```python
def solve():
    a = int(input())
    b = int(input())
    print(f"Sum: {a + b}")
    print(f"Difference: {a - b}")
    print(f"Product: {a * b}")
    print(f"Quotient: {a // b}")
    print(f"Remainder: {a % b}")
```

### Go Example Structure:
```go
func solve() {
    scanner := bufio.NewScanner(os.Stdin)
    scanner.Scan()
    a, _ := strconv.Atoi(scanner.Text())
    scanner.Scan()
    b, _ := strconv.Atoi(scanner.Text())
    fmt.Println("Sum:", a+b)
    fmt.Println("Difference:", a-b)
    fmt.Println("Product:", a*b)
    fmt.Println("Quotient:", a/b)
    fmt.Println("Remainder:", a%b)
}
```

## Constraints
- Second integer must not be zero
- Output format must match exactly

## Hints
- Use integer division to compute the quotient
- `%` operator gives the remainder
