import { describe, it, expect } from 'vitest';
import { validateExamJSON } from './validation';

describe('validateExamJSON', () => {
	const validJSON = JSON.stringify({
		questions: [
			{
				id: 1,
				stem: 'Test question',
				statements: [
					{ text: 'Statement 1', correct: true },
					{ text: 'Statement 2', correct: false },
					{ text: 'Statement 3', correct: true },
					{ text: 'Statement 4', correct: false }
				]
			}
		]
	});

	it('parses valid JSON successfully', () => {
		expect.assertions(3);

		const result = validateExamJSON(validJSON);

		expect(result.success).toBe(true);
		if (result.success) {
			expect(result.data.questions).toHaveLength(1);
			expect(result.data.questions[0].stem).toBe('Test question');
		}
	});

	it('extracts JSON from markdown code block', () => {
		expect.assertions(2);

		const markdownInput = '```json\n' + validJSON + '\n```';
		const result = validateExamJSON(markdownInput);

		expect(result.success).toBe(true);
		if (result.success) {
			expect(result.data.questions).toHaveLength(1);
		}
	});

	it('rejects malformed JSON with clear message', () => {
		expect.assertions(2);

		const result = validateExamJSON('{ invalid json }');

		expect(result.success).toBe(false);
		if (!result.success) {
			expect(result.error).toBe('Invalid JSON syntax');
		}
	});

	it('rejects missing questions array', () => {
		expect.assertions(2);

		const result = validateExamJSON('{}');

		expect(result.success).toBe(false);
		if (!result.success) {
			expect(result.error).toBe("Missing 'questions' array");
		}
	});

	it('rejects question with wrong statement count', () => {
		expect.assertions(2);

		const wrongCount = JSON.stringify({
			questions: [
				{
					id: 1,
					stem: 'Test question',
					statements: [
						{ text: 'Statement 1', correct: true },
						{ text: 'Statement 2', correct: false }
					]
				}
			]
		});

		const result = validateExamJSON(wrongCount);

		expect(result.success).toBe(false);
		if (!result.success) {
			expect(result.error).toBe('Question 1 must have exactly 4 statements (found 2)');
		}
	});
});
