import type { Wild3Action, Wild3PlayingSong, Wild3Weather } from "~/rngTools";
import { isFishingAction } from "~/rngToolsUi/gen3/wild/utils";

// Emerald music, weather, and bike permissions for each map

type InitialCycleMapGameData = {
  song: string;
  can_bike: boolean;
  can_bike_for_sweet_scent_land: boolean;
  weathers_sweet_scent_land: Wild3Weather[];
  weathers_sweet_scent_water: Wild3Weather[];
  weathers_fishing: Wild3Weather[];
  weathers_rocksmash: Wild3Weather[];
};

const createInitialCycleMapGameData = (
  song: string,
  overrides: Partial<InitialCycleMapGameData> = {},
): InitialCycleMapGameData => ({
  song,
  can_bike: true,
  can_bike_for_sweet_scent_land: true,
  weathers_sweet_scent_land: ["Sunny"],
  weathers_sweet_scent_water: ["Sunny"],
  weathers_fishing: ["Sunny"],
  weathers_rocksmash: ["Sunny"],
  ...overrides,
});

const mapCalibrationSettings: Partial<Record<string, InitialCycleMapGameData>> =
  {
    MAP_ROUTE101: createInitialCycleMapGameData("ROUTE101"),
    MAP_ROUTE102: createInitialCycleMapGameData("ROUTE101"),
    MAP_ROUTE103: createInitialCycleMapGameData("ROUTE101"),
    MAP_ROUTE104: createInitialCycleMapGameData("ROUTE104"),
    MAP_ROUTE105: createInitialCycleMapGameData("ROUTE104"),
    MAP_ROUTE110: createInitialCycleMapGameData("ROUTE110"),
    MAP_ROUTE111: createInitialCycleMapGameData("ROUTE110"),
    MAP_ROUTE112: createInitialCycleMapGameData("ROUTE110"),
    MAP_ROUTE113: createInitialCycleMapGameData("ROUTE113"),
    MAP_ROUTE114: createInitialCycleMapGameData("ROUTE110"),
    MAP_ROUTE116: createInitialCycleMapGameData("ROUTE104"),
    MAP_ROUTE117: createInitialCycleMapGameData("ROUTE110"),
    MAP_ROUTE118: createInitialCycleMapGameData("ROUTE118"),
    MAP_ROUTE124: createInitialCycleMapGameData("ROUTE120"),
    MAP_PETALBURG_WOODS: createInitialCycleMapGameData("PETALBURG_WOODS"),
    MAP_RUSTURF_TUNNEL: createInitialCycleMapGameData("PETALBURG_WOODS"),
    MAP_GRANITE_CAVE_1F: createInitialCycleMapGameData("PETALBURG_WOODS"),
    MAP_GRANITE_CAVE_B1F: createInitialCycleMapGameData("PETALBURG_WOODS"),
    MAP_MT_PYRE_1F: createInitialCycleMapGameData("MT_PYRE", {
      can_bike: false,
    }),
    MAP_VICTORY_ROAD_1F: createInitialCycleMapGameData("VICTORY_ROAD"),
    MAP_SAFARI_ZONE_SOUTH: createInitialCycleMapGameData("SAFARI_ZONE"),
    MAP_UNDERWATER_ROUTE126: createInitialCycleMapGameData("UNDERWATER"),
    MAP_ABANDONED_SHIP_ROOMS_B1F:
      createInitialCycleMapGameData("ABANDONED_SHIP"),
    MAP_GRANITE_CAVE_B2F: createInitialCycleMapGameData("PETALBURG_WOODS"),
    MAP_FIERY_PATH: createInitialCycleMapGameData("PETALBURG_WOODS"),
    MAP_METEOR_FALLS_B1F_2R: createInitialCycleMapGameData("CAVE_OF_ORIGIN"),
    MAP_JAGGED_PASS: createInitialCycleMapGameData("PETALBURG_WOODS"),
    MAP_ROUTE106: createInitialCycleMapGameData("ROUTE104"),
    MAP_ROUTE107: createInitialCycleMapGameData("ROUTE104"),
    MAP_ROUTE108: createInitialCycleMapGameData("ROUTE104"),
    MAP_ROUTE109: createInitialCycleMapGameData("ROUTE104"),
    MAP_ROUTE115: createInitialCycleMapGameData("ROUTE104"),
    MAP_NEW_MAUVILLE_INSIDE: createInitialCycleMapGameData("MT_PYRE"),
    MAP_ROUTE119: createInitialCycleMapGameData("ROUTE119", {
      can_bike_for_sweet_scent_land: false,
      weathers_sweet_scent_land: ["Sunny", "Rain", "Thunderstorm"],
      weathers_sweet_scent_water: ["Sunny", "Rain", "Thunderstorm"],
      weathers_fishing: ["Sunny", "Rain", "Thunderstorm"],
    }),
    MAP_ROUTE120: createInitialCycleMapGameData("ROUTE120", {
      can_bike_for_sweet_scent_land: false,
      weathers_sweet_scent_land: ["Sunny", "Rain"],
    }),
    MAP_ROUTE121: createInitialCycleMapGameData("ROUTE120"),
    MAP_ROUTE122: createInitialCycleMapGameData("ROUTE122"),
    MAP_ROUTE123: createInitialCycleMapGameData("ROUTE122", {
      weathers_sweet_scent_land: ["Sunny", "Rain"],
      weathers_sweet_scent_water: ["Sunny", "Rain"],
      weathers_fishing: ["Sunny", "Rain"],
      weathers_rocksmash: ["Sunny", "Rain"],
    }),
    MAP_MT_PYRE_2F: createInitialCycleMapGameData("MT_PYRE", {
      can_bike: false,
    }),
    MAP_MT_PYRE_3F: createInitialCycleMapGameData("MT_PYRE", {
      can_bike: false,
    }),
    MAP_MT_PYRE_4F: createInitialCycleMapGameData("MT_PYRE", {
      can_bike: false,
    }),
    MAP_MT_PYRE_5F: createInitialCycleMapGameData("MT_PYRE", {
      can_bike: false,
    }),
    MAP_MT_PYRE_6F: createInitialCycleMapGameData("MT_PYRE", {
      can_bike: false,
    }),
    MAP_MT_PYRE_EXTERIOR: createInitialCycleMapGameData("MT_PYRE_EXTERIOR"),
    MAP_MT_PYRE_SUMMIT: createInitialCycleMapGameData("MT_PYRE_EXTERIOR"),
    MAP_GRANITE_CAVE_STEVENS_ROOM:
      createInitialCycleMapGameData("PETALBURG_WOODS"),
    MAP_ROUTE125: createInitialCycleMapGameData("ROUTE120"),
    MAP_ROUTE126: createInitialCycleMapGameData("ROUTE120"),
    MAP_ROUTE127: createInitialCycleMapGameData("ROUTE120"),
    MAP_ROUTE128: createInitialCycleMapGameData("ROUTE120"),
    MAP_ROUTE129: createInitialCycleMapGameData("ROUTE119"),
    MAP_ROUTE130: createInitialCycleMapGameData("ROUTE119"),
    MAP_ROUTE131: createInitialCycleMapGameData("ROUTE119"),
    MAP_ROUTE132: createInitialCycleMapGameData("ROUTE119"),
    MAP_ROUTE133: createInitialCycleMapGameData("ROUTE119"),
    MAP_ROUTE134: createInitialCycleMapGameData("ROUTE119"),
    MAP_ABANDONED_SHIP_HIDDEN_FLOOR_CORRIDORS:
      createInitialCycleMapGameData("ABANDONED_SHIP"),
    MAP_SEAFLOOR_CAVERN_ROOM1: createInitialCycleMapGameData("MT_CHIMNEY"),
    MAP_SEAFLOOR_CAVERN_ROOM2: createInitialCycleMapGameData("MT_CHIMNEY"),
    MAP_SEAFLOOR_CAVERN_ROOM3: createInitialCycleMapGameData("MT_CHIMNEY"),
    MAP_SEAFLOOR_CAVERN_ROOM4: createInitialCycleMapGameData("MT_CHIMNEY"),
    MAP_SEAFLOOR_CAVERN_ROOM5: createInitialCycleMapGameData("MT_CHIMNEY"),
    MAP_SEAFLOOR_CAVERN_ROOM6: createInitialCycleMapGameData("MT_CHIMNEY"),
    MAP_SEAFLOOR_CAVERN_ROOM7: createInitialCycleMapGameData("MT_CHIMNEY"),
    MAP_SEAFLOOR_CAVERN_ROOM8: createInitialCycleMapGameData("MT_CHIMNEY"),
    MAP_SEAFLOOR_CAVERN_ENTRANCE: createInitialCycleMapGameData("MT_CHIMNEY"),
    MAP_CAVE_OF_ORIGIN_ENTRANCE:
      createInitialCycleMapGameData("CAVE_OF_ORIGIN"),
    MAP_CAVE_OF_ORIGIN_1F: createInitialCycleMapGameData("CAVE_OF_ORIGIN"),
    MAP_CAVE_OF_ORIGIN_UNUSED_RUBY_SAPPHIRE_MAP1:
      createInitialCycleMapGameData("CAVE_OF_ORIGIN"),
    MAP_CAVE_OF_ORIGIN_UNUSED_RUBY_SAPPHIRE_MAP2:
      createInitialCycleMapGameData("CAVE_OF_ORIGIN"),
    MAP_CAVE_OF_ORIGIN_UNUSED_RUBY_SAPPHIRE_MAP3:
      createInitialCycleMapGameData("CAVE_OF_ORIGIN"),
    MAP_NEW_MAUVILLE_ENTRANCE: createInitialCycleMapGameData("MT_PYRE"),
    MAP_SAFARI_ZONE_SOUTHWEST: createInitialCycleMapGameData("SAFARI_ZONE"),
    MAP_SAFARI_ZONE_NORTH: createInitialCycleMapGameData("SAFARI_ZONE"),
    MAP_SAFARI_ZONE_NORTHWEST: createInitialCycleMapGameData("SAFARI_ZONE"),
    MAP_VICTORY_ROAD_B1F: createInitialCycleMapGameData("VICTORY_ROAD"),
    MAP_VICTORY_ROAD_B2F: createInitialCycleMapGameData("VICTORY_ROAD"),
    MAP_METEOR_FALLS_1F_1R: createInitialCycleMapGameData("CAVE_OF_ORIGIN"),
    MAP_METEOR_FALLS_1F_2R: createInitialCycleMapGameData("CAVE_OF_ORIGIN"),
    MAP_METEOR_FALLS_B1F_1R: createInitialCycleMapGameData("CAVE_OF_ORIGIN"),
    MAP_SHOAL_CAVE_LOW_TIDE_STAIRS_ROOM:
      createInitialCycleMapGameData("MT_PYRE"),
    MAP_SHOAL_CAVE_LOW_TIDE_LOWER_ROOM:
      createInitialCycleMapGameData("MT_PYRE"),
    MAP_SHOAL_CAVE_LOW_TIDE_INNER_ROOM:
      createInitialCycleMapGameData("MT_PYRE"),
    MAP_SHOAL_CAVE_LOW_TIDE_ENTRANCE_ROOM:
      createInitialCycleMapGameData("MT_PYRE"),
    MAP_LILYCOVE_CITY: createInitialCycleMapGameData("LILYCOVE"),
    MAP_DEWFORD_TOWN: createInitialCycleMapGameData("DEWFORD"),
    MAP_SLATEPORT_CITY: createInitialCycleMapGameData("SLATEPORT"),
    MAP_MOSSDEEP_CITY: createInitialCycleMapGameData("RUSTBORO"),
    MAP_PACIFIDLOG_TOWN: createInitialCycleMapGameData("LILYCOVE"),
    MAP_EVER_GRANDE_CITY: createInitialCycleMapGameData("EVER_GRANDE"),
    MAP_PETALBURG_CITY: createInitialCycleMapGameData("PETALBURG"),
    MAP_UNDERWATER_ROUTE124: createInitialCycleMapGameData("UNDERWATER"),
    MAP_SHOAL_CAVE_LOW_TIDE_ICE_ROOM: createInitialCycleMapGameData("MT_PYRE"),
    MAP_SKY_PILLAR_1F: createInitialCycleMapGameData("MT_CHIMNEY"),
    MAP_SOOTOPOLIS_CITY: createInitialCycleMapGameData("SOOTOPOLIS"),
    MAP_SKY_PILLAR_3F: createInitialCycleMapGameData("MT_CHIMNEY"),
    MAP_SKY_PILLAR_5F: createInitialCycleMapGameData("MT_CHIMNEY"),
    MAP_SAFARI_ZONE_SOUTHEAST: createInitialCycleMapGameData("SAFARI_ZONE"),
    MAP_SAFARI_ZONE_NORTHEAST: createInitialCycleMapGameData("SAFARI_ZONE"),
    MAP_MAGMA_HIDEOUT_1F: createInitialCycleMapGameData("AQUA_MAGMA_HIDEOUT"),
    MAP_MAGMA_HIDEOUT_2F_1R:
      createInitialCycleMapGameData("AQUA_MAGMA_HIDEOUT"),
    MAP_MAGMA_HIDEOUT_2F_2R:
      createInitialCycleMapGameData("AQUA_MAGMA_HIDEOUT"),
    MAP_MAGMA_HIDEOUT_3F_1R:
      createInitialCycleMapGameData("AQUA_MAGMA_HIDEOUT"),
    MAP_MAGMA_HIDEOUT_3F_2R:
      createInitialCycleMapGameData("AQUA_MAGMA_HIDEOUT"),
    MAP_MAGMA_HIDEOUT_4F: createInitialCycleMapGameData("AQUA_MAGMA_HIDEOUT"),
    MAP_MAGMA_HIDEOUT_3F_3R:
      createInitialCycleMapGameData("AQUA_MAGMA_HIDEOUT"),
    MAP_MAGMA_HIDEOUT_2F_3R:
      createInitialCycleMapGameData("AQUA_MAGMA_HIDEOUT"),
    MAP_MIRAGE_TOWER_1F: createInitialCycleMapGameData("MT_CHIMNEY"),
    MAP_MIRAGE_TOWER_2F: createInitialCycleMapGameData("MT_CHIMNEY"),
    MAP_MIRAGE_TOWER_3F: createInitialCycleMapGameData("MT_CHIMNEY"),
    MAP_MIRAGE_TOWER_4F: createInitialCycleMapGameData("MT_CHIMNEY"),
    MAP_DESERT_UNDERPASS: createInitialCycleMapGameData("MT_CHIMNEY"),
    MAP_ARTISAN_CAVE_B1F: createInitialCycleMapGameData("PETALBURG_WOODS"),
    MAP_ARTISAN_CAVE_1F: createInitialCycleMapGameData("PETALBURG_WOODS"),
    MAP_ALTERING_CAVE: createInitialCycleMapGameData("RG_SEVII_CAVE"),
    MAP_METEOR_FALLS_STEVENS_CAVE:
      createInitialCycleMapGameData("CAVE_OF_ORIGIN"),
  };

