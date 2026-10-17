import { z } from "zod";
import {
  AbilityType,
  Gen7EggGender,
  Gen7EggItem,
  Gen7EggParent,
  Gen7EggPidMethod,
  Gen7EggSearchOpts,
} from "~/rngTools";
import {
  getPkmFilterInitialValues,
  pkmFilterFieldsToRustInput,
  pkmFilterSchema,
} from "~/components/pkmFilter";
import { IvsSchema } from "~/components/ivInput";
import { HexSchema } from "~/utils/number";
import { RustOption } from "~/types/utils";
import { ability12H } from "~/types/ability";
import { nature } from "~/types/nature";
import { Translations } from "~/translations";

export const gen7EggItems = [
  "None",
  "Everstone",
  "DestinyKnot",
  "PowerWeight",
  "PowerBracer",
  "PowerBelt",
  "PowerLens",
  "PowerBand",
  "PowerAnklet",
] as const satisfies readonly Gen7EggItem[];

// Limitation: a Select value must be a primitive, so the coin flip is one
// more value next to the gender ratios.
const COIN_FLIP = "CoinFlip";

export const gen7EggGenders = [
  "OneToOne",
  "OneToSeven",
  "OneToThree",
  "ThreeToOne",
  "SevenToOne",
  "MaleOnly",
  "FemaleOnly",
  "Genderless",
  COIN_FLIP,
] as const;

type Gen7EggGenderOption = (typeof gen7EggGenders)[number];

const formShape = z
  .object({
    seed_3: HexSchema(0xffffffff),
    seed_2: HexSchema(0xffffffff),
    seed_1: HexSchema(0xffffffff),
    seed_0: HexSchema(0xffffffff),
    tsv: z.number().int().min(0).max(4095),
    masuda_method: z.boolean(),
    shiny_charm: z.boolean(),
    gender: z.enum(gen7EggGenders),
    male_ivs: IvsSchema,
    male_item: z.enum(gen7EggItems),
    male_ability: z.enum(ability12H),
    male_nature: z.enum(nature),
    male_ditto: z.boolean(),
    female_ivs: IvsSchema,
    female_item: z.enum(gen7EggItems),
    female_ability: z.enum(ability12H),
    female_nature: z.enum(nature),
    female_ditto: z.boolean(),
    same_species: z.boolean(),
    max_advances: z.number().int().min(0),
  })
  .extend(pkmFilterSchema.shape);

export const Gen7EggValidator = formShape.superRefine((values, ctx) => {
  if (!values.masuda_method && !values.shiny_charm) {
    ctx.addIssue({
      code: "custom",
      path: ["shiny_charm"],
      message:
        "Eggs without the Masuda Method or Shiny Charm aren't supported yet.",
    });
  }
  if (values.male_ditto && values.female_ditto) {
    ctx.addIssue({
      code: "custom",
      path: ["female_ditto"],
      message: "Only one parent can be Ditto.",
    });
  }
  if (
    (values.gender === "Genderless" || values.gender === "MaleOnly") &&
    !values.female_ditto
  ) {
    ctx.addIssue({
      code: "custom",
      path: ["female_ditto"],
      message: "Genderless and male-only Pokemon breed with a female Ditto.",
    });
  }
  if (values.gender === "FemaleOnly" && values.female_ditto) {
    ctx.addIssue({
      code: "custom",
      path: ["female_ditto"],
      message: "Female-only Pokemon can't breed with a female Ditto.",
    });
  }
});

export type Gen7EggFormState = z.infer<typeof formShape>;

const ALL_31 = { hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31 };

export const gen7EggInitialValues: Gen7EggFormState = {
  seed_3: 0,
  seed_2: 0,
  seed_1: 0,
  seed_0: 0,
  tsv: 0,
  masuda_method: true,
  shiny_charm: false,
  gender: "OneToOne",
  male_ivs: ALL_31,
  male_item: "None",
  male_ability: "First",
  male_nature: "Hardy",
  male_ditto: false,
  female_ivs: ALL_31,
  female_item: "None",
  female_ability: "First",
  female_nature: "Hardy",
  female_ditto: false,
  same_species: false,
  max_advances: 1000,
  ...getPkmFilterInitialValues(),
};

export const getGen7EggItemOptions = (t: Translations) =>
  gen7EggItems.map((item) => ({
    value: item,
    label: {
      None: t["None"],
      Everstone: t["Everstone"],
      DestinyKnot: t["Destiny Knot"],
      PowerWeight: t["Power Weight"],
      PowerBracer: t["Power Bracer"],
      PowerBelt: t["Power Belt"],
      PowerLens: t["Power Lens"],
      PowerBand: t["Power Band"],
      PowerAnklet: t["Power Anklet"],
    }[item],
  }));

export const formatGen7EggAbility = (t: Translations, ability: AbilityType) =>
  ({
    First: t["Ability 1"],
    Second: t["Ability 2"],
    Hidden: t["Hidden Ability"],
  })[ability];

export const getGen7EggAbilityOptions = (t: Translations) =>
  ability12H.map((ability) => ({
    value: ability,
    label: formatGen7EggAbility(t, ability),
  }));

export const getGen7EggGenderOptions = (t: Translations) =>
  gen7EggGenders.map((gender) => ({
    value: gender,
    label: {
      OneToOne: t["50% male"],
      OneToSeven: t["87.5% male"],
      OneToThree: t["75% male"],
      ThreeToOne: t["25% male"],
      SevenToOne: t["12.5% male"],
      MaleOnly: t["Male only"],
      FemaleOnly: t["Female only"],
      Genderless: t["Genderless"],
      CoinFlip: t["Nidoran or Volbeat/Illumise"],
    }[gender],
  }));

const toRustGender = (gender: Gen7EggGenderOption): Gen7EggGender =>
  gender === COIN_FLIP ? COIN_FLIP : { Ratio: gender };

const toPidMethod = (values: Gen7EggFormState): Gen7EggPidMethod => {
  if (values.masuda_method && values.shiny_charm) {
    return "MasudaAndShinyCharm";
  }
  return values.masuda_method ? "MasudaMethod" : "ShinyCharm";
};

const toParent = (
  values: Gen7EggFormState,
  prefix: "male" | "female",
): Gen7EggParent => ({
  ivs: values[`${prefix}_ivs`],
  item: values[`${prefix}_item`],
  ability: values[`${prefix}_ability`],
  nature: values[`${prefix}_nature`],
});

export const getGen7EggSeed = (
  values: Gen7EggFormState,
): Gen7EggSearchOpts["seed"] => [
  values.seed_0,
  values.seed_1,
  values.seed_2,
  values.seed_3,
];

export const withGen7EggSeed = (
  values: Gen7EggFormState,
  [seed_0, seed_1, seed_2, seed_3]: Gen7EggSearchOpts["seed"],
): Gen7EggFormState => ({ ...values, seed_0, seed_1, seed_2, seed_3 });

export const toGen7EggSearchOpts = (
  values: Gen7EggFormState,
): RustOption<Gen7EggSearchOpts> => ({
  seed: getGen7EggSeed(values),
  tsv: values.tsv,
  pid_method: toPidMethod(values),
  gender: toRustGender(values.gender),
  parents: {
    male: toParent(values, "male"),
    female: toParent(values, "female"),
    ditto: values.male_ditto ? "Male" : values.female_ditto ? "Female" : null,
    same_species: values.same_species,
  },
  max_advance: values.max_advances,
  filter: pkmFilterFieldsToRustInput(values),
});
