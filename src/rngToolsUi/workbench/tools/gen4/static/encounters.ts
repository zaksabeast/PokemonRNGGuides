import { map, sortBy } from "lodash-es";
import { EncountersByGame as NonStarterEncounters } from "~/rngToolsUi/gen4/encounters/static";
import { Encounter } from "~/rngToolsUi/gen4/encounters/encounter";
import { Gen4GameVersion } from "~/types/games";
import { formatSpeciesLabel } from "~/types/species";

const DpptStarters = {
  "starter-turtwig": {
    isFixedGender: false,
    species: "Turtwig",
    method: "One",
    minLevel: 5,
    maxLevel: 5,
  },
  "starter-chimchar": {
    isFixedGender: false,
    species: "Chimchar",
    method: "One",
    minLevel: 5,
    maxLevel: 5,
  },
  "starter-piplup": {
    isFixedGender: false,
    species: "Piplup",
    method: "One",
    minLevel: 5,
    maxLevel: 5,
  },
} as const satisfies Record<string, Encounter>;

const HgssStarters = {
  "starter-chikorita": {
    isFixedGender: false,
    species: "Chikorita",
    method: "One",
    minLevel: 5,
    maxLevel: 5,
  },
  "starter-cyndaquil": {
    isFixedGender: false,
    species: "Cyndaquil",
    method: "One",
    minLevel: 5,
    maxLevel: 5,
  },
  "starter-totodile": {
    isFixedGender: false,
    species: "Totodile",
    method: "One",
    minLevel: 5,
    maxLevel: 5,
  },
} as const satisfies Record<string, Encounter>;

export const EncountersByGame = {
  Diamond: { ...NonStarterEncounters.Diamond, ...DpptStarters },
  Pearl: { ...NonStarterEncounters.Pearl, ...DpptStarters },
  Platinum: { ...NonStarterEncounters.Platinum, ...DpptStarters },
  HeartGold: { ...NonStarterEncounters.HeartGold, ...HgssStarters },
  SoulSilver: { ...NonStarterEncounters.SoulSilver, ...HgssStarters },
} as const satisfies Record<Gen4GameVersion, Record<string, Encounter>>;

const badEncounter: Encounter = {
  species: "None",
  minLevel: 0,
  maxLevel: 0,
  isFixedGender: false,
  method: "One",
};

export const getEncounter = (
  game: Gen4GameVersion,
  encounterId: string | null | undefined,
): Encounter => {
  if (encounterId == null) {
    return badEncounter;
  }

  const encounters: Partial<Record<string, Encounter>> = EncountersByGame[game];
  return encounters[encounterId] ?? badEncounter;
};

export const getEncounterOptions = (game: Gen4GameVersion) => {
  const encounters: Record<string, Encounter> = EncountersByGame[game];
  return sortBy(
    map(encounters, (enc, id) => ({
      label: enc.label ?? formatSpeciesLabel(enc.species),
      value: id,
    })),
    (enc) => enc.label,
  );
};
