import { page } from 'vitest/browser';
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-svelte';
import StatementToggle from './StatementToggle.svelte';

describe('StatementToggle', () => {
	it('should render statement text', async () => {
		render(StatementToggle, { text: 'The sky is blue' });

		await expect.element(page.getByText('The sky is blue')).toBeInTheDocument();
	});

	it('should render toggle with default labels', async () => {
		render(StatementToggle, { text: 'Test statement' });

		await expect.element(page.getByRole('button', { name: 'True' })).toBeInTheDocument();
		await expect.element(page.getByRole('button', { name: 'False' })).toBeInTheDocument();
	});

	it('should render toggle with custom labels', async () => {
		render(StatementToggle, { text: 'Test', trueLabel: 'Correct', falseLabel: 'Wrong' });

		await expect.element(page.getByRole('button', { name: 'Correct' })).toBeInTheDocument();
		await expect.element(page.getByRole('button', { name: 'Wrong' })).toBeInTheDocument();
	});
});
