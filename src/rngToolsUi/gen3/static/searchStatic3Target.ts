import { gen3PkmFilterFieldsToRustInput } from "~/components/gen3PkmFilter";
import { pkmFilterFieldsToRustInput } from "~/components/pkmFilter";
import { rngTools } from "~/rngTools";
import { flattenIvs } from "~/rngToolsUi/shared/ivColumns";

import type { FormState, PidPathResult } from "./static3TargetSetupSearcher";
import { Static3Game } from "./constants";
import { createFastestAdvsCache } from "../paintingReseeding/paintingCache";

let nextUid = 0;

const getInitialSeed = (game: Static3Game, opts: FormState) => {
  if (opts.usingPaintingReseeding && opts.letSearcherFindPaintingSeed) {
    return 0;
  }

  if (game === "rs" && opts.usingDeadBattery) {
    return 0x5a0;
  }

  return opts.initial_seed;
};

export const searchStatic3Target = async (
  game: Static3Game,
  opts: FormState,
): Promise<PidPathResult[]> => {
  const initial_seed = getInitialSeed(game, opts);

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

  const results = await rngTools.search_static3(searchOpts);

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
};
