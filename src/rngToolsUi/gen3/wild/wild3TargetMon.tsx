import { Species } from "~/rngTools";
import { uniq } from "lodash-es";
import { getWild3EmeraldGameData } from "./data/wild3GameData";
const emeraldWildGameData = getWild3EmeraldGameData();

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
    is_safari_pokeblock_usable,
  };
};
