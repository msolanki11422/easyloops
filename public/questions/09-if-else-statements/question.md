# If/Else Statements

## Problem Statement

Write a program that demonstrates conditional logic using if/else statements to determine if a number is positive, negative, or zero, and whether it's even or odd.

## Input Format

The input consists of 1 line:

```
Line 1: Integer number (e.g., -15)
```

## Test Cases

**Input (`input.txt`):**

```
-15
```

**Expected Output (`expected.txt`):**

```
Number: -15
Sign: negative
Parity: odd
Classification: negative odd number
```

## Learning Objectives

- Understand if/else conditional statements
- Practice nested conditional logic
- Learn to combine multiple conditions

## Implementation Guidelines

### Python Example Structure:

```python
def solve():
    num = int(input())
    print(f"Number: {num}")

    if num > 0:
        print("Sign: positive")
    elif num < 0:
        print("Sign: negative")
    else:
        print("Sign: zero")
    # ... continue
```
