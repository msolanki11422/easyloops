# String Operations and Manipulation

## Problem Statement

Write a program that demonstrates various string operations including concatenation, length calculation, case conversion, and substring operations.

## Input Format

The input consists of 3 lines:

```
Line 1: First string (e.g., "Hello")
Line 2: Second string (e.g., "World")
Line 3: Integer index for substring (e.g., 2)
```

## Test Cases

**Input (`input.txt`):**

```
Hello
World
2
```

**Expected Output (`expected.txt`):**

```
Concatenation: Hello + World = HelloWorld
Length of first string: 5
Length of second string: 5
Uppercase: HELLO
Lowercase: world
Substring from index 2: llo
```

## Learning Objectives

- Understand string concatenation and manipulation
- Learn string length calculation
- Practice case conversion operations
- Understand substring/slicing operations

## Implementation Guidelines

### Python Example Structure:

```python
def solve():
    str1 = input().strip()
    str2 = input().strip()
    index = int(input())

    print(f"Concatenation: {str1} + {str2} = {str1 + str2}")
    print(f"Length of first string: {len(str1)}")
    # ... continue
```
