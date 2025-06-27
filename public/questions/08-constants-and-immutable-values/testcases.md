# Test Cases for Constants and Immutable Values

## Test Case Structure
This question uses a **1-line input format**.

### Input Format Pattern:
```
Line 1: integer
```

### Output Format Pattern:
```
Within limit
```
OR
```
Exceeds limit
```

## Test Case 1: Below Limit
**Input (`input.txt`):**
```
50
```
**Expected Output (`expected.txt`):**
```
Within limit
```

## Test Case 2: At Limit
**Input (`input2.txt`):**
```
100
```
**Expected Output (`expected2.txt`):**
```
Within limit
```

## Test Case 3: Above Limit
**Input (`input3.txt`):**
```
150
```
**Expected Output (`expected3.txt`):**
```
Exceeds limit
```

## Test Case Creation Rules
### Input Validation Rules:
1. Line must parse as integer

### Output Format Rules:
1. Exactly one line printed

## Language-Specific Considerations
### Python Considerations:
- Define `MAX` as a module-level constant

### Go Considerations:
- Use a `const` declaration

## Validation Checklist
- [ ] Input has exactly 1 line
- [ ] Output matches one of the allowed phrases

## Automated Test Case Generation
```python
def generate_test_case():
    import random
    n = random.randint(0, 200)
    input_content = f"{n}\n"
    expected_content = "Within limit\n" if n <= 100 else "Exceeds limit\n"
    return input_content, expected_content

def validate_test_case(input_content, expected_content):
    int(input_content.strip())
    assert expected_content in ("Within limit\n", "Exceeds limit\n")
```
