# Test Cases for Variable Declaration and Initialization

## Test Case Structure

This question uses a **7-line input format** where each line represents a different value that will be used to demonstrate variable declaration and initialization concepts.

### Input Format Pattern:

```
Line 1: Integer value
Line 2: String value
Line 3: Boolean value (must be "true" or "false")
Line 4: Floating-point number
Line 5: Single character
Line 6: New integer value (for reassignment demonstration)
Line 7: String value (for late initialization demonstration)
```

### Output Format Pattern:

```
Integer variable: <value from line 1>
String variable: <value from line 2>
Boolean variable: <value from line 3>
Float variable: <value from line 4>
Character variable: <value from line 5>
Updated integer variable: <value from line 6>
Late-initialized variable: <value from line 7>
```

## Test Case 1: Standard Values

**Input (`input.txt`):**

```
42
Hello, World!
true
3.14159
A
100
Programming
```

**Expected Output (`expected.txt`):**

```
Integer variable: 42
String variable: Hello, World!
Boolean variable: true
Float variable: 3.14159
Character variable: A
Updated integer variable: 100
Late-initialized variable: Programming
```

**Description:** Tests basic variable declaration with commonly used values across different data types.

## Guidelines for Creating Additional Test Cases

### Test Case Categories to Cover:

1. **Edge Values Test Case:**

   - Maximum/minimum integer values
   - Empty or single-character strings
   - Both true and false boolean values
   - Very small and very large floating-point numbers
   - Special characters

2. **Boundary Conditions Test Case:**

   - Zero values
   - Negative numbers
   - Long strings
   - Special floating-point values (like 0.0, -0.0)
   - Unicode characters (where supported)

3. **Type Conversion Test Case:**
   - Test how languages handle type conversion
   - Different number formats
   - String representations of numbers
   - Various boolean representations

### Example Additional Test Cases:

#### Test Case 2: Edge Values

**Input:**

```
-2147483648
A
false
0.0
Z
2147483647
DataStructures
```

**Expected Output:**

```
Integer variable: -2147483648
String variable: A
Boolean variable: false
Float variable: 0.0
Character variable: Z
Updated integer variable: 2147483647
Late-initialized variable: DataStructures
```

#### Test Case 3: Special Characters and Values

**Input:**

```
0
Special chars: @#$%
true
-123.456
!
42
Algorithms_and_Data_Structures
```

**Expected Output:**

```
Integer variable: 0
String variable: Special chars: @#$%
Boolean variable: true
Float variable: -123.456
Character variable: !
Updated integer variable: 42
Late-initialized variable: Algorithms_and_Data_Structures
```

## Test Case Creation Rules

### Input Validation Rules:

1. **Integer values (lines 1, 6):** Must be valid integers within language limits
2. **String values (lines 2, 7):** Any string, but avoid newlines within the string
3. **Boolean values (line 3):** Must be exactly "true" or "false" (lowercase)
4. **Float values (line 4):** Must be valid floating-point numbers
5. **Character values (line 5):** Single character (some languages treat as string)

### Output Format Rules:

1. **Exact format matching:** Output must match the expected format exactly
2. **Spacing consistency:** Use exactly one space after the colon
3. **Line endings:** Each output line should end with a newline
4. **Boolean representation:** Should output "true" or "false" (lowercase)
5. **Number formatting:** Integers as integers, floats as given (no unnecessary decimals)

## Language-Specific Considerations

### Python Considerations:

- Boolean parsing: `input().strip() == "true"`
- Character handling: Python treats characters as single-character strings
- Float formatting: Use direct printing, avoid scientific notation for normal ranges

### Go Considerations:

- Boolean parsing: `scanner.Text() == "true"`
- Character handling: Go uses rune type, but display as character
- Float formatting: Use `%g` format specifier to avoid unnecessary decimals

## Validation Checklist

When creating new test cases, ensure:

- [ ] Input has exactly 7 lines
- [ ] Boolean value is "true" or "false"
- [ ] Integer values are within language limits
- [ ] Float values are properly formatted
- [ ] Character value is a single character
- [ ] Expected output follows the exact format
- [ ] Output has exactly 7 lines
- [ ] No trailing whitespace in output lines
- [ ] Each line ends with a single newline

## Automated Test Case Generation

To generate additional test cases programmatically:

```python
import random
import string

def generate_test_case():
    integer_val = random.randint(-1000, 1000)
    string_val = ''.join(random.choices(string.ascii_letters + string.digits, k=10))
    boolean_val = random.choice(["true", "false"])
    float_val = round(random.uniform(-100.0, 100.0), 5)
    char_val = random.choice(string.ascii_letters + string.digits)
    new_integer_val = random.randint(-1000, 1000)
    late_init_val = ''.join(random.choices(string.ascii_letters, k=8))

    # Generate input file
    input_content = f"{integer_val}\n{string_val}\n{boolean_val}\n{float_val}\n{char_val}\n{new_integer_val}\n{late_init_val}\n"

    # Generate expected output
    expected_content = f"""Integer variable: {integer_val}
String variable: {string_val}
Boolean variable: {boolean_val}
Float variable: {float_val}
Character variable: {char_val}
Updated integer variable: {new_integer_val}
Late-initialized variable: {late_init_val}
"""

    return input_content, expected_content
```

This structure ensures consistency across all test cases and makes it easy for agents to understand the pattern and create additional test cases following the same format.

## Test Case 2: Verification Checklist

The solution should demonstrate:

- ✅ Integer variable declared and initialized with value 42
- ✅ String variable declared and initialized with "Hello, World!"
- ✅ Boolean variable declared and initialized with true
- ✅ Float variable declared and initialized with 3.14159
- ✅ Character variable declared and initialized with 'A'
- ✅ All variables printed with descriptive labels
- ✅ Integer variable reassigned to 100 and printed again
- ✅ At least one variable showing late initialization
- ✅ Proper commenting explaining each step
- ✅ Following language-specific naming conventions

## Test Case 3: Code Quality Verification

**Check for:**

- Meaningful variable names (not just `a`, `b`, `c`)
- Consistent formatting and indentation
- Appropriate comments explaining the code
- Language-specific best practices
- Proper handling of data types supported by the language

## Test Case 4: Language-Specific Adaptations

**Different languages may show variations in:**

- Type declaration syntax (explicit vs. implicit)
- Boolean representation (true/false vs. True/False vs. 1/0)
- Character support (some languages don't have dedicated char type)
- Uninitialized variable handling (some languages don't allow this)
- String representation (quotes vs. no quotes in output)

## Evaluation Criteria

1. **Correctness (40%)**: Program runs without errors and produces expected output
2. **Completeness (30%)**: All required variable types and operations are demonstrated
3. **Code Quality (20%)**: Proper naming, formatting, and commenting
4. **Learning Demonstration (10%)**: Clear understanding of declaration vs. initialization concepts
