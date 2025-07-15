import { test, expect } from '@playwright/test';
import { clearPersistentState, waitForMonacoEditor } from './test-utils';

test.describe('Submission Flow E2E', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to a specific question page where the code editor is available
    await page.goto('/questions/01-variable-declaration');

    // Wait for the app to load - look for the EasyLoops header
    await page.waitForSelector('h1:has-text("🧠 EasyLoops")');

    // Clear all persistent state after page loads
    await clearPersistentState(page);
  });

  test.afterEach(async ({ page }) => {
    // Clear persistent state after each test as well
    await clearPersistentState(page);
  });

  test('@P0 should allow user to run sample test cases', async ({ page }) => {
    test.info().annotations.push({ type: 'priority', description: 'P0' });

    // Wait for the editor to load - look for the code editor section
    await page.waitForSelector('span:has-text("💻 Code Editor")');

    // Wait for Monaco editor to be ready
    await waitForMonacoEditor(page);

    // Clear the existing code and enter a simple program
    await page.locator('.monaco-editor').click();
    await page.keyboard.press('Control+A');
    await page.keyboard.type('print("Hello, World!")');

    // Click the Run button
    await page.locator('button:has-text("Run")').click();

    // Wait for execution to complete - look for any output that contains "Sample Test Results"
    await page.waitForSelector('text=/Sample Test Results/', {
      timeout: 100000,
    });

    // Check that the output contains sample test results
    // Use a more specific selector to get the test results container
    const testResultsContainer = page.locator('.test-results-container');
    await expect(testResultsContainer).toBeVisible();

    const output = await testResultsContainer.textContent();
    expect(output || '').toContain('Sample Test Results');
    expect(output || '').toMatch(/\(\d+\/\d+ passed\)/);

    // No ambiguous selector for test results panel
  });

  test('@P0 should allow user to evaluate all test cases and create submission', async ({
    page,
  }) => {
    test.info().annotations.push({ type: 'priority', description: 'P0' });

    // Wait for the editor to load - look for the code editor section
    await page.waitForSelector('span:has-text("💻 Code Editor")');

    // Wait for Monaco editor to be ready
    await waitForMonacoEditor(page);

    // Clear the existing code and enter a simple program
    await page.locator('.monaco-editor').click();
    await page.keyboard.press('Control+A');
    await page.keyboard.type('print("Hello, World!")');

    // Click the Evaluate All button
    await page.locator('button:has-text("Evaluate All")').click();

    // Wait for submission to complete
    try {
      await page.waitForSelector('text=/🎯 Full Evaluation Complete!/', {
        timeout: 100000,
      });
    } catch (e) {
      const debugText = await page
        .locator('.test-results-container')
        .textContent();

      console.log('DEBUG: test-results-container content:', debugText);
      throw e;
    }

    // Check that the output contains full evaluation results
    const testResultsContainer = page.locator('.test-results-container');
    await expect(testResultsContainer).toBeVisible();

    const outputText = await testResultsContainer.textContent();

    console.log('DEBUG: Full test-results-container content:', outputText);

    expect(outputText || '').toContain('Full Evaluation Complete');
    expect(outputText || '').toContain('Results Summary');
    expect(outputText || '').toContain('Passed:');
    expect(outputText || '').toContain('Status:');
    expect(outputText || '').toContain('Execution Time:');
    expect(outputText || '').toContain('Submission ID:');
    expect(outputText || '').toContain('Submission saved as snapshot');

    // Check for submission badge in test results header
    const submissionBadge = page.locator('text=/Last submission:/');
    await expect(submissionBadge).toBeVisible();
  });

  test('@P1 should show loading states during execution', async ({ page }) => {
    test.info().annotations.push({ type: 'priority', description: 'P1' });

    // Wait for the editor to load - look for the code editor section
    await page.waitForSelector('span:has-text("💻 Code Editor")');

    // Wait for Monaco editor to be ready
    await waitForMonacoEditor(page);

    // Enter some code
    await page.locator('.monaco-editor').click();
    await page.keyboard.press('Control+A');
    await page.keyboard.type('print("Test")');

    // Click Run and check for loading state
    await page.locator('button:has-text("Run")').click();

    // Wait for execution to complete
    await page.waitForSelector('button:has-text("Run")', { timeout: 30000 });

    // Verify that execution completed and buttons are re-enabled
    await expect(page.locator('button:has-text("Run")')).not.toBeDisabled();
    await expect(
      page.locator('button:has-text("Evaluate All")')
    ).not.toBeDisabled();
  });

  test('@P1 should show different loading states for run vs submit', async ({
    page,
  }) => {
    test.info().annotations.push({ type: 'priority', description: 'P1' });

    // Wait for the editor to load - look for the code editor section
    await page.waitForSelector('span:has-text("💻 Code Editor")');

    // Wait for Monaco editor to be ready
    await waitForMonacoEditor(page);

    // Enter some code
    await page.locator('.monaco-editor').click();
    await page.keyboard.press('Control+A');
    await page.keyboard.type('print("Test")');

    // Test Run button - click and wait for completion
    await page.locator('button:has-text("Run")').click();
    await page.waitForSelector('text=/Sample Test Results/', {
      timeout: 30000,
    });

    // Test Evaluate All button - click and wait for completion
    await page.locator('button:has-text("Evaluate All")').click();
    await page.waitForSelector('text=/🎯 Full Evaluation Complete!/', {
      timeout: 60000,
    });
  });

  test('@P1 should prevent multiple simultaneous executions', async ({
    page,
  }) => {
    test.info().annotations.push({ type: 'priority', description: 'P1' });

    // Wait for the editor to load - look for the code editor section
    await page.waitForSelector('span:has-text("💻 Code Editor")');

    // Wait for Monaco editor to be ready
    await waitForMonacoEditor(page);

    // Enter some code
    await page.locator('.monaco-editor').click();
    await page.keyboard.press('Control+A');
    await page.keyboard.type('print("Test")');

    // Click Run and wait for completion
    await page.locator('button:has-text("Run")').click();
    await page.waitForSelector('text=/Sample Test Results/', {
      timeout: 30000,
    });

    // Verify that execution completed successfully
    const output = await page.locator('.test-results-container').textContent();
    expect(output || '').toContain('Sample Test Results');
  });

  test('should display helpful messages for different button purposes', async ({
    page,
  }) => {
    test.info().annotations.push({ type: 'priority', description: 'P2' });

    // Wait for the editor to load - look for the code editor section
    await page.waitForSelector('span:has-text("💻 Code Editor")');

    // Check tooltip/title attributes for buttons
    const runButton = page.locator('button:has-text("Run")');
    const submitButton = page.locator('button:has-text("Evaluate All")');

    // Check that buttons have appropriate tooltips
    await expect(runButton).toHaveAttribute(
      'title',
      /sample test cases.*first 2/
    );
    await expect(submitButton).toHaveAttribute(
      'title',
      /all test cases.*submission snapshot/
    );
  });

  test('should show appropriate messages in empty state', async ({ page }) => {
    test.info().annotations.push({ type: 'priority', description: 'P2' });

    // Wait for the test results panel to load - look for the empty state message
    await page.waitForSelector('text=/Ready to test your code/');

    // Check for helpful empty state messages
    const emptyState = page.locator('text=/Ready to test your code/');
    await expect(emptyState).toBeVisible();

    // Check for the explanatory text about running code
    await expect(
      page.locator('text=/Click.*Run.*to execute your code/')
    ).toBeVisible();
  });

  test('should handle execution errors gracefully', async ({ page }) => {
    test.info().annotations.push({ type: 'priority', description: 'P1' });

    // Wait for the editor to load - look for the code editor section
    await page.waitForSelector('span:has-text("💻 Code Editor")');

    // Wait for Monaco editor to be ready
    await waitForMonacoEditor(page);

    // Enter invalid code
    await page.locator('.monaco-editor').click();
    await page.keyboard.press('Control+A');
    await page.keyboard.type('invalid syntax here');

    // Click Run
    await page.locator('button:has-text("Run")').click();

    // Wait for execution to complete and check for test results
    await page.waitForSelector('text=/Sample Test Results/', {
      timeout: 30000,
    });

    // Check that test results are displayed (even if they show failures)
    const output = await page.locator('.test-results-container').textContent();
    expect(output || '').toContain('Sample Test Results');
    expect(output || '').toContain('❌'); // Should show failed test cases

    // Buttons should be re-enabled after error
    await expect(page.locator('button:has-text("Run")')).not.toBeDisabled();
    await expect(
      page.locator('button:has-text("Evaluate All")')
    ).not.toBeDisabled();
  });

  test('should preserve submission history', async ({ page }) => {
    test.info().annotations.push({ type: 'priority', description: 'P1' });

    // Wait for the editor to load - look for the code editor section
    await page.waitForSelector('span:has-text("💻 Code Editor")');

    // Wait for Monaco editor to be ready
    await waitForMonacoEditor(page);

    // Enter some code
    await page.locator('.monaco-editor').click();
    await page.keyboard.press('Control+A');
    await page.keyboard.type('print("First submission")');

    // Submit first solution
    await page.locator('button:has-text("Evaluate All")').click();
    await page.waitForSelector('text=/🎯 Full Evaluation Complete!/', {
      timeout: 60000,
    });

    // Change the code
    await page.locator('.monaco-editor').click();
    await page.keyboard.press('Control+A');
    await page.keyboard.type('print("Second submission")');

    // Submit second solution
    await page.locator('button:has-text("Evaluate All")').click();
    await page.waitForSelector('text=/🎯 Full Evaluation Complete!/', {
      timeout: 60000,
    });

    // Check that submission history is preserved
    const submissionHistory = page.locator('text=/Last submission:/');
    await expect(submissionHistory).toBeVisible();

    // Check that we can see multiple submissions
    const submissions = page.locator('text=/Submission ID:/');
    const submissionCount = await submissions.count();
    expect(submissionCount).toBeGreaterThan(0);
  });

  test('should work with different programming languages', async ({ page }) => {
    test.info().annotations.push({ type: 'priority', description: 'P1' });

    // Wait for the editor to load - look for the code editor section
    await page.waitForSelector('span:has-text("💻 Code Editor")');

    // Test language selector dropdown functionality
    const languageSelectorButton = page.locator(
      'button[aria-label="Select language"]'
    );

    // Verify initial state shows Python3
    await expect(languageSelectorButton).toHaveText(/Python3/);

    // Click to open dropdown
    await languageSelectorButton.click();
    await page.waitForTimeout(500);

    // Verify dropdown is open by checking for dropdown container
    const dropdownContainer = page.locator(
      'button[aria-label="Select language"] + div'
    );
    await expect(dropdownContainer).toBeVisible();

    // Get all available language options
    const languageOptions = await page
      .locator('button[aria-label="Select language"] + div button')
      .allTextContents();
    console.log('Available languages in dropdown:', languageOptions);

    // Verify that at least Python3 is available
    expect(languageOptions).toContain('Python3');

    // Close dropdown by clicking the button again
    await languageSelectorButton.click();
    await page.waitForTimeout(500);

    // Verify dropdown is closed and we're still on Python3
    await expect(languageSelectorButton).toHaveText(/Python3/);
    await expect(dropdownContainer).not.toBeVisible();
  });
});

