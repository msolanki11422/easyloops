# While loops

## Problem Statement

Write a program that calculates the sum of all positive integers from 1 to N using a while loop. This problem demonstrates the fundamental concept of while loops: continuing execution while a condition remains true.

Given a positive integer N, your program should add all integers from 1 to N (inclusive) and output the total sum.

For example:
- If N = 5, calculate 1 + 2 + 3 + 4 + 5 = 15
- If N = 3, calculate 1 + 2 + 3 = 6
- If N = 1, the sum is just 1
- If N = 0, the sum is 0 (no positive integers to add)

## Input Format

The input consists of 1 line:
```
Line 1: Integer N (0 ≤ N ≤ 1,000,000)
```

## Test Cases
**Input (`input.txt`):**
```
5
```

**Expected Output (`expected.txt`):**
```
15
```

## How to Test Your Solution
1. Copy your template file: `cp templates/python_template.py solution.py`
2. Implement your solution in the `solve()` function
3. Test with: `cat input.txt | python solution.py > output.txt`
4. Compare: `diff output.txt expected.txt`
5. If `diff` shows nothing, your solution is correct! ✅

## Learning Objectives
- Understand while loop syntax and structure
- Practice loop condition evaluation and termination
- Learn the difference between while loops and for loops
- Implement iterative accumulation patterns
- Handle edge cases in loop-based algorithms

## Implementation Guidelines
### Python Example Structure:
```python
def solve():
    n = int(input())
    current = 1
    total_sum = 0
    
    while current <= n:
        total_sum += current
        current += 1
    
    print(total_sum)
```

### Go Example Structure:
```go
func solve() {
    var n int
    fmt.Scanf("%d", &n)
    
    current := 1
    totalSum := 0
    
    for current <= n {
        totalSum += current
        current++
    }
    
    fmt.Printf("%d\n", totalSum)
}
```

## Constraints
- 0 ≤ N ≤ 1,000,000
- Time complexity: O(n)
- Space complexity: O(1)
- Output must be a single integer on one line

## Hints
- Initialize a counter variable to 1 and a sum variable to 0
- Use a while loop that continues as long as the counter is less than or equal to N
- In each iteration, add the current counter value to the sum and increment the counter
- Remember to handle the edge case where N = 0
