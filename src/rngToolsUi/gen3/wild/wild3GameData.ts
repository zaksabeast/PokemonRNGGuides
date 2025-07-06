import { Wild3EncounterTable, Species, EncounterSlot } from "~/rngTools";
import { encounterSlots } from "~/types";
import { uniq } from "lodash-es";

export type Wild3GameDataJSON = {
  encounter_tables: Wild3EncounterTable[];
};

export type Wild3GameData = {
  encounter_tables: Wild3EncounterTable[];
  species: Species[];
  maps: string[];
  speciesToEncounterSlots: Map<Species, Map<string, EncounterSlot[]>>;
};

const createSortedArrayWithoutDuplicates = <T extends string>(array: T[]) => {
  return uniq(array).sort((lhs, rhs) => lhs.localeCompare(rhs));
};

export const getWild3GameData = (json: Wild3GameDataJSON): Wild3GameData => {
  const speciesToEncounterSlots = new Map<
    Species,
    Map<string, EncounterSlot[]>
  >();

  json.encounter_tables.forEach((table) => {
    table.slots.forEach((slot, encounterSlotIdx) => {
      const maps =
        speciesToEncounterSlots.get(slot.species) ??
        new Map<string, EncounterSlot[]>();

      const mapEncounterSlots = maps.get(table.map_id) ?? [];
      mapEncounterSlots.push(encounterSlots[encounterSlotIdx]);
      maps.set(table.map_id, mapEncounterSlots);
      speciesToEncounterSlots.set(slot.species, maps);
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
    speciesToEncounterSlots,
  };
};
