import { PkmFilter } from "~/rngTools";
import { Field } from "~/components/formFieldTable";
import { FormikSwitch } from "~/components/switch";
import { FormikSelect } from "~/components/select";
import { nature } from "~/types/nature";
import { IvInput, IvsSchema } from "~/components/ivInput";
import { ability } from "~/types/ability";
import { gender } from "~/types/gender";
import { maxIvs, minIvs } from "~/types/ivs";
import { z } from "zod";
import * as tst from "ts-toolbelt";
import { toOptions } from "~/utils/options";
import {
  defaultHiddenPowerFilter,
  HiddenPowerInput,
  HiddenPowerSchema,
} from "./hiddenPowerInput";
import { StatsFilterSchema } from "../types/stat";
import { Translations } from "~/translations";

const sortedNatures = nature.toSorted();

const requiredNatureOptions = toOptions(sortedNatures);
const optionalNatureOptions = [
  {
    label: "None",
    value: null,
  },
  ...requiredNatureOptions,
];

export const natureOptions = {
  required: requiredNatureOptions,
  optional: optionalNatureOptions,
};

export const abilityOptions = ([null, ...ability] as const).map((abil) => ({
  label: abil ?? "None",
  value: abil,
}));

export const genderOptions = ([null, ...gender] as const).map((gen) => ({
  label: gen ?? "None",
  value: gen,
}));

export type PkmFilterFields = {
  [Key in keyof PkmFilter as `filter_${Key}`]: undefined extends PkmFilter[Key]
    ? tst.U.Exclude<PkmFilter[Key], undefined> | null
    : PkmFilter[Key];
};

export const pkmFilterSchema = z.object({
  filter_shiny: z.boolean(),
  filter_nature: z.enum(nature).nullable(),
  filter_ability: z.enum(ability).nullable(),
  filter_gender: z.enum(gender).nullable(),
  filter_min_ivs: IvsSchema,
  filter_max_ivs: IvsSchema,
  filter_hidden_power: HiddenPowerSchema,
  filter_stats: StatsFilterSchema.nullable(),
});

export const pkmFilterFieldsToRustInput = (
  fields: PkmFilterFields,
): PkmFilter => {
  return {
    shiny: fields.filter_shiny,
    nature: fields.filter_nature,
    gender: fields.filter_gender,
    min_ivs: fields.filter_min_ivs,
    max_ivs: fields.filter_max_ivs,
    ability: fields.filter_ability,
    hidden_power: fields.filter_hidden_power,
    stats: null,
  };
};

type FieldOptOuts = {
  shiny?: boolean;
  nature?: boolean;
  ability?: boolean;
  gender?: boolean;
  ivs?: boolean;
  hidden_power?: boolean;
};

export const getPkmFilterInitialValues = (): PkmFilterFields => ({
  filter_shiny: false,
  filter_min_ivs: minIvs,
  filter_max_ivs: maxIvs,
  filter_nature: null,
  filter_gender: null,
  filter_ability: null,
  filter_hidden_power: defaultHiddenPowerFilter,
  filter_stats: null,
});

const optOut = <T,>(condition: boolean | undefined, value: T): T | null => {
  return condition === false ? null : value;
};

const _getPkmFilterFields = (
  optOuts: FieldOptOuts = {},
  t?: Translations,
): Field[] =>
  [
    optOut(optOuts?.shiny, {
      label: t?.["Shiny"] ?? "Shiny",
      input: (
        <FormikSwitch<PkmFilterFields, "filter_shiny"> name="filter_shiny" />
      ),
    }),
    optOut(optOuts?.nature, {
      label: t?.["Nature"] ?? "Nature",
      input: (
        <FormikSelect<PkmFilterFields, "filter_nature">
          name="filter_nature"
          options={natureOptions.optional}
        />
      ),
    }),
    optOut(optOuts?.ability, {
      label: t?.["Ability"] ?? "Ability",
      input: (
        <FormikSelect<PkmFilterFields, "filter_ability">
          name="filter_ability"
          options={abilityOptions}
        />
      ),
    }),
    optOut(optOuts?.gender, {
      label: t?.["Gender"] ?? "Gender",
      input: (
        <FormikSelect<PkmFilterFields, "filter_gender">
          name="filter_gender"
          options={genderOptions}
        />
      ),
    }),
    optOut(optOuts?.ivs, {
      label: t?.["Min IVs"] ?? "Min IVs",
      input: <IvInput<PkmFilterFields> name="filter_min_ivs" />,
    }),
    optOut(optOuts?.ivs, {
      label: t?.["Max IVs"] ?? "Max IVs",
      input: <IvInput<PkmFilterFields> name="filter_max_ivs" />,
    }),
    optOut(optOuts?.hidden_power, {
      label: "Hidden Power",
      input: (
        <FormikSwitch<
          PkmFilterFields,
          //@ts-expect-error TODO
          "filter_hidden_power.active"
        > name="filter_hidden_power.active" />
      ),
    }),
    optOut(optOuts?.hidden_power, {
      label: "",
      direction: "column",
      input: <HiddenPowerInput<PkmFilterFields> name="filter_hidden_power" />,
    }),
  ].filter((field) => field !== null);

export const getPkmFilterFields = <FormField,>(
  optOuts?: FieldOptOuts,
  t?: Translations,
): FormField extends PkmFilterFields ? Field[] : never => {
  return _getPkmFilterFields(optOuts, t) as FormField extends PkmFilterFields
    ? Field[]
    : never;
};
