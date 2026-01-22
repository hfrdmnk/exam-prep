<script lang="ts">
	interface Props {
		type?: 'text' | 'number';
		value?: string | number;
		placeholder?: string;
		id?: string;
		min?: number;
		max?: number;
		disabled?: boolean;
	}

	let {
		type = 'text',
		value = $bindable(''),
		placeholder,
		id,
		min,
		max,
		disabled = false
	}: Props = $props();
</script>

<input
	{type}
	bind:value
	{placeholder}
	{id}
	{min}
	{max}
	{disabled}
	class="px-4 py-3 rounded-md border border-neutral-200 focus:border-accent focus:outline-none w-full"
/>
