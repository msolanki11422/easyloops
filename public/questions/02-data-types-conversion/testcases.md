# Test Cases for Data Types and Type Conversion

## Test Case Structure

This question uses a **5-line input format** where each line represents different data that will be converted between various primitive types.

### Input Format Pattern:

```
Line 1: String representation of integer
Line 2: String representation of float
Line 3: String representation of boolean ("true" or "false")
Line 4: Integer value
Line 5: Float value
```

### Output Format Pattern:

```
String to int: <converted integer>
String to float: <converted float>
String to bool: <converted boolean>
Int to string: <integer as string>
Int to float: <integer as float>
Int to bool: <integer as boolean>
Float to string: <float as string>
Float to int: <float truncated to integer>
Float to bool: <float as boolean>
```

## Test Case 1: Standard Values

**Input (`input.txt`):**

```
123
45.67
true
42
3.14159
```

**Expected Output (`expected.txt`):**

```
String to int: 123
String to float: 45.67
String to bool: true
Int to string: 42
Int to float: 42.0
Int to bool: true
Float to string: 3.14159
Float to int: 3
Float to bool: true
```

**Description:** Tests basic type conversion with positive values and true boolean.

## Test Case 2: Edge Values

**Input (`input2.txt`):**

```
-456
0.0
false
0
-2.71828
```

**Expected Output (`expected2.txt`):**

```
String to int: -456
String to float: 0.0
String to bool: false
Int to string: 0
Int to float: 0.0
Int to bool: false
Float to string: -2.71828
Float to int: -2
Float to bool: true
```

**Description:** Tests negative values, zero, false boolean, and edge case where zero integer becomes false but negative float becomes true.

## Test Case 3: Boundary Values

**Input (`input3.txt`):**

```
2147483647
999.999
true
1
1.0
```

**Expected Output (`expected3.txt`):**

```
String to int: 2147483647
String to float: 999.999
String to bool: true
Int to string: 1
Int to float: 1.0
Int to bool: true
Float to string: 1.0
Float to int: 1
Float to bool: true
```

**Description:** Tests large integer values, precision floats, and the edge case where 1.0 converts to 1.

## Test Case Creation Rules

### Input Validation Rules:

1. **String integers (line 1):** Valid integer strings including negative numbers
2. **String floats (line 2):** Valid floating-point strings including negative and zero
3. **String booleans (line 3):** Must be exactly "true" or "false" (lowercase)
4. **Integer values (line 4):** Valid integers within language limits
5. **Float values (line 5):** Valid floating-point numbers

### Output Format Rules:

1. **Exact format matching:** Output must match the expected format exactly
2. **Boolean representation:** Should output "true" or "false" (lowercase)
3. **Float formatting:**
   - Show decimal point for integer-to-float conversions (e.g., "42.0")
   - Preserve original precision for float-to-string conversions
4. **Integer truncation:** Float-to-int should truncate, not round
5. **Boolean conversion logic:**
   - Integer 0 becomes false, any other integer becomes true
   - Float 0.0 becomes false, any other float becomes true

## Language-Specific Considerations

### Python Considerations:

- Boolean parsing: `str_bool == "true"`
- Integer conversion: `int(str_value)` and `int(float_value)` truncates
- Boolean conversion: `bool(int_value)` where 0 is False, others True
- Float formatting: Use direct printing for proper representation

### Go Considerations:

- Boolean parsing: `strBool == "true"`
- Integer conversion: `strconv.Atoi()` and type casting `int(floatValue)`
- Boolean conversion: Check if value != 0
- Float formatting: Use `%g` for floats, `%.1f` for integer-to-float to ensure `.0`

## Validation Checklist

When creating new test cases, ensure:

- [ ] Input has exactly 5 lines
- [ ] Boolean string is "true" or "false"
- [ ] Integer and float strings are valid representations
- [ ] Expected output follows the exact format pattern
- [ ] Output has exactly 9 lines
- [ ] Boolean conversion logic is correct (0/0.0 = false, others = true)
- [ ] Float-to-int conversion truncates properly
- [ ] No trailing whitespace in output lines

## Automated Test Case Generation

To generate additional test cases programmatically:

```python
import random

def generate_test_case():
    # Generate random values
    str_int = str(random.randint(-1000, 1000))
    str_float = f"{random.uniform(-100.0, 100.0):.3f}"
    str_bool = random.choice(["true", "false"])
    int_val = random.randint(-100, 100)
    float_val = round(random.uniform(-50.0, 50.0), 5)

    # Generate input content
    input_content = f"{str_int}\n{str_float}\n{str_bool}\n{int_val}\n{float_val}\n"

    # Generate expected output
    converted_int = int(str_int)
    converted_float = float(str_float)
    converted_bool = str_bool == "true"
    int_to_bool = int_val != 0
    float_to_bool = float_val != 0.0
    float_to_int = int(float_val)  # Truncates

    expected_content = f"""String to int: {converted_int}
String to float: {converted_float}
String to bool: {str(converted_bool).lower()}
Int to string: {int_val}
Int to float: {float(int_val)}
Int to bool: {str(int_to_bool).lower()}
Float to string: {float_val}
Float to int: {float_to_int}
Float to bool: {str(float_to_bool).lower()}
"""

    return input_content, expected_content

# Example usage
input_data, expected_output = generate_test_case()
print("Generated input:", input_data)
print("Expected output:", expected_output)
```

This structure ensures consistency across all test cases and makes it easy for agents to understand the pattern and create additional test cases following the same format.
