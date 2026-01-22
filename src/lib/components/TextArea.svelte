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
	class="w-full resize-y rounded-md border border-neutral-200 px-4 py-3 focus:border-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
></textarea>
