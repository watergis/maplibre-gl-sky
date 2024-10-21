<script lang="ts">
	import type { PageData } from './$types';
	import '../app.postcss';
	import { page } from '$app/stores';

	interface Props {
		data: PageData;
		children?: import('svelte').Snippet;
	}

	let { data, children }: Props = $props();
</script>

<svelte:head>
	<title>{data.title}</title>
	<meta property="og:site_name" content={data.site_name} />
	<meta property="og:type" content="article" />
	<meta name="description" content={data.site_description} />
	<meta property="og:description" content={data.site_description} />
	<meta name="twitter:description" content={data.site_description} />
	<meta property="og:title" content={data.title} />
	<meta property="og:image" content={data.socialImage} />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={data.title} />
	<meta name="twitter:image" content={data.socialImage} />
	<meta property="og:url" content={$page.url.href} />
</svelte:head>

{@render children?.()}
