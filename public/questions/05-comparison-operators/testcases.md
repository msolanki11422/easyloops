# Test Cases for Comparison Operators

## Test Case Structure
This question uses a **2-line input format**.

### Input Format Pattern:
```
Line 1: First integer
Line 2: Second integer
```

### Output Format Pattern:
```
<a> is greater than <b>
<a> is less than <b>
<a> is equal to <b>
```
(The program prints exactly one of the above lines.)

## Test Case 1: First Greater
**Input (`input.txt`):**
```
5
3
```
**Expected Output (`expected.txt`):**
```
5 is greater than 3
```

## Test Case 2: Numbers Equal
**Input (`input2.txt`):**
```
4
4
```
**Expected Output (`expected2.txt`):**
```
4 is equal to 4
```

## Test Case 3: Second Greater
**Input (`input3.txt`):**
```
-2
7
```
**Expected Output (`expected3.txt`):**
```
-2 is less than 7
```

## Test Case Creation Rules
### Input Validation Rules:
1. Both lines must parse as integers

### Output Format Rules:
1. Exactly one line printed
2. Line must match one of the patterns above

## Language-Specific Considerations
### Python Considerations:
- Use simple if/elif/else statements

### Go Considerations:
- Use `fmt.Printf` for formatted output

## Validation Checklist
- [ ] Input has exactly 2 lines
- [ ] Output is one line with correct comparison

## Automated Test Case Generation
```python
def generate_test_case():
    import random
    a = random.randint(-100, 100)
    b = random.randint(-100, 100)
    input_content = f"{a}\n{b}\n"
    if a > b:
        expected = f"{a} is greater than {b}\n"
    elif a < b:
        expected = f"{a} is less than {b}\n"
    else:
        expected = f"{a} is equal to {b}\n"
    return input_content, expected

def validate_test_case(input_content, expected_content):
    lines = input_content.strip().split("\n")
    assert len(lines) == 2
    int(lines[0]); int(lines[1])
    assert expected_content.endswith("\n")
```
