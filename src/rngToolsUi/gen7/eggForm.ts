import { z } from "zod";
import { match } from "ts-pattern";
import {
  AbilityType,
  Gen7EggGender,
  Gen7EggItem,
  Gen7EggPairing,
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
import { Translation, Translations } from "~/translations";

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

const gen7EggItemLabels = {
  None: "None",
  Everstone: "Everstone",
  DestinyKnot: "Destiny Knot",
  PowerWeight: "Power Weight",
  PowerBracer: "Power Bracer",
  PowerBelt: "Power Belt",
  PowerLens: "Power Lens",
  PowerBand: "Power Band",
  PowerAnklet: "Power Anklet",
} as const satisfies Record<Gen7EggItem, Translation>;

const gen7EggAbilityLabels = {
  First: "Ability 1",
  Second: "Ability 2",
  Hidden: "Hidden Ability",
} as const satisfies Record<AbilityType, Translation>;

export const gen7EggGenders = [
  "OneToOne",
  "OneToSeven",
  "OneToThree",
  "ThreeToOne",
  "SevenToOne",
  "MaleOnly",
  "FemaleOnly",
  "Genderless",
  "NidoranOrVolbeatIllumise",
] as const;

type Gen7EggGenderOption = (typeof gen7EggGenders)[number];

const gen7EggGenderLabels = {
  OneToOne: "50% male",
  OneToSeven: "87.5% male",
  OneToThree: "75% male",
  ThreeToOne: "25% male",
  SevenToOne: "12.5% male",
  MaleOnly: "Male only",
  FemaleOnly: "Female only",
  Genderless: "Genderless",
  NidoranOrVolbeatIllumise: "Nidoran or Volbeat/Illumise",
} as const satisfies Record<Gen7EggGenderOption, Translation>;

const MAX_ADVANCE_LIMIT = 10_000;

const formShape = z
  .object({
    seed_3: HexSchema(0xffffffff),
    seed_2: HexSchema(0xffffffff),
    seed_1: HexSchema(0xffffffff),
    seed_0: HexSchema(0xffffffff),
    tsv: z.number().int().min(0).max(4095),
    trv: HexSchema(0xf),
    masuda_method: z.boolean(),
    shiny_charm: z.boolean(),
    gender: z.enum(gen7EggGenders),
    male_ivs: IvsSchema,
    male_item: z.enum(gen7EggItems),
    male_ability: z.enum(ability12H),
    male_nature: z.enum(nature),
    male_is_ditto: z.boolean(),
    female_ivs: IvsSchema,
    female_item: z.enum(gen7EggItems),
    female_ability: z.enum(ability12H),
    female_nature: z.enum(nature),
    female_is_ditto: z.boolean(),
    same_species: z.boolean(),
    // The path search grows with the square of this, and runs on one worker.
    max_advance: z.number().int().min(0).max(MAX_ADVANCE_LIMIT),
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

  if (values.male_is_ditto && values.female_is_ditto) {
    ctx.addIssue({
      code: "custom",
      path: ["female_is_ditto"],
      message: "Only one parent can be Ditto.",
    });
  }

  if (
    (values.gender === "Genderless" || values.gender === "MaleOnly") &&
    !values.female_is_ditto
  ) {
    ctx.addIssue({
      code: "custom",
      path: ["female_is_ditto"],
      message: "Genderless and male-only Pokemon breed with a female Ditto.",
    });
  }

  if (values.gender === "FemaleOnly" && values.female_is_ditto) {
    ctx.addIssue({
      code: "custom",
      path: ["female_is_ditto"],
      message: "Female-only Pokemon can't breed with a female Ditto.",
    });
  }
});

export type Gen7EggFormState = z.infer<typeof formShape>;

const PERFECT_IVS = { hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31 };

export const gen7EggInitialValues: Gen7EggFormState = {
  seed_3: 0,
  seed_2: 0,
  seed_1: 0,
  seed_0: 0,
  tsv: 0,
  trv: 0,
  masuda_method: true,
  shiny_charm: false,
  gender: "OneToOne",
  male_ivs: PERFECT_IVS,
  male_item: "None",
  male_ability: "First",
  male_nature: "Hardy",
  male_is_ditto: false,
  female_ivs: PERFECT_IVS,
  female_item: "None",
  female_ability: "First",
  female_nature: "Hardy",
  female_is_ditto: false,
  same_species: false,
  max_advance: 1000,
  ...getPkmFilterInitialValues(),
};

export const getGen7EggItemOptions = (t: Translations) =>
  gen7EggItems.map((item) => ({
    value: item,
    label: t[gen7EggItemLabels[item]],
  }));

export const formatGen7EggAbility = (t: Translations, ability: AbilityType) =>
  t[gen7EggAbilityLabels[ability]];

export const getGen7EggAbilityOptions = (t: Translations) =>
  ability12H.map((ability) => ({
    value: ability,
    label: formatGen7EggAbility(t, ability),
  }));

export const getGen7EggGenderOptions = (t: Translations) =>
  gen7EggGenders.map((gender) => ({
    value: gender,
    label: t[gen7EggGenderLabels[gender]],
  }));

const toRustGender = (gender: Gen7EggGenderOption): Gen7EggGender =>
  gender === "NidoranOrVolbeatIllumise" ? gender : { Ratio: gender };

const toPidMethod = (values: Gen7EggFormState): Gen7EggPidMethod =>
  match({ masuda: values.masuda_method, charm: values.shiny_charm })
    .with({ masuda: true, charm: true }, () => "MasudaAndShinyCharm" as const)
    .with({ masuda: true }, () => "MasudaMethod" as const)
    .otherwise(() => "ShinyCharm" as const);

const toPairing = (values: Gen7EggFormState): Gen7EggPairing =>
  match(values)
    .with({ male_is_ditto: true }, () => ({ Ditto: "Male" as const }))
    .with({ female_is_ditto: true }, () => ({ Ditto: "Female" as const }))
    .with({ same_species: true }, () => "SameSpecies" as const)
    .otherwise(() => "DifferentSpecies" as const);

const toParent = (
  values: Gen7EggFormState,
  parent: "male" | "female",
): Gen7EggParent => ({
  ivs: values[`${parent}_ivs`],
  item: values[`${parent}_item`],
  ability: values[`${parent}_ability`],
  nature: values[`${parent}_nature`],
});

const getGen7EggSeeds = (
  values: Gen7EggFormState,
): Gen7EggSearchOpts["egg_seeds"] => [
  values.seed_0,
  values.seed_1,
  values.seed_2,
  values.seed_3,
];

export const toGen7EggSearchOpts = (
  values: Gen7EggFormState,
): RustOption<Gen7EggSearchOpts> => ({
  egg_seeds: getGen7EggSeeds(values),
  tsv: values.tsv,
  trv: values.trv,
  pid_method: toPidMethod(values),
  gender: toRustGender(values.gender),
  parents: {
    male: toParent(values, "male"),
    female: toParent(values, "female"),
    pairing: toPairing(values),
  },
  max_advance: values.max_advance,
  filter: pkmFilterFieldsToRustInput(values),
});
