# K' Exam Prep Tool — Implementation Plan

More details in @SPEC.md

## Phase 1: Foundation

- [x] Set up project structure (directories for components, stores, utils, i18n)
- [x] Define TypeScript types in `src/lib/types.ts` (ExamJSON, Question, Statement, QuestionState)
- [x] Create CSS custom properties (`--accent`, `--subtle`) in layout styles

## Phase 2: Core Utilities

- [x] Implement JSON validation utility (`src/lib/utils/validation.ts`)
  - Extract JSON from markdown code blocks
  - Validate structure (questions array, 4 statements per question)
  - Return clear error messages
- [x] Implement scoring utility (`src/lib/utils/scoring.ts`)
  - Calculate points per question (4/4=4pts, 3/4=2pts, else=0)
  - Calculate total score and percentage
- [x] Implement prompt generation utility (`src/lib/utils/prompts.ts`)
  - Generate NotebookLM prompt (EN/DE templates)
  - Generate review prompt for wrong answers

## Phase 3: Internationalization

- [ ] Create translation files (`src/lib/i18n/en.ts`, `src/lib/i18n/de.ts`)
- [ ] Create language store (`src/lib/stores/language.ts`)
  - Persist to localStorage (`kprime-lang`)
  - Default to browser language or English

## Phase 4: State Management

- [ ] Create exam store (`src/lib/stores/exam.ts`)
  - Store imported questions
  - Track user answers per question
  - Randomize question and statement order on session start

## Phase 5: Reusable Components

- [ ] Button component (primary/secondary variants)
- [ ] Input component (text, number)
- [ ] TextArea component
- [ ] Toggle/StatementToggle component (true/false segmented control)
- [ ] QuestionNav component (sidebar with question status indicators)
- [ ] LanguageSwitch component

## Phase 6: Routes

### Setup Screen (`/`)

- [ ] Create setup form (topic, question count, language)
- [ ] Generate and display copyable NotebookLM prompt
- [ ] Navigate to import screen

### Import Screen (`/import`)

- [ ] JSON paste textarea
- [ ] Validate and parse JSON on submit
- [ ] Show clear error messages
- [ ] Store valid exam data and navigate to quiz

### Quiz Screen (`/quiz`)

- [ ] Display current question with 4 statement toggles
- [ ] Question navigator sidebar
- [ ] Track answered/unanswered state
- [ ] Navigation between questions
- [ ] Finish exam button with confirmation for unanswered questions

### Results Screen (`/results`)

- [ ] Display score (points, max, percentage)
- [ ] Show breakdown (4pt, 2pt, 0pt questions)
- [ ] Generate and copy review prompt for wrong answers
- [ ] "New Exam" button to return to setup

## Phase 7: Layout & Polish

- [ ] App shell in `+layout.svelte` with language toggle
- [ ] Responsive behavior (sidebar to bottom sheet on mobile)
- [ ] beforeunload warning for quiz in progress
- [ ] Empty state handling (no questions, all correct)

## Phase 8: Testing & Validation

- [x] Unit tests for scoring utility
- [x] Unit tests for validation utility
- [x] Unit tests for prompt generation
- [ ] Component tests for key interactions
- [ ] End-to-end flow verification
