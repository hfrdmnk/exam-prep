import type { ExamJSON, ExamSession, Question, QuestionState, ShuffledQuestion } from '$lib/types';

function shuffleArray<T>(array: T[]): T[] {
	const result = [...array];
	for (let i = result.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[result[i], result[j]] = [result[j], result[i]];
	}
	return result;
}

function createShuffledQuestionOrder(exam: ExamJSON): ShuffledQuestion[] {
	const indices = exam.questions.map((_, i) => i);
	const shuffledIndices = shuffleArray(indices);

	return shuffledIndices.map((originalIndex) => ({
		originalIndex,
		statementOrder: shuffleArray([0, 1, 2, 3])
	}));
}

function createInitialAnswers(exam: ExamJSON): QuestionState[] {
	return exam.questions.map((q) => ({
		questionId: q.id,
		answers: [null, null, null, null]
	}));
}

let session = $state<ExamSession | null>(null);

export const examStore = {
	get session(): ExamSession | null {
		return session;
	},

	get currentQuestion(): Question | null {
		if (!session) return null;
		const shuffled = session.questionOrder[session.currentIndex];
		return session.exam.questions[shuffled.originalIndex];
	},

	get currentAnswers(): QuestionState | null {
		if (!session) return null;
		const originalIndex = session.questionOrder[session.currentIndex].originalIndex;
		return session.answers[originalIndex];
	},

	get isComplete(): boolean {
		if (!session) return false;
		return session.answers.every((a) => a.answers.every((v) => v !== null));
	},

	startSession(exam: ExamJSON): void {
		session = {
			exam,
			questionOrder: createShuffledQuestionOrder(exam),
			answers: createInitialAnswers(exam),
			currentIndex: 0
		};
	},

	setAnswer(statementIndex: number, value: boolean): void {
		if (!session) return;
		const originalIndex = session.questionOrder[session.currentIndex].originalIndex;
		session.answers[originalIndex].answers[statementIndex] = value;
	},

	goToQuestion(index: number): void {
		if (!session) return;
		const maxIndex = session.questionOrder.length - 1;
		session.currentIndex = Math.max(0, Math.min(index, maxIndex));
	},

	nextQuestion(): void {
		if (!session) return;
		this.goToQuestion(session.currentIndex + 1);
	},

	prevQuestion(): void {
		if (!session) return;
		this.goToQuestion(session.currentIndex - 1);
	},

	reset(): void {
		session = null;
	}
};
