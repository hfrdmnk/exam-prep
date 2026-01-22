import { page } from 'vitest/browser';
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-svelte';
import Input from './Input.svelte';

describe('Input', () => {
	it('should render with placeholder', async () => {
		render(Input, { placeholder: 'Enter text' });

		const input = page.getByPlaceholder('Enter text');
		await expect.element(input).toBeInTheDocument();
	});

	it('should be disabled when disabled prop is true', async () => {
		render(Input, { disabled: true, placeholder: 'Disabled' });

		const input = page.getByPlaceholder('Disabled');
		await expect.element(input).toBeDisabled();
	});
});
