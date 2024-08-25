<script lang="ts">
	import {
		Map,
		AttributionControl,
		NavigationControl,
		GeolocateControl,
		type SkySpecification
	} from 'maplibre-gl';
	import { onMount } from 'svelte';
	import 'maplibre-gl/dist/maplibre-gl.css';
	import type { PageData } from './$types';
	import {
		AvailableTimeTypes,
		defaultSkyOptions,
		SkyControl,
		type AddToOptions,
		type Options,
		type TimeType
	} from '@watergis/maplibre-gl-sky';
	import { clipboard, RangeSlider } from '@skeletonlabs/skeleton';
	import {
		Timeline,
		TimelineItem,
		TimelineSeparator,
		TimelineDot,
		TimelineConnector,
		TimelineContent,
		TimelineOppositeContent
	} from 'svelte-vertical-timeline';
	import CenterIconManager from '@watergis/maplibre-center-icon';

	export let data: PageData;

	let map: Map;
	let activeTime: TimeType | 'auto' = 'auto';
	const defaultOptions: Options = defaultSkyOptions;
	let activeSkySpec: SkySpecification;

	let suncalcTimes: {
		type: TimeType;
		date: Date;
	}[] = [];
	let bestTime: TimeType;
	let currentDate: Date;

	let sky: SkyControl

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

		const centerIconManager = new CenterIconManager(map);
		centerIconManager.create();

		map.once('load', () => {
			initSky();
			updateSuncalcTimes();

			map.on('moveend', updateSuncalcTimes);
		});
	});

	const updateSuncalcTimes = () => {
		const center = map.getCenter();
		if (!sky) {
			sky = new SkyControl(defaultOptions);
		}
		currentDate = new Date();
		suncalcTimes = sky.getTimesByLocation(center.lng, center.lat, currentDate);
		bestTime = sky.getBestTimeNameByLocation(center.lng, center.lat, currentDate);
	};

	const initSky = (type?: TimeType) => {
		if (!map) return;
		if (!sky) {
			sky = new SkyControl(defaultOptions);
		}

		let options: AddToOptions = {};
		if (type) {
			options.timeType = type;
			if (defaultOptions.skyOptions) {
				activeSkySpec = defaultOptions.skyOptions[activeTime as TimeType] as SkySpecification;
			}
		}
		activeTime = type ?? 'auto';
		sky.addTo(map, options);
	};

	const handleTimeTypeChanged = () => {
		if (activeTime === 'auto') {
			initSky();
		} else {
			initSky(activeTime);
		}
	};

	const handleSkyParamChanged = () => {
		if (activeTime === 'auto') return;
		if (!defaultSkyOptions.skyOptions) return;
		defaultSkyOptions.skyOptions[activeTime] = activeSkySpec;
		initSky(activeTime);
	};
</script>

<div id="map" />

