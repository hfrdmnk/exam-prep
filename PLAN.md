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

- [x] Create translation files (`src/lib/i18n/en.ts`, `src/lib/i18n/de.ts`)
- [x] Create language store (`src/lib/stores/language.svelte.ts`)
  - Persist to localStorage (`kprime-lang`)
  - Default to browser language or English

## Phase 4: State Management

- [x] Create exam store (`src/lib/stores/exam.ts`)
  - Store imported questions
  - Track user answers per question
  - Randomize question and statement order on session start

## Phase 5: Reusable Components

- [x] Button component (primary/secondary variants)
- [x] Input component (text, number)
- [x] TextArea component
- [x] Toggle/StatementToggle component (true/false segmented control)
- [x] QuestionNav component (sidebar with question status indicators)
- [x] LanguageSwitch component

## Phase 6: Routes

### Setup Screen (`/`)

- [x] Create setup form (topic, question count, language)
- [x] Generate and display copyable NotebookLM prompt
- [x] Navigate to import screen

### Import Screen (`/import`)

- [x] JSON paste textarea
- [x] Validate and parse JSON on submit
- [x] Show clear error messages
- [x] Store valid exam data and navigate to quiz

### Quiz Screen (`/quiz`)

- [x] Display current question with 4 statement toggles
- [x] Question navigator sidebar
- [x] Track answered/unanswered state
- [x] Navigation between questions
- [x] Finish exam button with confirmation for unanswered questions

### Results Screen (`/results`)

- [x] Display score (points, max, percentage)
- [x] Show breakdown (4pt, 2pt, 0pt questions)
- [x] Generate and copy review prompt for wrong answers
- [x] "New Exam" button to return to setup

## Phase 7: Layout & Polish

- [x] App shell in `+layout.svelte` with language toggle
- [x] Responsive behavior (sidebar to bottom sheet on mobile)
- [x] beforeunload warning for quiz in progress
- [x] Empty state handling (no questions, all correct)

## Phase 8: Testing & Validation

- [x] Unit tests for scoring utility
- [x] Unit tests for validation utility
- [x] Unit tests for prompt generation
- [x] Unit tests for language store
- [x] Component tests for key interactions
- [x] End-to-end flow verification
