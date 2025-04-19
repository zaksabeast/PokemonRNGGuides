import type {Game,Starter} from "./index";
import type {FormState} from "./caughtMon";
import {Stat} from "../../../types/stat";
import {
  Gender,
  Nature,
  rngTools,
} from "~/rngTools";

export interface CaughtMonResult {
  advance: number;
  targetAdvance:number;
  stats: string;
  nature: Nature;
  gender: Gender;
}

const MINIMAL_ADV = 600;

export const findTargetAdvanceForShinyPokemon = async function (
  game: Game,
  tid:number,
  sid:number,
): Promise<number | null> {
  if (tid < 0 || tid > 0xFFFF)
      return null;
  if (sid < 0 || sid > 0xFFFF)
      return null;
  console.log(tid, sid);

  for (let i = 0; i < 100; i++) {
    const seed = game === "emerald" ? 0 : 0x5a0;
    const initial_advances = Math.max(i * 100_000, MINIMAL_ADV);
    const results = await rngTools.gen3_static_generator_states({
      species: "Mudkip", // doesn't matter
      method4: false,
      initial_advances,
      max_advances: 100_000,
      seed,
      offset: 0,
      tid: tid,
      sid: sid,
      bugged_roamer: false,
      filter: {
        shiny: true,
        nature: undefined,
        gender: undefined,
        ability: undefined,
        min_ivs: { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 },
        max_ivs: { hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31 },
        stats: undefined,
      },
    });
    if (results.length) return results[0].advance;
  }

  return null;
};


const BASE_STATS = {
  "Mudkip":{hp:50, atk:70, def:50, spa:50, spd:50, spe:40},
  "Treecko":{hp:40, atk:45, def:35, spa:65, spd:55, spe:70},
  "Torchic":{hp:45, atk:60, def:40, spa:70, spd:50, spe:45},
} as const;

export const getStatRangeForStarter = async (starter: Starter) => {
  const baseStats = BASE_STATS[starter];
  const minStats = await rngTools.gen3_calculate_minmax_stats(baseStats, 5, true);
  const maxStats = await rngTools.gen3_calculate_minmax_stats(baseStats, 5, false);

  return {
    hp:  {min:minStats.hp,max: maxStats.hp },
    atk: {min:minStats.atk,max: maxStats.atk },
    def: {min:minStats.def,max: maxStats.def },
    spa: {min:minStats.spa,max: maxStats.spa },
    spd: {min:minStats.spd,max: maxStats.spd },
    spe: {min:minStats.spe,max: maxStats.spe },
  };
};


export const generateCaughtMonResults = async function (
  game:Game,
  targetAdvance:number,
  caughtMonValues: FormState,
): Promise<CaughtMonResult[]> {

  let getMinMaxStat = (isMin:boolean, selected:number, {min,max}:{min:number,max:number}) => {
    if (selected >= min && selected <= max)
        return selected;
    return isMin ? min : max;
  };

  const [min_stats, max_stats] = [true, false].map(isMin => ({
    hp:getMinMaxStat(isMin, caughtMonValues.hpStat, caughtMonValues.minMaxStats.hp),
    atk:getMinMaxStat(isMin, caughtMonValues.atkStat, caughtMonValues.minMaxStats.atk),
    def:getMinMaxStat(isMin, caughtMonValues.defStat, caughtMonValues.minMaxStats.def),
    spa:getMinMaxStat(isMin, caughtMonValues.spaStat, caughtMonValues.minMaxStats.spa),
    spd:getMinMaxStat(isMin, caughtMonValues.spdStat, caughtMonValues.minMaxStats.spd),
    spe:getMinMaxStat(isMin, caughtMonValues.speStat, caughtMonValues.minMaxStats.spe),
  }));

  const opts = {
    offset: 0,
    initial_advances: Math.max(targetAdvance - 3000, MINIMAL_ADV),
    max_advances: 6000,
    seed:game === "emerald" ? 0 : 0x5A0,

    method4: false, 
    filter: {
      nature: caughtMonValues.nature || undefined,
      gender: caughtMonValues.gender || undefined,
      ability: undefined,
      shiny:false, 
      stats: {
        lvl: 5,
        base_stats: BASE_STATS[caughtMonValues.pokemonSpecies],
        min_stats,
        max_stats,
      },
      min_ivs: { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 },
      max_ivs: { hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31 },
    },
    tid: 0, // doesn't matter
    sid: 0, // doesn't matter
    bugged_roamer: false,  // doesn't matter
    species: "Mudkip", // doesn't matter
  } as const;

  const genResults = await rngTools.gen3_static_generator_states(opts);

  const caughtMonResults = genResults.map(r => {
    return {
      advance: r.advance,
      targetAdvance,
      stats: JSON.stringify(r.ivs),
      nature: r.nature,
      gender: r.gender,
    }
  });

  caughtMonResults.sort((c1, c2) => {
    const diff1 = Math.abs(c1.targetAdvance - c1.advance);
    const diff2 = Math.abs(c2.targetAdvance - c2.advance);
    return diff1 - diff2;
  });

  return caughtMonResults.slice(0, 10);
};
