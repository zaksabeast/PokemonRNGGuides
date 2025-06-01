import type json from "./json";

class Wild3GameData {
  constructor(json) {}
  wildSpecies: Species[];
  maps: string[];
  speciesToEncounterSlots: Map<Species, Map<string, EncounterSlot[]>>;
}
