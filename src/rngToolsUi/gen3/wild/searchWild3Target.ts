import {
  rngTools,
  Wild3SearcherResultMon,
  Wild3MapSetups,
  Wild3SearcherOptions,
  Wild3PaintingAdvsAndDur,
} from "~/rngTools";
import { pkmFilterFieldsToRustInput } from "~/components/pkmFilter";
import { orderBy, intersection } from "lodash-es";
import { gen3PkmFilterFieldsToRustInput } from "~/components/gen3PkmFilter";
import { gen3Leads, formatActionName, formatMapName } from "./utils";
import { getWild3EmeraldGameData } from "./data/wild3GameData";

import type {
  FormState,
  PidPathResult,
  ResultSetupInfo,
} from "./wild3FindTarget.tsx";

const emeraldWildGameData = getWild3EmeraldGameData();

let nextUid = 0;

type FastestAdvsCache = Awaited<ReturnType<typeof createFastestAdvsCache>>;

const convertResultsForPidPathToPidPathResult = async (
  originalResults: Wild3SearcherResultMon[],
  mapSetups: Wild3MapSetups[],
  rngManipulatedLeadPid: boolean,
  initial_seed: number,
  getAdvsFromCache: FastestAdvsCache,
): Promise<PidPathResult | null> => {
  let results = [...originalResults];
  // Limitation: The UI components only support that all results for the same PidPath
  // requires painting, or none do. Having both only occurs in the rare cases that
  // the results overlap DONT_USE_PAINTING_IF_BELOW_ADV threshold.
  const hasPainting = results.some(
    (res) => getAdvsFromCache(res.advance).advs.frame_before_painting !== 0,
  );
  if (hasPainting) {
    results = results.filter(
      (res) => getAdvsFromCache(res.advance).advs.frame_before_painting !== 0,
    );
  }

  if (results.length === 0) {
    return null;
  }

  const firstRes = results[0];

  const resultSetupInfos: ResultSetupInfo[] = await Promise.all(
    results.map((res) => {
      const mapSetup = mapSetups[res.map_idx];
      const mapName = formatMapName(mapSetup.map_data.map_id);
      const primaryLikelihood = (() => {
        const { cycle_data_by_lead } = res;
        if (cycle_data_by_lead == null) {
          return 0;
        }

        if (rngManipulatedLeadPid) {
          return cycle_data_by_lead.ideal_lead.method_probability;
        }

        return Math.min(
          cycle_data_by_lead.common_lower_lead.method_probability,
          cycle_data_by_lead.common_upper_lead.method_probability,
        );
      })();

      return {
        ...res,
        uid: nextUid++,
        mapId: mapSetup.map_data.map_id,
        mapName,
        actionName: formatActionName(res.action),
        primaryLikelihood,
        initial_seed,
        ...getAdvsFromCache(res.advance),
      };
    }),
  );

  const earliestAdvance = Math.min(...results.map((res) => res.advance));

  return {
    ...firstRes,
    ...firstRes.ivs,
    earliestAdvance,
    ...getAdvsFromCache(earliestAdvance),
    uid: nextUid++,
    pidCycleCount: await rngTools.calculate_pid_speed(firstRes.pid),
    resultSetupInfos: orderBy(
      resultSetupInfos,
      ["primaryLikelihood", "advance", "method", "map_idx"],
      ["desc", "asc", "asc", "asc"],
    ),
  };
};

const createFastestAdvsCache = async (
  opts: Wild3SearcherOptions["painting_opts"],
  advs: number[],
) => {
  const fallbackFunc = (adv: number): Wild3PaintingAdvsAndDur => {
    return {
      advs: {
        frame_before_painting: 0,
        adv_after_painting: adv,
      },
      wait_dur: adv,
    };
  };

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

  const map = new Map<number, Wild3PaintingAdvsAndDur>();

  fastestAdvs.forEach((fastestAdv, i) => {
    map.set(advsWithoutDupe[i], fastestAdv);
  });

  return (adv: number): Wild3PaintingAdvsAndDur => {
    return map.get(adv) ?? fallbackFunc(adv);
  };
};

const getMapSetupsConsideringStateSubsets = (
  values: FormState,
): Wild3MapSetups[] => {
  const mapSetupsWithAllStates =
    emeraldWildGameData.mapSetupsBySpecies.get(values.species) ?? [];
  if (values.recommendedSetups) {
    // Filtering will be done in searcher_reverse to improve performance.
    return mapSetupsWithAllStates;
  }

  return mapSetupsWithAllStates
    .filter((mapSetupWithAllStates) => {
      return values.maps.includes(mapSetupWithAllStates.map_data.map_id);
    })
    .map((mapSetupWithAllStates) => {
      return {
        map_data: mapSetupWithAllStates.map_data,
        actions: intersection(mapSetupWithAllStates.actions, values.actions),
        roamer_states: intersection(
          mapSetupWithAllStates.roamer_states,
          values.roamerStates,
        ),
        mass_outbreak_states: intersection(
          mapSetupWithAllStates.mass_outbreak_states,
          values.massOutbreakStates,
        ),
        feebas_states: intersection(
          mapSetupWithAllStates.feebas_states,
          values.feebasStates,
        ),
      };
    });
};

export const searchWild3Target = async (values: FormState) => {
  const initial_seed =
    values.usingPaintingReseeding && !values.letSearcherFindPaintingSeed
      ? values.initial_seed
      : 0;

  const initial_advances = values.usingPaintingReseeding
    ? values.min_adv_after_painting
    : values.initial_advances;

  const map_setups = getMapSetupsConsideringStateSubsets(values);

  const painting_opts =
    values.usingPaintingReseeding && values.letSearcherFindPaintingSeed
      ? {
          min_frame_before_painting: values.min_frame_before_painting,
          min_adv_after_painting: values.min_adv_after_painting,
        }
      : null;

  const leadsToUse = values.recommendedSetups
    ? [...gen3Leads]
    : values.leadIdxs.map((i) => gen3Leads[i]);

  // max_advances field is hidden when searching for painting seed.
  // It's important to use a high max_advances value to ensure results
  // if the naive searching approach is used (when searching common traits).
  const max_advances = painting_opts != null ? 10_000_000 : values.max_advances;

  const opts: Wild3SearcherOptions = {
    initial_seed,
    tid: values.tid,
    sid: values.sid,
    initial_advances,
    max_advances,
    max_result_count: values.max_result_count,
    filter: pkmFilterFieldsToRustInput(values),
    gen3_filter: gen3PkmFilterFieldsToRustInput(values, values.species),
    leads: leadsToUse,
    map_setups,
    methods: values.methods,
    consider_cycles: true,
    consider_rng_manipulated_lead_pid: values.rngManipulatedLeadPid,
    generate_even_if_impossible: values.generate_even_if_impossible,
    painting_opts,
    lead_cycle_speed: null,
  };

  const resultsByPidPath = await rngTools.search_wild3(opts);
  const advs = resultsByPidPath
    .map((pidPath) => pidPath.vec.map((res) => res.advance))
    .flat();
  const fastestAdvsCache = await createFastestAdvsCache(
    opts.painting_opts,
    advs,
  );

  const pidPathResults = await Promise.all(
    resultsByPidPath.map((results) =>
      convertResultsForPidPathToPidPathResult(
        results.vec,
        map_setups,
        values.rngManipulatedLeadPid,
        initial_seed,
        fastestAdvsCache,
      ),
    ),
  );

  return pidPathResults;
};
