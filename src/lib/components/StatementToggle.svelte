<script lang="ts">
	import Toggle from './Toggle.svelte';

	interface Props {
		text: string;
		value?: boolean | null;
		trueLabel?: string;
		falseLabel?: string;
		onchange?: (value: boolean) => void;
		last?: boolean;
	}

	let {
		text,
		value = $bindable(null),
		trueLabel = 'True',
		falseLabel = 'False',
		onchange,
		last = false
	}: Props = $props();

	// Watch for changes and call onchange
	$effect(() => {
		if (value !== null) {
			onchange?.(value);
		}
	});
</script>

<div class={['flex items-center justify-between p-4', !last && 'border-b border-neutral-100'].filter(Boolean).join(' ')}>
	<span class="flex-1 pr-4">{text}</span>
	<Toggle bind:value labels={{ true: trueLabel, false: falseLabel }} />
</div>
