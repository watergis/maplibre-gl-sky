import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async ({ url }) => {
	const title = 'Maplibre GL Sky';
	const site_name = 'Maplibre GL Sky Demo';
	const site_description = 'Demo website for maplibre-gl-sky plugin';
	const socialImage = new URL('/assets/plugin-overview.png', url.origin).href;

	return {
		title,
		site_name,
		site_description,
		socialImage
	};
};

export const prerender = true;
export const ssr = false;
