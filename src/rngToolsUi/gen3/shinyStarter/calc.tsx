import type { Game, Starter, TargetStarter } from "./index";
import type { FormState } from "./caughtMon";
import { rngTools, type Gen3StaticMethod } from "~/rngTools";
import {
  gen3PkmFilterFieldsToRustInput,
  getGen3PkmFilterInitialValues,
} from "~/components/gen3PkmFilter";
import {
  getPkmFilterInitialValues,
  pkmFilterFieldsToRustInput,
  pkmFilterNatureFieldToRustInput,
} from "~/components/pkmFilter";
import { defaultHiddenPowerFilter } from "~/components/hiddenPowerInput";
import { getIvRangeFromStats } from "~/types/statRange";
import { nature_from_pid } from "~/types";

export type CaughtMonResult = {
  advance: number;
  targetAdvance: number;
};

const MINIMAL_ADV = 500;
const staticStarterMethods: Gen3StaticMethod[] = ["Static1"];

export const findTargetAdvanceForShinyPokemon = async (
  game: Game,
  tid: number,
  sid: number,
): Promise<number | null> => {
  if (tid < 0 || tid > 0xffff) {
    return null;
  }
  if (sid < 0 || sid > 0xffff) {
    return null;
  }

  const seed = game === "emerald" ? 0 : 0x5a0;
  return rngTools.gen3_earliest_shiny_starter_adv(seed, tid, sid);
};

export const getTargetPokemonDesc = async (
  game: Game,
  targetAdv: number,
  pokemonSpecies: Starter,
): Promise<string> => {
  const encounterGenderRatio =
    await rngTools.get_species_gender_ratio(pokemonSpecies);
  const opts = {
    tid: 0, // doesn't matter
    sid: 0, // doesn't matter
    max_advances: 0,
    max_result_count: 1,
    filter: pkmFilterFieldsToRustInput(getPkmFilterInitialValues()),
    gen3_filter: gen3PkmFilterFieldsToRustInput(
      getGen3PkmFilterInitialValues(),
      pokemonSpecies,
    ),
    painting_opts: null,
    bugged_roamer: false, // doesn't matter
    species: pokemonSpecies,
    methods: staticStarterMethods,
    encounter_gender_ratio: encounterGenderRatio,
  };

  const genResults = await rngTools.generate_gen3_static_wasm(
    game === "emerald" ? 0 : 0x5a0,
    targetAdv,
    opts,
  );
  if (genResults.length === 0) {
    return "";
  }
  const res = genResults[0];
  const nature = nature_from_pid(res.pid);

  const stats = await rngTools.calculate_stats(
    pokemonSpecies,
    5,
    nature,
    res.ivs,
    { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 },
  );
  const gender = await rngTools.get_species_gender_from_pid(
    pokemonSpecies,
    res.pid,
  );

  return `${gender}, ${nature}, HP ${stats.hp}, ATK ${stats.atk}, DEF ${stats.def}, SPA ${stats.spa}, SPD ${stats.spd}, SPE ${stats.spe}`;
};

export const generateCaughtMonResults = async (
  game: Game,
  targetAdvance: number,
  targetStarter: TargetStarter,
  caughtMonValues: FormState,
): Promise<CaughtMonResult[]> => {
  const { species } = targetStarter;

  const minMaxIvs = await getIvRangeFromStats({
    species,
    lvl: 5,
    nature: caughtMonValues.nature,
    stats: {
      hp: caughtMonValues.hpStat,
      atk: caughtMonValues.atkStat,
      def: caughtMonValues.defStat,
      spa: caughtMonValues.spaStat,
      spd: caughtMonValues.spdStat,
      spe: caughtMonValues.speStat,
    },
  });
  if (minMaxIvs == null) {
    return [];
  }

  const maxAdvances = 6000;
  const opts = {
    initial_seed: game === "emerald" ? 0 : 0x5a0,
    tid: 0, // doesn't matter
    sid: 0, // doesn't matter
    initial_advances: Math.max(targetAdvance - 3000, MINIMAL_ADV),
    max_advances: maxAdvances,
    max_result_count: maxAdvances + 1,
    filter: {
      nature: pkmFilterNatureFieldToRustInput([caughtMonValues.nature]),
      gender: caughtMonValues.gender,
      ability: null,
      shiny: false,
      ...minMaxIvs,
      hidden_power: defaultHiddenPowerFilter,
    },
    gen3_filter: gen3PkmFilterFieldsToRustInput(
      getGen3PkmFilterInitialValues(),
      species,
    ),
    painting_opts: null,
    bugged_roamer: false, // doesn't matter
    species,
    methods: staticStarterMethods,
  };

  const genResults = await rngTools.search_static3_reverse(opts);
  const caughtMonResults = genResults.map((res) => {
    return {
      advance: res.advance,
      targetAdvance,
    };
  });

  caughtMonResults.sort((c1, c2) => {
    const diff1 = Math.abs(c1.targetAdvance - c1.advance);
    const diff2 = Math.abs(c2.targetAdvance - c2.advance);
    return diff1 - diff2;
  });

  return caughtMonResults.slice(0, 10);
};
