# Arithmetic Operators

## Problem Statement

Write a program that demonstrates all basic arithmetic operations. Your program should read two numbers and perform various arithmetic calculations, displaying the results with proper formatting.

Your program should:

1. Read two numbers (integers or floats)
2. Perform and display the following operations:
   - Addition (+)
   - Subtraction (-)
   - Multiplication (\*)
   - Division (/)
   - Modulus (%) - for integers only
   - Exponentiation (\*\*)

## Input Format

The input consists of 2 lines:

```
Line 1: First number (e.g., 15)
Line 2: Second number (e.g., 4)
```

## Test Cases

**Input (`input.txt`):**

```
15
4
```

**Expected Output (`expected.txt`):**

```
Addition: 15 + 4 = 19
Subtraction: 15 - 4 = 11
Multiplication: 15 * 4 = 60
Division: 15 / 4 = 3.75
Modulus: 15 % 4 = 3
Exponentiation: 15 ** 4 = 50625
```

## How to Test Your Solution

1. Copy your template file: `cp templates/python_template.py solution.py`
2. Implement your solution in the `solve()` function
3. Test with: `cat input.txt | python solution.py > output.txt`
4. Compare: `diff output.txt expected.txt`
5. If `diff` shows nothing, your solution is correct! ✅

## Learning Objectives

- Understand all basic arithmetic operators
- Practice performing calculations with user input
- Learn about operator precedence and associativity
- Understand the difference between integer and floating-point arithmetic
- Practice formatting numerical output

## Implementation Guidelines

### Python Example Structure:

```python
def solve():
    a = int(input())
    b = int(input())

    print(f"Addition: {a} + {b} = {a + b}")
    print(f"Subtraction: {a} - {b} = {a - b}")
    # ... continue with other operations
```

### Go Example Structure:

```go
func solve() {
    scanner.Scan()
    a, _ := strconv.Atoi(scanner.Text())

    scanner.Scan()
    b, _ := strconv.Atoi(scanner.Text())

    fmt.Printf("Addition: %d + %d = %d\n", a, b, a+b)
    // ... continue with other operations
}
```

## Constraints

- Numbers will be positive integers between 1 and 1000
- Second number will never be zero (to avoid division by zero)
- Display division results as floating-point numbers
- Display other results as integers where appropriate

## Hints

- For division, ensure the result is displayed as a float
- Modulus operation only works with integers
- Exponentiation can result in large numbers
- Pay attention to the exact output format with spaces and symbols
