import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import localizedFormat from "dayjs/plugin/localizedFormat";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(localizedFormat);

// Get formatted date in MM/DD/YYYY
export const formatUSDate = (date: Date | string): string =>
  dayjs(date).tz("America/New_York").format("MM/DD/YYYY");

// Get formatted time in 12-hour format (e.g., 03:00 PM)
export const formatUSTime = (date: Date | string): string =>
  dayjs(date).tz("America/New_York").format("hh:mm:ss A");

// Get full timestamp in US time
export const getUSTime = (): string =>
  dayjs().tz("America/New_York").format("MM/DD/YYYY hh:mm:ss A");