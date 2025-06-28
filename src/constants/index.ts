export const DEFAULT_CODE = `# Nested Loops - Right Triangle Pattern
# Read the number of rows
n = int(input())

# Outer loop: iterate through rows (1 to n)
for i in range(1, n + 1):
    # Inner loop: print stars for current row
    for j in range(i):
        print("*", end="")
    print()  # Move to next line after each row`;

export const LAYOUT_CONSTANTS = {
  DEFAULT_LEFT_PANE_WIDTH: 40,
  DEFAULT_TEST_RESULTS_HEIGHT: 150,
  MIN_LEFT_PANE_WIDTH: 20,
  MAX_LEFT_PANE_WIDTH: 80,
  MIN_TEST_RESULTS_HEIGHT: 100,
  MAX_TEST_RESULTS_HEIGHT: 400,
} as const;

export const PYODIDE_CONFIG = {
  CDN_URL: "https://cdn.jsdelivr.net/pyodide/v0.24.1/full/pyodide.js",
  INDEX_URL: "https://cdn.jsdelivr.net/pyodide/v0.24.1/full/",
} as const;

export const MONACO_CONFIG = {
  CDN_URL: "https://cdn.jsdelivr.net/npm/monaco-editor@0.52.2/min/vs/loader.js",
  VS_PATH: "https://cdn.jsdelivr.net/npm/monaco-editor@0.52.2/min/vs",
} as const;

export const DEFAULT_QUESTION_ID = "01-variable-declaration";

export const SUPPORTED_LANGUAGES = [
  { value: "python", label: "Python3" },
  { value: "javascript", label: "JavaScript" },
  { value: "java", label: "Java" },
] as const;
