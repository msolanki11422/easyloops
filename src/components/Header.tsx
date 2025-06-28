import React from 'react';
import { QuestionSelectorProps } from '@/types';
import QuestionSelector from './QuestionSelector';

const Header: React.FC<QuestionSelectorProps> = (questionSelectorProps) => {
  return (
    <div className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 className="text-xl font-semibold text-gray-900">🧠 EasyLoops</h1>
          <span className="text-sm text-gray-500">Practice Problems</span>
        </div>
        <div className="flex items-center space-x-4">
          <QuestionSelector {...questionSelectorProps} />
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
  );
};

export default Header; 