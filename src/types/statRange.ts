import { rngTools, Species } from "~/rngTools";
import { getLooseBaseStats } from "~/types/baseStats";
import { defaultMinMaxStats, MinMaxStats } from "~/types/stat";

export const getStatRange = async (
  species: Species,
  levelRange: [number, number] = [5, 5],
): Promise<MinMaxStats> => {
  const baseStats = getLooseBaseStats(species);

  if (baseStats == null) {
    return defaultMinMaxStats;
  }

  const minStats = await rngTools.calculate_minmax_stats(
    baseStats,
    levelRange[0],
    true,
  );
  const maxStats = await rngTools.calculate_minmax_stats(
    baseStats,
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
