import { PkmFilter } from "~/rngTools";
import { Field } from "~/components/formFieldTable";
import { FormikSwitch } from "~/components/switch";
import { FormikSelect } from "~/components/select";
import { nature } from "~/types/nature";
import { IvInput, IvSchema } from "~/components/ivInput";
import { ability } from "~/types/ability";
import { gender } from "~/types/gender";
import { z } from "zod";
import * as tst from "ts-toolbelt";

export const natureOptions = ([null, ...nature] as const).map((nat) => ({
  label: nat ?? "None",
  value: nat,
}));

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
  filter_min_ivs: IvSchema,
  filter_max_ivs: IvSchema,
}) satisfies z.Schema<PkmFilterFields>;

const _getPkmFilterFields = (): Field[] => [
  {
    label: "Shiny",
    input: (
      <FormikSwitch<PkmFilterFields, "filter_shiny"> name="filter_shiny" />
    ),
  },
  {
    label: "Nature",
    input: (
      <FormikSelect<PkmFilterFields, "filter_nature">
        name="filter_nature"
        options={natureOptions}
      />
    ),
  },
  {
    label: "Ability",
    input: (
      <FormikSelect<PkmFilterFields, "filter_ability">
        name="filter_ability"
        options={abilityOptions}
      />
    ),
  },
  {
    label: "Gender",
    input: (
      <FormikSelect<PkmFilterFields, "filter_gender">
        name="filter_gender"
        options={genderOptions}
      />
    ),
  },
  {
    label: "Min IVs",
    input: <IvInput<PkmFilterFields> name="filter_min_ivs" />,
  },
  {
    label: "Max IVs",
    input: <IvInput<PkmFilterFields> name="filter_max_ivs" />,
  },
];

export const getPkmFilterFields = <
  FormField,
>(): FormField extends PkmFilterFields ? Field[] : never => {
  return _getPkmFilterFields() as FormField extends PkmFilterFields
    ? Field[]
    : never;
};
