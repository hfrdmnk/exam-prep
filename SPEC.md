# K' Exam Prep Tool — Specification

## Overview

A minimal SvelteKit application for K' (K-prime) exam preparation. The tool generates prompts for NotebookLM to create exam questions from user-provided sources, then runs a quiz session with delayed feedback to support genuine active recall.

**Design Philosophy:** What Johnny Ive or Dieter Rams would build for exam prep. Minimal, functional, focused. The Apple/Whoop of learning tools.

---

## K' Question Format

K-prime questions consist of **4 statements** that must each be marked true or false.

### Scoring Rules

| Correct Answers | Points |
| --------------- | ------ |
| 4/4             | 4      |
| 3/4             | 2      |
| 2 or fewer      | 0      |

Unanswered sub-questions count as wrong.

---

## User Flow

### 1. Setup Screen (`/`)

The user configures their exam session:

| Field               | Type          | Description                                                   |
| ------------------- | ------------- | ------------------------------------------------------------- |
| Topic               | Text input    | The exam subject (e.g., "Biochemistry", "Constitutional Law") |
| Number of Questions | Number input  | How many K' questions to generate (each has 4 sub-questions)  |
| Language            | Toggle/Select | German or English — affects both UI and generated questions   |

**Output:** A "Generate Prompt" button that produces a copyable prompt for NotebookLM.

### 2. Prompt Generation

The generated prompt must instruct NotebookLM to:

1. Generate **exactly** the specified number of questions
2. Pull questions from **all areas** of the provided sources ("querbeet")
3. Include a **balanced mix**:
   - Nuanced questions requiring detailed knowledge
   - Questions following the 80/20 principle (high-yield fundamentals)
4. Return **only** a JSON code block — no preamble, no explanations
5. Generate content in the **selected language**

#### Prompt Template (English version)

````
You are an exam question generator. Create exactly {count} K-prime questions for the topic "{topic}".

REQUIREMENTS:
- Each question has exactly 4 statements that are either true or false
- Draw questions from ALL different areas of the provided sources — ensure broad coverage
- Balance the difficulty:
  - ~40% nuanced questions requiring detailed knowledge
  - ~60% high-yield questions covering fundamental concepts (80/20 principle)
- Questions should test understanding, not just memorization
- Make false statements plausible — they should require actual knowledge to identify

OUTPUT FORMAT:
Return ONLY a JSON code block. No introduction, no explanation, no text outside the code block.

```json
{
  "questions": [
    {
      "id": 1,
      "stem": "The question stem or scenario",
      "statements": [
        { "text": "First statement", "correct": true },
        { "text": "Second statement", "correct": false },
        { "text": "Third statement", "correct": true },
        { "text": "Fourth statement", "correct": false }
      ]
    }
  ]
}
````

Generate exactly {count} questions now.

```

#### Prompt Template (German version)

```

Du bist ein Prüfungsfragen-Generator. Erstelle genau {count} K-Prim-Fragen zum Thema "{topic}".

ANFORDERUNGEN:

- Jede Frage hat genau 4 Aussagen, die entweder wahr oder falsch sind
- Ziehe Fragen aus ALLEN verschiedenen Bereichen der bereitgestellten Quellen — stelle eine breite Abdeckung sicher (querbeet)
- Ausgewogene Schwierigkeit:
  - ~40% Detailfragen, die tiefes Wissen erfordern
  - ~60% High-Yield-Fragen zu fundamentalen Konzepten (80/20-Prinzip)
- Fragen sollen Verständnis prüfen, nicht nur Auswendiglernen
- Falsche Aussagen sollen plausibel sein — man muss wirklich Bescheid wissen, um sie zu erkennen

AUSGABEFORMAT:
Gib NUR einen JSON-Codeblock zurück. Keine Einleitung, keine Erklärung, kein Text ausserhalb des Codeblocks.

```json
{
	"questions": [
		{
			"id": 1,
			"stem": "Die Fragestellung oder das Szenario",
			"statements": [
				{ "text": "Erste Aussage", "correct": true },
				{ "text": "Zweite Aussage", "correct": false },
				{ "text": "Dritte Aussage", "correct": true },
				{ "text": "Vierte Aussage", "correct": false }
			]
		}
	]
}
```

Generiere jetzt genau {count} Fragen.

````

### 3. JSON Input Screen (`/import`)

After copying the prompt and getting results from NotebookLM:

- Large text area for pasting the JSON
- The app should extract JSON from within code blocks (users may paste the full response)
- Validation with clear error messages if JSON is malformed
- "Start Exam" button

### 4. Quiz Screen (`/quiz`)

#### Layout
- **Main area:** Current question with 4 statement toggles (true/false for each)
- **Sidebar:** Question navigator showing:
  - Question numbers (1, 2, 3...)
  - Status indicators: answered (filled) / unanswered (empty) / current (highlighted)
  - Click to jump to any question

#### Behavior
- Questions are **randomized** at session start
- Statement order within questions is **also randomized**
- No feedback after answering — user doesn't know if they're right
- "Finish Exam" button (with confirmation if unanswered questions remain)

#### State per Question
```typescript
interface QuestionState {
  questionId: number;
  answers: [boolean | null, boolean | null, boolean | null, boolean | null];
}
````

