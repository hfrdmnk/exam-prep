<script lang="ts">
	import { languageStore } from '$lib/stores/language.svelte';

	interface Props {
		size?: 'sm' | 'md';
	}

	let { size = 'md' }: Props = $props();

	function selectEn() {
		languageStore.set('en');
	}

	function selectDe() {
		languageStore.set('de');
	}

	const sizeClasses = $derived(size === 'sm' ? 'px-2 py-1 text-sm' : 'px-3 py-2');
</script>

<div class="inline-flex overflow-hidden rounded-md border border-neutral-200">
	<button
		type="button"
		onclick={selectEn}
		class={[
			'font-medium transition-colors',
			sizeClasses,
			languageStore.current === 'en'
				? 'bg-accent text-white'
				: 'bg-white text-neutral-700 hover:bg-neutral-50'
		].join(' ')}
	>
		EN
	</button>
	<button
		type="button"
		onclick={selectDe}
		class={[
			'border-l border-neutral-200 font-medium transition-colors',
			sizeClasses,
			languageStore.current === 'de'
				? 'bg-accent text-white'
				: 'bg-white text-neutral-700 hover:bg-neutral-50'
		].join(' ')}
	>
		DE
	</button>
</div>
