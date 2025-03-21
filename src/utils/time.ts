import type { RngDate, RngDateTime } from "rng_tools";
import dayjs, { Dayjs } from "dayjs";

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
