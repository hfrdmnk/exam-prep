<script lang="ts">
	interface Props {
		totalQuestions: number;
		currentIndex: number;
		answeredIndices: Set<number>;
		onSelect: (index: number) => void;
		mode?: 'desktop' | 'mobile';
	}

	let {
		totalQuestions,
		currentIndex,
		answeredIndices,
		onSelect,
		mode = 'desktop'
	}: Props = $props();

	let expanded = $state(false);

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

	function handleSelect(index: number) {
		onSelect(index);
		if (mode === 'mobile') {
			expanded = false;
		}
	}
</script>

{#if mode === 'desktop'}
	<!-- Desktop: always show grid -->
	<div class="grid grid-cols-5 gap-2">
		{#each Array.from({ length: totalQuestions }, (_, i) => i) as i (i)}
			<button type="button" class={getButtonClass(i)} onclick={() => handleSelect(i)}>
				{i + 1}
			</button>
		{/each}
	</div>
{:else}
	<!-- Mobile: fixed bottom bar with collapsed/expanded states -->
	<div class="fixed right-0 bottom-0 left-0 border-t border-neutral-200 bg-white">
		{#if expanded}
			<!-- Expanded grid overlay -->
			<div class="p-4">
				<div class="mb-4 grid grid-cols-5 gap-2">
					{#each Array.from({ length: totalQuestions }, (_, i) => i) as i (i)}
						<button type="button" class={getButtonClass(i)} onclick={() => handleSelect(i)}>
							{i + 1}
						</button>
					{/each}
				</div>
				<button
					type="button"
					class="w-full py-2 text-sm text-neutral-500"
					onclick={() => (expanded = false)}
					aria-label="Collapse question navigator"
				>
					<svg
						class="mx-auto h-5 w-5"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
						aria-hidden="true"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M19 9l-7 7-7-7"
						/>
					</svg>
				</button>
			</div>
		{:else}
			<!-- Collapsed bar -->
			<button
				type="button"
				class="flex w-full items-center justify-between p-4"
				onclick={() => (expanded = true)}
			>
				<span class="font-medium">{currentIndex + 1} / {totalQuestions}</span>
				<div class="flex gap-1">
					{#each Array.from({ length: totalQuestions }, (_, i) => i) as i (i)}
						<span
							class={[
								'h-2 w-2 rounded-full',
								i === currentIndex
									? 'bg-accent'
									: answeredIndices.has(i)
										? 'bg-neutral-400'
										: 'bg-neutral-200'
							].join(' ')}
						></span>
					{/each}
				</div>
				<svg
					class="h-5 w-5 text-neutral-500"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
					aria-hidden="true"
				>
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7" />
				</svg>
			</button>
		{/if}
	</div>
{/if}
