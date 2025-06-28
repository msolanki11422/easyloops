import React from 'react';
import { CodeEditorProps } from '@/types';
import MonacoEditor from './MonacoEditor';

const CodeEditor: React.FC<CodeEditorProps> = ({
  value,
  onChange,
  language = 'python',
  height = '100%',
  isRunning = false,
  onRun,
  onSubmit
}) => {
  return (
    <div className="flex flex-col h-full">
      {/* Editor Header */}
      <div className="border-b border-gray-200 px-4 py-2 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <span className="text-sm font-medium text-gray-700">💻 Code Editor</span>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={onRun}
            disabled={isRunning}
            className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            {isRunning ? '⏳ Running...' : '✅ Run'}
          </button>
          <button
            onClick={onSubmit}
            className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors"
          >
            📤 Submit
          </button>
        </div>
      </div>

      {/* Monaco Editor */}
      <div className="flex-1">
        <MonacoEditor
          value={value}
          onChange={onChange}
          language={language}
          height={height}
        />
      </div>
    </div>
  );
};

export default CodeEditor; 