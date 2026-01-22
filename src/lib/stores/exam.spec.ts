import { describe, it, expect, beforeEach } from 'vitest';
import { examStore } from './exam.svelte';
import type { ExamJSON } from '$lib/types';

const mockExam: ExamJSON = {
	questions: [
		{
			id: 1,
			stem: 'Question 1',
			statements: [
				{ text: 'Statement A', correct: true },
				{ text: 'Statement B', correct: false },
				{ text: 'Statement C', correct: true },
				{ text: 'Statement D', correct: false }
			]
		},
		{
			id: 2,
			stem: 'Question 2',
			statements: [
				{ text: 'Statement W', correct: false },
				{ text: 'Statement X', correct: true },
				{ text: 'Statement Y', correct: false },
				{ text: 'Statement Z', correct: true }
			]
		}
	]
};

describe('examStore', () => {
	beforeEach(() => {
		examStore.reset();
	});

	describe('initial state', () => {
		it('has null session when not started', () => {
			expect.assertions(1);
			expect(examStore.session).toBeNull();
		});
	});

	describe('startSession', () => {
		it('initializes session with exam data', () => {
			expect.assertions(4);
			examStore.startSession(mockExam);

			expect(examStore.session).not.toBeNull();
			expect(examStore.session!.exam).toBe(mockExam);
			expect(examStore.session!.currentIndex).toBe(0);
			expect(examStore.session!.answers).toHaveLength(2);
		});

		it('creates shuffled question order with all questions', () => {
			expect.assertions(2);
			examStore.startSession(mockExam);

			const originalIndices = examStore.session!.questionOrder.map((q) => q.originalIndex);
			expect(originalIndices).toHaveLength(2);
			expect(originalIndices.sort()).toEqual([0, 1]);
		});

		it('creates shuffled statement order for each question', () => {
			expect.assertions(2);
			examStore.startSession(mockExam);

			for (const shuffled of examStore.session!.questionOrder) {
				expect(shuffled.statementOrder.sort()).toEqual([0, 1, 2, 3]);
			}
		});

		it('initializes answers with null values', () => {
			expect.assertions(2);
			examStore.startSession(mockExam);

			for (const answer of examStore.session!.answers) {
				expect(answer.answers).toEqual([null, null, null, null]);
			}
		});
	});

	describe('currentQuestion', () => {
		it('returns null when no session', () => {
			expect.assertions(1);
			expect(examStore.currentQuestion).toBeNull();
		});

		it('returns the current question based on shuffled order', () => {
			expect.assertions(1);
			examStore.startSession(mockExam);

			const currentQ = examStore.currentQuestion;
			const shuffledIndex = examStore.session!.questionOrder[0].originalIndex;
			expect(currentQ).toBe(mockExam.questions[shuffledIndex]);
		});
	});

	describe('currentAnswers', () => {
		it('returns null when no session', () => {
			expect.assertions(1);
			expect(examStore.currentAnswers).toBeNull();
		});

		it('returns answers for current question', () => {
			expect.assertions(1);
			examStore.startSession(mockExam);

			expect(examStore.currentAnswers).toBe(examStore.session!.answers[0]);
		});
	});

	describe('setAnswer', () => {
		it('sets answer for the specified statement index', () => {
			expect.assertions(2);
			examStore.startSession(mockExam);

			examStore.setAnswer(0, true);
			expect(examStore.currentAnswers!.answers[0]).toBe(true);

			examStore.setAnswer(2, false);
			expect(examStore.currentAnswers!.answers[2]).toBe(false);
		});
	});

	describe('navigation', () => {
		beforeEach(() => {
			examStore.startSession(mockExam);
		});

		it('goToQuestion navigates to specified index', () => {
			expect.assertions(1);
			examStore.goToQuestion(1);
			expect(examStore.session!.currentIndex).toBe(1);
		});

		it('goToQuestion clamps to valid range', () => {
			expect.assertions(2);
			examStore.goToQuestion(-1);
			expect(examStore.session!.currentIndex).toBe(0);

			examStore.goToQuestion(100);
			expect(examStore.session!.currentIndex).toBe(1);
		});

		it('nextQuestion advances to next', () => {
			expect.assertions(1);
			examStore.nextQuestion();
			expect(examStore.session!.currentIndex).toBe(1);
		});

		it('nextQuestion does not go past last', () => {
			expect.assertions(1);
			examStore.goToQuestion(1);
			examStore.nextQuestion();
			expect(examStore.session!.currentIndex).toBe(1);
		});

		it('prevQuestion goes to previous', () => {
			expect.assertions(1);
			examStore.goToQuestion(1);
			examStore.prevQuestion();
			expect(examStore.session!.currentIndex).toBe(0);
		});

		it('prevQuestion does not go below zero', () => {
			expect.assertions(1);
			examStore.prevQuestion();
			expect(examStore.session!.currentIndex).toBe(0);
		});
	});

	describe('isComplete', () => {
		it('returns false when no session', () => {
			expect.assertions(1);
			expect(examStore.isComplete).toBe(false);
		});

		it('returns false when not all answers are set', () => {
			expect.assertions(1);
			examStore.startSession(mockExam);
			examStore.setAnswer(0, true);
			expect(examStore.isComplete).toBe(false);
		});

		it('returns true when all questions have all answers', () => {
			expect.assertions(1);
			examStore.startSession(mockExam);

			// Answer all statements for question 0
			for (let i = 0; i < 4; i++) {
				examStore.setAnswer(i, true);
			}

			// Answer all statements for question 1
			examStore.goToQuestion(1);
			for (let i = 0; i < 4; i++) {
				examStore.setAnswer(i, false);
			}

			expect(examStore.isComplete).toBe(true);
		});
	});

	describe('reset', () => {
		it('clears the session', () => {
			expect.assertions(1);
			examStore.startSession(mockExam);
			examStore.reset();
			expect(examStore.session).toBeNull();
		});
	});
});
