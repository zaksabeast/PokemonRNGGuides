import { match } from "ts-pattern";
import { isEqual, keyBy, mapValues } from "lodash-es";
import diamond from "./json/diamond.json";
import pearl from "./json/pearl.json";
import platinum from "./json/platinum.json";
import { z } from "zod";

type RawEncounters = typeof diamond | typeof pearl | typeof platinum;
type RawLocation = RawEncounters["entries"][number];

type Slot = {
  species: string;
  level: number;
};

type EncounterMethod = {
  rate: number;
  slots: Slot[];
};

const ActiveSingleSlotSchema = z.string();
const InactiveSingleSlotSchema = z.literal(0).transform(() => null);

const SingleSlotSchema = z.union([
  ActiveSingleSlotSchema,
  InactiveSingleSlotSchema,
]);

const ActiveOverrideSlotsSchema = z.string().array();
const InactiveOverrideSlotsSchema = z
  .literal(0)
  .array()
  .transform(() => null);

const OverrideSlotsSchema = z.union([
  ActiveOverrideSlotsSchema,
  InactiveOverrideSlotsSchema,
]);

type OverrideSlots = z.infer<typeof OverrideSlotsSchema>;

const DualSlotsSchema = z
  .object({
    ruby: OverrideSlotsSchema,
    sapphire: OverrideSlotsSchema,
    emerald: OverrideSlotsSchema,
    firered: OverrideSlotsSchema,
    leafgreen: OverrideSlotsSchema,
  })
  .transform((obj) => ({
    Ruby: obj.ruby,
    Sapphire: obj.sapphire,
    Emerald: obj.emerald,
    FireRed: obj.firered,
    LeafGreen: obj.leafgreen,
  }));

type DualSlots = z.infer<typeof DualSlotsSchema>;

type Encounter = {
  location: string;
  grass: EncounterMethod;
  swarm: OverrideSlots;
  day: OverrideSlots;
  night: OverrideSlots;
  radar: OverrideSlots;
  dualSlots: DualSlots;
};

const mapSpecies = (forms: (number | undefined)[], species: string): string => {
  return match({ species, shellosForm: forms[0], gastrodonForm: forms[1] })
    .with({ species: "Shellos", shellosForm: 1 }, () => "Shellos_East")
    .with({ species: "Shellos" }, () => "Shellos_West")
    .with({ species: "Gastrodon", gastrodonForm: 1 }, () => "Gastrodon_East")
    .with({ species: "Gastrodon" }, () => "Gastrodon_West")
    .with({ species: "Nidoran♂" }, () => "NidoranM")
    .with({ species: "Nidoran♀" }, () => "NidoranF")
    .with({ species: "Farfetch’d" }, () => "FarfetchD")
    .with({ species: "Mime Jr." }, () => "MimeJr")
    .with({ species: "Mr. Mime" }, () => "MrMime")
    .otherwise(() => species);
};

const mapEncounter = (raw: RawLocation): Encounter => {
  const grassSlots = raw.grass.map((slot) => ({
    species: SingleSlotSchema.parse(slot.species),
    level: slot.level,
  }));

  const mapSpecList = (species: string[] | null): string[] | null =>
    species?.map((spec) => mapSpecies(raw.form, spec)) ?? null;

  const parseOverrideSlots = (slots: unknown) =>
    mapSpecList(OverrideSlotsSchema.parse(slots));

  const dualSlots = DualSlotsSchema.parse(raw.dualSlot);

  return {
    location: raw.location,
    grass: {
      rate: raw.rates.grass,
      slots: grassSlots
        .filter((slot): slot is Slot => slot.species !== null)
        .map((slot) => ({
          ...slot,
          species: mapSpecies(raw.form, slot.species),
        })),
    },
    swarm: parseOverrideSlots(raw.swarm),
    day: parseOverrideSlots(raw.day),
    night: parseOverrideSlots(raw.night),
    radar: parseOverrideSlots(raw.radar),
    dualSlots: {
      Emerald: mapSpecList(dualSlots.Emerald),
      FireRed: mapSpecList(dualSlots.FireRed),
      LeafGreen: mapSpecList(dualSlots.LeafGreen),
      Ruby: mapSpecList(dualSlots.Ruby),
      Sapphire: mapSpecList(dualSlots.Sapphire),
    },
  };
};

const emptyEncounter: Omit<Encounter, "location"> = {
  grass: {
    rate: 0,
    slots: [],
  },
  swarm: null,
  day: null,
  night: null,
  radar: null,
  dualSlots: {
    Ruby: null,
    Sapphire: null,
    Emerald: null,
    FireRed: null,
    LeafGreen: null,
  },
};

const isEmptyEncounter = (encounter: Encounter): boolean => {
  // Compare all properties except for the location
  const { location, ...rest } = encounter;
  return isEqual(rest, emptyEncounter);
};

const mapEncounters = (raw: RawEncounters): Record<string, Encounter> => {
  const encs = raw.entries
    .map(mapEncounter)
    .filter((encounter) => !isEmptyEncounter(encounter));
  return keyBy(encs, (encounter) => encounter.location);
};

const mapped = {
  diamond: mapEncounters(diamond),
  pearl: mapEncounters(pearl),
  platinum: mapEncounters(platinum),
};

const file = `
  type WildEncounter = {
    location: string;
    grass: {
      rate: number;
      slots: {
        species: Species;
        level: number;
      }[];
    };
    swarm: [Species, Species];
    day: [Species, Species];
    night: [Species, Species];
    radar: [Species, Species, Species, Species];
    dualSlots: {
      Ruby: [Species, Species];
      Sapphire: [Species, Species];
      Emerald: [Species, Species];
      FireRed: [Species, Species];
      LeafGreen: [Species, Species];
    };
  };

  const locations = ${JSON.stringify(Object.keys(mapped.diamond), null, 2)} as const;
  type Location = (typeof locations)[number];

  export const diamondEncounters: Record<Location, WildEncounter> = ${JSON.stringify(mapped.diamond, null, 2)};
  export const pearlEncounters: Record<Location, WildEncounter> = ${JSON.stringify(mapped.pearl, null, 2)};
  export const platinumEncounters: Record<Location, WildEncounter> = ${JSON.stringify(
    mapped.platinum,
    null,
    2,
  )};
`;

console.log(file);
