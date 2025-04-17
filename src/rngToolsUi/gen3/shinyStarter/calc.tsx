import type {Game,Starter} from "./index";
import {
  Gender,
  Nature,
  rngTools,
} from "~/rngTools";

export interface Result {
  adv: number;
  diffWithTarget: number;
  stats: string;
  nature: Nature;
  gender: Gender;
}

export const findTargetAdvanceForShinyPokemon = async function (
  game: Game,
  tid:number,
  sid:number,
): Promise<number | null> {
  const MINIMAL_ADV = 600;

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




const generateResults = async function (
  // values: FormStateFindShiny,
): Promise<Result[]> {
  return [];
};
