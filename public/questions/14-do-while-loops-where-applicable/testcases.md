# Test Cases for Do-while loops (where applicable)

## Test Case Structure
This question uses a multi-line input format where each line represents a menu choice.

### Input Format Pattern:
```
Line 1: Integer choice (1, 2, or 3)
Line 2: Integer choice (1, 2, or 3) [if applicable]
...
Line N: Integer choice (should be 3 to exit)
```

### Output Format Pattern:
```
=== MENU ===
1. Print message
2. Show count
3. Exit
Enter choice (1-3):
[Response based on choice]
[Repeat menu until choice 3]
Final count: X
```

## Test Case 1: Basic Menu Interaction
**Purpose**: Test normal flow with multiple menu interactions
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

## Test Case 2: Edge Case - Immediate Exit
**Purpose**: Test the "execute at least once" behavior when user immediately exits
**Input (`input2.txt`):**
```
3
```
**Expected Output (`expected2.txt`):**
```
=== MENU ===
1. Print message
2. Show count
3. Exit
Enter choice (1-3):
Goodbye!
Final count: 0
```

## Test Case 3: Performance Case - Many Operations
**Purpose**: Test performance with many menu selections (O(n) time complexity)
**Input (`input3.txt`):**
```
1
1
1
1
1
1
1
1
1
1
2
3
```
**Expected Output (`expected3.txt`):**
```
[Menu display and "Hello from option 1!" repeated 10 times]
[Menu display with "Option 1 selected 10 times"]
[Menu display with "Goodbye!" and "Final count: 10"]
```

## Test Case Creation Rules

### Input Validation Rules:
1. Each input line must contain a single integer (1, 2, or 3)
2. The sequence must end with 3 (exit choice)
3. Invalid choices could be tested but are not required for basic functionality
4. Input should not contain empty lines or non-numeric values for core test cases

### Output Format Rules:
1. Menu must be displayed exactly as specified with "=== MENU ===" borders
2. Each menu option must be numbered and match the exact text
3. "Enter choice (1-3):" prompt must appear after every menu
4. Option 1 responses: "Hello from option 1!"
5. Option 2 responses: "Option 1 selected X times" where X is the current count
6. Option 3 responses: "Goodbye!" followed by loop termination
7. Final output: "Final count: X" where X is total times option 1 was selected
8. No extra spaces or formatting deviations allowed

## Language-Specific Considerations

### Python Considerations:
- Python lacks native do-while loops, use `while True` with `break`
- Use `input().strip()` to read menu choices
- Use `int()` conversion for menu choice processing
- F-string formatting recommended for count display: `f"Option 1 selected {count} times"`

### Go Considerations:
- Go lacks native do-while loops, use infinite `for` loop with `break`
- Use `scanner.Scan()` and `scanner.Text()` for input reading
- Use `strconv.Atoi()` for string to integer conversion
- Use `fmt.Printf()` for formatted output: `fmt.Printf("Option 1 selected %d times\n", count)`

### JavaScript Considerations (if applicable):
- JavaScript has native do-while loops: `do { ... } while (condition)`
- This would be the ideal language to demonstrate actual do-while syntax
- Use `readline` or similar for input in Node.js environment

## Validation Checklist
- [ ] Menu displays at least once even with immediate exit (choice 3)
- [ ] Counter starts at 0 and increments only with option 1
- [ ] Option 2 displays current count correctly
- [ ] Program terminates only when option 3 is selected
- [ ] Final count matches number of times option 1 was selected
- [ ] Output format matches exactly (spacing, punctuation, line breaks)
- [ ] No infinite loops or crashes with valid input
- [ ] Time complexity is O(n) where n is number of menu interactions

## Automated Test Case Generation
```python
def generate_test_case(option1_count=2, include_option2=True):
    """
    Generate a test case with specified parameters.
    
    Args:
        option1_count: Number of times to select option 1
        include_option2: Whether to include option 2 before exit
    
    Returns:
        tuple: (input_lines, expected_output)
    """
    inputs = ["1"] * option1_count
    if include_option2:
        inputs.append("2")
    inputs.append("3")
    
    # Generate expected output would require simulating the menu...
    return inputs

def validate_test_case(input_content, expected_content):
    """
    Validate that a test case is properly formatted.
    
    Args:
        input_content: The input file content as string
        expected_content: The expected output file content as string
    
    Returns:
        bool: True if valid, False otherwise
    """
    lines = input_content.strip().split('\n')
    
    # Check all lines are valid choices
    for line in lines:
        if line.strip() not in ['1', '2', '3']:
            return False
    
    # Check ends with exit choice
    if lines[-1].strip() != '3':
        return False
    
    # Check expected output contains required elements
    required_elements = [
        "=== MENU ===",
        "Enter choice (1-3):",
        "Final count:",
        "Goodbye!"
    ]
    
    for element in required_elements:
        if element not in expected_content:
            return False
    
    return True
```

## Additional Test Scenarios (Optional)

### Invalid Input Handling:
While not required for the core test cases, a complete implementation might handle:
- Invalid choices (not 1, 2, or 3): Should display "Invalid choice, try again"
- Non-numeric input: Should handle gracefully
- Empty input: Should handle gracefully

### Extended Test Cases:
- Test with only option 2 selections before exit
- Test with mixed sequences of all three options
- Test with very large numbers of interactions (stress testing)

## Performance Notes
- The algorithm should be O(n) where n is the number of menu interactions
- Memory usage should be O(1) constant space (only need to track the counter)
- Poor implementations that are O(n²) or worse should timeout on large test cases
- The performance test case (input3.txt) with 12 interactions is designed to be manageable for good algorithms while potentially exposing inefficient approaches in larger scenarios
