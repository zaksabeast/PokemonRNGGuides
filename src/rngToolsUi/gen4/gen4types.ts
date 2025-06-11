import { match } from "ts-pattern";
import { Characteristic, LeadAbilities, Nature } from "~/rngTools";

export const GameVersion = [
  "Diamond",
  "Pearl",
  "Platinum",
  "HeartGold",
  "SoulSilver",
] as const;

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

type LeadKey = LeadAbilities extends infer T
  ? T extends string
    ? T
    : keyof T
  : never;

type leadabilityinput = {
  lead: LeadKey;
  synch_nature?: Nature;
};

export const getLeadAbility = (opts: leadabilityinput): LeadAbilities => {
  return match<leadabilityinput, LeadAbilities>(opts)
    .with({ lead: "Synchronize" }, (matched) => {
      if (matched.synch_nature === undefined) {
        throw new Error("Synchronize selected, but synch_nature is missing.");
      }
      return { Synchronize: matched.synch_nature };
    })
    .with({ lead: "CutecharmF" }, () => "CutecharmF")
    .with({ lead: "CutecharmM" }, () => "CutecharmM")
    .with({ lead: "None" }, () => "None")
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
