import type { StyleSpecification } from 'maplibre-gl';
import type { PageLoad } from './$types';

export const load: PageLoad = async () => {
	const title = 'Maplibre GL Sky';
	const site_name = 'Maplibre GL Sky Demo';
	const site_description = 'Demo website for maplibre-gl-sky plugin';

	const style: StyleSpecification = {
		version: 8,
		center: [138.76574, 35.20046],
		zoom: 11.9,
		pitch: 85,
		bearing: -15.4,
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

	return {
		title,
		site_name,
		site_description,
		style
	};
};

export const prerender = true;
export const ssr = false;
