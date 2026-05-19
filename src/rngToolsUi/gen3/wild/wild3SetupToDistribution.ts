import {
  CycleAtMoment,
  Gen3Method,
  rngTools,
  Species,
  Wild3GeneratorOptions,
  Wild3MethodDistributionResult,
  Wild3SearcherResultMon,
} from "~/rngTools";
import { getPossibleValuesForMap } from "./dataUtils";
import { TargetSetup } from "./wild3TargetSetupInput";
import {
  getPkmFilterInitialValues,
  pkmFilterFieldsToRustInput,
} from "~/components/pkmFilter";
import {
  gen3PkmFilterFieldsToRustInput,
  getGen3PkmFilterInitialValues,
} from "~/components/gen3PkmFilter";
import { emeraldWildGameData } from "./wild3CalibCaughtMon";
import { FlattenIvs } from "~/rngToolsUi/shared/ivColumns";
import { lcrng_distance } from "~/utils/lcrng";
import { AVERAGE_LEAD_CYCLE_SPEED } from "./wild3LeadCycleSpeedInput";

export type UiResult = FlattenIvs<
  Wild3SearcherResultMon & {
    species: Species;
    uid: number;
    method_probability: Wild3MethodDistributionResult["method_probability"];
    pre_sweet_scent_cycle_ranges: Wild3MethodDistributionResult["pre_sweet_scent_cycle_ranges"];
  }
>;

let nextUid = 0;
const convertSearcherResultToUIResult = (
  res: Wild3MethodDistributionResult,
): UiResult => {
  return {
    ...res.searcher_res,
    ...res.searcher_res.ivs,
    method_probability: res.method_probability,
    pre_sweet_scent_cycle_ranges: res.pre_sweet_scent_cycle_ranges,
    species: res.searcher_res.species,
    uid: nextUid++,
  };
};

const convertSearcherResultsToUIResults = (
  results: Wild3MethodDistributionResult[],
) => {
  return results
    .map((res) => convertSearcherResultToUIResult(res))
    .sort((lhs, rhs) => {
      const startDiff =
        (lhs.pre_sweet_scent_cycle_ranges[0]?.start ?? -1) -
        (rhs.pre_sweet_scent_cycle_ranges[0]?.start ?? -1);

      if (startDiff !== 0) {
        return startDiff;
      }
      return (
        (lhs.pre_sweet_scent_cycle_ranges[0]?.len ?? 0) -
        (rhs.pre_sweet_scent_cycle_ranges[0]?.len ?? 0)
      );
    });
};

export type Wild3Distributions = {
  uiResults: UiResult[];
  cycle_at_moments: CycleAtMoment[];
  advanceAtSweetScent: number;
  hasError: boolean;
  idealLeadCycleSpd: number | null;
};

export const setupToDistributions = async (
  targetSetup: TargetSetup,
  lead_cycle_speed: number,
): Promise<Wild3Distributions> => {
  const { canUsePokeblock } = getPossibleValuesForMap(
    targetSetup.map,
    targetSetup.action,
  );

  const opts: Wild3GeneratorOptions = {
    tid: 0,
    sid: 0,
    map_idx: 0,
    action: targetSetup.action,
    methods: ["Wild1", "Wild2", "Wild3", "Wild4", "Wild5"] as Gen3Method[],
    lead: targetSetup.lead,
    filter: pkmFilterFieldsToRustInput(getPkmFilterInitialValues()),
    gen3_filter: gen3PkmFilterFieldsToRustInput(
      getGen3PkmFilterInitialValues(),
      null,
    ),
    consider_cycles: true,
    consider_rng_manipulated_lead_pid: true,
    generate_even_if_impossible: true,
    using_white_flute: targetSetup.requiresWhiteFlute,
    roamer_state: targetSetup.roamerState,
    mass_outbreak_state: targetSetup.massOutbreakState,
    feebas_state: targetSetup.feebasState,
    lead_cycle_speed,
    safari_pokeblock:
      canUsePokeblock && targetSetup.safariPokeblock !== null
        ? {
            Specific: targetSetup.safariPokeblock,
          }
        : null,
  };

  const map_data = emeraldWildGameData.maps_data.find(
    (table) => table.map_id === targetSetup.map,
  );
  if (map_data == null) {
    return {
      uiResults: [],
      cycle_at_moments: [],
      advanceAtSweetScent: 0,
      hasError: true,
      idealLeadCycleSpd: null,
    };
  }

  const { results, cycle_at_moments } =
    await rngTools.generate_gen3_wild_distribution(
      targetSetup.targetPaintingAdvs.before,
      targetSetup.targetPaintingAdvs.after,
      opts,
      map_data,
    );

  const resultForTargetMethod = results.find(
    (res) => res.searcher_res.method === targetSetup.targetMethod,
  );
  const idealLeadCycleSpd =
    resultForTargetMethod?.searcher_res.cycle_data_by_lead?.ideal_lead
      .lead_pid_cycle_count ?? AVERAGE_LEAD_CYCLE_SPEED;

  return {
    uiResults: convertSearcherResultsToUIResults(results),
    cycle_at_moments,
    advanceAtSweetScent:
      lcrng_distance(0, targetSetup.targetPaintingAdvs.before) +
      targetSetup.targetPaintingAdvs.after,
    hasError: false,
    idealLeadCycleSpd,
  };
};
