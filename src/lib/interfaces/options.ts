import type { SkySpecification } from 'maplibre-gl';

/**
 * SkyControl options
 */
export interface Options {
	/**
	 * SkySpecification for each time types. solarNoon must be defined. If other type is not found, solarNoon is used as default.
	 */
	skyOptions?: {
		/**
		 * sunrise (top edge of the sun appears on the horizon)
		 */
		sunrise?: SkySpecification;
		/**
		 * sunrise ends (bottom edge of the sun touches the horizon)
		 */
		sunriseEnd?: SkySpecification;
		/**
		 * morning golden hour (soft light, best time for photography) ends
		 */
		goldenHourEnd?: SkySpecification;
		/**
		 * solar noon (sun is in the highest position)
		 */
		solarNoon: SkySpecification;
		/**
		 * evening golden hour starts
		 */
		goldenHour?: SkySpecification;
		/**
		 * sunset starts (bottom edge of the sun touches the horizon)
		 */
		sunsetStart?: SkySpecification;
		/**
		 * sunset (sun disappears below the horizon, evening civil twilight starts)
		 */
		sunset?: SkySpecification;
		/**
		 * dusk (evening nautical twilight starts)
		 */
		dusk?: SkySpecification;
		/**
		 * nautical dusk (evening astronomical twilight starts)
		 */
		nauticalDusk?: SkySpecification;
		/**
		 * night starts (dark enough for astronomical observations)
		 */
		night?: SkySpecification;
		/**
		 * nadir (darkest moment of the night, sun is in the lowest position)
		 */
		nadir?: SkySpecification;
		/**
		 * night ends (morning astronomical twilight starts)
		 */
		nightEnd?: SkySpecification;
		/**
		 * nautical dawn (morning nautical twilight starts)
		 */
		nauticalDawn?: SkySpecification;
		/**
		 * dawn (morning nautical twilight ends, morning civil twilight starts)
		 */
		dawn?: SkySpecification;
	};
	/**
	 * MaxPitch of Maplibre. Default is 85.
	 */
	maxPitch?: number;
}
