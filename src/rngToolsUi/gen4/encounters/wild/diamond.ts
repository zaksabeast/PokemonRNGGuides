import { type Location } from "./locations";
import { type WildEncounter } from "./wildEncounter";

export const diamondEncounters: Record<Location, WildEncounter> = {
  "Oreburgh Mine B1F": {
    location: "Oreburgh Mine B1F",
    grass: {
      rate: 10,
      slots: [
        {
          species: "Geodude",
          level: 6,
        },
        {
          species: "Geodude",
          level: 6,
        },
        {
          species: "Zubat",
          level: 7,
        },
        {
          species: "Zubat",
          level: 7,
        },
        {
          species: "Geodude",
          level: 7,
        },
        {
          species: "Geodude",
          level: 7,
        },
        {
          species: "Onix",
          level: 8,
        },
        {
          species: "Onix",
          level: 8,
        },
        {
          species: "Geodude",
          level: 9,
        },
        {
          species: "Geodude",
          level: 9,
        },
        {
          species: "Geodude",
          level: 5,
        },
        {
          species: "Geodude",
          level: 5,
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
          level: 7,
        },
        {
          species: "Geodude",
          level: 7,
        },
        {
          species: "Zubat",
          level: 8,
        },
        {
          species: "Zubat",
          level: 8,
        },
        {
          species: "Geodude",
          level: 8,
        },
        {
          species: "Geodude",
          level: 8,
        },
        {
          species: "Onix",
          level: 9,
        },
        {
          species: "Onix",
          level: 9,
        },
        {
          species: "Geodude",
          level: 10,
        },
        {
          species: "Geodude",
          level: 10,
        },
        {
          species: "Geodude",
          level: 6,
        },
        {
          species: "Geodude",
          level: 6,
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
          species: "Buizel",
          level: 7,
        },
        {
          species: "Pachirisu",
          level: 7,
        },
        {
          species: "Buizel",
          level: 8,
        },
        {
          species: "Shellos_West",
          level: 8,
        },
        {
          species: "Bidoof",
          level: 8,
        },
        {
          species: "Shellos_West",
          level: 7,
        },
        {
          species: "Shellos_West",
          level: 9,
        },
        {
          species: "Pachirisu",
          level: 8,
        },
        {
          species: "Buizel",
          level: 9,
        },
        {
          species: "Shellos_West",
          level: 9,
        },
        {
          species: "Buizel",
          level: 9,
        },
        {
          species: "Shellos_West",
          level: 9,
        },
      ],
    },
    swarm: ["Electrike", "Electrike"],
    day: ["Buizel", "Shellos_West"],
    night: ["Buizel", "Shellos_West"],
    radar: ["Mareep", "Mareep", "Mareep", "Mareep"],
    dualSlots: {
      Emerald: ["Buizel", "Shellos_West"],
      FireRed: ["Elekid", "Elekid"],
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
          species: "Wurmple",
          level: 10,
        },
        {
          species: "Silcoon",
          level: 10,
        },
        {
          species: "Wurmple",
          level: 11,
        },
        {
          species: "Budew",
          level: 10,
        },
        {
          species: "Buneary",
          level: 10,
        },
        {
          species: "Budew",
          level: 11,
        },
        {
          species: "Buneary",
          level: 11,
        },
        {
          species: "Budew",
          level: 12,
        },
        {
          species: "Budew",
          level: 12,
        },
        {
          species: "Buneary",
          level: 12,
        },
        {
          species: "Beautifly",
          level: 12,
        },
        {
          species: "Beautifly",
          level: 12,
        },
      ],
    },
    swarm: ["Slakoth", "Slakoth"],
    day: ["Wurmple", "Budew"],
    night: ["Murkrow", "Murkrow"],
    radar: ["Nincada", "Nincada", "Nincada", "Nincada"],
    dualSlots: {
      Emerald: ["Pineco", "Pineco"],
      FireRed: ["Metapod", "Metapod"],
      LeafGreen: ["Kakuna", "Kakuna"],
      Ruby: ["Seedot", "Seedot"],
      Sapphire: ["Budew", "Buneary"],
    },
  },
  "Fuego Ironworks": {
    location: "Fuego Ironworks",
    grass: {
      rate: 30,
      slots: [
        {
          species: "Floatzel",
          level: 29,
        },
        {
          species: "Shellos_West",
          level: 28,
        },
        {
          species: "Shinx",
          level: 28,
        },
        {
          species: "Wingull",
          level: 29,
        },
        {
          species: "Luxio",
          level: 29,
        },
        {
          species: "Gastrodon_West",
          level: 29,
        },
        {
          species: "Pachirisu",
          level: 29,
        },
        {
          species: "Pachirisu",
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
          species: "Floatzel",
          level: 30,
        },
        {
          species: "Gastrodon_West",
          level: 30,
        },
      ],
    },
    swarm: ["Magnemite", "Magnemite"],
    day: ["Shinx", "Wingull"],
    night: ["Shinx", "Wingull"],
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
          species: "Machop",
          level: 15,
        },
        {
          species: "Geodude",
          level: 15,
        },
        {
          species: "Cleffa",
          level: 14,
        },
        {
          species: "Cleffa",
          level: 14,
        },
        {
          species: "Meditite",
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
        {
          species: "Chingling",
          level: 15,
        },
        {
          species: "Machop",
          level: 16,
        },
        {
          species: "Cleffa",
          level: 14,
        },
        {
          species: "Machop",
          level: 16,
        },
        {
          species: "Cleffa",
          level: 14,
        },
      ],
    },
    swarm: ["Machop", "Geodude"],
    day: ["Geodude", "Zubat"],
    night: ["Geodude", "Zubat"],
    radar: ["Meditite", "Zubat", "Machop", "Cleffa"],
    dualSlots: {
      Emerald: ["Machop", "Cleffa"],
      FireRed: ["Machop", "Cleffa"],
      LeafGreen: ["Machop", "Cleffa"],
      Ruby: ["Machop", "Cleffa"],
      Sapphire: ["Machop", "Cleffa"],
    },
  },
  "Mt. Coronet 2F": {
    location: "Mt. Coronet 2F",
    grass: {
      rate: 10,
      slots: [
        {
          species: "Bronzong",
          level: 38,
        },
        {
          species: "Graveler",
          level: 36,
        },
        {
          species: "Machoke",
          level: 37,
        },
        {
          species: "Clefairy",
          level: 36,
        },
        {
          species: "Medicham",
          level: 37,
        },
        {
          species: "Golbat",
          level: 37,
        },
        {
          species: "Chingling",
          level: 37,
        },
        {
          species: "Chingling",
          level: 38,
        },
        {
          species: "Bronzor",
          level: 36,
        },
        {
          species: "Clefairy",
          level: 37,
        },
        {
          species: "Bronzor",
          level: 36,
        },
        {
          species: "Clefairy",
          level: 38,
        },
      ],
    },
    swarm: ["Bronzong", "Graveler"],
    day: ["Machoke", "Clefairy"],
    night: ["Machoke", "Clefairy"],
    radar: ["Medicham", "Golbat", "Bronzor", "Clefairy"],
    dualSlots: {
      Emerald: ["Bronzor", "Clefairy"],
      FireRed: ["Bronzor", "Clefairy"],
      LeafGreen: ["Bronzor", "Clefairy"],
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
          level: 38,
        },
        {
          species: "Graveler",
          level: 36,
        },
        {
          species: "Machoke",
          level: 37,
        },
        {
          species: "Clefairy",
          level: 36,
        },
        {
          species: "Medicham",
          level: 37,
        },
        {
          species: "Golbat",
          level: 37,
        },
        {
          species: "Chingling",
          level: 37,
        },
        {
          species: "Chingling",
          level: 38,
        },
        {
          species: "Bronzor",
          level: 36,
        },
        {
          species: "Clefairy",
          level: 37,
        },
        {
          species: "Bronzor",
          level: 36,
        },
        {
          species: "Clefairy",
          level: 38,
        },
      ],
    },
    swarm: ["Bronzong", "Graveler"],
    day: ["Machoke", "Clefairy"],
    night: ["Machoke", "Clefairy"],
    radar: ["Medicham", "Golbat", "Bronzor", "Clefairy"],
    dualSlots: {
      Emerald: ["Bronzor", "Clefairy"],
      FireRed: ["Bronzor", "Clefairy"],
      LeafGreen: ["Bronzor", "Clefairy"],
      Ruby: ["Solrock", "Solrock"],
      Sapphire: ["Lunatone", "Lunatone"],
    },
  },
  "Mt. Coronet Summit": {
    location: "Mt. Coronet Summit",
    grass: {
      rate: 30,
      slots: [
        {
          species: "Snover",
          level: 38,
        },
        {
          species: "Abomasnow",
          level: 40,
        },
        {
          species: "Medicham",
          level: 39,
        },
        {
          species: "Machoke",
          level: 39,
        },
        {
          species: "Medicham",
          level: 40,
        },
        {
          species: "Machoke",
          level: 40,
        },
        {
          species: "Chingling",
          level: 39,
        },
        {
          species: "Chingling",
          level: 40,
        },
        {
          species: "Bronzong",
          level: 39,
        },
        {
          species: "Clefairy",
          level: 38,
        },
        {
          species: "Bronzong",
          level: 40,
        },
        {
          species: "Clefairy",
          level: 39,
        },
      ],
    },
    swarm: ["Snover", "Abomasnow"],
    day: ["Medicham", "Machoke"],
    night: ["Golbat", "Noctowl"],
    radar: ["Loudred", "Loudred", "Loudred", "Loudred"],
    dualSlots: {
      Emerald: ["Bronzong", "Clefairy"],
      FireRed: ["Bronzong", "Clefairy"],
      LeafGreen: ["Bronzong", "Clefairy"],
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
          level: 40,
        },
        {
          species: "Graveler",
          level: 38,
        },
        {
          species: "Machoke",
          level: 39,
        },
        {
          species: "Clefairy",
          level: 38,
        },
        {
          species: "Medicham",
          level: 39,
        },
        {
          species: "Golbat",
          level: 39,
        },
        {
          species: "Chingling",
          level: 39,
        },
        {
          species: "Chingling",
          level: 40,
        },
        {
          species: "Bronzong",
          level: 38,
        },
        {
          species: "Clefairy",
          level: 39,
        },
        {
          species: "Bronzong",
          level: 39,
        },
        {
          species: "Clefairy",
          level: 40,
        },
      ],
    },
    swarm: ["Bronzong", "Graveler"],
    day: ["Machoke", "Clefairy"],
    night: ["Machoke", "Clefairy"],
    radar: ["Medicham", "Golbat", "Bronzong", "Clefairy"],
    dualSlots: {
      Emerald: ["Bronzong", "Clefairy"],
      FireRed: ["Bronzong", "Clefairy"],
      LeafGreen: ["Bronzong", "Clefairy"],
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
          level: 40,
        },
        {
          species: "Graveler",
          level: 38,
        },
        {
          species: "Machoke",
          level: 39,
        },
        {
          species: "Clefairy",
          level: 38,
        },
        {
          species: "Medicham",
          level: 39,
        },
        {
          species: "Golbat",
          level: 39,
        },
        {
          species: "Chingling",
          level: 40,
        },
        {
          species: "Chimecho",
          level: 40,
        },
        {
          species: "Bronzong",
          level: 38,
        },
        {
          species: "Clefairy",
          level: 39,
        },
        {
          species: "Bronzong",
          level: 39,
        },
        {
          species: "Clefairy",
          level: 40,
        },
      ],
    },
    swarm: ["Bronzong", "Graveler"],
    day: ["Machoke", "Clefairy"],
    night: ["Machoke", "Clefairy"],
    radar: ["Medicham", "Golbat", "Bronzong", "Clefairy"],
    dualSlots: {
      Emerald: ["Bronzong", "Clefairy"],
      FireRed: ["Bronzong", "Clefairy"],
      LeafGreen: ["Bronzong", "Clefairy"],
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
          level: 42,
        },
        {
          species: "Graveler",
          level: 40,
        },
        {
          species: "Machoke",
          level: 41,
        },
        {
          species: "Clefairy",
          level: 40,
        },
        {
          species: "Medicham",
          level: 41,
        },
        {
          species: "Golbat",
          level: 41,
        },
        {
          species: "Chimecho",
          level: 41,
        },
        {
          species: "Chimecho",
          level: 42,
        },
        {
          species: "Bronzong",
          level: 40,
        },
        {
          species: "Clefairy",
          level: 41,
        },
        {
          species: "Bronzong",
          level: 41,
        },
        {
          species: "Clefairy",
          level: 42,
        },
      ],
    },
    swarm: ["Bronzong", "Graveler"],
    day: ["Machoke", "Clefairy"],
    night: ["Machoke", "Clefairy"],
    radar: ["Medicham", "Golbat", "Bronzong", "Clefairy"],
    dualSlots: {
      Emerald: ["Bronzong", "Clefairy"],
      FireRed: ["Bronzong", "Clefairy"],
      LeafGreen: ["Bronzong", "Clefairy"],
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
          level: 42,
        },
        {
          species: "Graveler",
          level: 40,
        },
        {
          species: "Machoke",
          level: 41,
        },
        {
          species: "Clefairy",
          level: 40,
        },
        {
          species: "Medicham",
          level: 41,
        },
        {
          species: "Golbat",
          level: 41,
        },
        {
          species: "Chimecho",
          level: 41,
        },
        {
          species: "Chimecho",
          level: 42,
        },
        {
          species: "Bronzong",
          level: 40,
        },
        {
          species: "Clefairy",
          level: 41,
        },
        {
          species: "Bronzong",
          level: 41,
        },
        {
          species: "Clefairy",
          level: 42,
        },
      ],
    },
    swarm: ["Bronzong", "Graveler"],
    day: ["Machoke", "Clefairy"],
    night: ["Machoke", "Clefairy"],
    radar: ["Medicham", "Golbat", "Bronzong", "Clefairy"],
    dualSlots: {
      Emerald: ["Bronzong", "Clefairy"],
      FireRed: ["Bronzong", "Clefairy"],
      LeafGreen: ["Bronzong", "Clefairy"],
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
          level: 40,
        },
        {
          species: "Graveler",
          level: 39,
        },
        {
          species: "Machoke",
          level: 40,
        },
        {
          species: "Clefairy",
          level: 38,
        },
        {
          species: "Medicham",
          level: 40,
        },
        {
          species: "Golbat",
          level: 39,
        },
        {
          species: "Chingling",
          level: 38,
        },
        {
          species: "Chingling",
          level: 40,
        },
        {
          species: "Bronzong",
          level: 40,
        },
        {
          species: "Clefairy",
          level: 39,
        },
        {
          species: "Bronzong",
          level: 39,
        },
        {
          species: "Clefairy",
          level: 40,
        },
      ],
    },
    swarm: ["Graveler", "Graveler"],
    day: ["Machoke", "Clefairy"],
    night: ["Machoke", "Clefairy"],
    radar: ["Medicham", "Golbat", "Bronzong", "Clefairy"],
    dualSlots: {
      Emerald: ["Bronzong", "Clefairy"],
      FireRed: ["Bronzong", "Clefairy"],
      LeafGreen: ["Bronzong", "Clefairy"],
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
          species: "Meditite",
          level: 31,
        },
        {
          species: "Graveler",
          level: 31,
        },
        {
          species: "Clefairy",
          level: 30,
        },
        {
          species: "Golbat",
          level: 32,
        },
        {
          species: "Machoke",
          level: 31,
        },
        {
          species: "Golbat",
          level: 31,
        },
        {
          species: "Chingling",
          level: 30,
        },
        {
          species: "Chingling",
          level: 30,
        },
        {
          species: "Meditite",
          level: 32,
        },
        {
          species: "Clefairy",
          level: 31,
        },
        {
          species: "Meditite",
          level: 32,
        },
        {
          species: "Clefairy",
          level: 32,
        },
      ],
    },
    swarm: ["Meditite", "Graveler"],
    day: ["Clefairy", "Golbat"],
    night: ["Clefairy", "Golbat"],
    radar: ["Machoke", "Golbat", "Meditite", "Clefairy"],
    dualSlots: {
      Emerald: ["Meditite", "Clefairy"],
      FireRed: ["Meditite", "Clefairy"],
      LeafGreen: ["Meditite", "Clefairy"],
      Ruby: ["Meditite", "Clefairy"],
      Sapphire: ["Meditite", "Clefairy"],
    },
  },
  "Mt. Coronet Upper 1F 1": {
    location: "Mt. Coronet Upper 1F 1",
    grass: {
      rate: 10,
      slots: [
        {
          species: "Meditite",
          level: 13,
        },
        {
          species: "Geodude",
          level: 13,
        },
        {
          species: "Cleffa",
          level: 12,
        },
        {
          species: "Cleffa",
          level: 12,
        },
        {
          species: "Machop",
          level: 13,
        },
        {
          species: "Zubat",
          level: 13,
        },
        {
          species: "Chingling",
          level: 13,
        },
        {
          species: "Chingling",
          level: 13,
        },
        {
          species: "Meditite",
          level: 14,
        },
        {
          species: "Cleffa",
          level: 12,
        },
        {
          species: "Meditite",
          level: 14,
        },
        {
          species: "Cleffa",
          level: 12,
        },
      ],
    },
    swarm: ["Meditite", "Geodude"],
    day: ["Geodude", "Zubat"],
    night: ["Geodude", "Zubat"],
    radar: ["Machop", "Zubat", "Meditite", "Cleffa"],
    dualSlots: {
      Emerald: ["Meditite", "Cleffa"],
      FireRed: ["Meditite", "Cleffa"],
      LeafGreen: ["Meditite", "Cleffa"],
      Ruby: ["Meditite", "Cleffa"],
      Sapphire: ["Cleffa", "Cleffa"],
    },
  },
  "Mt. Coronet Upper B1F": {
    location: "Mt. Coronet Upper B1F",
    grass: {
      rate: 10,
      slots: [
        {
          species: "Meditite",
          level: 31,
        },
        {
          species: "Graveler",
          level: 31,
        },
        {
          species: "Clefairy",
          level: 30,
        },
        {
          species: "Golbat",
          level: 32,
        },
        {
          species: "Machoke",
          level: 31,
        },
        {
          species: "Golbat",
          level: 31,
        },
        {
          species: "Chingling",
          level: 30,
        },
        {
          species: "Chingling",
          level: 30,
        },
        {
          species: "Meditite",
          level: 32,
        },
        {
          species: "Clefairy",
          level: 31,
        },
        {
          species: "Meditite",
          level: 32,
        },
        {
          species: "Clefairy",
          level: 32,
        },
      ],
    },
    swarm: ["Meditite", "Graveler"],
    day: ["Clefairy", "Golbat"],
    night: ["Clefairy", "Golbat"],
    radar: ["Machoke", "Golbat", "Meditite", "Clefairy"],
    dualSlots: {
      Emerald: ["Meditite", "Clefairy"],
      FireRed: ["Meditite", "Clefairy"],
      LeafGreen: ["Meditite", "Clefairy"],
      Ruby: ["Meditite", "Clefairy"],
      Sapphire: ["Meditite", "Clefairy"],
    },
  },
  "Solaceon Ruins 2F": {
    location: "Solaceon Ruins 2F",
    grass: {
      rate: 10,
      slots: [
        {
          species: "Unown",
          level: 19,
        },
        {
          species: "Unown",
          level: 20,
        },
        {
          species: "Unown",
          level: 18,
        },
        {
          species: "Unown",
          level: 21,
        },
        {
          species: "Unown",
          level: 17,
        },
        {
          species: "Unown",
          level: 22,
        },
        {
          species: "Unown",
          level: 16,
        },
        {
          species: "Unown",
          level: 23,
        },
        {
          species: "Unown",
          level: 15,
        },
        {
          species: "Unown",
          level: 24,
        },
        {
          species: "Unown",
          level: 14,
        },
        {
          species: "Unown",
          level: 25,
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
          level: 19,
        },
        {
          species: "Unown",
          level: 20,
        },
        {
          species: "Unown",
          level: 18,
        },
        {
          species: "Unown",
          level: 21,
        },
        {
          species: "Unown",
          level: 17,
        },
        {
          species: "Unown",
          level: 22,
        },
        {
          species: "Unown",
          level: 16,
        },
        {
          species: "Unown",
          level: 23,
        },
        {
          species: "Unown",
          level: 15,
        },
        {
          species: "Unown",
          level: 24,
        },
        {
          species: "Unown",
          level: 14,
        },
        {
          species: "Unown",
          level: 25,
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
          level: 19,
        },
        {
          species: "Unown",
          level: 20,
        },
        {
          species: "Unown",
          level: 18,
        },
        {
          species: "Unown",
          level: 21,
        },
        {
          species: "Unown",
          level: 17,
        },
        {
          species: "Unown",
          level: 22,
        },
        {
          species: "Unown",
          level: 16,
        },
        {
          species: "Unown",
          level: 23,
        },
        {
          species: "Unown",
          level: 15,
        },
        {
          species: "Unown",
          level: 24,
        },
        {
          species: "Unown",
          level: 14,
        },
        {
          species: "Unown",
          level: 25,
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
          level: 19,
        },
        {
          species: "Unown",
          level: 20,
        },
        {
          species: "Unown",
          level: 18,
        },
        {
          species: "Unown",
          level: 21,
        },
        {
          species: "Unown",
          level: 17,
        },
        {
          species: "Unown",
          level: 22,
        },
        {
          species: "Unown",
          level: 16,
        },
        {
          species: "Unown",
          level: 23,
        },
        {
          species: "Unown",
          level: 15,
        },
        {
          species: "Unown",
          level: 24,
        },
        {
          species: "Unown",
          level: 14,
        },
        {
          species: "Unown",
          level: 25,
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
          level: 19,
        },
        {
          species: "Unown",
          level: 20,
        },
        {
          species: "Unown",
          level: 18,
        },
        {
          species: "Unown",
          level: 21,
        },
        {
          species: "Unown",
          level: 17,
        },
        {
          species: "Unown",
          level: 22,
        },
        {
          species: "Unown",
          level: 16,
        },
        {
          species: "Unown",
          level: 23,
        },
        {
          species: "Unown",
          level: 15,
        },
        {
          species: "Unown",
          level: 24,
        },
        {
          species: "Unown",
          level: 14,
        },
        {
          species: "Unown",
          level: 25,
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
          level: 19,
        },
        {
          species: "Unown",
          level: 20,
        },
        {
          species: "Unown",
          level: 18,
        },
        {
          species: "Unown",
          level: 21,
        },
        {
          species: "Unown",
          level: 17,
        },
        {
          species: "Unown",
          level: 22,
        },
        {
          species: "Unown",
          level: 16,
        },
        {
          species: "Unown",
          level: 23,
        },
        {
          species: "Unown",
          level: 15,
        },
        {
          species: "Unown",
          level: 24,
        },
        {
          species: "Unown",
          level: 14,
        },
        {
          species: "Unown",
          level: 25,
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
          level: 19,
        },
        {
          species: "Unown",
          level: 20,
        },
        {
          species: "Unown",
          level: 18,
        },
        {
          species: "Unown",
          level: 21,
        },
        {
          species: "Unown",
          level: 17,
        },
        {
          species: "Unown",
          level: 22,
        },
        {
          species: "Unown",
          level: 16,
        },
        {
          species: "Unown",
          level: 23,
        },
        {
          species: "Unown",
          level: 15,
        },
        {
          species: "Unown",
          level: 24,
        },
        {
          species: "Unown",
          level: 14,
        },
        {
          species: "Unown",
          level: 25,
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
          level: 19,
        },
        {
          species: "Unown",
          level: 20,
        },
        {
          species: "Unown",
          level: 18,
        },
        {
          species: "Unown",
          level: 21,
        },
        {
          species: "Unown",
          level: 17,
        },
        {
          species: "Unown",
          level: 22,
        },
        {
          species: "Unown",
          level: 16,
        },
        {
          species: "Unown",
          level: 23,
        },
        {
          species: "Unown",
          level: 15,
        },
        {
          species: "Unown",
          level: 24,
        },
        {
          species: "Unown",
          level: 14,
        },
        {
          species: "Unown",
          level: 25,
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
          species: "Machoke",
          level: 45,
        },
        {
          species: "Graveler",
          level: 45,
        },
        {
          species: "Medicham",
          level: 45,
        },
        {
          species: "Golbat",
          level: 45,
        },
        {
          species: "Onix",
          level: 44,
        },
        {
          species: "Steelix",
          level: 46,
        },
        {
          species: "Golbat",
          level: 46,
        },
        {
          species: "Golbat",
          level: 44,
        },
        {
          species: "Machoke",
          level: 46,
        },
        {
          species: "Medicham",
          level: 46,
        },
        {
          species: "Machoke",
          level: 44,
        },
        {
          species: "Medicham",
          level: 44,
        },
      ],
    },
    swarm: ["Machoke", "Graveler"],
    day: ["Medicham", "Golbat"],
    night: ["Medicham", "Golbat"],
    radar: ["Onix", "Steelix", "Machoke", "Medicham"],
    dualSlots: {
      Emerald: ["Machoke", "Medicham"],
      FireRed: ["Machoke", "Medicham"],
      LeafGreen: ["Machoke", "Medicham"],
      Ruby: ["Machoke", "Medicham"],
      Sapphire: ["Machoke", "Medicham"],
    },
  },
  "Victory Road 2F": {
    location: "Victory Road 2F",
    grass: {
      rate: 15,
      slots: [
        {
          species: "Kadabra",
          level: 46,
        },
        {
          species: "Graveler",
          level: 46,
        },
        {
          species: "Medicham",
          level: 46,
        },
        {
          species: "Golbat",
          level: 46,
        },
        {
          species: "Onix",
          level: 45,
        },
        {
          species: "Steelix",
          level: 47,
        },
        {
          species: "Golbat",
          level: 47,
        },
        {
          species: "Golbat",
          level: 45,
        },
        {
          species: "Kadabra",
          level: 47,
        },
        {
          species: "Medicham",
          level: 47,
        },
        {
          species: "Kadabra",
          level: 45,
        },
        {
          species: "Medicham",
          level: 45,
        },
      ],
    },
    swarm: ["Kadabra", "Graveler"],
    day: ["Medicham", "Golbat"],
    night: ["Medicham", "Golbat"],
    radar: ["Onix", "Steelix", "Kadabra", "Medicham"],
    dualSlots: {
      Emerald: ["Kadabra", "Medicham"],
      FireRed: ["Kadabra", "Medicham"],
      LeafGreen: ["Kadabra", "Medicham"],
      Ruby: ["Kadabra", "Medicham"],
      Sapphire: ["Kadabra", "Medicham"],
    },
  },
  "Victory Road B1F": {
    location: "Victory Road B1F",
    grass: {
      rate: 15,
      slots: [
        {
          species: "Machoke",
          level: 45,
        },
        {
          species: "Floatzel",
          level: 45,
        },
        {
          species: "Medicham",
          level: 45,
        },
        {
          species: "Golbat",
          level: 45,
        },
        {
          species: "Floatzel",
          level: 44,
        },
        {
          species: "Steelix",
          level: 46,
        },
        {
          species: "Golbat",
          level: 46,
        },
        {
          species: "Golbat",
          level: 44,
        },
        {
          species: "Machoke",
          level: 46,
        },
        {
          species: "Medicham",
          level: 46,
        },
        {
          species: "Machoke",
          level: 44,
        },
        {
          species: "Medicham",
          level: 44,
        },
      ],
    },
    swarm: ["Machoke", "Floatzel"],
    day: ["Medicham", "Golbat"],
    night: ["Medicham", "Golbat"],
    radar: ["Floatzel", "Steelix", "Machoke", "Medicham"],
    dualSlots: {
      Emerald: ["Machoke", "Medicham"],
      FireRed: ["Machoke", "Medicham"],
      LeafGreen: ["Machoke", "Medicham"],
      Ruby: ["Machoke", "Medicham"],
      Sapphire: ["Machoke", "Medicham"],
    },
  },
  "Victory Road 1F Back 2": {
    location: "Victory Road 1F Back 2",
    grass: {
      rate: 15,
      slots: [
        {
          species: "Machoke",
          level: 51,
        },
        {
          species: "Floatzel",
          level: 51,
        },
        {
          species: "Medicham",
          level: 51,
        },
        {
          species: "Golbat",
          level: 51,
        },
        {
          species: "Floatzel",
          level: 50,
        },
        {
          species: "Steelix",
          level: 52,
        },
        {
          species: "Golbat",
          level: 52,
        },
        {
          species: "Golbat",
          level: 50,
        },
        {
          species: "Machoke",
          level: 52,
        },
        {
          species: "Medicham",
          level: 52,
        },
        {
          species: "Machoke",
          level: 50,
        },
        {
          species: "Medicham",
          level: 50,
        },
      ],
    },
    swarm: ["Machoke", "Floatzel"],
    day: ["Medicham", "Golbat"],
    night: ["Medicham", "Golbat"],
    radar: ["Floatzel", "Steelix", "Machoke", "Medicham"],
    dualSlots: {
      Emerald: ["Machoke", "Medicham"],
      FireRed: ["Machoke", "Medicham"],
      LeafGreen: ["Machoke", "Medicham"],
      Ruby: ["Machoke", "Medicham"],
      Sapphire: ["Machoke", "Medicham"],
    },
  },
  "Victory Road 1F Back 1": {
    location: "Victory Road 1F Back 1",
    grass: {
      rate: 15,
      slots: [
        {
          species: "Machoke",
          level: 51,
        },
        {
          species: "Graveler",
          level: 51,
        },
        {
          species: "Medicham",
          level: 51,
        },
        {
          species: "Golbat",
          level: 51,
        },
        {
          species: "Onix",
          level: 50,
        },
        {
          species: "Steelix",
          level: 52,
        },
        {
          species: "Golbat",
          level: 52,
        },
        {
          species: "Golbat",
          level: 50,
        },
        {
          species: "Machoke",
          level: 52,
        },
        {
          species: "Medicham",
          level: 52,
        },
        {
          species: "Machoke",
          level: 50,
        },
        {
          species: "Medicham",
          level: 50,
        },
      ],
    },
    swarm: ["Machoke", "Graveler"],
    day: ["Medicham", "Golbat"],
    night: ["Medicham", "Golbat"],
    radar: ["Onix", "Steelix", "Machoke", "Medicham"],
    dualSlots: {
      Emerald: ["Machoke", "Medicham"],
      FireRed: ["Machoke", "Medicham"],
      LeafGreen: ["Machoke", "Medicham"],
      Ruby: ["Machoke", "Medicham"],
      Sapphire: ["Machoke", "Medicham"],
    },
  },
  "Victory Road 1F Back 3": {
    location: "Victory Road 1F Back 3",
    grass: {
      rate: 15,
      slots: [
        {
          species: "Machoke",
          level: 51,
        },
        {
          species: "Graveler",
          level: 51,
        },
        {
          species: "Medicham",
          level: 51,
        },
        {
          species: "Golbat",
          level: 51,
        },
        {
          species: "Onix",
          level: 50,
        },
        {
          species: "Steelix",
          level: 52,
        },
        {
          species: "Golbat",
          level: 52,
        },
        {
          species: "Golbat",
          level: 50,
        },
        {
          species: "Machoke",
          level: 52,
        },
        {
          species: "Medicham",
          level: 52,
        },
        {
          species: "Machoke",
          level: 50,
        },
        {
          species: "Medicham",
          level: 50,
        },
      ],
    },
    swarm: ["Machoke", "Graveler"],
    day: ["Medicham", "Golbat"],
    night: ["Medicham", "Golbat"],
    radar: ["Onix", "Steelix", "Machoke", "Medicham"],
    dualSlots: {
      Emerald: ["Machoke", "Medicham"],
      FireRed: ["Machoke", "Medicham"],
      LeafGreen: ["Machoke", "Medicham"],
      Ruby: ["Machoke", "Medicham"],
      Sapphire: ["Machoke", "Medicham"],
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
          species: "Zubat",
          level: 4,
        },
        {
          species: "Geodude",
          level: 5,
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
          species: "Zubat",
          level: 5,
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
          species: "Psyduck",
          level: 5,
        },
        {
          species: "Psyduck",
          level: 5,
        },
      ],
    },
    swarm: ["Zubat", "Zubat"],
    day: ["Geodude", "Geodude"],
    night: ["Geodude", "Geodude"],
    radar: ["Zubat", "Zubat", "Psyduck", "Psyduck"],
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
          species: "Geodude",
          level: 5,
        },
        {
          species: "Geodude",
          level: 5,
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
          species: "Geodude",
          level: 6,
        },
        {
          species: "Geodude",
          level: 6,
        },
        {
          species: "Geodude",
          level: 7,
        },
        {
          species: "Geodude",
          level: 7,
        },
        {
          species: "Geodude",
          level: 8,
        },
        {
          species: "Geodude",
          level: 8,
        },
        {
          species: "Geodude",
          level: 4,
        },
        {
          species: "Geodude",
          level: 4,
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
  "Oreburgh Gate B1F": {
    location: "Oreburgh Gate B1F",
    grass: {
      rate: 10,
      slots: [
        {
          species: "Zubat",
          level: 8,
        },
        {
          species: "Zubat",
          level: 8,
        },
        {
          species: "Psyduck",
          level: 8,
        },
        {
          species: "Geodude",
          level: 9,
        },
        {
          species: "Psyduck",
          level: 9,
        },
        {
          species: "Zubat",
          level: 9,
        },
        {
          species: "Psyduck",
          level: 8,
        },
        {
          species: "Psyduck",
          level: 10,
        },
        {
          species: "Zubat",
          level: 10,
        },
        {
          species: "Zubat",
          level: 10,
        },
        {
          species: "Zubat",
          level: 10,
        },
        {
          species: "Zubat",
          level: 10,
        },
      ],
    },
    swarm: ["Zubat", "Zubat"],
    day: ["Psyduck", "Geodude"],
    night: ["Psyduck", "Geodude"],
    radar: ["Psyduck", "Zubat", "Zubat", "Zubat"],
    dualSlots: {
      Emerald: ["Zubat", "Zubat"],
      FireRed: ["Zubat", "Zubat"],
      LeafGreen: ["Zubat", "Zubat"],
      Ruby: ["Zubat", "Zubat"],
      Sapphire: ["Zubat", "Zubat"],
    },
  },
  "Stark Mountain": {
    location: "Stark Mountain",
    grass: {
      rate: 30,
      slots: [
        {
          species: "Camerupt",
          level: 55,
        },
        {
          species: "Rhydon",
          level: 55,
        },
        {
          species: "Fearow",
          level: 54,
        },
        {
          species: "Graveler",
          level: 54,
        },
        {
          species: "Fearow",
          level: 55,
        },
        {
          species: "Weezing",
          level: 55,
        },
        {
          species: "Skarmory",
          level: 56,
        },
        {
          species: "Graveler",
          level: 56,
        },
        {
          species: "Numel",
          level: 22,
        },
        {
          species: "Rhyhorn",
          level: 22,
        },
        {
          species: "Numel",
          level: 24,
        },
        {
          species: "Rhyhorn",
          level: 24,
        },
      ],
    },
    swarm: ["Camerupt", "Rhydon"],
    day: ["Fearow", "Graveler"],
    night: ["Banette", "Golbat"],
    radar: ["Torkoal", "Torkoal", "Torkoal", "Torkoal"],
    dualSlots: {
      Emerald: ["Gligar", "Gligar"],
      FireRed: ["Numel", "Rhyhorn"],
      LeafGreen: ["Magby", "Magby"],
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
          species: "Graveler",
          level: 55,
        },
        {
          species: "Magcargo",
          level: 55,
        },
        {
          species: "Golbat",
          level: 54,
        },
        {
          species: "Machoke",
          level: 56,
        },
        {
          species: "Magcargo",
          level: 56,
        },
        {
          species: "Weezing",
          level: 56,
        },
        {
          species: "Onix",
          level: 54,
        },
        {
          species: "Camerupt",
          level: 56,
        },
        {
          species: "Geodude",
          level: 25,
        },
        {
          species: "Slugma",
          level: 25,
        },
        {
          species: "Geodude",
          level: 27,
        },
        {
          species: "Slugma",
          level: 27,
        },
      ],
    },
    swarm: ["Graveler", "Magcargo"],
    day: ["Golbat", "Machoke"],
    night: ["Golbat", "Machoke"],
    radar: ["Magcargo", "Weezing", "Geodude", "Slugma"],
    dualSlots: {
      Emerald: ["Geodude", "Slugma"],
      FireRed: ["Geodude", "Slugma"],
      LeafGreen: ["Magby", "Magby"],
      Ruby: ["Geodude", "Slugma"],
      Sapphire: ["Geodude", "Slugma"],
    },
  },
  "Stark Mountain Interior 2": {
    location: "Stark Mountain Interior 2",
    grass: {
      rate: 10,
      slots: [
        {
          species: "Graveler",
          level: 57,
        },
        {
          species: "Magcargo",
          level: 57,
        },
        {
          species: "Golbat",
          level: 56,
        },
        {
          species: "Machoke",
          level: 58,
        },
        {
          species: "Magcargo",
          level: 58,
        },
        {
          species: "Weezing",
          level: 58,
        },
        {
          species: "Onix",
          level: 56,
        },
        {
          species: "Camerupt",
          level: 58,
        },
        {
          species: "Geodude",
          level: 27,
        },
        {
          species: "Slugma",
          level: 27,
        },
        {
          species: "Geodude",
          level: 29,
        },
        {
          species: "Slugma",
          level: 29,
        },
      ],
    },
    swarm: ["Graveler", "Magcargo"],
    day: ["Golbat", "Machoke"],
    night: ["Golbat", "Machoke"],
    radar: ["Magcargo", "Weezing", "Geodude", "Slugma"],
    dualSlots: {
      Emerald: ["Geodude", "Slugma"],
      FireRed: ["Geodude", "Slugma"],
      LeafGreen: ["Magby", "Magby"],
      Ruby: ["Geodude", "Slugma"],
      Sapphire: ["Geodude", "Slugma"],
    },
  },
  "Sendoff Spring": {
    location: "Sendoff Spring",
    grass: {
      rate: 30,
      slots: [
        {
          species: "Bibarel",
          level: 53,
        },
        {
          species: "Bibarel",
          level: 54,
        },
        {
          species: "Staravia",
          level: 53,
        },
        {
          species: "Staravia",
          level: 54,
        },
        {
          species: "Golduck",
          level: 53,
        },
        {
          species: "Golduck",
          level: 54,
        },
        {
          species: "Chimecho",
          level: 52,
        },
        {
          species: "Chimecho",
          level: 54,
        },
        {
          species: "Bibarel",
          level: 52,
        },
        {
          species: "Staravia",
          level: 52,
        },
        {
          species: "Bibarel",
          level: 52,
        },
        {
          species: "Staravia",
          level: 52,
        },
      ],
    },
    swarm: ["Bibarel", "Bibarel"],
    day: ["Staravia", "Staravia"],
    night: ["Noctowl", "Noctowl"],
    radar: ["Golduck", "Golduck", "Bibarel", "Staravia"],
    dualSlots: {
      Emerald: ["Bibarel", "Staravia"],
      FireRed: ["Bibarel", "Staravia"],
      LeafGreen: ["Bibarel", "Staravia"],
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
          species: "Golbat",
          level: 45,
        },
        {
          species: "Bronzong",
          level: 46,
        },
        {
          species: "Haunter",
          level: 45,
        },
        {
          species: "Golbat",
          level: 46,
        },
        {
          species: "Haunter",
          level: 46,
        },
        {
          species: "Bronzong",
          level: 45,
        },
        {
          species: "Haunter",
          level: 44,
        },
        {
          species: "Haunter",
          level: 44,
        },
        {
          species: "Bronzor",
          level: 44,
        },
        {
          species: "Bronzong",
          level: 46,
        },
        {
          species: "Bronzor",
          level: 44,
        },
        {
          species: "Bronzong",
          level: 46,
        },
      ],
    },
    swarm: ["Golbat", "Bronzong"],
    day: ["Haunter", "Golbat"],
    night: ["Haunter", "Golbat"],
    radar: ["Haunter", "Bronzong", "Bronzor", "Bronzong"],
    dualSlots: {
      Emerald: ["Bronzor", "Bronzong"],
      FireRed: ["Bronzor", "Bronzong"],
      LeafGreen: ["Bronzor", "Bronzong"],
      Ruby: ["Solrock", "Solrock"],
      Sapphire: ["Lunatone", "Lunatone"],
    },
  },
  "Snowpoint Temple 1F": {
    location: "Snowpoint Temple 1F",
    grass: {
      rate: 15,
      slots: [
        {
          species: "Golbat",
          level: 51,
        },
        {
          species: "Sneasel",
          level: 51,
        },
        {
          species: "Graveler",
          level: 52,
        },
        {
          species: "Golbat",
          level: 52,
        },
        {
          species: "Sneasel",
          level: 52,
        },
        {
          species: "Onix",
          level: 51,
        },
        {
          species: "Sneasel",
          level: 50,
        },
        {
          species: "Steelix",
          level: 52,
        },
        {
          species: "Onix",
          level: 52,
        },
        {
          species: "Golbat",
          level: 50,
        },
        {
          species: "Onix",
          level: 50,
        },
        {
          species: "Golbat",
          level: 50,
        },
      ],
    },
    swarm: ["Golbat", "Sneasel"],
    day: ["Graveler", "Golbat"],
    night: ["Graveler", "Golbat"],
    radar: ["Sneasel", "Onix", "Onix", "Golbat"],
    dualSlots: {
      Emerald: ["Onix", "Golbat"],
      FireRed: ["Onix", "Golbat"],
      LeafGreen: ["Onix", "Golbat"],
      Ruby: ["Onix", "Golbat"],
      Sapphire: ["Onix", "Golbat"],
    },
  },
  "Snowpoint Temple B1F": {
    location: "Snowpoint Temple B1F",
    grass: {
      rate: 10,
      slots: [
        {
          species: "Golbat",
          level: 53,
        },
        {
          species: "Sneasel",
          level: 53,
        },
        {
          species: "Graveler",
          level: 54,
        },
        {
          species: "Golbat",
          level: 54,
        },
        {
          species: "Sneasel",
          level: 54,
        },
        {
          species: "Steelix",
          level: 53,
        },
        {
          species: "Sneasel",
          level: 52,
        },
        {
          species: "Steelix",
          level: 54,
        },
        {
          species: "Onix",
          level: 53,
        },
        {
          species: "Golbat",
          level: 52,
        },
        {
          species: "Onix",
          level: 52,
        },
        {
          species: "Golbat",
          level: 52,
        },
      ],
    },
    swarm: ["Golbat", "Sneasel"],
    day: ["Graveler", "Golbat"],
    night: ["Graveler", "Golbat"],
    radar: ["Sneasel", "Steelix", "Onix", "Golbat"],
    dualSlots: {
      Emerald: ["Onix", "Golbat"],
      FireRed: ["Onix", "Golbat"],
      LeafGreen: ["Onix", "Golbat"],
      Ruby: ["Onix", "Golbat"],
      Sapphire: ["Onix", "Golbat"],
    },
  },
  "Snowpoint Temple B2F": {
    location: "Snowpoint Temple B2F",
    grass: {
      rate: 10,
      slots: [
        {
          species: "Golbat",
          level: 53,
        },
        {
          species: "Sneasel",
          level: 53,
        },
        {
          species: "Graveler",
          level: 54,
        },
        {
          species: "Golbat",
          level: 54,
        },
        {
          species: "Sneasel",
          level: 54,
        },
        {
          species: "Steelix",
          level: 53,
        },
        {
          species: "Sneasel",
          level: 52,
        },
        {
          species: "Steelix",
          level: 54,
        },
        {
          species: "Onix",
          level: 53,
        },
        {
          species: "Golbat",
          level: 52,
        },
        {
          species: "Onix",
          level: 52,
        },
        {
          species: "Golbat",
          level: 52,
        },
      ],
    },
    swarm: ["Golbat", "Sneasel"],
    day: ["Graveler", "Golbat"],
    night: ["Graveler", "Golbat"],
    radar: ["Sneasel", "Steelix", "Onix", "Golbat"],
    dualSlots: {
      Emerald: ["Onix", "Golbat"],
      FireRed: ["Onix", "Golbat"],
      LeafGreen: ["Onix", "Golbat"],
      Ruby: ["Onix", "Golbat"],
      Sapphire: ["Onix", "Golbat"],
    },
  },
  "Snowpoint Temple B3F": {
    location: "Snowpoint Temple B3F",
    grass: {
      rate: 10,
      slots: [
        {
          species: "Golbat",
          level: 53,
        },
        {
          species: "Sneasel",
          level: 53,
        },
        {
          species: "Graveler",
          level: 54,
        },
        {
          species: "Golbat",
          level: 54,
        },
        {
          species: "Sneasel",
          level: 54,
        },
        {
          species: "Steelix",
          level: 53,
        },
        {
          species: "Sneasel",
          level: 52,
        },
        {
          species: "Steelix",
          level: 54,
        },
        {
          species: "Onix",
          level: 53,
        },
        {
          species: "Golbat",
          level: 52,
        },
        {
          species: "Onix",
          level: 52,
        },
        {
          species: "Golbat",
          level: 52,
        },
      ],
    },
    swarm: ["Golbat", "Sneasel"],
    day: ["Graveler", "Golbat"],
    night: ["Graveler", "Golbat"],
    radar: ["Sneasel", "Steelix", "Onix", "Golbat"],
    dualSlots: {
      Emerald: ["Onix", "Golbat"],
      FireRed: ["Onix", "Golbat"],
      LeafGreen: ["Onix", "Golbat"],
      Ruby: ["Onix", "Golbat"],
      Sapphire: ["Onix", "Golbat"],
    },
  },
  "Snowpoint Temple B4F": {
    location: "Snowpoint Temple B4F",
    grass: {
      rate: 10,
      slots: [
        {
          species: "Golbat",
          level: 55,
        },
        {
          species: "Sneasel",
          level: 55,
        },
        {
          species: "Graveler",
          level: 56,
        },
        {
          species: "Golbat",
          level: 56,
        },
        {
          species: "Sneasel",
          level: 56,
        },
        {
          species: "Steelix",
          level: 55,
        },
        {
          species: "Sneasel",
          level: 54,
        },
        {
          species: "Steelix",
          level: 56,
        },
        {
          species: "Steelix",
          level: 54,
        },
        {
          species: "Golbat",
          level: 54,
        },
        {
          species: "Steelix",
          level: 54,
        },
        {
          species: "Golbat",
          level: 54,
        },
      ],
    },
    swarm: ["Golbat", "Sneasel"],
    day: ["Graveler", "Golbat"],
    night: ["Graveler", "Golbat"],
    radar: ["Sneasel", "Steelix", "Steelix", "Golbat"],
    dualSlots: {
      Emerald: ["Steelix", "Golbat"],
      FireRed: ["Steelix", "Golbat"],
      LeafGreen: ["Steelix", "Golbat"],
      Ruby: ["Steelix", "Golbat"],
      Sapphire: ["Steelix", "Golbat"],
    },
  },
  "Snowpoint Temple B5F": {
    location: "Snowpoint Temple B5F",
    grass: {
      rate: 10,
      slots: [
        {
          species: "Golbat",
          level: 55,
        },
        {
          species: "Sneasel",
          level: 55,
        },
        {
          species: "Graveler",
          level: 56,
        },
        {
          species: "Golbat",
          level: 56,
        },
        {
          species: "Sneasel",
          level: 56,
        },
        {
          species: "Steelix",
          level: 55,
        },
        {
          species: "Sneasel",
          level: 54,
        },
        {
          species: "Steelix",
          level: 56,
        },
        {
          species: "Steelix",
          level: 54,
        },
        {
          species: "Golbat",
          level: 54,
        },
        {
          species: "Steelix",
          level: 54,
        },
        {
          species: "Golbat",
          level: 54,
        },
      ],
    },
    swarm: ["Golbat", "Sneasel"],
    day: ["Graveler", "Golbat"],
    night: ["Graveler", "Golbat"],
    radar: ["Sneasel", "Steelix", "Steelix", "Golbat"],
    dualSlots: {
      Emerald: ["Steelix", "Golbat"],
      FireRed: ["Steelix", "Golbat"],
      LeafGreen: ["Steelix", "Golbat"],
      Ruby: ["Steelix", "Golbat"],
      Sapphire: ["Steelix", "Golbat"],
    },
  },
  "Wayward Cave 1F": {
    location: "Wayward Cave 1F",
    grass: {
      rate: 10,
      slots: [
        {
          species: "Bronzor",
          level: 14,
        },
        {
          species: "Zubat",
          level: 14,
        },
        {
          species: "Geodude",
          level: 15,
        },
        {
          species: "Zubat",
          level: 15,
        },
        {
          species: "Bronzor",
          level: 15,
        },
        {
          species: "Zubat",
          level: 15,
        },
        {
          species: "Bronzor",
          level: 16,
        },
        {
          species: "Bronzor",
          level: 14,
        },
        {
          species: "Geodude",
          level: 16,
        },
        {
          species: "Zubat",
          level: 16,
        },
        {
          species: "Geodude",
          level: 16,
        },
        {
          species: "Zubat",
          level: 16,
        },
      ],
    },
    swarm: ["Bronzor", "Zubat"],
    day: ["Geodude", "Zubat"],
    night: ["Geodude", "Zubat"],
    radar: ["Bronzor", "Zubat", "Geodude", "Zubat"],
    dualSlots: {
      Emerald: ["Geodude", "Zubat"],
      FireRed: ["Geodude", "Zubat"],
      LeafGreen: ["Sandshrew", "Sandshrew"],
      Ruby: ["Geodude", "Zubat"],
      Sapphire: ["Geodude", "Zubat"],
    },
  },
  "Wayward Cave B1F": {
    location: "Wayward Cave B1F",
    grass: {
      rate: 10,
      slots: [
        {
          species: "Bronzor",
          level: 15,
        },
        {
          species: "Zubat",
          level: 15,
        },
        {
          species: "Geodude",
          level: 16,
        },
        {
          species: "Zubat",
          level: 16,
        },
        {
          species: "Bronzor",
          level: 16,
        },
        {
          species: "Gible",
          level: 15,
        },
        {
          species: "Bronzor",
          level: 15,
        },
        {
          species: "Bronzor",
          level: 17,
        },
        {
          species: "Gible",
          level: 16,
        },
        {
          species: "Zubat",
          level: 17,
        },
        {
          species: "Gible",
          level: 17,
        },
        {
          species: "Zubat",
          level: 17,
        },
      ],
    },
    swarm: ["Bronzor", "Zubat"],
    day: ["Geodude", "Zubat"],
    night: ["Geodude", "Zubat"],
    radar: ["Bronzor", "Gible", "Gible", "Zubat"],
    dualSlots: {
      Emerald: ["Gible", "Zubat"],
      FireRed: ["Gible", "Zubat"],
      LeafGreen: ["Sandshrew", "Sandshrew"],
      Ruby: ["Gible", "Zubat"],
      Sapphire: ["Gible", "Zubat"],
    },
  },
  "Ruin Maniac Cave (< 10 Unown)": {
    location: "Ruin Maniac Cave (< 10 Unown)",
    grass: {
      rate: 10,
      slots: [
        {
          species: "Geodude",
          level: 22,
        },
        {
          species: "Geodude",
          level: 22,
        },
        {
          species: "Geodude",
          level: 22,
        },
        {
          species: "Geodude",
          level: 22,
        },
        {
          species: "Geodude",
          level: 22,
        },
        {
          species: "Geodude",
          level: 22,
        },
        {
          species: "Geodude",
          level: 22,
        },
        {
          species: "Geodude",
          level: 22,
        },
        {
          species: "Geodude",
          level: 22,
        },
        {
          species: "Hippopotas",
          level: 22,
        },
        {
          species: "Geodude",
          level: 22,
        },
        {
          species: "Hippopotas",
          level: 23,
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
      rate: 30,
      slots: [
        {
          species: "Staravia",
          level: 17,
        },
        {
          species: "Roselia",
          level: 16,
        },
        {
          species: "Pichu",
          level: 16,
        },
        {
          species: "Pichu",
          level: 16,
        },
        {
          species: "Roselia",
          level: 17,
        },
        {
          species: "Kricketune",
          level: 17,
        },
        {
          species: "Pikachu",
          level: 18,
        },
        {
          species: "Pichu",
          level: 16,
        },
        {
          species: "Pikachu",
          level: 18,
        },
        {
          species: "Pichu",
          level: 16,
        },
        {
          species: "Pikachu",
          level: 18,
        },
        {
          species: "Pichu",
          level: 16,
        },
      ],
    },
    swarm: ["Staravia", "Roselia"],
    day: ["Staravia", "Staravia"],
    night: ["Kricketune", "Kricketune"],
    radar: ["Roselia", "Kricketune", "Pikachu", "Pichu"],
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
          level: 30,
        },
        {
          species: "Graveler",
          level: 31,
        },
        {
          species: "Zubat",
          level: 30,
        },
        {
          species: "Golbat",
          level: 31,
        },
        {
          species: "Geodude",
          level: 29,
        },
        {
          species: "Graveler",
          level: 32,
        },
        {
          species: "Onix",
          level: 32,
        },
        {
          species: "Onix",
          level: 33,
        },
        {
          species: "Geodude",
          level: 31,
        },
        {
          species: "Graveler",
          level: 33,
        },
        {
          species: "Geodude",
          level: 31,
        },
        {
          species: "Graveler",
          level: 33,
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
          level: 30,
        },
        {
          species: "Graveler",
          level: 31,
        },
        {
          species: "Golbat",
          level: 30,
        },
        {
          species: "Golbat",
          level: 31,
        },
        {
          species: "Graveler",
          level: 29,
        },
        {
          species: "Graveler",
          level: 32,
        },
        {
          species: "Onix",
          level: 32,
        },
        {
          species: "Onix",
          level: 33,
        },
        {
          species: "Graveler",
          level: 31,
        },
        {
          species: "Graveler",
          level: 33,
        },
        {
          species: "Geodude",
          level: 31,
        },
        {
          species: "Graveler",
          level: 33,
        },
      ],
    },
    swarm: ["Graveler", "Graveler"],
    day: ["Golbat", "Golbat"],
    night: ["Golbat", "Golbat"],
    radar: ["Graveler", "Graveler", "Geodude", "Graveler"],
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
          level: 30,
        },
        {
          species: "Graveler",
          level: 31,
        },
        {
          species: "Golbat",
          level: 30,
        },
        {
          species: "Golbat",
          level: 31,
        },
        {
          species: "Graveler",
          level: 29,
        },
        {
          species: "Graveler",
          level: 32,
        },
        {
          species: "Onix",
          level: 32,
        },
        {
          species: "Onix",
          level: 33,
        },
        {
          species: "Graveler",
          level: 31,
        },
        {
          species: "Graveler",
          level: 33,
        },
        {
          species: "Geodude",
          level: 31,
        },
        {
          species: "Graveler",
          level: 33,
        },
      ],
    },
    swarm: ["Graveler", "Graveler"],
    day: ["Golbat", "Golbat"],
    night: ["Golbat", "Golbat"],
    radar: ["Graveler", "Graveler", "Geodude", "Graveler"],
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
          species: "Graveler",
          level: 30,
        },
        {
          species: "Onix",
          level: 31,
        },
        {
          species: "Golbat",
          level: 30,
        },
        {
          species: "Golbat",
          level: 31,
        },
        {
          species: "Graveler",
          level: 29,
        },
        {
          species: "Graveler",
          level: 32,
        },
        {
          species: "Onix",
          level: 32,
        },
        {
          species: "Onix",
          level: 33,
        },
        {
          species: "Graveler",
          level: 31,
        },
        {
          species: "Graveler",
          level: 33,
        },
        {
          species: "Geodude",
          level: 31,
        },
        {
          species: "Graveler",
          level: 33,
        },
      ],
    },
    swarm: ["Graveler", "Onix"],
    day: ["Golbat", "Golbat"],
    night: ["Golbat", "Golbat"],
    radar: ["Graveler", "Graveler", "Geodude", "Graveler"],
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
          species: "Graveler",
          level: 31,
        },
        {
          species: "Onix",
          level: 32,
        },
        {
          species: "Golbat",
          level: 31,
        },
        {
          species: "Golbat",
          level: 32,
        },
        {
          species: "Graveler",
          level: 30,
        },
        {
          species: "Onix",
          level: 33,
        },
        {
          species: "Steelix",
          level: 33,
        },
        {
          species: "Steelix",
          level: 34,
        },
        {
          species: "Graveler",
          level: 32,
        },
        {
          species: "Graveler",
          level: 34,
        },
        {
          species: "Geodude",
          level: 32,
        },
        {
          species: "Graveler",
          level: 34,
        },
      ],
    },
    swarm: ["Graveler", "Onix"],
    day: ["Golbat", "Golbat"],
    night: ["Golbat", "Golbat"],
    radar: ["Graveler", "Onix", "Geodude", "Graveler"],
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
          species: "Graveler",
          level: 31,
        },
        {
          species: "Onix",
          level: 32,
        },
        {
          species: "Golbat",
          level: 31,
        },
        {
          species: "Golbat",
          level: 32,
        },
        {
          species: "Graveler",
          level: 30,
        },
        {
          species: "Onix",
          level: 33,
        },
        {
          species: "Steelix",
          level: 33,
        },
        {
          species: "Steelix",
          level: 34,
        },
        {
          species: "Graveler",
          level: 32,
        },
        {
          species: "Graveler",
          level: 34,
        },
        {
          species: "Geodude",
          level: 32,
        },
        {
          species: "Graveler",
          level: 34,
        },
      ],
    },
    swarm: ["Graveler", "Onix"],
    day: ["Golbat", "Golbat"],
    night: ["Golbat", "Golbat"],
    radar: ["Graveler", "Onix", "Geodude", "Graveler"],
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
          level: 12,
        },
        {
          species: "Gastly",
          level: 12,
        },
        {
          species: "Gastly",
          level: 14,
        },
        {
          species: "Gastly",
          level: 14,
        },
        {
          species: "Gastly",
          level: 13,
        },
        {
          species: "Gastly",
          level: 13,
        },
        {
          species: "Gastly",
          level: 13,
        },
        {
          species: "Gastly",
          level: 13,
        },
        {
          species: "Gastly",
          level: 16,
        },
        {
          species: "Gastly",
          level: 16,
        },
        {
          species: "Gastly",
          level: 15,
        },
        {
          species: "Gastly",
          level: 15,
        },
      ],
    },
    swarm: ["Gastly", "Gastly"],
    day: ["Gastly", "Gastly"],
    night: ["Gastly", "Gastly"],
    radar: ["Gastly", "Gastly", "Gastly", "Gastly"],
    dualSlots: {
      Emerald: ["Haunter", "Haunter"],
      FireRed: ["Haunter", "Haunter"],
      LeafGreen: ["Haunter", "Haunter"],
      Ruby: ["Haunter", "Haunter"],
      Sapphire: ["Haunter", "Haunter"],
    },
  },
  "Old Chateau 2F (Eye Room)": {
    location: "Old Chateau 2F (Eye Room)",
    grass: {
      rate: 15,
      slots: [
        {
          species: "Gastly",
          level: 12,
        },
        {
          species: "Gastly",
          level: 12,
        },
        {
          species: "Gastly",
          level: 14,
        },
        {
          species: "Gastly",
          level: 14,
        },
        {
          species: "Gastly",
          level: 13,
        },
        {
          species: "Gastly",
          level: 13,
        },
        {
          species: "Gastly",
          level: 13,
        },
        {
          species: "Gastly",
          level: 13,
        },
        {
          species: "Gastly",
          level: 16,
        },
        {
          species: "Gastly",
          level: 16,
        },
        {
          species: "Gastly",
          level: 15,
        },
        {
          species: "Gastly",
          level: 15,
        },
      ],
    },
    swarm: ["Gastly", "Gastly"],
    day: ["Gastly", "Gastly"],
    night: ["Gastly", "Gastly"],
    radar: ["Gastly", "Gastly", "Gastly", "Gastly"],
    dualSlots: {
      Emerald: ["Gengar", "Haunter"],
      FireRed: ["Gengar", "Haunter"],
      LeafGreen: ["Gengar", "Haunter"],
      Ruby: ["Gengar", "Haunter"],
      Sapphire: ["Gengar", "Haunter"],
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
    swarm: ["Surskit", "Surskit"],
    day: ["Starly", "Bidoof"],
    night: ["Bidoof", "Bidoof"],
    radar: ["Wobbuffet", "Wobbuffet", "Wobbuffet", "Wobbuffet"],
    dualSlots: {
      Emerald: ["Bibarel", "Staravia"],
      FireRed: ["Bibarel", "Staravia"],
      LeafGreen: ["Bibarel", "Staravia"],
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
    swarm: ["Surskit", "Surskit"],
    day: ["Starly", "Bidoof"],
    night: ["Bidoof", "Bidoof"],
    radar: ["Wobbuffet", "Wobbuffet", "Wobbuffet", "Wobbuffet"],
    dualSlots: {
      Emerald: ["Bibarel", "Staravia"],
      FireRed: ["Bibarel", "Staravia"],
      LeafGreen: ["Bibarel", "Staravia"],
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
          species: "Bibarel",
          level: 34,
        },
        {
          species: "Bibarel",
          level: 36,
        },
        {
          species: "Staravia",
          level: 34,
        },
        {
          species: "Staravia",
          level: 36,
        },
        {
          species: "Psyduck",
          level: 35,
        },
        {
          species: "Psyduck",
          level: 36,
        },
        {
          species: "Chingling",
          level: 35,
        },
        {
          species: "Chingling",
          level: 36,
        },
        {
          species: "Bibarel",
          level: 35,
        },
        {
          species: "Staravia",
          level: 35,
        },
        {
          species: "Bibarel",
          level: 35,
        },
        {
          species: "Staravia",
          level: 35,
        },
      ],
    },
    swarm: ["Lickitung", "Lickitung"],
    day: ["Staravia", "Staravia"],
    night: ["Noctowl", "Noctowl"],
    radar: ["Wobbuffet", "Wobbuffet", "Wobbuffet", "Wobbuffet"],
    dualSlots: {
      Emerald: ["Bibarel", "Staravia"],
      FireRed: ["Bibarel", "Staravia"],
      LeafGreen: ["Bibarel", "Staravia"],
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
          species: "Bibarel",
          level: 35,
        },
        {
          species: "Sneasel",
          level: 35,
        },
        {
          species: "Bibarel",
          level: 34,
        },
        {
          species: "Psyduck",
          level: 36,
        },
        {
          species: "Psyduck",
          level: 34,
        },
        {
          species: "Psyduck",
          level: 35,
        },
        {
          species: "Chingling",
          level: 34,
        },
        {
          species: "Chingling",
          level: 36,
        },
        {
          species: "Bibarel",
          level: 34,
        },
        {
          species: "Sneasel",
          level: 36,
        },
        {
          species: "Bibarel",
          level: 34,
        },
        {
          species: "Sneasel",
          level: 36,
        },
      ],
    },
    swarm: ["Smoochum", "Smoochum"],
    day: ["Bibarel", "Psyduck"],
    night: ["Noctowl", "Noctowl"],
    radar: ["Wobbuffet", "Wobbuffet", "Wobbuffet", "Wobbuffet"],
    dualSlots: {
      Emerald: ["Ursaring", "Ursaring"],
      FireRed: ["Bibarel", "Sneasel"],
      LeafGreen: ["Bibarel", "Sneasel"],
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
          level: 21,
        },
        {
          species: "Geodude",
          level: 20,
        },
        {
          species: "Staravia",
          level: 21,
        },
        {
          species: "Graveler",
          level: 21,
        },
        {
          species: "Bibarel",
          level: 21,
        },
        {
          species: "Girafarig",
          level: 22,
        },
        {
          species: "Kricketune",
          level: 22,
        },
        {
          species: "Staravia",
          level: 22,
        },
        {
          species: "Bibarel",
          level: 22,
        },
        {
          species: "Graveler",
          level: 22,
        },
        {
          species: "Bibarel",
          level: 22,
        },
        {
          species: "Graveler",
          level: 22,
        },
      ],
    },
    swarm: ["Girafarig", "Geodude"],
    day: ["Staravia", "Graveler"],
    night: ["Kricketune", "Kricketune"],
    radar: ["Nidorina", "Nidorina", "Nidorino", "Nidorino"],
    dualSlots: {
      Emerald: ["Bibarel", "Graveler"],
      FireRed: ["Bibarel", "Graveler"],
      LeafGreen: ["Bibarel", "Graveler"],
      Ruby: ["Bibarel", "Graveler"],
      Sapphire: ["Bibarel", "Graveler"],
    },
  },
  "Acuity Lakefront": {
    location: "Acuity Lakefront",
    grass: {
      rate: 30,
      slots: [
        {
          species: "Snover",
          level: 34,
        },
        {
          species: "Sneasel",
          level: 34,
        },
        {
          species: "Meditite",
          level: 35,
        },
        {
          species: "Machoke",
          level: 35,
        },
        {
          species: "Medicham",
          level: 35,
        },
        {
          species: "Machoke",
          level: 36,
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
          species: "Medicham",
          level: 36,
        },
        {
          species: "Medicham",
          level: 36,
        },
        {
          species: "Medicham",
          level: 36,
        },
        {
          species: "Medicham",
          level: 36,
        },
      ],
    },
    swarm: ["Snover", "Sneasel"],
    day: ["Meditite", "Machoke"],
    night: ["Zubat", "Noctowl"],
    radar: ["Snorunt", "Snorunt", "Snorunt", "Snorunt"],
    dualSlots: {
      Emerald: ["Teddiursa", "Teddiursa"],
      FireRed: ["Medicham", "Medicham"],
      LeafGreen: ["Medicham", "Medicham"],
      Ruby: ["Medicham", "Medicham"],
      Sapphire: ["Medicham", "Medicham"],
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
    night: ["Bidoof", "Bidoof"],
    radar: ["NidoranF", "NidoranF", "NidoranM", "NidoranM"],
    dualSlots: {
      Emerald: ["Starly", "Starly"],
      FireRed: ["Growlithe", "Growlithe"],
      LeafGreen: ["Starly", "Starly"],
      Ruby: ["Starly", "Starly"],
      Sapphire: ["Starly", "Starly"],
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
          species: "Starly",
          level: 3,
        },
        {
          species: "Shinx",
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
    day: ["Starly", "Starly"],
    night: ["Kricketot", "Kricketot"],
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
          level: 4,
        },
        {
          species: "Abra",
          level: 5,
        },
        {
          species: "Abra",
          level: 4,
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
    swarm: ["Cubone", "Cubone"],
    day: ["Starly", "Starly"],
    night: ["Zubat", "Kricketot"],
    radar: ["Ralts", "Ralts", "Ralts", "Kirlia"],
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
          species: "Budew",
          level: 4,
        },
        {
          species: "Kricketot",
          level: 4,
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
          level: 6,
        },
        {
          species: "Bidoof",
          level: 6,
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
    day: ["Budew", "Starly"],
    night: ["Zubat", "Kricketot"],
    radar: ["Ralts", "Ralts", "Ralts", "Kirlia"],
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
          level: 6,
        },
        {
          species: "Bidoof",
          level: 6,
        },
        {
          species: "Budew",
          level: 6,
        },
        {
          species: "Kricketot",
          level: 6,
        },
        {
          species: "Budew",
          level: 6,
        },
        {
          species: "Shinx",
          level: 6,
        },
        {
          species: "Budew",
          level: 7,
        },
        {
          species: "Shinx",
          level: 7,
        },
        {
          species: "Starly",
          level: 8,
        },
        {
          species: "Bidoof",
          level: 8,
        },
        {
          species: "Starly",
          level: 8,
        },
        {
          species: "Bidoof",
          level: 8,
        },
      ],
    },
    swarm: ["Starly", "Bidoof"],
    day: ["Budew", "Starly"],
    night: ["Zubat", "Kricketot"],
    radar: ["Sunkern", "Sunkern", "Sunkern", "Sunkern"],
    dualSlots: {
      Emerald: ["Pineco", "Pineco"],
      FireRed: ["Starly", "Bidoof"],
      LeafGreen: ["Starly", "Bidoof"],
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
          species: "Buizel",
          level: 8,
        },
        {
          species: "Shellos_West",
          level: 8,
        },
        {
          species: "Buizel",
          level: 9,
        },
        {
          species: "Shellos_West",
          level: 9,
        },
        {
          species: "Bidoof",
          level: 9,
        },
        {
          species: "Shellos_West",
          level: 9,
        },
        {
          species: "Pachirisu",
          level: 9,
        },
        {
          species: "Pachirisu",
          level: 9,
        },
        {
          species: "Buizel",
          level: 10,
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
          level: 10,
        },
      ],
    },
    swarm: ["Buizel", "Shellos_West"],
    day: ["Buizel", "Shellos_West"],
    night: ["Buizel", "Shellos_West"],
    radar: ["Hoppip", "Hoppip", "Hoppip", "Hoppip"],
    dualSlots: {
      Emerald: ["Buizel", "Shellos_West"],
      FireRed: ["Elekid", "Elekid"],
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
          species: "Buizel",
          level: 10,
        },
        {
          species: "Bidoof",
          level: 10,
        },
        {
          species: "Buizel",
          level: 11,
        },
        {
          species: "Bidoof",
          level: 11,
        },
        {
          species: "Shellos_West",
          level: 11,
        },
        {
          species: "Bidoof",
          level: 11,
        },
        {
          species: "Pachirisu",
          level: 11,
        },
        {
          species: "Pachirisu",
          level: 11,
        },
        {
          species: "Buizel",
          level: 12,
        },
        {
          species: "Bidoof",
          level: 12,
        },
        {
          species: "Buizel",
          level: 12,
        },
        {
          species: "Bidoof",
          level: 12,
        },
      ],
    },
    swarm: ["Buizel", "Bidoof"],
    day: ["Buizel", "Bidoof"],
    night: ["Buizel", "Bidoof"],
    radar: ["Hoppip", "Hoppip", "Skiploom", "Skiploom"],
    dualSlots: {
      Emerald: ["Buizel", "Bidoof"],
      FireRed: ["Buizel", "Bidoof"],
      LeafGreen: ["Buizel", "Bidoof"],
      Ruby: ["Buizel", "Bidoof"],
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
          level: 14,
        },
        {
          species: "Stunky",
          level: 14,
        },
        {
          species: "Ponyta",
          level: 15,
        },
        {
          species: "Kricketot",
          level: 14,
        },
        {
          species: "Geodude",
          level: 14,
        },
        {
          species: "Kricketune",
          level: 15,
        },
        {
          species: "Bronzor",
          level: 15,
        },
        {
          species: "Bronzor",
          level: 15,
        },
        {
          species: "Ponyta",
          level: 15,
        },
        {
          species: "Stunky",
          level: 15,
        },
        {
          species: "Ponyta",
          level: 16,
        },
        {
          species: "Stunky",
          level: 16,
        },
      ],
    },
    swarm: ["Nosepass", "Nosepass"],
    day: ["Ponyta", "Ponyta"],
    night: ["Zubat", "Kricketune"],
    radar: ["Baltoy", "Baltoy", "Baltoy", "Baltoy"],
    dualSlots: {
      Emerald: ["Gligar", "Gligar"],
      FireRed: ["Ponyta", "Stunky"],
      LeafGreen: ["Ponyta", "Stunky"],
      Ruby: ["Ponyta", "Stunky"],
      Sapphire: ["Ponyta", "Stunky"],
    },
  },
  "Route 207": {
    location: "Route 207",
    grass: {
      rate: 30,
      slots: [
        {
          species: "Machop",
          level: 5,
        },
        {
          species: "Geodude",
          level: 5,
        },
        {
          species: "Machop",
          level: 6,
        },
        {
          species: "Kricketot",
          level: 6,
        },
        {
          species: "Geodude",
          level: 6,
        },
        {
          species: "Geodude",
          level: 6,
        },
        {
          species: "Geodude",
          level: 7,
        },
        {
          species: "Geodude",
          level: 7,
        },
        {
          species: "Machop",
          level: 7,
        },
        {
          species: "Geodude",
          level: 7,
        },
        {
          species: "Machop",
          level: 7,
        },
        {
          species: "Geodude",
          level: 7,
        },
      ],
    },
    swarm: ["Phanpy", "Phanpy"],
    day: ["Machop", "Machop"],
    night: ["Zubat", "Kricketot"],
    radar: ["Larvitar", "Larvitar", "Larvitar", "Larvitar"],
    dualSlots: {
      Emerald: ["Gligar", "Gligar"],
      FireRed: ["Machop", "Geodude"],
      LeafGreen: ["Machop", "Geodude"],
      Ruby: ["Machop", "Geodude"],
      Sapphire: ["Machop", "Geodude"],
    },
  },
  "Route 208": {
    location: "Route 208",
    grass: {
      rate: 30,
      slots: [
        {
          species: "Psyduck",
          level: 16,
        },
        {
          species: "Bidoof",
          level: 16,
        },
        {
          species: "Meditite",
          level: 16,
        },
        {
          species: "Machop",
          level: 16,
        },
        {
          species: "Meditite",
          level: 17,
        },
        {
          species: "Machop",
          level: 17,
        },
        {
          species: "Psyduck",
          level: 17,
        },
        {
          species: "Bibarel",
          level: 17,
        },
        {
          species: "Psyduck",
          level: 18,
        },
        {
          species: "Bibarel",
          level: 18,
        },
        {
          species: "Psyduck",
          level: 18,
        },
        {
          species: "Bibarel",
          level: 18,
        },
      ],
    },
    swarm: ["Dunsparce", "Dunsparce"],
    day: ["Meditite", "Machop"],
    night: ["Zubat", "Zubat"],
    radar: ["Tyrogue", "Tyrogue", "Tyrogue", "Tyrogue"],
    dualSlots: {
      Emerald: ["Psyduck", "Bibarel"],
      FireRed: ["Psyduck", "Bibarel"],
      LeafGreen: ["Psyduck", "Bibarel"],
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
          species: "Starly",
          level: 16,
        },
        {
          species: "Bibarel",
          level: 16,
        },
        {
          species: "MimeJr",
          level: 16,
        },
        {
          species: "MimeJr",
          level: 16,
        },
        {
          species: "Bibarel",
          level: 17,
        },
        {
          species: "Staravia",
          level: 17,
        },
        {
          species: "Bibarel",
          level: 18,
        },
        {
          species: "Staravia",
          level: 18,
        },
        {
          species: "Chansey",
          level: 16,
        },
        {
          species: "MimeJr",
          level: 16,
        },
        {
          species: "Chansey",
          level: 16,
        },
        {
          species: "MimeJr",
          level: 16,
        },
      ],
    },
    swarm: ["Snubbull", "Snubbull"],
    day: ["Staravia", "Bibarel"],
    night: ["Gastly", "Zubat"],
    radar: ["Tauros", "Tauros", "Miltank", "Miltank"],
    dualSlots: {
      Emerald: ["Chansey", "MimeJr"],
      FireRed: ["Chansey", "MimeJr"],
      LeafGreen: ["Vulpix", "Vulpix"],
      Ruby: ["Chansey", "MimeJr"],
      Sapphire: ["Chansey", "MimeJr"],
    },
  },
  "Lost Tower 1F": {
    location: "Lost Tower 1F",
    grass: {
      rate: 10,
      slots: [
        {
          species: "Gastly",
          level: 16,
        },
        {
          species: "Zubat",
          level: 16,
        },
        {
          species: "Gastly",
          level: 17,
        },
        {
          species: "Zubat",
          level: 17,
        },
        {
          species: "Gastly",
          level: 17,
        },
        {
          species: "Zubat",
          level: 17,
        },
        {
          species: "Gastly",
          level: 18,
        },
        {
          species: "Zubat",
          level: 18,
        },
        {
          species: "Gastly",
          level: 18,
        },
        {
          species: "Zubat",
          level: 18,
        },
        {
          species: "Gastly",
          level: 18,
        },
        {
          species: "Zubat",
          level: 18,
        },
      ],
    },
    swarm: ["Gastly", "Zubat"],
    day: ["Gastly", "Zubat"],
    night: ["Murkrow", "Murkrow"],
    radar: ["Gastly", "Zubat", "Gastly", "Zubat"],
    dualSlots: {
      Emerald: ["Gastly", "Zubat"],
      FireRed: ["Gastly", "Zubat"],
      LeafGreen: ["Gastly", "Zubat"],
      Ruby: ["Gastly", "Zubat"],
      Sapphire: ["Gastly", "Zubat"],
    },
  },
  "Lost Tower 2F": {
    location: "Lost Tower 2F",
    grass: {
      rate: 10,
      slots: [
        {
          species: "Gastly",
          level: 17,
        },
        {
          species: "Zubat",
          level: 17,
        },
        {
          species: "Gastly",
          level: 18,
        },
        {
          species: "Zubat",
          level: 18,
        },
        {
          species: "Gastly",
          level: 18,
        },
        {
          species: "Zubat",
          level: 18,
        },
        {
          species: "Gastly",
          level: 19,
        },
        {
          species: "Zubat",
          level: 19,
        },
        {
          species: "Gastly",
          level: 19,
        },
        {
          species: "Zubat",
          level: 19,
        },
        {
          species: "Gastly",
          level: 19,
        },
        {
          species: "Zubat",
          level: 19,
        },
      ],
    },
    swarm: ["Gastly", "Zubat"],
    day: ["Gastly", "Zubat"],
    night: ["Murkrow", "Murkrow"],
    radar: ["Gastly", "Zubat", "Gastly", "Zubat"],
    dualSlots: {
      Emerald: ["Gastly", "Zubat"],
      FireRed: ["Gastly", "Zubat"],
      LeafGreen: ["Gastly", "Zubat"],
      Ruby: ["Gastly", "Zubat"],
      Sapphire: ["Gastly", "Zubat"],
    },
  },
  "Lost Tower 3F": {
    location: "Lost Tower 3F",
    grass: {
      rate: 10,
      slots: [
        {
          species: "Gastly",
          level: 18,
        },
        {
          species: "Zubat",
          level: 18,
        },
        {
          species: "Gastly",
          level: 19,
        },
        {
          species: "Zubat",
          level: 19,
        },
        {
          species: "Gastly",
          level: 19,
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
          species: "Zubat",
          level: 20,
        },
        {
          species: "Gastly",
          level: 20,
        },
        {
          species: "Zubat",
          level: 20,
        },
        {
          species: "Gastly",
          level: 20,
        },
        {
          species: "Golbat",
          level: 19,
        },
      ],
    },
    swarm: ["Gastly", "Zubat"],
    day: ["Gastly", "Zubat"],
    night: ["Murkrow", "Murkrow"],
    radar: ["Gastly", "Zubat", "Gastly", "Golbat"],
    dualSlots: {
      Emerald: ["Gastly", "Zubat"],
      FireRed: ["Gastly", "Zubat"],
      LeafGreen: ["Gastly", "Zubat"],
      Ruby: ["Gastly", "Zubat"],
      Sapphire: ["Gastly", "Zubat"],
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
          level: 19,
        },
        {
          species: "Gastly",
          level: 20,
        },
        {
          species: "Zubat",
          level: 20,
        },
        {
          species: "Gastly",
          level: 20,
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
          species: "Zubat",
          level: 21,
        },
        {
          species: "Gastly",
          level: 21,
        },
        {
          species: "Golbat",
          level: 20,
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
    day: ["Gastly", "Zubat"],
    night: ["Murkrow", "Murkrow"],
    radar: ["Gastly", "Zubat", "Gastly", "Golbat"],
    dualSlots: {
      Emerald: ["Gastly", "Golbat"],
      FireRed: ["Gastly", "Golbat"],
      LeafGreen: ["Gastly", "Golbat"],
      Ruby: ["Gastly", "Golbat"],
      Sapphire: ["Gastly", "Golbat"],
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
          level: 20,
        },
        {
          species: "Gastly",
          level: 21,
        },
        {
          species: "Zubat",
          level: 21,
        },
        {
          species: "Gastly",
          level: 21,
        },
        {
          species: "Zubat",
          level: 21,
        },
        {
          species: "Gastly",
          level: 22,
        },
        {
          species: "Golbat",
          level: 21,
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
          level: 23,
        },
      ],
    },
    swarm: ["Gastly", "Zubat"],
    day: ["Gastly", "Zubat"],
    night: ["Murkrow", "Murkrow"],
    radar: ["Gastly", "Zubat", "Gastly", "Golbat"],
    dualSlots: {
      Emerald: ["Gastly", "Golbat"],
      FireRed: ["Gastly", "Golbat"],
      LeafGreen: ["Gastly", "Golbat"],
      Ruby: ["Gastly", "Golbat"],
      Sapphire: ["Gastly", "Golbat"],
    },
  },
  "Route 210 (South)": {
    location: "Route 210 (South)",
    grass: {
      rate: 30,
      slots: [
        {
          species: "Ponyta",
          level: 19,
        },
        {
          species: "Geodude",
          level: 19,
        },
        {
          species: "MimeJr",
          level: 18,
        },
        {
          species: "MimeJr",
          level: 18,
        },
        {
          species: "Geodude",
          level: 19,
        },
        {
          species: "Kricketune",
          level: 19,
        },
        {
          species: "Ponyta",
          level: 18,
        },
        {
          species: "Ponyta",
          level: 20,
        },
        {
          species: "Chansey",
          level: 18,
        },
        {
          species: "MimeJr",
          level: 20,
        },
        {
          species: "Chansey",
          level: 20,
        },
        {
          species: "MimeJr",
          level: 20,
        },
      ],
    },
    swarm: ["Ponyta", "Geodude"],
    day: ["Ponyta", "Ponyta"],
    night: ["Kricketune", "Kricketune"],
    radar: ["Tauros", "Tauros", "Miltank", "Miltank"],
    dualSlots: {
      Emerald: ["Pineco", "Pineco"],
      FireRed: ["Chansey", "MimeJr"],
      LeafGreen: ["Chansey", "MimeJr"],
      Ruby: ["Seedot", "Nuzleaf"],
      Sapphire: ["Chansey", "MimeJr"],
    },
  },
  "Route 210 (North)": {
    location: "Route 210 (North)",
    grass: {
      rate: 30,
      slots: [
        {
          species: "Psyduck",
          level: 25,
        },
        {
          species: "Bibarel",
          level: 24,
        },
        {
          species: "Meditite",
          level: 24,
        },
        {
          species: "Machop",
          level: 25,
        },
        {
          species: "Meditite",
          level: 25,
        },
        {
          species: "Machop",
          level: 26,
        },
        {
          species: "Machoke",
          level: 26,
        },
        {
          species: "Meditite",
          level: 25,
        },
        {
          species: "Machoke",
          level: 26,
        },
        {
          species: "Meditite",
          level: 26,
        },
        {
          species: "Machoke",
          level: 26,
        },
        {
          species: "Meditite",
          level: 26,
        },
      ],
    },
    swarm: ["Psyduck", "Bibarel"],
    day: ["Meditite", "Machop"],
    night: ["Hoothoot", "Noctowl"],
    radar: ["Kecleon", "Kecleon", "Kecleon", "Kecleon"],
    dualSlots: {
      Emerald: ["Machoke", "Meditite"],
      FireRed: ["Machoke", "Meditite"],
      LeafGreen: ["Machoke", "Meditite"],
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
          level: 13,
        },
        {
          species: "Meditite",
          level: 12,
        },
        {
          species: "Bidoof",
          level: 14,
        },
        {
          species: "Geodude",
          level: 13,
        },
        {
          species: "Ponyta",
          level: 13,
        },
        {
          species: "Chingling",
          level: 13,
        },
        {
          species: "Chingling",
          level: 13,
        },
        {
          species: "Bidoof",
          level: 12,
        },
        {
          species: "Meditite",
          level: 14,
        },
        {
          species: "Bidoof",
          level: 12,
        },
        {
          species: "Meditite",
          level: 14,
        },
      ],
    },
    swarm: ["Meditite", "Bidoof"],
    day: ["Meditite", "Bidoof"],
    night: ["Zubat", "Hoothoot"],
    radar: ["Tyrogue", "Tyrogue", "Tyrogue", "Tyrogue"],
    dualSlots: {
      Emerald: ["Teddiursa", "Teddiursa"],
      FireRed: ["Bidoof", "Meditite"],
      LeafGreen: ["Bidoof", "Meditite"],
      Ruby: ["Bidoof", "Meditite"],
      Sapphire: ["Bidoof", "Meditite"],
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
          level: 27,
        },
        {
          species: "Ponyta",
          level: 26,
        },
        {
          species: "Machoke",
          level: 28,
        },
        {
          species: "Machoke",
          level: 27,
        },
        {
          species: "Meditite",
          level: 28,
        },
        {
          species: "Chingling",
          level: 27,
        },
        {
          species: "Chingling",
          level: 28,
        },
        {
          species: "Meditite",
          level: 28,
        },
        {
          species: "Ponyta",
          level: 27,
        },
        {
          species: "Meditite",
          level: 28,
        },
        {
          species: "Ponyta",
          level: 28,
        },
      ],
    },
    swarm: ["Meditite", "Graveler"],
    day: ["Ponyta", "Machoke"],
    night: ["Zubat", "Noctowl"],
    radar: ["Swablu", "Swablu", "Swablu", "Swablu"],
    dualSlots: {
      Emerald: ["Teddiursa", "Teddiursa"],
      FireRed: ["Meditite", "Ponyta"],
      LeafGreen: ["Meditite", "Ponyta"],
      Ruby: ["Meditite", "Ponyta"],
      Sapphire: ["Meditite", "Ponyta"],
    },
  },
  "Route 212 (North)": {
    location: "Route 212 (North)",
    grass: {
      rate: 30,
      slots: [
        {
          species: "Starly",
          level: 16,
        },
        {
          species: "Budew",
          level: 16,
        },
        {
          species: "Staravia",
          level: 17,
        },
        {
          species: "Kricketune",
          level: 17,
        },
        {
          species: "Roselia",
          level: 16,
        },
        {
          species: "Budew",
          level: 16,
        },
        {
          species: "Roselia",
          level: 17,
        },
        {
          species: "Staravia",
          level: 18,
        },
        {
          species: "Kricketune",
          level: 17,
        },
        {
          species: "Kricketune",
          level: 17,
        },
        {
          species: "Kricketune",
          level: 18,
        },
        {
          species: "Kricketune",
          level: 18,
        },
      ],
    },
    swarm: ["Starly", "Budew"],
    day: ["Staravia", "Staravia"],
    night: ["Kricketune", "Kricketune"],
    radar: ["Smeargle", "Smeargle", "Smeargle", "Smeargle"],
    dualSlots: {
      Emerald: ["Kricketune", "Kricketune"],
      FireRed: ["Kricketune", "Kricketune"],
      LeafGreen: ["Kricketune", "Kricketune"],
      Ruby: ["Kricketune", "Kricketune"],
      Sapphire: ["Kricketune", "Kricketune"],
    },
  },
  "Route 212 (South)": {
    location: "Route 212 (South)",
    grass: {
      rate: 30,
      slots: [
        {
          species: "Wooper",
          level: 18,
        },
        {
          species: "Bibarel",
          level: 18,
        },
        {
          species: "Roselia",
          level: 19,
        },
        {
          species: "Bibarel",
          level: 19,
        },
        {
          species: "Kricketune",
          level: 18,
        },
        {
          species: "Roselia",
          level: 18,
        },
        {
          species: "Roselia",
          level: 20,
        },
        {
          species: "Wooper",
          level: 18,
        },
        {
          species: "Bibarel",
          level: 20,
        },
        {
          species: "Wooper",
          level: 18,
        },
        {
          species: "Bibarel",
          level: 20,
        },
        {
          species: "Wooper",
          level: 18,
        },
      ],
    },
    swarm: ["Wooper", "Bibarel"],
    day: ["Roselia", "Bibarel"],
    night: ["Kricketune", "Kricketune"],
    radar: ["Grimer", "Grimer", "Grimer", "Grimer"],
    dualSlots: {
      Emerald: ["Bibarel", "Wooper"],
      FireRed: ["Ekans", "Ekans"],
      LeafGreen: ["Bibarel", "Wooper"],
      Ruby: ["Bibarel", "Wooper"],
      Sapphire: ["Lombre", "Lotad"],
    },
  },
  "Route 213": {
    location: "Route 213",
    grass: {
      rate: 30,
      slots: [
        {
          species: "Buizel",
          level: 20,
        },
        {
          species: "Shellos_West",
          level: 20,
        },
        {
          species: "Buizel",
          level: 21,
        },
        {
          species: "Wingull",
          level: 20,
        },
        {
          species: "Shellos_West",
          level: 21,
        },
        {
          species: "Wingull",
          level: 20,
        },
        {
          species: "Floatzel",
          level: 22,
        },
        {
          species: "Shellos_West",
          level: 22,
        },
        {
          species: "Floatzel",
          level: 22,
        },
        {
          species: "Shellos_West",
          level: 22,
        },
        {
          species: "Floatzel",
          level: 22,
        },
        {
          species: "Shellos_West",
          level: 22,
        },
      ],
    },
    swarm: ["Absol", "Absol"],
    day: ["Buizel", "Wingull"],
    night: ["Buizel", "Shellos_West"],
    radar: ["Swellow", "Swellow", "Swellow", "Swellow"],
    dualSlots: {
      Emerald: ["Floatzel", "Shellos_West"],
      FireRed: ["Floatzel", "Shellos_West"],
      LeafGreen: ["Floatzel", "Shellos_West"],
      Ruby: ["Floatzel", "Shellos_West"],
      Sapphire: ["Floatzel", "Shellos_West"],
    },
  },
  "Route 214": {
    location: "Route 214",
    grass: {
      rate: 30,
      slots: [
        {
          species: "Ponyta",
          level: 23,
        },
        {
          species: "Geodude",
          level: 22,
        },
        {
          species: "Ponyta",
          level: 23,
        },
        {
          species: "Graveler",
          level: 23,
        },
        {
          species: "Stunky",
          level: 23,
        },
        {
          species: "Girafarig",
          level: 24,
        },
        {
          species: "Kricketune",
          level: 24,
        },
        {
          species: "Ponyta",
          level: 24,
        },
        {
          species: "Stunky",
          level: 24,
        },
        {
          species: "Graveler",
          level: 24,
        },
        {
          species: "Stunky",
          level: 24,
        },
        {
          species: "Graveler",
          level: 24,
        },
      ],
    },
    swarm: ["Spoink", "Spoink"],
    day: ["Ponyta", "Graveler"],
    night: ["Kricketune", "Kricketune"],
    radar: ["Mightyena", "Mightyena", "Mightyena", "Mightyena"],
    dualSlots: {
      Emerald: ["Gligar", "Gligar"],
      FireRed: ["Stunky", "Graveler"],
      LeafGreen: ["Vulpix", "Vulpix"],
      Ruby: ["Stunky", "Graveler"],
      Sapphire: ["Stunky", "Graveler"],
    },
  },
  "Route 215": {
    location: "Route 215",
    grass: {
      rate: 30,
      slots: [
        {
          species: "Ponyta",
          level: 21,
        },
        {
          species: "Geodude",
          level: 20,
        },
        {
          species: "Ponyta",
          level: 22,
        },
        {
          species: "Geodude",
          level: 21,
        },
        {
          species: "Abra",
          level: 20,
        },
        {
          species: "Kricketune",
          level: 20,
        },
        {
          species: "Kadabra",
          level: 20,
        },
        {
          species: "Kadabra",
          level: 21,
        },
        {
          species: "Geodude",
          level: 22,
        },
        {
          species: "Kadabra",
          level: 22,
        },
        {
          species: "Geodude",
          level: 22,
        },
        {
          species: "Kadabra",
          level: 22,
        },
      ],
    },
    swarm: ["Drowzee", "Drowzee"],
    day: ["Ponyta", "Ponyta"],
    night: ["Kricketune", "Kricketune"],
    radar: ["Mightyena", "Mightyena", "Mightyena", "Mightyena"],
    dualSlots: {
      Emerald: ["Gligar", "Gligar"],
      FireRed: ["Geodude", "Kadabra"],
      LeafGreen: ["Geodude", "Kadabra"],
      Ruby: ["Geodude", "Kadabra"],
      Sapphire: ["Geodude", "Kadabra"],
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
          level: 32,
        },
        {
          species: "Meditite",
          level: 33,
        },
        {
          species: "Machoke",
          level: 33,
        },
        {
          species: "Meditite",
          level: 34,
        },
        {
          species: "Machoke",
          level: 34,
        },
        {
          species: "Snover",
          level: 33,
        },
        {
          species: "Sneasel",
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
          species: "Graveler",
          level: 33,
        },
        {
          species: "Graveler",
          level: 34,
        },
      ],
    },
    swarm: ["Delibird", "Delibird"],
    day: ["Meditite", "Machoke"],
    night: ["Zubat", "Noctowl"],
    radar: ["Snorunt", "Snorunt", "Snorunt", "Snorunt"],
    dualSlots: {
      Emerald: ["Ursaring", "Ursaring"],
      FireRed: ["Graveler", "Graveler"],
      LeafGreen: ["Graveler", "Graveler"],
      Ruby: ["Graveler", "Graveler"],
      Sapphire: ["Graveler", "Graveler"],
    },
  },
  "Route 217": {
    location: "Route 217",
    grass: {
      rate: 30,
      slots: [
        {
          species: "Snover",
          level: 34,
        },
        {
          species: "Sneasel",
          level: 34,
        },
        {
          species: "Meditite",
          level: 35,
        },
        {
          species: "Machoke",
          level: 35,
        },
        {
          species: "Medicham",
          level: 35,
        },
        {
          species: "Machoke",
          level: 36,
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
          species: "Medicham",
          level: 36,
        },
        {
          species: "Medicham",
          level: 36,
        },
        {
          species: "Medicham",
          level: 36,
        },
        {
          species: "Medicham",
          level: 36,
        },
      ],
    },
    swarm: ["Swinub", "Swinub"],
    day: ["Meditite", "Machoke"],
    night: ["Zubat", "Noctowl"],
    radar: ["Snorunt", "Snorunt", "Snorunt", "Snorunt"],
    dualSlots: {
      Emerald: ["Ursaring", "Ursaring"],
      FireRed: ["Medicham", "Medicham"],
      LeafGreen: ["Medicham", "Medicham"],
      Ruby: ["Medicham", "Medicham"],
      Sapphire: ["Medicham", "Medicham"],
    },
  },
  "Route 218": {
    location: "Route 218",
    grass: {
      rate: 30,
      slots: [
        {
          species: "Floatzel",
          level: 28,
        },
        {
          species: "Shellos_West",
          level: 28,
        },
        {
          species: "Floatzel",
          level: 29,
        },
        {
          species: "Gastrodon_West",
          level: 28,
        },
        {
          species: "MrMime",
          level: 29,
        },
        {
          species: "Wingull",
          level: 29,
        },
        {
          species: "Floatzel",
          level: 30,
        },
        {
          species: "Gastrodon_West",
          level: 29,
        },
        {
          species: "MrMime",
          level: 30,
        },
        {
          species: "Gastrodon_West",
          level: 30,
        },
        {
          species: "MrMime",
          level: 30,
        },
        {
          species: "Gastrodon_West",
          level: 30,
        },
      ],
    },
    swarm: ["Voltorb", "Voltorb"],
    day: ["Floatzel", "Gastrodon_West"],
    night: ["Floatzel", "Gastrodon_West"],
    radar: ["Ditto", "Ditto", "Ditto", "Ditto"],
    dualSlots: {
      Emerald: ["MrMime", "Gastrodon_West"],
      FireRed: ["MrMime", "Gastrodon_West"],
      LeafGreen: ["MrMime", "Gastrodon_West"],
      Ruby: ["MrMime", "Gastrodon_West"],
      Sapphire: ["MrMime", "Gastrodon_West"],
    },
  },
  "Route 221": {
    location: "Route 221",
    grass: {
      rate: 30,
      slots: [
        {
          species: "Floatzel",
          level: 28,
        },
        {
          species: "Stunky",
          level: 28,
        },
        {
          species: "Roselia",
          level: 29,
        },
        {
          species: "Shellos_West",
          level: 28,
        },
        {
          species: "Skuntank",
          level: 29,
        },
        {
          species: "Wingull",
          level: 29,
        },
        {
          species: "Floatzel",
          level: 30,
        },
        {
          species: "Gastrodon_West",
          level: 29,
        },
        {
          species: "Skuntank",
          level: 30,
        },
        {
          species: "Gastrodon_West",
          level: 30,
        },
        {
          species: "Skuntank",
          level: 30,
        },
        {
          species: "Gastrodon_West",
          level: 30,
        },
      ],
    },
    swarm: ["FarfetchD", "FarfetchD"],
    day: ["Roselia", "Shellos_West"],
    night: ["Roselia", "Shellos_West"],
    radar: ["Nidorina", "Nidorina", "Nidorino", "Nidorino"],
    dualSlots: {
      Emerald: ["Skuntank", "Gastrodon_West"],
      FireRed: ["Skuntank", "Gastrodon_West"],
      LeafGreen: ["Skuntank", "Gastrodon_West"],
      Ruby: ["Skuntank", "Gastrodon_West"],
      Sapphire: ["Skuntank", "Gastrodon_West"],
    },
  },
  "Route 222": {
    location: "Route 222",
    grass: {
      rate: 30,
      slots: [
        {
          species: "Floatzel",
          level: 40,
        },
        {
          species: "Gastrodon_West",
          level: 40,
        },
        {
          species: "Chatot",
          level: 41,
        },
        {
          species: "Chatot",
          level: 40,
        },
        {
          species: "MrMime",
          level: 41,
        },
        {
          species: "Wingull",
          level: 41,
        },
        {
          species: "Floatzel",
          level: 42,
        },
        {
          species: "Gastrodon_West",
          level: 41,
        },
        {
          species: "MrMime",
          level: 42,
        },
        {
          species: "Gastrodon_West",
          level: 42,
        },
        {
          species: "MrMime",
          level: 42,
        },
        {
          species: "Gastrodon_West",
          level: 42,
        },
      ],
    },
    swarm: ["Skitty", "Skitty"],
    day: ["Chatot", "Chatot"],
    night: ["Floatzel", "Gastrodon_West"],
    radar: ["Flaaffy", "Flaaffy", "Flaaffy", "Flaaffy"],
    dualSlots: {
      Emerald: ["MrMime", "Gastrodon_West"],
      FireRed: ["MrMime", "Gastrodon_West"],
      LeafGreen: ["MrMime", "Gastrodon_West"],
      Ruby: ["MrMime", "Gastrodon_West"],
      Sapphire: ["MrMime", "Gastrodon_West"],
    },
  },
  "Route 224": {
    location: "Route 224",
    grass: {
      rate: 30,
      slots: [
        {
          species: "Floatzel",
          level: 53,
        },
        {
          species: "Gastrodon_West",
          level: 53,
        },
        {
          species: "Chatot",
          level: 54,
        },
        {
          species: "Chatot",
          level: 52,
        },
        {
          species: "Roselia",
          level: 52,
        },
        {
          species: "Roselia",
          level: 54,
        },
        {
          species: "Gloom",
          level: 53,
        },
        {
          species: "Weepinbell",
          level: 53,
        },
        {
          species: "Buizel",
          level: 23,
        },
        {
          species: "Beautifly",
          level: 23,
        },
        {
          species: "Shellos_West",
          level: 23,
        },
        {
          species: "Beautifly",
          level: 23,
        },
      ],
    },
    swarm: ["Natu", "Natu"],
    day: ["Chatot", "Chatot"],
    night: ["Floatzel", "Gastrodon_West"],
    radar: ["Dusclops", "Dusclops", "Duskull", "Duskull"],
    dualSlots: {
      Emerald: ["Shuckle", "Shuckle"],
      FireRed: ["Buizel", "Beautifly"],
      LeafGreen: ["Buizel", "Beautifly"],
      Ruby: ["Buizel", "Beautifly"],
      Sapphire: ["Buizel", "Beautifly"],
    },
  },
  "Route 225": {
    location: "Route 225",
    grass: {
      rate: 30,
      slots: [
        {
          species: "Fearow",
          level: 51,
        },
        {
          species: "Raticate",
          level: 50,
        },
        {
          species: "Fearow",
          level: 50,
        },
        {
          species: "Fearow",
          level: 52,
        },
        {
          species: "Raticate",
          level: 52,
        },
        {
          species: "Skuntank",
          level: 51,
        },
        {
          species: "Machoke",
          level: 51,
        },
        {
          species: "Roselia",
          level: 51,
        },
        {
          species: "Spearow",
          level: 20,
        },
        {
          species: "Rattata",
          level: 20,
        },
        {
          species: "Spearow",
          level: 22,
        },
        {
          species: "Rattata",
          level: 22,
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
      rate: 30,
      slots: [
        {
          species: "Camerupt",
          level: 55,
        },
        {
          species: "Rhydon",
          level: 55,
        },
        {
          species: "Fearow",
          level: 54,
        },
        {
          species: "Graveler",
          level: 54,
        },
        {
          species: "Fearow",
          level: 55,
        },
        {
          species: "Weezing",
          level: 55,
        },
        {
          species: "Skarmory",
          level: 56,
        },
        {
          species: "Graveler",
          level: 56,
        },
        {
          species: "Numel",
          level: 22,
        },
        {
          species: "Rhyhorn",
          level: 22,
        },
        {
          species: "Numel",
          level: 24,
        },
        {
          species: "Rhyhorn",
          level: 24,
        },
      ],
    },
    swarm: ["Spinda", "Spinda"],
    day: ["Fearow", "Graveler"],
    night: ["Banette", "Golbat"],
    radar: ["Torkoal", "Torkoal", "Torkoal", "Torkoal"],
    dualSlots: {
      Emerald: ["Gligar", "Gligar"],
      FireRed: ["Numel", "Rhyhorn"],
      LeafGreen: ["Magby", "Magby"],
      Ruby: ["Numel", "Rhyhorn"],
      Sapphire: ["Numel", "Rhyhorn"],
    },
  },
  "Route 228": {
    location: "Route 228",
    grass: {
      rate: 30,
      slots: [
        {
          species: "Dugtrio",
          level: 53,
        },
        {
          species: "Cacturne",
          level: 53,
        },
        {
          species: "Hippowdon",
          level: 52,
        },
        {
          species: "Rhydon",
          level: 52,
        },
        {
          species: "Rhydon",
          level: 53,
        },
        {
          species: "Hippowdon",
          level: 54,
        },
        {
          species: "Dugtrio",
          level: 52,
        },
        {
          species: "Dugtrio",
          level: 54,
        },
        {
          species: "Diglett",
          level: 23,
        },
        {
          species: "Cacnea",
          level: 23,
        },
        {
          species: "Diglett",
          level: 25,
        },
        {
          species: "Cacnea",
          level: 25,
        },
      ],
    },
    swarm: ["Beldum", "Beldum"],
    day: ["Hippowdon", "Rhydon"],
    night: ["Cacturne", "Cacturne"],
    radar: ["Vibrava", "Vibrava", "Trapinch", "Trapinch"],
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
          species: "Weepinbell",
          level: 51,
        },
        {
          species: "Gloom",
          level: 51,
        },
        {
          species: "Ledian",
          level: 52,
        },
        {
          species: "Ledian",
          level: 52,
        },
        {
          species: "Illumise",
          level: 50,
        },
        {
          species: "Roselia",
          level: 50,
        },
        {
          species: "Scyther",
          level: 52,
        },
        {
          species: "Volbeat",
          level: 50,
        },
        {
          species: "Bellsprout",
          level: 20,
        },
        {
          species: "Oddish",
          level: 20,
        },
        {
          species: "Bellsprout",
          level: 22,
        },
        {
          species: "Oddish",
          level: 22,
        },
      ],
    },
    swarm: ["Pidgey", "Pidgey"],
    day: ["Weepinbell", "Gloom"],
    night: ["Ariados", "Ariados"],
    radar: ["Venomoth", "Venomoth", "Venonat", "Venonat"],
    dualSlots: {
      Emerald: ["Pineco", "Pineco"],
      FireRed: ["Bellsprout", "Oddish"],
      LeafGreen: ["Bellsprout", "Oddish"],
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
          species: "Fearow",
          level: 52,
        },
        {
          species: "Raticate",
          level: 52,
        },
        {
          species: "Fearow",
          level: 53,
        },
        {
          species: "Fearow",
          level: 51,
        },
        {
          species: "Raticate",
          level: 51,
        },
        {
          species: "Machoke",
          level: 53,
        },
        {
          species: "Golduck",
          level: 53,
        },
        {
          species: "Golduck",
          level: 51,
        },
        {
          species: "Spearow",
          level: 20,
        },
        {
          species: "Rattata",
          level: 20,
        },
        {
          species: "Spearow",
          level: 22,
        },
        {
          species: "Rattata",
          level: 22,
        },
      ],
    },
    swarm: ["Krabby", "Krabby"],
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
  "Route 230": {
    location: "Route 230",
    grass: {
      rate: 30,
      slots: [
        {
          species: "Weepinbell",
          level: 50,
        },
        {
          species: "Gloom",
          level: 50,
        },
        {
          species: "Golduck",
          level: 52,
        },
        {
          species: "Beautifly",
          level: 51,
        },
        {
          species: "Bellsprout",
          level: 18,
        },
        {
          species: "Oddish",
          level: 18,
        },
        {
          species: "Floatzel",
          level: 51,
        },
        {
          species: "Gastrodon_West",
          level: 51,
        },
        {
          species: "Floatzel",
          level: 52,
        },
        {
          species: "Floatzel",
          level: 50,
        },
        {
          species: "Bellsprout",
          level: 23,
        },
        {
          species: "Oddish",
          level: 23,
        },
      ],
    },
    swarm: ["Corsola", "Corsola"],
    day: ["Golduck", "Beautifly"],
    night: ["Golduck", "Beautifly"],
    radar: ["Togepi", "Togepi", "Togepi", "Togepi"],
    dualSlots: {
      Emerald: ["Floatzel", "Floatzel"],
      FireRed: ["Floatzel", "Floatzel"],
      LeafGreen: ["Floatzel", "Floatzel"],
      Ruby: ["Floatzel", "Floatzel"],
      Sapphire: ["Floatzel", "Floatzel"],
    },
  },
  "Great Marsh Area 1": {
    location: "Great Marsh Area 1",
    grass: {
      rate: 35,
      slots: [
        {
          species: "Wooper",
          level: 24,
        },
        {
          species: "Bibarel",
          level: 25,
        },
        {
          species: "Budew",
          level: 24,
        },
        {
          species: "Starly",
          level: 26,
        },
        {
          species: "Marill",
          level: 25,
        },
        {
          species: "Quagsire",
          level: 25,
        },
        {
          species: "Marill",
          level: 26,
        },
        {
          species: "Quagsire",
          level: 26,
        },
        {
          species: "Psyduck",
          level: 26,
        },
        {
          species: "Psyduck",
          level: 24,
        },
        {
          species: "Bidoof",
          level: 26,
        },
        {
          species: "Azurill",
          level: 24,
        },
      ],
    },
    swarm: ["Wooper", "Bibarel"],
    day: ["Budew", "Starly"],
    night: ["Hoothoot", "Noctowl"],
    radar: ["Marill", "Quagsire", "Bidoof", "Azurill"],
    dualSlots: {
      Emerald: ["Psyduck", "Psyduck"],
      FireRed: ["Arbok", "Arbok"],
      LeafGreen: ["Psyduck", "Psyduck"],
      Ruby: ["Psyduck", "Psyduck"],
      Sapphire: ["Psyduck", "Psyduck"],
    },
  },
  "Great Marsh Area 2": {
    location: "Great Marsh Area 2",
    grass: {
      rate: 35,
      slots: [
        {
          species: "Wooper",
          level: 24,
        },
        {
          species: "Bibarel",
          level: 25,
        },
        {
          species: "Budew",
          level: 24,
        },
        {
          species: "Starly",
          level: 26,
        },
        {
          species: "Marill",
          level: 25,
        },
        {
          species: "Quagsire",
          level: 25,
        },
        {
          species: "Marill",
          level: 26,
        },
        {
          species: "Quagsire",
          level: 26,
        },
        {
          species: "Psyduck",
          level: 26,
        },
        {
          species: "Psyduck",
          level: 24,
        },
        {
          species: "Bidoof",
          level: 26,
        },
        {
          species: "Azurill",
          level: 24,
        },
      ],
    },
    swarm: ["Wooper", "Bibarel"],
    day: ["Budew", "Starly"],
    night: ["Hoothoot", "Noctowl"],
    radar: ["Marill", "Quagsire", "Bidoof", "Azurill"],
    dualSlots: {
      Emerald: ["Psyduck", "Psyduck"],
      FireRed: ["Arbok", "Arbok"],
      LeafGreen: ["Psyduck", "Psyduck"],
      Ruby: ["Psyduck", "Psyduck"],
      Sapphire: ["Psyduck", "Psyduck"],
    },
  },
  "Great Marsh Area 3": {
    location: "Great Marsh Area 3",
    grass: {
      rate: 35,
      slots: [
        {
          species: "Wooper",
          level: 22,
        },
        {
          species: "Bibarel",
          level: 23,
        },
        {
          species: "Budew",
          level: 22,
        },
        {
          species: "Starly",
          level: 24,
        },
        {
          species: "Marill",
          level: 23,
        },
        {
          species: "Quagsire",
          level: 23,
        },
        {
          species: "Marill",
          level: 24,
        },
        {
          species: "Quagsire",
          level: 24,
        },
        {
          species: "Psyduck",
          level: 24,
        },
        {
          species: "Psyduck",
          level: 22,
        },
        {
          species: "Bidoof",
          level: 24,
        },
        {
          species: "Azurill",
          level: 22,
        },
      ],
    },
    swarm: ["Wooper", "Bibarel"],
    day: ["Budew", "Starly"],
    night: ["Hoothoot", "Hoothoot"],
    radar: ["Marill", "Quagsire", "Bidoof", "Azurill"],
    dualSlots: {
      Emerald: ["Psyduck", "Psyduck"],
      FireRed: ["Arbok", "Arbok"],
      LeafGreen: ["Psyduck", "Psyduck"],
      Ruby: ["Psyduck", "Psyduck"],
      Sapphire: ["Psyduck", "Psyduck"],
    },
  },
  "Great Marsh Area 4": {
    location: "Great Marsh Area 4",
    grass: {
      rate: 35,
      slots: [
        {
          species: "Wooper",
          level: 22,
        },
        {
          species: "Bibarel",
          level: 23,
        },
        {
          species: "Budew",
          level: 22,
        },
        {
          species: "Starly",
          level: 24,
        },
        {
          species: "Marill",
          level: 23,
        },
        {
          species: "Quagsire",
          level: 23,
        },
        {
          species: "Marill",
          level: 24,
        },
        {
          species: "Quagsire",
          level: 24,
        },
        {
          species: "Psyduck",
          level: 24,
        },
        {
          species: "Psyduck",
          level: 22,
        },
        {
          species: "Bidoof",
          level: 24,
        },
        {
          species: "Azurill",
          level: 22,
        },
      ],
    },
    swarm: ["Wooper", "Bibarel"],
    day: ["Budew", "Starly"],
    night: ["Hoothoot", "Hoothoot"],
    radar: ["Marill", "Quagsire", "Bidoof", "Azurill"],
    dualSlots: {
      Emerald: ["Psyduck", "Psyduck"],
      FireRed: ["Arbok", "Arbok"],
      LeafGreen: ["Psyduck", "Psyduck"],
      Ruby: ["Psyduck", "Psyduck"],
      Sapphire: ["Psyduck", "Psyduck"],
    },
  },
  "Great Marsh Area 5": {
    location: "Great Marsh Area 5",
    grass: {
      rate: 35,
      slots: [
        {
          species: "Wooper",
          level: 20,
        },
        {
          species: "Bibarel",
          level: 21,
        },
        {
          species: "Budew",
          level: 20,
        },
        {
          species: "Starly",
          level: 22,
        },
        {
          species: "Marill",
          level: 21,
        },
        {
          species: "Quagsire",
          level: 21,
        },
        {
          species: "Marill",
          level: 22,
        },
        {
          species: "Quagsire",
          level: 22,
        },
        {
          species: "Bidoof",
          level: 22,
        },
        {
          species: "Azurill",
          level: 20,
        },
        {
          species: "Bidoof",
          level: 22,
        },
        {
          species: "Azurill",
          level: 20,
        },
      ],
    },
    swarm: ["Wooper", "Bibarel"],
    day: ["Budew", "Starly"],
    night: ["Hoothoot", "Hoothoot"],
    radar: ["Marill", "Quagsire", "Bidoof", "Azurill"],
    dualSlots: {
      Emerald: ["Bidoof", "Azurill"],
      FireRed: ["Arbok", "Arbok"],
      LeafGreen: ["Bidoof", "Azurill"],
      Ruby: ["Bidoof", "Azurill"],
      Sapphire: ["Bidoof", "Azurill"],
    },
  },
  "Great Marsh Area 6": {
    location: "Great Marsh Area 6",
    grass: {
      rate: 35,
      slots: [
        {
          species: "Wooper",
          level: 20,
        },
        {
          species: "Bibarel",
          level: 21,
        },
        {
          species: "Budew",
          level: 20,
        },
        {
          species: "Starly",
          level: 22,
        },
        {
          species: "Marill",
          level: 21,
        },
        {
          species: "Quagsire",
          level: 21,
        },
        {
          species: "Marill",
          level: 22,
        },
        {
          species: "Quagsire",
          level: 22,
        },
        {
          species: "Psyduck",
          level: 22,
        },
        {
          species: "Psyduck",
          level: 20,
        },
        {
          species: "Bidoof",
          level: 22,
        },
        {
          species: "Azurill",
          level: 20,
        },
      ],
    },
    swarm: ["Wooper", "Bibarel"],
    day: ["Budew", "Starly"],
    night: ["Hoothoot", "Hoothoot"],
    radar: ["Marill", "Quagsire", "Bidoof", "Azurill"],
    dualSlots: {
      Emerald: ["Psyduck", "Psyduck"],
      FireRed: ["Arbok", "Arbok"],
      LeafGreen: ["Psyduck", "Psyduck"],
      Ruby: ["Psyduck", "Psyduck"],
      Sapphire: ["Psyduck", "Psyduck"],
    },
  },
  "Ruin Maniac Cave (> 10 Unown)": {
    location: "Ruin Maniac Cave (> 10 Unown)",
    grass: {
      rate: 10,
      slots: [
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
          level: 23,
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
  "Maniac Tunnel": {
    location: "Maniac Tunnel",
    grass: {
      rate: 10,
      slots: [
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
          species: "Geodude",
          level: 24,
        },
        {
          species: "Hippopotas",
          level: 22,
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
          level: 24,
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
          species: "Golbat",
          level: 55,
        },
        {
          species: "Bronzong",
          level: 56,
        },
        {
          species: "Haunter",
          level: 55,
        },
        {
          species: "Golbat",
          level: 56,
        },
        {
          species: "Haunter",
          level: 56,
        },
        {
          species: "Bronzong",
          level: 55,
        },
        {
          species: "Haunter",
          level: 54,
        },
        {
          species: "Haunter",
          level: 54,
        },
        {
          species: "Bronzor",
          level: 54,
        },
        {
          species: "Bronzong",
          level: 56,
        },
        {
          species: "Bronzor",
          level: 54,
        },
        {
          species: "Bronzong",
          level: 56,
        },
      ],
    },
    swarm: ["Golbat", "Bronzong"],
    day: ["Haunter", "Golbat"],
    night: ["Haunter", "Golbat"],
    radar: ["Haunter", "Bronzong", "Bronzor", "Bronzong"],
    dualSlots: {
      Emerald: ["Bronzor", "Bronzong"],
      FireRed: ["Bronzor", "Bronzong"],
      LeafGreen: ["Bronzor", "Bronzong"],
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
          species: "Golbat",
          level: 65,
        },
        {
          species: "Bronzong",
          level: 66,
        },
        {
          species: "Haunter",
          level: 65,
        },
        {
          species: "Golbat",
          level: 66,
        },
        {
          species: "Haunter",
          level: 66,
        },
        {
          species: "Bronzong",
          level: 65,
        },
        {
          species: "Haunter",
          level: 64,
        },
        {
          species: "Haunter",
          level: 64,
        },
        {
          species: "Bronzor",
          level: 64,
        },
        {
          species: "Bronzong",
          level: 66,
        },
        {
          species: "Bronzor",
          level: 64,
        },
        {
          species: "Bronzong",
          level: 66,
        },
      ],
    },
    swarm: ["Golbat", "Bronzong"],
    day: ["Haunter", "Golbat"],
    night: ["Haunter", "Golbat"],
    radar: ["Haunter", "Bronzong", "Bronzor", "Bronzong"],
    dualSlots: {
      Emerald: ["Bronzor", "Bronzong"],
      FireRed: ["Bronzor", "Bronzong"],
      LeafGreen: ["Bronzor", "Bronzong"],
      Ruby: ["Solrock", "Solrock"],
      Sapphire: ["Lunatone", "Lunatone"],
    },
  },
};
