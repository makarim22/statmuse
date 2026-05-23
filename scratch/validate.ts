import { quizQuestions } from "../src/data/quizData.ts";

console.log("=== Quiz Questions Validation ===");
console.log(`Total questions loaded: ${quizQuestions.length}`);

// Verify structure of all questions
let invalidQuestionsCount = 0;
const ids = new Set<string>();
const duplicateIds = new Set<string>();

quizQuestions.forEach((q, index) => {
  if (!q.id || !q.question || !q.options || q.options.length < 2 || q.correctAnswer === undefined || q.correctAnswer < 0 || q.correctAnswer >= q.options.length || !q.explanation) {
    console.error(`Invalid question at index ${index}:`, q);
    invalidQuestionsCount++;
  }
  if (ids.has(q.id)) {
    duplicateIds.add(q.id);
  }
  ids.add(q.id);
});

console.log(`Invalid questions count: ${invalidQuestionsCount}`);
console.log(`Unique IDs count: ${ids.size}`);
if (duplicateIds.size > 0) {
  console.error(`Duplicate IDs found:`, Array.from(duplicateIds));
} else {
  console.log("No duplicate IDs found!");
}
console.log("=================================");
