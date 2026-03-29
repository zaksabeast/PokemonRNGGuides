import { AbilityType, Species, rngTools } from "~/rngTools";
import React from "react";
import { FormikRadio } from "./radio";
import { GenericForm, GuaranteeFormNameType } from "~/types";
import { useField } from "~/hooks/form";

type FormikAbilityFilterProps<FormState extends GenericForm> = {
  species: Species;
  permitAny?: boolean;
  name: GuaranteeFormNameType<FormState, AbilityType | null>;
};

const getAbilityFilterOptions = async (species: Species, permitAny = true) => {
  const possibleAbilities = await rngTools.get_species_abilities(species);

  const opts: { label: string; value: AbilityType | null }[] = [];

  if (permitAny || possibleAbilities.length === 0) {
    opts.push({
      label: "Any",
      value: null,
    });
  }

  if (possibleAbilities.length > 0) {
    opts.push({
      label: possibleAbilities[0],
      value: "First",
    });
  }
  if (
    possibleAbilities.length > 1 &&
    possibleAbilities[1] !== possibleAbilities[0]
  ) {
    opts.push({
      label: possibleAbilities[1],
      value: "Second",
    });
  }

  return opts;
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
