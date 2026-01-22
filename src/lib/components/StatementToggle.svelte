<script lang="ts">
	import Toggle from './Toggle.svelte';

	interface Props {
		text: string;
		value?: boolean | null;
		trueLabel?: string;
		falseLabel?: string;
	}

	let { text, value = $bindable(null), trueLabel = 'True', falseLabel = 'False' }: Props = $props();
</script>

<div class="flex items-center justify-between p-4 border-b border-neutral-100">
	<span class="flex-1 pr-4">{text}</span>
	<Toggle bind:value labels={{ true: trueLabel, false: falseLabel }} />
</div>
