import { Map, SkySpecification } from 'maplibre-gl';
import SunCalc from 'suncalc';
import { AddToOptions, AvailableTimeTypes, Options, SkyTimeType, TimeType } from './interfaces';
import { defaultSkyOptions } from './constants';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);

export class SkyControl {
	private map?: Map;

	private options: Options = defaultSkyOptions;

	constructor(options?: Options) {
		if (options) {
			this.options = Object.assign(this.options, options);
		}
	}

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
		const currentSky = this.getSkySpecByTime(location[0], location[1], options?.date);
		return currentSky;
	}

	private getSkySpecByTime(lng: number, lat: number, date?: Date) {
		const skyOptions = this.options.skyOptions;
		if (!skyOptions) return;
		// convert to UTC
		let currentDate: dayjs.Dayjs;
		if (!date) {
			currentDate = dayjs.utc();
		} else {
			currentDate = dayjs(date).utc();
		}
		const times = SunCalc.getTimes(currentDate.toDate(), lat, lng);

		// add 1 day before and 1 day after
		const timesBefore: { type: TimeType; date: dayjs.Dayjs }[] = [];
		const timesToday: { type: TimeType; date: dayjs.Dayjs }[] = [];
		const timesAfter: { type: TimeType; date: dayjs.Dayjs }[] = [];
		AvailableTimeTypes.forEach((timeType) => {
			const targetTime = dayjs(times[timeType]).utc();
			timesToday.push({ type: timeType, date: targetTime });
			const before = targetTime.add(-1, 'day');
			timesBefore.push({ type: timeType, date: before });

			const after = targetTime.add(1, 'day');
			timesAfter.push({ type: timeType, date: after });
		});
		let availableTImes = [...timesBefore, ...timesToday, ...timesAfter];
		availableTImes = availableTImes.sort(
			(a, b) => a.date.toDate().getTime() - b.date.toDate().getTime()
		);

		let beforeTime: SkyTimeType = {};
		let afterTime: SkyTimeType = {};

		availableTImes.forEach((time) => {
			const targetTime = time.date;
			const timeType = time.type;
			// console.log(timeType, targetTime.toISOString(), currentDate.toISOString())

			if (targetTime.isBefore(currentDate)) {
				const sky = skyOptions[timeType] as SkySpecification;
				if (!beforeTime.sky) {
					beforeTime = {
						type: timeType,
						date: targetTime,
						sky: sky
					};
				} else if (targetTime.isAfter(beforeTime.date)) {
					beforeTime = {
						type: timeType,
						date: targetTime,
						sky: sky
					};
				}
			}
			if (targetTime.isAfter(currentDate)) {
				const sky = skyOptions[timeType] as SkySpecification;
				if (!afterTime.sky) {
					afterTime = {
						type: timeType,
						date: targetTime,
						sky: sky
					};
				} else if (targetTime.isBefore(afterTime.date)) {
					afterTime = {
						type: timeType,
						date: targetTime,
						sky: sky
					};
				}
			}
		});

		// console.log(beforeTime, afterTime);

		const beforeDiff = beforeTime.date
			? currentDate.toDate().getTime() - beforeTime.date.toDate().getTime()
			: -1;
		const afterDiff = afterTime.date
			? afterTime.date.toDate().getTime() - currentDate.toDate().getTime()
			: -1;

		let activeTime: SkySpecification;
		if (beforeDiff > -1 && afterDiff > -1) {
			if (afterDiff > beforeDiff) {
				activeTime = afterTime.sky as SkySpecification;
			} else {
				activeTime = beforeTime.sky as SkySpecification;
			}
		} else if (beforeTime && !afterTime) {
			activeTime = beforeTime.sky as SkySpecification;
		} else if (afterTime && !beforeTime) {
			activeTime = afterTime.sky as SkySpecification;
		} else {
			activeTime = skyOptions.solarNoon;
		}

		return activeTime;
	}
}
