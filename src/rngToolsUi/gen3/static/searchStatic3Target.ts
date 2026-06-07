import { gen3PkmFilterFieldsToRustInput } from "~/components/gen3PkmFilter";
import { pkmFilterFieldsToRustInput } from "~/components/pkmFilter";
import { rngTools, Wild3PaintingAdvsAndDur } from "~/rngTools";
import { flattenIvs } from "~/rngToolsUi/shared/ivColumns";

import type { FormState, PidPathResult } from "./static3TargetSetupSearcher";
import { Static3Game } from "./constants";

type PaintingOpts = {
  min_frame_before_painting: number;
  min_adv_after_painting: number;
} | null;

let nextUid = 0;

const createFastestAdvsCache = async (
  opts: PaintingOpts,
  advs: number[],
  initial_seed: number,
) => {
  const fallbackFunc = (adv: number): Wild3PaintingAdvsAndDur => ({
    advs: {
      frame_before_painting: initial_seed,
      adv_after_painting: adv,
    },
    wait_dur: adv,
  });

  if (opts == null || advs.length === 0) {
    return fallbackFunc;
  }

  const advsWithoutDupe = new Uint32Array(new Set(advs));
  const fastestAdvs = await rngTools.find_fastest_advs_considering_painting(
    opts,
    advsWithoutDupe,
  );

  if (fastestAdvs.length !== advsWithoutDupe.length) {
    return fallbackFunc;
  }

  const fastestAdvsByAdvance = new Map<number, Wild3PaintingAdvsAndDur>();
  fastestAdvs.forEach((fastestAdv, i) => {
    fastestAdvsByAdvance.set(advsWithoutDupe[i], fastestAdv);
  });

  return (adv: number): Wild3PaintingAdvsAndDur =>
    fastestAdvsByAdvance.get(adv) ?? fallbackFunc(adv);
};

export const searchStatic3Target = (
  game: Static3Game,
  opts: FormState,
): Promise<PidPathResult[]> => {
  const initial_seed =
    opts.usingPaintingReseeding && opts.letSearcherFindPaintingSeed
      ? 0
      : opts.initial_seed;

  const initial_advances = opts.usingPaintingReseeding
    ? opts.min_adv_after_painting
    : opts.initial_advances;

  const painting_opts =
    opts.usingPaintingReseeding && opts.letSearcherFindPaintingSeed
      ? {
          min_frame_before_painting: opts.min_frame_before_painting,
          min_adv_after_painting: opts.min_adv_after_painting,
        }
      : null;

  const max_advances = painting_opts == null ? opts.max_advances : 10_000_000;

  const bugged_roamer = game !== "emerald" && opts.roaming;

  const searchOpts = {
    initial_seed,
    tid: opts.tid,
    sid: opts.sid,
    initial_advances,
    max_advances,
    max_result_count: opts.max_result_count,
    filter: pkmFilterFieldsToRustInput(opts),
    gen3_filter: gen3PkmFilterFieldsToRustInput(opts, opts.species),
    painting_opts,
    species: opts.species,
    bugged_roamer,
    methods: opts.methods,
  };

  return rngTools.search_static3(searchOpts).then(async (results) => {
    const getAdvsFromCache = await createFastestAdvsCache(
      searchOpts.painting_opts,
      results.map((result) => result.advance),
      initial_seed,
    );

    return Promise.all(
      results.map(
        async (result): Promise<PidPathResult> => ({
          ...flattenIvs(result),
          ...getAdvsFromCache(result.advance),
          uid: nextUid++,
          pidCycleCount: await rngTools.calculate_pid_speed(result.pid),
          earliestAdvance: result.advance,
          initial_seed,
          species: opts.species,
          roaming: opts.roaming,
        }),
      ),
    );
  });
};
