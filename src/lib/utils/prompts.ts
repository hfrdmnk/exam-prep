import type { Question, QuestionState } from '$lib/types';

type Language = 'en' | 'de';

const examPromptEN = `You are an exam question generator. Create exactly {count} K-prime questions for the topic "{topic}".

REQUIREMENTS:
- Each question has exactly 4 statements that are either true or false
- CRITICAL: Vary the number of true statements per question — use the full range (0, 1, 2, 3, or 4 true statements). Do NOT cluster around any single pattern.
- Draw questions from ALL different areas of the provided sources — ensure broad coverage
- Balance the difficulty:
  - ~40% nuanced questions requiring detailed knowledge
  - ~60% high-yield questions covering fundamental concepts (80/20 principle)
- Questions should test understanding, not just memorization
- Make false statements plausible — they should require actual knowledge to identify

OUTPUT FORMAT:
Return ONLY a JSON code block. No introduction, no explanation, no text outside the code block.

\`\`\`json
{
  "questions": [
    {
      "id": 1,
      "stem": "Example with 2 true statements",
      "statements": [
        { "text": "First statement", "correct": true },
        { "text": "Second statement", "correct": false },
        { "text": "Third statement", "correct": true },
        { "text": "Fourth statement", "correct": false }
      ]
    },
    {
      "id": 2,
      "stem": "Example with 4 true statements",
      "statements": [
        { "text": "First statement", "correct": true },
        { "text": "Second statement", "correct": true },
        { "text": "Third statement", "correct": true },
        { "text": "Fourth statement", "correct": true }
      ]
    },
    {
      "id": 3,
      "stem": "Example with 0 true statements",
      "statements": [
        { "text": "First statement", "correct": false },
        { "text": "Second statement", "correct": false },
        { "text": "Third statement", "correct": false },
        { "text": "Fourth statement", "correct": false }
      ]
    },
    {
      "id": 4,
      "stem": "Example with 3 true statements",
      "statements": [
        { "text": "First statement", "correct": true },
        { "text": "Second statement", "correct": true },
        { "text": "Third statement", "correct": false },
        { "text": "Fourth statement", "correct": true }
      ]
    },
    {
      "id": 5,
      "stem": "Example with 1 true statement",
      "statements": [
        { "text": "First statement", "correct": false },
        { "text": "Second statement", "correct": true },
        { "text": "Third statement", "correct": false },
        { "text": "Fourth statement", "correct": false }
      ]
    }
  ]
}
\`\`\`

Generate exactly {count} questions now.`;

const examPromptDE = `Du bist ein Prüfungsfragen-Generator. Erstelle genau {count} K-Prim-Fragen zum Thema "{topic}".

ANFORDERUNGEN:
- Jede Frage hat genau 4 Aussagen, die entweder wahr oder falsch sind
- KRITISCH: Variiere die Anzahl der wahren Aussagen pro Frage — nutze die volle Bandbreite (0, 1, 2, 3 oder 4 wahre Aussagen). NICHT auf ein Muster festlegen.
- Ziehe Fragen aus ALLEN verschiedenen Bereichen der bereitgestellten Quellen — stelle eine breite Abdeckung sicher (querbeet)
- Ausgewogene Schwierigkeit:
  - ~40% Detailfragen, die tiefes Wissen erfordern
  - ~60% High-Yield-Fragen zu fundamentalen Konzepten (80/20-Prinzip)
- Fragen sollen Verständnis prüfen, nicht nur Auswendiglernen
- Falsche Aussagen sollen plausibel sein — man muss wirklich Bescheid wissen, um sie zu erkennen

AUSGABEFORMAT:
Gib NUR einen JSON-Codeblock zurück. Keine Einleitung, keine Erklärung, kein Text ausserhalb des Codeblocks.

\`\`\`json
{
  "questions": [
    {
      "id": 1,
      "stem": "Beispiel mit 2 wahren Aussagen",
      "statements": [
        { "text": "Erste Aussage", "correct": true },
        { "text": "Zweite Aussage", "correct": false },
        { "text": "Dritte Aussage", "correct": true },
        { "text": "Vierte Aussage", "correct": false }
      ]
    },
    {
      "id": 2,
      "stem": "Beispiel mit 4 wahren Aussagen",
      "statements": [
        { "text": "Erste Aussage", "correct": true },
        { "text": "Zweite Aussage", "correct": true },
        { "text": "Dritte Aussage", "correct": true },
        { "text": "Vierte Aussage", "correct": true }
      ]
    },
    {
      "id": 3,
      "stem": "Beispiel mit 0 wahren Aussagen",
      "statements": [
        { "text": "Erste Aussage", "correct": false },
        { "text": "Zweite Aussage", "correct": false },
        { "text": "Dritte Aussage", "correct": false },
        { "text": "Vierte Aussage", "correct": false }
      ]
    },
    {
      "id": 4,
      "stem": "Beispiel mit 3 wahren Aussagen",
      "statements": [
        { "text": "Erste Aussage", "correct": true },
        { "text": "Zweite Aussage", "correct": true },
        { "text": "Dritte Aussage", "correct": false },
        { "text": "Vierte Aussage", "correct": true }
      ]
    },
    {
      "id": 5,
      "stem": "Beispiel mit 1 wahren Aussage",
      "statements": [
        { "text": "Erste Aussage", "correct": false },
        { "text": "Zweite Aussage", "correct": true },
        { "text": "Dritte Aussage", "correct": false },
        { "text": "Vierte Aussage", "correct": false }
      ]
    }
  ]
}
\`\`\`

Generiere jetzt genau {count} Fragen.`;

