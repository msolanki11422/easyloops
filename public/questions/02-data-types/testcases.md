# Test Cases for Data Types and Type Conversion

## Test Case Structure
This question uses a **3-line input format** where each line contains a different type value.

### Input Format Pattern:
```
Line 1: Integer value
Line 2: Floating-point value
Line 3: String representing an integer
```

### Output Format Pattern:
```
Integer: <line1>
Integer to float: <float(line1)>
Float: <line2>
Float to integer: <int(line2)>
String: <line3>
String to integer: <int(line3)>
```

## Test Case 1: Standard Values
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

## Test Case 2: Zero and Negative Values
**Input (`input2.txt`):**
```
0
-2.7
0
```
**Expected Output (`expected2.txt`):**
```
Integer: 0
Integer to float: 0.0
Float: -2.7
Float to integer: -2
String: 0
String to integer: 0
```

## Test Case 3: Large Numbers
**Input (`input3.txt`):**
```
2147483647
12345.6789
-98765
```
**Expected Output (`expected3.txt`):**
```
Integer: 2147483647
Integer to float: 2147483647.0
Float: 12345.6789
Float to integer: 12345
String: -98765
String to integer: -98765
```

## Test Case Creation Rules
### Input Validation Rules:
1. Line 1 must parse as 32-bit integer
2. Line 2 must parse as float

### Output Format Rules:
1. Exactly six lines of output
2. Values must match the conversions precisely

## Language-Specific Considerations
### Python Considerations:
- Use `float()` and `int()` for conversions

### Go Considerations:
- Use `strconv.Atoi` and `strconv.ParseFloat`

## Validation Checklist
- [ ] Input has exactly 3 lines
- [ ] Output has exactly 6 lines
- [ ] Conversions use built-in functions
- [ ] No extra spaces or blank lines

## Automated Test Case Generation
```python
def generate_test_case():
    import random
    a = random.randint(-1000, 1000)
    b = round(random.uniform(-1000.0, 1000.0), 2)
    c = str(random.randint(-1000, 1000))
    input_content = f"{a}\n{b}\n{c}\n"
    expected_content = f"Integer: {a}\nInteger to float: {float(a)}\nFloat: {b}\nFloat to integer: {int(b)}\nString: {c}\nString to integer: {int(c)}\n"
    return input_content, expected_content

def validate_test_case(input_content, expected_content):
    lines = input_content.strip().split("\n")
    assert len(lines) == 3
    int(lines[0])
    float(lines[1])
    int(lines[2])
    assert expected_content.endswith("\n")
```
