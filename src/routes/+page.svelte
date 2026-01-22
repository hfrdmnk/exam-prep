<script lang="ts">
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import { Button, Input } from '$lib/components';
	import { languageStore } from '$lib/stores/language.svelte';
	import { generateExamPrompt } from '$lib/utils/prompts';

	let topic = $state('');
	let questionCount = $state(10);
	let generatedPrompt = $state('');
	let copied = $state(false);

	const t = $derived(languageStore.t.setup);
	const canGenerate = $derived(topic.trim().length > 0 && questionCount > 0);

	function handleGenerate() {
		generatedPrompt = generateExamPrompt(topic.trim(), questionCount, languageStore.current);
	}

	async function handleCopy() {
		await navigator.clipboard.writeText(generatedPrompt);
		copied = true;
		setTimeout(() => (copied = false), 2000);
	}

	function handleContinue() {
		goto(resolve('/import'));
	}
</script>

<h1 class="mb-8 text-2xl font-bold">{t.title}</h1>

<div class="space-y-6">
	<div>
		<label for="topic" class="mb-2 block font-medium">{t.topicLabel}</label>
		<Input id="topic" bind:value={topic} placeholder={t.topicPlaceholder} />
	</div>

	<div>
		<label for="questionCount" class="mb-2 block font-medium">{t.questionCountLabel}</label>
		<Input id="questionCount" type="number" bind:value={questionCount} min={1} max={50} />
	</div>

	<Button onclick={handleGenerate} disabled={!canGenerate}>
		{t.generatePrompt}
	</Button>

	{#if generatedPrompt}
		<div class="mt-6 space-y-4">
			<pre
				class="max-h-64 overflow-auto rounded-md bg-subtle p-4 text-sm whitespace-pre-wrap">{generatedPrompt}</pre>

			<div class="flex gap-3">
				<Button onclick={handleCopy} variant="secondary">
					{copied ? t.copied : t.copyPrompt}
				</Button>
				<Button onclick={handleContinue}>
					{t.continueToImport}
				</Button>
			</div>
		</div>
	{/if}
</div>
