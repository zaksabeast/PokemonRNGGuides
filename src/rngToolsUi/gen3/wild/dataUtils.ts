import { Wild3Action } from "~/rngTools";
import { getWild3EmeraldGameData } from "./data/wild3GameData";
import uniq from "lodash-es/uniq";

const emeraldWildGameData = getWild3EmeraldGameData();

export const getPossibleValuesForMap = (mapId: string, action: Wild3Action) => {
  const mapSetups = Array.from(emeraldWildGameData.mapSetupsBySpecies.values())
    .flat()
    .filter((mapSetup) => {
      return mapSetup.map_data.map_id === mapId;
    });

  const mapSetupsForAction = mapSetups.filter((mapSetup) => {
    return mapSetup.actions.includes(action);
  });

  const feebas_states = uniq(
    mapSetupsForAction.flatMap((mapSetup) => mapSetup.feebas_states),
  ).filter((state) => {
    // fix issue where "Not in Map" is selectable even when in Route 119
    // this is because of Tentacool which is both OldRod and SweetScentOnWater.
    // SweetScentOnWater has the feebas_state NotInMap
    return mapId !== "MAP_ROUTE119" || state !== "NotInMap";
  });

  return {
    actions: uniq(mapSetups.flatMap((mapSetup) => mapSetup.actions)),
    feebas_states,
    roamer_states: uniq(
      mapSetupsForAction.flatMap((mapSetup) => mapSetup.roamer_states),
    ),
    mass_outbreak_states: uniq(
      mapSetupsForAction.flatMap((mapSetup) => mapSetup.mass_outbreak_states),
    ),
  };
};
