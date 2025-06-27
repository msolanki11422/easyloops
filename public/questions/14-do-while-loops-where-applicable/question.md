# Do-while loops (where applicable)

## Problem Statement

Create an interactive menu system that demonstrates the "execute at least once" pattern commonly implemented with do-while loops. Your program should display a menu and process user choices until the user decides to exit.

The menu should:

1. **Always display at least once** (even if user immediately chooses to exit)
2. **Show these options every time:**
   ```
   === MENU ===
   1. Print message
   2. Show count
   3. Exit
   Enter choice (1-3):
   ```

3. **Process choices as follows:**
   - **Choice 1**: Print "Hello from option 1!" and increment a counter
   - **Choice 2**: Print "Option 1 selected X times" (where X is current count)
   - **Choice 3**: Print "Goodbye!" and exit the program
   - **Invalid choice**: Print "Invalid choice, try again" and continue

4. **After exiting**: Print "Final count: X" (where X is how many times option 1 was selected)

This problem teaches the fundamental concept behind do-while loops: **execute the loop body at least once, then continue based on a condition**. While Python and Go don't have native do-while loops, you'll implement this pattern using their available loop constructs.

## Input Format

The input consists of multiple lines, each containing a single integer representing the user's menu choice:
```
Line 1: First choice (1, 2, or 3)
Line 2: Second choice (1, 2, or 3) [if applicable]
Line N: Final choice (should be 3 to exit)
```

## Test Cases

**Input (`input.txt`):**
```
1
1
2
3
```

**Expected Output (`expected.txt`):**
```
=== MENU ===
1. Print message
2. Show count
3. Exit
Enter choice (1-3):
Hello from option 1!
=== MENU ===
1. Print message
2. Show count
3. Exit
Enter choice (1-3):
Hello from option 1!
=== MENU ===
1. Print message
2. Show count
3. Exit
Enter choice (1-3):
Option 1 selected 2 times
=== MENU ===
1. Print message
2. Show count
3. Exit
Enter choice (1-3):
Goodbye!
Final count: 2
```

## How to Test Your Solution
1. Copy your template file: `cp templates/python_template.py solution.py`
2. Implement your solution in the `solve()` function
3. Test with: `cat input.txt | python solution.py > output.txt`
4. Compare: `diff output.txt expected.txt`
5. If `diff` shows nothing, your solution is correct! ✅

## Learning Objectives
- Understand the "execute at least once" pattern that do-while loops provide
- Learn how to simulate do-while behavior in languages without native support
- Practice loop control and conditional logic
- Understand when do-while patterns are preferable to regular while loops
- Implement interactive menu systems with proper input validation

## Implementation Guidelines

### Python Example Structure:
```python
def solve():
    count = 0
    
    # Python doesn't have do-while, simulate with while True + break
    while True:
        # Display menu (happens at least once)
        print("=== MENU ===")
        print("1. Print message")
        print("2. Show count")  
        print("3. Exit")
        print("Enter choice (1-3):")
        
        choice = int(input().strip())
        
        # Process choice and decide whether to continue
        if choice == 3:
            print("Goodbye!")
            break
        # ... handle other choices
    
    print(f"Final count: {count}")
```

### Go Example Structure:
```go
func solve() {
    count := 0
    
    // Go doesn't have do-while, simulate with for + break
    for {
        // Display menu (happens at least once)
        fmt.Println("=== MENU ===")
        fmt.Println("1. Print message")
        fmt.Println("2. Show count")
        fmt.Println("3. Exit")  
        fmt.Println("Enter choice (1-3):")
        
        scanner.Scan()
        choice, _ := strconv.Atoi(scanner.Text())
        
        // Process choice and decide whether to continue
        if choice == 3 {
            fmt.Println("Goodbye!")
            break
        }
        // ... handle other choices
    }
    
    fmt.Printf("Final count: %d\n", count)
}
```

## Constraints
- Menu must be displayed at least once, even if user immediately exits
- Counter starts at 0 and only increments when option 1 is selected
- Program terminates only when option 3 is selected
- Invalid choices should not terminate the program
- Output format must match exactly (including spacing and punctuation)
- Time complexity: O(n) where n is the number of menu interactions

## Hints
- The key insight is that the menu display happens BEFORE checking the exit condition
- Use `while True` with `break` in Python, or `for` with `break` in Go
- Keep track of the counter outside the loop
- Remember that do-while ensures "at least one execution" - your solution should too
- Pay attention to exact output formatting, including the menu separators
- Consider what happens when the user enters invalid input (it should not crash)
