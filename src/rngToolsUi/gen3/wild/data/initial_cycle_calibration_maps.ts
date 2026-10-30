import type { Wild3Weather } from "~/rngTools";

type MapCalibrationSettings = {
  song: string;
  can_bike: boolean;
  can_bike_for_sweet_scent_land: boolean;
  weathers_sweet_scent_land: Wild3Weather[];
  weathers_sweet_scent_water: Wild3Weather[];
  weathers_fishing: Wild3Weather[];
  weathers_rocksmash: Wild3Weather[];
};

const createMapCalibrationSettings = (
  song: string,
  overrides: Partial<Omit<MapCalibrationSettings, "song">> = {},
): MapCalibrationSettings => ({
  song,
  can_bike: true,
  can_bike_for_sweet_scent_land: true,
  weathers_sweet_scent_land: ["Sunny"],
  weathers_sweet_scent_water: ["Sunny"],
  weathers_fishing: ["Sunny"],
  weathers_rocksmash: ["Sunny"],
  ...overrides,
});

// Emerald map-header music and cycling permissions from pokeemerald data/maps.
const mapCalibrationSettings: Partial<Record<string, MapCalibrationSettings>> =
  {
    MAP_ROUTE101: createMapCalibrationSettings("ROUTE101"),
    MAP_ROUTE102: createMapCalibrationSettings("ROUTE101"),
    MAP_ROUTE103: createMapCalibrationSettings("ROUTE101"),
    MAP_ROUTE104: createMapCalibrationSettings("ROUTE104"),
    MAP_ROUTE105: createMapCalibrationSettings("ROUTE104"),
    MAP_ROUTE110: createMapCalibrationSettings("ROUTE110"),
    MAP_ROUTE111: createMapCalibrationSettings("ROUTE110"),
    MAP_ROUTE112: createMapCalibrationSettings("ROUTE110"),
    MAP_ROUTE113: createMapCalibrationSettings("ROUTE113"),
    MAP_ROUTE114: createMapCalibrationSettings("ROUTE110"),
    MAP_ROUTE116: createMapCalibrationSettings("ROUTE104"),
    MAP_ROUTE117: createMapCalibrationSettings("ROUTE110"),
    MAP_ROUTE118: createMapCalibrationSettings("ROUTE118"),
    MAP_ROUTE124: createMapCalibrationSettings("ROUTE120"),
    MAP_PETALBURG_WOODS: createMapCalibrationSettings("PETALBURG_WOODS"),
    MAP_RUSTURF_TUNNEL: createMapCalibrationSettings("PETALBURG_WOODS"),
    MAP_GRANITE_CAVE_1F: createMapCalibrationSettings("PETALBURG_WOODS"),
    MAP_GRANITE_CAVE_B1F: createMapCalibrationSettings("PETALBURG_WOODS"),
    MAP_MT_PYRE_1F: createMapCalibrationSettings("MT_PYRE", {
      can_bike: false,
    }),
    MAP_VICTORY_ROAD_1F: createMapCalibrationSettings("VICTORY_ROAD"),
    MAP_SAFARI_ZONE_SOUTH: createMapCalibrationSettings("SAFARI_ZONE"),
    MAP_UNDERWATER_ROUTE126: createMapCalibrationSettings("UNDERWATER"),
    MAP_ABANDONED_SHIP_ROOMS_B1F:
      createMapCalibrationSettings("ABANDONED_SHIP"),
    MAP_GRANITE_CAVE_B2F: createMapCalibrationSettings("PETALBURG_WOODS"),
    MAP_FIERY_PATH: createMapCalibrationSettings("PETALBURG_WOODS"),
    MAP_METEOR_FALLS_B1F_2R: createMapCalibrationSettings("CAVE_OF_ORIGIN"),
    MAP_JAGGED_PASS: createMapCalibrationSettings("PETALBURG_WOODS"),
    MAP_ROUTE106: createMapCalibrationSettings("ROUTE104"),
    MAP_ROUTE107: createMapCalibrationSettings("ROUTE104"),
    MAP_ROUTE108: createMapCalibrationSettings("ROUTE104"),
    MAP_ROUTE109: createMapCalibrationSettings("ROUTE104"),
    MAP_ROUTE115: createMapCalibrationSettings("ROUTE104"),
    MAP_NEW_MAUVILLE_INSIDE: createMapCalibrationSettings("MT_PYRE"),
    MAP_ROUTE119: createMapCalibrationSettings("ROUTE119", {
      weathers_sweet_scent_land: ["Sunny", "Rain", "Thunderstorm"],
      weathers_sweet_scent_water: ["Sunny", "Rain", "Thunderstorm"],
      weathers_fishing: ["Sunny", "Rain", "Thunderstorm"],
    }),
    MAP_ROUTE120: createMapCalibrationSettings("ROUTE120", {
      can_bike_for_sweet_scent_land: false,
      weathers_sweet_scent_land: ["Sunny", "Rain"],
    }),
    MAP_ROUTE121: createMapCalibrationSettings("ROUTE120"),
    MAP_ROUTE122: createMapCalibrationSettings("ROUTE122"),
    MAP_ROUTE123: createMapCalibrationSettings("ROUTE122", {
      weathers_sweet_scent_land: ["Sunny", "Rain"],
      weathers_sweet_scent_water: ["Sunny", "Rain"],
      weathers_fishing: ["Sunny", "Rain"],
      weathers_rocksmash: ["Sunny", "Rain"],
    }),
    MAP_MT_PYRE_2F: createMapCalibrationSettings("MT_PYRE", {
      can_bike: false,
    }),
    MAP_MT_PYRE_3F: createMapCalibrationSettings("MT_PYRE", {
      can_bike: false,
    }),
    MAP_MT_PYRE_4F: createMapCalibrationSettings("MT_PYRE", {
      can_bike: false,
    }),
    MAP_MT_PYRE_5F: createMapCalibrationSettings("MT_PYRE", {
      can_bike: false,
    }),
    MAP_MT_PYRE_6F: createMapCalibrationSettings("MT_PYRE", {
      can_bike: false,
    }),
    MAP_MT_PYRE_EXTERIOR: createMapCalibrationSettings("MT_PYRE_EXTERIOR"),
    MAP_MT_PYRE_SUMMIT: createMapCalibrationSettings("MT_PYRE_EXTERIOR"),
    MAP_GRANITE_CAVE_STEVENS_ROOM:
      createMapCalibrationSettings("PETALBURG_WOODS"),
    MAP_ROUTE125: createMapCalibrationSettings("ROUTE120"),
    MAP_ROUTE126: createMapCalibrationSettings("ROUTE120"),
    MAP_ROUTE127: createMapCalibrationSettings("ROUTE120"),
    MAP_ROUTE128: createMapCalibrationSettings("ROUTE120"),
    MAP_ROUTE129: createMapCalibrationSettings("ROUTE119"),
    MAP_ROUTE130: createMapCalibrationSettings("ROUTE119"),
    MAP_ROUTE131: createMapCalibrationSettings("ROUTE119"),
    MAP_ROUTE132: createMapCalibrationSettings("ROUTE119"),
    MAP_ROUTE133: createMapCalibrationSettings("ROUTE119"),
    MAP_ROUTE134: createMapCalibrationSettings("ROUTE119"),
    MAP_ABANDONED_SHIP_HIDDEN_FLOOR_CORRIDORS:
      createMapCalibrationSettings("ABANDONED_SHIP"),
    MAP_SEAFLOOR_CAVERN_ROOM1: createMapCalibrationSettings("MT_CHIMNEY"),
    MAP_SEAFLOOR_CAVERN_ROOM2: createMapCalibrationSettings("MT_CHIMNEY"),
    MAP_SEAFLOOR_CAVERN_ROOM3: createMapCalibrationSettings("MT_CHIMNEY"),
    MAP_SEAFLOOR_CAVERN_ROOM4: createMapCalibrationSettings("MT_CHIMNEY"),
    MAP_SEAFLOOR_CAVERN_ROOM5: createMapCalibrationSettings("MT_CHIMNEY"),
    MAP_SEAFLOOR_CAVERN_ROOM6: createMapCalibrationSettings("MT_CHIMNEY"),
    MAP_SEAFLOOR_CAVERN_ROOM7: createMapCalibrationSettings("MT_CHIMNEY"),
    MAP_SEAFLOOR_CAVERN_ROOM8: createMapCalibrationSettings("MT_CHIMNEY"),
    MAP_SEAFLOOR_CAVERN_ENTRANCE: createMapCalibrationSettings("MT_CHIMNEY"),
    MAP_CAVE_OF_ORIGIN_ENTRANCE: createMapCalibrationSettings("CAVE_OF_ORIGIN"),
    MAP_CAVE_OF_ORIGIN_1F: createMapCalibrationSettings("CAVE_OF_ORIGIN"),
    MAP_CAVE_OF_ORIGIN_UNUSED_RUBY_SAPPHIRE_MAP1:
      createMapCalibrationSettings("CAVE_OF_ORIGIN"),
    MAP_CAVE_OF_ORIGIN_UNUSED_RUBY_SAPPHIRE_MAP2:
      createMapCalibrationSettings("CAVE_OF_ORIGIN"),
    MAP_CAVE_OF_ORIGIN_UNUSED_RUBY_SAPPHIRE_MAP3:
      createMapCalibrationSettings("CAVE_OF_ORIGIN"),
    MAP_NEW_MAUVILLE_ENTRANCE: createMapCalibrationSettings("MT_PYRE"),
    MAP_SAFARI_ZONE_SOUTHWEST: createMapCalibrationSettings("SAFARI_ZONE"),
    MAP_SAFARI_ZONE_NORTH: createMapCalibrationSettings("SAFARI_ZONE"),
    MAP_SAFARI_ZONE_NORTHWEST: createMapCalibrationSettings("SAFARI_ZONE"),
    MAP_VICTORY_ROAD_B1F: createMapCalibrationSettings("VICTORY_ROAD"),
    MAP_VICTORY_ROAD_B2F: createMapCalibrationSettings("VICTORY_ROAD"),
    MAP_METEOR_FALLS_1F_1R: createMapCalibrationSettings("CAVE_OF_ORIGIN"),
    MAP_METEOR_FALLS_1F_2R: createMapCalibrationSettings("CAVE_OF_ORIGIN"),
    MAP_METEOR_FALLS_B1F_1R: createMapCalibrationSettings("CAVE_OF_ORIGIN"),
    MAP_SHOAL_CAVE_LOW_TIDE_STAIRS_ROOM:
      createMapCalibrationSettings("MT_PYRE"),
    MAP_SHOAL_CAVE_LOW_TIDE_LOWER_ROOM: createMapCalibrationSettings("MT_PYRE"),
    MAP_SHOAL_CAVE_LOW_TIDE_INNER_ROOM: createMapCalibrationSettings("MT_PYRE"),
    MAP_SHOAL_CAVE_LOW_TIDE_ENTRANCE_ROOM:
      createMapCalibrationSettings("MT_PYRE"),
    MAP_LILYCOVE_CITY: createMapCalibrationSettings("LILYCOVE"),
    MAP_DEWFORD_TOWN: createMapCalibrationSettings("DEWFORD"),
    MAP_SLATEPORT_CITY: createMapCalibrationSettings("SLATEPORT"),
    MAP_MOSSDEEP_CITY: createMapCalibrationSettings("RUSTBORO"),
    MAP_PACIFIDLOG_TOWN: createMapCalibrationSettings("LILYCOVE"),
    MAP_EVER_GRANDE_CITY: createMapCalibrationSettings("EVER_GRANDE"),
    MAP_PETALBURG_CITY: createMapCalibrationSettings("PETALBURG"),
    MAP_UNDERWATER_ROUTE124: createMapCalibrationSettings("UNDERWATER"),
    MAP_SHOAL_CAVE_LOW_TIDE_ICE_ROOM: createMapCalibrationSettings("MT_PYRE"),
    MAP_SKY_PILLAR_1F: createMapCalibrationSettings("MT_CHIMNEY"),
    MAP_SOOTOPOLIS_CITY: createMapCalibrationSettings("SOOTOPOLIS"),
    MAP_SKY_PILLAR_3F: createMapCalibrationSettings("MT_CHIMNEY"),
    MAP_SKY_PILLAR_5F: createMapCalibrationSettings("MT_CHIMNEY"),
    MAP_SAFARI_ZONE_SOUTHEAST: createMapCalibrationSettings("SAFARI_ZONE"),
    MAP_SAFARI_ZONE_NORTHEAST: createMapCalibrationSettings("SAFARI_ZONE"),
    MAP_MAGMA_HIDEOUT_1F: createMapCalibrationSettings("AQUA_MAGMA_HIDEOUT"),
    MAP_MAGMA_HIDEOUT_2F_1R: createMapCalibrationSettings("AQUA_MAGMA_HIDEOUT"),
    MAP_MAGMA_HIDEOUT_2F_2R: createMapCalibrationSettings("AQUA_MAGMA_HIDEOUT"),
    MAP_MAGMA_HIDEOUT_3F_1R: createMapCalibrationSettings("AQUA_MAGMA_HIDEOUT"),
    MAP_MAGMA_HIDEOUT_3F_2R: createMapCalibrationSettings("AQUA_MAGMA_HIDEOUT"),
    MAP_MAGMA_HIDEOUT_4F: createMapCalibrationSettings("AQUA_MAGMA_HIDEOUT"),
    MAP_MAGMA_HIDEOUT_3F_3R: createMapCalibrationSettings("AQUA_MAGMA_HIDEOUT"),
    MAP_MAGMA_HIDEOUT_2F_3R: createMapCalibrationSettings("AQUA_MAGMA_HIDEOUT"),
    MAP_MIRAGE_TOWER_1F: createMapCalibrationSettings("MT_CHIMNEY"),
    MAP_MIRAGE_TOWER_2F: createMapCalibrationSettings("MT_CHIMNEY"),
    MAP_MIRAGE_TOWER_3F: createMapCalibrationSettings("MT_CHIMNEY"),
    MAP_MIRAGE_TOWER_4F: createMapCalibrationSettings("MT_CHIMNEY"),
    MAP_DESERT_UNDERPASS: createMapCalibrationSettings("MT_CHIMNEY"),
    MAP_ARTISAN_CAVE_B1F: createMapCalibrationSettings("PETALBURG_WOODS"),
    MAP_ARTISAN_CAVE_1F: createMapCalibrationSettings("PETALBURG_WOODS"),
    MAP_ALTERING_CAVE: createMapCalibrationSettings("RG_SEVII_CAVE"),
    MAP_METEOR_FALLS_STEVENS_CAVE:
      createMapCalibrationSettings("CAVE_OF_ORIGIN"),
  };

export const getMapCalibrationSettings = (map: string) => {
  return (
    mapCalibrationSettings[map] ??
    mapCalibrationSettings["MAP_ROUTE101"] ??
    createMapCalibrationSettings("ROUTE101")
  );
};
