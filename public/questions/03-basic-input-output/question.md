# Basic Input/Output Operations

## Problem Statement

Write a program that demonstrates various input/output operations and formatting techniques. Your program should read different types of input, process them, and display them using different formatting styles.

Your program should:

1. Read and display user information:

   - Full name (line 1)
   - Age (line 2)
   - Height in meters (line 3)
   - Favorite programming language (line 4)

2. Format and display the information in different ways:

   - Display the name in uppercase
   - Calculate and display birth year (current year - age)
   - Display height in both meters and centimeters
   - Create a formatted profile summary

3. Demonstrate different output formatting techniques

## Input Format

The input consists of 4 lines:

```
Line 1: Full name (e.g., "John Doe")
Line 2: Age in years (e.g., 25)
Line 3: Height in meters (e.g., 1.75)
Line 4: Favorite programming language (e.g., "Python")
```

## Test Cases

**Input (`input.txt`):**

```
John Doe
25
1.75
Python
```

**Expected Output (`expected.txt`):**

```
Name (uppercase): JOHN DOE
Age: 25 years
Birth Year: 1999
Height: 1.75m (175.0cm)
Favorite Language: Python
Profile: John Doe, 25 years old, 1.75m tall, loves Python
```

## How to Test Your Solution

1. Copy your template file: `cp templates/python_template.py solution.py`
2. Implement your solution in the `solve()` function
3. Test with: `cat input.txt | python solution.py > output.txt`
4. Compare: `diff output.txt expected.txt`
5. If `diff` shows nothing, your solution is correct! ✅

## Learning Objectives

- Practice reading different types of input from stdin
- Learn basic string formatting and manipulation
- Understand different output formatting techniques
- Practice basic arithmetic operations with user input
- Learn to combine multiple pieces of information into formatted output

## Implementation Guidelines

### Python Example Structure:

```python
def solve():
    # Read input values
    name = input().strip()
    age = int(input())
    height = float(input())
    language = input().strip()

    # Process and format output
    print(f"Name (uppercase): {name.upper()}")
    print(f"Age: {age} years")
    # ... continue with other formatting
```

### Go Example Structure:

```go
func solve() {
    // Read input values
    scanner.Scan()
    name := scanner.Text()

    scanner.Scan()
    age, _ := strconv.Atoi(scanner.Text())

    // Process and format output
    fmt.Printf("Name (uppercase): %s\n", strings.ToUpper(name))
    // ... continue with other formatting
}
```

## Constraints

- Name will not contain leading/trailing whitespace that affects formatting
- Age will be a positive integer between 1 and 120
- Height will be a positive float between 0.5 and 3.0 meters
- Programming language name will be a valid string
- Use 2024 as the current year for birth year calculation

## Hints

- Use string methods for case conversion (upper(), strings.ToUpper())
- For height conversion: centimeters = meters \* 100
- Birth year = current year (2024) - age
- Pay attention to decimal formatting for height display
- Combine multiple variables in the profile summary line