### 5. Results Screen (`/results`)

#### Score Display

- Total points achieved
- Maximum possible points
- Percentage
- Breakdown: how many questions scored 4, 2, or 0 points

#### Review Prompt Generation

A "Copy Review Prompt" button generates a prompt for NotebookLM that includes:

- Only the questions the user got **wrong** (scored 0 or 2 points)
- The user's answers vs. correct answers
- Request for explanation of concepts and where to find them in sources

#### Review Prompt Template (English)

```
I just took a practice exam and got these questions wrong. For each one, please:
1. Explain why each statement is true or false
2. Identify the key concepts I need to review
3. Point me to where in the sources I can find this information

QUESTIONS I GOT WRONG:

{foreach wrong question}
Question {n}: {stem}
- Statement: "{text}" — I answered {userAnswer}, correct was {correctAnswer}
- Statement: "{text}" — I answered {userAnswer}, correct was {correctAnswer}
...
{/foreach}

Please explain these concepts clearly and help me understand what I missed.
```

#### Review Prompt Template (German)

```
Ich habe gerade eine Übungsprüfung gemacht und diese Fragen falsch beantwortet. Bitte für jede Frage:
1. Erkläre, warum jede Aussage wahr oder falsch ist
2. Identifiziere die Schlüsselkonzepte, die ich repetieren muss
3. Zeige mir, wo in den Quellen ich diese Informationen finde

FALSCH BEANTWORTETE FRAGEN:

{foreach wrong question}
Frage {n}: {stem}
- Aussage: "{text}" — Meine Antwort: {userAnswer}, korrekt war: {correctAnswer}
- Aussage: "{text}" — Meine Antwort: {userAnswer}, korrekt war: {correctAnswer}
...
{/foreach}

Bitte erkläre diese Konzepte verständlich und hilf mir zu verstehen, was ich übersehen habe.
```

#### Actions

- "Copy Review Prompt" button
- "New Exam" button → returns to setup

---

## JSON Schema

```typescript
interface ExamJSON {
	questions: Question[];
}

interface Question {
	id: number;
	stem: string;
	statements: Statement[];
}

interface Statement {
	text: string;
	correct: boolean;
}
```

Validation requirements:

- `questions` array must exist and have length > 0
- Each question must have exactly 4 statements
- Each statement must have `text` (string) and `correct` (boolean)

---

## Internationalization (i18n)

### Supported Languages

- English (`en`)
- German (`de`)

### Persistence

- Language preference stored in `localStorage` under key `kprime-lang`
- Default to browser language if supported, otherwise English

### Implementation

- Use a simple key-value translation system
- All UI strings externalized
- Language toggle visible in header/nav

---

## Design System

### Philosophy

Dieter Rams' principles applied to software:

- Less, but better
- As little design as possible
- Unobtrusive
- Honest

### Colors

Define as CSS custom properties in `layout.css` for use with Tailwind's arbitrary value syntax or theme extension:

| Token      | Value     | Usage                                               |
| ---------- | --------- | --------------------------------------------------- |
| `--accent` | `#FF5500` | Primary actions, current state, progress indicators |
| `--subtle` | `#f5f5f5` | Cards, sidebar backgrounds                          |

Standard Tailwind colors to use:

- Text: `text-neutral-900` (primary), `text-neutral-500` (secondary)
- Background: `bg-white`, `bg-neutral-100` (subtle)
- Border: `border-neutral-200`
- Success: `text-green-500` / `bg-green-500` (results only)
- Error: `text-red-500` / `bg-red-500` (results only)

