import { match } from "ts-pattern";
import { Characteristic, LeadAbility, Nature } from "~/rngTools";
import { toOptions } from "~/utils/options";
import { startCase, sortBy } from "lodash-es";
import { z } from "zod";

export const DpPt = ["Diamond", "Pearl", "Platinum"] as const;

export type DpPt = (typeof DpPt)[number];

export const Gen4GameVersions = [...DpPt, "HeartGold", "SoulSilver"] as const;

export type Gen4GameVersion = (typeof Gen4GameVersions)[number];

export const Gen4ConsoleSchema = z.enum([
  "NdsDsi",
  "3dsNormalSettings",
  "3dsAltSettings",
]);

export type Gen4Console = z.infer<typeof Gen4ConsoleSchema>;

export type Gen4GameAndConsole = {
  game: Gen4GameVersion;
  console: Gen4Console;
};

export const StaticEncounterSpecies = [
  "Turtwig",
  "Chimchar",
  "Piplup",
  "Cyndaquil",
  "Chikorita",
  "Totodile",
  "Charmander",
  "Squirtle",
  "Bulbasaur",
  "Treecko",
  "Mudkip",
  "Torchic",
  "Omanyte",
  "Kabuto",
  "Aerodactyl",
  "Lileep",
  "Anorith",
  "Cranidos",
  "Shieldon",
  "Eevee",
  "Porygon",
  "Togepi",
  "Riolu",
  "Drifloon",
  "Spiritomb",
  "Rotom",
  "Lugia",
  "HoOh",
  "Dialga",
  "Palkia",
  "Giratina",
  "Regice",
  "Regirock",
  "Registeel",
  "Uxie",
  "Azelf",
  "Heatran",
  "Regigigas",
  "Mesprit",
  "Cresselia",
  "Zapdos",
  "Articuno",
  "Moltres",
  "Tentacool",
  "Dratini",
  "Tyrogue",
  "Mareep",
  "Wooper",
  "Slugma",
  "MrMime",
  "Abra",
  "Ekans",
  "Raikou",
  "Entei",
  "Suicune",
  "Voltorb",
  "Snorlax",
] as const;

export const leadAbilities = [
  "None",
  "CutecharmF",
  "CutecharmM",
  "Synchronize",
] as const;

type LeadKey = LeadAbility extends infer T
  ? T extends string
    ? T
    : keyof T
  : never;

type leadabilityinput = {
  lead: LeadKey;
  synch_nature?: Nature;
};

export const getLeadAbility = (opts: leadabilityinput): LeadAbility => {
  return match<leadabilityinput, LeadAbility>(opts)
    .with({ lead: "Synchronize" }, (matched) => {
      if (matched.synch_nature === undefined) {
        throw new Error("Synchronize selected, but synch_nature is missing.");
      }
      return { Synchronize: matched.synch_nature };
    })
    .with({ lead: "CutecharmF" }, () => "CutecharmF")
    .with({ lead: "CutecharmM" }, () => "CutecharmM")
    .with({ lead: "None" }, () => "None")
    .with({ lead: "Pressure" }, () => "Pressure")
    .exhaustive();
};

export const characteristics = [
  "AlertToSounds",
  "ALittleQuickTempered",
  "CapableOfTakingHits",
  "GoodEndurance",
  "GoodPerseverance",
  "HatesToLose",
  "HighlyCurious",
  "HighlyPersistent",
  "ImpetuousAndSilly",
  "LikesToFight",
  "LikesToRelax",
  "LikesToRun",
  "LikesToThrashAbout",
  "LovesToEat",
  "Mischievous",
  "NodsOffALot",
  "OftenLostInThought",
  "ProudOfItsPower",
  "QuickTempered",
  "QuickToFlee",
  "ScattersThingsOften",
  "SomewhatOfAClown",
  "SomewhatStubborn",
  "SomewhatVain",
  "StronglyDefiant",
  "StrongWilled",
  "SturdyBody",
  "TakesPlentyOfSiestas",
  "ThoroughlyCunning",
  "VeryFinicky",
] as const satisfies Characteristic[];

export const characteristicToGen4Label = {
  AlertToSounds: "Alert To Sounds",
  ALittleQuickTempered: "A Little Quick Tempered",
  CapableOfTakingHits: "Capable Of Taking Hits",
  GoodEndurance: "Good Endurance",
  GoodPerseverance: "Good Perseverance",
  HatesToLose: "Hates To Lose",
  HighlyCurious: "Highly Curious",
  HighlyPersistent: "Highly Persistent",
  ImpetuousAndSilly: "Impetuous And Silly",
  LikesToFight: "Likes To Fight",
  LikesToRelax: "Likes To Relax",
  LikesToRun: "Likes To Run",
  LikesToThrashAbout: "Likes To Thrash About",
  LovesToEat: "Loves To Eat",
  Mischievous: "Mischievous",
  // Mistranslated from Japanese in Gen 4
  NodsOffALot: "Often Scatters Things",
  OftenLostInThought: "Often Lost In Thought",
  ProudOfItsPower: "Proud Of Its Power",
  QuickTempered: "Quick Tempered",
  QuickToFlee: "Quick To Flee",
  ScattersThingsOften: "Scatters Things Often",
  SomewhatOfAClown: "Somewhat Of A Clown",
  SomewhatStubborn: "Somewhat Stubborn",
  SomewhatVain: "Somewhat Vain",
  StronglyDefiant: "Strongly Defiant",
  StrongWilled: "Strong Willed",
  SturdyBody: "Sturdy Body",
  // Mistranslated from Japanese in Gen 4
  TakesPlentyOfSiestas: "Often Dozes Off",
  ThoroughlyCunning: "Thoroughly Cunning",
  VeryFinicky: "Very Finicky",
} as const satisfies Record<Characteristic, string>;

export const Characteristic4Options = sortBy(
  toOptions(
    characteristics,
    (characteristic) => characteristicToGen4Label[characteristic],
  ),
  (option) => option.label,
);

export const Characteristic5Options = sortBy(
  toOptions(characteristics, startCase),
  (option) => option.label,
);
