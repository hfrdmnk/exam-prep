<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		variant?: 'primary' | 'secondary';
		type?: 'button' | 'submit';
		disabled?: boolean;
		onclick?: () => void;
		children?: Snippet;
	}

	let {
		variant = 'primary',
		type = 'button',
		disabled = false,
		onclick,
		children
	}: Props = $props();
</script>

<button
	{type}
	{disabled}
	{onclick}
	class={[
		'rounded-md px-4 py-3 font-medium transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2',
		variant === 'primary'
			? 'bg-accent text-white hover:opacity-90'
			: 'border border-neutral-200 bg-transparent hover:bg-neutral-50',
		disabled && 'cursor-not-allowed opacity-50'
	]
		.filter(Boolean)
		.join(' ')}
>
	{#if children}{@render children()}{/if}
</button>
