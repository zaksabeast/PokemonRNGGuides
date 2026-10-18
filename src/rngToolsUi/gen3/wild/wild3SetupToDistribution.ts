import {
  Gen3Method,
  rngTools,
  Species,
  Wild3GeneratorOptions,
  Wild3GeneratorCycleOpts,
  Wild3MethodDistributionResult,
  Wild3SearcherResultMon,
  CycleFrameMoment,
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
import sortBy from "lodash-es/sortBy";
import { match, P } from "ts-pattern";

export type UiResult = FlattenIvs<
  Wild3SearcherResultMon & {
    species: Species;
    uid: number;
    method_probability: Wild3MethodDistributionResult["method_probability"];
    pre_sweet_scent_cycle_range: Wild3MethodDistributionResult["pre_sweet_scent_cycle_range"];
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
    pre_sweet_scent_cycle_range: res.pre_sweet_scent_cycle_range,
    species: res.searcher_res.species,
    uid: nextUid++,
  };
};

const convertSearcherResultsToUIResults = (
  results: Wild3MethodDistributionResult[],
) => {
  return sortBy(results.map(convertSearcherResultToUIResult), [
    (el) => el.pre_sweet_scent_cycle_range.start,
    (el) => el.pre_sweet_scent_cycle_range.len,
  ]);
};

export type Wild3Distributions = {
  uiResults: UiResult[];
  cycle_at_moments: CycleFrameMoment[];
  advanceAtSweetScent: number;
  hasError: boolean;
  idealLeadCycleSpd: number | null;
  cycle_opts: Wild3GeneratorCycleOpts;
};

export const setupToDistributions = async (
  targetSetup: TargetSetup,
  cycle_opts: Wild3GeneratorCycleOpts,
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
    using_white_flute: targetSetup.requiresWhiteFlute,
    roamer_state: targetSetup.roamerState,
    mass_outbreak_state: targetSetup.massOutbreakState,
    feebas_state: targetSetup.feebasState,
    feebas_cycles: targetSetup.feebasCycles,
    cycle_opts,
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
      cycle_opts,
    };
  }

  const argsWithoutEmuLog = (leadCycleSpd: number) => ({
    leadCycleSpd,
    initialCycleAtSweetScent: undefined,
    vblankCycles: undefined,
  });

  const distributionArgs = match(cycle_opts)
    .with({ CycleAtMomentWithEmuLog: P.select() }, (emuLog) => ({
      leadCycleSpd: emuLog.lead_cycle_spd,
      initialCycleAtSweetScent: emuLog.initial_cycle_at_sweet_scent,
      vblankCycles: new Uint32Array(emuLog.vblank_cycles),
    }))
    .with({ CycleAtMomentNoEmuLog: P.select() }, ({ lead_cycle_spd }) =>
      argsWithoutEmuLog(lead_cycle_spd),
    )
    .with({ LikelihoodForLead: P.select() }, ({ lead_cycle_spd }) =>
      argsWithoutEmuLog(lead_cycle_spd),
    )
    .otherwise(() => argsWithoutEmuLog(AVERAGE_LEAD_CYCLE_SPEED));

  const { results, cycle_at_moments } =
    await rngTools.generate_gen3_wild_distribution(
      targetSetup.targetPaintingAdvs.before,
      targetSetup.targetPaintingAdvs.after,
      opts,
      map_data,
      distributionArgs.leadCycleSpd,
      distributionArgs.initialCycleAtSweetScent,
      distributionArgs.vblankCycles,
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
      (lcrng_distance(0, targetSetup.targetPaintingAdvs.before) +
        targetSetup.targetPaintingAdvs.after) %
      2 ** 32,
    hasError: false,
    idealLeadCycleSpd,
    cycle_opts,
  };
};
