import { rngTools, Species } from "~/rngTools";
import { getGen3BaseStats } from "~/types/baseStats";
import { defaultMinMaxStats, MinMaxStats } from "~/types/stat";

export const getGen3StatRange = async (
  species: Species,
): Promise<MinMaxStats> => {
  const baseStats = getGen3BaseStats(species);

  if (baseStats == null) {
    return defaultMinMaxStats;
  }

  const minStats = await rngTools.calculate_minmax_stats(baseStats, 5, true);
  const maxStats = await rngTools.calculate_minmax_stats(baseStats, 5, false);

  return {
    hp: { min: minStats.hp, max: maxStats.hp },
    atk: { min: minStats.atk, max: maxStats.atk },
    def: { min: minStats.def, max: maxStats.def },
    spa: { min: minStats.spa, max: maxStats.spa },
    spd: { min: minStats.spd, max: maxStats.spd },
    spe: { min: minStats.spe, max: maxStats.spe },
  };
};
