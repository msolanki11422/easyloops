import React from 'react';
import { TestResultsPanelProps } from '@/types';

const TestResultsPanel: React.FC<TestResultsPanelProps> = ({
  testResults,
  output,
  height
}) => {
  return (
    <div 
      className="bg-gray-50"
      style={{ height: `${height}px` }}
    >
      <div className="px-4 py-2 border-b border-gray-200">
        <h3 className="text-sm font-medium text-gray-700">📋 Test Results</h3>
      </div>
      <div className="p-4 space-y-2 overflow-y-auto" style={{ height: `calc(${height}px - 40px)` }}>
        {/* Input Format Info */}
        <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded">
          <div className="text-sm font-medium text-blue-800 mb-1">📝 Learning Mode:</div>
          <div className="text-xs text-blue-700">
            Each test case runs individually<br/>
            You&apos;ll see exactly which test case failed and why
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
  );
};

export default TestResultsPanel; 