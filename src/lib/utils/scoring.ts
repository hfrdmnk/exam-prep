import type { ExamJSON, Question, QuestionState } from '$lib/types';

type Answers = [boolean | null, boolean | null, boolean | null, boolean | null];
type CorrectAnswers = [boolean, boolean, boolean, boolean];

/**
 * Score a single K-prime question.
 * 4/4 correct = 4 points
 * 3/4 correct = 2 points
 * ≤2/4 correct = 0 points
 * null answers count as wrong.
 */
export function scoreQuestion(answers: Answers, correct: CorrectAnswers): number {
	let correctCount = 0;
	for (let i = 0; i < 4; i++) {
		const answer = answers[i];
		if (answer !== null && answer === correct[i]) {
			correctCount++;
		}
	}

	if (correctCount === 4) return 4;
	if (correctCount === 3) return 2;
	return 0;
}

/**
 * Score an entire exam.
 */
export function scoreExam(
	exam: ExamJSON,
	states: QuestionState[]
): {
	totalPoints: number;
	maxPoints: number;
	percentage: number;
	breakdown: { fourPoints: number; twoPoints: number; zeroPoints: number };
} {
	const breakdown = { fourPoints: 0, twoPoints: 0, zeroPoints: 0 };
	let totalPoints = 0;

	for (const question of exam.questions) {
		const state = states.find((s) => s.questionId === question.id);
		const answers: Answers = state?.answers ?? [null, null, null, null];
		const correct = question.statements.map((s) => s.correct) as CorrectAnswers;

		const score = scoreQuestion(answers, correct);
		totalPoints += score;

		if (score === 4) breakdown.fourPoints++;
		else if (score === 2) breakdown.twoPoints++;
		else breakdown.zeroPoints++;
	}

	const maxPoints = exam.questions.length * 4;
	const percentage = maxPoints > 0 ? Math.round((totalPoints / maxPoints) * 100) : 0;

	return { totalPoints, maxPoints, percentage, breakdown };
}

/**
 * Get questions that scored less than 4 points (for review).
 */
export function getWrongQuestions(
	exam: ExamJSON,
	states: QuestionState[]
): Array<{ question: Question; state: QuestionState; score: number }> {
	const result: Array<{ question: Question; state: QuestionState; score: number }> = [];

	for (const question of exam.questions) {
		const state = states.find((s) => s.questionId === question.id) ?? {
			questionId: question.id,
			answers: [null, null, null, null] as Answers
		};
		const correct = question.statements.map((s) => s.correct) as CorrectAnswers;
		const score = scoreQuestion(state.answers, correct);

		if (score < 4) {
			result.push({ question, state, score });
		}
	}

	return result;
}
