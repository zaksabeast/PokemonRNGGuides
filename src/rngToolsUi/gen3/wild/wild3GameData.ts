import { Wild3EncounterTable, Species, Gen3EncounterInfo } from "~/rngTools";
import { encounterSlots } from "~/types";
import { uniq } from "lodash-es";

export type Wild3GameDataJSON = {
  encounter_tables: Wild3EncounterTable[];
};

export type Wild3GameData = {
  encounter_tables: Wild3EncounterTable[];
  species: Species[];
  maps: string[];
  speciesToEncounterInfo: Map<Species, Map<string, Gen3EncounterInfo[]>>;
};

const createSortedArrayWithoutDuplicates = <T extends string>(array: T[]) => {
  return uniq(array).sort((lhs, rhs) => lhs.localeCompare(rhs));
};

export const getWild3GameData = (json: Wild3GameDataJSON): Wild3GameData => {
  const speciesToEncounterSlots = new Map<
    Species,
    Map<string, Gen3EncounterInfo[]>
  >();

  json.encounter_tables.forEach((table) => {
    table.slots.forEach((slot, encounterSlotIdx) => {
      const encounterInfoByMapForSpecies =
        speciesToEncounterSlots.get(slot.species) ??
        new Map<string, Gen3EncounterInfo[]>();
      speciesToEncounterSlots.set(slot.species, encounterInfoByMapForSpecies);

      const encounterInfoForMap =
        encounterInfoByMapForSpecies.get(table.map_id) ?? [];
      encounterInfoByMapForSpecies.set(table.map_id, encounterInfoForMap);

      const encounterInfoForEncounterType = encounterInfoForMap.find(
        (info) => info.encounter_table.encounter_type === table.encounter_type,
      );

      if (encounterInfoForEncounterType?.slots != undefined) {
        encounterInfoForEncounterType.slots.push(
          encounterSlots[encounterSlotIdx],
        );
        return;
      }

      encounterInfoForMap.push({
        encounter_table: table,
        slots: [encounterSlots[encounterSlotIdx]],
      });
    });
  });

  const maps = json.encounter_tables.map((table) => table.map_id);
  const species = json.encounter_tables
    .map((enc) => enc.slots.map((slot) => slot.species))
    .flat();

  return {
    encounter_tables: json.encounter_tables,
    species: createSortedArrayWithoutDuplicates(species),
    maps: createSortedArrayWithoutDuplicates(maps),
    speciesToEncounterInfo: speciesToEncounterSlots,
  };
};
