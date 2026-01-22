<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import { LanguageSwitch } from '$lib/components';
	import { languageStore } from '$lib/stores/language.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>{languageStore.t.appName}</title>
</svelte:head>

<div class="min-h-screen bg-white">
	<header class="flex justify-end p-4">
		<LanguageSwitch size="sm" />
	</header>
	<main class="mx-auto max-w-2xl px-4 pb-8">
		{@render children()}
	</main>
</div>
