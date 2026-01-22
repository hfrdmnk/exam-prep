<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		variant?: 'primary' | 'secondary';
		type?: 'button' | 'submit';
		disabled?: boolean;
		onclick?: () => void;
		children?: Snippet;
	}

	let { variant = 'primary', type = 'button', disabled = false, onclick, children }: Props =
		$props();
</script>

<button
	{type}
	{disabled}
	onclick={onclick}
	class={[
		'px-4 py-3 rounded-md font-medium transition-opacity',
		variant === 'primary'
			? 'bg-accent text-white hover:opacity-90'
			: 'bg-transparent border border-neutral-200 hover:bg-neutral-50',
		disabled && 'opacity-50 cursor-not-allowed'
	]
		.filter(Boolean)
		.join(' ')}
>
	{#if children}{@render children()}{/if}
</button>
