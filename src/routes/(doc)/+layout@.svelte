<script lang="ts">
	import { AppShell, AppBar, LightSwitch } from '@skeletonlabs/skeleton';
	import { autoModeWatcher } from '@skeletonlabs/skeleton';

	// Highlight JS
	import hljs from 'highlight.js/lib/core';
	import 'highlight.js/styles/github-dark.css';
	import { storeHighlightJs } from '@skeletonlabs/skeleton';
	import xml from 'highlight.js/lib/languages/xml'; // for HTML
	import css from 'highlight.js/lib/languages/css';
	import javascript from 'highlight.js/lib/languages/javascript';
	import typescript from 'highlight.js/lib/languages/typescript';
	import shell from 'highlight.js/lib/languages/shell';
	import { initializeStores, Drawer, getDrawerStore } from '@skeletonlabs/skeleton';
	import Navigation from './Navigation.svelte';

	hljs.registerLanguage('xml', xml); // for HTML
	hljs.registerLanguage('css', css);
	hljs.registerLanguage('javascript', javascript);
	hljs.registerLanguage('typescript', typescript);
	hljs.registerLanguage('shell', shell);
	storeHighlightJs.set(hljs);

	// Floating UI for Popups
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import { storePopup } from '@skeletonlabs/skeleton';
	import { onMount } from 'svelte';
	interface Props {
		children?: import('svelte').Snippet;
	}

	let { children }: Props = $props();
	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });

	let title = 'Maplibre GL Sky';

	initializeStores();

	const drawerStore = getDrawerStore();

	const drawerOpen = () => {
		drawerStore.open({});
	};

	onMount(() => {
		autoModeWatcher();
	});
</script>

<!-- App Shell -->
<AppShell>
	{#snippet header()}
		<!-- App Bar -->
		<AppBar>
			{#snippet lead()}
				<div class="flex items-center">
					<button class="md:hidden btn btn-sm mr-4" onclick={drawerOpen} aria-label="drawer">
						<span>
							<svg viewBox="0 0 100 80" class="fill-token w-4 h-4">
								<rect width="100" height="20" />
								<rect y="30" width="100" height="20" />
								<rect y="60" width="100" height="20" />
							</svg>
						</span>
					</button>
					<strong class="text-xl uppercase">{title}</strong>
				</div>
			{/snippet}
			{#snippet trail()}
				<div class="hidden md:inline-block">
					<a
						class="btn btn-sm variant-ghost-surface"
						href="https://twitter.com/j_igarashi"
						target="_blank"
						rel="noreferrer"
					>
						Twitter
					</a>
					<a
						class="btn btn-sm variant-ghost-surface"
						href="https://github.com/watergis/maplibre-gl-sky"
						target="_blank"
						rel="noreferrer"
					>
						GitHub
					</a>
				</div>
			{/snippet}
		</AppBar>
	{/snippet}

	<Drawer>
		<h2 class="p-4">{title}</h2>
		<hr />
		<Navigation />
		<hr />
		<p class="px-8">Maintained by JinIgarashi</p>
		<p class="px-8">The source code is licensed MIT</p>
		<p class="px-8">The website content is licensed CC BY NC SA 4.0</p>
	</Drawer>

	<!-- Page Route Content -->
	{@render children?.()}

	{#snippet footer()}
		<div class="space-y-2 py-4">
			<div class="flex justify-center item-center">
				<span class="pr-2">Light/Dark mode switch</span>
				<span><LightSwitch /></span>
			</div>
			<p class="flex justify-center space-x-2">Maplibre GL Sky by JinIgarashi.</p>
			<p class="flex justify-center space-x-2">The source code is licensed MIT.</p>
			<p class="flex justify-center space-x-2">The website content is licensed CC BY NC SA 4.0.</p>
		</div>
	{/snippet}
</AppShell>
