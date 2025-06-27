# Test Cases for Basic Input/Output Operations

## Test Case Structure
This question uses a **1-line input format**.

### Input Format Pattern:
```
Line 1: any string
```

### Output Format Pattern:
```
You entered: <input string>
```

## Test Case 1: Simple Word
**Input (`input.txt`):**
```
Hello
```
**Expected Output (`expected.txt`):**
```
You entered: Hello
```

## Test Case 2: Empty String
**Input (`input2.txt`):**
```

```
**Expected Output (`expected2.txt`):**
```
You entered: 
```

## Test Case 3: Sentence with Punctuation
**Input (`input3.txt`):**
```
Hello, World!
```
**Expected Output (`expected3.txt`):**
```
You entered: Hello, World!
```

## Test Case Creation Rules
### Input Validation Rules:
1. Input is a single line of text

### Output Format Rules:
1. Output must begin with `You entered:` followed by a space
2. Text must match input exactly

## Language-Specific Considerations
### Python Considerations:
- Use `sys.stdin.readline()` to read the line

### Go Considerations:
- Use `bufio.Scanner` for reading input

## Validation Checklist
- [ ] Input has exactly 1 line
- [ ] Output matches the expected format precisely

## Automated Test Case Generation
```python
def generate_test_case():
    import random, string
    length = random.randint(0, 20)
    text = ''.join(random.choice(string.ascii_letters) for _ in range(length))
    input_content = text + "\n"
    expected_content = f"You entered: {text}\n"
    return input_content, expected_content

def validate_test_case(input_content, expected_content):
    assert expected_content == f"You entered: {input_content.rstrip()}\n"
```
