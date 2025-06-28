import React from 'react';
import { ProblemDescriptionProps } from '@/types';
import MarkdownRenderer from './MarkdownRenderer';

const ProblemDescription: React.FC<ProblemDescriptionProps> = ({
  question,
  isLoading
}) => {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-gray-500">Loading question...</div>
      </div>
    );
  }

  if (!question) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-gray-500">Select a question to begin</div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-2">
          🏷️ {question.name}
        </h2>
        <div className="text-sm text-gray-600 mb-4">
          <span className="font-medium">ID:</span> {question.id}
        </div>
      </div>
      <div className="prose prose-sm max-w-none">
        <MarkdownRenderer content={question.description} />
      </div>
    </div>
  );
};

export default ProblemDescription; 