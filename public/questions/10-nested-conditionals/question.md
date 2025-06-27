# Nested Conditionals

## Problem Statement

Write a program that uses nested if statements to determine letter grades based on numerical scores and categorize student performance levels.

## Input Format

The input consists of 1 line:

```
Line 1: Numerical score (0-100) (e.g., 87)
```

## Test Cases

**Input (`input.txt`):**

```
87
```

**Expected Output (`expected.txt`):**

```
Score: 87
Grade: B
Performance: Good
Status: Pass
```

## Learning Objectives

- Understand nested conditional statements
- Practice complex decision-making logic
- Learn to structure multiple condition checks

## Implementation Guidelines

### Python Example Structure:

```python
def solve():
    score = int(input())
    print(f"Score: {score}")

    if score >= 90:
        print("Grade: A")
        print("Performance: Excellent")
    elif score >= 80:
        print("Grade: B")
        print("Performance: Good")
    # ... continue with grade logic
```
