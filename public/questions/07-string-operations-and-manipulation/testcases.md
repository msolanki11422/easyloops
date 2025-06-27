# Test Cases for String Operations and Manipulation

## Test Case Structure
This question uses a **1-line input format**.

### Input Format Pattern:
```
Line 1: any string
```

### Output Format Pattern:
```
Length: <len>
Upper: <uppercase string>
```

## Test Case 1: Lowercase Word
**Input (`input.txt`):**
```
hello
```
**Expected Output (`expected.txt`):**
```
Length: 5
Upper: HELLO
```

## Test Case 2: Empty String
**Input (`input2.txt`):**
```

```
**Expected Output (`expected2.txt`):**
```
Length: 0
Upper: 
```

## Test Case 3: Mixed Case
**Input (`input3.txt`):**
```
GoLang
```
**Expected Output (`expected3.txt`):**
```
Length: 6
Upper: GOLANG
```

## Test Case Creation Rules
### Input Validation Rules:
1. Input is a single line of text up to 100 characters

### Output Format Rules:
1. Two lines as shown above

## Language-Specific Considerations
### Python Considerations:
- Use `len()` and `str.upper()`

### Go Considerations:
- Use `len()` and `strings.ToUpper`

## Validation Checklist
- [ ] Input has exactly 1 line
- [ ] Output has exactly 2 lines in the correct format

## Automated Test Case Generation
```python
def generate_test_case():
    import random, string
    length = random.randint(0, 10)
    text = ''.join(random.choice(string.ascii_letters) for _ in range(length))
    input_content = text + '\n'
    expected_content = f"Length: {len(text)}\nUpper: {text.upper()}\n"
    return input_content, expected_content

def validate_test_case(input_content, expected_content):
    lines = input_content.split('\n')
    assert len(lines) >= 1
    assert expected_content.startswith(f"Length: {len(lines[0])}")
```
