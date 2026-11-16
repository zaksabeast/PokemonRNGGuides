import * as tst from "ts-toolbelt";
import type { Species } from "~/rngTools";
import { FormControlledProps, GenericForm } from "~/types/form";
import type { Path, Paths } from "~/types";
import {
  FormSelectField,
  SelectField,
  type SelectFieldProps,
  type SelectOption,
} from "~/components/form/base/selectField";
import { toSpeciesOptions } from "./speciesOptions";

type EmptySpeciesValue = "None" | "Any" | null;

type SpeciesFieldValue = Species | EmptySpeciesValue;

type SpeciesForm = Record<string, SpeciesFieldValue>;

export type SpeciesFieldProps = tst.O.Merge<
  Omit<SelectFieldProps<Species>, "options">,
  { species: readonly Species[] }
>;

export const SpeciesField = ({ species, ...props }: SpeciesFieldProps) => (
  <SelectField<Species> {...props} options={toSpeciesOptions(species)} />
);

type FormSpeciesFieldKey<FormState extends GenericForm> = Paths<
  FormState,
  SpeciesFieldValue
>;

type EmptyOptionProps<FieldValue> = [Exclude<FieldValue, Species>] extends [
  never,
]
  ? { emptyOption?: SelectOption<Extract<FieldValue, EmptySpeciesValue>> }
  : {
      emptyOption: SelectOption<
        Extract<Exclude<FieldValue, Species>, EmptySpeciesValue>
      >;
    };

type FormSpeciesFieldProps<
  FormState extends GenericForm,
  FieldKey extends FormSpeciesFieldKey<FormState>,
> = {
  [Key in FieldKey]: tst.O.Merge<
    Omit<SelectFieldProps<SpeciesFieldValue>, FormControlledProps | "options">,
    {
      name: Key;
      species: readonly Extract<Path<FormState, Key>, Species>[];
    } & EmptyOptionProps<Path<FormState, Key>>
  >;
}[FieldKey];

export const FormSpeciesField = <
  FormState extends GenericForm,
  FieldKey extends
    FormSpeciesFieldKey<FormState> = FormSpeciesFieldKey<FormState>,
>({
  species,
  emptyOption,
  ...props
}: FormSpeciesFieldProps<FormState, FieldKey>) => {
  const speciesOptions: SelectOption<SpeciesFieldValue>[] =
    toSpeciesOptions(species);
  const options =
    emptyOption == null ? speciesOptions : [emptyOption, ...speciesOptions];

  return <FormSelectField<SpeciesForm> {...props} options={options} />;
};
