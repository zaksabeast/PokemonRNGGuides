import {
  getPkmFilterInitialValues,
  pkmFilterFieldsToRustInput,
} from "~/components/pkmFilter";
import { gen3Methods } from "~/types";
import {
  Wild3EncounterGameData,
  Wild3MapSetups,
  Wild3SearcherOptions,
} from "~/rngTools";
import { getWild3EmeraldGameData } from "./data/wild3GameData";
import type { TargetSetup } from "./wild3TargetSetupInput";
import { isFishingAction, wild3Actions } from "./utils";
import { getIvRangeFromStats } from "~/types/statRange";
import {
  gen3PkmFilterFieldsToRustInput,
  getGen3PkmFilterInitialValues,
} from "~/components/gen3PkmFilter";
import {
  BATTLE_VIDEO_CONFIDENCE_RANGE,
  type FormState,
} from "../pokemonRng/calibCaughtMon";

export const emeraldWildGameData = getWild3EmeraldGameData();

export const createWild3SearcherOptions = async (
  values: FormState,
  targetSetup: TargetSetup,
  leadCycleSpeed: number,
) => {
  const initial_seed = targetSetup.targetPaintingAdvs.before;

  const initial_advances = Math.max(
    targetSetup.targetPaintingAdvs.after - BATTLE_VIDEO_CONFIDENCE_RANGE,
    0,
  );

  const map_data = emeraldWildGameData.maps_data.find(
    (map) => map.map_id === targetSetup.map,
  );
  if (map_data == null) {
    return null;
  }
  const map_setup: Wild3MapSetups = {
    map_data,
    actions: [targetSetup.action],
    roamer_states: [targetSetup.roamerState],
    mass_outbreak_states: [targetSetup.massOutbreakState],
    feebas_states: [targetSetup.feebasState],
  };

  const minMaxIvs = await getIvRangeFromStats({
    species: values.wildSpecies,
    lvl: values.wildLvl,
    nature: values.nature,
    stats: {
      hp: values.hpStat,
      atk: values.atkStat,
      def: values.defStat,
      spa: values.spaStat,
      spd: values.spdStat,
      spe: values.speStat,
    },
  });

  if (minMaxIvs == null) {
    return null;
  }

  const max_advances = BATTLE_VIDEO_CONFIDENCE_RANGE * 2;
  const opts: Wild3SearcherOptions = {
    initial_seed,
    tid: 0, // doesn't matter
    sid: 0, // doesn't matter
    initial_advances,
    max_advances,
    max_result_count: 2 ** 32 - 1, // No limit
    filter: {
      ...pkmFilterFieldsToRustInput({
        ...getPkmFilterInitialValues(),
        filter_nature: [values.nature],
        filter_gender: values.gender,
        filter_ability: values.ability,
      }),
      ...minMaxIvs,
    },
    gen3_filter: gen3PkmFilterFieldsToRustInput(
      {
        ...getGen3PkmFilterInitialValues(),
        filter_lvl: values.wildLvl,
      },
      values.wildSpecies,
    ),
    leads: [targetSetup.lead],
    map_setups: [map_setup],
    methods: gen3Methods,
    consider_cycles: true,
    consider_rng_manipulated_lead_pid: false,
    generate_even_if_impossible: values.generate_even_if_impossible,
    using_white_flute: targetSetup.requiresWhiteFlute,
    painting_opts: null,
    lead_cycle_speed: leadCycleSpeed,
    considered_safari_pokeblocks:
      targetSetup.safariPokeblock == null
        ? "None"
        : {
            Specific: targetSetup.safariPokeblock,
          },
  };

  return opts;
};

export const getPossibleEncountersForMap = (targetSetup: TargetSetup) => {
  const map_data = emeraldWildGameData.maps_data.find(
    (map) => map.map_id === targetSetup.map,
  );
  if (map_data == null) {
    return [];
  }

  const list: Wild3EncounterGameData[] = [
    ...map_data.slots_by_action[wild3Actions.indexOf(targetSetup.action)],
  ];
  if (isFishingAction(targetSetup.action) && map_data.feebas != null) {
    list.push(map_data.feebas);
  }
  if (targetSetup.action === "SweetScentLand") {
    list.push(
      ...map_data.roamers
        .filter((roamer) => roamer.id === targetSetup.roamerState)
        .map((roamer) => roamer.encounter_data),
    );
  }
  if (
    targetSetup.action === "SweetScentLand" ||
    targetSetup.action === "SweetScentWater"
  ) {
    list.push(
      ...map_data.mass_outbreaks
        .filter(
          (mass_outbreak) => mass_outbreak.id === targetSetup.massOutbreakState,
        )
        .map((mass_outbreak) => mass_outbreak.encounter_data),
    );
  }
  return list;
};
