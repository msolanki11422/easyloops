# Test Cases for Basic Input/Output Operations

## Test Case Structure

This question uses a **4-line input format** where each line represents different user information that will be processed and formatted for display.

### Input Format Pattern:

```
Line 1: Full name (string)
Line 2: Age in years (integer)
Line 3: Height in meters (float)
Line 4: Favorite programming language (string)
```

### Output Format Pattern:

```
Name (uppercase): <NAME IN UPPERCASE>
Age: <age> years
Birth Year: <2024 - age>
Height: <height>m (<height * 100>cm)
Favorite Language: <language>
Profile: <name>, <age> years old, <height>m tall, loves <language>
```

## Test Case 1: Standard Values

**Input (`input.txt`):**

```
John Doe
25
1.75
Python
```

**Expected Output (`expected.txt`):**

```
Name (uppercase): JOHN DOE
Age: 25 years
Birth Year: 1999
Height: 1.75m (175.0cm)
Favorite Language: Python
Profile: John Doe, 25 years old, 1.75m tall, loves Python
```

**Description:** Tests basic input/output with common values and standard formatting.

## Test Case 2: Edge Values

**Input (`input2.txt`):**

```
alice smith
18
1.50
JavaScript
```

**Expected Output (`expected2.txt`):**

```
Name (uppercase): ALICE SMITH
Age: 18 years
Birth Year: 2006
Height: 1.50m (150.0cm)
Favorite Language: JavaScript
Profile: alice smith, 18 years old, 1.50m tall, loves JavaScript
```

**Description:** Tests lowercase input name, younger age, shorter height, and different programming language.

## Test Case 3: Boundary Values

**Input (`input3.txt`):**

```
Dr. Maria Rodriguez-Chen
45
2.10
Go
```

**Expected Output (`expected3.txt`):**

```
Name (uppercase): DR. MARIA RODRIGUEZ-CHEN
Age: 45 years
Birth Year: 1979
Height: 2.10m (210.0cm)
Favorite Language: Go
Profile: Dr. Maria Rodriguez-Chen, 45 years old, 2.10m tall, loves Go
```

**Description:** Tests complex name with title and hyphen, older age, taller height, and single-letter language name.

## Test Case Creation Rules

### Input Validation Rules:

1. **Full name (line 1):** Any valid string, may contain spaces, hyphens, periods
2. **Age (line 2):** Positive integer between 1 and 120
3. **Height (line 3):** Positive float between 0.5 and 3.0 meters
4. **Programming language (line 4):** Any valid programming language name

### Output Format Rules:

1. **Exact format matching:** Output must match the expected format exactly
2. **Name uppercase:** Convert entire name to uppercase for first line
3. **Age formatting:** Include " years" after the age number
4. **Birth year calculation:** Always use 2024 as current year
5. **Height formatting:**
   - Display meters with original precision
   - Display centimeters with .0 decimal (e.g., "175.0cm")
6. **Profile line:** Preserve original name case, exact format with commas and spaces

## Language-Specific Considerations

### Python Considerations:

- String case conversion: `name.upper()`
- Height conversion: `height * 100` for centimeters
- F-string formatting: `f"Height: {height}m ({height * 100}cm)"`
- Profile formatting: Use comma separation and exact spacing

### Go Considerations:

- String case conversion: `strings.ToUpper(name)`
- Height conversion: Simple multiplication `height * 100`
- Printf formatting: `"Height: %.2fm (%.1fcm)"` for proper decimal places
- String concatenation or Printf for profile line

## Validation Checklist

When creating new test cases, ensure:

- [ ] Input has exactly 4 lines
- [ ] Age is a valid positive integer
- [ ] Height is a valid positive float
- [ ] Expected output follows the exact format pattern
- [ ] Output has exactly 6 lines
- [ ] Birth year calculation is correct (2024 - age)
- [ ] Height conversion is accurate (meters \* 100 = centimeters)
- [ ] Name case conversion is applied correctly
- [ ] Profile line maintains exact formatting and spacing

## Automated Test Case Generation

To generate additional test cases programmatically:

```python
import random

def generate_test_case():
    # Generate random values
    first_names = ["Alice", "Bob", "Charlie", "Diana", "Eve", "Frank"]
    last_names = ["Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia"]
    languages = ["Python", "JavaScript", "Java", "C++", "Go", "Rust", "C#"]

    name = f"{random.choice(first_names)} {random.choice(last_names)}"
    age = random.randint(18, 65)
    height = round(random.uniform(1.50, 2.00), 2)
    language = random.choice(languages)

    # Generate input content
    input_content = f"{name}\n{age}\n{height}\n{language}\n"

    # Calculate derived values
    birth_year = 2024 - age
    height_cm = height * 100

    # Generate expected output
    expected_content = f"""Name (uppercase): {name.upper()}
Age: {age} years
Birth Year: {birth_year}
Height: {height}m ({height_cm}cm)
Favorite Language: {language}
Profile: {name}, {age} years old, {height}m tall, loves {language}
"""

    return input_content, expected_content

# Example usage
input_data, expected_output = generate_test_case()
print("Generated input:", input_data)
print("Expected output:", expected_output)
```

This structure ensures consistency across all test cases and demonstrates various input/output formatting techniques that are fundamental to programming.
