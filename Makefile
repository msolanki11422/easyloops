# EasyLoops Makefile
# Priority-based testing and development commands

.PHONY: help install lint typecheck test test-e2e test-e2e-p0 test-e2e-p1 test-e2e-p2 test-e2e-pr test-all ci-test clean

# Default target
help:
	@echo "EasyLoops Development Commands"
	@echo "=============================="
	@echo ""
	@echo "Installation:"
	@echo "  install     - Install dependencies"
	@echo ""
	@echo "Code Quality:"
	@echo "  lint        - Run ESLint"
	@echo "  typecheck   - Run TypeScript type checking"
	@echo ""
	@echo "Testing:"
	@echo "  test        - Run unit and integration tests"
	@echo "  test-e2e    - Run all e2e tests"
	@echo "  test-e2e-p0 - Run critical e2e tests only"
	@echo "  test-e2e-p1 - Run important e2e tests only"
	@echo "  test-e2e-p2 - Run nice-to-have e2e tests only"
	@echo "  test-e2e-pr - Run P0 + P1 tests (for PR validation)"
	@echo "  test-all    - Run lint + typecheck + unit + e2e tests"
	@echo ""
	@echo "CI/CD:"
	@echo "  ci-test     - Run lint + typecheck + unit tests (for CI pipeline)"
	@echo ""
	@echo "Utilities:"
	@echo "  clean       - Clean build artifacts and cache"

# Installation
install:
	npm ci

# Code Quality
lint:
	npm run lint

typecheck:
	npm run typecheck

# Unit and Integration Tests
test:
	npm test

# E2E Tests by Priority
test-e2e:
	npm run test:e2e

test-e2e-p0:
	TEST_PRIORITY=P0 npx playwright test --grep "@P0"

test-e2e-p1:
	TEST_PRIORITY=P1 npx playwright test --grep "@P1"

test-e2e-p2:
	TEST_PRIORITY=P2 npx playwright test --grep "@P2"

# PR Validation (P0 + P1 tests)
test-e2e-pr: test-e2e-p0 test-e2e-p1

# All Tests
test-all: lint typecheck test test-e2e

# CI Pipeline Tests (without e2e - run separately)
ci-test: lint typecheck test

# Clean up
clean:
	rm -rf .next
	rm -rf coverage
	rm -rf playwright-report
	rm -rf test-results
	rm -rf node_modules/.cache
	npm run clean 2>/dev/null || true

# Development server
dev:
	npm run dev

# Build
build:
	npm run build

# Start production server
start:
	npm start 