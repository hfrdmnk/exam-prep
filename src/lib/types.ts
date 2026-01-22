// JSON structure from NotebookLM
export interface ExamJSON {
	questions: Question[];
}

export interface Question {
	id: number;
	stem: string;
	statements: Statement[];
}

export interface Statement {
	text: string;
	correct: boolean;
}

// Quiz state tracking
export interface QuestionState {
	questionId: number;
	answers: [boolean | null, boolean | null, boolean | null, boolean | null];
}

// Internal state tracking randomized order
export interface ShuffledQuestion {
	originalIndex: number; // Index in original ExamJSON
	statementOrder: number[]; // e.g., [2, 0, 3, 1] for shuffled statements
}

export interface ExamSession {
	exam: ExamJSON;
	questionOrder: ShuffledQuestion[]; // Randomized question + statement order
	answers: QuestionState[];
	currentIndex: number;
}
