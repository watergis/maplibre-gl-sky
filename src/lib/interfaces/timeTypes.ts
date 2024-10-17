/**
 * The list of available suncalc time type names
 */
export const AvailableTimeTypes = [
	'sunrise',
	'sunriseEnd',
	'goldenHourEnd',
	'solarNoon',
	'goldenHour',
	'sunsetStart',
	'sunset',
	'dusk',
	'nauticalDusk',
	'night',
	'nadir',
	'nightEnd',
	'nauticalDawn',
	'dawn'
] as const;

/**
 * Available time type interface
 */
export type TimeType = (typeof AvailableTimeTypes)[number];
