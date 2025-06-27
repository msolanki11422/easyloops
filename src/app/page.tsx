'use client';

import { useState, useRef, useEffect } from 'react';
import MonacoEditor from '@/components/MonacoEditor';
import MarkdownRenderer from '@/components/MarkdownRenderer';
import { loadQuestion, getAvailableQuestions, type Question } from '@/utils/questionLoader';

interface TestResult {
  testCase: string;
  expected: string;
  actual: string;
  passed: boolean;
  input?: string;
}

export default function Home() {
  const [leftPaneWidth, setLeftPaneWidth] = useState(40); // 40% default
  const [testResultsHeight, setTestResultsHeight] = useState(150); // 150px default
  const [isDraggingHorizontal, setIsDraggingHorizontal] = useState(false);
  const [isDraggingVertical, setIsDraggingVertical] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const rightPaneRef = useRef<HTMLDivElement>(null);
  const [pythonCode, setPythonCode] = useState(`# Example: Competitive Programming Style Input
# First line contains the number of test cases
# Followed by the contents of each test file

def solve_test_case():
    # Read input for one test case
    # This example assumes the input format from the variable declaration problem
    integer_val = int(input())
    string_val = input()
    boolean_val = input()
    float_val = float(input())
    char_val = input()
    updated_int = int(input())
    late_init = input()
    
    # Process and output results
    print(f"Integer variable: {integer_val}")
    print(f"String variable: {string_val}")
    print(f"Boolean variable: {boolean_val}")
    print(f"Float variable: {float_val}")
    print(f"Character variable: {char_val}")
    print(f"Updated integer variable: {updated_int}")
    print(f"Late-initialized variable: {late_init}")

# Read number of test cases
T = int(input())

# Process each test case
for _ in range(T):
    solve_test_case()`);
  const [output, setOutput] = useState('');
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [availableQuestions, setAvailableQuestions] = useState<string[]>([]);
  const [selectedQuestionId, setSelectedQuestionId] = useState('01-variable-declaration');
  // Pyodide type is not available, so use unknown and cast as needed
  const [pyodide, setPyodide] = useState<unknown>(null);

  useEffect(() => {
    // Load available questions
    getAvailableQuestions().then(setAvailableQuestions);
  }, []);

  useEffect(() => {
    // Load the selected question
    if (selectedQuestionId) {
      loadQuestion(selectedQuestionId).then(setCurrentQuestion);
    }
  }, [selectedQuestionId]);

  useEffect(() => {
    // Dynamically load Pyodide from CDN
    const initPyodide = async () => {
      // @ts-expect-error: pyodide is loaded on window by CDN script
      if (!window.loadPyodide) {
        await new Promise((resolve) => {
          const script = document.createElement('script');
          script.src = 'https://cdn.jsdelivr.net/pyodide/v0.24.1/full/pyodide.js';
          script.onload = resolve;
          document.body.appendChild(script);
        });
      }
      // @ts-expect-error: pyodide is loaded on window by CDN script
      const pyodideInstance = await window.loadPyodide({
        indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.24.1/full/',
      });
      setPyodide(pyodideInstance);
    };
    initPyodide();
  }, []);

  const handleHorizontalMouseDown = (e: React.MouseEvent) => {
    setIsDraggingHorizontal(true);
    e.preventDefault();
  };

  const handleVerticalMouseDown = (e: React.MouseEvent) => {
    setIsDraggingVertical(true);
    e.preventDefault();
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDraggingHorizontal && containerRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect();
      const newLeftWidth = ((e.clientX - containerRect.left) / containerRect.width) * 100;
      
      // Constrain to reasonable bounds (20% - 80%)
      const constrainedWidth = Math.max(20, Math.min(80, newLeftWidth));
      setLeftPaneWidth(constrainedWidth);
    }
    
    if (isDraggingVertical && rightPaneRef.current) {
      const rightPaneRect = rightPaneRef.current.getBoundingClientRect();
      const newTestHeight = rightPaneRect.bottom - e.clientY;
      
      // Constrain to reasonable bounds (100px - 400px)
      const constrainedHeight = Math.max(100, Math.min(400, newTestHeight));
      setTestResultsHeight(constrainedHeight);
    }
  };

  const handleMouseUp = () => {
    setIsDraggingHorizontal(false);
    setIsDraggingVertical(false);
  };

  useEffect(() => {
    if (isDraggingHorizontal || isDraggingVertical) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = isDraggingHorizontal ? 'col-resize' : 'row-resize';
      document.body.style.userSelect = 'none';
    } else {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    };
  }, [isDraggingHorizontal, isDraggingVertical]);

  const runCode = async () => {
    if (!pyodide || !currentQuestion) {
      setOutput('Pyodide is still loading or no question selected...');
      return;
    }

    setIsRunning(true);
    setOutput('');

    try {
      // Run test cases and capture their output
      const results: TestResult[] = [];
      
      // Prepare all input files first
      const inputFiles: string[] = [];
      for (const testCase of currentQuestion.testCases) {
        try {
          const inputResponse = await fetch(testCase.inputFile);
          if (!inputResponse.ok) {
            throw new Error(`Failed to load input file: ${testCase.inputFile}`);
          }
          const inputText = await inputResponse.text();
          inputFiles.push(inputText);
        } catch (error) {
          results.push({
            testCase: testCase.description,
            expected: 'Error loading test case',
            actual: `Error: ${error}`,
            passed: false
          });
        }
      }

      if (inputFiles.length === 0) {
        setOutput('No test cases available');
        setTestResults([]);
        return;
      }

      // Create competitive programming style input
      // First line: number of test cases
      // Followed by: contents of each test file
      const combinedInput = `${inputFiles.length}\n${inputFiles.join('\n')}`;
      
      console.log('Combined input for competitive programming style:', combinedInput);
      
      // Set up stdin/stdout redirection with the combined input
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await (pyodide as any).runPythonAsync(`
import sys
from io import StringIO
sys._stdin = sys.stdin
sys._stdout = sys.stdout
sys.stdin = StringIO('''${combinedInput}''')
sys.stdout = StringIO()
`);
      
      // Run the user's code
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await (pyodide as any).runPythonAsync(pythonCode);
      
      // Get the output
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const actualOutput = await (pyodide as any).runPythonAsync('sys.stdout.getvalue()');
      
      // Restore stdin/stdout
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await (pyodide as any).runPythonAsync('sys.stdin = sys._stdin; sys.stdout = sys._stdout');
      
      // Get the actual output
      const actual = actualOutput ? actualOutput.trim().replace(/\r\n/g, '\n') : '';
      
      // Now compare with each expected output
      for (let i = 0; i < currentQuestion.testCases.length; i++) {
        const testCase = currentQuestion.testCases[i];
        try {
          const expectedResponse = await fetch(testCase.expectedFile);
          if (!expectedResponse.ok) {
            throw new Error(`Failed to load expected file: ${testCase.expectedFile}`);
          }
          
          const expectedText = await expectedResponse.text();
          const expected = expectedText.trim().replace(/\r\n/g, '\n');
          
          // For competitive programming style, the output should contain results for all test cases
          // We need to extract the output for each specific test case
          let actualForTestCase = '';
          
          if (currentQuestion.testCases.length === 1) {
            // Single test case - use the entire output
            actualForTestCase = actual;
          } else {
            // Multiple test cases - try to extract the specific test case output
            // This is a simplified approach - in practice, you might need more sophisticated parsing
            
            // Look for the expected output pattern in the actual output
            if (actual.includes(expected)) {
              actualForTestCase = expected;
            } else {
              // If exact match not found, try to find partial matches
              // This is a fallback for when the output format might be different
              actualForTestCase = actual;
            }
          }
          
          const passed = actualForTestCase === expected;
          
          console.log(`Test case ${i + 1}:`, {
            expected: expected,
            actual: actualForTestCase,
            passed: passed,
            input: inputFiles[i] || 'No input available'
          });
          
          results.push({
            testCase: testCase.description,
            expected: expected,
            actual: actualForTestCase,
            passed: passed,
            input: inputFiles[i] || 'No input available'
          });
          
        } catch (error) {
          results.push({
            testCase: testCase.description,
            expected: 'Error loading test case',
            actual: `Error: ${error}`,
            passed: false
          });
        }
      }
      
      setTestResults(results);
      
      // Show overall output
      setOutput(actual || 'No output generated');
      
    } catch (error) {
      setOutput(`Error: ${error}`);
      setTestResults([]);
    } finally {
      setIsRunning(false);
    }
  };

  const submitCode = async () => {
    // TODO: Implement code submission
    console.log('Submitting code:', pythonCode);
  };

  return (
    <div className="h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-semibold text-gray-900">🧠 EasyLoops</h1>
            <span className="text-sm text-gray-500">Practice Problems</span>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">Question:</span>
              <select 
                value={selectedQuestionId}
                onChange={(e) => setSelectedQuestionId(e.target.value)}
                className="text-sm border border-gray-300 rounded px-2 py-1 bg-white min-w-[200px]"
              >
                {availableQuestions.map(id => (
                  <option key={id} value={id}>
                    {id.replace(/-/g, ' ').replace(/\d+-/, '').replace(/\b\w/g, l => l.toUpperCase())}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">Language:</span>
              <select className="text-sm border border-gray-300 rounded px-2 py-1 bg-white">
                <option>Python3</option>
                <option>JavaScript</option>
                <option>Java</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div 
        ref={containerRef}
        className="flex-1 flex overflow-hidden"
        style={{ cursor: isDraggingHorizontal ? 'col-resize' : 'default' }}
      >
        {/* Left Pane - Problem Description */}
        <div 
          className="bg-white border-r border-gray-200 overflow-y-auto"
          style={{ width: `${leftPaneWidth}%` }}
        >
          <div className="p-6">
            {currentQuestion ? (
              <div>
                <div className="mb-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-2">
                    🏷️ {currentQuestion.name}
                  </h2>
                  <div className="text-sm text-gray-600 mb-4">
                    <span className="font-medium">ID:</span> {currentQuestion.id}
                  </div>
                </div>
                <div className="prose prose-sm max-w-none">
                  <MarkdownRenderer content={currentQuestion.description} />
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-full">
                <div className="text-gray-500">Loading question...</div>
              </div>
            )}
          </div>
        </div>

        {/* Horizontal Draggable Divider */}
        <div
          className="w-1 bg-gray-300 hover:bg-blue-500 cursor-col-resize flex items-center justify-center group"
          onMouseDown={handleHorizontalMouseDown}
        >
          <div className="w-0.5 h-8 bg-gray-400 group-hover:bg-blue-400 rounded-full"></div>
        </div>

        {/* Right Pane - Code Editor and Test Results */}
        <div 
          ref={rightPaneRef}
          className="bg-white flex flex-col"
          style={{ width: `${100 - leftPaneWidth}%` }}
        >
          {/* Editor Header */}
          <div className="border-b border-gray-200 px-4 py-2 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <span className="text-sm font-medium text-gray-700">💻 Code Editor</span>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={runCode}
                disabled={isRunning || !pyodide || !currentQuestion}
                className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
              >
                {isRunning ? '⏳ Running...' : '✅ Run'}
              </button>
              <button
                onClick={submitCode}
                className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors"
              >
                📤 Submit
              </button>
            </div>
          </div>

          {/* Monaco Editor */}
          <div 
            className="flex-1"
            style={{ height: `calc(100% - ${testResultsHeight}px - 40px)` }}
          >
            <MonacoEditor
              value={pythonCode}
              onChange={setPythonCode}
              language="python"
              height="100%"
            />
          </div>

          {/* Vertical Draggable Divider */}
          <div
            className="h-1 bg-gray-300 hover:bg-blue-500 cursor-row-resize flex items-center justify-center group"
            onMouseDown={handleVerticalMouseDown}
            style={{ cursor: isDraggingVertical ? 'row-resize' : 'row-resize' }}
          >
            <div className="h-0.5 w-8 bg-gray-400 group-hover:bg-blue-400 rounded-full"></div>
          </div>

          {/* Test Results */}
          <div 
            className="bg-gray-50"
            style={{ height: `${testResultsHeight}px` }}
          >
            <div className="px-4 py-2 border-b border-gray-200">
              <h3 className="text-sm font-medium text-gray-700">📋 Test Results</h3>
            </div>
            <div className="p-4 space-y-2 overflow-y-auto" style={{ height: `calc(${testResultsHeight}px - 40px)` }}>
              {/* Input Format Info */}
              <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded">
                <div className="text-sm font-medium text-blue-800 mb-1">📝 Input Format (Competitive Programming Style):</div>
                <div className="text-xs text-blue-700">
                  First line: Number of test cases<br/>
                  Followed by: Contents of each test file
                </div>
              </div>
              
              {/* Output */}
              {output && (
                <div className="mb-4">
                  <div className="text-sm font-medium text-gray-700 mb-2">Output:</div>
                  <pre className="bg-gray-100 p-3 rounded text-sm overflow-x-auto text-gray-800">
                    {output}
                  </pre>
                </div>
              )}

              {/* Test Results */}
              {testResults.length > 0 && (
                <div className="space-y-2">
                  {testResults.map((result, index) => (
                    <div
                      key={index}
                      className={`p-3 rounded border ${
                        result.passed
                          ? 'bg-green-50 border-green-200'
                          : 'bg-red-50 border-red-200'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-700">{result.testCase}</span>
                        <span
                          className={`px-2 py-1 rounded text-xs font-medium ${
                            result.passed
                              ? 'bg-green-100 text-green-800'
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {result.passed ? 'PASS' : 'FAIL'}
                        </span>
                      </div>
                      {!result.passed && (
                        <div className="mt-2 text-sm space-y-1">
                          <div>Expected: <pre className="bg-gray-100 px-1 rounded mt-1">{result.expected}</pre></div>
                          <div>Actual: <pre className="bg-gray-100 px-1 rounded mt-1">{result.actual}</pre></div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* Default state when no tests run */}
              {testResults.length === 0 && !output && (
                <div className="text-sm text-gray-500">
                  Click &quot;Run&quot; to execute your code and see test results.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
