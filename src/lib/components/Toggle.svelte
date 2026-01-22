<script lang="ts">
	interface Props {
		value?: boolean | null;
		labels: { true: string; false: string };
		disabled?: boolean;
	}

	let { value = $bindable(null), labels, disabled = false }: Props = $props();

	function selectTrue() {
		if (!disabled) value = true;
	}

	function selectFalse() {
		if (!disabled) value = false;
	}
</script>

<div class="inline-flex min-h-[44px] overflow-hidden rounded-md border border-neutral-200">
	<button
		type="button"
		onclick={selectTrue}
		{disabled}
		class={[
			'min-w-[60px] px-4 py-2 font-medium transition-all duration-150',
			value === true ? 'bg-accent text-white' : 'bg-white text-neutral-700 hover:bg-neutral-50',
			disabled && 'cursor-not-allowed opacity-50'
		]
			.filter(Boolean)
			.join(' ')}
	>
		{labels.true}
	</button>
	<button
		type="button"
		onclick={selectFalse}
		{disabled}
		class={[
			'min-w-[60px] border-l border-neutral-200 px-4 py-2 font-medium transition-all duration-150',
			value === false ? 'bg-accent text-white' : 'bg-white text-neutral-700 hover:bg-neutral-50',
			disabled && 'cursor-not-allowed opacity-50'
		]
			.filter(Boolean)
			.join(' ')}
	>
		{labels.false}
	</button>
</div>
