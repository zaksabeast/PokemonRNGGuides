import { Species, EncounterSlot } from "~/rngTools";
import { species } from "~/types/species";
import { encounterSlots } from "~/types/encounterSlots";

// https://github.com/pret/pokeemerald/blob/master/src/data/wild_encounters.json
import wild_encounters from "./emerald_wild_encounters.json";

type Wild3GameData = {
  wildSpecies: Species[];
  maps: string[];
  speciesToEncounterSlots: Map<Species, Map<string, EncounterSlot[]>>;
};

export const getEmeraldWildGameData = (): Wild3GameData => {
  const maps = new Set<string>();

  const formatSpecies = (speciesName: string | Species): string => {
    return speciesName
      .toLowerCase()
      .replace("species_", "")
      .replace(/[^a-z0-9]/g, "");
  };
  const jsonNameToSpecies = (speciesName: string): Species | undefined => {
    return formattedSpeciesToSpecies.get(formatSpecies(speciesName));
  };

  const formattedSpeciesToSpecies = new Map<string, Species>();

  species.forEach((spec) => {
    formattedSpeciesToSpecies.set(formatSpecies(spec), spec);
  });

  const speciesToEncounterSlots = new Map<
    Species,
    Map<string, EncounterSlot[]>
  >();

  wild_encounters.wild_encounter_groups.forEach((grp) => {
    grp.encounters.forEach((enc) => {
      if (!("map" in enc)) {
        return;
      }

      if (
        enc.map === "MAP_ALTERING_CAVE" &&
        enc.base_label !== "gAlteringCave1"
      ) {
        return;
      }

      if (maps.has(enc.map)) {
        console.warn(`Duplicate map found: ${enc.map}`);
      }
      maps.add(enc.map);

      if (enc.land_mons) {
        enc.land_mons.mons.forEach((landMon, encounterSlotIdx) => {
          const spec = jsonNameToSpecies(landMon.species);
          if (!spec) {
            console.warn(`Unknown species: ${landMon.species}`);
            return;
          }

          const maps =
            speciesToEncounterSlots.get(spec) ??
            new Map<string, EncounterSlot[]>();
          const mapEncounterSlots = maps.get(enc.map) || [];
          mapEncounterSlots.push(encounterSlots[encounterSlotIdx]);
          maps.set(enc.map, mapEncounterSlots);
          speciesToEncounterSlots.set(spec, maps);
        });
      }
    });
  });

  const gameData = {
    maps: Array.from(maps).sort((a, b) => a.localeCompare(b)),
    wildSpecies: Array.from(speciesToEncounterSlots.keys()).sort((a, b) =>
      a.localeCompare(b),
    ),
    speciesToEncounterSlots,
  };
  return gameData;
};
