# Test Cases for Nested Conditionals

## Test Case Structure
This question uses a **1-line input format**.

### Input Format Pattern:
```
Line 1: integer
```

### Output Format Pattern:
```
Positive even | Positive odd | Negative even | Negative odd | Zero
```

## Test Case 1: Positive Even
**Input (`input.txt`):**
```
6
```
**Expected Output (`expected.txt`):**
```
Positive even
```

## Test Case 2: Negative Odd
**Input (`input2.txt`):**
```
-3
```
**Expected Output (`expected2.txt`):**
```
Negative odd
```

## Test Case 3: Zero
**Input (`input3.txt`):**
```
0
```
**Expected Output (`expected3.txt`):**
```
Zero
```

## Test Case Creation Rules
### Input Validation Rules:
1. Input must be an integer

### Output Format Rules:
1. Output exactly matches one of the specified phrases

## Language-Specific Considerations
### Python Considerations:
- Use nested `if` statements

### Go Considerations:
- Pay attention to sign and parity separately

## Validation Checklist
- [ ] Input has exactly 1 line
- [ ] Output is one of the allowed phrases

## Automated Test Case Generation
```python
def generate_test_case():
    import random
    n = random.randint(-10, 10)
    input_content = f"{n}\n"
    if n == 0:
        expected = "Zero\n"
    else:
        prefix = "Positive" if n > 0 else "Negative"
        suffix = "even" if abs(n) % 2 == 0 else "odd"
        expected = f"{prefix} {suffix}\n"
    return input_content, expected

def validate_test_case(input_content, expected_content):
    int(input_content.strip())
    assert expected_content.endswith("\n")
```
