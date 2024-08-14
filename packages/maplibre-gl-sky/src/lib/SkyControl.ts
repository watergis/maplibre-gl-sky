import { Map, SkySpecification } from 'maplibre-gl';
import SunCalc from 'suncalc';
import { AddToOptions, AvailableTimeTypes, Options, TimeType } from './interfaces';
import { defaultSkyOptions } from './constants';
import dayjs, { Dayjs } from 'dayjs';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);

/**
 * SkyControl class
 */
export class SkyControl {
	private map?: Map;

	private options: Options = defaultSkyOptions;

	/**
	 * Constructor
	 * @param options Options object
	 */
	constructor(options?: Options) {
		if (options) {
			this.options = Object.assign(this.options, options);
		}
	}

	/**
	 * Update options in the control object
	 * @param options Options object
	 */
	public setOptions(options: Options) {
		this.options = options;
	}

	/**
	 * Add sky color to maplibre map object.
	 * If options are not specified, try to find better sky color based on map center and time.
	 * @param map Maplibre map object
	 * @param options AddToOptions object
	 * @returns void
	 */
	public addTo(map: Map, options?: AddToOptions) {
		this.map = map;
		this.map.setMaxPitch(this.options.maxPitch);

		const currentSky = this.getSky(options);
		if (!currentSky) return;

		if (this.map.isStyleLoaded()) {
			this.map.setSky(currentSky);
		} else {
			this.map.once('load', () => {
				this.map?.setSky(currentSky);
			});
		}

		if (!options?.location) {
			this.map.on('moveend', () => {
				const currentSky = this.getSky(options);
				if (!currentSky) return;
				this.map?.setSky(currentSky);
			});
		}
	}

	/**
	 * get maplibre SkySpecification object according to parameters
	 * @param options AddToOptions object
	 * @returns SkySpecification object
	 */
	private getSky(options?: AddToOptions) {
		if (!this.map) return;
		const skyOptions = this.options.skyOptions;
		if (!skyOptions) return;

		const timeType = options?.timeType;
		if (timeType) {
			const sky = skyOptions[timeType] as SkySpecification;
			if (sky) {
				return sky;
			} else {
				return skyOptions.solarNoon;
			}
		}

		let location = options?.location;
		if (!location) {
			const center = this.map.getCenter();
			location = [center.lng, center.lat];
		}

		// convert to UTC
		let currentDate: dayjs.Dayjs;
		if (!options?.date) {
			currentDate = dayjs.utc();
		} else {
			currentDate = dayjs(options?.date).utc();
		}

		const activeTimeName = this.getBestTimeNameByLocation(
			location[0],
			location[1],
			currentDate.toDate()
		);
		const activeSky: SkySpecification = skyOptions[activeTimeName] as SkySpecification;
		return activeSky;
	}

	/**
	 * get suncalc times by location and date
	 * @param lng Longitude
	 * @param lat Latitude
	 * @param date Date object
	 * @param addBuffer Default is false. If ture, add yesterday and tomorrow's times
	 * @returns
	 */
	public getTimesByLocation(lng: number, lat: number, date: Date, addBuffer = false) {
		const times = SunCalc.getTimes(date, lat, lng);

		// add 1 day before and 1 day after
		const timesBefore: { type: TimeType; date: Date }[] = [];
		const timesToday: { type: TimeType; date: Date }[] = [];
		const timesAfter: { type: TimeType; date: Date }[] = [];
		AvailableTimeTypes.forEach((timeType) => {
			const targetTime = dayjs(times[timeType]).utc();
			timesToday.push({ type: timeType, date: targetTime.toDate() });

			if (addBuffer) {
				const before = targetTime.add(-1, 'day');
				timesBefore.push({ type: timeType, date: before.toDate() });

				const after = targetTime.add(1, 'day');
				timesAfter.push({ type: timeType, date: after.toDate() });
			}
		});
		let availableTImes = [...timesBefore, ...timesToday, ...timesAfter];
		availableTImes = availableTImes.sort((a, b) => a.date.getTime() - b.date.getTime());

		return availableTImes;
	}

	/**
	 * Get the best time name by using suncalc library based on given location and date
	 * @param lng Longitude
	 * @param lat Latitude
	 * @param date Date
	 * @returns active suncalc time name
	 */
	public getBestTimeNameByLocation(lng: number, lat: number, date: Date) {
		const availableTImes = this.getTimesByLocation(lng, lat, date, true);

		let beforeTime: {
			type?: TimeType;
			date?: Dayjs;
		} = {};
		let afterTime: {
			type?: TimeType;
			date?: Dayjs;
		} = {};

		availableTImes.forEach((time) => {
			const targetTime = dayjs(time.date);
			const timeType = time.type;
			// console.log(timeType, targetTime.toISOString(), currentDate.toISOString())

			if (dayjs(targetTime).isBefore(date)) {
				if (!beforeTime.type) {
					beforeTime = {
						type: timeType,
						date: targetTime
					};
				} else if (dayjs(targetTime).isAfter(beforeTime.date)) {
					beforeTime = {
						type: timeType,
						date: targetTime
					};
				}
			}
			if (dayjs(targetTime).isAfter(date)) {
				if (!afterTime.type) {
					afterTime = {
						type: timeType,
						date: targetTime
					};
				} else if (dayjs(targetTime).isBefore(afterTime.date)) {
					afterTime = {
						type: timeType,
						date: targetTime
					};
				}
			}
		});

		// console.log(beforeTime, afterTime);

		const beforeDiff = beforeTime.date ? date.getTime() - beforeTime.date.toDate().getTime() : -1;
		const afterDiff = afterTime.date ? afterTime.date.toDate().getTime() - date.getTime() : -1;

		let activeTime: TimeType;
		if (beforeDiff > -1 && afterDiff > -1) {
			if (afterDiff > beforeDiff) {
				activeTime = afterTime.type as TimeType;
			} else {
				activeTime = beforeTime.type as TimeType;
			}
		} else if (beforeTime && !afterTime) {
			activeTime = beforeTime.type as TimeType;
		} else if (afterTime && !beforeTime) {
			activeTime = afterTime.type as TimeType;
		} else {
			activeTime = 'solarNoon';
		}
		return activeTime;
	}
}
