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
	<header class="flex items-center justify-between px-4 py-4 md:px-6">
		<span class="text-sm font-medium text-neutral-400">K'</span>
		<LanguageSwitch size="sm" />
	</header>
	<main class="mx-auto max-w-2xl px-4 pb-8">
		{@render children()}
	</main>
</div>
