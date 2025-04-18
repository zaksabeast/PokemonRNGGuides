import { PkmFilter } from "~/rngTools";
import { Field } from "~/components/formFieldTable";
import { FormikSwitch } from "~/components/switch";
import { FormikSelect } from "~/components/select";
import { natures } from "~/types/nature";
import { IvInput } from "~/components/ivInput";
import { ability } from "~/types/ability";
import { gender } from "~/types/gender";

export const natureOptions = ([undefined, ...[]] as const).map((nat) => ({
  label: nat ?? "None",
  value: nat,
}));

export const abilityOptions = ([undefined, ...ability] as const).map(
  (abil) => ({
    label: abil ?? "None",
    value: abil,
  }),
);

export const genderOptions = ([undefined, ...gender] as const).map((gen) => ({
  label: gen ?? "None",
  value: gen,
}));

export type PkmFilterFields = {
  [Key in keyof PkmFilter as `filter_${Key}`]: PkmFilter[Key];
};

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
