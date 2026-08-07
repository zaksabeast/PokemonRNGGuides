import { uniqueId, keyBy } from "lodash-es";
import { rngTools, RngDate, SeedTime4, ElmCall } from "~/rngTools";
import { addRngTime, RngTime } from "~/utils/time";
import { shrinkCoinFlips, SmallCoinFlip } from "./dpptCoinFlip/utils";

type SeedFinderOpts = {
  minDelay: number;
  maxDelay: number;
  minSeconds: number;
  maxSeconds: number;
  date: RngDate;
  time: RngTime;
};

const getFindableSeeds = async ({
  minDelay,
  maxDelay,
  minSeconds,
  maxSeconds,
  date,
  time,
}: SeedFinderOpts) => {
  const seedTimes = await rngTools.generate_seedtime4s({
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

export type GetSeedTime4WithMarkersOpts = {
  filterItemCount: number;
  includeCoinFlips: boolean;
  includeElmCalls: boolean;
} & SeedFinderOpts;

export type SeedTime4WithMarkers = {
  id: string;
  seed: number;
  seedTime: SeedTime4;
  coinFlips: SmallCoinFlip[];
  elmCalls: ElmCall[];
};

export const getSeedTime4WithMarkers = async (
  opts: GetSeedTime4WithMarkersOpts,
): Promise<SeedTime4WithMarkers[]> => {
  const { seedTimesBySeed, seedList } = await getFindableSeeds(opts);
  const coinFlips = opts.includeCoinFlips
    ? await rngTools.coin_flips_for_seeds(seedList, opts.filterItemCount)
    : [];
  const elmCalls = opts.includeElmCalls
    ? await rngTools.elm_calls_for_seeds(seedList, opts.filterItemCount)
    : [];

  const coinFlipsBySeed = keyBy(coinFlips, ({ seed }) => seed);
  const elmCallsBySeed = keyBy(elmCalls, ({ seed }) => seed);

  return [...seedList].map((seed): SeedTime4WithMarkers => {
    return {
      id: uniqueId(),
      seed,
      seedTime: seedTimesBySeed[seed],
      coinFlips: shrinkCoinFlips(coinFlipsBySeed[seed]?.coin_flips ?? []),
      elmCalls: elmCallsBySeed[seed]?.elm_calls ?? [],
    };
  });
};
