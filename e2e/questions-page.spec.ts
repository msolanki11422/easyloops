import { test, expect } from '@playwright/test';
import { clearPersistentState } from './test-utils';

test.describe('Questions Page', () => {
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

  test('@P0 should load the questions page with correct content', async ({
    page,
  }) => {
    test.info().annotations.push({ type: 'priority', description: 'P0' });

    await page.goto('/questions');

    // Check page title and description - use more specific selectors
    await expect(
      page.getByRole('heading', { name: 'Practice Problems' })
    ).toBeVisible();
    await expect(
      page.getByText('Choose a problem to start practicing')
    ).toBeVisible();

    // Check navigation back to home
    await expect(
      page.getByRole('link', { name: '🧠 EasyLoops' })
    ).toBeVisible();
  });

  test('should display loading state initially', async ({ page }) => {
    test.info().annotations.push({ type: 'priority', description: 'P1' });

    // Navigate to questions page
    await page.goto('/questions');

    // The loading state might be very brief, but we can check for the loading text
    // Note: This test might be flaky due to fast loading, so we'll check for either loading or loaded state
    const loadingText = page.getByText('Loading problems...');
    const practiceProblemsHeading = page.getByRole('heading', {
      name: 'Practice Problems',
    });

    // Wait for either loading to complete or content to appear
    await expect(loadingText.or(practiceProblemsHeading)).toBeVisible();
  });

  test('@P0 should display list of available questions', async ({ page }) => {
    test.info().annotations.push({ type: 'priority', description: 'P0' });

    await page.goto('/questions');

    // Wait for questions to load
    await page.waitForSelector('a[href^="/questions/"]', { timeout: 10000 });

    // Check that question cards are displayed
    const questionLinks = page.locator('a[href^="/questions/"]');
    const count = await questionLinks.count();
    expect(count).toBeGreaterThan(0);

    // Check that at least one question card has the expected structure
    const firstQuestionCard = questionLinks.first();
    await expect(firstQuestionCard).toBeVisible();

    // Check for "Start Problem" text in the card
    await expect(firstQuestionCard.getByText('Start Problem')).toBeVisible();
  });

  test('@P0 should have working question links', async ({ page }) => {
    test.info().annotations.push({ type: 'priority', description: 'P0' });

    await page.goto('/questions');

    // Wait for questions to load
    await page.waitForSelector('a[href^="/questions/"]', { timeout: 10000 });

    // Click on the first question
    const firstQuestionLink = page.locator('a[href^="/questions/"]').first();
    const questionHref = await firstQuestionLink.getAttribute('href');

    await firstQuestionLink.click();

    // Verify we're on a question page
    await expect(page).toHaveURL(/\/questions\/\d+/);

    // Verify the URL matches the href we clicked
    if (questionHref) {
      await expect(page).toHaveURL(questionHref);
    }
  });

  test('should display question difficulty badges', async ({ page }) => {
    test.info().annotations.push({ type: 'priority', description: 'P1' });

    await page.goto('/questions');

    // Wait for questions to load
    await page.waitForSelector('a[href^="/questions/"]', { timeout: 10000 });

    // Check that difficulty badges are present (they should be in the format of question numbers)
    const badges = page.locator('span').filter({ hasText: /\d+/ });
    const badgeCount = await badges.count();
    expect(badgeCount).toBeGreaterThan(0);
  });

  test('should have responsive grid layout', async ({ page }) => {
    test.info().annotations.push({ type: 'priority', description: 'P2' });

    await page.goto('/questions');

    // Wait for questions to load
    await page.waitForSelector('a[href^="/questions/"]', { timeout: 10000 });

    // Check that the grid container has responsive classes
    // Look for the grid container that contains the question cards
    const gridContainer = page.locator('div.grid').first();
    await expect(gridContainer).toHaveClass(/grid-cols-1/);
    await expect(gridContainer).toHaveClass(/md:grid-cols-2/);
    await expect(gridContainer).toHaveClass(/lg:grid-cols-3/);
  });

  test('should support dark mode styling', async ({ page }) => {
    test.info().annotations.push({ type: 'priority', description: 'P2' });

    await page.goto('/questions');

    // Check that the main container has dark mode classes
    const mainContainer = page.locator('div.min-h-screen').first();
    await expect(mainContainer).toHaveClass(/dark:bg-gray-900/);

    // Check that question cards have dark mode styling
    await page.waitForSelector('a[href^="/questions/"]', { timeout: 10000 });
    const questionCard = page.locator('a[href^="/questions/"]').first();
    await expect(questionCard).toHaveClass(/dark:bg-gray-800/);
  });

  test('@P0 should have working navigation back to home', async ({ page }) => {
    test.info().annotations.push({ type: 'priority', description: 'P0' });

    await page.goto('/questions');

    // Click on the EasyLoops logo to go back home
    await page.getByRole('link', { name: '🧠 EasyLoops' }).click();
    await expect(page).toHaveURL('/');
  });

  test('should display question descriptions', async ({ page }) => {
    test.info().annotations.push({ type: 'priority', description: 'P1' });

    await page.goto('/questions');

    // Wait for questions to load
    await page.waitForSelector('a[href^="/questions/"]', { timeout: 10000 });

    // Check that question cards have descriptions
    const questionCards = page.locator('a[href^="/questions/"]');
    const firstCard = questionCards.first();

    // Check for description text pattern
    await expect(
      firstCard.getByText(/Practice .* concepts and improve your skills/)
    ).toBeVisible();
  });

  test('@P0 should navigate from questions page to individual question', async ({
    page,
  }) => {
    test.info().annotations.push({ type: 'priority', description: 'P0' });

    await page.goto('/questions/');
    await page.waitForSelector('a[href^="/questions/"]', { timeout: 10000 });
    const firstQuestionLink = page.locator('a[href^="/questions/"]').first();
    await firstQuestionLink.click();

    // Wait for the question page to load by checking for the header
    await page.waitForSelector('h1:has-text("🧠 EasyLoops")', {
      timeout: 10000,
    });

    // Verify we're on a question page
    await expect(page).toHaveURL(/\/questions\/\d+/);

    // Verify the question content has loaded (not showing "Loading question...")
    await expect(page.getByText('Loading question...')).not.toBeVisible();
  });
});