const reviewPromptEN = `I just took a practice exam and got these questions wrong. For each one, please:
1. Explain why each statement is true or false
2. Identify the key concepts I need to review
3. Point me to where in the sources I can find this information

QUESTIONS I GOT WRONG:

{questions}

Please explain these concepts clearly and help me understand what I missed.`;

const reviewPromptDE = `Ich habe gerade eine Übungsprüfung gemacht und diese Fragen falsch beantwortet. Bitte für jede Frage:
1. Erkläre, warum jede Aussage wahr oder falsch ist
2. Identifiziere die Schlüsselkonzepte, die ich repetieren muss
3. Zeige mir, wo in den Quellen ich diese Informationen finde

FALSCH BEANTWORTETE FRAGEN:

{questions}

Bitte erkläre diese Konzepte verständlich und hilf mir zu verstehen, was ich übersehen habe.`;

const noWrongQuestionsEN = 'Congratulations! You answered all questions correctly.';
const noWrongQuestionsDE = 'Gratulation! Du hast alle Fragen richtig beantwortet.';

/**
 * Generate a prompt for NotebookLM to create K-prime exam questions.
 */
export function generateExamPrompt(topic: string, count: number, language: Language): string {
	const template = language === 'de' ? examPromptDE : examPromptEN;
	return template.replace(/{topic}/g, topic).replace(/{count}/g, String(count));
}

/**
 * Generate a review prompt listing wrong questions with user answers vs correct answers.
 */
export function generateReviewPrompt(
	wrongQuestions: Array<{ question: Question; state: QuestionState }>,
	language: Language
): string {
	if (wrongQuestions.length === 0) {
		return language === 'de' ? noWrongQuestionsDE : noWrongQuestionsEN;
	}

	const template = language === 'de' ? reviewPromptDE : reviewPromptEN;
	const questionsText = wrongQuestions
		.map(({ question, state }, index) => {
			const questionNum = index + 1;
			const statementsText = question.statements
				.map((statement, i) => {
					const userAnswer = state.answers[i];
					const userAnswerText =
						userAnswer === null
							? language === 'de'
								? 'unbeantwortet'
								: 'unanswered'
							: userAnswer
								? 'true'
								: 'false';
					const correctText = statement.correct ? 'true' : 'false';

					return language === 'de'
						? `- Aussage: "${statement.text}" — Meine Antwort: ${userAnswerText}, korrekt war: ${correctText}`
						: `- Statement: "${statement.text}" — I answered ${userAnswerText}, correct was ${correctText}`;
				})
				.join('\n');

			return language === 'de'
				? `Frage ${questionNum}: ${question.stem}\n${statementsText}`
				: `Question ${questionNum}: ${question.stem}\n${statementsText}`;
		})
		.join('\n\n');

	return template.replace('{questions}', questionsText);
}
