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

export type TimeType = (typeof AvailableTimeTypes)[number];
