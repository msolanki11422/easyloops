# Test Cases for Nested loops

## Test Case Structure
This question uses a **1-line input format** with a single positive integer representing the number of rows for the star pattern.

### Input Format Pattern:
```
Line 1: n (positive integer, 1 ≤ n ≤ 1000)
```

### Output Format Pattern:
```
Row 1: * (1 star)
Row 2: ** (2 stars)
Row 3: *** (3 stars)
...
Row n: ****...* (n stars)
```

## Test Case 1: Basic (Standard Pattern)
**Input (`input.txt`):**
```
4
```
**Expected Output (`expected.txt`):**
```
*
**
***
****
```
**Purpose**: Tests the fundamental nested loop structure with a small, easy-to-verify pattern.

## Test Case 2: Edge (Minimum Input)
**Input (`input2.txt`):**
```
1
```
**Expected Output (`expected2.txt`):**
```
*
```
**Purpose**: Tests the edge case of the smallest possible input (n=1), ensuring the nested loop structure works correctly for minimal iterations.

## Test Case 3: Performance (Large Input)
**Input (`input3.txt`):**
```
100
```
**Expected Output (`expected3.txt`):**
```
*
**
***
****
*****
... (continues to 100 rows)
****************************************************************************************************
```
**Purpose**: Tests performance with a larger input. A naive O(n³) solution that prints stars one by one with string concatenation might be slower, while the optimal O(n²) solution should handle this efficiently.

## Test Case Creation Rules
### Input Validation Rules:
1. **Single integer input**: Input must be exactly one line containing a positive integer
2. **Range validation**: 1 ≤ n ≤ 1000 (reasonable range for pattern problems)
3. **No leading/trailing whitespace**: Input should be clean integer without extra spaces

### Output Format Rules:
1. **Star character only**: Use asterisk (*) character for the pattern
2. **No trailing spaces**: Each row should end immediately after the last star
3. **Newline after each row**: Each row must end with exactly one newline character
4. **Row count matches input**: Total number of rows must equal the input number n
5. **Stars per row**: Row i (1-indexed) must contain exactly i stars

## Language-Specific Considerations
### Python Considerations:
- Use `input().strip()` to read and clean the input
- Use `int()` to convert string input to integer
- Use `print("*", end="")` to print stars without newlines
- Use `print()` to move to the next line after each row
- Avoid string concatenation in loops for better performance

### Go Considerations:
- Use `fmt.Scan(&n)` to read the integer input
- Use `fmt.Print("*")` to print stars without newlines
- Use `fmt.Println()` to move to the next line after each row
- Consider using `strings.Repeat("*", i)` for more efficient implementation

## Validation Checklist
- [ ] Input has exactly 1 line containing a positive integer
- [ ] Output has exactly n rows (where n is the input number)
- [ ] Row i contains exactly i stars (1-indexed)
- [ ] No trailing spaces after stars in any row
- [ ] Each row ends with exactly one newline character
- [ ] Uses only asterisk (*) characters for the pattern
- [ ] Performance is acceptable for n=100 (should complete in under 1 second)

## Validation Checklist
- [x] Input has exactly 1 line containing a positive integer
- [x] Output has exactly n rows (where n is the input number)  
- [x] Row i contains exactly i stars (1-indexed)
- [x] No trailing spaces after stars in any row
- [x] Each row ends with exactly one newline character
- [x] Uses only asterisk (*) characters for the pattern
- [x] Performance is acceptable for n=100 (should complete in under 1 second)

## Automated Test Case Generation
```python
def generate_test_case():
    """
    Generate a random test case for the nested loops star pattern problem.
    Returns input_content and expected_content as strings.
    """
    import random
    
    # Generate random n between 1 and 20 for reasonable test cases
    n = random.randint(1, 20)
    
    # Create input content
    input_content = f"{n}\n"
    
    # Generate expected output
    expected_lines = []
    for i in range(1, n + 1):
        expected_lines.append("*" * i)
    expected_content = "\n".join(expected_lines) + "\n"
    
    return input_content, expected_content

def validate_test_case(input_content, expected_content):
    """
    Validate that a test case follows the correct format and rules.
    """
    # Parse input
    lines = input_content.strip().split('\n')
    assert len(lines) == 1, "Input must have exactly 1 line"
    
    n = int(lines[0])
    assert 1 <= n <= 1000, f"n must be between 1 and 1000, got {n}"
    
    # Parse expected output
    output_lines = expected_content.rstrip('\n').split('\n')
    assert len(output_lines) == n, f"Output must have exactly {n} rows, got {len(output_lines)}"
    
    # Validate each row
    for i, line in enumerate(output_lines, 1):
        expected_stars = "*" * i
        assert line == expected_stars, f"Row {i} should be '{expected_stars}', got '{line}'"
        assert not line.endswith(' '), f"Row {i} should not have trailing spaces"
    
    # Ensure proper newline ending
    assert expected_content.endswith('\n'), "Expected output must end with newline"
```
