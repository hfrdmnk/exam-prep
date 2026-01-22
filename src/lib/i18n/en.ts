export interface Translations {
	appName: string;
	setup: {
		title: string;
		topicLabel: string;
		topicPlaceholder: string;
		questionCountLabel: string;
		languageLabel: string;
		generatePrompt: string;
		copyPrompt: string;
		copied: string;
		continueToImport: string;
	};
	import: {
		title: string;
		instructions: string;
		placeholder: string;
		startExam: string;
		errors: {
			invalidJson: string;
			missingQuestions: string;
			emptyQuestions: string;
			invalidQuestion: string;
			wrongStatementCount: string;
			missingStatementText: string;
			missingStatementCorrect: string;
		};
	};
	quiz: {
		question: string;
		of: string;
		true: string;
		false: string;
		finishExam: string;
		confirmFinish: string;
		cancel: string;
		confirm: string;
	};
	results: {
		title: string;
		score: string;
		points: string;
		maxPoints: string;
		percentage: string;
		breakdown: string;
		perfect: string;
		partial: string;
		failed: string;
		questions: string;
		allCorrect: string;
		copyReviewPrompt: string;
		newExam: string;
	};
	languages: {
		en: string;
		de: string;
	};
	warnings: {
		unsavedProgress: string;
	};
}

export const en: Translations = {
	// Common
	appName: "K' Exam Prep",

	// Setup Screen (/)
	setup: {
		title: 'Setup Your Exam',
		topicLabel: 'Topic',
		topicPlaceholder: 'e.g., Biochemistry, Constitutional Law',
		questionCountLabel: 'Number of Questions',
		languageLabel: 'Language',
		generatePrompt: 'Generate Prompt',
		copyPrompt: 'Copy Prompt',
		copied: 'Copied!',
		continueToImport: 'Continue to Import'
	},

	// Import Screen (/import)
	import: {
		title: 'Import Questions',
		instructions: 'Paste the JSON output from NotebookLM below',
		placeholder: 'Paste JSON here...',
		startExam: 'Start Exam',
		errors: {
			invalidJson: 'Invalid JSON format',
			missingQuestions: 'Missing "questions" array',
			emptyQuestions: 'Questions array is empty',
			invalidQuestion: 'Question {n} is invalid',
			wrongStatementCount: 'Question {n} has {count} statements (expected 4)',
			missingStatementText: 'Question {n}, statement {s}: missing text',
			missingStatementCorrect: 'Question {n}, statement {s}: missing correct value'
		}
	},

	// Quiz Screen (/quiz)
	quiz: {
		question: 'Question',
		of: 'of',
		true: 'True',
		false: 'False',
		finishExam: 'Finish Exam',
		confirmFinish: 'You have {count} unanswered question(s). Finish anyway?',
		cancel: 'Cancel',
		confirm: 'Finish'
	},

	// Results Screen (/results)
	results: {
		title: 'Results',
		score: 'Score',
		points: 'points',
		maxPoints: 'Maximum',
		percentage: 'Percentage',
		breakdown: 'Breakdown',
		perfect: '4/4 correct',
		partial: '3/4 correct',
		failed: '2 or fewer correct',
		questions: 'questions',
		allCorrect: 'Perfect score! You got everything right.',
		copyReviewPrompt: 'Copy Review Prompt',
		newExam: 'New Exam'
	},

	// Language names
	languages: {
		en: 'English',
		de: 'Deutsch'
	},

	// Warnings
	warnings: {
		unsavedProgress: 'You have an exam in progress. Are you sure you want to leave?'
	}
};
