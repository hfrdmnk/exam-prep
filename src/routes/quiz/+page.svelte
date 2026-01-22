<script lang="ts">
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import { onMount } from 'svelte';
	import { SvelteSet } from 'svelte/reactivity';
	import { Button, StatementToggle, QuestionNav } from '$lib/components';
	import { languageStore } from '$lib/stores/language.svelte';
	import { examStore } from '$lib/stores/exam.svelte';

	let showConfirmDialog = $state(false);

	const t = $derived(languageStore.t.quiz);
	const session = $derived(examStore.session);
	const currentQuestion = $derived(examStore.currentQuestion);
	const currentAnswers = $derived(examStore.currentAnswers);

	// Get statement order for current question
	const statementOrder = $derived(
		session ? session.questionOrder[session.currentIndex].statementOrder : []
	);

	// Build set of answered question indices
	const answeredIndices = $derived(() => {
		if (!session) return new SvelteSet<number>();
		const indices = new SvelteSet<number>();
		session.answers.forEach((a, i) => {
			if (a.answers.every((v) => v !== null)) {
				indices.add(i);
			}
		});
		return indices;
	});

	// Count unanswered questions
	const unansweredCount = $derived(() => {
		if (!session) return 0;
		return session.answers.filter((a) => a.answers.some((v) => v === null)).length;
	});

	const isFirstQuestion = $derived(session ? session.currentIndex === 0 : true);
	const isLastQuestion = $derived(
		session ? session.currentIndex === session.questionOrder.length - 1 : true
	);

	function handleSetAnswer(displayIndex: number, value: boolean) {
		examStore.setAnswer(displayIndex, value);
	}

	function handlePrev() {
		examStore.prevQuestion();
	}

	function handleNext() {
		examStore.nextQuestion();
	}

	function handleFinish() {
		const count = unansweredCount();
		if (count > 0) {
			showConfirmDialog = true;
		} else {
			goto(resolve('/results'));
		}
	}

	function handleConfirmFinish() {
		showConfirmDialog = false;
		goto(resolve('/results'));
	}

	function handleCancelFinish() {
		showConfirmDialog = false;
	}

	// Redirect to home if no session exists
	onMount(() => {
		if (!examStore.session) {
			goto(resolve('/'));
		}

		// Add beforeunload warning
		function handleBeforeUnload(event: BeforeUnloadEvent) {
			event.preventDefault();
		}

		window.addEventListener('beforeunload', handleBeforeUnload);

		return () => {
			window.removeEventListener('beforeunload', handleBeforeUnload);
		};
	});
</script>

{#if session && currentQuestion && currentAnswers}
	<!-- Add bottom padding on mobile for fixed bar -->
	<div class="pb-20 md:pb-0">
		<div class="flex flex-col gap-6 md:flex-row">
			<!-- Main question area -->
			<div class="flex-1">
				<h2 class="mb-4 text-lg font-medium text-neutral-500">
					{t.question}
					{session.currentIndex + 1}
					{t.of}
					{session.questionOrder.length}
				</h2>

				<p class="mb-6 text-lg font-medium">{currentQuestion.stem}</p>

				<div class="mb-6 overflow-hidden rounded-md border border-neutral-200">
					{#each statementOrder as originalIndex, displayIndex (originalIndex)}
						{@const statement = currentQuestion.statements[originalIndex]}
						{@const answer = currentAnswers.answers[displayIndex]}
						<StatementToggle
							text={statement.text}
							value={answer}
							trueLabel={t.true}
							falseLabel={t.false}
							onchange={(value) => handleSetAnswer(displayIndex, value)}
							last={displayIndex === statementOrder.length - 1}
						/>
					{/each}
				</div>

				<div class="mb-6 flex justify-between">
					<Button variant="secondary" onclick={handlePrev} disabled={isFirstQuestion}
						>&larr;</Button
					>
					<Button variant="secondary" onclick={handleNext} disabled={isLastQuestion}>&rarr;</Button>
				</div>

				<Button onclick={handleFinish}>
					{t.finishExam}
				</Button>
			</div>

			<!-- Desktop sidebar only -->
			<div class="hidden shrink-0 md:block md:w-56">
				<QuestionNav
					mode="desktop"
					totalQuestions={session.questionOrder.length}
					currentIndex={session.currentIndex}
					answeredIndices={answeredIndices()}
					onSelect={(index) => examStore.goToQuestion(index)}
				/>
			</div>
		</div>
	</div>

	<!-- Mobile bottom bar -->
	<div class="md:hidden">
		<QuestionNav
			mode="mobile"
			totalQuestions={session.questionOrder.length}
			currentIndex={session.currentIndex}
			answeredIndices={answeredIndices()}
			onSelect={(index) => examStore.goToQuestion(index)}
		/>
	</div>

	<!-- Confirmation dialog -->
	{#if showConfirmDialog}
		<div
			class="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
			role="dialog"
			aria-modal="true"
		>
			<div class="mx-4 w-full max-w-sm rounded-lg bg-white p-6 shadow-xl">
				<p class="mb-6">{t.confirmFinish.replace('{count}', String(unansweredCount()))}</p>
				<div class="flex justify-end gap-3">
					<Button variant="secondary" onclick={handleCancelFinish}>
						{t.cancel}
					</Button>
					<Button onclick={handleConfirmFinish}>
						{t.confirm}
					</Button>
				</div>
			</div>
		</div>
	{/if}
{/if}