### Typography

```css
font-family:
	system-ui,
	-apple-system,
	BlinkMacSystemFont,
	'Segoe UI',
	Roboto,
	sans-serif;
```

| Element  | Weight        | Size          |
| -------- | ------------- | ------------- |
| Headings | 500 (medium)  | 1.5rem - 2rem |
| Body     | 400 (regular) | 1rem          |
| Labels   | 300 (light)   | 0.875rem      |
| Buttons  | 500 (medium)  | 1rem          |

### Spacing

Use a 4px base unit. Common values: 4, 8, 12, 16, 24, 32, 48, 64.

### Components

#### Buttons

- Primary: accent background (`bg-[--accent]`), white text
- Secondary: transparent background, neutral text, subtle border
- No shadows, no gradients
- Subtle hover state (opacity or slight background change)
- `rounded-md` (6px)

#### Inputs

- Clean border (`border-neutral-200`)
- Focus state: accent border
- No shadows
- Generous padding (`px-4 py-3`)
- `rounded-md` (6px)

#### Cards

- Subtle background (`bg-neutral-100`) or white with subtle border
- No shadows
- `rounded-lg` (8px)
- Generous internal padding (`p-6`)

#### Toggle (True/False)

- Two-option segmented control for each statement
- Clear selected state using accent color
- Unselected state is neutral/muted

#### Question Navigator (Sidebar)

- Grid or vertical list of question numbers
- States:
  - Unanswered: empty/outline
  - Answered: filled neutral
  - Current: accent highlight
- Click to navigate

### Responsive Behavior

- Mobile-first approach
- Sidebar collapses to bottom sheet or top progress bar on mobile
- Minimum touch targets: 44px

---

## Technical Stack

- **Framework:** SvelteKit (Svelte 5 with runes)
- **Styling:** Tailwind CSS v4 with @tailwindcss/forms and @tailwindcss/typography plugins
- **Deployment:** Vercel
- **State Management:** Svelte stores
- **Persistence:** localStorage (language preference only)

### Project Structure

```
src/
├── lib/
│   ├── components/
│   │   ├── Button.svelte
│   │   ├── Input.svelte
│   │   ├── TextArea.svelte
│   │   ├── Toggle.svelte
│   │   ├── QuestionNav.svelte
│   │   ├── StatementToggle.svelte
│   │   └── LanguageSwitch.svelte
│   ├── stores/
│   │   ├── exam.ts          # Current exam state
│   │   └── language.ts      # i18n store
│   ├── i18n/
│   │   ├── en.ts
│   │   └── de.ts
│   ├── utils/
│   │   ├── scoring.ts       # Score calculation
│   │   ├── prompts.ts       # Prompt generation
│   │   └── validation.ts    # JSON validation
│   └── types.ts
├── routes/
│   ├── +layout.svelte       # App shell, language provider
│   ├── +page.svelte         # Setup screen
│   ├── import/
│   │   └── +page.svelte     # JSON input
│   ├── quiz/
│   │   └── +page.svelte     # Quiz interface
│   └── results/
│       └── +page.svelte     # Results & review
└── routes/
    └── layout.css           # Tailwind imports and custom properties
```

---

## Edge Cases & Validation

### JSON Parsing

- Extract JSON from markdown code blocks (`json ... `)
- Handle extra whitespace
- Clear error messages: "Invalid JSON", "Missing questions array", "Question 3 has only 3 statements"

### Quiz State

- Warn before leaving quiz with unsaved progress (beforeunload)
- Handle browser refresh gracefully (could store temp state, or just warn)

### Empty States

- No questions imported yet → clear CTA to go back
- All questions correct → celebratory message, no review prompt needed

---

## Out of Scope (Future Versions)

- User accounts / authentication
- Persistent exam history
- Spaced repetition scheduling
- Multiple question types beyond K'
- Direct NotebookLM API integration
- Timed exams
- Import from file upload

---

## Success Metrics

The tool succeeds if:

1. A user can go from "I have sources in NotebookLM" to "I just took a practice exam" in under 3 minutes
2. The delayed feedback genuinely supports recall (no peeking)
3. The review prompt helps users efficiently identify knowledge gaps
4. The interface gets out of the way — users focus on content, not UI
