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
import { defaultHiddenPowerFilter, HiddenPowerInput, HiddenPowerSchema } from "./hiddenPowerInput";

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
} & {
  filter_hidden_power: tst.U.Exclude<PkmFilter['hidden_power'], undefined>,
};

export const pkmFilterSchema = z.object({
  filter_shiny: z.boolean(),
  filter_nature: z.enum(nature).nullable(),
  filter_ability: z.enum(ability).nullable(),
  filter_gender: z.enum(gender).nullable(),
  filter_min_ivs: IvsSchema,
  filter_max_ivs: IvsSchema,
  filter_max_size: z.boolean(),
  filter_hidden_power: HiddenPowerSchema, 
  filter_stats: z.null(),
});

export const pkmFilterFieldsToRustInput = (fields:PkmFilterFields) : PkmFilter => {
  return {
    shiny: fields.filter_shiny,
    nature: fields.filter_nature ?? undefined,
    gender: fields.filter_gender ?? undefined,
    min_ivs: fields.filter_min_ivs,
    max_ivs: fields.filter_max_ivs,
    ability: fields.filter_ability ?? undefined,
    max_size: fields.filter_max_size,
    hidden_power: fields.filter_hidden_power,
    stats: undefined,
  };
};

type FieldOptOuts = {
  shiny?: boolean;
  nature?: boolean;
  ability?: boolean;
  gender?: boolean;
  ivs?: boolean;
  max_size?: boolean;
  hidden_power?: boolean;
};

export const getPkmFilterInitialValues = (): PkmFilterFields =>
  ({
    filter_shiny: false,
    filter_min_ivs: minIvs,
    filter_max_ivs: maxIvs,
    filter_nature: null,
    filter_gender: null,
    filter_ability: null,
    filter_max_size: false,
    filter_hidden_power:defaultHiddenPowerFilter,
    filter_stats:null,
  }) as const;

const optOut = <T,>(condition: boolean | undefined, value: T): T | null => {
  return condition === false ? null : value;
};

const _getPkmFilterFields = (optOuts: FieldOptOuts = {}): Field[] =>
  [
    optOut(optOuts?.shiny, {
      label: "Shiny",
      input: (
        <FormikSwitch<PkmFilterFields, "filter_shiny"> name="filter_shiny" />
      ),
    }),
    optOut(optOuts?.nature, {
      label: "Nature",
      input: (
        <FormikSelect<PkmFilterFields, "filter_nature">
          name="filter_nature"
          options={natureOptions.optional}
        />
      ),
    }),
    optOut(optOuts?.ability, {
      label: "Ability",
      input: (
        <FormikSelect<PkmFilterFields, "filter_ability">
          name="filter_ability"
          options={abilityOptions}
        />
      ),
    }),
    optOut(optOuts?.gender, {
      label: "Gender",
      input: (
        <FormikSelect<PkmFilterFields, "filter_gender">
          name="filter_gender"
          options={genderOptions}
        />
      ),
    }),
    optOut(optOuts?.ivs, {
      label: "Min IVs",
      input: <IvInput<PkmFilterFields> name="filter_min_ivs" />,
    }),
    optOut(optOuts?.ivs, {
      label: "Max IVs",
      input: <IvInput<PkmFilterFields> name="filter_max_ivs" />,
    }),
    optOut(optOuts?.max_size, {
      label: "Max Size",
      input: (
        <FormikSwitch<PkmFilterFields, "filter_max_size"> name="filter_max_size" />
      ),
    }),
    optOut(optOuts?.hidden_power, {
      label: "Hidden Power",
      input: (
         <HiddenPowerInput<PkmFilterFields> name="filter_hidden_power"/>
      ),
    }),
  ].filter((field) => field !== null);

export const getPkmFilterFields = <FormField,>(
  optOuts?: FieldOptOuts,
): FormField extends PkmFilterFields ? Field[] : never => {
  return _getPkmFilterFields(optOuts) as FormField extends PkmFilterFields
    ? Field[]
    : never;
};
