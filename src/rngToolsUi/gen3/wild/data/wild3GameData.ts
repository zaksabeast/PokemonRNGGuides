import {
  Wild3MapGameData,
  Wild3MapSetups,
  Species,
  Wild3Action,
  Wild3RoamerState,
  Wild3MassOutbreakState,
  Wild3FeebasState,
} from "~/rngTools";
import { uniq, union } from "lodash-es";
import { species as allSpecies } from "~/types/species";
import { genderRatioBySpecies } from "~/types/gender";
import { doesSpeciesHaveType } from "./pokemonTypes";
import {
  wild3Actions,
  wild3RoamerStates,
  wild3MassOutbreakStates,
} from "../utils";

// https://github.com/pret/pokeemerald/blob/master/src/data/wild_encounters.json
import { emerald_wild_encounters } from "./emerald_wild_encounters";
import { emerald_wild_special_encounters } from "./emerald_wild_special_encounters";
import z from "zod";

export type Wild3GameData = {
  maps_data: Wild3MapGameData[];
  species: Species[];
  maps: string[];
  mapSetupsBySpecies: Map<Species, Wild3MapSetups[]>;
};

type JsonMon = {
  min_level: number;
  max_level: number;
  species: string;
};

const jsonMonToSlot = (jsonMon: JsonMon) => {
  const species = jsonNameToSpecies(jsonMon.species);
  return {
    min_level: jsonMon.min_level,
    max_level: jsonMon.max_level,
    species,
    gender_ratio: genderRatioBySpecies[species],
    is_electric_type: doesSpeciesHaveType(3, species, "Electric"),
    is_steel_type: doesSpeciesHaveType(3, species, "Steel"),
  };
};

const jsonMonsToSlots = (mons: JsonMon[] | undefined) => {
  if (mons == null || mons.length === 0) {
    return [];
  }

  return mons.map((mon) => jsonMonToSlot(mon));
};

const formatSpecies = (speciesName: string | Species): string => {
  return speciesName
    .toLowerCase()
    .replace("species_", "")
    .replace(/[^a-z0-9]/g, "");
};

const jsonNameToSpecies = (() => {
  const formattedSpeciesToSpecies = new Map<string, Species>();

  allSpecies.forEach((species) => {
    formattedSpeciesToSpecies.set(formatSpecies(species), species);
  });
  return (speciesJsonName: string): Species => {
    const species = formattedSpeciesToSpecies.get(
      formatSpecies(speciesJsonName),
    );
    if (species === undefined) {
      throw new Error(`Unknown species: ${speciesJsonName}`);
    }
    return species;
  };
})();

const createSortedArrayWithoutDuplicates = <T extends string>(array: T[]) => {
  return uniq(array).sort((lhs, rhs) => lhs.localeCompare(rhs));
};

const UNUSED_MAPS = [
  "MAP_CAVE_OF_ORIGIN_UNUSED_RUBY_SAPPHIRE_MAP1",
  "MAP_CAVE_OF_ORIGIN_UNUSED_RUBY_SAPPHIRE_MAP2",
  "MAP_CAVE_OF_ORIGIN_UNUSED_RUBY_SAPPHIRE_MAP3",
];

const generateWild3EmeraldMapsData = (): Wild3MapGameData[] => {
  const wild3RoamerStatesSchema = z.enum(wild3RoamerStates);
  const wild3MassOutbreakStatesSchema = z.enum(wild3MassOutbreakStates);

  return emerald_wild_encounters.wild_encounter_groups.flatMap((grp) => {
    return grp.encounters.flatMap((map) => {
      if (!("map" in map)) {
        return [];
      }

      if (
        map.map === "MAP_ALTERING_CAVE" &&
        map.base_label !== "gAlteringCave1"
      ) {
        return [];
      }
      if (UNUSED_MAPS.includes(map.map)) {
        return [];
      }

      const slots_by_action: Wild3MapGameData["slots_by_action"] = [];

      const addSlotsByAction = (
        action: Wild3Action,
        mons: JsonMon[] | undefined,
      ) => {
        slots_by_action[wild3Actions.indexOf(action)] = jsonMonsToSlots(mons);
      };

      addSlotsByAction("SweetScentLand", map.land_mons?.mons);
      addSlotsByAction("SweetScentWater", map.water_mons?.mons);
      addSlotsByAction("OldRod", map.fishing_mons?.mons.slice(0, 2));
      addSlotsByAction("GoodRod", map.fishing_mons?.mons.slice(2, 5));
      addSlotsByAction("SuperRod", map.fishing_mons?.mons.slice(5, 10));
      addSlotsByAction("RockSmash", map.rock_smash_mons?.mons);

      const roamers = emerald_wild_special_encounters.roamers
        .filter((roamer) => roamer.maps.includes(map.map))
        .map((roamer) => ({
          id: wild3RoamerStatesSchema.parse(roamer.id),
          encounter_data: jsonMonToSlot(roamer.mon),
        }));

      const mass_outbreaks = emerald_wild_special_encounters.mass_outbreaks
        .filter((mass_outbreak) => mass_outbreak.maps.includes(map.map))
        .map((mass_outbreak) => ({
          id: wild3MassOutbreakStatesSchema.parse(mass_outbreak.id),
          encounter_data: jsonMonToSlot(mass_outbreak.mon),
        }));

      const feebas = emerald_wild_special_encounters.feebas.maps.includes(
        map.map,
      )
        ? jsonMonToSlot(emerald_wild_special_encounters.feebas.mon)
        : null;

      return [
        {
          map_id: map.map,
          slots_by_action,
          roamers,
          mass_outbreaks,
          feebas,
        },
      ];
    });
  });
};

