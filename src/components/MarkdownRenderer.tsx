import React from 'react';
import ReactMarkdown from 'react-markdown';

export type MarkdownRendererProps = {
  content: string;
  className?: string;
};

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content, className }) => (
  <div className={className}>
    <ReactMarkdown>{content}</ReactMarkdown>
  </div>
);

export default MarkdownRenderer; 