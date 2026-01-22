import type { Translations } from './en';

export const de: Translations = {
	// Common
	appName: "K' Prüfungsvorbereitung",

	// Setup Screen (/)
	setup: {
		title: 'Prüfung einrichten',
		topicLabel: 'Thema',
		topicPlaceholder: 'z.B. Biochemie, Staatsrecht',
		questionCountLabel: 'Anzahl Fragen',
		languageLabel: 'Sprache',
		generatePrompt: 'Prompt generieren',
		copyPrompt: 'Prompt kopieren',
		copied: 'Kopiert!',
		continueToImport: 'Weiter zum Import'
	},

	// Import Screen (/import)
	import: {
		title: 'Fragen importieren',
		instructions: 'Füge die JSON-Ausgabe von NotebookLM unten ein',
		placeholder: 'JSON hier einfügen...',
		startExam: 'Prüfung starten',
		errors: {
			invalidJson: 'Ungültiges JSON-Format',
			missingQuestions: 'Fehlendes "questions" Array',
			emptyQuestions: 'Fragen-Array ist leer',
			invalidQuestion: 'Frage {n} ist ungültig',
			wrongStatementCount: 'Frage {n} hat {count} Aussagen (erwartet: 4)',
			missingStatementText: 'Frage {n}, Aussage {s}: Text fehlt',
			missingStatementCorrect: 'Frage {n}, Aussage {s}: correct-Wert fehlt'
		}
	},

	// Quiz Screen (/quiz)
	quiz: {
		question: 'Frage',
		of: 'von',
		true: 'Wahr',
		false: 'Falsch',
		finishExam: 'Prüfung beenden',
		confirmFinish: 'Du hast {count} unbeantwortete Frage(n). Trotzdem beenden?',
		cancel: 'Abbrechen',
		confirm: 'Beenden'
	},

	// Results Screen (/results)
	results: {
		title: 'Ergebnisse',
		score: 'Punkte',
		points: 'Punkte',
		maxPoints: 'Maximum',
		percentage: 'Prozent',
		breakdown: 'Aufschlüsselung',
		perfect: '4/4 richtig',
		partial: '3/4 richtig',
		failed: '2 oder weniger richtig',
		questions: 'Fragen',
		allCorrect: 'Perfekte Punktzahl! Du hast alles richtig.',
		copyReviewPrompt: 'Review-Prompt kopieren',
		newExam: 'Neue Prüfung'
	},

	// Language names
	languages: {
		en: 'English',
		de: 'Deutsch'
	},

	// Warnings
	warnings: {
		unsavedProgress:
			'Du hast eine laufende Prüfung. Bist du sicher, dass du die Seite verlassen willst?'
	}
};
