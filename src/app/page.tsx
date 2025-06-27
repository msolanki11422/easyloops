'use client';

import { useState, useEffect } from 'react';
import MonacoEditor from '../components/MonacoEditor';
import MarkdownRenderer from '../components/MarkdownRenderer';

interface TestResult {
  testCase: string;
  expected: string;
  actual: string;
  passed: boolean;
}

export default function Home() {
  const [code, setCode] = useState('# Write your Python code here\ndef hello_world():\n    return "Hello, World!"\n\n# Test your function\nprint(hello_world())');
  const [output, setOutput] = useState('');
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  // Pyodide type is not available, so use unknown and cast as needed
  const [pyodide, setPyodide] = useState<unknown>(null);
  const [questionContent, setQuestionContent] = useState('');

  // Test cases for the current question
  const testCases = [
    {
      input: "hello_world()",
      expected: "Hello, World!",
      description: "Basic function call"
    }
  ];

  useEffect(() => {
    // Load the markdown question file
    fetch('/questions/sample.md')
      .then(response => response.text())
      .then(content => setQuestionContent(content))
      .catch(error => {
        console.error('Failed to load question:', error);
        setQuestionContent('# Python Basics - Hello World\n\nWrite a function called `hello_world()` that returns the string "Hello, World!".');
      });

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

  const runCode = async () => {
    if (!pyodide) {
      setOutput('Pyodide is still loading...');
      return;
    }

    setIsRunning(true);
    setOutput('');

    try {
      // Redirect stdout to capture print output
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await (pyodide as any).runPythonAsync(`
import sys
from io import StringIO
sys._stdout = sys.stdout
sys.stdout = StringIO()
`);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await (pyodide as any).runPythonAsync(code);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const output = await (pyodide as any).runPythonAsync('sys.stdout.getvalue()');
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await (pyodide as any).runPythonAsync('sys.stdout = sys._stdout');
      setOutput(output || 'Code executed successfully (no output)');

      // Run test cases and capture their output
      const results: TestResult[] = [];
      for (const testCase of testCases) {
        try {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          await (pyodide as any).runPythonAsync(`sys.stdout = StringIO()`); // reset stdout for each test
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const testResult = await (pyodide as any).runPythonAsync(testCase.input);
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const testOutput = await (pyodide as any).runPythonAsync('sys.stdout.getvalue()');
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          await (pyodide as any).runPythonAsync('sys.stdout = sys._stdout');
          const actual = testOutput ? testOutput.trim() : String(testResult);
          const passed = actual === testCase.expected;
          results.push({
            testCase: testCase.description,
            expected: testCase.expected,
            actual: actual,
            passed: passed
          });
        } catch (error) {
          results.push({
            testCase: testCase.description,
            expected: testCase.expected,
            actual: `Error: ${error}`,
            passed: false
          });
        }
      }
      setTestResults(results);
    } catch (error) {
      setOutput(`Error: ${error}`);
      setTestResults([]);
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Python Code Editor
        </h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Panel - Question Details */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <MarkdownRenderer content={questionContent} className="prose prose-sm max-w-none" />
          </div>

          {/* Right Panel - Editor and Results */}
          <div className="space-y-6">
            {/* Monaco Editor */}
            <div className="bg-white rounded-lg shadow-md">
              <div className="p-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800">Code Editor</h3>
              </div>
              <div className="h-96">
                <MonacoEditor
                  height="100%"
                  language="python"
                  theme="vs-dark"
                  value={code}
                  onChange={(value) => setCode(value || '')}
                />
              </div>
            </div>

            {/* Run Button */}
            <div className="flex justify-center">
              <button
                onClick={runCode}
                disabled={isRunning || !pyodide}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
              >
                {isRunning ? 'Running...' : 'Run Code'}
              </button>
            </div>

            {/* Output */}
            {output && (
              <div className="bg-white rounded-lg shadow-md p-4">
                <h3 className="text-lg font-semibold mb-2 text-gray-800">Output</h3>
                <pre className="bg-gray-100 p-3 rounded text-sm overflow-x-auto">
                  {output}
                </pre>
              </div>
            )}

            {/* Test Results */}
            {testResults.length > 0 && (
              <div className="bg-white rounded-lg shadow-md p-4">
                <h3 className="text-lg font-semibold mb-2 text-gray-800">Test Results</h3>
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
                        <span className="font-medium">{result.testCase}</span>
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
                        <div className="mt-2 text-sm">
                          <div>Expected: <code className="bg-gray-100 px-1 rounded">{result.expected}</code></div>
                          <div>Actual: <code className="bg-gray-100 px-1 rounded">{result.actual}</code></div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
