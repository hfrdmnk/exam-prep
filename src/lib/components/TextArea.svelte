<script lang="ts">
	interface Props {
		value?: string;
		placeholder?: string;
		rows?: number;
		disabled?: boolean;
	}

	let { value = $bindable(''), placeholder, rows = 4, disabled = false }: Props = $props();
</script>

<textarea
	bind:value
	{placeholder}
	{rows}
	{disabled}
	class="px-4 py-3 rounded-md border border-neutral-200 focus:border-accent focus:outline-none w-full resize-y"
></textarea>