export const getInitialCycleMapGameData = (map: string) => {
  return (
    mapCalibrationSettings[map] ??
    mapCalibrationSettings["MAP_ROUTE101"] ??
    createInitialCycleMapGameData("ROUTE101")
  );
};

export const getPossibleWeathers = (
  mapId: string,
  action: Wild3Action,
): Wild3Weather[] => {
  const mapData = getInitialCycleMapGameData(mapId);

  switch (action) {
    case "SweetScentLand":
      return mapData.weathers_sweet_scent_land;
    case "SweetScentWater":
      return mapData.weathers_sweet_scent_water;
    case "RockSmash":
      return mapData.weathers_rocksmash;
    default:
      return mapData.weathers_fishing;
  }
};

export const getPossiblePlayingSongs = (
  map_id: string,
  action: Wild3Action,
): Wild3PlayingSong[] => {
  if (
    map_id === "MAP_UNDERWATER_ROUTE124" ||
    map_id === "MAP_UNDERWATER_ROUTE126"
  ) {
    return ["MapSong"];
  }

  if (action === "SweetScentWater") {
    return ["SurfSong"];
  }

  if (map_id === "MAP_ROUTE119" && isFishingAction(action)) {
    // Requires surfing to access Feebas tile.
    return ["SurfSong"];
  }

  const songs: Wild3PlayingSong[] = ["MapSong"];
  const mapData = getInitialCycleMapGameData(map_id);
  if (
    mapData.can_bike &&
    (action !== "SweetScentLand" || mapData.can_bike_for_sweet_scent_land)
  ) {
    songs.push("BikeSong");
  }

  if (isFishingAction(action)) {
    songs.push("SurfSong");
  }

  return songs;
};
