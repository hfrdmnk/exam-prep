import { page } from 'vitest/browser';
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-svelte';
import Toggle from './Toggle.svelte';

describe('Toggle', () => {
	it('should render both labels', async () => {
		render(Toggle, { labels: { true: 'Yes', false: 'No' } });

		await expect.element(page.getByRole('button', { name: 'Yes' })).toBeInTheDocument();
		await expect.element(page.getByRole('button', { name: 'No' })).toBeInTheDocument();
	});

	it('should start with null value (neither selected)', async () => {
		render(Toggle, { labels: { true: 'Yes', false: 'No' } });

		const yesBtn = page.getByRole('button', { name: 'Yes' });
		const noBtn = page.getByRole('button', { name: 'No' });

		// Neither should have the accent background (selected state)
		await expect.element(yesBtn).not.toHaveClass('bg-accent');
		await expect.element(noBtn).not.toHaveClass('bg-accent');
	});

	it('should select true when clicking true button', async () => {
		render(Toggle, { labels: { true: 'Yes', false: 'No' } });

		const yesBtn = page.getByRole('button', { name: 'Yes' });
		await yesBtn.click();

		await expect.element(yesBtn).toHaveClass('bg-accent');
	});
});
