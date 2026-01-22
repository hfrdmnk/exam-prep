import { page } from 'vitest/browser';
import { describe, expect, it, beforeEach } from 'vitest';
import { render } from 'vitest-browser-svelte';
import LanguageSwitch from './LanguageSwitch.svelte';
import { languageStore } from '$lib/stores/language.svelte';

describe('LanguageSwitch', () => {
	beforeEach(() => {
		languageStore.set('en');
	});

	it('should render EN and DE buttons', async () => {
		render(LanguageSwitch);

		await expect.element(page.getByRole('button', { name: 'EN' })).toBeInTheDocument();
		await expect.element(page.getByRole('button', { name: 'DE' })).toBeInTheDocument();
	});

	it('should switch to DE when clicking DE button', async () => {
		render(LanguageSwitch);

		const deBtn = page.getByRole('button', { name: 'DE' });
		await deBtn.click();

		expect(languageStore.current).toBe('de');
	});

	it('should switch back to EN when clicking EN button', async () => {
		languageStore.set('de');
		render(LanguageSwitch);

		const enBtn = page.getByRole('button', { name: 'EN' });
		await enBtn.click();

		expect(languageStore.current).toBe('en');
	});
});
