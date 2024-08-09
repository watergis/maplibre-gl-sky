import { Dayjs } from "dayjs";
import { TimeType } from "./timeTypes";
import { SkySpecification } from "maplibre-gl";

export interface SkyTimeType {
  type?: TimeType;
  date?: Dayjs;
  sky?: SkySpecification;
}
