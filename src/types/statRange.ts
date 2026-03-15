import { Ivs, Nature, rngTools, Species, StatsValue } from "~/rngTools";
import { MinMaxStats } from "~/types/stat";

export const getStatRange = async (
  species: Species,
  levelRange: [number, number] = [5, 5],
): Promise<MinMaxStats> => {
  const minStats = await rngTools.calculate_minmax_stats(
    species,
    levelRange[0],
    true,
  );
  const maxStats = await rngTools.calculate_minmax_stats(
    species,
    levelRange[1],
    false,
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
