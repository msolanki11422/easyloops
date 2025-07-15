import { test, expect } from '@playwright/test';
import { clearPersistentState } from './test-utils';

test.describe('Question Dropdown Navigation', () => {
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

  test('@P1 should navigate between questions using the dropdown', async ({
    page,
  }) => {
    test.info().annotations.push({ type: 'priority', description: 'P1' });

    // Go to the questions page to get the list of available questions
    await page.goto('/questions');

    // Wait for the questions to load and get the first question link
    const firstQuestionLink = page.locator('a[href^="/questions/"]').first();
    await expect(firstQuestionLink).toBeVisible();

    // Get the href to navigate to the first question
    const questionHref = await firstQuestionLink.getAttribute('href');
    expect(questionHref).toBeTruthy();

    // Navigate to the first question
    await page.goto(questionHref!);

    // Wait for the dropdown to be visible
    const dropdownButton = page.getByRole('button', {
      name: /select question/i,
    });
    await expect(dropdownButton).toBeVisible();

    // Get the current question name from the dropdown button
    const currentQuestionName = await dropdownButton.textContent();
    expect(currentQuestionName).toBeTruthy();

    // Open the dropdown
    await dropdownButton.click();

    // Wait for the dropdown options to appear and get all options
    // Use a more specific selector for dropdown options
    const dropdownOptions = page.locator('.absolute button').filter({
      hasText: /^(?!.*select question|.*loading)/i, // Exclude dropdown button and loading text
    });

    // Wait for options to be visible
    await expect(dropdownOptions.first()).toBeVisible();

    // Find the first option that is not the currently selected one
    let targetOption = null;
    const optionCount = await dropdownOptions.count();

    // Start from index 1 to avoid selecting the first option (which might be the current one)
    for (let i = 1; i < optionCount; i++) {
      const option = dropdownOptions.nth(i);
      const optionText = await option.textContent();

      if (optionText && optionText.trim() !== currentQuestionName?.trim()) {
        targetOption = option;
        break;
      }
    }

    // If we didn't find a different option starting from index 1, try index 0
    if (!targetOption && optionCount > 0) {
      const firstOption = dropdownOptions.nth(0);
      const firstOptionText = await firstOption.textContent();
      if (
        firstOptionText &&
        firstOptionText.trim() !== currentQuestionName?.trim()
      ) {
        targetOption = firstOption;
      }
    }

    expect(targetOption).toBeTruthy();
    await targetOption!.click();

    // The URL should update to a new question
    await expect(page).toHaveURL(/questions\/[^\/]+/);

    // The page should show the question header (first h2 heading)
    await expect(page.getByRole('heading', { level: 2 }).first()).toBeVisible();
  });
});
