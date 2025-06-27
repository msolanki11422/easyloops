# Data Types and Type Conversion

## Problem Statement

Write a program that demonstrates data type conversion between different primitive types. Your program should read various input values and convert them between integer, float, string, and boolean types, then display the results.

Your program should:

1. Read input values of different types:

   - A string representation of an integer (line 1)
   - A string representation of a float (line 2)
   - A string representation of a boolean (line 3)
   - An integer that should be converted to other types (line 4)
   - A float that should be converted to other types (line 5)

2. Perform type conversions and display the results with proper formatting

3. Demonstrate explicit type casting and show the effects of conversion

## Input Format

The input consists of 5 lines:

```
Line 1: String representation of integer (e.g., "123")
Line 2: String representation of float (e.g., "45.67")
Line 3: String representation of boolean (e.g., "true" or "false")
Line 4: Integer value (e.g., 42)
Line 5: Float value (e.g., 3.14159)
```

## Test Cases

**Input (`input.txt`):**

```
123
45.67
true
42
3.14159
```

**Expected Output (`expected.txt`):**

```
String to int: 123
String to float: 45.67
String to bool: true
Int to string: 42
Int to float: 42.0
Int to bool: true
Float to string: 3.14159
Float to int: 3
Float to bool: true
```

## How to Test Your Solution

1. Copy your template file: `cp templates/python_template.py solution.py`
2. Implement your solution in the `solve()` function
3. Test with: `cat input.txt | python solution.py > output.txt`
4. Compare: `diff output.txt expected.txt`
5. If `diff` shows nothing, your solution is correct! ✅

## Learning Objectives

- Understand different primitive data types (int, float, string, boolean)
- Learn explicit type conversion techniques
- Practice string parsing and conversion
- Understand how different types are represented in memory
- Learn about type coercion and casting rules

## Implementation Guidelines

### Python Example Structure:

```python
def solve():
    # Read input values
    str_int = input().strip()
    str_float = input().strip()
    str_bool = input().strip()
    int_val = int(input())
    float_val = float(input())

    # Perform type conversions
    # String conversions
    print(f"String to int: {int(str_int)}")
    # ... continue with other conversions
```

### Go Example Structure:

```go
func solve() {
    // Read input values
    scanner.Scan()
    strInt := scanner.Text()

    scanner.Scan()
    strFloat := scanner.Text()

    // Perform type conversions
    intVal, _ := strconv.Atoi(strInt)
    fmt.Printf("String to int: %d\n", intVal)
    // ... continue with other conversions
}
```

## Constraints

- Input strings are guaranteed to be valid representations of their respective types
- Boolean strings will be exactly "true" or "false" (lowercase)
- Handle precision appropriately for floating-point conversions
- Output format must match exactly (including spacing and punctuation)

## Hints

- Use language-specific conversion functions (int(), float(), bool() in Python; strconv package in Go)
- Pay attention to how different languages handle boolean conversion from integers
- Be careful with floating-point precision when converting to integers (truncation vs rounding)
- Some languages may represent boolean values differently in output