{#if activeTime !== 'auto'}
	{#if activeSkySpec}
		<div class="params-overlay p-2">
			<label class="label flex flex-col justify-evenly gap-0.5">
				<span class="font-bold text-black">Sky specification ({activeTime})</span>
				<button
					class="btn btn-sm variant-filled-primary"
					use:clipboard={JSON.stringify(activeSkySpec, null, 4)}>Copy</button
				>
				<textarea
					class="textarea sky-spec-text"
					rows="8"
					readonly
					value={JSON.stringify(activeSkySpec, null, 4)}
				/>
			</label>
		</div>
	{/if}
{/if}

{#if bestTime && suncalcTimes?.length > 0}
	<div class="suncalc-overlay p-2">
		<p class="text-black text-right my-2">Current time: {currentDate.toISOString()}</p>
		<Timeline position="left">
			{#each suncalcTimes as time}
				{@const color =
					time.type.toLowerCase() === bestTime.toLowerCase() ? 'rgb(255,0,0)' : 'rgb(0,0,0)'}

				<TimelineItem>
					<TimelineOppositeContent slot="opposite-content">
						<p style="color: {color};">{time.date.toISOString()}</p>
					</TimelineOppositeContent>
					<TimelineSeparator>
						<TimelineDot style="background-color: {color};" />
						<TimelineConnector />
					</TimelineSeparator>
					<TimelineContent>
						<p style="color: {color};">{time.type}</p>
					</TimelineContent>
				</TimelineItem>
			{/each}
		</Timeline>
	</div>
{/if}

<div class="control-overlay p-2 gap-0.5">
	<label class="label">
		<span class="font-bold text-black">Time type</span>
		<select class="select" bind:value={activeTime} on:change={handleTimeTypeChanged}>
			<option value={'auto'}>Auto</option>
			{#each AvailableTimeTypes as type}
				<option value={type}>{type}</option>
			{/each}
		</select>
	</label>
	{#if activeTime !== 'auto'}
		{#if activeSkySpec}
			<label class="label">
				<span class="font-bold text-black">sky-color</span>
				<div class="grid grid-cols-[auto_1fr] gap-2">
					<input
						class="input"
						type="color"
						bind:value={activeSkySpec['sky-color']}
						on:change={handleSkyParamChanged}
					/>
					<input
						class="input"
						type="text"
						bind:value={activeSkySpec['sky-color']}
						readonly
						tabindex="-1"
					/>
				</div>
			</label>
			<RangeSlider
				name="sky-horizon-blend"
				bind:value={activeSkySpec['sky-horizon-blend']}
				max={1}
				step={0.1}
				min={0}
				ticked
				on:change={handleSkyParamChanged}
			>
				<div class="flex justify-between items-center">
					<div class="font-bold text-black">sky-horizon-blend</div>
					<div class="text-xs text-black">{activeSkySpec['sky-horizon-blend']}</div>
				</div>
			</RangeSlider>

			<label class="label">
				<span class="font-bold text-black">horizon-color</span>
				<div class="grid grid-cols-[auto_1fr] gap-2">
					<input
						class="input"
						type="color"
						bind:value={activeSkySpec['horizon-color']}
						on:change={handleSkyParamChanged}
					/>
					<input
						class="input"
						type="text"
						bind:value={activeSkySpec['horizon-color']}
						readonly
						tabindex="-1"
					/>
				</div>
			</label>
			<RangeSlider
				name="horizon-fog-blend"
				bind:value={activeSkySpec['horizon-fog-blend']}
				max={1}
				step={0.1}
				min={0}
				ticked
				on:change={handleSkyParamChanged}
			>
				<div class="flex justify-between items-center">
					<div class="font-bold text-black">horizon-fog-blend</div>
					<div class="text-xs text-black">{activeSkySpec['horizon-fog-blend']}</div>
				</div>
			</RangeSlider>

			<label class="label">
				<span class="font-bold text-black">fog-color</span>
				<div class="grid grid-cols-[auto_1fr] gap-2">
					<input
						class="input"
						type="color"
						bind:value={activeSkySpec['fog-color']}
						on:change={handleSkyParamChanged}
					/>
					<input
						class="input"
						type="text"
						bind:value={activeSkySpec['fog-color']}
						readonly
						tabindex="-1"
					/>
				</div>
			</label>
			<RangeSlider
				name="fog-ground-blend"
				bind:value={activeSkySpec['fog-ground-blend']}
				max={1}
				step={0.1}
				min={0}
				ticked
				on:change={handleSkyParamChanged}
			>
				<div class="flex justify-between items-center">
					<div class="font-bold text-black">fog-ground-blend</div>
					<div class="text-xs text-black">{activeSkySpec['fog-ground-blend']}</div>
				</div>
			</RangeSlider>
		{/if}
	{/if}
</div>

<style lang="scss">
	#map {
		position: absolute;
		top: 0;
		bottom: 0;
		width: 100%;
		z-index: 10;
	}

	.control-overlay {
		position: absolute;
		bottom: 20px;
		left: 10px;
		z-index: 10;

		background-color: rgba(255, 255, 255, 0.7);
	}

	.params-overlay {
		position: absolute;
		bottom: 20px;
		right: 10px;
		z-index: 10;

		background-color: rgba(255, 255, 255, 0.7);

		.sky-spec-text {
			width: 280px;
		}
	}

	.suncalc-overlay {
		position: absolute;
		top: 20px;
		left: 10px;
		z-index: 10;

		max-height: 300px;
		overflow-y: auto;

		background-color: rgba(255, 255, 255, 0.7);
	}
</style>
