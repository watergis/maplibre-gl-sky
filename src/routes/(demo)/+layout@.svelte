<script>
	/**
	 * @typedef {Object} Props
	 * @property {import('svelte').Snippet} [children]
	 */

	/** @type {Props} */
	let { children } = $props();
</script>

<svelte:head>
	<link
		rel="stylesheet"
		href="https://cdnjs.cloudflare.com/ajax/libs/github-fork-ribbon-css/0.2.3/gh-fork-ribbon.min.css"
	/>

	<style>
		html,
		body {
			padding: 0;
			margin: 0;
		}
	</style>
</svelte:head>

<a
	class="github-fork-ribbon left-top"
	href="https://github.com/watergis/maplibre-gl-sky"
	data-ribbon="Fork me on GitHub"
	title="Fork me on GitHub">Fork me on GitHub</a
>

{@render children?.()}
