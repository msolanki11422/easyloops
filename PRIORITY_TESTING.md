# Priority-Based Test System

This document explains the priority-based test system implemented for the EasyLoops project using Playwright's `test.info().annotations` API and grep options.

## Overview

The priority-based test system allows you to run tests based on their importance level:

- **P0**: Critical functionality (must pass for basic app operation)
- **P1**: Important functionality (should pass for good user experience)
- **P2**: Nice-to-have functionality (can fail without blocking deployment)

## Implementation Details

### 1. Test Annotations

Each test is annotated with a priority level using Playwright's `test.info().annotations` API:

```typescript
test('@P0 should load the home page with correct content', async ({ page }) => {
  test.info().annotations.push({ type: 'priority', description: 'P0' });
  // ... test implementation
});
```

### 2. Test Naming Convention

Tests are named with priority tags for grep filtering:

- `@P0` for critical tests
- `@P1` for important tests
- `@P2` for nice-to-have tests

### 3. Priority Filtering

The system uses a custom test runner (`scripts/run-priority-tests.js`) that:

- Reads the `TEST_PRIORITY` environment variable
- Uses Playwright's `--grep` option to filter tests by priority tag
- Runs only tests matching the specified priority

## Available Scripts

### Individual Priority Levels

```bash
# Run only P0 (critical) tests
npm run test:e2e:p0

# Run only P1 (important) tests
npm run test:e2e:p1

# Run only P2 (nice-to-have) tests
npm run test:e2e:p2
```

### Combined Scripts

```bash
# Run P0 and P1 tests (for PR validation)
npm run test:e2e:pr

# Run all tests (for deployment)
npm run test:e2e
```

## Test Distribution

### P0 Tests (Critical - 45 tests)

- Home page loading and navigation
- Core submission flow functionality
- Basic navigation between pages
- Question page loading and links

### P1 Tests (Important - 24 tests)

- Loading states and user feedback
- Error handling and edge cases
- Responsive design on mobile/tablet
- Question dropdown navigation
- Submission history preservation

### P2 Tests (Nice-to-have - 8 tests)

- Theme styling and transitions
- Footer and copyright display
- Advanced layout features
- CSS custom properties

## Usage in CI/CD

### Pull Request Validation

```yaml
# In GitHub Actions or similar CI
- name: Run PR Tests
  run: npm run test:e2e:pr
```

### Pre-deployment Testing

```yaml
# Before deploying to production
- name: Run All Tests
  run: npm run test:e2e
```

## Benefits

1. **Faster PR Feedback**: Only run critical and important tests during PR validation
2. **Reduced CI Time**: P0+P1 tests run in ~30 seconds vs ~60 seconds for all tests
3. **Focused Testing**: Different test suites for different purposes
4. **Maintainable**: Clear priority levels make test maintenance easier

## Adding New Tests

When adding new tests, follow these guidelines:

1. **Choose appropriate priority**:
   - P0: Core functionality that breaks the app if it fails
   - P1: Important features that affect user experience
   - P2: Nice-to-have features or styling

2. **Add both annotation and tag**:

   ```typescript
   test('@P0 should have new critical feature', async ({ page }) => {
     test.info().annotations.push({ type: 'priority', description: 'P0' });
     // ... test implementation
   });
   ```

3. **Update this documentation** if adding new test categories

## Troubleshooting

### Tests not running with priority filter

- Ensure test name includes the priority tag (e.g., `@P0`)
- Verify the annotation is added correctly
- Check that `TEST_PRIORITY` environment variable is set

### Performance issues

- P0 tests should complete in under 30 seconds
- P1 tests should complete in under 45 seconds
- If tests are slow, consider moving them to P2 or optimizing

## Future Enhancements

- Add test duration tracking by priority
- Implement parallel execution of different priority levels
- Add priority-based test reporting
- Create priority-based test coverage metrics
