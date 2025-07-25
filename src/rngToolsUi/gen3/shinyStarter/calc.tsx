import type { Game, Starter, TargetStarter } from "./index";
import type { FormState } from "./caughtMon";
import { rngTools } from "~/rngTools";
import { getStrictBaseStats } from "~/types/baseStats";
import { MinMax } from "~/types/stat";
import {
  getPkmFilterInitialValues,
  pkmFilterFieldsToRustInput,
} from "~/components/pkmFilter";
import { defaultHiddenPowerFilter } from "~/components/hiddenPowerInput";

export type CaughtMonResult = {
  advance: number;
  targetAdvance: number;
};

const MINIMAL_ADV = 500;

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
  const opts = {
    offset: 0,
    initial_advances: targetAdv,
    max_advances: 0,
    seed: game === "emerald" ? 0 : 0x5a0,
    method4: false,
    filter: pkmFilterFieldsToRustInput(getPkmFilterInitialValues()),
    tid: 0, // doesn't matter
    sid: 0, // doesn't matter
    bugged_roamer: false, // doesn't matter
    species: pokemonSpecies, // doesn't matter
  };

  const genResults = await rngTools.gen3_static_generator_states(opts);
  if (genResults.length === 0) {
    return "";
  }
  const res = genResults[0];

  const stats = await rngTools.calculate_stats(
    getStrictBaseStats(pokemonSpecies),
    5,
    res.nature,
    res.ivs,
    { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 },
  );

  return `${res.gender}, ${res.nature}, HP ${stats.hp}, ATK ${stats.atk}, DEF ${stats.def}, SPA ${stats.spa}, SPD ${stats.spd}, SPE ${stats.spe}`;
};

const getMinMaxStat = (
  isMin: boolean,
  selected: number,
  { min, max }: MinMax,
) => {
  if (selected >= min && selected <= max) {
    return selected;
  }
  return isMin ? min : max;
};

export const generateCaughtMonResults = async (
  game: Game,
  targetAdvance: number,
  targetStarter: TargetStarter,
  caughtMonValues: FormState,
): Promise<CaughtMonResult[]> => {
  const { species: targetSpecies, minMaxStats } = targetStarter;
  const [min_stats, max_stats] = [true, false].map((isMin) => ({
    hp: getMinMaxStat(isMin, caughtMonValues.hpStat, minMaxStats.hp),
    atk: getMinMaxStat(isMin, caughtMonValues.atkStat, minMaxStats.atk),
    def: getMinMaxStat(isMin, caughtMonValues.defStat, minMaxStats.def),
    spa: getMinMaxStat(isMin, caughtMonValues.spaStat, minMaxStats.spa),
    spd: getMinMaxStat(isMin, caughtMonValues.spdStat, minMaxStats.spd),
    spe: getMinMaxStat(isMin, caughtMonValues.speStat, minMaxStats.spe),
  }));

  const opts = {
    offset: 0,
    initial_advances: Math.max(targetAdvance - 3000, MINIMAL_ADV),
    max_advances: 6000,
    seed: game === "emerald" ? 0 : 0x5a0,

    method4: false,
    filter: {
      nature: caughtMonValues.nature ?? null,
      gender: caughtMonValues.gender ?? null,
      ability: null,
      shiny: false,
      stats: {
        lvl: 5,
        base_stats: getStrictBaseStats(targetSpecies),
        min_stats,
        max_stats,
      },
      min_ivs: { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 },
      max_ivs: { hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31 },
      hidden_power: defaultHiddenPowerFilter,
    },
    tid: 0, // doesn't matter
    sid: 0, // doesn't matter
    bugged_roamer: false, // doesn't matter
    species: targetSpecies, // doesn't matter
  } as const;

  const genResults = await rngTools.gen3_static_generator_states(opts);
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
