# K' Exam Prep Tool

A minimal SvelteKit application for K-prime exam preparation. Generates prompts for NotebookLM to create exam questions from your sources, then runs quiz sessions with delayed feedback for active recall.

## Features

- **Prompt generation** for NotebookLM to create K-prime questions from any topic
- **K-prime format** — 4 statements per question, each marked true/false
- **Delayed feedback** — no answers shown during quiz to support genuine recall
- **Review prompts** — generate targeted review prompts for questions you got wrong
- **Bilingual** — full support for English and German

## How It Works

1. **Setup** — Enter your topic and number of questions, select language
2. **Generate** — Copy the generated prompt to NotebookLM with your sources
3. **Import** — Paste the JSON response from NotebookLM
4. **Quiz** — Answer questions without feedback (randomized order)
5. **Review** — See your score and generate a review prompt for missed questions

## Tech Stack

- **Svelte 5** with runes (`$state`, `$props`, `$derived`)
- **SvelteKit** with Vercel adapter
- **Tailwind CSS v4**
- **TypeScript** in strict mode
- **Vitest** for testing

## Development

```bash
pnpm install    # Install dependencies
pnpm dev        # Start dev server
pnpm build      # Production build
pnpm check      # Type-check
pnpm lint       # Run prettier + eslint
pnpm format     # Auto-format
pnpm test       # Run all tests
```

## Project Structure

```
src/
├── lib/
│   ├── components/     # Reusable UI components
│   ├── stores/         # Svelte stores (exam state, i18n)
│   ├── i18n/           # Translation files (en.ts, de.ts)
│   ├── utils/          # scoring.ts, prompts.ts, validation.ts
│   └── types.ts        # TypeScript interfaces
├── routes/
│   ├── +layout.svelte  # App shell
│   ├── +page.svelte    # Setup screen (/)
│   ├── import/         # JSON input (/import)
│   ├── quiz/           # Quiz interface (/quiz)
│   └── results/        # Results & review (/results)
```

## K-Prime Scoring

| Correct Answers | Points |
| --------------- | ------ |
| 4/4             | 4      |
| 3/4             | 2      |
| 2 or fewer      | 0      |
