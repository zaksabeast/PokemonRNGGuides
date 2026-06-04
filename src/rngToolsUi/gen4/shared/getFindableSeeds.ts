import { keyBy } from "lodash-es";
import { rngTools, RngDate } from "~/rngTools";
import { addRngTime, RngTime } from "~/utils/time";

export const getFindableSeeds = async ({
  minDelay,
  maxDelay,
  minSeconds,
  maxSeconds,
  date,
  time,
}: {
  minDelay: number;
  maxDelay: number;
  minSeconds: number;
  maxSeconds: number;
  date: RngDate;
  time: RngTime;
}) => {
  const seedTimes = await rngTools.calc_gen4_seeds({
    min_delay: minDelay,
    max_delay: maxDelay,
    seconds_increment: Math.max(maxSeconds - minSeconds, 0),
    datetime: addRngTime(date, {
      ...time,
      second: minSeconds,
    }),
  });
  const seedTimesBySeed = keyBy(seedTimes, ({ seed }) => seed);
  const seedList = new Uint32Array(seedTimes.map(({ seed }) => seed));

  return {
    seedTimesBySeed,
    seedList,
  };
};
