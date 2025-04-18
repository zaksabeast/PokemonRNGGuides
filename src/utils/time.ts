import type { RngDate, RngDateTime } from "~/rngTools";
import dayjs, { Dayjs } from "dayjs";

export const rngChronoFormat = {
  monthYear: "MMM YYYY",
  date: "MMM D, YYYY",
  dateHourMinutes: "MMM D, YYYY HH:mm",
  dateHourMinutesSeconds: "MMM D, YYYY HH:mm:ss",
  hoursMinutes: "HH:mm",
  hoursMinutesSeconds: "HH:mm:ss",
} as const;

export const toRngDate = (date: Dayjs): RngDate => {
  return {
    day: date.date(),
    month: date.month() + 1,
    year: date.year(),
  };
};

export const fromRngDate = (date: RngDate): Dayjs => {
  return dayjs(new Date(date.year, date.month - 1, date.day));
};

export const formatRngDate = (date: RngDate): string => {
  return fromRngDate(date).format(rngChronoFormat.date);
};

export const toRngDateTime = (date: Dayjs): RngDateTime => {
  return {
    day: date.date(),
    month: date.month() + 1,
    year: date.year(),
    hour: date.hour(),
    minute: date.minute(),
    second: date.second(),
  };
};

export const fromRngDateTime = (date: RngDateTime): Dayjs => {
  return dayjs(
    new Date(
      date.year,
      date.month - 1,
      date.day,
      date.hour,
      date.minute,
      date.second,
    ),
  );
};

export const formatRngDateTime = (
  date: RngDateTime,
  opts?: { seconds: boolean },
): string => {
  const format = opts?.seconds
    ? rngChronoFormat.dateHourMinutesSeconds
    : rngChronoFormat.dateHourMinutes;
  return fromRngDateTime(date).format(format);
};

export const rngDate = (): RngDate => {
  return toRngDate(dayjs());
};

export type RngTime = {
  hour: number;
  minute: number;
  second: number;
};

export const toRngTime = (date: Dayjs): RngTime => {
  return {
    hour: date.hour(),
    minute: date.minute(),
    second: date.second(),
  };
};

export const fromRngTime = (time: RngTime): Dayjs => {
  return dayjs(new Date(0, 0, 0, time.hour, time.minute, time.second));
};

export const rngTime = (): RngTime => {
  return toRngTime(dayjs());
};

export const addRngTime = (date: RngDate, time: RngTime): RngDateTime => {
  const datetime = fromRngDate(date)
    .set("hour", time.hour)
    .set("minute", time.minute)
    .set("second", time.second);
  return toRngDateTime(datetime);
};
