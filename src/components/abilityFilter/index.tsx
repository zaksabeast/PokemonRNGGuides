import { AbilityType, Species } from "~/rngTools";
import React from "react";
import { FormikRadio } from "../radio";
import { getAbilityFilterOptions } from "./options";
import { GenericForm, GuaranteeFormNameType } from "~/types";
import { useField } from "~/hooks/form";

type FormikAbilityFilterProps<FormState extends GenericForm> = {
  species: Species;
  permitAny?: boolean;
  name: GuaranteeFormNameType<FormState, AbilityType | null>;
};

export const FormikAbilityFilter = <FormState extends GenericForm>({
  species,
  permitAny = true,
  name,
}: FormikAbilityFilterProps<FormState>) => {
  const [{ value }, , { setValue }] = useField<AbilityType | null>(name);

  const [options, setOptions] = React.useState<
    {
      label: string;
      value: AbilityType | null;
    }[]
  >([]);

  React.useEffect(() => {
    getAbilityFilterOptions(species, permitAny).then((opts) => {
      setOptions(opts);

      if (opts.some((opt) => opt.value === value)) {
        return;
      }

      if (opts.length === 0) {
        return;
      }

      // Currently selected value is invalid.
      setValue(opts[0].value);
    });
  }, [permitAny, setValue, species, value]);

  // No need to pass generic types since they're validated above
  return <FormikRadio name={name} options={options} />;
};
