# Test Cases for If/Else Statements

## Test Case Structure
This question uses a **1-line input format**.

### Input Format Pattern:
```
Line 1: integer
```

### Output Format Pattern:
```
Even
```
OR
```
Odd
```

## Test Case 1: Even Number
**Input (`input.txt`):**
```
4
```
**Expected Output (`expected.txt`):**
```
Even
```

## Test Case 2: Odd Number
**Input (`input2.txt`):**
```
7
```
**Expected Output (`expected2.txt`):**
```
Odd
```

## Test Case 3: Zero
**Input (`input3.txt`):**
```
0
```
**Expected Output (`expected3.txt`):**
```
Even
```

## Test Case Creation Rules
### Input Validation Rules:
1. Input must be an integer

### Output Format Rules:
1. Exactly one line, either `Even` or `Odd`

## Language-Specific Considerations
### Python Considerations:
- Use `% 2`

### Go Considerations:
- Use `n%2`

## Validation Checklist
- [ ] Input has exactly 1 line
- [ ] Output matches the expected pattern

## Automated Test Case Generation
```python
def generate_test_case():
    import random
    n = random.randint(-100, 100)
    input_content = f"{n}\n"
    expected_content = "Even\n" if n % 2 == 0 else "Odd\n"
    return input_content, expected_content

def validate_test_case(input_content, expected_content):
    int(input_content.strip())
    assert expected_content in ("Even\n", "Odd\n")
```
