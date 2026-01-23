import { describe, it, expect } from 'vitest';
import { scoreQuestion, scoreExam, getWrongQuestions } from './scoring';
import type { ExamJSON, QuestionState } from '$lib/types';

describe('scoreQuestion', () => {
	it('returns 2 points for 4/4 correct', () => {
		expect.assertions(1);
		const score = scoreQuestion([true, false, true, false], [true, false, true, false]);
		expect(score).toBe(2);
	});

	it('returns 1 point for 3/4 correct', () => {
		expect.assertions(1);
		const score = scoreQuestion([true, false, true, true], [true, false, true, false]);
		expect(score).toBe(1);
	});

	it('returns 0 points for 2/4 or fewer correct', () => {
		expect.assertions(2);
		const score2 = scoreQuestion([true, true, true, true], [true, false, true, false]);
		const score1 = scoreQuestion([false, false, false, false], [true, false, true, false]);
		expect(score2).toBe(0);
		expect(score1).toBe(0);
	});

	it('treats null answers as wrong', () => {
		expect.assertions(2);
		const score = scoreQuestion([true, null, null, null], [true, false, true, false]);
		expect(score).toBe(0);

		const score3 = scoreQuestion([true, false, true, null], [true, false, true, false]);
		expect(score3).toBe(1);
	});
});

describe('scoreExam', () => {
	const exam: ExamJSON = {
		questions: [
			{
				id: 1,
				stem: 'Q1',
				statements: [
					{ text: 'S1', correct: true },
					{ text: 'S2', correct: false },
					{ text: 'S3', correct: true },
					{ text: 'S4', correct: false }
				]
			},
			{
				id: 2,
				stem: 'Q2',
				statements: [
					{ text: 'S1', correct: true },
					{ text: 'S2', correct: true },
					{ text: 'S3', correct: false },
					{ text: 'S4', correct: false }
				]
			}
		]
	};

	it('calculates totals and breakdown correctly', () => {
		expect.assertions(5);

		const states: QuestionState[] = [
			{ questionId: 1, answers: [true, false, true, false] }, // 2 pts
			{ questionId: 2, answers: [true, true, false, true] } // 3/4 = 1 pt
		];

		const result = scoreExam(exam, states);

		expect(result.totalPoints).toBe(3);
		expect(result.maxPoints).toBe(4);
		expect(result.percentage).toBe(75);
		expect(result.breakdown.twoPoints).toBe(1);
		expect(result.breakdown.onePoint).toBe(1);
	});
});

describe('getWrongQuestions', () => {
	const exam: ExamJSON = {
		questions: [
			{
				id: 1,
				stem: 'Q1',
				statements: [
					{ text: 'S1', correct: true },
					{ text: 'S2', correct: false },
					{ text: 'S3', correct: true },
					{ text: 'S4', correct: false }
				]
			},
			{
				id: 2,
				stem: 'Q2',
				statements: [
					{ text: 'S1', correct: true },
					{ text: 'S2', correct: true },
					{ text: 'S3', correct: false },
					{ text: 'S4', correct: false }
				]
			}
		]
	};

	it('returns only questions with score < 2', () => {
		expect.assertions(3);

		const states: QuestionState[] = [
			{ questionId: 1, answers: [true, false, true, false] }, // 2 pts - perfect
			{ questionId: 2, answers: [true, false, false, true] } // 2/4 = 0 pts
		];

		const wrong = getWrongQuestions(exam, states);

		expect(wrong).toHaveLength(1);
		expect(wrong[0].question.id).toBe(2);
		expect(wrong[0].score).toBe(0);
	});
});
