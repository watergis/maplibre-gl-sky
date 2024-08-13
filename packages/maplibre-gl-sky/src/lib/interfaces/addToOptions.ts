import { TimeType } from './timeTypes';

/**
 * Options for AddTo method
 */
export interface AddToOptions {
	/**
	 * Suncalc time's type name
	 */
	timeType?: TimeType;
	/**
	 * Date object
	 */
	date?: Date;
	/**
	 * Map location. It should follow the format of [Longitude, Latitude]
	 */
	location?: number[];
}
