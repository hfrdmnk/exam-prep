import { page } from 'vitest/browser';
import { describe, expect, it, vi } from 'vitest';
import { render } from 'vitest-browser-svelte';
import Button from './Button.svelte';

describe('Button', () => {
	it('should render and handle click', async () => {
		const onclick = vi.fn();
		render(Button, { onclick });

		const button = page.getByRole('button');
		await expect.element(button).toBeInTheDocument();

		await button.click();
		expect(onclick).toHaveBeenCalledOnce();
	});

	it('should be disabled when disabled prop is true', async () => {
		render(Button, { disabled: true });

		const button = page.getByRole('button');
		await expect.element(button).toBeDisabled();
	});
});
