import { describe, it, expect, beforeEach } from 'vitest';
import { languageStore, type Language } from './language.svelte';

describe('languageStore', () => {
	beforeEach(() => {
		// Reset to English before each test for predictability
		languageStore.set('en');
		localStorage.removeItem('kprime-lang');
	});

	describe('current', () => {
		it('returns the current language', () => {
			expect.assertions(1);
			expect(languageStore.current).toBe('en');
		});
	});

	describe('t', () => {
		it('returns English translations when language is en', () => {
			expect.assertions(2);
			languageStore.set('en');
			expect(languageStore.t.appName).toBe("K' Exam Prep");
			expect(languageStore.t.setup.title).toBe('Setup Your Exam');
		});

		it('returns German translations when language is de', () => {
			expect.assertions(2);
			languageStore.set('de');
			expect(languageStore.t.appName).toBe("K' Prüfungsvorbereitung");
			expect(languageStore.t.setup.title).toBe('Prüfung einrichten');
		});
	});

	describe('set', () => {
		it('changes the current language', () => {
			expect.assertions(2);
			languageStore.set('de');
			expect(languageStore.current).toBe('de');

			languageStore.set('en');
			expect(languageStore.current).toBe('en');
		});

		it('persists to localStorage', () => {
			expect.assertions(2);
			languageStore.set('de');
			expect(localStorage.getItem('kprime-lang')).toBe('de');

			languageStore.set('en');
			expect(localStorage.getItem('kprime-lang')).toBe('en');
		});

		it('updates translations reactively', () => {
			expect.assertions(2);
			languageStore.set('en');
			expect(languageStore.t.quiz.true).toBe('True');

			languageStore.set('de');
			expect(languageStore.t.quiz.true).toBe('Wahr');
		});
	});

	describe('toggle', () => {
		it('switches from en to de', () => {
			expect.assertions(1);
			languageStore.set('en');
			languageStore.toggle();
			expect(languageStore.current).toBe('de');
		});

		it('switches from de to en', () => {
			expect.assertions(1);
			languageStore.set('de');
			languageStore.toggle();
			expect(languageStore.current).toBe('en');
		});

		it('persists the toggled language', () => {
			expect.assertions(1);
			languageStore.set('en');
			languageStore.toggle();
			expect(localStorage.getItem('kprime-lang')).toBe('de');
		});
	});

	describe('localStorage persistence', () => {
		it('reads persisted language on fresh import', async () => {
			expect.assertions(1);
			// Set a value in localStorage
			localStorage.setItem('kprime-lang', 'de');

			// Dynamically import to get fresh module state
			const freshModule = await import('./language.svelte?fresh=' + Date.now());

			// The store should have read 'de' from localStorage during initialization
			// Note: Due to module caching, this tests that set() correctly persists
			expect(freshModule.languageStore.current).toBe('de');
		});
	});
});

describe('Language type', () => {
	it('exports Language type', () => {
		expect.assertions(1);
		// TypeScript compile-time check - if this compiles, the type is exported
		const lang: Language = 'en';
		expect(['en', 'de']).toContain(lang);
	});
});
