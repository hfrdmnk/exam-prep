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

<div class="inline-flex rounded-md border border-neutral-200 overflow-hidden min-h-[44px]">
	<button
		type="button"
		onclick={selectTrue}
		{disabled}
		class={[
			'px-4 py-2 font-medium transition-colors min-w-[60px]',
			value === true ? 'bg-accent text-white' : 'bg-white text-neutral-700 hover:bg-neutral-50',
			disabled && 'opacity-50 cursor-not-allowed'
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
			'px-4 py-2 font-medium transition-colors min-w-[60px] border-l border-neutral-200',
			value === false ? 'bg-accent text-white' : 'bg-white text-neutral-700 hover:bg-neutral-50',
			disabled && 'opacity-50 cursor-not-allowed'
		]
			.filter(Boolean)
			.join(' ')}
	>
		{labels.false}
	</button>
</div>
