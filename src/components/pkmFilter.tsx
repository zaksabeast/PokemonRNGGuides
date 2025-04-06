import { PkmFilter } from "~/rngTools";
import { Field } from "~/components/formFieldTable";
import { FormikSwitch } from "~/components/switch";

export type PkmFilterFields = {
  [Key in keyof PkmFilter as `filter_${Key}`]: PkmFilter[Key];
};


export const getPkmFilterFields = <FormState extends PkmFilterFields>(): Field[] => (
  [
    {label: "Shiny", input: <FormikSwitch<FormState, "filter_shiny"> name="filter_shiny" />}
  ]
);