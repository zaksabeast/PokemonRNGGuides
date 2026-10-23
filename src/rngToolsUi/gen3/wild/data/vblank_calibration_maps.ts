// Emerald map-header music and cycling permissions from pokeemerald data/maps.
// TODO: add weathers_sweet_scent_land:[], weathers_sweet_scent_water, weathers_fishing, weathers_rocksmash,
/*
Route 119: 
All actions: Sunny, rain, thunderstorm

Route 120:
Land action only: Sunny vs rain
fishing, water: only sunny

Route 123
All actions: Sunny, rain

all other route:
only sunny
*/

export const mapCalibrationSettings: Partial<
  Record<string, { song: string; can_bike: boolean }>
> = {
  MAP_ROUTE101: {
    can_bike: true,
    song: "ROUTE101",
  },
  MAP_ROUTE102: {
    can_bike: true,
    song: "ROUTE101",
  },
  MAP_ROUTE103: {
    can_bike: true,
    song: "ROUTE101",
  },
  MAP_ROUTE104: {
    can_bike: true,
    song: "ROUTE104",
  },
  MAP_ROUTE105: {
    can_bike: true,
    song: "ROUTE104",
  },
  MAP_ROUTE110: {
    can_bike: true,
    song: "ROUTE110",
  },
  MAP_ROUTE111: {
    can_bike: true,
    song: "ROUTE110",
  },
  MAP_ROUTE112: {
    can_bike: true,
    song: "ROUTE110",
  },
  MAP_ROUTE113: {
    can_bike: true,
    song: "ROUTE113",
  },
  MAP_ROUTE114: {
    can_bike: true,
    song: "ROUTE110",
  },
  MAP_ROUTE116: {
    can_bike: true,
    song: "ROUTE104",
  },
  MAP_ROUTE117: {
    can_bike: true,
    song: "ROUTE110",
  },
  MAP_ROUTE118: {
    can_bike: true,
    song: "ROUTE118",
  },
  MAP_ROUTE124: {
    can_bike: true,
    song: "ROUTE120",
  },
  MAP_PETALBURG_WOODS: {
    can_bike: true,
    song: "PETALBURG_WOODS",
  },
  MAP_RUSTURF_TUNNEL: {
    can_bike: true,
    song: "PETALBURG_WOODS",
  },
  MAP_GRANITE_CAVE_1F: {
    can_bike: true,
    song: "PETALBURG_WOODS",
  },
  MAP_GRANITE_CAVE_B1F: {
    can_bike: true,
    song: "PETALBURG_WOODS",
  },
  MAP_MT_PYRE_1F: {
    can_bike: false,
    song: "MT_PYRE",
  },
  MAP_VICTORY_ROAD_1F: {
    can_bike: true,
    song: "VICTORY_ROAD",
  },
  MAP_SAFARI_ZONE_SOUTH: {
    can_bike: true,
    song: "SAFARI_ZONE",
  },
  MAP_UNDERWATER_ROUTE126: {
    can_bike: true,
    song: "UNDERWATER",
  },
  MAP_ABANDONED_SHIP_ROOMS_B1F: {
    can_bike: true,
    song: "ABANDONED_SHIP",
  },
  MAP_GRANITE_CAVE_B2F: {
    can_bike: true,
    song: "PETALBURG_WOODS",
  },
  MAP_FIERY_PATH: {
    can_bike: true,
    song: "PETALBURG_WOODS",
  },
  MAP_METEOR_FALLS_B1F_2R: {
    can_bike: true,
    song: "CAVE_OF_ORIGIN",
  },
  MAP_JAGGED_PASS: {
    can_bike: true,
    song: "PETALBURG_WOODS",
  },
  MAP_ROUTE106: {
    can_bike: true,
    song: "ROUTE104",
  },
  MAP_ROUTE107: {
    can_bike: true,
    song: "ROUTE104",
  },
  MAP_ROUTE108: {
    can_bike: true,
    song: "ROUTE104",
  },
  MAP_ROUTE109: {
    can_bike: true,
    song: "ROUTE104",
  },
  MAP_ROUTE115: {
    can_bike: true,
    song: "ROUTE104",
  },
  MAP_NEW_MAUVILLE_INSIDE: {
    can_bike: true,
    song: "MT_PYRE",
  },
  MAP_ROUTE119: {
    can_bike: true,
    song: "ROUTE119",
  },
  MAP_ROUTE120: {
    can_bike: true,
    song: "ROUTE120",
  },
  MAP_ROUTE121: {
    can_bike: true,
    song: "ROUTE120",
  },
  MAP_ROUTE122: {
    can_bike: true,
    song: "ROUTE122",
  },
  MAP_ROUTE123: {
    can_bike: true,
    song: "ROUTE122",
  },
  MAP_MT_PYRE_2F: {
    can_bike: false,
    song: "MT_PYRE",
  },
  MAP_MT_PYRE_3F: {
    can_bike: false,
    song: "MT_PYRE",
  },
  MAP_MT_PYRE_4F: {
    can_bike: false,
    song: "MT_PYRE",
  },
  MAP_MT_PYRE_5F: {
    can_bike: false,
    song: "MT_PYRE",
  },
  MAP_MT_PYRE_6F: {
    can_bike: false,
    song: "MT_PYRE",
  },
  MAP_MT_PYRE_EXTERIOR: {
    can_bike: true,
    song: "MT_PYRE_EXTERIOR",
  },
  MAP_MT_PYRE_SUMMIT: {
    can_bike: true,
    song: "MT_PYRE_EXTERIOR",
  },
  MAP_GRANITE_CAVE_STEVENS_ROOM: {
    can_bike: true,
    song: "PETALBURG_WOODS",
  },
  MAP_ROUTE125: {
    can_bike: true,
    song: "ROUTE120",
  },
  MAP_ROUTE126: {
    can_bike: true,
    song: "ROUTE120",
  },
  MAP_ROUTE127: {
    can_bike: true,
    song: "ROUTE120",
  },
  MAP_ROUTE128: {
    can_bike: true,
    song: "ROUTE120",
  },
  MAP_ROUTE129: {
    can_bike: true,
    song: "ROUTE119",
  },
  MAP_ROUTE130: {
    can_bike: true,
    song: "ROUTE119",
  },
  MAP_ROUTE131: {
    can_bike: true,
    song: "ROUTE119",
  },
  MAP_ROUTE132: {
    can_bike: true,
    song: "ROUTE119",
  },
  MAP_ROUTE133: {
    can_bike: true,
    song: "ROUTE119",
  },
  MAP_ROUTE134: {
    can_bike: true,
    song: "ROUTE119",
  },
  MAP_ABANDONED_SHIP_HIDDEN_FLOOR_CORRIDORS: {
    can_bike: true,
    song: "ABANDONED_SHIP",
  },
  MAP_SEAFLOOR_CAVERN_ROOM1: {
    can_bike: true,
    song: "MT_CHIMNEY",
  },
  MAP_SEAFLOOR_CAVERN_ROOM2: {
    can_bike: true,
    song: "MT_CHIMNEY",
  },
  MAP_SEAFLOOR_CAVERN_ROOM3: {
    can_bike: true,
    song: "MT_CHIMNEY",
  },
  MAP_SEAFLOOR_CAVERN_ROOM4: {
    can_bike: true,
    song: "MT_CHIMNEY",
  },
  MAP_SEAFLOOR_CAVERN_ROOM5: {
    can_bike: true,
    song: "MT_CHIMNEY",
  },
  MAP_SEAFLOOR_CAVERN_ROOM6: {
    can_bike: true,
    song: "MT_CHIMNEY",
  },
  MAP_SEAFLOOR_CAVERN_ROOM7: {
    can_bike: true,
    song: "MT_CHIMNEY",
  },
  MAP_SEAFLOOR_CAVERN_ROOM8: {
    can_bike: true,
    song: "MT_CHIMNEY",
  },
  MAP_SEAFLOOR_CAVERN_ENTRANCE: {
    can_bike: true,
    song: "MT_CHIMNEY",
  },
  MAP_CAVE_OF_ORIGIN_ENTRANCE: {
    can_bike: true,
    song: "CAVE_OF_ORIGIN",
  },
  MAP_CAVE_OF_ORIGIN_1F: {
    can_bike: true,
    song: "CAVE_OF_ORIGIN",
  },
  MAP_CAVE_OF_ORIGIN_UNUSED_RUBY_SAPPHIRE_MAP1: {
    can_bike: true,
    song: "CAVE_OF_ORIGIN",
  },
  MAP_CAVE_OF_ORIGIN_UNUSED_RUBY_SAPPHIRE_MAP2: {
    can_bike: true,
    song: "CAVE_OF_ORIGIN",
  },
  MAP_CAVE_OF_ORIGIN_UNUSED_RUBY_SAPPHIRE_MAP3: {
    can_bike: true,
    song: "CAVE_OF_ORIGIN",
  },
  MAP_NEW_MAUVILLE_ENTRANCE: {
    can_bike: true,
    song: "MT_PYRE",
  },
  MAP_SAFARI_ZONE_SOUTHWEST: {
    can_bike: true,
    song: "SAFARI_ZONE",
  },
  MAP_SAFARI_ZONE_NORTH: {
    can_bike: true,
    song: "SAFARI_ZONE",
  },
  MAP_SAFARI_ZONE_NORTHWEST: {
    can_bike: true,
    song: "SAFARI_ZONE",
  },
  MAP_VICTORY_ROAD_B1F: {
    can_bike: true,
    song: "VICTORY_ROAD",
  },
  MAP_VICTORY_ROAD_B2F: {
    can_bike: true,
    song: "VICTORY_ROAD",
  },
  MAP_METEOR_FALLS_1F_1R: {
    can_bike: true,
    song: "CAVE_OF_ORIGIN",
  },
  MAP_METEOR_FALLS_1F_2R: {
    can_bike: true,
    song: "CAVE_OF_ORIGIN",
  },
  MAP_METEOR_FALLS_B1F_1R: {
    can_bike: true,
    song: "CAVE_OF_ORIGIN",
  },
  MAP_SHOAL_CAVE_LOW_TIDE_STAIRS_ROOM: {
    can_bike: true,
    song: "MT_PYRE",
  },
  MAP_SHOAL_CAVE_LOW_TIDE_LOWER_ROOM: {
    can_bike: true,
    song: "MT_PYRE",
  },
  MAP_SHOAL_CAVE_LOW_TIDE_INNER_ROOM: {
    can_bike: true,
    song: "MT_PYRE",
  },
  MAP_SHOAL_CAVE_LOW_TIDE_ENTRANCE_ROOM: {
    can_bike: true,
    song: "MT_PYRE",
  },
  MAP_LILYCOVE_CITY: {
    can_bike: true,
    song: "LILYCOVE",
  },
  MAP_DEWFORD_TOWN: {
    can_bike: true,
    song: "DEWFORD",
  },
  MAP_SLATEPORT_CITY: {
    can_bike: true,
    song: "SLATEPORT",
  },
  MAP_MOSSDEEP_CITY: {
    can_bike: true,
    song: "RUSTBORO",
  },
  MAP_PACIFIDLOG_TOWN: {
    can_bike: true,
    song: "LILYCOVE",
  },
  MAP_EVER_GRANDE_CITY: {
    can_bike: true,
    song: "EVER_GRANDE",
  },
  MAP_PETALBURG_CITY: {
    can_bike: true,
    song: "PETALBURG",
  },
  MAP_UNDERWATER_ROUTE124: {
    can_bike: true,
    song: "UNDERWATER",
  },
  MAP_SHOAL_CAVE_LOW_TIDE_ICE_ROOM: {
    can_bike: true,
    song: "MT_PYRE",
  },
  MAP_SKY_PILLAR_1F: {
    can_bike: true,
    song: "MT_CHIMNEY",
  },
  MAP_SOOTOPOLIS_CITY: {
    can_bike: true,
    song: "SOOTOPOLIS",
  },
  MAP_SKY_PILLAR_3F: {
    can_bike: true,
    song: "MT_CHIMNEY",
  },
  MAP_SKY_PILLAR_5F: {
    can_bike: true,
    song: "MT_CHIMNEY",
  },
  MAP_SAFARI_ZONE_SOUTHEAST: {
    can_bike: true,
    song: "SAFARI_ZONE",
  },
  MAP_SAFARI_ZONE_NORTHEAST: {
    can_bike: true,
    song: "SAFARI_ZONE",
  },
  MAP_MAGMA_HIDEOUT_1F: {
    can_bike: true,
    song: "AQUA_MAGMA_HIDEOUT",
  },
  MAP_MAGMA_HIDEOUT_2F_1R: {
    can_bike: true,
    song: "AQUA_MAGMA_HIDEOUT",
  },
  MAP_MAGMA_HIDEOUT_2F_2R: {
    can_bike: true,
    song: "AQUA_MAGMA_HIDEOUT",
  },
  MAP_MAGMA_HIDEOUT_3F_1R: {
    can_bike: true,
    song: "AQUA_MAGMA_HIDEOUT",
  },
  MAP_MAGMA_HIDEOUT_3F_2R: {
    can_bike: true,
    song: "AQUA_MAGMA_HIDEOUT",
  },
  MAP_MAGMA_HIDEOUT_4F: {
    can_bike: true,
    song: "AQUA_MAGMA_HIDEOUT",
  },
  MAP_MAGMA_HIDEOUT_3F_3R: {
    can_bike: true,
    song: "AQUA_MAGMA_HIDEOUT",
  },
  MAP_MAGMA_HIDEOUT_2F_3R: {
    can_bike: true,
    song: "AQUA_MAGMA_HIDEOUT",
  },
  MAP_MIRAGE_TOWER_1F: {
    can_bike: true,
    song: "MT_CHIMNEY",
  },
  MAP_MIRAGE_TOWER_2F: {
    can_bike: true,
    song: "MT_CHIMNEY",
  },
  MAP_MIRAGE_TOWER_3F: {
    can_bike: true,
    song: "MT_CHIMNEY",
  },
  MAP_MIRAGE_TOWER_4F: {
    can_bike: true,
    song: "MT_CHIMNEY",
  },
  MAP_DESERT_UNDERPASS: {
    can_bike: true,
    song: "MT_CHIMNEY",
  },
  MAP_ARTISAN_CAVE_B1F: {
    can_bike: true,
    song: "PETALBURG_WOODS",
  },
  MAP_ARTISAN_CAVE_1F: {
    can_bike: true,
    song: "PETALBURG_WOODS",
  },
  MAP_ALTERING_CAVE: {
    can_bike: true,
    song: "RG_SEVII_CAVE",
  },
  MAP_METEOR_FALLS_STEVENS_CAVE: {
    can_bike: true,
    song: "CAVE_OF_ORIGIN",
  },
};
