'use client';

import { useState, useRef, useEffect } from 'react';
import MonacoEditor from '@/components/MonacoEditor';

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
  const [pythonCode, setPythonCode] = useState(`# Read input
T = int(input())  # Number of test cases

for t in range(T):
    # Read n and target
    n, target = map(int, input().split())
    
    # Read the array
    nums = list(map(int, input().split()))
    
    # Find two numbers that sum to target
    found = False
    for i in range(n):
        for j in range(i + 1, n):
            if nums[i] + nums[j] == target:
                print(f"{i} {j}")
                found = True
                break
        if found:
            break
    
    if not found:
        print("No solution found")`);
  const [output, setOutput] = useState('');
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  // Pyodide type is not available, so use unknown and cast as needed
  const [pyodide, setPyodide] = useState<unknown>(null);

  // Test cases with input/output files
  const testCases = [
    {
      inputFile: '/testcases/input1.txt',
      expectedFile: '/testcases/expected1.txt',
      description: 'Test Case 1: Basic examples'
    },
    {
      inputFile: '/testcases/input2.txt',
      expectedFile: '/testcases/expected2.txt',
      description: 'Test Case 2: Additional examples'
    }
  ];

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
    if (!pyodide) {
      setOutput('Pyodide is still loading...');
      return;
    }

    setIsRunning(true);
    setOutput('');

    try {
      // Run test cases and capture their output
      const results: TestResult[] = [];
      
      for (const testCase of testCases) {
        try {
          // Fetch input and expected files
          const [inputResponse, expectedResponse] = await Promise.all([
            fetch(testCase.inputFile),
            fetch(testCase.expectedFile)
          ]);
          
          if (!inputResponse.ok || !expectedResponse.ok) {
            throw new Error(`Failed to load test files: ${testCase.inputFile}`);
          }
          
          const inputText = await inputResponse.text();
          const expectedText = await expectedResponse.text();
          
          // Set up stdin/stdout redirection
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          await (pyodide as any).runPythonAsync(`
import sys
from io import StringIO
sys._stdin = sys.stdin
sys._stdout = sys.stdout
sys.stdin = StringIO('''${inputText}''')
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
          
          // Normalize outputs (trim whitespace, normalize line endings)
          const actual = actualOutput ? actualOutput.trim().replace(/\r\n/g, '\n') : '';
          const expected = expectedText.trim().replace(/\r\n/g, '\n');
          
          const passed = actual === expected;
          
          results.push({
            testCase: testCase.description,
            expected: expected,
            actual: actual,
            passed: passed,
            input: inputText
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
      const allOutputs = results.map(r => r.actual).join('\n---\n');
      setOutput(allOutputs || 'No output generated');
      
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
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-2">
                🏷️ Problem: Two Sum
              </h2>
              <div className="text-sm text-gray-600 mb-4">
                <span className="font-medium">Difficulty:</span> Easy
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-md font-semibold text-gray-800 mb-2">
                  💬 Description
                </h3>
                <div className="text-sm text-gray-700 leading-relaxed">
                  <p className="mb-3">
                    Given an array of integers <code className="bg-gray-100 px-1 rounded">nums</code> and an integer <code className="bg-gray-100 px-1 rounded">target</code>, 
                    return <em>indices of the two numbers such that they add up to</em> <code className="bg-gray-100 px-1 rounded">target</code>.
                  </p>
                  <p className="mb-3">
                    You may assume that each input would have <strong>exactly one solution</strong>, and you may not use the <em>same</em> element twice.
                  </p>
                  <p>
                    You can return the answer in any order.
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-md font-semibold text-gray-800 mb-2">
                  📌 Input Format
                </h3>
                <div className="text-sm text-gray-700 space-y-2">
                  <p>The first line contains <code className="bg-gray-100 px-1 rounded">T</code>, the number of test cases.</p>
                  <p>For each test case:</p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>First line: <code className="bg-gray-100 px-1 rounded">n target</code> (array length and target sum)</li>
                    <li>Second line: <code className="bg-gray-100 px-1 rounded">nums[0] nums[1] ... nums[n-1]</code> (space-separated integers)</li>
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="text-md font-semibold text-gray-800 mb-2">
                  📤 Output Format
                </h3>
                <div className="text-sm text-gray-700 space-y-2">
                  <p>For each test case, print one line with two space-separated integers representing the indices.</p>
                  <p>Example: <code className="bg-gray-100 px-1 rounded">0 1</code></p>
                </div>
              </div>

              <div>
                <h3 className="text-md font-semibold text-gray-800 mb-2">
                  🧪 Example
                </h3>
                <div className="space-y-3">
                  <div className="bg-gray-50 p-3 rounded">
                    <div className="text-sm font-medium text-gray-700 mb-2">Input:</div>
                    <pre className="text-sm text-gray-600 bg-white p-2 rounded">3
4 9
2 7 11 15
3 6
3 2 4
2 6
3 3</pre>
                    <div className="text-sm font-medium text-gray-700 mb-2 mt-3">Output:</div>
                    <pre className="text-sm text-gray-600 bg-white p-2 rounded">0 1
1 2
0 1</pre>
                  </div>
                </div>
              </div>
            </div>
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
                disabled={isRunning || !pyodide}
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
