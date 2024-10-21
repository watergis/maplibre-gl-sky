<script lang="ts">
	import { CodeBlock, RadioGroup, RadioItem, Tab, TabGroup } from '@skeletonlabs/skeleton';
	import { onMount } from 'svelte';

	let imprtTypeTabs = [
		{ label: 'NPM', value: 'npm' },
		{ label: 'CDN', value: 'cdn' }
	];
	let importTypeTabSet: string = $state(imprtTypeTabs[0].value);

	let packageManager = $state('npm');

	let maplibreSkyVersion = $state('latest');
	let maplibreCdnExample = $state('');

	const getMaplibreSkyVersion = async () => {
		const res = await fetch('https://registry.npmjs.org/@watergis/maplibre-gl-sky/latest');
		if (!res.ok) {
			return;
		}
		const json = await res.json();
		maplibreSkyVersion = json.version;
	};

	const getMaplibreCdnExample = async () => {
		const res = await fetch('/assets/maplibre-cdn-example.txt');
		if (!res.ok) {
			return;
		}
		maplibreCdnExample = await res.text();
	};

	onMount(() => {
		getMaplibreSkyVersion();
		getMaplibreCdnExample();
	});
</script>

<div class="px-4">
	<div class="text-center">
		<h2 class="h1 pt-4 pb-6">Welcome to Maplibre GL Sky</h2>

		<div class="flex justify-center space-x-2 pb-4">
			Maplibre GL Sky is a Maplibre GL JS plugin that can set sky color smartly according to the map
			center positon and local time!
		</div>

		<div class="flex justify-center space-x-2">
			<img
				class=" h-auto max-w-sm md:max-w-lg rounded-lg"
				src="/assets/plugin-overview.webp"
				alt="Overview of Plugin"
			/>
		</div>
	</div>

	<div class="space-y-2">
		<h3 class="h3 pt-6 pb-4">Demo</h3>

		<a
			class="btn variant-filled-primary capitalize"
			href="/maplibre"
			target="_blank"
			rel="noreferrer"
		>
			Open DEMO ({maplibreSkyVersion})
		</a>

		<TabGroup>
			{#each imprtTypeTabs as tab}
				<Tab bind:group={importTypeTabSet} name={tab.value} value={tab.value}>{tab.label}</Tab>
			{/each}
		</TabGroup>

		<div class="p-2" hidden={importTypeTabSet !== 'npm'}>
			<h3 class="h3 pt-6 pb-4">Install</h3>
			<p>Getting start with installing the package</p>

			<RadioGroup active="variant-filled-primary" hover="hover:variant-soft-primary">
				<RadioItem bind:group={packageManager} name="justify" value={'npm'}>npm</RadioItem>
				<RadioItem bind:group={packageManager} name="justify" value={'yarn'}>yarn</RadioItem>
				<RadioItem bind:group={packageManager} name="justify" value={'pnpm'}>pnpm</RadioItem>
			</RadioGroup>

			<div class="pt-2">
				{#if packageManager === 'npm'}
					<CodeBlock language="shell" code={`npm install --save-dev @watergis/maplibre-gl-sky`} />
				{:else if packageManager === 'yarn'}
					<CodeBlock language="shell" code={`yarn add --dev @watergis/maplibre-gl-sky`} />
				{:else if packageManager === 'pnpm'}
					<CodeBlock language="shell" code={`pnpm add --save-dev @watergis/maplibre-gl-sky`} />
				{/if}
			</div>

			<h3 class="h3 pt-6 pb-4">Usage</h3>

			<p>Copy and past the below code.</p>

			<CodeBlock
				language="ts"
				lineNumbers
				code={`
import { Map, AttributionControl, NavigationControl } from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { SkyControl } from '@watergis/maplibre-gl-sky'

const map = new Map({
			container: 'map',
			style: 'your style URL',
			maxPitch: 85
		});

const sky = new SkyControl();
sky.addTo(map);
				`}
			/>
		</div>

		<div hidden={importTypeTabSet !== 'cdn'}>
			<h3 class="h3 pt-6">Usage</h3>

			<CodeBlock
				language="html"
				lineNumbers
				code={`${maplibreCdnExample.replace(/{maplibreExportVersion}/g, maplibreSkyVersion)}`}
			/>
		</div>
	</div>
</div>

<style lang="postcss">
</style>
