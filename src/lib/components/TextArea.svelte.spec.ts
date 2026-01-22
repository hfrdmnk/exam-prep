import { page } from 'vitest/browser';
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-svelte';
import TextArea from './TextArea.svelte';

describe('TextArea', () => {
	it('should render with placeholder', async () => {
		render(TextArea, { placeholder: 'Enter text' });

		const textarea = page.getByPlaceholder('Enter text');
		await expect.element(textarea).toBeInTheDocument();
	});

	it('should be disabled when disabled prop is true', async () => {
		render(TextArea, { disabled: true, placeholder: 'Disabled' });

		const textarea = page.getByPlaceholder('Disabled');
		await expect.element(textarea).toBeDisabled();
	});
});
