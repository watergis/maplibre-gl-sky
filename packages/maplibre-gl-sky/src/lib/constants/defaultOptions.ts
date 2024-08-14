import { Options } from '../interfaces';

export const defaultSkyOptions: Options = {
	skyOptions: {
		//https://www.color-hex.com/color-palette/51090
		sunrise: {
			'sky-color': '#f7dc6f',
			'sky-horizon-blend': 0.8,
			'horizon-color': '#f5b041',
			'horizon-fog-blend': 0.8,
			'fog-color': '#f7dc6f',
			'fog-ground-blend': 0.5
		},
		sunriseEnd: {
			'sky-color': '#88C6FC',
			'sky-horizon-blend': 0.8,
			'horizon-color': '#ffa700',
			'horizon-fog-blend': 0.8,
			'fog-color': '#ffffff',
			'fog-ground-blend': 0.5
		},

		//https://www.color-hex.com/color-palette/51090
		goldenHourEnd: {
			'sky-color': '#5b2c6f',
			'sky-horizon-blend': 0.8,
			'horizon-color': '#e74c3c',
			'horizon-fog-blend': 0.8,
			'fog-color': '#f7dc6f',
			'fog-ground-blend': 0.5
		},

		// default
		solarNoon: {
			'sky-color': '#88C6FC',
			'sky-horizon-blend': 0.8,
			'horizon-color': '#ffffff',
			'horizon-fog-blend': 0.8,
			'fog-color': '#ffffff',
			'fog-ground-blend': 0.5
		},

		// https://www.color-hex.com/color-palette/92854
		goldenHour: {
			'sky-color': '#ffe90e',
			'sky-horizon-blend': 0.8,
			'horizon-color': '#ff6700',
			'horizon-fog-blend': 0.8,
			'fog-color': '#ffb400',
			'fog-ground-blend': 0.5
		},
		sunsetStart: {
			'sky-color': '#88C6FC',
			'sky-horizon-blend': 0.8,
			'horizon-color': '#ffe90e',
			'horizon-fog-blend': 0.8,
			'fog-color': '#ffb400',
			'fog-ground-blend': 0.5
		},
		sunset: {
			'sky-color': '#ffe90e',
			'sky-horizon-blend': 0.8,
			'horizon-color': '#ff6700',
			'horizon-fog-blend': 0.8,
			'fog-color': '#ffb400',
			'fog-ground-blend': 0.5
		},

		// https://www.color-hex.com/color-palette/4582
		dusk: {
			'sky-color': '#0d0d3e',
			'sky-horizon-blend': 0.8,
			'horizon-color': '#4d2149',
			'horizon-fog-blend': 0.8,
			'fog-color': '#30016d',
			'fog-ground-blend': 0.5
		},

		// https://www.color-hex.com/color-palette/81746
		nauticalDusk: {
			'sky-color': '#000000',
			'sky-horizon-blend': 0.8,
			'horizon-color': '#0426d0',
			'horizon-fog-blend': 0.8,
			'fog-color': '#202b7a',
			'fog-ground-blend': 0.5
		},

		// https://www.color-hex.com/color-palette/36836
		night: {
			'sky-color': '#1e2b58',
			'sky-horizon-blend': 0.8,
			'horizon-color': '#614cbf',
			'horizon-fog-blend': 0.8,
			'fog-color': '#D4D6D8',
			'fog-ground-blend': 0.5
		},

		//https://www.color-hex.com/color-palette/62573
		nadir: {
			'sky-color': '#3b3768',
			'sky-horizon-blend': 0.8,
			'horizon-color': '#100d36',
			'horizon-fog-blend': 0.8,
			'fog-color': '#282454',
			'fog-ground-blend': 0.5
		},

		// https://www.color-hex.com/color-palette/36836
		nightEnd: {
			'sky-color': '#1e2b58',
			'sky-horizon-blend': 0.8,
			'horizon-color': '#614cbf',
			'horizon-fog-blend': 0.8,
			'fog-color': '#D4D6D8',
			'fog-ground-blend': 0.5
		},

		// https://www.color-hex.com/color-palette/81746
		nauticalDawn: {
			'sky-color': '#2c2b48',
			'sky-horizon-blend': 0.8,
			'horizon-color': '#0426d0',
			'horizon-fog-blend': 0.8,
			'fog-color': '#202b7a',
			'fog-ground-blend': 0.5
		},

		// https://www.color-hex.com/color-palette/14359
		dawn: {
			'sky-color': '#311f62',
			'sky-horizon-blend': 0.8,
			'horizon-color': '#e8817f',
			'horizon-fog-blend': 0.8,
			'fog-color': '#8d5273',
			'fog-ground-blend': 0.5
		},

		blueSky: {
			"sky-color": "#199EF3",
        	"sky-horizon-blend": 0.7,
        	"horizon-color": "#f0f8ff",
        	"horizon-fog-blend": 0.8,
        	"fog-color": "#2c7fb8",
        	"fog-ground-blend": 0.9,
			"atmosphere-blend": ["interpolate",["linear"],["zoom"],0,1,12,0]
		}
	},
	maxPitch: 85
};
