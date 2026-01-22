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
	class="w-full rounded-md border border-neutral-200 px-4 py-3 focus:border-accent focus:outline-none"
/>
