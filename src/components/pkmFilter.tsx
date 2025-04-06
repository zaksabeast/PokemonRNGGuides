import { PkmFilter } from "~/rngTools";
import { Field } from "~/components/formFieldTable";
import { FormikSwitch } from "~/components/switch";
import { FormikSelect } from "~/components/select";
import { nature } from "~/types/nature";
import { IvInput } from "~/components/ivInput";
import { ability } from "~/types/ability";
import { gender } from "~/types/gender";

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
        labelRender={(labelInfo) =>
          labelInfo.value != null ? labelInfo.label : "None"
        }
        options={(["None", ...nature] as const).map((nat) => ({
          label: nat,
          value: nat === "None" ? null : nat,
        }))}
      />
    ),
  },
  {
    label: "Ability",
    input: (
      <FormikSelect<PkmFilterFields, "filter_ability">
        name="filter_ability"
        labelRender={(labelInfo) =>
          labelInfo.value != null ? labelInfo.label : "None"
        }
        options={(["None", ...ability] as const).map((abil) => ({
          label: abil,
          value: abil === "None" ? null : abil,
        }))}
      />
    ),
  },
  {
    label: "Gender",
    input: (
      <FormikSelect<PkmFilterFields, "filter_gender">
        name="filter_gender"
        labelRender={(labelInfo) =>
          labelInfo.value != null ? labelInfo.label : "None"
        }
        options={(["None", ...gender] as const).map((gen) => ({
          label: gen,
          value: gen === "None" ? null : gen,
        }))}
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

export function getPkmFilterFields<
  FormField,
>(): FormField extends PkmFilterFields ? Field[] : never {
  return _getPkmFilterFields() as FormField extends PkmFilterFields
    ? Field[]
    : never;
}
