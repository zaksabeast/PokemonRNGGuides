import { type Species } from "~/rngTools";

export type WildEncounter = {
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
