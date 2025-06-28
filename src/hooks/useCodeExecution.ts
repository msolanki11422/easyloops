import { useCallback } from "react";
import { PyodideManager, TestCase } from "@/types";

export const useCodeExecution = (pyodideManager: PyodideManager) => {
  const executeCode = useCallback(
    async (code: string, testCases: TestCase[]) => {
      if (!pyodideManager.isLoaded || !pyodideManager.pyodide) {
        throw new Error("Pyodide is not loaded");
      }

      return await pyodideManager.runCode(code, testCases);
    },
    [pyodideManager]
  );

  return { executeCode };
};
