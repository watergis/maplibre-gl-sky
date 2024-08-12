import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async () => {
	const title = 'Maplibre GL Sky';
	const site_name = 'Maplibre GL Sky Demo';
	const site_description = 'Demo website for maplibre-gl-sky plugins';

	return {
		title,
		site_name,
		site_description
	};
};

export const prerender = true;
export const ssr = false;
