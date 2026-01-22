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
