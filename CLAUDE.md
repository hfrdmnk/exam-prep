# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

K' Exam Prep Tool — a SvelteKit application for K-prime exam preparation. Generates prompts for NotebookLM to create exam questions, then runs quiz sessions with delayed feedback for active recall. See SPEC.md for detailed requirements.

## Commands

```bash
pnpm dev          # Start dev server
pnpm build        # Production build
pnpm check        # Type-check with svelte-check
pnpm lint         # Run prettier + eslint
pnpm format       # Auto-format with prettier
pnpm test         # Run all tests once
pnpm test:unit    # Run tests in watch mode
```

### Running a Single Test

```bash
pnpm test:unit -- --run src/path/to/file.spec.ts           # Single server test
pnpm test:unit -- --run src/path/to/file.svelte.spec.ts    # Single component test
```

## Architecture

### Tech Stack

- **Svelte 5** with runes (`$state`, `$props`, `$derived`, etc.)
- **SvelteKit** with Vercel adapter
- **Tailwind CSS v4** (uses `@import 'tailwindcss'` syntax in CSS)
- **TypeScript** in strict mode
- **Vitest** with Playwright for browser component testing

### Test Configuration

Tests are split into two projects in `vite.config.ts`:

- **client**: Browser tests for Svelte components (`*.svelte.spec.ts`) using Playwright
- **server**: Node tests for utilities and logic (`*.spec.ts`, excluding `.svelte.spec.ts`)

Component tests use `vitest-browser-svelte` for rendering and `page` from `vitest/browser` for queries.

### Planned Project Structure (from SPEC.md)

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

### Code Style

- Prettier: tabs, single quotes, no trailing commas, 100 char width
- Svelte components use TypeScript (`<script lang="ts">`)
- Tests require assertions (`expect.requireAssertions: true` in vitest config)

### Design System

Accent color: `#FF5500` (use as CSS custom property `--accent`). See SPEC.md "Design System" section for full color tokens and component specs.
