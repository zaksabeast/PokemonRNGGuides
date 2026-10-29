import { type Location } from "./locations";
import { type WildEncounter } from "./wildEncounter";

export const platinumEncounters: Record<Location, WildEncounter> = {
  "Oreburgh Mine B1F": {
    location: "Oreburgh Mine B1F",
    grass: {
      rate: 10,
      slots: [
        {
          species: "Geodude",
          level: 5,
        },
        {
          species: "Geodude",
          level: 6,
        },
        {
          species: "Zubat",
          level: 5,
        },
        {
          species: "Zubat",
          level: 6,
        },
        {
          species: "Geodude",
          level: 4,
        },
        {
          species: "Geodude",
          level: 7,
        },
        {
          species: "Onix",
          level: 6,
        },
        {
          species: "Onix",
          level: 8,
        },
        {
          species: "Geodude",
          level: 8,
        },
        {
          species: "Zubat",
          level: 7,
        },
        {
          species: "Geodude",
          level: 8,
        },
        {
          species: "Zubat",
          level: 7,
        },
      ],
    },
    swarm: ["Geodude", "Geodude"],
    day: ["Zubat", "Zubat"],
    night: ["Zubat", "Zubat"],
    radar: ["Geodude", "Geodude", "Geodude", "Geodude"],
    dualSlots: {
      Emerald: ["Geodude", "Geodude"],
      FireRed: ["Geodude", "Geodude"],
      LeafGreen: ["Geodude", "Geodude"],
      Ruby: ["Geodude", "Geodude"],
      Sapphire: ["Geodude", "Geodude"],
    },
  },
  "Oreburgh Mine B2F": {
    location: "Oreburgh Mine B2F",
    grass: {
      rate: 10,
      slots: [
        {
          species: "Geodude",
          level: 6,
        },
        {
          species: "Geodude",
          level: 7,
        },
        {
          species: "Zubat",
          level: 6,
        },
        {
          species: "Zubat",
          level: 7,
        },
        {
          species: "Geodude",
          level: 5,
        },
        {
          species: "Geodude",
          level: 8,
        },
        {
          species: "Onix",
          level: 7,
        },
        {
          species: "Onix",
          level: 9,
        },
        {
          species: "Geodude",
          level: 9,
        },
        {
          species: "Zubat",
          level: 8,
        },
        {
          species: "Geodude",
          level: 9,
        },
        {
          species: "Zubat",
          level: 8,
        },
      ],
    },
    swarm: ["Geodude", "Geodude"],
    day: ["Zubat", "Zubat"],
    night: ["Zubat", "Zubat"],
    radar: ["Geodude", "Geodude", "Geodude", "Geodude"],
    dualSlots: {
      Emerald: ["Geodude", "Geodude"],
      FireRed: ["Geodude", "Geodude"],
      LeafGreen: ["Geodude", "Geodude"],
      Ruby: ["Geodude", "Geodude"],
      Sapphire: ["Geodude", "Geodude"],
    },
  },
  "Valley Windworks": {
    location: "Valley Windworks",
    grass: {
      rate: 30,
      slots: [
        {
          species: "Shellos_West",
          level: 9,
        },
        {
          species: "Shinx",
          level: 10,
        },
        {
          species: "Buizel",
          level: 9,
        },
        {
          species: "Shellos_West",
          level: 10,
        },
        {
          species: "Buizel",
          level: 10,
        },
        {
          species: "Shellos_West",
          level: 11,
        },
        {
          species: "Pachirisu",
          level: 9,
        },
        {
          species: "Pachirisu",
          level: 11,
        },
        {
          species: "Buizel",
          level: 11,
        },
        {
          species: "Shellos_West",
          level: 12,
        },
        {
          species: "Buizel",
          level: 11,
        },
        {
          species: "Shellos_West",
          level: 12,
        },
      ],
    },
    swarm: ["Electrike", "Electrike"],
    day: ["Buizel", "Shellos_West"],
    night: ["Buizel", "Shellos_West"],
    radar: ["Mareep", "Mareep", "Mareep", "Mareep"],
    dualSlots: {
      Emerald: ["Buizel", "Shellos_West"],
      FireRed: ["Buizel", "Shellos_West"],
      LeafGreen: ["Buizel", "Shellos_West"],
      Ruby: ["Buizel", "Shellos_West"],
      Sapphire: ["Buizel", "Shellos_West"],
    },
  },
  "Eterna Forest": {
    location: "Eterna Forest",
    grass: {
      rate: 30,
      slots: [
        {
          species: "Buneary",
          level: 11,
        },
        {
          species: "Budew",
          level: 10,
        },
        {
          species: "Wurmple",
          level: 10,
        },
        {
          species: "Kricketot",
          level: 12,
        },
        {
          species: "Budew",
          level: 11,
        },
        {
          species: "Bidoof",
          level: 12,
        },
        {
          species: "Silcoon",
          level: 12,
        },
        {
          species: "Cascoon",
          level: 12,
        },
        {
          species: "Buneary",
          level: 13,
        },
        {
          species: "Gastly",
          level: 13,
        },
        {
          species: "Beautifly",
          level: 14,
        },
        {
          species: "Dustox",
          level: 14,
        },
      ],
    },
    swarm: ["Slakoth", "Slakoth"],
    day: ["Wurmple", "Budew"],
    night: ["Kricketot", "Hoothoot"],
    radar: ["Nincada", "Nincada", "Nincada", "Nincada"],
    dualSlots: {
      Emerald: ["Pineco", "Pineco"],
      FireRed: ["Caterpie", "Metapod"],
      LeafGreen: ["Weedle", "Kakuna"],
      Ruby: ["Seedot", "Seedot"],
      Sapphire: ["Buneary", "Gastly"],
    },
  },
  "Fuego Ironworks": {
    location: "Fuego Ironworks",
    grass: {
      rate: 30,
      slots: [
        {
          species: "Magmar",
          level: 28,
        },
        {
          species: "Magnemite",
          level: 29,
        },
        {
          species: "Magmar",
          level: 29,
        },
        {
          species: "Floatzel",
          level: 29,
        },
        {
          species: "Floatzel",
          level: 30,
        },
        {
          species: "Gastrodon_West",
          level: 30,
        },
        {
          species: "Magnemite",
          level: 28,
        },
        {
          species: "Magnemite",
          level: 30,
        },
        {
          species: "Floatzel",
          level: 31,
        },
        {
          species: "Gastrodon_West",
          level: 31,
        },
        {
          species: "Floatzel",
          level: 31,
        },
        {
          species: "Gastrodon_West",
          level: 31,
        },
      ],
    },
    swarm: ["Magmar", "Magnemite"],
    day: ["Magmar", "Floatzel"],
    night: ["Gastrodon_West", "Floatzel"],
    radar: ["Aron", "Aron", "Aron", "Aron"],
    dualSlots: {
      Emerald: ["Floatzel", "Gastrodon_West"],
      FireRed: ["Floatzel", "Gastrodon_West"],
      LeafGreen: ["Floatzel", "Gastrodon_West"],
      Ruby: ["Floatzel", "Gastrodon_West"],
      Sapphire: ["Floatzel", "Gastrodon_West"],
    },
  },
  "Mt. Coronet 1F 1": {
    location: "Mt. Coronet 1F 1",
    grass: {
      rate: 10,
      slots: [
        {
          species: "Bronzor",
          level: 18,
        },
        {
          species: "Geodude",
          level: 19,
        },
        {
          species: "Meditite",
          level: 18,
        },
        {
          species: "Clefairy",
          level: 17,
        },
        {
          species: "Machop",
          level: 20,
        },
        {
          species: "Meditite",
          level: 20,
        },
        {
          species: "Chingling",
          level: 17,
        },
        {
          species: "Nosepass",
          level: 18,
        },
        {
          species: "Zubat",
          level: 19,
        },
        {
          species: "Chingling",
          level: 19,
        },
        {
          species: "Zubat",
          level: 19,
        },
        {
          species: "Chingling",
          level: 19,
        },
      ],
    },
    swarm: ["Bronzor", "Geodude"],
    day: ["Meditite", "Geodude"],
    night: ["Zubat", "Clefairy"],
    radar: ["Machop", "Meditite", "Zubat", "Chingling"],
    dualSlots: {
      Emerald: ["Zubat", "Chingling"],
      FireRed: ["Zubat", "Chingling"],
      LeafGreen: ["Zubat", "Chingling"],
      Ruby: ["Zubat", "Chingling"],
      Sapphire: ["Zubat", "Chingling"],
    },
  },
  "Mt. Coronet 2F": {
    location: "Mt. Coronet 2F",
    grass: {
      rate: 10,
      slots: [
        {
          species: "Bronzong",
          level: 37,
        },
        {
          species: "Graveler",
          level: 38,
        },
        {
          species: "Medicham",
          level: 37,
        },
        {
          species: "Clefairy",
          level: 36,
        },
        {
          species: "Machoke",
          level: 39,
        },
        {
          species: "Medicham",
          level: 39,
        },
        {
          species: "Chingling",
          level: 36,
        },
        {
          species: "Nosepass",
          level: 37,
        },
        {
          species: "Golbat",
          level: 38,
        },
        {
          species: "Chingling",
          level: 38,
        },
        {
          species: "Golbat",
          level: 38,
        },
        {
          species: "Chingling",
          level: 38,
        },
      ],
    },
    swarm: ["Bronzong", "Graveler"],
    day: ["Medicham", "Graveler"],
    night: ["Golbat", "Clefairy"],
    radar: ["Machoke", "Medicham", "Golbat", "Chingling"],
    dualSlots: {
      Emerald: ["Golbat", "Chingling"],
      FireRed: ["Golbat", "Chingling"],
      LeafGreen: ["Golbat", "Chingling"],
      Ruby: ["Solrock", "Solrock"],
      Sapphire: ["Lunatone", "Lunatone"],
    },
  },
  "Mt. Coronet 3F": {
    location: "Mt. Coronet 3F",
    grass: {
      rate: 10,
      slots: [
        {
          species: "Bronzong",
          level: 37,
        },
        {
          species: "Graveler",
          level: 38,
        },
        {
          species: "Medicham",
          level: 37,
        },
        {
          species: "Clefairy",
          level: 36,
        },
        {
          species: "Machoke",
          level: 39,
        },
        {
          species: "Medicham",
          level: 39,
        },
        {
          species: "Chingling",
          level: 36,
        },
        {
          species: "Nosepass",
          level: 37,
        },
        {
          species: "Golbat",
          level: 38,
        },
        {
          species: "Chingling",
          level: 38,
        },
        {
          species: "Medicham",
          level: 38,
        },
        {
          species: "Chingling",
          level: 38,
        },
      ],
    },
    swarm: ["Bronzong", "Graveler"],
    day: ["Medicham", "Graveler"],
    night: ["Golbat", "Clefairy"],
    radar: ["Machoke", "Medicham", "Medicham", "Chingling"],
    dualSlots: {
      Emerald: ["Golbat", "Chingling"],
      FireRed: ["Golbat", "Chingling"],
      LeafGreen: ["Golbat", "Chingling"],
      Ruby: ["Solrock", "Solrock"],
      Sapphire: ["Lunatone", "Lunatone"],
    },
  },
  "Mt. Coronet Summit": {
    location: "Mt. Coronet Summit",
    grass: {
      rate: 10,
      slots: [
        {
          species: "Snover",
          level: 36,
        },
        {
          species: "Abomasnow",
          level: 38,
        },
        {
          species: "Medicham",
          level: 38,
        },
        {
          species: "Abomasnow",
          level: 39,
        },
        {
          species: "Machoke",
          level: 40,
        },
        {
          species: "Medicham",
          level: 40,
        },
        {
          species: "Chingling",
          level: 37,
        },
        {
          species: "Nosepass",
          level: 38,
        },
        {
          species: "Absol",
          level: 38,
        },
        {
          species: "Chingling",
          level: 39,
        },
        {
          species: "Absol",
          level: 40,
        },
        {
          species: "Chingling",
          level: 39,
        },
      ],
    },
    swarm: ["Snover", "Abomasnow"],
    day: ["Medicham", "Abomasnow"],
    night: ["Golbat", "Noctowl"],
    radar: ["Loudred", "Loudred", "Loudred", "Loudred"],
    dualSlots: {
      Emerald: ["Absol", "Chingling"],
      FireRed: ["Absol", "Chingling"],
      LeafGreen: ["Absol", "Chingling"],
      Ruby: ["Solrock", "Solrock"],
      Sapphire: ["Lunatone", "Lunatone"],
    },
  },
  "Mt. Coronet 4F 1-2": {
    location: "Mt. Coronet 4F 1-2",
    grass: {
      rate: 10,
      slots: [
        {
          species: "Bronzong",
          level: 37,
        },
        {
          species: "Graveler",
          level: 38,
        },
        {
          species: "Medicham",
          level: 37,
        },
        {
          species: "Clefairy",
          level: 36,
        },
        {
          species: "Machoke",
          level: 39,
        },
        {
          species: "Medicham",
          level: 39,
        },
        {
          species: "Chingling",
          level: 36,
        },
        {
          species: "Nosepass",
          level: 37,
        },
        {
          species: "Golbat",
          level: 38,
        },
        {
          species: "Chingling",
          level: 38,
        },
        {
          species: "Golbat",
          level: 38,
        },
        {
          species: "Chingling",
          level: 38,
        },
      ],
    },
    swarm: ["Bronzong", "Graveler"],
    day: ["Medicham", "Graveler"],
    night: ["Golbat", "Clefairy"],
    radar: ["Machoke", "Medicham", "Golbat", "Chingling"],
    dualSlots: {
      Emerald: ["Golbat", "Chingling"],
      FireRed: ["Golbat", "Chingling"],
      LeafGreen: ["Golbat", "Chingling"],
      Ruby: ["Solrock", "Solrock"],
      Sapphire: ["Lunatone", "Lunatone"],
    },
  },
  "Mt. Coronet 4F 3": {
    location: "Mt. Coronet 4F 3",
    grass: {
      rate: 15,
      slots: [
        {
          species: "Bronzong",
          level: 37,
        },
        {
          species: "Graveler",
          level: 38,
        },
        {
          species: "Medicham",
          level: 37,
        },
        {
          species: "Clefairy",
          level: 36,
        },
        {
          species: "Machoke",
          level: 39,
        },
        {
          species: "Medicham",
          level: 39,
        },
        {
          species: "Chingling",
          level: 36,
        },
        {
          species: "Nosepass",
          level: 37,
        },
        {
          species: "Golbat",
          level: 38,
        },
        {
          species: "Chingling",
          level: 38,
        },
        {
          species: "Golbat",
          level: 38,
        },
        {
          species: "Chimecho",
          level: 39,
        },
      ],
    },
    swarm: ["Bronzong", "Graveler"],
    day: ["Medicham", "Graveler"],
    night: ["Golbat", "Clefairy"],
    radar: ["Machoke", "Medicham", "Golbat", "Chimecho"],
    dualSlots: {
      Emerald: ["Golbat", "Chingling"],
      FireRed: ["Golbat", "Chingling"],
      LeafGreen: ["Golbat", "Chingling"],
      Ruby: ["Solrock", "Solrock"],
      Sapphire: ["Lunatone", "Lunatone"],
    },
  },
  "Mt. Coronet 5F": {
    location: "Mt. Coronet 5F",
    grass: {
      rate: 15,
      slots: [
        {
          species: "Bronzong",
          level: 37,
        },
        {
          species: "Graveler",
          level: 38,
        },
        {
          species: "Medicham",
          level: 37,
        },
        {
          species: "Clefairy",
          level: 36,
        },
        {
          species: "Machoke",
          level: 39,
        },
        {
          species: "Medicham",
          level: 39,
        },
        {
          species: "Chingling",
          level: 36,
        },
        {
          species: "Nosepass",
          level: 37,
        },
        {
          species: "Golbat",
          level: 38,
        },
        {
          species: "Chimecho",
          level: 39,
        },
        {
          species: "Golbat",
          level: 38,
        },
        {
          species: "Chimecho",
          level: 40,
        },
      ],
    },
    swarm: ["Bronzong", "Graveler"],
    day: ["Medicham", "Graveler"],
    night: ["Golbat", "Clefairy"],
    radar: ["Machoke", "Medicham", "Golbat", "Chimecho"],
    dualSlots: {
      Emerald: ["Golbat", "Chimecho"],
      FireRed: ["Golbat", "Chimecho"],
      LeafGreen: ["Golbat", "Chimecho"],
      Ruby: ["Solrock", "Solrock"],
      Sapphire: ["Lunatone", "Lunatone"],
    },
  },
  "Mt. Coronet 6F": {
    location: "Mt. Coronet 6F",
    grass: {
      rate: 15,
      slots: [
        {
          species: "Bronzong",
          level: 37,
        },
        {
          species: "Graveler",
          level: 38,
        },
        {
          species: "Medicham",
          level: 37,
        },
        {
          species: "Clefairy",
          level: 36,
        },
        {
          species: "Machoke",
          level: 39,
        },
        {
          species: "Medicham",
          level: 39,
        },
        {
          species: "Chimecho",
          level: 39,
        },
        {
          species: "Nosepass",
          level: 37,
        },
        {
          species: "Golbat",
          level: 38,
        },
        {
          species: "Chimecho",
          level: 40,
        },
        {
          species: "Golbat",
          level: 38,
        },
        {
          species: "Chimecho",
          level: 41,
        },
      ],
    },
    swarm: ["Bronzong", "Graveler"],
    day: ["Medicham", "Graveler"],
    night: ["Golbat", "Clefairy"],
    radar: ["Machoke", "Medicham", "Golbat", "Chimecho"],
    dualSlots: {
      Emerald: ["Golbat", "Chimecho"],
      FireRed: ["Golbat", "Chimecho"],
      LeafGreen: ["Golbat", "Chimecho"],
      Ruby: ["Solrock", "Solrock"],
      Sapphire: ["Lunatone", "Lunatone"],
    },
  },
  "Mt. Coronet 1F 2": {
    location: "Mt. Coronet 1F 2",
    grass: {
      rate: 10,
      slots: [
        {
          species: "Graveler",
          level: 37,
        },
        {
          species: "Graveler",
          level: 38,
        },
        {
          species: "Medicham",
          level: 37,
        },
        {
          species: "Clefairy",
          level: 36,
        },
        {
          species: "Machoke",
          level: 39,
        },
        {
          species: "Medicham",
          level: 39,
        },
        {
          species: "Chingling",
          level: 36,
        },
        {
          species: "Nosepass",
          level: 37,
        },
        {
          species: "Golbat",
          level: 38,
        },
        {
          species: "Chingling",
          level: 38,
        },
        {
          species: "Golbat",
          level: 38,
        },
        {
          species: "Chingling",
          level: 38,
        },
      ],
    },
    swarm: ["Graveler", "Graveler"],
    day: ["Medicham", "Graveler"],
    night: ["Golbat", "Clefairy"],
    radar: ["Machoke", "Medicham", "Golbat", "Chingling"],
    dualSlots: {
      Emerald: ["Golbat", "Chingling"],
      FireRed: ["Golbat", "Chingling"],
      LeafGreen: ["Golbat", "Chingling"],
      Ruby: ["Solrock", "Solrock"],
      Sapphire: ["Lunatone", "Lunatone"],
    },
  },
  "Mt. Coronet Upper 1F 2": {
    location: "Mt. Coronet Upper 1F 2",
    grass: {
      rate: 10,
      slots: [
        {
          species: "Bronzor",
          level: 33,
        },
        {
          species: "Graveler",
          level: 34,
        },
        {
          species: "Meditite",
          level: 33,
        },
        {
          species: "Clefairy",
          level: 32,
        },
        {
          species: "Machoke",
          level: 35,
        },
        {
          species: "Meditite",
          level: 35,
        },
        {
          species: "Chingling",
          level: 32,
        },
        {
          species: "Nosepass",
          level: 33,
        },
        {
          species: "Golbat",
          level: 34,
        },
        {
          species: "Chingling",
          level: 34,
        },
        {
          species: "Golbat",
          level: 34,
        },
        {
          species: "Chingling",
          level: 34,
        },
      ],
    },
    swarm: ["Bronzor", "Graveler"],
    day: ["Meditite", "Graveler"],
    night: ["Golbat", "Clefairy"],
    radar: ["Machoke", "Meditite", "Golbat", "Chingling"],
    dualSlots: {
      Emerald: ["Golbat", "Chingling"],
      FireRed: ["Golbat", "Chingling"],
      LeafGreen: ["Golbat", "Chingling"],
      Ruby: ["Golbat", "Chingling"],
      Sapphire: ["Golbat", "Chingling"],
    },
  },
  "Mt. Coronet Upper 1F 1": {
    location: "Mt. Coronet Upper 1F 1",
    grass: {
      rate: 10,
      slots: [
        {
          species: "Bronzor",
          level: 14,
        },
        {
          species: "Geodude",
          level: 15,
        },
        {
          species: "Meditite",
          level: 14,
        },
        {
          species: "Cleffa",
          level: 13,
        },
        {
          species: "Machop",
          level: 16,
        },
        {
          species: "Meditite",
          level: 16,
        },
        {
          species: "Chingling",
          level: 13,
        },
        {
          species: "Nosepass",
          level: 14,
        },
        {
          species: "Zubat",
          level: 15,
        },
        {
          species: "Chingling",
          level: 15,
        },
        {
          species: "Zubat",
          level: 15,
        },
        {
          species: "Chingling",
          level: 15,
        },
      ],
    },
    swarm: ["Bronzor", "Geodude"],
    day: ["Meditite", "Geodude"],
    night: ["Zubat", "Cleffa"],
    radar: ["Machop", "Meditite", "Zubat", "Chingling"],
    dualSlots: {
      Emerald: ["Zubat", "Chingling"],
      FireRed: ["Zubat", "Chingling"],
      LeafGreen: ["Zubat", "Chingling"],
      Ruby: ["Zubat", "Chingling"],
      Sapphire: ["Zubat", "Chingling"],
    },
  },
  "Mt. Coronet Upper B1F": {
    location: "Mt. Coronet Upper B1F",
    grass: {
      rate: 10,
      slots: [
        {
          species: "Bronzor",
          level: 33,
        },
        {
          species: "Graveler",
          level: 34,
        },
        {
          species: "Meditite",
          level: 33,
        },
        {
          species: "Clefairy",
          level: 32,
        },
        {
          species: "Machoke",
          level: 35,
        },
        {
          species: "Meditite",
          level: 35,
        },
        {
          species: "Chingling",
          level: 32,
        },
        {
          species: "Nosepass",
          level: 33,
        },
        {
          species: "Golbat",
          level: 34,
        },
        {
          species: "Chingling",
          level: 34,
        },
        {
          species: "Golbat",
          level: 34,
        },
        {
          species: "Chingling",
          level: 34,
        },
      ],
    },
    swarm: ["Bronzor", "Graveler"],
    day: ["Meditite", "Graveler"],
    night: ["Golbat", "Clefairy"],
    radar: ["Machoke", "Meditite", "Golbat", "Chingling"],
    dualSlots: {
      Emerald: ["Golbat", "Chingling"],
      FireRed: ["Golbat", "Chingling"],
      LeafGreen: ["Golbat", "Chingling"],
      Ruby: ["Golbat", "Chingling"],
      Sapphire: ["Golbat", "Chingling"],
    },
  },
  "Solaceon Ruins 2F": {
    location: "Solaceon Ruins 2F",
    grass: {
      rate: 10,
      slots: [
        {
          species: "Unown",
          level: 20,
        },
        {
          species: "Unown",
          level: 21,
        },
        {
          species: "Unown",
          level: 22,
        },
        {
          species: "Unown",
          level: 23,
        },
        {
          species: "Unown",
          level: 24,
        },
        {
          species: "Unown",
          level: 25,
        },
        {
          species: "Unown",
          level: 26,
        },
        {
          species: "Unown",
          level: 27,
        },
        {
          species: "Unown",
          level: 28,
        },
        {
          species: "Unown",
          level: 29,
        },
        {
          species: "Unown",
          level: 30,
        },
        {
          species: "Unown",
          level: 30,
        },
      ],
    },
    swarm: ["Unown", "Unown"],
    day: ["Unown", "Unown"],
    night: ["Unown", "Unown"],
    radar: ["Unown", "Unown", "Unown", "Unown"],
    dualSlots: {
      Emerald: ["Unown", "Unown"],
      FireRed: ["Unown", "Unown"],
      LeafGreen: ["Unown", "Unown"],
      Ruby: ["Unown", "Unown"],
      Sapphire: ["Unown", "Unown"],
    },
  },
  "Solaceon Ruins": {
    location: "Solaceon Ruins",
    grass: {
      rate: 10,
      slots: [
        {
          species: "Unown",
          level: 20,
        },
        {
          species: "Unown",
          level: 21,
        },
        {
          species: "Unown",
          level: 22,
        },
        {
          species: "Unown",
          level: 23,
        },
        {
          species: "Unown",
          level: 24,
        },
        {
          species: "Unown",
          level: 25,
        },
        {
          species: "Unown",
          level: 26,
        },
        {
          species: "Unown",
          level: 27,
        },
        {
          species: "Unown",
          level: 28,
        },
        {
          species: "Unown",
          level: 29,
        },
        {
          species: "Unown",
          level: 30,
        },
        {
          species: "Unown",
          level: 30,
        },
      ],
    },
    swarm: ["Unown", "Unown"],
    day: ["Unown", "Unown"],
    night: ["Unown", "Unown"],
    radar: ["Unown", "Unown", "Unown", "Unown"],
    dualSlots: {
      Emerald: ["Unown", "Unown"],
      FireRed: ["Unown", "Unown"],
      LeafGreen: ["Unown", "Unown"],
      Ruby: ["Unown", "Unown"],
      Sapphire: ["Unown", "Unown"],
    },
  },
  "Solaceon Ruins B1F (4 Stairs)": {
    location: "Solaceon Ruins B1F (4 Stairs)",
    grass: {
      rate: 10,
      slots: [
        {
          species: "Unown",
          level: 20,
        },
        {
          species: "Unown",
          level: 21,
        },
        {
          species: "Unown",
          level: 22,
        },
        {
          species: "Unown",
          level: 23,
        },
        {
          species: "Unown",
          level: 24,
        },
        {
          species: "Unown",
          level: 25,
        },
        {
          species: "Unown",
          level: 26,
        },
        {
          species: "Unown",
          level: 27,
        },
        {
          species: "Unown",
          level: 28,
        },
        {
          species: "Unown",
          level: 29,
        },
        {
          species: "Unown",
          level: 30,
        },
        {
          species: "Unown",
          level: 30,
        },
      ],
    },
    swarm: ["Unown", "Unown"],
    day: ["Unown", "Unown"],
    night: ["Unown", "Unown"],
    radar: ["Unown", "Unown", "Unown", "Unown"],
    dualSlots: {
      Emerald: ["Unown", "Unown"],
      FireRed: ["Unown", "Unown"],
      LeafGreen: ["Unown", "Unown"],
      Ruby: ["Unown", "Unown"],
      Sapphire: ["Unown", "Unown"],
    },
  },
  "Solaceon Ruins B2F (4 Stairs)": {
    location: "Solaceon Ruins B2F (4 Stairs)",
    grass: {
      rate: 10,
      slots: [
        {
          species: "Unown",
          level: 20,
        },
        {
          species: "Unown",
          level: 21,
        },
        {
          species: "Unown",
          level: 22,
        },
        {
          species: "Unown",
          level: 23,
        },
        {
          species: "Unown",
          level: 24,
        },
        {
          species: "Unown",
          level: 25,
        },
        {
          species: "Unown",
          level: 26,
        },
        {
          species: "Unown",
          level: 27,
        },
        {
          species: "Unown",
          level: 28,
        },
        {
          species: "Unown",
          level: 29,
        },
        {
          species: "Unown",
          level: 30,
        },
        {
          species: "Unown",
          level: 30,
        },
      ],
    },
    swarm: ["Unown", "Unown"],
    day: ["Unown", "Unown"],
    night: ["Unown", "Unown"],
    radar: ["Unown", "Unown", "Unown", "Unown"],
    dualSlots: {
      Emerald: ["Unown", "Unown"],
      FireRed: ["Unown", "Unown"],
      LeafGreen: ["Unown", "Unown"],
      Ruby: ["Unown", "Unown"],
      Sapphire: ["Unown", "Unown"],
    },
  },
  "Solaceon Ruins B3F (3 Stairs)": {
    location: "Solaceon Ruins B3F (3 Stairs)",
    grass: {
      rate: 10,
      slots: [
        {
          species: "Unown",
          level: 20,
        },
        {
          species: "Unown",
          level: 21,
        },
        {
          species: "Unown",
          level: 22,
        },
        {
          species: "Unown",
          level: 23,
        },
        {
          species: "Unown",
          level: 24,
        },
        {
          species: "Unown",
          level: 25,
        },
        {
          species: "Unown",
          level: 26,
        },
        {
          species: "Unown",
          level: 27,
        },
        {
          species: "Unown",
          level: 28,
        },
        {
          species: "Unown",
          level: 29,
        },
        {
          species: "Unown",
          level: 30,
        },
        {
          species: "Unown",
          level: 30,
        },
      ],
    },
    swarm: ["Unown", "Unown"],
    day: ["Unown", "Unown"],
    night: ["Unown", "Unown"],
    radar: ["Unown", "Unown", "Unown", "Unown"],
    dualSlots: {
      Emerald: ["Unown", "Unown"],
      FireRed: ["Unown", "Unown"],
      LeafGreen: ["Unown", "Unown"],
      Ruby: ["Unown", "Unown"],
      Sapphire: ["Unown", "Unown"],
    },
  },
  "Solaceon Ruins B3F (4 Stairs)": {
    location: "Solaceon Ruins B3F (4 Stairs)",
    grass: {
      rate: 10,
      slots: [
        {
          species: "Unown",
          level: 20,
        },
        {
          species: "Unown",
          level: 21,
        },
        {
          species: "Unown",
          level: 22,
        },
        {
          species: "Unown",
          level: 23,
        },
        {
          species: "Unown",
          level: 24,
        },
        {
          species: "Unown",
          level: 25,
        },
        {
          species: "Unown",
          level: 26,
        },
        {
          species: "Unown",
          level: 27,
        },
        {
          species: "Unown",
          level: 28,
        },
        {
          species: "Unown",
          level: 29,
        },
        {
          species: "Unown",
          level: 30,
        },
        {
          species: "Unown",
          level: 30,
        },
      ],
    },
    swarm: ["Unown", "Unown"],
    day: ["Unown", "Unown"],
    night: ["Unown", "Unown"],
    radar: ["Unown", "Unown", "Unown", "Unown"],
    dualSlots: {
      Emerald: ["Unown", "Unown"],
      FireRed: ["Unown", "Unown"],
      LeafGreen: ["Unown", "Unown"],
      Ruby: ["Unown", "Unown"],
      Sapphire: ["Unown", "Unown"],
    },
  },
  "Solaceon Ruins B4F (4 Stairs)": {
    location: "Solaceon Ruins B4F (4 Stairs)",
    grass: {
      rate: 10,
      slots: [
        {
          species: "Unown",
          level: 20,
        },
        {
          species: "Unown",
          level: 21,
        },
        {
          species: "Unown",
          level: 22,
        },
        {
          species: "Unown",
          level: 23,
        },
        {
          species: "Unown",
          level: 24,
        },
        {
          species: "Unown",
          level: 25,
        },
        {
          species: "Unown",
          level: 26,
        },
        {
          species: "Unown",
          level: 27,
        },
        {
          species: "Unown",
          level: 28,
        },
        {
          species: "Unown",
          level: 29,
        },
        {
          species: "Unown",
          level: 30,
        },
        {
          species: "Unown",
          level: 30,
        },
      ],
    },
    swarm: ["Unown", "Unown"],
    day: ["Unown", "Unown"],
    night: ["Unown", "Unown"],
    radar: ["Unown", "Unown", "Unown", "Unown"],
    dualSlots: {
      Emerald: ["Unown", "Unown"],
      FireRed: ["Unown", "Unown"],
      LeafGreen: ["Unown", "Unown"],
      Ruby: ["Unown", "Unown"],
      Sapphire: ["Unown", "Unown"],
    },
  },
  "Solaceon Ruins B4F (Chamber)": {
    location: "Solaceon Ruins B4F (Chamber)",
    grass: {
      rate: 10,
      slots: [
        {
          species: "Unown",
          level: 20,
        },
        {
          species: "Unown",
          level: 21,
        },
        {
          species: "Unown",
          level: 22,
        },
        {
          species: "Unown",
          level: 23,
        },
        {
          species: "Unown",
          level: 24,
        },
        {
          species: "Unown",
          level: 25,
        },
        {
          species: "Unown",
          level: 26,
        },
        {
          species: "Unown",
          level: 27,
        },
        {
          species: "Unown",
          level: 28,
        },
        {
          species: "Unown",
          level: 29,
        },
        {
          species: "Unown",
          level: 30,
        },
        {
          species: "Unown",
          level: 30,
        },
      ],
    },
    swarm: ["Unown", "Unown"],
    day: ["Unown", "Unown"],
    night: ["Unown", "Unown"],
    radar: ["Unown", "Unown", "Unown", "Unown"],
    dualSlots: {
      Emerald: ["Unown", "Unown"],
      FireRed: ["Unown", "Unown"],
      LeafGreen: ["Unown", "Unown"],
      Ruby: ["Unown", "Unown"],
      Sapphire: ["Unown", "Unown"],
    },
  },
  "Victory Road 1F": {
    location: "Victory Road 1F",
    grass: {
      rate: 15,
      slots: [
        {
          species: "Graveler",
          level: 40,
        },
        {
          species: "Rhyhorn",
          level: 41,
        },
        {
          species: "Graveler",
          level: 42,
        },
        {
          species: "Onix",
          level: 41,
        },
        {
          species: "Onix",
          level: 42,
        },
        {
          species: "Rhydon",
          level: 41,
        },
        {
          species: "Golbat",
          level: 43,
        },
        {
          species: "Rhydon",
          level: 43,
        },
        {
          species: "Steelix",
          level: 42,
        },
        {
          species: "Gabite",
          level: 41,
        },
        {
          species: "Steelix",
          level: 42,
        },
        {
          species: "Gabite",
          level: 41,
        },
      ],
    },
    swarm: ["Graveler", "Rhyhorn"],
    day: ["Graveler", "Onix"],
    night: ["Golbat", "Onix"],
    radar: ["Onix", "Rhydon", "Steelix", "Gabite"],
    dualSlots: {
      Emerald: ["Steelix", "Gabite"],
      FireRed: ["Steelix", "Gabite"],
      LeafGreen: ["Steelix", "Gabite"],
      Ruby: ["Steelix", "Gabite"],
      Sapphire: ["Steelix", "Gabite"],
    },
  },
  "Victory Road 2F": {
    location: "Victory Road 2F",
    grass: {
      rate: 15,
      slots: [
        {
          species: "Magneton",
          level: 41,
        },
        {
          species: "Steelix",
          level: 42,
        },
        {
          species: "Graveler",
          level: 41,
        },
        {
          species: "Steelix",
          level: 42,
        },
        {
          species: "Steelix",
          level: 44,
        },
        {
          species: "Magneton",
          level: 43,
        },
        {
          species: "Golbat",
          level: 44,
        },
        {
          species: "Graveler",
          level: 43,
        },
        {
          species: "Onix",
          level: 42,
        },
        {
          species: "Gabite",
          level: 43,
        },
        {
          species: "Onix",
          level: 42,
        },
        {
          species: "Gabite",
          level: 43,
        },
      ],
    },
    swarm: ["Magneton", "Steelix"],
    day: ["Graveler", "Steelix"],
    night: ["Golbat", "Steelix"],
    radar: ["Steelix", "Magneton", "Onix", "Gabite"],
    dualSlots: {
      Emerald: ["Onix", "Gabite"],
      FireRed: ["Onix", "Gabite"],
      LeafGreen: ["Onix", "Gabite"],
      Ruby: ["Onix", "Gabite"],
      Sapphire: ["Onix", "Gabite"],
    },
  },
  "Victory Road B1F": {
    location: "Victory Road B1F",
    grass: {
      rate: 15,
      slots: [
        {
          species: "Floatzel",
          level: 42,
        },
        {
          species: "Azumarill",
          level: 41,
        },
        {
          species: "Graveler",
          level: 41,
        },
        {
          species: "Azumarill",
          level: 43,
        },
        {
          species: "Onix",
          level: 42,
        },
        {
          species: "Floatzel",
          level: 44,
        },
        {
          species: "Golbat",
          level: 44,
        },
        {
          species: "Graveler",
          level: 43,
        },
        {
          species: "Steelix",
          level: 44,
        },
        {
          species: "Gabite",
          level: 43,
        },
        {
          species: "Steelix",
          level: 44,
        },
        {
          species: "Gabite",
          level: 43,
        },
      ],
    },
    swarm: ["Floatzel", "Azumarill"],
    day: ["Graveler", "Azumarill"],
    night: ["Golbat", "Azumarill"],
    radar: ["Onix", "Floatzel", "Steelix", "Gabite"],
    dualSlots: {
      Emerald: ["Steelix", "Gabite"],
      FireRed: ["Steelix", "Gabite"],
      LeafGreen: ["Steelix", "Gabite"],
      Ruby: ["Steelix", "Gabite"],
      Sapphire: ["Steelix", "Gabite"],
    },
  },
  "Victory Road 1F Back 2": {
    location: "Victory Road 1F Back 2",
    grass: {
      rate: 15,
      slots: [
        {
          species: "Floatzel",
          level: 48,
        },
        {
          species: "Azumarill",
          level: 47,
        },
        {
          species: "Graveler",
          level: 47,
        },
        {
          species: "Azumarill",
          level: 49,
        },
        {
          species: "Dewgong",
          level: 48,
        },
        {
          species: "Floatzel",
          level: 50,
        },
        {
          species: "Golbat",
          level: 50,
        },
        {
          species: "Graveler",
          level: 49,
        },
        {
          species: "Dewgong",
          level: 50,
        },
        {
          species: "Gabite",
          level: 49,
        },
        {
          species: "Dewgong",
          level: 50,
        },
        {
          species: "Gabite",
          level: 49,
        },
      ],
    },
    swarm: ["Floatzel", "Azumarill"],
    day: ["Graveler", "Azumarill"],
    night: ["Golbat", "Azumarill"],
    radar: ["Dewgong", "Floatzel", "Dewgong", "Gabite"],
    dualSlots: {
      Emerald: ["Dewgong", "Gabite"],
      FireRed: ["Dewgong", "Gabite"],
      LeafGreen: ["Dewgong", "Gabite"],
      Ruby: ["Dewgong", "Gabite"],
      Sapphire: ["Dewgong", "Gabite"],
    },
  },
  "Victory Road 1F Back 1": {
    location: "Victory Road 1F Back 1",
    grass: {
      rate: 15,
      slots: [
        {
          species: "Graveler",
          level: 47,
        },
        {
          species: "Floatzel",
          level: 47,
        },
        {
          species: "Graveler",
          level: 49,
        },
        {
          species: "Onix",
          level: 48,
        },
        {
          species: "Onix",
          level: 50,
        },
        {
          species: "Floatzel",
          level: 48,
        },
        {
          species: "Golbat",
          level: 50,
        },
        {
          species: "Floatzel",
          level: 49,
        },
        {
          species: "Steelix",
          level: 50,
        },
        {
          species: "Gabite",
          level: 50,
        },
        {
          species: "Steelix",
          level: 50,
        },
        {
          species: "Gabite",
          level: 50,
        },
      ],
    },
    swarm: ["Graveler", "Floatzel"],
    day: ["Graveler", "Onix"],
    night: ["Golbat", "Onix"],
    radar: ["Onix", "Floatzel", "Steelix", "Gabite"],
    dualSlots: {
      Emerald: ["Steelix", "Gabite"],
      FireRed: ["Steelix", "Gabite"],
      LeafGreen: ["Steelix", "Gabite"],
      Ruby: ["Steelix", "Gabite"],
      Sapphire: ["Steelix", "Gabite"],
    },
  },
  "Victory Road 1F Back 3": {
    location: "Victory Road 1F Back 3",
    grass: {
      rate: 15,
      slots: [
        {
          species: "Graveler",
          level: 47,
        },
        {
          species: "Floatzel",
          level: 47,
        },
        {
          species: "Graveler",
          level: 49,
        },
        {
          species: "Onix",
          level: 48,
        },
        {
          species: "Onix",
          level: 50,
        },
        {
          species: "Floatzel",
          level: 48,
        },
        {
          species: "Golbat",
          level: 49,
        },
        {
          species: "Floatzel",
          level: 49,
        },
        {
          species: "Steelix",
          level: 50,
        },
        {
          species: "Gabite",
          level: 50,
        },
        {
          species: "Steelix",
          level: 50,
        },
        {
          species: "Gabite",
          level: 50,
        },
      ],
    },
    swarm: ["Graveler", "Floatzel"],
    day: ["Graveler", "Onix"],
    night: ["Golbat", "Onix"],
    radar: ["Onix", "Floatzel", "Steelix", "Gabite"],
    dualSlots: {
      Emerald: ["Steelix", "Gabite"],
      FireRed: ["Steelix", "Gabite"],
      LeafGreen: ["Steelix", "Gabite"],
      Ruby: ["Steelix", "Gabite"],
      Sapphire: ["Steelix", "Gabite"],
    },
  },
  "Ravaged Path": {
    location: "Ravaged Path",
    grass: {
      rate: 10,
      slots: [
        {
          species: "Zubat",
          level: 4,
        },
        {
          species: "Psyduck",
          level: 4,
        },
        {
          species: "Zubat",
          level: 5,
        },
        {
          species: "Psyduck",
          level: 5,
        },
        {
          species: "Zubat",
          level: 3,
        },
        {
          species: "Zubat",
          level: 3,
        },
        {
          species: "Psyduck",
          level: 6,
        },
        {
          species: "Zubat",
          level: 6,
        },
        {
          species: "Zubat",
          level: 6,
        },
        {
          species: "Zubat",
          level: 6,
        },
        {
          species: "Zubat",
          level: 6,
        },
        {
          species: "Zubat",
          level: 6,
        },
      ],
    },
    swarm: ["Zubat", "Psyduck"],
    day: ["Zubat", "Psyduck"],
    night: ["Zubat", "Psyduck"],
    radar: ["Zubat", "Zubat", "Zubat", "Zubat"],
    dualSlots: {
      Emerald: ["Zubat", "Zubat"],
      FireRed: ["Zubat", "Zubat"],
      LeafGreen: ["Zubat", "Zubat"],
      Ruby: ["Zubat", "Zubat"],
      Sapphire: ["Zubat", "Zubat"],
    },
  },
  "Oreburgh Gate 1F": {
    location: "Oreburgh Gate 1F",
    grass: {
      rate: 10,
      slots: [
        {
          species: "Zubat",
          level: 5,
        },
        {
          species: "Psyduck",
          level: 5,
        },
        {
          species: "Zubat",
          level: 6,
        },
        {
          species: "Psyduck",
          level: 6,
        },
        {
          species: "Geodude",
          level: 5,
        },
        {
          species: "Zubat",
          level: 5,
        },
        {
          species: "Psyduck",
          level: 7,
        },
        {
          species: "Geodude",
          level: 7,
        },
        {
          species: "Zubat",
          level: 7,
        },
        {
          species: "Zubat",
          level: 8,
        },
        {
          species: "Zubat",
          level: 7,
        },
        {
          species: "Zubat",
          level: 8,
        },
      ],
    },
    swarm: ["Zubat", "Psyduck"],
    day: ["Zubat", "Psyduck"],
    night: ["Zubat", "Psyduck"],
    radar: ["Geodude", "Zubat", "Zubat", "Zubat"],
    dualSlots: {
      Emerald: ["Zubat", "Zubat"],
      FireRed: ["Zubat", "Zubat"],
      LeafGreen: ["Zubat", "Zubat"],
      Ruby: ["Zubat", "Zubat"],
      Sapphire: ["Zubat", "Zubat"],
    },
  },
  "Oreburgh Gate B1F": {
    location: "Oreburgh Gate B1F",
    grass: {
      rate: 10,
      slots: [
        {
          species: "Zubat",
          level: 6,
        },
        {
          species: "Psyduck",
          level: 8,
        },
        {
          species: "Zubat",
          level: 7,
        },
        {
          species: "Psyduck",
          level: 9,
        },
        {
          species: "Geodude",
          level: 6,
        },
        {
          species: "Zubat",
          level: 8,
        },
        {
          species: "Psyduck",
          level: 10,
        },
        {
          species: "Geodude",
          level: 8,
        },
        {
          species: "Zubat",
          level: 9,
        },
        {
          species: "Golbat",
          level: 10,
        },
        {
          species: "Zubat",
          level: 9,
        },
        {
          species: "Golbat",
          level: 10,
        },
      ],
    },
    swarm: ["Zubat", "Psyduck"],
    day: ["Zubat", "Psyduck"],
    night: ["Zubat", "Psyduck"],
    radar: ["Geodude", "Zubat", "Zubat", "Golbat"],
    dualSlots: {
      Emerald: ["Zubat", "Golbat"],
      FireRed: ["Zubat", "Golbat"],
      LeafGreen: ["Zubat", "Golbat"],
      Ruby: ["Zubat", "Golbat"],
      Sapphire: ["Zubat", "Golbat"],
    },
  },
  "Stark Mountain": {
    location: "Stark Mountain",
    grass: {
      rate: 10,
      slots: [
        {
          species: "Camerupt",
          level: 53,
        },
        {
          species: "Rhydon",
          level: 54,
        },
        {
          species: "Fearow",
          level: 51,
        },
        {
          species: "Graveler",
          level: 51,
        },
        {
          species: "Fearow",
          level: 53,
        },
        {
          species: "Weezing",
          level: 52,
        },
        {
          species: "Skarmory",
          level: 53,
        },
        {
          species: "Graveler",
          level: 53,
        },
        {
          species: "Numel",
          level: 51,
        },
        {
          species: "Rhyhorn",
          level: 52,
        },
        {
          species: "Numel",
          level: 51,
        },
        {
          species: "Rhyhorn",
          level: 52,
        },
      ],
    },
    swarm: ["Camerupt", "Rhydon"],
    day: ["Fearow", "Graveler"],
    night: ["Golbat", "Graveler"],
    radar: ["Torkoal", "Torkoal", "Torkoal", "Torkoal"],
    dualSlots: {
      Emerald: ["Numel", "Rhyhorn"],
      FireRed: ["Numel", "Rhyhorn"],
      LeafGreen: ["Numel", "Rhyhorn"],
      Ruby: ["Numel", "Rhyhorn"],
      Sapphire: ["Numel", "Rhyhorn"],
    },
  },
  "Stark Mountain Interior 1": {
    location: "Stark Mountain Interior 1",
    grass: {
      rate: 10,
      slots: [
        {
          species: "Magcargo",
          level: 54,
        },
        {
          species: "Rhydon",
          level: 54,
        },
        {
          species: "Golbat",
          level: 52,
        },
        {
          species: "Graveler",
          level: 51,
        },
        {
          species: "Golbat",
          level: 52,
        },
        {
          species: "Weezing",
          level: 53,
        },
        {
          species: "Weezing",
          level: 51,
        },
        {
          species: "Graveler",
          level: 53,
        },
        {
          species: "Slugma",
          level: 52,
        },
        {
          species: "Rhyhorn",
          level: 52,
        },
        {
          species: "Slugma",
          level: 52,
        },
        {
          species: "Rhyhorn",
          level: 52,
        },
      ],
    },
    swarm: ["Magcargo", "Rhydon"],
    day: ["Golbat", "Graveler"],
    night: ["Golbat", "Graveler"],
    radar: ["Golbat", "Weezing", "Slugma", "Rhyhorn"],
    dualSlots: {
      Emerald: ["Slugma", "Rhyhorn"],
      FireRed: ["Slugma", "Rhyhorn"],
      LeafGreen: ["Slugma", "Rhyhorn"],
      Ruby: ["Slugma", "Rhyhorn"],
      Sapphire: ["Slugma", "Rhyhorn"],
    },
  },
  "Stark Mountain Interior 2": {
    location: "Stark Mountain Interior 2",
    grass: {
      rate: 10,
      slots: [
        {
          species: "Magcargo",
          level: 53,
        },
        {
          species: "Magcargo",
          level: 55,
        },
        {
          species: "Golbat",
          level: 53,
        },
        {
          species: "Graveler",
          level: 52,
        },
        {
          species: "Rhydon",
          level: 55,
        },
        {
          species: "Weezing",
          level: 54,
        },
        {
          species: "Weezing",
          level: 52,
        },
        {
          species: "Graveler",
          level: 54,
        },
        {
          species: "Slugma",
          level: 53,
        },
        {
          species: "Koffing",
          level: 53,
        },
        {
          species: "Slugma",
          level: 53,
        },
        {
          species: "Koffing",
          level: 53,
        },
      ],
    },
    swarm: ["Magcargo", "Magcargo"],
    day: ["Golbat", "Graveler"],
    night: ["Golbat", "Graveler"],
    radar: ["Rhydon", "Weezing", "Slugma", "Koffing"],
    dualSlots: {
      Emerald: ["Slugma", "Koffing"],
      FireRed: ["Slugma", "Koffing"],
      LeafGreen: ["Slugma", "Koffing"],
      Ruby: ["Slugma", "Koffing"],
      Sapphire: ["Slugma", "Koffing"],
    },
  },
  "Sendoff Spring": {
    location: "Sendoff Spring",
    grass: {
      rate: 30,
      slots: [
        {
          species: "Graveler",
          level: 38,
        },
        {
          species: "Bibarel",
          level: 37,
        },
        {
          species: "Graveler",
          level: 39,
        },
        {
          species: "Staravia",
          level: 38,
        },
        {
          species: "Bibarel",
          level: 38,
        },
        {
          species: "Staravia",
          level: 40,
        },
        {
          species: "Graveler",
          level: 37,
        },
        {
          species: "Chingling",
          level: 37,
        },
        {
          species: "Dusclops",
          level: 40,
        },
        {
          species: "Chingling",
          level: 39,
        },
        {
          species: "Dusclops",
          level: 40,
        },
        {
          species: "Chingling",
          level: 39,
        },
      ],
    },
    swarm: ["Graveler", "Bibarel"],
    day: ["Graveler", "Staravia"],
    night: ["Dusclops", "Golbat"],
    radar: ["Bibarel", "Staravia", "Dusclops", "Chingling"],
    dualSlots: {
      Emerald: ["Dusclops", "Chingling"],
      FireRed: ["Dusclops", "Chingling"],
      LeafGreen: ["Dusclops", "Chingling"],
      Ruby: ["Solrock", "Solrock"],
      Sapphire: ["Lunatone", "Lunatone"],
    },
  },
  "Turnback Cave Entrance": {
    location: "Turnback Cave Entrance",
    grass: {
      rate: 15,
      slots: [
        {
          species: "Gastly",
          level: 15,
        },
        {
          species: "Bronzor",
          level: 15,
        },
        {
          species: "Gastly",
          level: 16,
        },
        {
          species: "Golbat",
          level: 17,
        },
        {
          species: "Gastly",
          level: 17,
        },
        {
          species: "Golbat",
          level: 17,
        },
        {
          species: "Golbat",
          level: 18,
        },
        {
          species: "Chingling",
          level: 16,
        },
        {
          species: "Duskull",
          level: 18,
        },
        {
          species: "Chingling",
          level: 18,
        },
        {
          species: "Duskull",
          level: 18,
        },
        {
          species: "Chingling",
          level: 18,
        },
      ],
    },
    swarm: ["Gastly", "Bronzor"],
    day: ["Gastly", "Golbat"],
    night: ["Dusclops", "Golbat"],
    radar: ["Gastly", "Golbat", "Dusclops", "Chingling"],
    dualSlots: {
      Emerald: ["Dusclops", "Chingling"],
      FireRed: ["Dusclops", "Chingling"],
      LeafGreen: ["Dusclops", "Chingling"],
      Ruby: ["Solrock", "Solrock"],
      Sapphire: ["Lunatone", "Lunatone"],
    },
  },
  "Snowpoint Temple 1F": {
    location: "Snowpoint Temple 1F",
    grass: {
      rate: 5,
      slots: [
        {
          species: "Golbat",
          level: 47,
        },
        {
          species: "Golbat",
          level: 48,
        },
        {
          species: "Golbat",
          level: 49,
        },
        {
          species: "Golbat",
          level: 50,
        },
        {
          species: "Golbat",
          level: 48,
        },
        {
          species: "Sneasel",
          level: 49,
        },
        {
          species: "Smoochum",
          level: 47,
        },
        {
          species: "Golbat",
          level: 49,
        },
        {
          species: "Smoochum",
          level: 49,
        },
        {
          species: "Golbat",
          level: 47,
        },
        {
          species: "Smoochum",
          level: 49,
        },
        {
          species: "Golbat",
          level: 47,
        },
      ],
    },
    swarm: ["Golbat", "Golbat"],
    day: ["Golbat", "Golbat"],
    night: ["Golbat", "Golbat"],
    radar: ["Golbat", "Sneasel", "Smoochum", "Golbat"],
    dualSlots: {
      Emerald: ["Smoochum", "Golbat"],
      FireRed: ["Smoochum", "Golbat"],
      LeafGreen: ["Smoochum", "Golbat"],
      Ruby: ["Smoochum", "Golbat"],
      Sapphire: ["Smoochum", "Golbat"],
    },
  },
  "Snowpoint Temple B1F": {
    location: "Snowpoint Temple B1F",
    grass: {
      rate: 5,
      slots: [
        {
          species: "Golbat",
          level: 47,
        },
        {
          species: "Golbat",
          level: 48,
        },
        {
          species: "Golbat",
          level: 49,
        },
        {
          species: "Golbat",
          level: 50,
        },
        {
          species: "Golbat",
          level: 48,
        },
        {
          species: "Sneasel",
          level: 49,
        },
        {
          species: "Jynx",
          level: 47,
        },
        {
          species: "Golbat",
          level: 49,
        },
        {
          species: "Jynx",
          level: 49,
        },
        {
          species: "Golbat",
          level: 47,
        },
        {
          species: "Jynx",
          level: 49,
        },
        {
          species: "Golbat",
          level: 47,
        },
      ],
    },
    swarm: ["Golbat", "Golbat"],
    day: ["Golbat", "Golbat"],
    night: ["Golbat", "Golbat"],
    radar: ["Golbat", "Sneasel", "Jynx", "Golbat"],
    dualSlots: {
      Emerald: ["Jynx", "Golbat"],
      FireRed: ["Jynx", "Golbat"],
      LeafGreen: ["Jynx", "Golbat"],
      Ruby: ["Jynx", "Golbat"],
      Sapphire: ["Jynx", "Golbat"],
    },
  },
  "Snowpoint Temple B2F": {
    location: "Snowpoint Temple B2F",
    grass: {
      rate: 5,
      slots: [
        {
          species: "Golbat",
          level: 47,
        },
        {
          species: "Golbat",
          level: 48,
        },
        {
          species: "Golbat",
          level: 49,
        },
        {
          species: "Golbat",
          level: 50,
        },
        {
          species: "Golbat",
          level: 48,
        },
        {
          species: "Sneasel",
          level: 50,
        },
        {
          species: "Jynx",
          level: 48,
        },
        {
          species: "Golbat",
          level: 49,
        },
        {
          species: "Jynx",
          level: 50,
        },
        {
          species: "Golbat",
          level: 47,
        },
        {
          species: "Jynx",
          level: 50,
        },
        {
          species: "Golbat",
          level: 47,
        },
      ],
    },
    swarm: ["Golbat", "Golbat"],
    day: ["Golbat", "Golbat"],
    night: ["Golbat", "Golbat"],
    radar: ["Golbat", "Sneasel", "Jynx", "Golbat"],
    dualSlots: {
      Emerald: ["Jynx", "Golbat"],
      FireRed: ["Jynx", "Golbat"],
      LeafGreen: ["Jynx", "Golbat"],
      Ruby: ["Jynx", "Golbat"],
      Sapphire: ["Jynx", "Golbat"],
    },
  },
  "Snowpoint Temple B3F": {
    location: "Snowpoint Temple B3F",
    grass: {
      rate: 5,
      slots: [
        {
          species: "Golbat",
          level: 47,
        },
        {
          species: "Golbat",
          level: 48,
        },
        {
          species: "Golbat",
          level: 49,
        },
        {
          species: "Golbat",
          level: 50,
        },
        {
          species: "Golbat",
          level: 48,
        },
        {
          species: "Sneasel",
          level: 50,
        },
        {
          species: "Jynx",
          level: 48,
        },
        {
          species: "Golbat",
          level: 49,
        },
        {
          species: "Jynx",
          level: 50,
        },
        {
          species: "Golbat",
          level: 47,
        },
        {
          species: "Jynx",
          level: 50,
        },
        {
          species: "Golbat",
          level: 47,
        },
      ],
    },
    swarm: ["Golbat", "Golbat"],
    day: ["Golbat", "Golbat"],
    night: ["Golbat", "Golbat"],
    radar: ["Golbat", "Sneasel", "Jynx", "Golbat"],
    dualSlots: {
      Emerald: ["Jynx", "Golbat"],
      FireRed: ["Jynx", "Golbat"],
      LeafGreen: ["Jynx", "Golbat"],
      Ruby: ["Jynx", "Golbat"],
      Sapphire: ["Jynx", "Golbat"],
    },
  },
  "Snowpoint Temple B4F": {
    location: "Snowpoint Temple B4F",
    grass: {
      rate: 5,
      slots: [
        {
          species: "Golbat",
          level: 47,
        },
        {
          species: "Golbat",
          level: 48,
        },
        {
          species: "Golbat",
          level: 49,
        },
        {
          species: "Golbat",
          level: 50,
        },
        {
          species: "Golbat",
          level: 48,
        },
        {
          species: "Sneasel",
          level: 51,
        },
        {
          species: "Jynx",
          level: 49,
        },
        {
          species: "Golbat",
          level: 49,
        },
        {
          species: "Jynx",
          level: 51,
        },
        {
          species: "Golbat",
          level: 47,
        },
        {
          species: "Jynx",
          level: 51,
        },
        {
          species: "Golbat",
          level: 47,
        },
      ],
    },
    swarm: ["Golbat", "Golbat"],
    day: ["Golbat", "Golbat"],
    night: ["Golbat", "Golbat"],
    radar: ["Golbat", "Sneasel", "Jynx", "Golbat"],
    dualSlots: {
      Emerald: ["Jynx", "Golbat"],
      FireRed: ["Jynx", "Golbat"],
      LeafGreen: ["Jynx", "Golbat"],
      Ruby: ["Jynx", "Golbat"],
      Sapphire: ["Jynx", "Golbat"],
    },
  },
  "Snowpoint Temple B5F": {
    location: "Snowpoint Temple B5F",
    grass: {
      rate: 5,
      slots: [
        {
          species: "Golbat",
          level: 47,
        },
        {
          species: "Golbat",
          level: 48,
        },
        {
          species: "Golbat",
          level: 49,
        },
        {
          species: "Golbat",
          level: 50,
        },
        {
          species: "Golbat",
          level: 48,
        },
        {
          species: "Sneasel",
          level: 51,
        },
        {
          species: "Jynx",
          level: 49,
        },
        {
          species: "Golbat",
          level: 49,
        },
        {
          species: "Jynx",
          level: 51,
        },
        {
          species: "Golbat",
          level: 47,
        },
        {
          species: "Jynx",
          level: 51,
        },
        {
          species: "Golbat",
          level: 47,
        },
      ],
    },
    swarm: ["Golbat", "Golbat"],
    day: ["Golbat", "Golbat"],
    night: ["Golbat", "Golbat"],
    radar: ["Golbat", "Sneasel", "Jynx", "Golbat"],
    dualSlots: {
      Emerald: ["Jynx", "Golbat"],
      FireRed: ["Jynx", "Golbat"],
      LeafGreen: ["Jynx", "Golbat"],
      Ruby: ["Jynx", "Golbat"],
      Sapphire: ["Jynx", "Golbat"],
    },
  },
  "Wayward Cave 1F": {
    location: "Wayward Cave 1F",
    grass: {
      rate: 10,
      slots: [
        {
          species: "Bronzor",
          level: 18,
        },
        {
          species: "Geodude",
          level: 18,
        },
        {
          species: "Geodude",
          level: 17,
        },
        {
          species: "Zubat",
          level: 19,
        },
        {
          species: "Bronzor",
          level: 20,
        },
        {
          species: "Onix",
          level: 20,
        },
        {
          species: "Geodude",
          level: 19,
        },
        {
          species: "Geodude",
          level: 20,
        },
        {
          species: "Zubat",
          level: 17,
        },
        {
          species: "Onix",
          level: 18,
        },
        {
          species: "Zubat",
          level: 17,
        },
        {
          species: "Onix",
          level: 18,
        },
      ],
    },
    swarm: ["Bronzor", "Geodude"],
    day: ["Geodude", "Zubat"],
    night: ["Geodude", "Zubat"],
    radar: ["Bronzor", "Onix", "Geodude", "Onix"],
    dualSlots: {
      Emerald: ["Geodude", "Onix"],
      FireRed: ["Geodude", "Onix"],
      LeafGreen: ["Sandshrew", "Sandshrew"],
      Ruby: ["Geodude", "Onix"],
      Sapphire: ["Geodude", "Onix"],
    },
  },
  "Wayward Cave B1F": {
    location: "Wayward Cave B1F",
    grass: {
      rate: 10,
      slots: [
        {
          species: "Bronzor",
          level: 18,
        },
        {
          species: "Geodude",
          level: 18,
        },
        {
          species: "Gible",
          level: 17,
        },
        {
          species: "Zubat",
          level: 19,
        },
        {
          species: "Bronzor",
          level: 20,
        },
        {
          species: "Onix",
          level: 20,
        },
        {
          species: "Gible",
          level: 19,
        },
        {
          species: "Geodude",
          level: 20,
        },
        {
          species: "Gible",
          level: 20,
        },
        {
          species: "Onix",
          level: 18,
        },
        {
          species: "Gible",
          level: 20,
        },
        {
          species: "Onix",
          level: 18,
        },
      ],
    },
    swarm: ["Bronzor", "Geodude"],
    day: ["Gible", "Zubat"],
    night: ["Gible", "Zubat"],
    radar: ["Bronzor", "Onix", "Gible", "Onix"],
    dualSlots: {
      Emerald: ["Gible", "Onix"],
      FireRed: ["Gible", "Onix"],
      LeafGreen: ["Sandshrew", "Sandshrew"],
      Ruby: ["Gible", "Onix"],
      Sapphire: ["Gible", "Onix"],
    },
  },
  "Ruin Maniac Cave (< 10 Unown)": {
    location: "Ruin Maniac Cave (< 10 Unown)",
    grass: {
      rate: 10,
      slots: [
        {
          species: "Geodude",
          level: 23,
        },
        {
          species: "Geodude",
          level: 22,
        },
        {
          species: "Geodude",
          level: 21,
        },
        {
          species: "Geodude",
          level: 23,
        },
        {
          species: "Geodude",
          level: 23,
        },
        {
          species: "Geodude",
          level: 23,
        },
        {
          species: "Geodude",
          level: 23,
        },
        {
          species: "Geodude",
          level: 23,
        },
        {
          species: "Geodude",
          level: 23,
        },
        {
          species: "Hippopotas",
          level: 22,
        },
        {
          species: "Geodude",
          level: 23,
        },
        {
          species: "Hippopotas",
          level: 24,
        },
      ],
    },
    swarm: ["Geodude", "Geodude"],
    day: ["Geodude", "Geodude"],
    night: ["Geodude", "Geodude"],
    radar: ["Geodude", "Geodude", "Geodude", "Hippopotas"],
    dualSlots: {
      Emerald: ["Geodude", "Hippopotas"],
      FireRed: ["Geodude", "Hippopotas"],
      LeafGreen: ["Geodude", "Hippopotas"],
      Ruby: ["Geodude", "Hippopotas"],
      Sapphire: ["Geodude", "Hippopotas"],
    },
  },
  "Trophy Garden": {
    location: "Trophy Garden",
    grass: {
      rate: 10,
      slots: [
        {
          species: "Pichu",
          level: 21,
        },
        {
          species: "Roselia",
          level: 22,
        },
        {
          species: "Staravia",
          level: 22,
        },
        {
          species: "Kricketune",
          level: 23,
        },
        {
          species: "Roselia",
          level: 23,
        },
        {
          species: "Staravia",
          level: 24,
        },
        {
          species: "Pikachu",
          level: 22,
        },
        {
          species: "Pichu",
          level: 22,
        },
        {
          species: "Pikachu",
          level: 24,
        },
        {
          species: "Pichu",
          level: 22,
        },
        {
          species: "Pikachu",
          level: 24,
        },
        {
          species: "Pichu",
          level: 22,
        },
      ],
    },
    swarm: ["Pichu", "Roselia"],
    day: ["Staravia", "Staravia"],
    night: ["Kricketune", "Kricketune"],
    radar: ["Roselia", "Staravia", "Pikachu", "Pichu"],
    dualSlots: {
      Emerald: ["Pikachu", "Pichu"],
      FireRed: ["Pikachu", "Pichu"],
      LeafGreen: ["Pikachu", "Pichu"],
      Ruby: ["Pikachu", "Pichu"],
      Sapphire: ["Pikachu", "Pichu"],
    },
  },
  "Iron Island 1F": {
    location: "Iron Island 1F",
    grass: {
      rate: 10,
      slots: [
        {
          species: "Geodude",
          level: 31,
        },
        {
          species: "Graveler",
          level: 32,
        },
        {
          species: "Zubat",
          level: 30,
        },
        {
          species: "Golbat",
          level: 32,
        },
        {
          species: "Geodude",
          level: 32,
        },
        {
          species: "Graveler",
          level: 33,
        },
        {
          species: "Onix",
          level: 31,
        },
        {
          species: "Onix",
          level: 33,
        },
        {
          species: "Geodude",
          level: 30,
        },
        {
          species: "Graveler",
          level: 31,
        },
        {
          species: "Geodude",
          level: 30,
        },
        {
          species: "Graveler",
          level: 31,
        },
      ],
    },
    swarm: ["Geodude", "Graveler"],
    day: ["Zubat", "Golbat"],
    night: ["Zubat", "Golbat"],
    radar: ["Geodude", "Graveler", "Geodude", "Graveler"],
    dualSlots: {
      Emerald: ["Geodude", "Graveler"],
      FireRed: ["Geodude", "Graveler"],
      LeafGreen: ["Geodude", "Graveler"],
      Ruby: ["Geodude", "Graveler"],
      Sapphire: ["Geodude", "Graveler"],
    },
  },
  "Iron Island B1F 1": {
    location: "Iron Island B1F 1",
    grass: {
      rate: 10,
      slots: [
        {
          species: "Graveler",
          level: 31,
        },
        {
          species: "Graveler",
          level: 32,
        },
        {
          species: "Golbat",
          level: 30,
        },
        {
          species: "Golbat",
          level: 32,
        },
        {
          species: "Graveler",
          level: 32,
        },
        {
          species: "Graveler",
          level: 33,
        },
        {
          species: "Onix",
          level: 31,
        },
        {
          species: "Onix",
          level: 33,
        },
        {
          species: "Graveler",
          level: 30,
        },
        {
          species: "Graveler",
          level: 31,
        },
        {
          species: "Graveler",
          level: 30,
        },
        {
          species: "Graveler",
          level: 31,
        },
      ],
    },
    swarm: ["Graveler", "Graveler"],
    day: ["Golbat", "Golbat"],
    night: ["Golbat", "Golbat"],
    radar: ["Graveler", "Graveler", "Graveler", "Graveler"],
    dualSlots: {
      Emerald: ["Graveler", "Graveler"],
      FireRed: ["Graveler", "Graveler"],
      LeafGreen: ["Graveler", "Graveler"],
      Ruby: ["Mawile", "Mawile"],
      Sapphire: ["Sableye", "Sableye"],
    },
  },
  "Iron Island B1F 2": {
    location: "Iron Island B1F 2",
    grass: {
      rate: 10,
      slots: [
        {
          species: "Graveler",
          level: 31,
        },
        {
          species: "Graveler",
          level: 32,
        },
        {
          species: "Golbat",
          level: 30,
        },
        {
          species: "Golbat",
          level: 32,
        },
        {
          species: "Graveler",
          level: 32,
        },
        {
          species: "Graveler",
          level: 33,
        },
        {
          species: "Onix",
          level: 31,
        },
        {
          species: "Onix",
          level: 33,
        },
        {
          species: "Graveler",
          level: 30,
        },
        {
          species: "Graveler",
          level: 31,
        },
        {
          species: "Graveler",
          level: 30,
        },
        {
          species: "Graveler",
          level: 31,
        },
      ],
    },
    swarm: ["Graveler", "Graveler"],
    day: ["Golbat", "Golbat"],
    night: ["Golbat", "Golbat"],
    radar: ["Graveler", "Graveler", "Graveler", "Graveler"],
    dualSlots: {
      Emerald: ["Graveler", "Graveler"],
      FireRed: ["Graveler", "Graveler"],
      LeafGreen: ["Graveler", "Graveler"],
      Ruby: ["Mawile", "Mawile"],
      Sapphire: ["Sableye", "Sableye"],
    },
  },
  "Iron Island B2F 1": {
    location: "Iron Island B2F 1",
    grass: {
      rate: 10,
      slots: [
        {
          species: "Onix",
          level: 32,
        },
        {
          species: "Graveler",
          level: 33,
        },
        {
          species: "Golbat",
          level: 31,
        },
        {
          species: "Golbat",
          level: 33,
        },
        {
          species: "Graveler",
          level: 33,
        },
        {
          species: "Graveler",
          level: 34,
        },
        {
          species: "Steelix",
          level: 33,
        },
        {
          species: "Steelix",
          level: 35,
        },
        {
          species: "Graveler",
          level: 31,
        },
        {
          species: "Graveler",
          level: 32,
        },
        {
          species: "Graveler",
          level: 31,
        },
        {
          species: "Graveler",
          level: 32,
        },
      ],
    },
    swarm: ["Onix", "Graveler"],
    day: ["Golbat", "Golbat"],
    night: ["Golbat", "Golbat"],
    radar: ["Graveler", "Graveler", "Graveler", "Graveler"],
    dualSlots: {
      Emerald: ["Graveler", "Graveler"],
      FireRed: ["Graveler", "Graveler"],
      LeafGreen: ["Graveler", "Graveler"],
      Ruby: ["Mawile", "Mawile"],
      Sapphire: ["Sableye", "Sableye"],
    },
  },
  "Iron Island B2F 2": {
    location: "Iron Island B2F 2",
    grass: {
      rate: 10,
      slots: [
        {
          species: "Onix",
          level: 32,
        },
        {
          species: "Graveler",
          level: 33,
        },
        {
          species: "Golbat",
          level: 31,
        },
        {
          species: "Golbat",
          level: 33,
        },
        {
          species: "Graveler",
          level: 33,
        },
        {
          species: "Graveler",
          level: 34,
        },
        {
          species: "Steelix",
          level: 33,
        },
        {
          species: "Steelix",
          level: 35,
        },
        {
          species: "Graveler",
          level: 31,
        },
        {
          species: "Graveler",
          level: 32,
        },
        {
          species: "Graveler",
          level: 31,
        },
        {
          species: "Graveler",
          level: 32,
        },
      ],
    },
    swarm: ["Onix", "Graveler"],
    day: ["Golbat", "Golbat"],
    night: ["Golbat", "Golbat"],
    radar: ["Graveler", "Graveler", "Graveler", "Graveler"],
    dualSlots: {
      Emerald: ["Graveler", "Graveler"],
      FireRed: ["Graveler", "Graveler"],
      LeafGreen: ["Graveler", "Graveler"],
      Ruby: ["Mawile", "Mawile"],
      Sapphire: ["Sableye", "Sableye"],
    },
  },
  "Iron Island B3F 1": {
    location: "Iron Island B3F 1",
    grass: {
      rate: 10,
      slots: [
        {
          species: "Steelix",
          level: 32,
        },
        {
          species: "Graveler",
          level: 33,
        },
        {
          species: "Golbat",
          level: 31,
        },
        {
          species: "Golbat",
          level: 33,
        },
        {
          species: "Graveler",
          level: 33,
        },
        {
          species: "Graveler",
          level: 34,
        },
        {
          species: "Steelix",
          level: 33,
        },
        {
          species: "Steelix",
          level: 35,
        },
        {
          species: "Graveler",
          level: 31,
        },
        {
          species: "Graveler",
          level: 32,
        },
        {
          species: "Graveler",
          level: 31,
        },
        {
          species: "Graveler",
          level: 32,
        },
      ],
    },
    swarm: ["Onix", "Graveler"],
    day: ["Golbat", "Golbat"],
    night: ["Golbat", "Golbat"],
    radar: ["Graveler", "Graveler", "Graveler", "Graveler"],
    dualSlots: {
      Emerald: ["Graveler", "Graveler"],
      FireRed: ["Graveler", "Graveler"],
      LeafGreen: ["Graveler", "Graveler"],
      Ruby: ["Mawile", "Mawile"],
      Sapphire: ["Sableye", "Sableye"],
    },
  },
  "Old Chateau": {
    location: "Old Chateau",
    grass: {
      rate: 10,
      slots: [
        {
          species: "Gastly",
          level: 14,
        },
        {
          species: "Gastly",
          level: 15,
        },
        {
          species: "Gastly",
          level: 14,
        },
        {
          species: "Gastly",
          level: 15,
        },
        {
          species: "Gastly",
          level: 16,
        },
        {
          species: "Gastly",
          level: 17,
        },
        {
          species: "Gastly",
          level: 16,
        },
        {
          species: "Gastly",
          level: 17,
        },
        {
          species: "Gastly",
          level: 17,
        },
        {
          species: "Gastly",
          level: 17,
        },
        {
          species: "Gastly",
          level: 17,
        },
        {
          species: "Gastly",
          level: 17,
        },
      ],
    },
    swarm: ["Gastly", "Gastly"],
    day: ["Gastly", "Gastly"],
    night: ["Gastly", "Gastly"],
    radar: ["Gastly", "Gastly", "Gastly", "Gastly"],
    dualSlots: {
      Emerald: ["Gastly", "Gastly"],
      FireRed: ["Gastly", "Gastly"],
      LeafGreen: ["Gastly", "Gastly"],
      Ruby: ["Gastly", "Gastly"],
      Sapphire: ["Gastly", "Gastly"],
    },
  },
  "Old Chateau 2F (Eye Room)": {
    location: "Old Chateau 2F (Eye Room)",
    grass: {
      rate: 10,
      slots: [
        {
          species: "Gastly",
          level: 14,
        },
        {
          species: "Gastly",
          level: 15,
        },
        {
          species: "Gastly",
          level: 14,
        },
        {
          species: "Gastly",
          level: 15,
        },
        {
          species: "Gastly",
          level: 16,
        },
        {
          species: "Gastly",
          level: 17,
        },
        {
          species: "Gastly",
          level: 16,
        },
        {
          species: "Gastly",
          level: 17,
        },
        {
          species: "Gastly",
          level: 17,
        },
        {
          species: "Gastly",
          level: 17,
        },
        {
          species: "Gastly",
          level: 17,
        },
        {
          species: "Gastly",
          level: 17,
        },
      ],
    },
    swarm: ["Gastly", "Gastly"],
    day: ["Gastly", "Gastly"],
    night: ["Gastly", "Gastly"],
    radar: ["Gastly", "Gastly", "Gastly", "Gastly"],
    dualSlots: {
      Emerald: ["Gengar", "Gastly"],
      FireRed: ["Gengar", "Gastly"],
      LeafGreen: ["Gengar", "Gastly"],
      Ruby: ["Gengar", "Gastly"],
      Sapphire: ["Gengar", "Gastly"],
    },
  },
  "Lake Verity (Pre Team Galactic Event)": {
    location: "Lake Verity (Pre Team Galactic Event)",
    grass: {
      rate: 30,
      slots: [
        {
          species: "Starly",
          level: 2,
        },
        {
          species: "Bidoof",
          level: 2,
        },
        {
          species: "Starly",
          level: 3,
        },
        {
          species: "Bidoof",
          level: 3,
        },
        {
          species: "Starly",
          level: 3,
        },
        {
          species: "Bidoof",
          level: 3,
        },
        {
          species: "Starly",
          level: 4,
        },
        {
          species: "Bidoof",
          level: 4,
        },
        {
          species: "Starly",
          level: 4,
        },
        {
          species: "Bidoof",
          level: 4,
        },
        {
          species: "Starly",
          level: 4,
        },
        {
          species: "Bidoof",
          level: 4,
        },
      ],
    },
    swarm: ["Starly", "Bidoof"],
    day: ["Starly", "Bidoof"],
    night: ["Bidoof", "Bidoof"],
    radar: ["Wobbuffet", "Wobbuffet", "Wobbuffet", "Wobbuffet"],
    dualSlots: {
      Emerald: ["Starly", "Bidoof"],
      FireRed: ["Starly", "Bidoof"],
      LeafGreen: ["Starly", "Bidoof"],
      Ruby: ["Solrock", "Solrock"],
      Sapphire: ["Lunatone", "Lunatone"],
    },
  },
  "Lake Verity (Post Team Galactic Event)": {
    location: "Lake Verity (Post Team Galactic Event)",
    grass: {
      rate: 30,
      slots: [
        {
          species: "Starly",
          level: 2,
        },
        {
          species: "Bidoof",
          level: 2,
        },
        {
          species: "Starly",
          level: 3,
        },
        {
          species: "Bidoof",
          level: 3,
        },
        {
          species: "Starly",
          level: 3,
        },
        {
          species: "Bidoof",
          level: 3,
        },
        {
          species: "Starly",
          level: 4,
        },
        {
          species: "Bidoof",
          level: 4,
        },
        {
          species: "Starly",
          level: 4,
        },
        {
          species: "Bidoof",
          level: 4,
        },
        {
          species: "Starly",
          level: 4,
        },
        {
          species: "Bidoof",
          level: 4,
        },
      ],
    },
    swarm: ["Starly", "Bidoof"],
    day: ["Starly", "Bidoof"],
    night: ["Starly", "Bidoof"],
    radar: ["Wobbuffet", "Wobbuffet", "Wobbuffet", "Wobbuffet"],
    dualSlots: {
      Emerald: ["Starly", "Bidoof"],
      FireRed: ["Starly", "Bidoof"],
      LeafGreen: ["Starly", "Bidoof"],
      Ruby: ["Solrock", "Solrock"],
      Sapphire: ["Lunatone", "Lunatone"],
    },
  },
  "Lake Valor": {
    location: "Lake Valor",
    grass: {
      rate: 30,
      slots: [
        {
          species: "Staravia",
          level: 38,
        },
        {
          species: "Bibarel",
          level: 39,
        },
        {
          species: "Staravia",
          level: 40,
        },
        {
          species: "Bibarel",
          level: 41,
        },
        {
          species: "Golduck",
          level: 40,
        },
        {
          species: "Psyduck",
          level: 38,
        },
        {
          species: "Golduck",
          level: 41,
        },
        {
          species: "Psyduck",
          level: 39,
        },
        {
          species: "Staravia",
          level: 40,
        },
        {
          species: "Bibarel",
          level: 41,
        },
        {
          species: "Staravia",
          level: 40,
        },
        {
          species: "Bibarel",
          level: 41,
        },
      ],
    },
    swarm: ["Staravia", "Bibarel"],
    day: ["Staravia", "Bibarel"],
    night: ["Staravia", "Bibarel"],
    radar: ["Wobbuffet", "Wobbuffet", "Wobbuffet", "Wobbuffet"],
    dualSlots: {
      Emerald: ["Staravia", "Bibarel"],
      FireRed: ["Staravia", "Bibarel"],
      LeafGreen: ["Staravia", "Bibarel"],
      Ruby: ["Solrock", "Solrock"],
      Sapphire: ["Lunatone", "Lunatone"],
    },
  },
  "Lake Acuity": {
    location: "Lake Acuity",
    grass: {
      rate: 30,
      slots: [
        {
          species: "Snover",
          level: 38,
        },
        {
          species: "Bibarel",
          level: 39,
        },
        {
          species: "Snover",
          level: 39,
        },
        {
          species: "Snover",
          level: 40,
        },
        {
          species: "Golduck",
          level: 40,
        },
        {
          species: "Sneasel",
          level: 41,
        },
        {
          species: "Golduck",
          level: 39,
        },
        {
          species: "Psyduck",
          level: 38,
        },
        {
          species: "Snover",
          level: 41,
        },
        {
          species: "Bibarel",
          level: 40,
        },
        {
          species: "Snover",
          level: 41,
        },
        {
          species: "Bibarel",
          level: 40,
        },
      ],
    },
    swarm: ["Snover", "Bibarel"],
    day: ["Snover", "Snover"],
    night: ["Snorunt", "Snorunt"],
    radar: ["Golduck", "Sneasel", "Snover", "Bibarel"],
    dualSlots: {
      Emerald: ["Teddiursa", "Teddiursa"],
      FireRed: ["Snover", "Bibarel"],
      LeafGreen: ["Snover", "Bibarel"],
      Ruby: ["Solrock", "Solrock"],
      Sapphire: ["Lunatone", "Lunatone"],
    },
  },
  "Valor Lakefront": {
    location: "Valor Lakefront",
    grass: {
      rate: 30,
      slots: [
        {
          species: "Girafarig",
          level: 26,
        },
        {
          species: "Bibarel",
          level: 25,
        },
        {
          species: "Staravia",
          level: 26,
        },
        {
          species: "Kricketune",
          level: 27,
        },
        {
          species: "Staravia",
          level: 27,
        },
        {
          species: "Houndour",
          level: 28,
        },
        {
          species: "Staravia",
          level: 28,
        },
        {
          species: "Bibarel",
          level: 26,
        },
        {
          species: "Girafarig",
          level: 28,
        },
        {
          species: "Bibarel",
          level: 27,
        },
        {
          species: "Girafarig",
          level: 28,
        },
        {
          species: "Bibarel",
          level: 27,
        },
      ],
    },
    swarm: ["Girafarig", "Bibarel"],
    day: ["Staravia", "Staravia"],
    night: ["Kricketune", "Houndour"],
    radar: ["Nidorino", "Nidorina", "Nidorino", "Nidorina"],
    dualSlots: {
      Emerald: ["Girafarig", "Bibarel"],
      FireRed: ["Girafarig", "Bibarel"],
      LeafGreen: ["Girafarig", "Bibarel"],
      Ruby: ["Girafarig", "Bibarel"],
      Sapphire: ["Girafarig", "Bibarel"],
    },
  },
  "Acuity Lakefront": {
    location: "Acuity Lakefront",
    grass: {
      rate: 30,
      slots: [
        {
          species: "Snover",
          level: 33,
        },
        {
          species: "Swinub",
          level: 32,
        },
        {
          species: "Sneasel",
          level: 33,
        },
        {
          species: "Snover",
          level: 32,
        },
        {
          species: "Sneasel",
          level: 35,
        },
        {
          species: "Swinub",
          level: 34,
        },
        {
          species: "Snover",
          level: 34,
        },
        {
          species: "Swinub",
          level: 32,
        },
        {
          species: "Sneasel",
          level: 35,
        },
        {
          species: "Snover",
          level: 35,
        },
        {
          species: "Sneasel",
          level: 35,
        },
        {
          species: "Snover",
          level: 35,
        },
      ],
    },
    swarm: ["Snover", "Swinub"],
    day: ["Sneasel", "Snover"],
    night: ["Snorunt", "Snorunt"],
    radar: ["Sneasel", "Swinub", "Sneasel", "Snover"],
    dualSlots: {
      Emerald: ["Ursaring", "Ursaring"],
      FireRed: ["Sneasel", "Snover"],
      LeafGreen: ["Sneasel", "Snover"],
      Ruby: ["Sneasel", "Snover"],
      Sapphire: ["Sneasel", "Snover"],
    },
  },
  "Route 201": {
    location: "Route 201",
    grass: {
      rate: 30,
      slots: [
        {
          species: "Starly",
          level: 2,
        },
        {
          species: "Bidoof",
          level: 2,
        },
        {
          species: "Starly",
          level: 3,
        },
        {
          species: "Kricketot",
          level: 3,
        },
        {
          species: "Starly",
          level: 3,
        },
        {
          species: "Bidoof",
          level: 3,
        },
        {
          species: "Starly",
          level: 3,
        },
        {
          species: "Bidoof",
          level: 3,
        },
        {
          species: "Starly",
          level: 2,
        },
        {
          species: "Bidoof",
          level: 2,
        },
        {
          species: "Starly",
          level: 2,
        },
        {
          species: "Bidoof",
          level: 2,
        },
      ],
    },
    swarm: ["Doduo", "Doduo"],
    day: ["Starly", "Bidoof"],
    night: ["Kricketot", "Bidoof"],
    radar: ["NidoranM", "NidoranF", "NidoranM", "NidoranF"],
    dualSlots: {
      Emerald: ["Starly", "Bidoof"],
      FireRed: ["Growlithe", "Growlithe"],
      LeafGreen: ["Starly", "Bidoof"],
      Ruby: ["Starly", "Bidoof"],
      Sapphire: ["Starly", "Bidoof"],
    },
  },
  "Route 202": {
    location: "Route 202",
    grass: {
      rate: 30,
      slots: [
        {
          species: "Shinx",
          level: 3,
        },
        {
          species: "Bidoof",
          level: 3,
        },
        {
          species: "Starly",
          level: 4,
        },
        {
          species: "Kricketot",
          level: 3,
        },
        {
          species: "Shinx",
          level: 4,
        },
        {
          species: "Bidoof",
          level: 3,
        },
        {
          species: "Starly",
          level: 4,
        },
        {
          species: "Bidoof",
          level: 4,
        },
        {
          species: "Starly",
          level: 2,
        },
        {
          species: "Bidoof",
          level: 2,
        },
        {
          species: "Starly",
          level: 2,
        },
        {
          species: "Bidoof",
          level: 2,
        },
      ],
    },
    swarm: ["Zigzagoon", "Zigzagoon"],
    day: ["Starly", "Bidoof"],
    night: ["Kricketot", "Bidoof"],
    radar: ["Sentret", "Sentret", "Sentret", "Sentret"],
    dualSlots: {
      Emerald: ["Starly", "Bidoof"],
      FireRed: ["Growlithe", "Growlithe"],
      LeafGreen: ["Starly", "Bidoof"],
      Ruby: ["Starly", "Bidoof"],
      Sapphire: ["Starly", "Bidoof"],
    },
  },
  "Route 203": {
    location: "Route 203",
    grass: {
      rate: 30,
      slots: [
        {
          species: "Starly",
          level: 4,
        },
        {
          species: "Shinx",
          level: 4,
        },
        {
          species: "Starly",
          level: 5,
        },
        {
          species: "Kricketot",
          level: 4,
        },
        {
          species: "Bidoof",
          level: 5,
        },
        {
          species: "Abra",
          level: 4,
        },
        {
          species: "Abra",
          level: 5,
        },
        {
          species: "Shinx",
          level: 5,
        },
        {
          species: "Starly",
          level: 6,
        },
        {
          species: "Bidoof",
          level: 6,
        },
        {
          species: "Starly",
          level: 7,
        },
        {
          species: "Bidoof",
          level: 7,
        },
      ],
    },
    swarm: ["Cubone", "Cubone"],
    day: ["Starly", "Bidoof"],
    night: ["Kricketot", "Zubat"],
    radar: ["Bidoof", "Abra", "Starly", "Bidoof"],
    dualSlots: {
      Emerald: ["Pineco", "Pineco"],
      FireRed: ["Starly", "Bidoof"],
      LeafGreen: ["Starly", "Bidoof"],
      Ruby: ["Seedot", "Seedot"],
      Sapphire: ["Lotad", "Lotad"],
    },
  },
  "Route 204 (South)": {
    location: "Route 204 (South)",
    grass: {
      rate: 30,
      slots: [
        {
          species: "Starly",
          level: 4,
        },
        {
          species: "Bidoof",
          level: 4,
        },
        {
          species: "Wurmple",
          level: 4,
        },
        {
          species: "Kricketot",
          level: 3,
        },
        {
          species: "Budew",
          level: 4,
        },
        {
          species: "Shinx",
          level: 4,
        },
        {
          species: "Budew",
          level: 5,
        },
        {
          species: "Shinx",
          level: 5,
        },
        {
          species: "Starly",
          level: 5,
        },
        {
          species: "Bidoof",
          level: 5,
        },
        {
          species: "Starly",
          level: 6,
        },
        {
          species: "Bidoof",
          level: 6,
        },
      ],
    },
    swarm: ["Starly", "Bidoof"],
    day: ["Wurmple", "Budew"],
    night: ["Kricketot", "Zubat"],
    radar: ["Budew", "Shinx", "Starly", "Bidoof"],
    dualSlots: {
      Emerald: ["Pineco", "Pineco"],
      FireRed: ["Caterpie", "Caterpie"],
      LeafGreen: ["Weedle", "Weedle"],
      Ruby: ["Seedot", "Seedot"],
      Sapphire: ["Lotad", "Lotad"],
    },
  },
  "Route 204 (North)": {
    location: "Route 204 (North)",
    grass: {
      rate: 30,
      slots: [
        {
          species: "Starly",
          level: 9,
        },
        {
          species: "Bidoof",
          level: 9,
        },
        {
          species: "Wurmple",
          level: 9,
        },
        {
          species: "Kricketot",
          level: 8,
        },
        {
          species: "Budew",
          level: 9,
        },
        {
          species: "Shinx",
          level: 9,
        },
        {
          species: "Budew",
          level: 10,
        },
        {
          species: "Shinx",
          level: 10,
        },
        {
          species: "Starly",
          level: 10,
        },
        {
          species: "Bidoof",
          level: 10,
        },
        {
          species: "Starly",
          level: 11,
        },
        {
          species: "Bidoof",
          level: 11,
        },
      ],
    },
    swarm: ["Starly", "Bidoof"],
    day: ["Wurmple", "Budew"],
    night: ["Kricketot", "Zubat"],
    radar: ["Sunkern", "Sunkern", "Sunkern", "Sunkern"],
    dualSlots: {
      Emerald: ["Pineco", "Pineco"],
      FireRed: ["Caterpie", "Caterpie"],
      LeafGreen: ["Weedle", "Weedle"],
      Ruby: ["Seedot", "Seedot"],
      Sapphire: ["Lotad", "Lotad"],
    },
  },
  "Route 205 (South)": {
    location: "Route 205 (South)",
    grass: {
      rate: 30,
      slots: [
        {
          species: "Shellos_West",
          level: 10,
        },
        {
          species: "Shellos_West",
          level: 11,
        },
        {
          species: "Buizel",
          level: 10,
        },
        {
          species: "Shellos_West",
          level: 9,
        },
        {
          species: "Bidoof",
          level: 10,
        },
        {
          species: "Shellos_West",
          level: 11,
        },
        {
          species: "Pachirisu",
          level: 9,
        },
        {
          species: "Pachirisu",
          level: 11,
        },
        {
          species: "Buizel",
          level: 11,
        },
        {
          species: "Shellos_West",
          level: 12,
        },
        {
          species: "Buizel",
          level: 11,
        },
        {
          species: "Shellos_West",
          level: 12,
        },
      ],
    },
    swarm: ["Shellos_West", "Shellos_West"],
    day: ["Buizel", "Shellos_West"],
    night: ["Buizel", "Shellos_West"],
    radar: ["Hoppip", "Hoppip", "Hoppip", "Hoppip"],
    dualSlots: {
      Emerald: ["Buizel", "Shellos_West"],
      FireRed: ["Buizel", "Shellos_West"],
      LeafGreen: ["Buizel", "Shellos_West"],
      Ruby: ["Buizel", "Shellos_West"],
      Sapphire: ["Buizel", "Shellos_West"],
    },
  },
  "Route 205 (North)": {
    location: "Route 205 (North)",
    grass: {
      rate: 30,
      slots: [
        {
          species: "Bidoof",
          level: 12,
        },
        {
          species: "Budew",
          level: 12,
        },
        {
          species: "Wurmple",
          level: 13,
        },
        {
          species: "Kricketot",
          level: 12,
        },
        {
          species: "Silcoon",
          level: 14,
        },
        {
          species: "Cascoon",
          level: 14,
        },
        {
          species: "Bidoof",
          level: 13,
        },
        {
          species: "Bidoof",
          level: 14,
        },
        {
          species: "Budew",
          level: 13,
        },
        {
          species: "Budew",
          level: 14,
        },
        {
          species: "Beautifly",
          level: 15,
        },
        {
          species: "Dustox",
          level: 15,
        },
      ],
    },
    swarm: ["Bidoof", "Budew"],
    day: ["Wurmple", "Budew"],
    night: ["Kricketot", "Hoothoot"],
    radar: ["Slowpoke", "Slowpoke", "Slowpoke", "Slowpoke"],
    dualSlots: {
      Emerald: ["Budew", "Budew"],
      FireRed: ["Budew", "Budew"],
      LeafGreen: ["Budew", "Budew"],
      Ruby: ["Budew", "Budew"],
      Sapphire: ["Lotad", "Lotad"],
    },
  },
  "Route 206": {
    location: "Route 206",
    grass: {
      rate: 30,
      slots: [
        {
          species: "Ponyta",
          level: 16,
        },
        {
          species: "Geodude",
          level: 16,
        },
        {
          species: "Gligar",
          level: 18,
        },
        {
          species: "Kricketune",
          level: 17,
        },
        {
          species: "Gligar",
          level: 16,
        },
        {
          species: "Machop",
          level: 17,
        },
        {
          species: "Machop",
          level: 18,
        },
        {
          species: "Geodude",
          level: 18,
        },
        {
          species: "Machop",
          level: 19,
        },
        {
          species: "Geodude",
          level: 18,
        },
        {
          species: "Machop",
          level: 19,
        },
        {
          species: "Geodude",
          level: 18,
        },
      ],
    },
    swarm: ["Larvitar", "Larvitar"],
    day: ["Gligar", "Ponyta"],
    night: ["Kricketune", "Zubat"],
    radar: ["Baltoy", "Baltoy", "Baltoy", "Baltoy"],
    dualSlots: {
      Emerald: ["Machop", "Geodude"],
      FireRed: ["Machop", "Geodude"],
      LeafGreen: ["Machop", "Geodude"],
      Ruby: ["Machop", "Geodude"],
      Sapphire: ["Machop", "Geodude"],
    },
  },
  "Route 207": {
    location: "Route 207",
    grass: {
      rate: 30,
      slots: [
        {
          species: "Machop",
          level: 7,
        },
        {
          species: "Geodude",
          level: 5,
        },
        {
          species: "Ponyta",
          level: 6,
        },
        {
          species: "Kricketot",
          level: 5,
        },
        {
          species: "Ponyta",
          level: 5,
        },
        {
          species: "Machop",
          level: 6,
        },
        {
          species: "Machop",
          level: 8,
        },
        {
          species: "Geodude",
          level: 6,
        },
        {
          species: "Ponyta",
          level: 7,
        },
        {
          species: "Geodude",
          level: 7,
        },
        {
          species: "Ponyta",
          level: 7,
        },
        {
          species: "Geodude",
          level: 7,
        },
      ],
    },
    swarm: ["Phanpy", "Phanpy"],
    day: ["Ponyta", "Machop"],
    night: ["Kricketot", "Zubat"],
    radar: ["Stantler", "Stantler", "Stantler", "Stantler"],
    dualSlots: {
      Emerald: ["Ponyta", "Geodude"],
      FireRed: ["Ponyta", "Geodude"],
      LeafGreen: ["Ponyta", "Geodude"],
      Ruby: ["Ponyta", "Geodude"],
      Sapphire: ["Ponyta", "Geodude"],
    },
  },
  "Route 208": {
    location: "Route 208",
    grass: {
      rate: 30,
      slots: [
        {
          species: "Budew",
          level: 18,
        },
        {
          species: "Bidoof",
          level: 18,
        },
        {
          species: "Budew",
          level: 19,
        },
        {
          species: "Ralts",
          level: 17,
        },
        {
          species: "Roselia",
          level: 19,
        },
        {
          species: "Bibarel",
          level: 18,
        },
        {
          species: "Ralts",
          level: 18,
        },
        {
          species: "Bibarel",
          level: 19,
        },
        {
          species: "Roselia",
          level: 20,
        },
        {
          species: "Bibarel",
          level: 20,
        },
        {
          species: "Roselia",
          level: 20,
        },
        {
          species: "Bibarel",
          level: 20,
        },
      ],
    },
    swarm: ["Dunsparce", "Dunsparce"],
    day: ["Budew", "Ralts"],
    night: ["Zubat", "Ralts"],
    radar: ["Smeargle", "Smeargle", "Smeargle", "Smeargle"],
    dualSlots: {
      Emerald: ["Roselia", "Bibarel"],
      FireRed: ["Roselia", "Bibarel"],
      LeafGreen: ["Roselia", "Bibarel"],
      Ruby: ["Zangoose", "Zangoose"],
      Sapphire: ["Seviper", "Seviper"],
    },
  },
  "Route 209": {
    location: "Route 209",
    grass: {
      rate: 30,
      slots: [
        {
          species: "Roselia",
          level: 19,
        },
        {
          species: "Bibarel",
          level: 18,
        },
        {
          species: "Staravia",
          level: 19,
        },
        {
          species: "Ralts",
          level: 17,
        },
        {
          species: "Staravia",
          level: 18,
        },
        {
          species: "Bibarel",
          level: 19,
        },
        {
          species: "Ralts",
          level: 18,
        },
        {
          species: "Roselia",
          level: 20,
        },
        {
          species: "Ralts",
          level: 19,
        },
        {
          species: "Chansey",
          level: 17,
        },
        {
          species: "Ralts",
          level: 19,
        },
        {
          species: "Chansey",
          level: 19,
        },
      ],
    },
    swarm: ["Snubbull", "Snubbull"],
    day: ["Staravia", "Ralts"],
    night: ["Zubat", "Duskull"],
    radar: ["Kirlia", "Kirlia", "Kirlia", "Kirlia"],
    dualSlots: {
      Emerald: ["Ralts", "Chansey"],
      FireRed: ["Ralts", "Chansey"],
      LeafGreen: ["Vulpix", "Vulpix"],
      Ruby: ["Ralts", "Chansey"],
      Sapphire: ["Ralts", "Chansey"],
    },
  },
  "Lost Tower 1F": {
    location: "Lost Tower 1F",
    grass: {
      rate: 10,
      slots: [
        {
          species: "Gastly",
          level: 18,
        },
        {
          species: "Zubat",
          level: 17,
        },
        {
          species: "Gastly",
          level: 19,
        },
        {
          species: "Gastly",
          level: 17,
        },
        {
          species: "Zubat",
          level: 18,
        },
        {
          species: "Gastly",
          level: 17,
        },
        {
          species: "Zubat",
          level: 19,
        },
        {
          species: "Gastly",
          level: 20,
        },
        {
          species: "Gastly",
          level: 20,
        },
        {
          species: "Gastly",
          level: 20,
        },
        {
          species: "Gastly",
          level: 20,
        },
        {
          species: "Gastly",
          level: 20,
        },
      ],
    },
    swarm: ["Gastly", "Zubat"],
    day: ["Gastly", "Gastly"],
    night: ["Duskull", "Duskull"],
    radar: ["Zubat", "Gastly", "Gastly", "Gastly"],
    dualSlots: {
      Emerald: ["Gastly", "Gastly"],
      FireRed: ["Gastly", "Gastly"],
      LeafGreen: ["Gastly", "Gastly"],
      Ruby: ["Gastly", "Gastly"],
      Sapphire: ["Gastly", "Gastly"],
    },
  },
  "Lost Tower 2F": {
    location: "Lost Tower 2F",
    grass: {
      rate: 10,
      slots: [
        {
          species: "Gastly",
          level: 18,
        },
        {
          species: "Zubat",
          level: 17,
        },
        {
          species: "Gastly",
          level: 19,
        },
        {
          species: "Gastly",
          level: 17,
        },
        {
          species: "Zubat",
          level: 18,
        },
        {
          species: "Gastly",
          level: 17,
        },
        {
          species: "Zubat",
          level: 19,
        },
        {
          species: "Gastly",
          level: 20,
        },
        {
          species: "Gastly",
          level: 20,
        },
        {
          species: "Gastly",
          level: 20,
        },
        {
          species: "Gastly",
          level: 20,
        },
        {
          species: "Gastly",
          level: 20,
        },
      ],
    },
    swarm: ["Gastly", "Zubat"],
    day: ["Gastly", "Gastly"],
    night: ["Duskull", "Duskull"],
    radar: ["Zubat", "Gastly", "Gastly", "Gastly"],
    dualSlots: {
      Emerald: ["Gastly", "Gastly"],
      FireRed: ["Gastly", "Gastly"],
      LeafGreen: ["Gastly", "Gastly"],
      Ruby: ["Gastly", "Gastly"],
      Sapphire: ["Gastly", "Gastly"],
    },
  },
  "Lost Tower 3F": {
    location: "Lost Tower 3F",
    grass: {
      rate: 10,
      slots: [
        {
          species: "Gastly",
          level: 19,
        },
        {
          species: "Zubat",
          level: 18,
        },
        {
          species: "Gastly",
          level: 20,
        },
        {
          species: "Gastly",
          level: 18,
        },
        {
          species: "Zubat",
          level: 19,
        },
        {
          species: "Gastly",
          level: 18,
        },
        {
          species: "Zubat",
          level: 20,
        },
        {
          species: "Gastly",
          level: 21,
        },
        {
          species: "Gastly",
          level: 21,
        },
        {
          species: "Gastly",
          level: 21,
        },
        {
          species: "Gastly",
          level: 21,
        },
        {
          species: "Golbat",
          level: 21,
        },
      ],
    },
    swarm: ["Gastly", "Zubat"],
    day: ["Gastly", "Gastly"],
    night: ["Duskull", "Duskull"],
    radar: ["Zubat", "Gastly", "Gastly", "Gastly"],
    dualSlots: {
      Emerald: ["Gastly", "Gastly"],
      FireRed: ["Gastly", "Gastly"],
      LeafGreen: ["Gastly", "Gastly"],
      Ruby: ["Gastly", "Gastly"],
      Sapphire: ["Gastly", "Gastly"],
    },
  },
  "Lost Tower 4F": {
    location: "Lost Tower 4F",
    grass: {
      rate: 10,
      slots: [
        {
          species: "Gastly",
          level: 19,
        },
        {
          species: "Zubat",
          level: 18,
        },
        {
          species: "Gastly",
          level: 20,
        },
        {
          species: "Gastly",
          level: 18,
        },
        {
          species: "Zubat",
          level: 19,
        },
        {
          species: "Gastly",
          level: 18,
        },
        {
          species: "Zubat",
          level: 20,
        },
        {
          species: "Gastly",
          level: 21,
        },
        {
          species: "Gastly",
          level: 21,
        },
        {
          species: "Golbat",
          level: 21,
        },
        {
          species: "Gastly",
          level: 21,
        },
        {
          species: "Golbat",
          level: 21,
        },
      ],
    },
    swarm: ["Gastly", "Zubat"],
    day: ["Gastly", "Gastly"],
    night: ["Duskull", "Duskull"],
    radar: ["Zubat", "Gastly", "Gastly", "Gastly"],
    dualSlots: {
      Emerald: ["Gastly", "Gastly"],
      FireRed: ["Gastly", "Gastly"],
      LeafGreen: ["Gastly", "Gastly"],
      Ruby: ["Gastly", "Gastly"],
      Sapphire: ["Gastly", "Gastly"],
    },
  },
  "Lost Tower 5F": {
    location: "Lost Tower 5F",
    grass: {
      rate: 10,
      slots: [
        {
          species: "Gastly",
          level: 20,
        },
        {
          species: "Zubat",
          level: 19,
        },
        {
          species: "Gastly",
          level: 21,
        },
        {
          species: "Gastly",
          level: 19,
        },
        {
          species: "Zubat",
          level: 20,
        },
        {
          species: "Gastly",
          level: 19,
        },
        {
          species: "Zubat",
          level: 21,
        },
        {
          species: "Golbat",
          level: 22,
        },
        {
          species: "Gastly",
          level: 22,
        },
        {
          species: "Golbat",
          level: 22,
        },
        {
          species: "Gastly",
          level: 22,
        },
        {
          species: "Golbat",
          level: 22,
        },
      ],
    },
    swarm: ["Gastly", "Zubat"],
    day: ["Gastly", "Gastly"],
    night: ["Duskull", "Duskull"],
    radar: ["Zubat", "Gastly", "Gastly", "Gastly"],
    dualSlots: {
      Emerald: ["Gastly", "Gastly"],
      FireRed: ["Gastly", "Gastly"],
      LeafGreen: ["Gastly", "Gastly"],
      Ruby: ["Gastly", "Gastly"],
      Sapphire: ["Gastly", "Gastly"],
    },
  },
  "Route 210 (South)": {
    location: "Route 210 (South)",
    grass: {
      rate: 30,
      slots: [
        {
          species: "Staravia",
          level: 19,
        },
        {
          species: "Geodude",
          level: 18,
        },
        {
          species: "Scyther",
          level: 21,
        },
        {
          species: "Ponyta",
          level: 20,
        },
        {
          species: "Roselia",
          level: 20,
        },
        {
          species: "Ponyta",
          level: 19,
        },
        {
          species: "Scyther",
          level: 19,
        },
        {
          species: "Roselia",
          level: 21,
        },
        {
          species: "Ponyta",
          level: 21,
        },
        {
          species: "Chansey",
          level: 19,
        },
        {
          species: "Ponyta",
          level: 21,
        },
        {
          species: "Chansey",
          level: 21,
        },
      ],
    },
    swarm: ["Staravia", "Geodude"],
    day: ["Ponyta", "Ponyta"],
    night: ["Noctowl", "Hoothoot"],
    radar: ["Miltank", "Tauros", "Miltank", "Tauros"],
    dualSlots: {
      Emerald: ["Pineco", "Pineco"],
      FireRed: ["Ponyta", "Chansey"],
      LeafGreen: ["Ponyta", "Chansey"],
      Ruby: ["Seedot", "Nuzleaf"],
      Sapphire: ["Ponyta", "Chansey"],
    },
  },
  "Route 210 (North)": {
    location: "Route 210 (North)",
    grass: {
      rate: 30,
      slots: [
        {
          species: "Swablu",
          level: 27,
        },
        {
          species: "Bibarel",
          level: 28,
        },
        {
          species: "Scyther",
          level: 27,
        },
        {
          species: "Meditite",
          level: 27,
        },
        {
          species: "Meditite",
          level: 29,
        },
        {
          species: "Machop",
          level: 28,
        },
        {
          species: "Scyther",
          level: 29,
        },
        {
          species: "Machoke",
          level: 29,
        },
        {
          species: "Machop",
          level: 29,
        },
        {
          species: "Machoke",
          level: 30,
        },
        {
          species: "Machop",
          level: 29,
        },
        {
          species: "Machoke",
          level: 30,
        },
      ],
    },
    swarm: ["Swablu", "Bibarel"],
    day: ["Swablu", "Meditite"],
    night: ["Noctowl", "Hoothoot"],
    radar: ["Bagon", "Bagon", "Bagon", "Bagon"],
    dualSlots: {
      Emerald: ["Machop", "Machoke"],
      FireRed: ["Machop", "Machoke"],
      LeafGreen: ["Machop", "Machoke"],
      Ruby: ["Zangoose", "Zangoose"],
      Sapphire: ["Seviper", "Seviper"],
    },
  },
  "Route 211 (West)": {
    location: "Route 211 (West)",
    grass: {
      rate: 30,
      slots: [
        {
          species: "Meditite",
          level: 13,
        },
        {
          species: "Bidoof",
          level: 14,
        },
        {
          species: "Meditite",
          level: 14,
        },
        {
          species: "Meditite",
          level: 15,
        },
        {
          species: "Chingling",
          level: 14,
        },
        {
          species: "Machop",
          level: 14,
        },
        {
          species: "Chingling",
          level: 16,
        },
        {
          species: "Bronzor",
          level: 14,
        },
        {
          species: "Machop",
          level: 15,
        },
        {
          species: "Bronzor",
          level: 16,
        },
        {
          species: "Machop",
          level: 15,
        },
        {
          species: "Bronzor",
          level: 16,
        },
      ],
    },
    swarm: ["Meditite", "Bidoof"],
    day: ["Meditite", "Meditite"],
    night: ["Zubat", "Hoothoot"],
    radar: ["Tyrogue", "Tyrogue", "Tyrogue", "Tyrogue"],
    dualSlots: {
      Emerald: ["Teddiursa", "Teddiursa"],
      FireRed: ["Machop", "Bronzor"],
      LeafGreen: ["Machop", "Bronzor"],
      Ruby: ["Machop", "Bronzor"],
      Sapphire: ["Machop", "Bronzor"],
    },
  },
  "Route 211 (East)": {
    location: "Route 211 (East)",
    grass: {
      rate: 30,
      slots: [
        {
          species: "Meditite",
          level: 27,
        },
        {
          species: "Graveler",
          level: 28,
        },
        {
          species: "Meditite",
          level: 28,
        },
        {
          species: "Meditite",
          level: 29,
        },
        {
          species: "Chingling",
          level: 28,
        },
        {
          species: "Machoke",
          level: 29,
        },
        {
          species: "Chingling",
          level: 30,
        },
        {
          species: "Bronzor",
          level: 29,
        },
        {
          species: "Machoke",
          level: 30,
        },
        {
          species: "Bronzor",
          level: 29,
        },
        {
          species: "Machoke",
          level: 30,
        },
        {
          species: "Bronzor",
          level: 29,
        },
      ],
    },
    swarm: ["Meditite", "Graveler"],
    day: ["Meditite", "Meditite"],
    night: ["Zubat", "Noctowl"],
    radar: ["Chingling", "Machoke", "Machoke", "Bronzor"],
    dualSlots: {
      Emerald: ["Machoke", "Bronzor"],
      FireRed: ["Machoke", "Bronzor"],
      LeafGreen: ["Machoke", "Bronzor"],
      Ruby: ["Machoke", "Bronzor"],
      Sapphire: ["Machoke", "Bronzor"],
    },
  },
  "Route 212 (North)": {
    location: "Route 212 (North)",
    grass: {
      rate: 30,
      slots: [
        {
          species: "Roselia",
          level: 23,
        },
        {
          species: "Marill",
          level: 21,
        },
        {
          species: "Staravia",
          level: 23,
        },
        {
          species: "Kirlia",
          level: 22,
        },
        {
          species: "Roselia",
          level: 22,
        },
        {
          species: "Staravia",
          level: 21,
        },
        {
          species: "Kirlia",
          level: 24,
        },
        {
          species: "Kirlia",
          level: 24,
        },
        {
          species: "Roselia",
          level: 24,
        },
        {
          species: "Marill",
          level: 23,
        },
        {
          species: "Roselia",
          level: 24,
        },
        {
          species: "Marill",
          level: 23,
        },
      ],
    },
    swarm: ["Roselia", "Marill"],
    day: ["Staravia", "Ralts"],
    night: ["Marill", "Marill"],
    radar: ["Smeargle", "Smeargle", "Smeargle", "Smeargle"],
    dualSlots: {
      Emerald: ["Roselia", "Marill"],
      FireRed: ["Roselia", "Marill"],
      LeafGreen: ["Roselia", "Marill"],
      Ruby: ["Roselia", "Marill"],
      Sapphire: ["Roselia", "Marill"],
    },
  },
  "Route 212 (South)": {
    location: "Route 212 (South)",
    grass: {
      rate: 30,
      slots: [
        {
          species: "Shellos_West",
          level: 23,
        },
        {
          species: "Quagsire",
          level: 24,
        },
        {
          species: "Buizel",
          level: 25,
        },
        {
          species: "Shellos_West",
          level: 24,
        },
        {
          species: "Quagsire",
          level: 26,
        },
        {
          species: "Shellos_West",
          level: 25,
        },
        {
          species: "Croagunk",
          level: 24,
        },
        {
          species: "Croagunk",
          level: 25,
        },
        {
          species: "Buizel",
          level: 23,
        },
        {
          species: "Shellos_West",
          level: 26,
        },
        {
          species: "Buizel",
          level: 23,
        },
        {
          species: "Shellos_West",
          level: 26,
        },
      ],
    },
    swarm: ["Shellos_West", "Quagsire"],
    day: ["Buizel", "Shellos_West"],
    night: ["Buizel", "Shellos_West"],
    radar: ["Grimer", "Grimer", "Grimer", "Grimer"],
    dualSlots: {
      Emerald: ["Buizel", "Shellos_West"],
      FireRed: ["Ekans", "Ekans"],
      LeafGreen: ["Buizel", "Shellos_West"],
      Ruby: ["Buizel", "Shellos_West"],
      Sapphire: ["Lombre", "Lotad"],
    },
  },
  "Route 213": {
    location: "Route 213",
    grass: {
      rate: 30,
      slots: [
        {
          species: "Shellos_West",
          level: 24,
        },
        {
          species: "Buizel",
          level: 23,
        },
        {
          species: "Chatot",
          level: 23,
        },
        {
          species: "Chatot",
          level: 25,
        },
        {
          species: "Wingull",
          level: 25,
        },
        {
          species: "Shellos_West",
          level: 25,
        },
        {
          species: "Wingull",
          level: 24,
        },
        {
          species: "Wingull",
          level: 26,
        },
        {
          species: "Buizel",
          level: 25,
        },
        {
          species: "Shellos_West",
          level: 26,
        },
        {
          species: "Buizel",
          level: 25,
        },
        {
          species: "Shellos_West",
          level: 26,
        },
      ],
    },
    swarm: ["Shellos_West", "Buizel"],
    day: ["Chatot", "Chatot"],
    night: ["Shellos_West", "Buizel"],
    radar: ["Swellow", "Swellow", "Swellow", "Swellow"],
    dualSlots: {
      Emerald: ["Buizel", "Shellos_West"],
      FireRed: ["Buizel", "Shellos_West"],
      LeafGreen: ["Buizel", "Shellos_West"],
      Ruby: ["Buizel", "Shellos_West"],
      Sapphire: ["Buizel", "Shellos_West"],
    },
  },
  "Route 214": {
    location: "Route 214",
    grass: {
      rate: 30,
      slots: [
        {
          species: "Graveler",
          level: 23,
        },
        {
          species: "Geodude",
          level: 21,
        },
        {
          species: "Graveler",
          level: 22,
        },
        {
          species: "Rhyhorn",
          level: 22,
        },
        {
          species: "Houndour",
          level: 23,
        },
        {
          species: "Rhyhorn",
          level: 23,
        },
        {
          species: "Graveler",
          level: 24,
        },
        {
          species: "Rhyhorn",
          level: 21,
        },
        {
          species: "Houndour",
          level: 24,
        },
        {
          species: "Rhyhorn",
          level: 24,
        },
        {
          species: "Houndour",
          level: 24,
        },
        {
          species: "Rhyhorn",
          level: 24,
        },
      ],
    },
    swarm: ["Spoink", "Spoink"],
    day: ["Graveler", "Rhyhorn"],
    night: ["Houndour", "Zubat"],
    radar: ["Poochyena", "Poochyena", "Poochyena", "Poochyena"],
    dualSlots: {
      Emerald: ["Houndour", "Rhyhorn"],
      FireRed: ["Houndour", "Rhyhorn"],
      LeafGreen: ["Vulpix", "Vulpix"],
      Ruby: ["Houndour", "Rhyhorn"],
      Sapphire: ["Houndour", "Rhyhorn"],
    },
  },
  "Route 215": {
    location: "Route 215",
    grass: {
      rate: 30,
      slots: [
        {
          species: "Staravia",
          level: 19,
        },
        {
          species: "Marill",
          level: 20,
        },
        {
          species: "Scyther",
          level: 22,
        },
        {
          species: "Staravia",
          level: 21,
        },
        {
          species: "Lickitung",
          level: 20,
        },
        {
          species: "Abra",
          level: 19,
        },
        {
          species: "Scyther",
          level: 20,
        },
        {
          species: "Kadabra",
          level: 21,
        },
        {
          species: "Marill",
          level: 22,
        },
        {
          species: "Kadabra",
          level: 22,
        },
        {
          species: "Marill",
          level: 22,
        },
        {
          species: "Kadabra",
          level: 22,
        },
      ],
    },
    swarm: ["Drowzee", "Drowzee"],
    day: ["Staravia", "Staravia"],
    night: ["Marill", "Marill"],
    radar: ["Lickitung", "Abra", "Marill", "Kadabra"],
    dualSlots: {
      Emerald: ["Marill", "Kadabra"],
      FireRed: ["Marill", "Kadabra"],
      LeafGreen: ["Marill", "Kadabra"],
      Ruby: ["Marill", "Kadabra"],
      Sapphire: ["Marill", "Kadabra"],
    },
  },
  "Route 216": {
    location: "Route 216",
    grass: {
      rate: 30,
      slots: [
        {
          species: "Snover",
          level: 32,
        },
        {
          species: "Sneasel",
          level: 33,
        },
        {
          species: "Meditite",
          level: 32,
        },
        {
          species: "Snover",
          level: 33,
        },
        {
          species: "Meditite",
          level: 33,
        },
        {
          species: "Sneasel",
          level: 34,
        },
        {
          species: "Snover",
          level: 34,
        },
        {
          species: "Sneasel",
          level: 35,
        },
        {
          species: "Graveler",
          level: 35,
        },
        {
          species: "Snover",
          level: 35,
        },
        {
          species: "Graveler",
          level: 35,
        },
        {
          species: "Snover",
          level: 35,
        },
      ],
    },
    swarm: ["Snover", "Sneasel"],
    day: ["Meditite", "Snover"],
    night: ["Zubat", "Snorunt"],
    radar: ["Meditite", "Sneasel", "Graveler", "Snover"],
    dualSlots: {
      Emerald: ["Ursaring", "Ursaring"],
      FireRed: ["Graveler", "Snover"],
      LeafGreen: ["Graveler", "Snover"],
      Ruby: ["Graveler", "Snover"],
      Sapphire: ["Graveler", "Snover"],
    },
  },
  "Route 217": {
    location: "Route 217",
    grass: {
      rate: 30,
      slots: [
        {
          species: "Snover",
          level: 32,
        },
        {
          species: "Swinub",
          level: 33,
        },
        {
          species: "Sneasel",
          level: 33,
        },
        {
          species: "Snover",
          level: 33,
        },
        {
          species: "Sneasel",
          level: 34,
        },
        {
          species: "Swinub",
          level: 34,
        },
        {
          species: "Snover",
          level: 34,
        },
        {
          species: "Swinub",
          level: 32,
        },
        {
          species: "Sneasel",
          level: 35,
        },
        {
          species: "Snover",
          level: 35,
        },
        {
          species: "Sneasel",
          level: 35,
        },
        {
          species: "Snover",
          level: 35,
        },
      ],
    },
    swarm: ["Delibird", "Delibird"],
    day: ["Sneasel", "Snover"],
    night: ["Snorunt", "Snorunt"],
    radar: ["Piloswine", "Piloswine", "Piloswine", "Piloswine"],
    dualSlots: {
      Emerald: ["Ursaring", "Ursaring"],
      FireRed: ["Sneasel", "Snover"],
      LeafGreen: ["Sneasel", "Snover"],
      Ruby: ["Sneasel", "Snover"],
      Sapphire: ["Sneasel", "Snover"],
    },
  },
  "Route 218": {
    location: "Route 218",
    grass: {
      rate: 30,
      slots: [
        {
          species: "Gastrodon_West",
          level: 28,
        },
        {
          species: "Floatzel",
          level: 29,
        },
        {
          species: "Chatot",
          level: 28,
        },
        {
          species: "Chatot",
          level: 30,
        },
        {
          species: "MrMime",
          level: 29,
        },
        {
          species: "MrMime",
          level: 30,
        },
        {
          species: "Floatzel",
          level: 30,
        },
        {
          species: "MrMime",
          level: 31,
        },
        {
          species: "Floatzel",
          level: 31,
        },
        {
          species: "Gastrodon_West",
          level: 30,
        },
        {
          species: "Floatzel",
          level: 31,
        },
        {
          species: "Gastrodon_West",
          level: 30,
        },
      ],
    },
    swarm: ["Voltorb", "Voltorb"],
    day: ["Chatot", "Chatot"],
    night: ["Gastrodon_West", "Floatzel"],
    radar: ["MrMime", "MrMime", "Floatzel", "Gastrodon_West"],
    dualSlots: {
      Emerald: ["Floatzel", "Gastrodon_West"],
      FireRed: ["Floatzel", "Gastrodon_West"],
      LeafGreen: ["Floatzel", "Gastrodon_West"],
      Ruby: ["Floatzel", "Gastrodon_West"],
      Sapphire: ["Floatzel", "Gastrodon_West"],
    },
  },
  "Route 221": {
    location: "Route 221",
    grass: {
      rate: 30,
      slots: [
        {
          species: "Floatzel",
          level: 29,
        },
        {
          species: "Girafarig",
          level: 28,
        },
        {
          species: "Roselia",
          level: 28,
        },
        {
          species: "Roselia",
          level: 29,
        },
        {
          species: "Sudowoodo",
          level: 31,
        },
        {
          species: "Sudowoodo",
          level: 30,
        },
        {
          species: "Girafarig",
          level: 30,
        },
        {
          species: "Sudowoodo",
          level: 29,
        },
        {
          species: "Floatzel",
          level: 31,
        },
        {
          species: "Roselia",
          level: 30,
        },
        {
          species: "Floatzel",
          level: 31,
        },
        {
          species: "Roselia",
          level: 30,
        },
      ],
    },
    swarm: ["FarfetchD", "FarfetchD"],
    day: ["Roselia", "Roselia"],
    night: ["Floatzel", "Roselia"],
    radar: ["Nidorino", "Nidorina", "Nidorino", "Nidorina"],
    dualSlots: {
      Emerald: ["Floatzel", "Roselia"],
      FireRed: ["Floatzel", "Roselia"],
      LeafGreen: ["Floatzel", "Roselia"],
      Ruby: ["Floatzel", "Roselia"],
      Sapphire: ["Floatzel", "Roselia"],
    },
  },
  "Route 222": {
    location: "Route 222",
    grass: {
      rate: 30,
      slots: [
        {
          species: "Electabuzz",
          level: 39,
        },
        {
          species: "Floatzel",
          level: 40,
        },
        {
          species: "Electabuzz",
          level: 41,
        },
        {
          species: "Chatot",
          level: 38,
        },
        {
          species: "Wingull",
          level: 38,
        },
        {
          species: "Magnemite",
          level: 39,
        },
        {
          species: "Luxio",
          level: 38,
        },
        {
          species: "Luxio",
          level: 40,
        },
        {
          species: "Pelipper",
          level: 40,
        },
        {
          species: "Magneton",
          level: 41,
        },
        {
          species: "Pelipper",
          level: 40,
        },
        {
          species: "Magneton",
          level: 41,
        },
      ],
    },
    swarm: ["Skitty", "Skitty"],
    day: ["Electabuzz", "Chatot"],
    night: ["Floatzel", "Floatzel"],
    radar: ["Flaaffy", "Flaaffy", "Flaaffy", "Flaaffy"],
    dualSlots: {
      Emerald: ["Pelipper", "Magneton"],
      FireRed: ["Pelipper", "Magneton"],
      LeafGreen: ["Pelipper", "Magneton"],
      Ruby: ["Pelipper", "Magneton"],
      Sapphire: ["Pelipper", "Magneton"],
    },
  },
  "Route 224": {
    location: "Route 224",
    grass: {
      rate: 30,
      slots: [
        {
          species: "Floatzel",
          level: 50,
        },
        {
          species: "Roselia",
          level: 50,
        },
        {
          species: "Bellsprout",
          level: 49,
        },
        {
          species: "Bellsprout",
          level: 49,
        },
        {
          species: "Pelipper",
          level: 51,
        },
        {
          species: "Gastrodon_West",
          level: 49,
        },
        {
          species: "Gloom",
          level: 51,
        },
        {
          species: "Weepinbell",
          level: 51,
        },
        {
          species: "Beautifly",
          level: 52,
        },
        {
          species: "Dustox",
          level: 52,
        },
        {
          species: "Beautifly",
          level: 52,
        },
        {
          species: "Dustox",
          level: 52,
        },
      ],
    },
    swarm: ["Natu", "Natu"],
    day: ["Bellsprout", "Bellsprout"],
    night: ["Oddish", "Oddish"],
    radar: ["Pelipper", "Gastrodon_West", "Beautifly", "Dustox"],
    dualSlots: {
      Emerald: ["Shuckle", "Shuckle"],
      FireRed: ["Beautifly", "Dustox"],
      LeafGreen: ["Beautifly", "Dustox"],
      Ruby: ["Beautifly", "Dustox"],
      Sapphire: ["Beautifly", "Dustox"],
    },
  },
  "Route 225": {
    location: "Route 225",
    grass: {
      rate: 30,
      slots: [
        {
          species: "Machoke",
          level: 48,
        },
        {
          species: "Graveler",
          level: 49,
        },
        {
          species: "Fearow",
          level: 48,
        },
        {
          species: "Fearow",
          level: 50,
        },
        {
          species: "Fearow",
          level: 49,
        },
        {
          species: "Raticate",
          level: 50,
        },
        {
          species: "Machoke",
          level: 50,
        },
        {
          species: "Raticate",
          level: 49,
        },
        {
          species: "Spearow",
          level: 47,
        },
        {
          species: "Rattata",
          level: 47,
        },
        {
          species: "Spearow",
          level: 47,
        },
        {
          species: "Rattata",
          level: 47,
        },
      ],
    },
    swarm: ["Makuhita", "Makuhita"],
    day: ["Fearow", "Fearow"],
    night: ["Banette", "Banette"],
    radar: ["Primeape", "Primeape", "Mankey", "Mankey"],
    dualSlots: {
      Emerald: ["Spearow", "Rattata"],
      FireRed: ["Spearow", "Rattata"],
      LeafGreen: ["Spearow", "Rattata"],
      Ruby: ["Spearow", "Rattata"],
      Sapphire: ["Spearow", "Rattata"],
    },
  },
  "Route 227": {
    location: "Route 227",
    grass: {
      rate: 10,
      slots: [
        {
          species: "Camerupt",
          level: 53,
        },
        {
          species: "Rhydon",
          level: 54,
        },
        {
          species: "Fearow",
          level: 51,
        },
        {
          species: "Graveler",
          level: 51,
        },
        {
          species: "Fearow",
          level: 53,
        },
        {
          species: "Weezing",
          level: 52,
        },
        {
          species: "Skarmory",
          level: 53,
        },
        {
          species: "Graveler",
          level: 53,
        },
        {
          species: "Numel",
          level: 51,
        },
        {
          species: "Rhyhorn",
          level: 52,
        },
        {
          species: "Numel",
          level: 51,
        },
        {
          species: "Rhyhorn",
          level: 52,
        },
      ],
    },
    swarm: ["Spinda", "Spinda"],
    day: ["Fearow", "Graveler"],
    night: ["Golbat", "Graveler"],
    radar: ["Torkoal", "Torkoal", "Torkoal", "Torkoal"],
    dualSlots: {
      Emerald: ["Numel", "Rhyhorn"],
      FireRed: ["Numel", "Rhyhorn"],
      LeafGreen: ["Numel", "Rhyhorn"],
      Ruby: ["Numel", "Rhyhorn"],
      Sapphire: ["Numel", "Rhyhorn"],
    },
  },
  "Route 228": {
    location: "Route 228",
    grass: {
      rate: 10,
      slots: [
        {
          species: "Dugtrio",
          level: 51,
        },
        {
          species: "Cacturne",
          level: 52,
        },
        {
          species: "Hippowdon",
          level: 50,
        },
        {
          species: "Rhydon",
          level: 50,
        },
        {
          species: "Rhydon",
          level: 52,
        },
        {
          species: "Hippowdon",
          level: 51,
        },
        {
          species: "Dugtrio",
          level: 52,
        },
        {
          species: "Dugtrio",
          level: 50,
        },
        {
          species: "Diglett",
          level: 49,
        },
        {
          species: "Cacnea",
          level: 50,
        },
        {
          species: "Diglett",
          level: 49,
        },
        {
          species: "Cacnea",
          level: 50,
        },
      ],
    },
    swarm: ["Beldum", "Beldum"],
    day: ["Hippowdon", "Rhydon"],
    night: ["Cacturne", "Cacturne"],
    radar: ["Rhydon", "Hippowdon", "Diglett", "Cacnea"],
    dualSlots: {
      Emerald: ["Diglett", "Cacnea"],
      FireRed: ["Diglett", "Cacnea"],
      LeafGreen: ["Sandslash", "Sandslash"],
      Ruby: ["Diglett", "Cacnea"],
      Sapphire: ["Diglett", "Cacnea"],
    },
  },
  "Route 229": {
    location: "Route 229",
    grass: {
      rate: 30,
      slots: [
        {
          species: "Roselia",
          level: 48,
        },
        {
          species: "Roselia",
          level: 49,
        },
        {
          species: "Ledian",
          level: 50,
        },
        {
          species: "Ledian",
          level: 50,
        },
        {
          species: "Volbeat",
          level: 49,
        },
        {
          species: "Illumise",
          level: 49,
        },
        {
          species: "Pidgey",
          level: 47,
        },
        {
          species: "Roselia",
          level: 50,
        },
        {
          species: "Beautifly",
          level: 48,
        },
        {
          species: "Dustox",
          level: 48,
        },
        {
          species: "Beautifly",
          level: 48,
        },
        {
          species: "Dustox",
          level: 48,
        },
      ],
    },
    swarm: ["Pinsir", "Pinsir"],
    day: ["Pidgey", "Pidgey"],
    night: ["Ariados", "Ariados"],
    radar: ["Venomoth", "Venomoth", "Venonat", "Venonat"],
    dualSlots: {
      Emerald: ["Pineco", "Pineco"],
      FireRed: ["Beautifly", "Dustox"],
      LeafGreen: ["Beautifly", "Dustox"],
      Ruby: ["Nuzleaf", "Nuzleaf"],
      Sapphire: ["Lombre", "Lombre"],
    },
  },
  "Route 226": {
    location: "Route 226",
    grass: {
      rate: 30,
      slots: [
        {
          species: "Machoke",
          level: 48,
        },
        {
          species: "Graveler",
          level: 49,
        },
        {
          species: "Fearow",
          level: 48,
        },
        {
          species: "Fearow",
          level: 50,
        },
        {
          species: "Wingull",
          level: 49,
        },
        {
          species: "Raticate",
          level: 50,
        },
        {
          species: "Machoke",
          level: 50,
        },
        {
          species: "Raticate",
          level: 49,
        },
        {
          species: "Wingull",
          level: 47,
        },
        {
          species: "Rattata",
          level: 47,
        },
        {
          species: "Wingull",
          level: 47,
        },
        {
          species: "Rattata",
          level: 47,
        },
      ],
    },
    swarm: ["Krabby", "Krabby"],
    day: ["Fearow", "Fearow"],
    night: ["Banette", "Banette"],
    radar: ["Primeape", "Primeape", "Mankey", "Mankey"],
    dualSlots: {
      Emerald: ["Wingull", "Rattata"],
      FireRed: ["Wingull", "Rattata"],
      LeafGreen: ["Wingull", "Rattata"],
      Ruby: ["Wingull", "Rattata"],
      Sapphire: ["Wingull", "Rattata"],
    },
  },
  "Route 230": {
    location: "Route 230",
    grass: {
      rate: 30,
      slots: [
        {
          species: "Pelipper",
          level: 48,
        },
        {
          species: "Floatzel",
          level: 48,
        },
        {
          species: "Bellsprout",
          level: 47,
        },
        {
          species: "Bellsprout",
          level: 47,
        },
        {
          species: "Roselia",
          level: 49,
        },
        {
          species: "Pelipper",
          level: 50,
        },
        {
          species: "Gloom",
          level: 49,
        },
        {
          species: "Weepinbell",
          level: 49,
        },
        {
          species: "Wingull",
          level: 48,
        },
        {
          species: "Floatzel",
          level: 50,
        },
        {
          species: "Wingull",
          level: 48,
        },
        {
          species: "Floatzel",
          level: 50,
        },
      ],
    },
    swarm: ["Corsola", "Corsola"],
    day: ["Bellsprout", "Bellsprout"],
    night: ["Oddish", "Oddish"],
    radar: ["Togepi", "Togepi", "Togepi", "Togepi"],
    dualSlots: {
      Emerald: ["Pelipper", "Floatzel"],
      FireRed: ["Pelipper", "Floatzel"],
      LeafGreen: ["Pelipper", "Floatzel"],
      Ruby: ["Pelipper", "Floatzel"],
      Sapphire: ["Pelipper", "Floatzel"],
    },
  },
  "Great Marsh Area 1": {
    location: "Great Marsh Area 1",
    grass: {
      rate: 35,
      slots: [
        {
          species: "Wooper",
          level: 28,
        },
        {
          species: "Bibarel",
          level: 28,
        },
        {
          species: "Tropius",
          level: 28,
        },
        {
          species: "Tropius",
          level: 30,
        },
        {
          species: "Wooper",
          level: 29,
        },
        {
          species: "Quagsire",
          level: 30,
        },
        {
          species: "Wooper",
          level: 28,
        },
        {
          species: "Wooper",
          level: 30,
        },
        {
          species: "Yanma",
          level: 30,
        },
        {
          species: "Tangela",
          level: 30,
        },
        {
          species: "Yanma",
          level: 31,
        },
        {
          species: "Tangela",
          level: 31,
        },
      ],
    },
    swarm: ["Wooper", "Bibarel"],
    day: ["Tropius", "Tropius"],
    night: ["Noctowl", "Noctowl"],
    radar: ["Wooper", "Quagsire", "Yanma", "Tangela"],
    dualSlots: {
      Emerald: ["Yanma", "Tangela"],
      FireRed: ["Arbok", "Arbok"],
      LeafGreen: ["Yanma", "Tangela"],
      Ruby: ["Yanma", "Tangela"],
      Sapphire: ["Yanma", "Tangela"],
    },
  },
  "Great Marsh Area 2": {
    location: "Great Marsh Area 2",
    grass: {
      rate: 35,
      slots: [
        {
          species: "Wooper",
          level: 28,
        },
        {
          species: "Bibarel",
          level: 28,
        },
        {
          species: "Tropius",
          level: 28,
        },
        {
          species: "Tropius",
          level: 30,
        },
        {
          species: "Wooper",
          level: 29,
        },
        {
          species: "Quagsire",
          level: 30,
        },
        {
          species: "Wooper",
          level: 28,
        },
        {
          species: "Wooper",
          level: 30,
        },
        {
          species: "Yanma",
          level: 30,
        },
        {
          species: "Tangela",
          level: 30,
        },
        {
          species: "Yanma",
          level: 31,
        },
        {
          species: "Tangela",
          level: 31,
        },
      ],
    },
    swarm: ["Wooper", "Bibarel"],
    day: ["Tropius", "Tropius"],
    night: ["Noctowl", "Noctowl"],
    radar: ["Wooper", "Quagsire", "Yanma", "Tangela"],
    dualSlots: {
      Emerald: ["Yanma", "Tangela"],
      FireRed: ["Arbok", "Arbok"],
      LeafGreen: ["Yanma", "Tangela"],
      Ruby: ["Yanma", "Tangela"],
      Sapphire: ["Yanma", "Tangela"],
    },
  },
  "Great Marsh Area 3": {
    location: "Great Marsh Area 3",
    grass: {
      rate: 35,
      slots: [
        {
          species: "Wooper",
          level: 27,
        },
        {
          species: "Bibarel",
          level: 27,
        },
        {
          species: "Bibarel",
          level: 28,
        },
        {
          species: "Tangela",
          level: 27,
        },
        {
          species: "Tangela",
          level: 28,
        },
        {
          species: "Quagsire",
          level: 29,
        },
        {
          species: "Wooper",
          level: 28,
        },
        {
          species: "Wooper",
          level: 29,
        },
        {
          species: "Yanma",
          level: 29,
        },
        {
          species: "Tangela",
          level: 29,
        },
        {
          species: "Yanma",
          level: 30,
        },
        {
          species: "Tangela",
          level: 30,
        },
      ],
    },
    swarm: ["Wooper", "Bibarel"],
    day: ["Bibarel", "Tangela"],
    night: ["Noctowl", "Hoothoot"],
    radar: ["Tangela", "Quagsire", "Yanma", "Tangela"],
    dualSlots: {
      Emerald: ["Yanma", "Tangela"],
      FireRed: ["Arbok", "Arbok"],
      LeafGreen: ["Yanma", "Tangela"],
      Ruby: ["Yanma", "Tangela"],
      Sapphire: ["Yanma", "Tangela"],
    },
  },
  "Great Marsh Area 4": {
    location: "Great Marsh Area 4",
    grass: {
      rate: 35,
      slots: [
        {
          species: "Wooper",
          level: 27,
        },
        {
          species: "Bibarel",
          level: 27,
        },
        {
          species: "Bibarel",
          level: 28,
        },
        {
          species: "Tangela",
          level: 27,
        },
        {
          species: "Tangela",
          level: 28,
        },
        {
          species: "Quagsire",
          level: 29,
        },
        {
          species: "Wooper",
          level: 28,
        },
        {
          species: "Wooper",
          level: 29,
        },
        {
          species: "Yanma",
          level: 29,
        },
        {
          species: "Tangela",
          level: 29,
        },
        {
          species: "Yanma",
          level: 30,
        },
        {
          species: "Tangela",
          level: 30,
        },
      ],
    },
    swarm: ["Wooper", "Bibarel"],
    day: ["Bibarel", "Tangela"],
    night: ["Noctowl", "Hoothoot"],
    radar: ["Tangela", "Quagsire", "Yanma", "Tangela"],
    dualSlots: {
      Emerald: ["Yanma", "Tangela"],
      FireRed: ["Arbok", "Arbok"],
      LeafGreen: ["Yanma", "Tangela"],
      Ruby: ["Yanma", "Tangela"],
      Sapphire: ["Yanma", "Tangela"],
    },
  },
  "Great Marsh Area 5": {
    location: "Great Marsh Area 5",
    grass: {
      rate: 35,
      slots: [
        {
          species: "Wooper",
          level: 26,
        },
        {
          species: "Bibarel",
          level: 26,
        },
        {
          species: "Bibarel",
          level: 27,
        },
        {
          species: "Yanma",
          level: 26,
        },
        {
          species: "Yanma",
          level: 27,
        },
        {
          species: "Quagsire",
          level: 28,
        },
        {
          species: "Wooper",
          level: 27,
        },
        {
          species: "Wooper",
          level: 28,
        },
        {
          species: "Yanma",
          level: 28,
        },
        {
          species: "Tangela",
          level: 28,
        },
        {
          species: "Yanma",
          level: 29,
        },
        {
          species: "Tangela",
          level: 29,
        },
      ],
    },
    swarm: ["Wooper", "Bibarel"],
    day: ["Bibarel", "Yanma"],
    night: ["Hoothoot", "Hoothoot"],
    radar: ["Yanma", "Quagsire", "Yanma", "Tangela"],
    dualSlots: {
      Emerald: ["Yanma", "Tangela"],
      FireRed: ["Arbok", "Arbok"],
      LeafGreen: ["Yanma", "Tangela"],
      Ruby: ["Yanma", "Tangela"],
      Sapphire: ["Yanma", "Tangela"],
    },
  },
  "Great Marsh Area 6": {
    location: "Great Marsh Area 6",
    grass: {
      rate: 35,
      slots: [
        {
          species: "Wooper",
          level: 26,
        },
        {
          species: "Bibarel",
          level: 26,
        },
        {
          species: "Bibarel",
          level: 27,
        },
        {
          species: "Yanma",
          level: 26,
        },
        {
          species: "Yanma",
          level: 27,
        },
        {
          species: "Quagsire",
          level: 28,
        },
        {
          species: "Wooper",
          level: 27,
        },
        {
          species: "Wooper",
          level: 28,
        },
        {
          species: "Yanma",
          level: 28,
        },
        {
          species: "Tangela",
          level: 28,
        },
        {
          species: "Yanma",
          level: 29,
        },
        {
          species: "Tangela",
          level: 29,
        },
      ],
    },
    swarm: ["Wooper", "Bibarel"],
    day: ["Bibarel", "Yanma"],
    night: ["Hoothoot", "Hoothoot"],
    radar: ["Yanma", "Quagsire", "Yanma", "Tangela"],
    dualSlots: {
      Emerald: ["Yanma", "Tangela"],
      FireRed: ["Arbok", "Arbok"],
      LeafGreen: ["Yanma", "Tangela"],
      Ruby: ["Yanma", "Tangela"],
      Sapphire: ["Yanma", "Tangela"],
    },
  },
  "Ruin Maniac Cave (> 10 Unown)": {
    location: "Ruin Maniac Cave (> 10 Unown)",
    grass: {
      rate: 10,
      slots: [
        {
          species: "Geodude",
          level: 24,
        },
        {
          species: "Geodude",
          level: 23,
        },
        {
          species: "Geodude",
          level: 22,
        },
        {
          species: "Geodude",
          level: 24,
        },
        {
          species: "Geodude",
          level: 24,
        },
        {
          species: "Geodude",
          level: 24,
        },
        {
          species: "Geodude",
          level: 24,
        },
        {
          species: "Hippopotas",
          level: 24,
        },
        {
          species: "Geodude",
          level: 24,
        },
        {
          species: "Hippopotas",
          level: 23,
        },
        {
          species: "Geodude",
          level: 24,
        },
        {
          species: "Hippopotas",
          level: 25,
        },
      ],
    },
    swarm: ["Geodude", "Geodude"],
    day: ["Geodude", "Geodude"],
    night: ["Geodude", "Geodude"],
    radar: ["Geodude", "Geodude", "Geodude", "Hippopotas"],
    dualSlots: {
      Emerald: ["Geodude", "Hippopotas"],
      FireRed: ["Geodude", "Hippopotas"],
      LeafGreen: ["Geodude", "Hippopotas"],
      Ruby: ["Geodude", "Hippopotas"],
      Sapphire: ["Geodude", "Hippopotas"],
    },
  },
  "Maniac Tunnel": {
    location: "Maniac Tunnel",
    grass: {
      rate: 10,
      slots: [
        {
          species: "Geodude",
          level: 25,
        },
        {
          species: "Geodude",
          level: 24,
        },
        {
          species: "Geodude",
          level: 23,
        },
        {
          species: "Geodude",
          level: 25,
        },
        {
          species: "Geodude",
          level: 25,
        },
        {
          species: "Hippopotas",
          level: 25,
        },
        {
          species: "Geodude",
          level: 25,
        },
        {
          species: "Hippopotas",
          level: 25,
        },
        {
          species: "Geodude",
          level: 25,
        },
        {
          species: "Hippopotas",
          level: 24,
        },
        {
          species: "Geodude",
          level: 25,
        },
        {
          species: "Hippopotas",
          level: 26,
        },
      ],
    },
    swarm: ["Geodude", "Geodude"],
    day: ["Geodude", "Geodude"],
    night: ["Geodude", "Geodude"],
    radar: ["Geodude", "Hippopotas", "Geodude", "Hippopotas"],
    dualSlots: {
      Emerald: ["Geodude", "Hippopotas"],
      FireRed: ["Geodude", "Hippopotas"],
      LeafGreen: ["Geodude", "Hippopotas"],
      Ruby: ["Geodude", "Hippopotas"],
      Sapphire: ["Geodude", "Hippopotas"],
    },
  },
  "Turnback 1st Pillar": {
    location: "Turnback 1st Pillar",
    grass: {
      rate: 15,
      slots: [
        {
          species: "Haunter",
          level: 25,
        },
        {
          species: "Bronzor",
          level: 25,
        },
        {
          species: "Haunter",
          level: 26,
        },
        {
          species: "Golbat",
          level: 27,
        },
        {
          species: "Haunter",
          level: 27,
        },
        {
          species: "Golbat",
          level: 27,
        },
        {
          species: "Golbat",
          level: 25,
        },
        {
          species: "Chingling",
          level: 26,
        },
        {
          species: "Duskull",
          level: 28,
        },
        {
          species: "Chingling",
          level: 28,
        },
        {
          species: "Dusclops",
          level: 28,
        },
        {
          species: "Chimecho",
          level: 28,
        },
      ],
    },
    swarm: ["Haunter", "Bronzor"],
    day: ["Haunter", "Golbat"],
    night: ["Dusclops", "Golbat"],
    radar: ["Haunter", "Golbat", "Dusclops", "Chingling"],
    dualSlots: {
      Emerald: ["Dusclops", "Chingling"],
      FireRed: ["Dusclops", "Chingling"],
      LeafGreen: ["Dusclops", "Chingling"],
      Ruby: ["Solrock", "Solrock"],
      Sapphire: ["Lunatone", "Lunatone"],
    },
  },
  "Turnback 2nd Pillar": {
    location: "Turnback 2nd Pillar",
    grass: {
      rate: 15,
      slots: [
        {
          species: "Haunter",
          level: 35,
        },
        {
          species: "Bronzong",
          level: 35,
        },
        {
          species: "Haunter",
          level: 36,
        },
        {
          species: "Golbat",
          level: 37,
        },
        {
          species: "Haunter",
          level: 37,
        },
        {
          species: "Golbat",
          level: 37,
        },
        {
          species: "Golbat",
          level: 38,
        },
        {
          species: "Chimecho",
          level: 36,
        },
        {
          species: "Dusclops",
          level: 38,
        },
        {
          species: "Chimecho",
          level: 38,
        },
        {
          species: "Dusclops",
          level: 38,
        },
        {
          species: "Chimecho",
          level: 38,
        },
      ],
    },
    swarm: ["Haunter", "Bronzong"],
    day: ["Haunter", "Golbat"],
    night: ["Dusclops", "Golbat"],
    radar: ["Haunter", "Golbat", "Dusclops", "Chimecho"],
    dualSlots: {
      Emerald: ["Dusclops", "Chimecho"],
      FireRed: ["Dusclops", "Chimecho"],
      LeafGreen: ["Dusclops", "Chimecho"],
      Ruby: ["Solrock", "Solrock"],
      Sapphire: ["Lunatone", "Lunatone"],
    },
  },
};