const generateMapSetupsBySpecies = (
  maps_data: Wild3MapGameData[],
  allSpecies: Species[],
) => {
  const mapSetupsBySpecies = new Map<Species, Wild3MapSetups[]>(
    allSpecies.map((species) => [species, []]),
  );

  maps_data.forEach((map_data) => {
    map_data.slots_by_action.forEach((slots, actionIdx: number) => {
      const action: Wild3Action = wild3Actions[actionIdx];

      const roamer_states: Wild3RoamerState[] =
        (action === "SweetScentLand" || action === "SweetScentWater") &&
        map_data.roamers.length > 0
          ? [
              "Inactive",
              "ActiveNotInMap",
              ...map_data.roamers.map((roamer) => roamer.id),
            ]
          : ["Inactive"];

      const mass_outbreak_states: Wild3MassOutbreakState[] =
        action === "SweetScentLand" && map_data.mass_outbreaks.length > 0
          ? [
              "Inactive",
              "ActiveNotInMap",
              ...map_data.mass_outbreaks.map((massOutbreak) => massOutbreak.id),
            ]
          : ["Inactive"];

      const feebas_states: Wild3FeebasState[] =
        (action === "OldRod" ||
          action === "GoodRod" ||
          action === "SuperRod") &&
        map_data.feebas != null
          ? ["OnFeebasTile", "InMapButNotOnFeebasTile"]
          : ["NotInMap"];

      map_data.roamers.forEach((roamer) => {
        const mapSetupsForSpecies =
          mapSetupsBySpecies.get(roamer.encounter_data.species) ?? [];

        const thisMapSetups = mapSetupsForSpecies.find(
          (map) => map.map_data === map_data,
        );
        if (thisMapSetups != null) {
          return; // already added this roamer
        }

        mapSetupsForSpecies.push({
          map_data,
          actions: ["SweetScentLand", "SweetScentWater"],
          roamer_states: [roamer.id],
          mass_outbreak_states, // doesn't matter because roamer logic is before mass outbreak logic
          feebas_states: ["NotInMap"],
        });
      });

      if (map_data.feebas != null && action === "OldRod") {
        const mapSetupsForSpecies =
          mapSetupsBySpecies.get(map_data.feebas.species) ?? [];

        const thisMapSetups = mapSetupsForSpecies.find(
          (map) => map.map_data === map_data,
        );
        if (thisMapSetups == null) {
          mapSetupsForSpecies.push({
            map_data,
            actions: ["OldRod", "GoodRod", "SuperRod"],
            roamer_states, // doesn't matter because feebas actions don't overlap with roamer actions
            mass_outbreak_states,
            feebas_states: ["OnFeebasTile"],
          });
        }
      }

      slots.forEach((slot) => {
        const mapSetupsForSpecies = mapSetupsBySpecies.get(slot.species) ?? [];
        let thisMapSetups = mapSetupsForSpecies.find(
          (map) => map.map_data === map_data,
        );

        if (thisMapSetups == null) {
          thisMapSetups = {
            map_data,
            actions: [],
            roamer_states: [],
            mass_outbreak_states: [],
            feebas_states: [],
          };
          mapSetupsForSpecies.push(thisMapSetups);
        }

        thisMapSetups.actions = union(thisMapSetups.actions, [action]);
        thisMapSetups.roamer_states = union(
          thisMapSetups.roamer_states,
          roamer_states,
        );
        thisMapSetups.mass_outbreak_states = union(
          thisMapSetups.mass_outbreak_states,
          mass_outbreak_states,
        );
        thisMapSetups.feebas_states = union(
          thisMapSetups.feebas_states,
          feebas_states,
        );
      });
    });
  });
  return mapSetupsBySpecies;
};

let wild3EmeraldGameDataCache: Wild3GameData | null = null;
export const getWild3EmeraldGameData = (): Wild3GameData => {
  if (wild3EmeraldGameDataCache == null) {
    wild3EmeraldGameDataCache = generateWild3EmeraldGameData();
  }
  return wild3EmeraldGameDataCache;
};

const generateWild3EmeraldGameData = (): Wild3GameData => {
  const maps_data = generateWild3EmeraldMapsData();
  const maps = createSortedArrayWithoutDuplicates(
    maps_data.map((table) => table.map_id),
  );

  const species = createSortedArrayWithoutDuplicates(
    maps_data
      .map((enc) => {
        return [
          ...enc.slots_by_action,
          enc.roamers.map((roamer) => roamer.encounter_data),
          enc.mass_outbreaks.map(
            (mass_outbreak) => mass_outbreak.encounter_data,
          ),
          ...(enc.feebas == null ? [] : [enc.feebas]),
        ];
      })
      .flat(2)
      .map((slot) => slot.species),
  );

  return {
    maps_data,
    maps,
    species,
    mapSetupsBySpecies: generateMapSetupsBySpecies(maps_data, species),
  };
};
