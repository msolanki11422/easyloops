'use client';

import React, { useEffect, useRef } from 'react';

export type MonacoEditorProps = {
  value: string;
  language?: string;
  theme?: string;
  onChange?: (value: string) => void;
  height?: string | number;
};

const MonacoEditor: React.FC<MonacoEditorProps> = ({
  value,
  language = 'python',
  theme = 'vs-dark',
  onChange,
  height = 400,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  // Monaco types are not available for CDN UMD loader, so we use 'any' here
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const editorRef = useRef<any>(null);

  useEffect(() => {
    let script: HTMLScriptElement | null = null;
    // Monaco types are not available for CDN UMD loader, so we use 'any' here
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let editor: any = null;

    if (typeof window !== 'undefined' && containerRef.current) {
      script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/monaco-editor@0.52.2/min/vs/loader.js';
      script.onload = () => {
        // @ts-expect-error: Monaco loader is attached to window by CDN script
        window.require.config({ paths: { vs: 'https://cdn.jsdelivr.net/npm/monaco-editor@0.52.2/min/vs' } });
        // @ts-expect-error: Monaco loader is attached to window by CDN script
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        window.require(['vs/editor/editor.main'], (monaco: any) => {
          editor = monaco.editor.create(containerRef.current, {
            value,
            language,
            theme,
            minimap: { enabled: false },
            fontSize: 14,
            lineNumbers: 'on',
            roundedSelection: false,
            scrollBeyondLastLine: false,
            automaticLayout: true,
            wordWrap: 'on',
          });
          editor.onDidChangeModelContent(() => {
            if (onChange) onChange(editor.getValue());
          });
          editorRef.current = editor;
        });
      };
      document.body.appendChild(script);
    }

    return () => {
      if (editorRef.current) {
        editorRef.current.dispose();
      }
      if (script && document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Update value if it changes from outside
  useEffect(() => {
    if (editorRef.current && value !== editorRef.current.getValue()) {
      editorRef.current.setValue(value);
    }
  }, [value]);

  return <div ref={containerRef} style={{ width: '100%', height }} />;
};

export default MonacoEditor; 