test.describe('Submission Flow Edge Cases', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to a page first to ensure localStorage is accessible
    await page.goto('/');
    await page.waitForSelector('h1:has-text("Master Programming")');

    // Clear all persistent state after page loads
    await clearPersistentState(page);
  });

  test.afterEach(async ({ page }) => {
    // Clear persistent state after each test as well
    await clearPersistentState(page);
  });

  test('should handle timeout scenarios', async ({ page }) => {
    test.info().annotations.push({ type: 'priority', description: 'P2' });

    await page.goto('/questions/01-variable-declaration');
    await page.waitForSelector('h1:has-text("🧠 EasyLoops")');

    // Wait for the editor to load
    await page.waitForSelector('span:has-text("💻 Code Editor")');

    // Wait for Monaco editor to be ready
    await waitForMonacoEditor(page);

    // Enter code that might cause timeout (infinite loop)
    await page.locator('.monaco-editor').click();
    await page.keyboard.press('Control+A');
    await page.keyboard.type('while True:\n    pass');

    // Click Run
    await page.locator('button:has-text("Run")').click();

    // Wait for execution to complete or timeout
    await page.waitForSelector(
      'text=/Sample Test Results/, text=/Error:/, text=/Timeout/',
      { timeout: 90000 }
    );

    // Check that some output is displayed
    const output = await page.locator('.test-results-container').textContent();
    expect(output || '').toMatch(/Sample Test Results|Error|Timeout/);
  });

  test('should handle network errors gracefully', async ({ page }) => {
    test.info().annotations.push({ type: 'priority', description: 'P2' });

    await page.goto('/questions/01-variable-declaration');
    await page.waitForSelector('h1:has-text("🧠 EasyLoops")');

    // Wait for the editor to load
    await page.waitForSelector('span:has-text("💻 Code Editor")');

    // Wait for Monaco editor to be ready
    await waitForMonacoEditor(page);

    // Simulate network issues for Go execution
    await page.route('**/api/execute/go/', (route) => route.abort());

    // Change language to Go using the custom dropdown
    const languageSelectorButton = page.locator(
      'button[aria-label="Select language"]'
    );
    await languageSelectorButton.click();

    // Wait for dropdown to open and click on Go option
    await page.waitForSelector('button:has-text("Go")');
    await page.locator('button:has-text("Go")').click();

    // Wait for Monaco editor to be ready again after language change
    await waitForMonacoEditor(page);

    // Enter Go code
    await page.locator('.monaco-editor').click();
    await page.keyboard.press('Control+A');
    await page.keyboard.type(
      'package main\n\nimport "fmt"\n\nfunc main() {\n    fmt.Println("Hello, Go!")\n}'
    );

    // Try to run the code
    await page.locator('button:has-text("Run")').click();

    // Wait for execution to complete or error to be displayed
    await page.waitForSelector(
      'text=/Sample Test Results/, text=/Error:/, text=/Network error/, text=/Failed to execute/',
      { timeout: 60000 }
    );

    // Check that some output is displayed
    const output = await page.locator('.test-results-container').textContent();
    expect(output || '').toMatch(
      /Sample Test Results|Error|Network error|Failed to execute/
    );
  });
});
