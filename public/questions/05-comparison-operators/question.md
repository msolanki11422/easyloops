# Comparison Operators

## Problem Statement

Write a program that demonstrates all comparison operators by comparing two numbers and displaying the results of each comparison.

## Input Format

The input consists of 2 lines:

```
Line 1: First number (e.g., 10)
Line 2: Second number (e.g., 5)
```

## Test Cases

**Input (`input.txt`):**

```
10
5
```

**Expected Output (`expected.txt`):**

```
10 == 5: false
10 != 5: true
10 < 5: false
10 <= 5: false
10 > 5: true
10 >= 5: true
```

## Learning Objectives

- Understand all comparison operators (==, !=, <, <=, >, >=)
- Practice boolean logic and output
- Learn how comparison results are displayed

## Implementation Guidelines

### Python Example Structure:

```python
def solve():
    a = int(input())
    b = int(input())

    print(f"{a} == {b}: {str(a == b).lower()}")
    print(f"{a} != {b}: {str(a != b).lower()}")
    # ... continue with other comparisons
```

## Constraints

- Numbers will be integers between -100 and 100
- Output boolean results as "true" or "false" (lowercase)
