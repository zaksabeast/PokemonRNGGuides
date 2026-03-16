import { Ivs, Nature, rngTools, Species, StatsValue } from "~/rngTools";
import { MinMaxStats } from "~/types/stat";

export const getStatRange = async ({
  species,
  levelRange = [5, 5],
  evs = { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 },
  nature = null,
}: {
  species: Species;
  levelRange?: [number, number];
  evs?: StatsValue;
  nature: Nature | null;
}): Promise<MinMaxStats> => {
  const minStats = await rngTools.calculate_minmax_stats(
    species,
    levelRange[0],
    true,
    evs,
    nature,
  );

  const maxStats = await rngTools.calculate_minmax_stats(
    species,
    levelRange[1],
    false,
    evs,
    nature,
  );

  return {
    hp: { min: minStats.hp, max: maxStats.hp },
    atk: { min: minStats.atk, max: maxStats.atk },
    def: { min: minStats.def, max: maxStats.def },
    spa: { min: minStats.spa, max: maxStats.spa },
    spd: { min: minStats.spd, max: maxStats.spd },
    spe: { min: minStats.spe, max: maxStats.spe },
  };
};

export const getIvRangeFromStats = async ({
  species,
  lvl,
  nature,
  stats,
}: {
  species: Species;
  lvl: number;
  nature: Nature;
  stats: StatsValue;
}): Promise<{ min_ivs: Ivs; max_ivs: Ivs } | null> => {
  const min_ivs = await rngTools.calculate_min_ivs_from_stats(
    species,
    lvl,
    nature,
    stats,
  );
  if (min_ivs == null) {
    return null;
  }

  const max_ivs = await rngTools.calculate_max_ivs_from_stats(
    species,
    lvl,
    nature,
    stats,
  );
  if (max_ivs == null) {
    return null;
  }

  return { min_ivs, max_ivs };
};
