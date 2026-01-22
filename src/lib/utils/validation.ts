import type { ExamJSON } from '$lib/types';

type ValidationResult = { success: true; data: ExamJSON } | { success: false; error: string };

/**
 * Validates and parses exam JSON input, including extraction from markdown code blocks.
 */
export function validateExamJSON(input: string): ValidationResult {
	// Strip markdown code fences if present
	const jsonString = extractJSON(input);

	// Parse JSON
	let parsed: unknown;
	try {
		parsed = JSON.parse(jsonString);
	} catch {
		return { success: false, error: 'Invalid JSON syntax' };
	}

	// Validate structure
	if (
		typeof parsed !== 'object' ||
		parsed === null ||
		!('questions' in parsed) ||
		!Array.isArray((parsed as { questions: unknown }).questions)
	) {
		return { success: false, error: "Missing 'questions' array" };
	}

	const questions = (parsed as { questions: unknown[] }).questions;

	if (questions.length === 0) {
		return { success: false, error: 'Questions array is empty' };
	}

	// Validate each question
	for (const question of questions) {
		const validationError = validateQuestion(question);
		if (validationError) {
			return { success: false, error: validationError };
		}
	}

	return { success: true, data: parsed as ExamJSON };
}

function extractJSON(input: string): string {
	const trimmed = input.trim();

	// Match ```json ... ``` or ``` ... ```
	const codeBlockMatch = trimmed.match(/^```(?:json)?\s*\n?([\s\S]*?)\n?```$/);
	if (codeBlockMatch) {
		return codeBlockMatch[1].trim();
	}

	return trimmed;
}

function validateQuestion(question: unknown): string | null {
	if (typeof question !== 'object' || question === null) {
		return 'Invalid question format';
	}

	const q = question as Record<string, unknown>;

	if (typeof q.id !== 'number') {
		return 'Question missing numeric id';
	}

	if (typeof q.stem !== 'string' || q.stem.trim() === '') {
		return `Question ${q.id}: missing or empty stem`;
	}

	if (!Array.isArray(q.statements)) {
		return `Question ${q.id}: missing statements array`;
	}

	if (q.statements.length !== 4) {
		return `Question ${q.id} must have exactly 4 statements (found ${q.statements.length})`;
	}

	// Validate each statement
	for (let i = 0; i < q.statements.length; i++) {
		const statement = q.statements[i] as unknown;
		const statementError = validateStatement(statement, q.id as number, i + 1);
		if (statementError) {
			return statementError;
		}
	}

	return null;
}

function validateStatement(
	statement: unknown,
	questionId: number,
	statementNum: number
): string | null {
	if (typeof statement !== 'object' || statement === null) {
		return `Question ${questionId}, statement ${statementNum}: invalid format`;
	}

	const s = statement as Record<string, unknown>;

	if (typeof s.text !== 'string' || s.text.trim() === '') {
		return `Question ${questionId}, statement ${statementNum}: missing 'text' or 'correct'`;
	}

	if (typeof s.correct !== 'boolean') {
		return `Question ${questionId}, statement ${statementNum}: missing 'text' or 'correct'`;
	}

	return null;
}
