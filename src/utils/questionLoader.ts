import { Question, TestCase } from "@/types";
import { formatQuestionName } from "@/utils/formatters";

export async function loadQuestion(
  questionId: string
): Promise<Question | null> {
  try {
    // Load question description
    const questionResponse = await fetch(
      `/questions/${questionId}/question.md`
    );
    if (!questionResponse.ok) {
      throw new Error(`Failed to load question: ${questionId}`);
    }
    const description = await questionResponse.text();

    // Load testcases manifest
    const manifestResponse = await fetch(
      `/questions/${questionId}/testcases.json`
    );
    if (!manifestResponse.ok) {
      throw new Error(
        `Failed to load testcases manifest for question: ${questionId}`
      );
    }
    const testCases: TestCase[] = await manifestResponse.json();

    // Prepend the question folder to file paths
    const testCasesWithPaths = testCases.map((tc) => ({
      ...tc,
      inputFile: `/questions/${questionId}/${tc.inputFile}`,
      expectedFile: `/questions/${questionId}/${tc.expectedFile}`,
    }));

    return {
      id: questionId,
      name: formatQuestionName(questionId),
      description,
      testCases: testCasesWithPaths,
    };
  } catch (error) {
    console.error(`Error loading question ${questionId}:`, error);
    return null;
  }
}

export async function getAvailableQuestions(): Promise<string[]> {
  try {
    // For now, we'll return a hardcoded list of available questions
    // In a real implementation, you might want to fetch this from an API
    return [
      "01-variable-declaration",
      "02-data-types",
      "02-data-types-conversion",
      "04-arithmetic-operators",
      "12-for-loops-basic-iteration",
      "13-while-loops",
      "14-do-while-loops-where-applicable",
      "15-nested-loops",
      "20-multi-dimensional-arrays",
      "21-basic-string-manipulation",
      "22-string-searching-and-comparison",
      "23-character-manipulation",
      "24-function-definition-and-calling",
      "25-function-parameters-and-arguments",
      "26-return-values-and-types",
      "27-local-vs-global-scope",
      "28-function-overloading-where-applicable",
      "29-basic-recursion",
      "30-recursive-problem-solving",
      "31-basic-exception-handling",
      "32-try-catch-blocks",
      "33-input-validation",
      "34-error-propagation",
      "35-reading-from-files",
      "36-writing-to-files",
      "37-file-processing-line-by-line",
      "38-csv-file-handling",
      "39-json-basics-parsing-simple-structures",
      "40-file-error-handling",
      "41-dynamic-arrays-lists",
      "42-stack-implementation-and-usage",
      "43-queue-implementation-and-usage",
      "44-linked-lists-singly",
      "45-doubly-linked-lists",
      "46-hash-tables-dictionaries",
      "47-sets-and-set-operations",
      "48-trees-binary-trees",
      "49-binary-search-trees",
      "50-tree-traversals",
      "51-higher-order-functions",
      "52-lambda-functions-anonymous-functions",
      "53-function-pointers-references",
      "54-closures",
      "55-decorators-python-function-composition",
      "56-generator-functions",
      "57-iterator-patterns",
      "58-class-definition-and-instantiation",
      "59-instance-variables-and-methods",
      "60-constructors-and-destructors",
      "61-access-modifiers-private-public-protected",
      "62-inheritance-basics",
      "63-method-overriding",
      "64-polymorphism",
      "65-abstract-classes",
      "66-interfaces",
      "67-multiple-inheritance-where-applicable",
      "68-composition-vs-inheritance",
      "69-static-methods-and-variables",
      "70-class-relationships",
      "71-regular-expressions-basics",
      "72-pattern-matching",
      "73-string-formatting",
      "74-unicode-handling",
      "75-text-parsing",
      "76-linear-search",
      "77-binary-search",
      "78-bubble-sort",
      "79-selection-sort",
      "80-insertion-sort",
      "81-merge-sort",
      "82-quick-sort",
      "83-counting-algorithms",
      "84-graph-traversal-bfs",
      "85-graph-traversal-dfs",
      "86-dynamic-programming-basics",
      "87-greedy-algorithms",
      "88-backtracking",
      "89-network-requests-http",
      "90-api-consumption",
      "91-database-connections",
      "92-serialization-deserialization",
      "93-binary-file-handling",
      "94-stream-processing",
      "95-pointers-where-applicable",
      "96-memory-allocation-deallocation",
      "97-garbage-collection-concepts",
      "98-memory-leaks-prevention",
      "99-reference-counting",
    ];
  } catch (error) {
    console.error("Error getting available questions:", error);
    return [];
  }
}
