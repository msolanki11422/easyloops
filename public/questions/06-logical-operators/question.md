# Logical Operators

## Problem Statement

Write a program that demonstrates logical operators (AND, OR, NOT) by reading boolean values and performing logical operations.

## Input Format

The input consists of 2 lines:

```
Line 1: First boolean value ("true" or "false")
Line 2: Second boolean value ("true" or "false")
```

## Test Cases

**Input (`input.txt`):**

```
true
false
```

**Expected Output (`expected.txt`):**

```
A AND B: true and false = false
A OR B: true or false = true
NOT A: not true = false
NOT B: not false = true
```

## Learning Objectives

- Understand logical operators (AND, OR, NOT)
- Practice boolean logic operations
- Learn truth table concepts

## Implementation Guidelines

### Python Example Structure:

```python
def solve():
    a = input().strip() == "true"
    b = input().strip() == "true"

    print(f"A AND B: {str(a).lower()} and {str(b).lower()} = {str(a and b).lower()}")
    # ... continue
```
