# Switch/Case Statements

## Problem Statement

Write a program that demonstrates switch/case logic (or equivalent if/elif chains) to perform basic calculator operations based on user input.

## Input Format

The input consists of 3 lines:

```
Line 1: First number (e.g., 10)
Line 2: Operator (+, -, *, /) (e.g., "+")
Line 3: Second number (e.g., 5)
```

## Test Cases

**Input (`input.txt`):**

```
10
+
5
```

**Expected Output (`expected.txt`):**

```
First number: 10
Operator: +
Second number: 5
Result: 10 + 5 = 15
```

## Learning Objectives

- Understand switch/case logic concepts
- Practice multiple condition handling
- Learn calculator-style operation selection
- Understand operator-based decision making

## Implementation Guidelines

### Python Example Structure:

```python
def solve():
    num1 = int(input())
    operator = input().strip()
    num2 = int(input())

    print(f"First number: {num1}")
    print(f"Operator: {operator}")
    print(f"Second number: {num2}")

    if operator == "+":
        result = num1 + num2
        print(f"Result: {num1} + {num2} = {result}")
    # ... continue with other operators
```
