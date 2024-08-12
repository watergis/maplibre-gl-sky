<script lang="ts">
	import { Map, AttributionControl, NavigationControl, GeolocateControl } from 'maplibre-gl';
	import { onMount } from 'svelte';
	import 'maplibre-gl/dist/maplibre-gl.css';
	import type { PageData } from './$types';
	import {
		AvailableTimeTypes,
		SkyControl,
		type AddToOptions,
		type TimeType
	} from '@watergis/maplibre-gl-sky';

	export let data: PageData;

	let map: Map;
	let activeTime: TimeType | 'auto' = 'auto';

	onMount(() => {
		map = new Map({
			container: 'map',
			style: data.style,
			maxPitch: 85,
			hash: true,
			attributionControl: false
		});

		map.addControl(new NavigationControl({ visualizePitch: true }), 'top-right');
		map.addControl(new AttributionControl({ compact: false }), 'bottom-right');
		map.addControl(
			new GeolocateControl({
				positionOptions: {
					enableHighAccuracy: true
				},
				trackUserLocation: true
			}),
			'top-right'
		);

		initSky();
	});

	const initSky = (type?: TimeType) => {
		if (!map) return;
		const sky = new SkyControl();

		let options: AddToOptions = {};
		if (type) {
			options.timeType = type;
		}
		activeTime = type ?? 'auto';
		sky.addTo(map, options);
	};
</script>

<div id="map" />

<div class="overlay">
	<div class="btn-group-vertical variant-filled">
		<button
			class="btn {activeTime === 'auto' ? 'variant-filled-primary' : ''} capitalize"
			on:click={() => {
				initSky();
			}}>Auto</button
		>
		{#each AvailableTimeTypes as type}
			<button
				class="btn {activeTime === type ? 'variant-filled-primary' : ''} capitalize"
				on:click={() => {
					initSky(type);
				}}>{type}</button
			>
		{/each}
	</div>
</div>

<style lang="scss">
	#map {
		position: absolute;
		top: 0;
		bottom: 0;
		width: 100%;
		z-index: 10;
	}

	.overlay {
		position: absolute;
		bottom: 20px;
		left: 10px;
		z-index: 10;
	}
</style>
