# Nested loops

## Problem Statement

Write a program that creates a right triangle pattern using stars (*). Given a positive integer n, your program should print n rows where the first row has 1 star, the second row has 2 stars, the third row has 3 stars, and so on, until the nth row has n stars.

This problem teaches the fundamental concept of nested loops:
- The outer loop controls the number of rows
- The inner loop controls the number of stars printed in each row

For example, if n = 4, the output should be:
```
*
**
***
****
```

## Input Format

The input consists of 1 line:
```
Line 1: n (a positive integer representing the number of rows)
```

## Test Cases
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

## How to Test Your Solution
1. Copy your template file: `cp templates/python_template.py solution.py`
2. Implement your solution in the `solve()` function
3. Test with: `cat input.txt | python solution.py > output.txt`
4. Compare: `diff output.txt expected.txt`
5. If `diff` shows nothing, your solution is correct! ✅

## Learning Objectives
- Understand nested loops structure and control flow
- Practice using outer loops to control iterations
- Practice using inner loops to control sub-iterations within each iteration
- Learn how loops can work together to create patterns
- Develop algorithmic thinking for pattern-based problems

## Implementation Guidelines
### Python Example Structure:
```python
def solve():
    n = int(input().strip())
    
    # Outer loop: iterates through rows (1 to n)
    for i in range(1, n + 1):
        # Inner loop: prints stars for current row
        for j in range(i):
            print("*", end="")
        print()  # Move to next line after each row
```

### Go Example Structure:
```go
func solve() {
    var n int
    fmt.Scan(&n)
    
    // Outer loop: iterates through rows (1 to n)
    for i := 1; i <= n; i++ {
        // Inner loop: prints stars for current row
        for j := 0; j < i; j++ {
            fmt.Print("*")
        }
        fmt.Println()  // Move to next line after each row
    }
}
```

## Constraints
- 1 ≤ n ≤ 1000
- Each row should end with a newline character
- No trailing spaces after the stars in each row
- Time complexity should be O(n²) which is optimal for this problem
- Space complexity should be O(1) (excluding output)

## Hints
- Think about the problem in two dimensions: rows and columns
- The outer loop should control which row you're currently printing
- The inner loop should control how many stars to print in the current row
- Notice the pattern: row i should have i stars (1-indexed)
- Remember to print a newline after each row to move to the next line
