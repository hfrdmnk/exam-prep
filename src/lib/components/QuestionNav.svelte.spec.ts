import { page } from 'vitest/browser';
import { describe, expect, it, vi } from 'vitest';
import { render } from 'vitest-browser-svelte';
import QuestionNav from './QuestionNav.svelte';

describe('QuestionNav', () => {
	it('should render correct number of buttons', async () => {
		render(QuestionNav, {
			totalQuestions: 5,
			currentIndex: 0,
			answeredIndices: new Set<number>(),
			onSelect: vi.fn()
		});

		const buttons = page.getByRole('button');
		await expect.element(buttons.nth(4)).toBeInTheDocument();
	});

	it('should call onSelect with correct index when clicked', async () => {
		const onSelect = vi.fn();
		render(QuestionNav, {
			totalQuestions: 5,
			currentIndex: 0,
			answeredIndices: new Set<number>(),
			onSelect
		});

		const button3 = page.getByRole('button', { name: '3' });
		await button3.click();

		expect(onSelect).toHaveBeenCalledWith(2);
	});

	it('should highlight current question with accent', async () => {
		render(QuestionNav, {
			totalQuestions: 5,
			currentIndex: 2,
			answeredIndices: new Set<number>(),
			onSelect: vi.fn()
		});

		const button3 = page.getByRole('button', { name: '3' });
		await expect.element(button3).toHaveClass('bg-accent');
	});
});
