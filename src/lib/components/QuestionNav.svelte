<script lang="ts">
	interface Props {
		totalQuestions: number;
		currentIndex: number;
		answeredIndices: Set<number>;
		onSelect: (index: number) => void;
	}

	let { totalQuestions, currentIndex, answeredIndices, onSelect }: Props = $props();

	function getButtonClass(index: number): string {
		const base = 'w-11 h-11 rounded-md font-medium transition-colors';

		if (index === currentIndex) {
			return `${base} bg-accent text-white`;
		}

		if (answeredIndices.has(index)) {
			return `${base} bg-neutral-200 text-neutral-700`;
		}

		return `${base} border border-neutral-200 text-neutral-700 hover:bg-neutral-50`;
	}
</script>

<div class="grid grid-cols-5 gap-2">
	{#each Array.from({ length: totalQuestions }, (_, i) => i) as i (i)}
		<button type="button" class={getButtonClass(i)} onclick={() => onSelect(i)}>
			{i + 1}
		</button>
	{/each}
</div>
