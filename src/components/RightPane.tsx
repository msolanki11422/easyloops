import React from 'react';
import { CodeEditorProps, TestResultsPanelProps } from '@/types';
import CodeEditor from './CodeEditor';
import TestResultsPanel from './TestResultsPanel';
import DraggableDivider from './DraggableDivider';

interface RightPaneProps {
  codeEditorProps: CodeEditorProps;
  testResultsProps: TestResultsPanelProps;
  onVerticalMouseDown: (e: React.MouseEvent) => void;
}

const RightPane: React.FC<RightPaneProps> = ({
  codeEditorProps,
  testResultsProps,
  onVerticalMouseDown
}) => {
  return (
    <>
      {/* Code Editor */}
      <div 
        className="flex-1"
        style={{ height: `calc(100% - ${testResultsProps.height}px - 40px)` }}
      >
        <CodeEditor {...codeEditorProps} />
      </div>

      {/* Vertical Draggable Divider */}
      <DraggableDivider
        onMouseDown={onVerticalMouseDown}
        orientation="vertical"
      />

      {/* Test Results */}
      <TestResultsPanel {...testResultsProps} />
    </>
  );
};

export default RightPane; 