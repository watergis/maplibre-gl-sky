<script>
	import { LightSwitch } from '@skeletonlabs/skeleton';

	import { getDrawerStore } from '@skeletonlabs/skeleton';

	const drawerStore = getDrawerStore();

	const drawerClose = () => {
		drawerStore.close();
	};
</script>

<nav class="list-nav p-4">
	<ul>
		<li><a href="/" onclick={drawerClose}>Homepage</a></li>
		<li>
			<a href="https://twitter.com/j_igarashi" target="_blank" onclick={drawerClose}> Twitter </a>
		</li>
		<li>
			<a href="https://github.com/watergis/maplibre-gl-sky" target="_blank" onclick={drawerClose}>
				GitHub
			</a>
		</li>
		<li>
			<div class="flex items-center px-4">
				<span class="pr-4">Light/Dark switch</span>
				<span><LightSwitch /></span>
			</div>
		</li>
	</ul>
</nav>
