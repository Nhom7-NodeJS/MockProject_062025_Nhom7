import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

// trigger plugin
dayjs.extend(utc);
dayjs.extend(timezone);

export const getVNTime = (): string => {
  return dayjs().tz("Asia/Ho_Chi_Minh").format("YYYY-MM-DD HH:mm:ss");
};
