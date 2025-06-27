# Data Types and Type Conversion

## Problem Statement

Write a program that reads an integer, a floating-point number, and a string representing an integer. Demonstrate basic type conversion by printing each value in its original form and after converting it to another type.

## Input Format

The input consists of 3 lines:
```
Line 1: Integer value
Line 2: Floating-point value
Line 3: String representing an integer
```

## Test Cases
**Input (`input.txt`):**
```
42
3.14
100
```
**Expected Output (`expected.txt`):**
```
Integer: 42
Integer to float: 42.0
Float: 3.14
Float to integer: 3
String: 100
String to integer: 100
```

## How to Test Your Solution
1. Copy your template file: `cp templates/python_template.py solution.py`
2. Implement your solution in the `solve()` function
3. Test with: `cat input.txt | python solution.py > output.txt`
4. Compare: `diff output.txt expected.txt`
5. If `diff` shows nothing, your solution is correct! ✅

## Learning Objectives
- Understand basic data types (int, float, string)
- Practice converting between types
- Reinforce reading input from stdin

## Implementation Guidelines
### Python Example Structure:
```python
def solve():
    a = int(input())
    b = float(input())
    c = input().strip()
    print(f"Integer: {a}")
    print(f"Integer to float: {float(a)}")
    print(f"Float: {b}")
    print(f"Float to integer: {int(b)}")
    print(f"String: {c}")
    print(f"String to integer: {int(c)}")
```

### Go Example Structure:
```go
func solve() {
    scanner := bufio.NewScanner(os.Stdin)
    scanner.Scan()
    a, _ := strconv.Atoi(scanner.Text())
    scanner.Scan()
    b, _ := strconv.ParseFloat(scanner.Text(), 64)
    scanner.Scan()
    c := scanner.Text()
    fmt.Println("Integer:", a)
    fmt.Println("Integer to float:", float64(a))
    fmt.Println("Float:", b)
    fmt.Println("Float to integer:", int(b))
    fmt.Println("String:", c)
    n, _ := strconv.Atoi(c)
    fmt.Println("String to integer:", n)
}
```

## Constraints
- Input values are within normal 32-bit integer and float ranges
- Output format must match exactly

## Hints
- Use built-in type conversion functions
- Trim whitespace from the string before conversion
