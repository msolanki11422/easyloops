import React from 'react';
import { LayoutState } from '@/types';
import DraggableDivider from './DraggableDivider';

interface MainLayoutProps {
  layoutState: LayoutState;
  containerRef: React.RefObject<HTMLDivElement | null>;
  rightPaneRef: React.RefObject<HTMLDivElement | null>;
  onHorizontalMouseDown: (e: React.MouseEvent) => void;
  leftPane: React.ReactNode;
  rightPane: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({
  layoutState,
  containerRef,
  rightPaneRef,
  onHorizontalMouseDown,
  leftPane,
  rightPane
}) => {
  return (
    <div 
      ref={containerRef}
      className="flex-1 flex overflow-hidden"
      style={{ cursor: layoutState.isDraggingHorizontal ? 'col-resize' : 'default' }}
    >
      {/* Left Pane - Problem Description */}
      <div 
        className="bg-white border-r border-gray-200 overflow-y-auto"
        style={{ width: `${layoutState.leftPaneWidth}%` }}
      >
        <div className="p-6">
          {leftPane}
        </div>
      </div>

      {/* Horizontal Draggable Divider */}
      <DraggableDivider
        onMouseDown={onHorizontalMouseDown}
        orientation="horizontal"
      />

      {/* Right Pane - Code Editor and Test Results */}
      <div 
        ref={rightPaneRef}
        className="bg-white flex flex-col"
        style={{ width: `${100 - layoutState.leftPaneWidth}%` }}
      >
        {rightPane}
      </div>
    </div>
  );
};

export default MainLayout; 