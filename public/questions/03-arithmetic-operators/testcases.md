# Test Cases for Arithmetic Operators

## Test Case Structure
This question uses a **2-line input format**.

### Input Format Pattern:
```
Line 1: First integer
Line 2: Second integer (non-zero)
```

### Output Format Pattern:
```
Sum: <a+b>
Difference: <a-b>
Product: <a*b>
Quotient: <a//b>
Remainder: <a%b>
```

## Test Case 1: Standard Values
**Input (`input.txt`):**
```
7
3
```
**Expected Output (`expected.txt`):**
```
Sum: 10
Difference: 4
Product: 21
Quotient: 2
Remainder: 1
```

## Test Case 2: First Number Zero
**Input (`input2.txt`):**
```
0
5
```
**Expected Output (`expected2.txt`):**
```
Sum: 5
Difference: -5
Product: 0
Quotient: 0
Remainder: 0
```

## Test Case 3: Large Numbers
**Input (`input3.txt`):**
```
123456
789
```
**Expected Output (`expected3.txt`):**
```
Sum: 124245
Difference: 122667
Product: 97406784
Quotient: 156
Remainder: 372
```

## Test Case Creation Rules
### Input Validation Rules:
1. Second integer must not be zero
2. Values should fit within 32-bit signed integer range

### Output Format Rules:
1. Exactly five lines
2. Each line uses the labels shown above

## Language-Specific Considerations
### Python Considerations:
- Use `//` for integer division

### Go Considerations:
- Division of integers automatically truncates toward zero

## Validation Checklist
- [ ] Input has exactly 2 lines
- [ ] Output has exactly 5 lines
- [ ] Second integer is not zero

## Automated Test Case Generation
```python
def generate_test_case():
    import random
    b = random.randint(1, 100)
    a = random.randint(-100, 100)
    input_content = f"{a}\n{b}\n"
    expected_content = (
        f"Sum: {a+b}\n"
        f"Difference: {a-b}\n"
        f"Product: {a*b}\n"
        f"Quotient: {a//b}\n"
        f"Remainder: {a%b}\n"
    )
    return input_content, expected_content

def validate_test_case(input_content, expected_content):
    lines = input_content.strip().split("\n")
    assert len(lines) == 2
    a = int(lines[0])
    b = int(lines[1])
    assert b != 0
    assert expected_content.endswith("\n")
```
