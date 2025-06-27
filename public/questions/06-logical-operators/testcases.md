# Test Cases for Logical Operators

## Test Case Structure
This question uses a **3-line input format** with boolean values.

### Input Format Pattern:
```
Line 1: true/false
Line 2: true/false
Line 3: true/false
```

### Output Format Pattern:
```
All true
```
OR
```
Not all true
```

## Test Case 1: All True
**Input (`input.txt`):**
```
true
true
true
```
**Expected Output (`expected.txt`):**
```
All true
```

## Test Case 2: One False
**Input (`input2.txt`):**
```
true
false
true
```
**Expected Output (`expected2.txt`):**
```
Not all true
```

## Test Case 3: All False
**Input (`input3.txt`):**
```
false
false
false
```
**Expected Output (`expected3.txt`):**
```
Not all true
```

## Test Case Creation Rules
### Input Validation Rules:
1. Each line must be `true` or `false` (case-insensitive)

### Output Format Rules:
1. Output is exactly one of the two phrases

## Language-Specific Considerations
### Python Considerations:
- Use `all()` on a list of booleans

### Go Considerations:
- Use `&&` to combine boolean values

## Validation Checklist
- [ ] Input has exactly 3 lines
- [ ] Output is either `All true` or `Not all true`

## Automated Test Case Generation
```python
def generate_test_case():
    import random
    choices = [True, False]
    vals = [random.choice(choices) for _ in range(3)]
    input_content = "\n".join('true' if v else 'false' for v in vals) + "\n"
    expected_content = "All true\n" if all(vals) else "Not all true\n"
    return input_content, expected_content

def validate_test_case(input_content, expected_content):
    lines = [line.lower() for line in input_content.strip().split('\n')]
    assert len(lines) == 3
    assert all(x in ('true', 'false') for x in lines)
    assert expected_content in ("All true\n", "Not all true\n")
```
