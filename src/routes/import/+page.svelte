<script lang="ts">
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import { Button, TextArea } from '$lib/components';
	import { languageStore } from '$lib/stores/language.svelte';
	import { examStore } from '$lib/stores/exam.svelte';
	import { validateExamJSON } from '$lib/utils/validation';

	let jsonInput = $state('');
	let error = $state<string | null>(null);

	const t = $derived(languageStore.t.import);

	function handleStartExam() {
		error = null;
		const result = validateExamJSON(jsonInput);

		if (!result.success) {
			error = result.error;
			return;
		}

		examStore.startSession(result.data);
		goto(resolve('/quiz'));
	}
</script>

<h1 class="mb-4 text-2xl font-bold">{t.title}</h1>
<p class="mb-6 text-neutral-600">{t.instructions}</p>

<div class="space-y-4">
	<TextArea bind:value={jsonInput} placeholder={t.placeholder} rows={12} />

	{#if error}
		<p class="text-red-600">{error}</p>
	{/if}

	<Button onclick={handleStartExam} disabled={jsonInput.trim().length === 0}>
		{t.startExam}
	</Button>
</div>
