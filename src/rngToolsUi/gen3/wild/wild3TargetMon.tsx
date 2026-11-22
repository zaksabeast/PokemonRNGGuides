import { Species, Wild3MapSetups } from "~/rngTools";
import { uniq } from "lodash-es";
import { getWild3EmeraldGameData } from "./data/wild3GameData";
const emeraldWildGameData = getWild3EmeraldGameData();

export const getLevelRangeForSpecies = (
  species: Species,
  setups: Wild3MapSetups[],
): { min: number; max: number } | null => {
  let min = Infinity;
  let max = -Infinity;

  const include = (encounter: {
    min_level: number;
    max_level: number;
    species_data: { species: Species };
  }) => {
    if (encounter.species_data.species === species) {
      min = Math.min(min, encounter.min_level);
      max = Math.max(max, encounter.max_level);
    }
  };

  for (const { map_data } of setups) {
    for (const slots of map_data.slots_by_action) {
      for (const slot of slots) {
        include(slot);
      }
    }
    for (const roamer of map_data.roamers) {
      include(roamer.encounter_data);
    }
    for (const outbreak of map_data.mass_outbreaks) {
      include(outbreak.encounter_data);
    }
    if (map_data.feebas != null) {
      include(map_data.feebas);
    }
  }

  return min === Infinity ? null : { min, max };
};

export const getPossibleValuesForSpecies = (species: Species) => {
  const setups = emeraldWildGameData.mapSetupsBySpecies.get(species) ?? [];
  const actions = uniq(setups.flatMap((setup) => setup.actions));
  const is_safari_pokeblock_usable = setups.some((setup) =>
    actions.some((action): boolean =>
      setup.map_data.actions_with_safari_pokeblock.includes(action),
    ),
  );

  return {
    maps: setups.map((setup) => setup.map_data.map_id),
    actions,
    roamerStates: uniq(setups.flatMap((setup) => setup.roamer_states)),
    massOutbreakStates: uniq(
      setups.flatMap((setup) => setup.mass_outbreak_states),
    ),
    feebasStates: uniq(setups.flatMap((setup) => setup.feebas_states)),
    levelRange: getLevelRangeForSpecies(species, setups),
    is_safari_pokeblock_usable,
  };
};
