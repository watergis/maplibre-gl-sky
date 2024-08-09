import maplibregl, { Map, NavigationControl, StyleSpecification } from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { AvailableTimeTypes, SkyControl } from './src/lib';

const style: StyleSpecification = {
	version: 8,
	sources: {
		bing: {
			type: 'raster',
			tiles: [
				'https://ecn.t0.tiles.virtualearth.net/tiles/a{quadkey}.jpeg?g=1',
				'https://ecn.t1.tiles.virtualearth.net/tiles/a{quadkey}.jpeg?g=1',
				'https://ecn.t2.tiles.virtualearth.net/tiles/a{quadkey}.jpeg?g=1',
				'https://ecn.t3.tiles.virtualearth.net/tiles/a{quadkey}.jpeg?g=1',
				'https://ecn.t4.tiles.virtualearth.net/tiles/a{quadkey}.jpeg?g=1',
				'https://ecn.t5.tiles.virtualearth.net/tiles/a{quadkey}.jpeg?g=1',
				'https://ecn.t6.tiles.virtualearth.net/tiles/a{quadkey}.jpeg?g=1',
				'https://ecn.t7.tiles.virtualearth.net/tiles/a{quadkey}.jpeg?g=1'
			],
			attribution:
				'Map tiles by <a target="_top" rel="noopener" href="httpa://bing.com">Microsoft</a>, under <a target="_top" rel="noopener" href="https://www.microsoft.com/en-us/maps/product">Microsoft Bing Maps Platform APIs Terms Of Use</a>'
		},
		terrarium: {
			type: 'raster-dem',
			attribution:
				'© <a href="https://github.com/tilezen/joerd/blob/master/docs/attribution.md" target="_blank" rel="noopener">Tilezen Joerd</a>',
			tiles: ['https://s3.amazonaws.com/elevation-tiles-prod/terrarium/{z}/{x}/{y}.png'],
			minzoom: 0,
			maxzoom: 15,
			tileSize: 256,
			encoding: 'terrarium',
			bounds: [-180, -90, 180, 90]
		}
	},
	terrain: {
		source: 'terrarium',
		exaggeration: 1
	},
	layers: [
		{
			id: 'bingaerial',
			type: 'raster',
			source: 'bing',
			minzoom: 0,
			maxzoom: 19,
			layout: {
				visibility: 'visible'
			}
		}
	]
};

const map = new Map({
	container: 'map',
	style: style,
	center: [138.76574, 35.20046],
	zoom: 11.9,
	pitch: 85,
	bearing: -15.4,
	maxPitch: 85,
	hash: true,
	attributionControl: false
});

map.addControl(new NavigationControl({ visualizePitch: true }), 'top-right');
map.addControl(new maplibregl.AttributionControl({ compact: false }), 'bottom-right');

const sky = new SkyControl();
sky.addTo(map);

const timeButtons = document.getElementById('time-buttons');

const autoBtn = document.createElement('button');
autoBtn.classList.add('button');
autoBtn.innerHTML = 'auto';
autoBtn.addEventListener('click', () => {
	const sky = new SkyControl();
	sky.addTo(map);
});
timeButtons?.appendChild(autoBtn);

AvailableTimeTypes.forEach((type) => {
	const btn = document.createElement('button');
	btn.classList.add('button');
	btn.innerHTML = type;
	btn.addEventListener('click', () => {
		const sky = new SkyControl();
		sky.addTo(map, {
			timeType: type
		});
	});
	timeButtons?.appendChild(btn);
});
