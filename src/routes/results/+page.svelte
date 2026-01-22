<script lang="ts">
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import { onMount } from 'svelte';
	import { Button } from '$lib/components';
	import { languageStore } from '$lib/stores/language.svelte';
	import { examStore } from '$lib/stores/exam.svelte';
	import { scoreExam, getWrongQuestions } from '$lib/utils/scoring';
	import { generateReviewPrompt } from '$lib/utils/prompts';

	let copied = $state(false);

	const t = $derived(languageStore.t.results);
	const session = $derived(examStore.session);

	const score = $derived(session ? scoreExam(session.exam, session.answers) : null);

	const wrongQuestions = $derived(session ? getWrongQuestions(session.exam, session.answers) : []);

	const hasWrongQuestions = $derived(wrongQuestions.length > 0);

	async function handleCopyReviewPrompt() {
		const prompt = generateReviewPrompt(wrongQuestions, languageStore.current);
		await navigator.clipboard.writeText(prompt);
		copied = true;
		setTimeout(() => (copied = false), 2000);
	}

	function handleNewExam() {
		examStore.reset();
		goto(resolve('/'));
	}

	// Redirect to home if no session exists
	onMount(() => {
		if (!examStore.session) {
			goto(resolve('/'));
		}
	});
</script>

{#if session && score}
	<h1 class="mb-8 text-2xl font-bold">{t.title}</h1>

	<!-- Score Card -->
	<div class="mb-6 rounded-md border border-neutral-200 p-6 text-center">
		<div class="mb-2 text-4xl font-bold">
			{score.totalPoints} / {score.maxPoints}
		</div>
		<div class="text-lg text-neutral-600">
			{t.points} ({score.percentage}%)
		</div>
	</div>

	<!-- Breakdown Card -->
	<div class="mb-6 rounded-md border border-neutral-200 p-6">
		<h2 class="mb-4 font-medium">{t.breakdown}</h2>
		<div class="space-y-2 text-neutral-700">
			<div class="flex justify-between">
				<span>{t.perfect}</span>
				<span>{score.breakdown.fourPoints} {t.questions}</span>
			</div>
			<div class="flex justify-between">
				<span>{t.partial}</span>
				<span>{score.breakdown.twoPoints} {t.questions}</span>
			</div>
			<div class="flex justify-between">
				<span>{t.failed}</span>
				<span>{score.breakdown.zeroPoints} {t.questions}</span>
			</div>
		</div>
	</div>

	{#if hasWrongQuestions}
		<div class="mb-6">
			<Button variant="secondary" onclick={handleCopyReviewPrompt}>
				{copied ? languageStore.t.setup.copied : t.copyReviewPrompt}
			</Button>
		</div>
	{:else}
		<p class="mb-6 text-green-600">{t.allCorrect}</p>
	{/if}

	<Button onclick={handleNewExam}>
		{t.newExam}
	</Button>
{/if}
