import { describe, it, expect } from 'vitest';
import { generateExamPrompt, generateReviewPrompt } from './prompts';
import type { Question, QuestionState } from '$lib/types';

describe('generateExamPrompt', () => {
	it('includes topic and count in the prompt', () => {
		expect.assertions(2);

		const result = generateExamPrompt('Biochemistry', 10, 'en');

		expect(result).toContain('Biochemistry');
		expect(result).toContain('10');
	});

	it('returns German prompt for de language', () => {
		expect.assertions(2);

		const result = generateExamPrompt('Biochemie', 5, 'de');

		expect(result).toContain('Prüfungsfragen-Generator');
		expect(result).toContain('Biochemie');
	});
});

describe('generateReviewPrompt', () => {
	const question: Question = {
		id: 1,
		stem: 'Test question stem',
		statements: [
			{ text: 'Statement 1', correct: true },
			{ text: 'Statement 2', correct: false },
			{ text: 'Statement 3', correct: true },
			{ text: 'Statement 4', correct: false }
		]
	};

	const state: QuestionState = {
		questionId: 1,
		answers: [true, true, null, false] // 2 correct, 1 unanswered
	};

	it('formats wrong questions correctly', () => {
		expect.assertions(4);

		const result = generateReviewPrompt([{ question, state }], 'en');

		expect(result).toContain('Test question stem');
		expect(result).toContain('Statement 1');
		expect(result).toContain('unanswered');
		expect(result).toContain('correct was true');
	});

	it('returns appropriate message for empty wrong questions', () => {
		expect.assertions(2);

		const resultEN = generateReviewPrompt([], 'en');
		const resultDE = generateReviewPrompt([], 'de');

		expect(resultEN).toContain('Congratulations');
		expect(resultDE).toContain('Gratulation');
	});
});
