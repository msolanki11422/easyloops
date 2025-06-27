# Sum of Numbers with For Loops

## Problem Statement

Given a positive integer N, calculate the sum of all integers from 1 to N (inclusive) using a for loop.

For example:
- If N = 5, you should calculate 1 + 2 + 3 + 4 + 5 = 15
- If N = 3, you should calculate 1 + 2 + 3 = 6

This problem teaches you the fundamental concept of iteration using for loops and the accumulator pattern - a core programming technique where you build up a result by repeatedly adding to it.

## Input Format

The input consists of 1 line:
```
Line 1: A positive integer N (1 ≤ N ≤ 1,000,000)
```

## Output Format

Print a single integer: the sum of all numbers from 1 to N.

## Test Cases

**Basic Test Case (`input.txt`):**
```
5
```

**Expected Output (`expected.txt`):**
```
15
```

**Edge Case (`input2.txt`):**
```
1
```

**Expected Output (`expected2.txt`):**
```
1
```

**Performance Test Case (`input3.txt`):**
```
1000000
```

**Expected Output (`expected3.txt`):**
```
500000500000
```

## How to Test Your Solution
1. Copy your template file: `cp templates/python_template.py solution.py`
2. Implement your solution in the `solve()` function
3. Test with: `cat input.txt | python solution.py > output.txt`
4. Compare: `diff output.txt expected.txt`
5. If `diff` shows nothing, your solution is correct! ✅

## Learning Objectives
- Master the basic for loop syntax and structure
- Understand the accumulator pattern for building results iteratively
- Practice reading input and producing output in competitive programming format
- Learn to handle edge cases (N = 1)
- Understand the importance of efficient algorithms for large inputs

## Implementation Guidelines

### Python Example Structure:
```python
def solve():
    n = int(input().strip())
    
    # Initialize accumulator
    total = 0
    
    # Use for loop to iterate from 1 to n
    for i in range(1, n + 1):
        total += i
    
    print(total)
```

### Go Example Structure:
```go
func solve() {
    var n int
    fmt.Scanf("%d", &n)
    
    total := 0
    for i := 1; i <= n; i++ {
        total += i
    }
    
    fmt.Println(total)
}
```

## Constraints
- 1 ≤ N ≤ 1,000,000
- Time limit: 1 second
- Memory limit: 256 MB
- Your solution should use a for loop (not the mathematical formula N*(N+1)/2)

## Hints
- **Hint 1**: Start with a variable to store your running total (set it to 0)
- **Hint 2**: Use a for loop to go through numbers from 1 to N
- **Hint 3**: In each iteration, add the current number to your total
- **Hint 4**: Don't forget that `range(1, n+1)` in Python goes from 1 to N inclusive
- **Hint 5**: The performance test case has a large N - make sure your loop is efficient
