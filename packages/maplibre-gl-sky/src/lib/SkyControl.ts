import { Map, SkySpecification } from "maplibre-gl";
import SunCalc from "suncalc";
import {
  AddToOptions,
  AvailableTimeTypes,
  Options,
  SkyTimeType,
} from "./interfaces";
import { defaultSkyOptions } from "./defaultOptions";
import dayjs from "dayjs";

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
      this.map.once("load", () => {
        this.map?.setSky(currentSky);
      });
    }
  }

  private timeToSec(date: dayjs.Dayjs) {
    return date.hour() * 60 * 60 + date.minute() * 60 + date.second();
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
    const currentSky = this.getSkySpecByTime(
      location[0],
      location[1],
      options?.date,
    );
    return currentSky;
  }

  private getSkySpecByTime(lng: number, lat: number, date?: Date) {
    const skyOptions = this.options.skyOptions;
    if (!skyOptions) return;
    if (!date) {
      date = new Date();
    }
    const times = SunCalc.getTimes(date, lng, lat);

    const currentDate = dayjs(date);
    const currentTimeSec = this.timeToSec(currentDate);

    let beforeTime: SkyTimeType = {};
    let afterTime: SkyTimeType = {};

    AvailableTimeTypes.forEach((timeType) => {
      let targetTime = dayjs(times[timeType]);
      let targetTimeSec = this.timeToSec(targetTime);
      if (
        targetTime.isSame(currentDate, "day") &&
        targetTimeSec < currentTimeSec
      ) {
        targetTime = targetTime.add(-1, "day");
        targetTimeSec = this.timeToSec(targetTime);
      }

      if (targetTime.isBefore(currentDate)) {
        const sky = skyOptions[timeType] as SkySpecification;
        if (!beforeTime.sky) {
          beforeTime = {
            type: timeType,
            date: targetTime,
            sky: sky,
          };
        } else if (targetTime.isAfter(beforeTime.date)) {
          beforeTime = {
            type: timeType,
            date: targetTime,
            sky: sky,
          };
        }
      }
      if (targetTime.isAfter(currentDate)) {
        const sky = skyOptions[timeType] as SkySpecification;
        if (!afterTime.sky) {
          afterTime = {
            type: timeType,
            date: targetTime,
            sky: sky,
          };
        } else if (targetTime.isBefore(afterTime.date)) {
          afterTime = {
            type: timeType,
            date: targetTime,
            sky: sky,
          };
        }
      }
    });

    // console.log(beforeTime, afterTime);

    const activeTime = afterTime?.sky ?? beforeTime?.sky;
    if (activeTime) {
      return activeTime as SkySpecification;
    } else {
      return skyOptions.solarNoon;
    }
  }
}
