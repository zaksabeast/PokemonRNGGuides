import { Species } from "~/rngTools";
import { DpPt, Gen3GameVersion } from "~/types/games";
import { Encounter } from "../encounter";
import { diamondEncounters } from "./diamond";
import { pearlEncounters } from "./pearl";
import { platinumEncounters } from "./platinum";
import { type Location } from "./locations";

const gameEncounters = {
  Diamond: diamondEncounters,
  Pearl: pearlEncounters,
  Platinum: platinumEncounters,
};

type WildEncounterOpts = {
  game: DpPt;
  location: Location;
  timeOfDay: "day" | "night" | null;
  swarmActive: boolean;
  radarActive: boolean;
  dualSlotCartridge: Gen3GameVersion | null;
};

const wildForms: Partial<Record<Species, number>> = {
  Shellos_West: 0,
  Shellos_East: 1,
  Gastrodon_West: 0,
  Gastrodon_East: 1,
};

const getGrassEncounters = (game: DpPt, location: Location): Encounter[] => {
  const grassSlots = gameEncounters[game][location].grass.slots;
  return grassSlots.map((enc) => ({
    maxLevel: enc.level,
    minLevel: enc.level,
    species: enc.species,
    method: "DpptJ",
    form: wildForms[enc.species],

    // todo: fix
    isFixedGender: false,
  }));
};

export const getEncounters = ({
  game,
  location,
  swarmActive,
  timeOfDay,
  radarActive,
  dualSlotCartridge,
}: WildEncounterOpts): Encounter[] => {
  const locationEncounters = gameEncounters[game][location];
  const encounters = getGrassEncounters(game, location);

  if (swarmActive) {
    encounters[0].species = locationEncounters.swarm[0];
    encounters[1].species = locationEncounters.swarm[1];
  }

  if (timeOfDay === "day") {
    encounters[2].species = locationEncounters.day[0];
    encounters[3].species = locationEncounters.day[1];
  }

  if (timeOfDay === "night") {
    encounters[2].species = locationEncounters.night[0];
    encounters[3].species = locationEncounters.night[1];
  }

  if (radarActive) {
    encounters[4].species = locationEncounters.radar[0];
    encounters[5].species = locationEncounters.radar[1];
    encounters[10].species = locationEncounters.radar[2];
    encounters[11].species = locationEncounters.radar[3];
  }

  if (dualSlotCartridge != null) {
    encounters[8].species = locationEncounters.dualSlots[dualSlotCartridge][0];
    encounters[9].species = locationEncounters.dualSlots[dualSlotCartridge][1];
  }

  return encounters;
};
