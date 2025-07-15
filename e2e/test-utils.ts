import { Page } from '@playwright/test';

export async function clearPersistentState(page: Page) {
  try {
    // Clear localStorage
    await page.evaluate(() => {
      localStorage.clear();
    });

    // Clear sessionStorage
    await page.evaluate(() => {
      sessionStorage.clear();
    });

    // Clear any other persistent state
    await page.evaluate(() => {
      // Clear any custom state keys
      const keysToRemove = [
        'easyloops-layout-state',
        'easyloops-theme',
        'easyloops-submissions',
        'easyloops-progress',
      ];

      keysToRemove.forEach((key) => {
        localStorage.removeItem(key);
        sessionStorage.removeItem(key);
      });
    });
  } catch (error) {
    // Ignore errors that might occur if localStorage is not accessible
    console.warn('Could not clear persistent state:', error);
  }
}

export async function waitForMonacoEditor(page: Page) {
  // Wait for Monaco editor to be ready
  await page.waitForSelector('.monaco-editor', { timeout: 30000 });

  // Wait for the editor to be fully loaded
  await page.waitForFunction(
    () => {
      const editor = document.querySelector('.monaco-editor');
      return editor && editor.querySelector('.monaco-editor-background');
    },
    { timeout: 30000 }
  );
}

// Priority filter utility for test annotations
export function createPriorityFilter(priority: string) {
  return (test: {
    info?: { annotations?: Array<{ type: string; description: string }> };
  }) => {
    const annotations = test.info?.annotations || [];
    return annotations.some(
      (annotation) =>
        annotation.type === 'priority' && annotation.description === priority
    );
  };
}

// Test filter for specific priority levels
export function filterTestsByPriority(
  tests: Array<{
    info?: { annotations?: Array<{ type: string; description: string }> };
  }>,
  priority: string
) {
  return tests.filter((test) => {
    const annotations = test.info?.annotations || [];
    return annotations.some(
      (annotation) =>
        annotation.type === 'priority' && annotation.description === priority
    );
  });
}
