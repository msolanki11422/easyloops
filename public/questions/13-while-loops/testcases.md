# Test Cases for While loops

## Test Case Structure
This question uses a 1-line input format containing a non-negative integer N.

### Input Format Pattern:
```
Line 1: Integer N (0 ≤ N ≤ 1,000,000)
```

### Output Format Pattern:
```
Single integer representing the sum of integers from 1 to N
```

## Test Case 1: Basic
**Input (`input.txt`):**
```
5
```
**Expected Output (`expected.txt`):**
```
15
```
**Description:** Standard case demonstrating basic while loop functionality. Sum = 1+2+3+4+5 = 15.

## Test Case 2: Edge
**Input (`input2.txt`):**
```
0
```
**Expected Output (`expected2.txt`):**
```
0
```
**Description:** Edge case where N=0. No positive integers to sum, result should be 0.

## Test Case 3: Performance
**Input (`input3.txt`):**
```
100000
```
**Expected Output (`expected3.txt`):**
```
5000050000
```
**Description:** Large input to test algorithm efficiency. Should complete in reasonable time with O(n) solution. Uses formula verification: N*(N+1)/2 = 100000*100001/2 = 5000050000.

## Test Case Creation Rules
### Input Validation Rules:
1. Input must be a single non-negative integer
2. Integer must be in range [0, 1,000,000]
3. No leading/trailing whitespace except single newline
4. No additional characters or multiple numbers

### Output Format Rules:
1. Output must be a single integer
2. No leading zeros (except for result 0)
3. Single newline at end of output
4. No additional formatting or text

## Language-Specific Considerations
### Python Considerations:
- Use `int(input().strip())` to read the integer
- Handle large numbers naturally (Python has arbitrary precision integers)
- Use `print(result)` for output

### Go Considerations:
- Use `fmt.Scanf("%d", &n)` to read the integer  
- Be aware of integer overflow for large N (use int64 if needed)
- Use `fmt.Printf("%d\n", result)` for output

### JavaScript Considerations:
- Use `parseInt(require('fs').readFileSync(0, 'utf8').trim())` for input
- Handle large numbers with caution (consider BigInt for very large results)
- Use `console.log(result)` for output

## Validation Checklist
- [ ] Input has exactly 1 line with single integer
- [ ] Integer is non-negative and within bounds
- [ ] Output is mathematically correct sum
- [ ] Algorithm uses while loop (not for loop or formula)
- [ ] Handles edge cases (N=0, N=1) correctly
- [ ] Performance test completes in reasonable time

## Automated Test Case Generation
```python
def generate_test_case(n_value):
    """Generate a test case for sum from 1 to n_value"""
    input_content = str(n_value)
    expected_sum = n_value * (n_value + 1) // 2
    expected_content = str(expected_sum)
    return input_content, expected_content

def validate_test_case(input_content, expected_content):
    """Validate that test case is correctly formatted"""
    try:
        # Check input format
        lines = input_content.strip().split('\n')
        if len(lines) != 1:
            return False, "Input must have exactly 1 line"
        
        n = int(lines[0])
        if n < 0 or n > 1000000:
            return False, "N must be in range [0, 1000000]"
        
        # Check expected output format
        expected_lines = expected_content.strip().split('\n')
        if len(expected_lines) != 1:
            return False, "Expected output must have exactly 1 line"
        
        expected_sum = int(expected_lines[0])
        calculated_sum = n * (n + 1) // 2
        
        if expected_sum != calculated_sum:
            return False, f"Expected sum {expected_sum} doesn't match calculated {calculated_sum}"
        
        return True, "Test case is valid"
    
    except ValueError as e:
        return False, f"Invalid number format: {e}"
    except Exception as e:
        return False, f"Validation error: {e}"
```
