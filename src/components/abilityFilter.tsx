import { AbilityType, Species } from "~/rngTools";
import React from "react";
import { FormikRadio } from "./radio";
import { GenericForm, GuaranteeFormNameType } from "~/types";
import { useField } from "~/hooks/form";
import {
  ability12HOptionsIfNoSpecies,
  ability12OptionsIfNoSpecies,
  getAbilityFilterOptions,
} from "./abilityFilterOptions";

type FormikAbilityFilterProps<FormState extends GenericForm> = {
  name: GuaranteeFormNameType<FormState, AbilityType | null>;
  species?: Species;
  permitAny?: boolean;
  /** The reason to not always merge first and second abilities if they are the same on a specific Pokémon
   * is that the ability exact slot has an impact if its evolution has 2 different abilities.
   */
  mergeFirstSecondIfSameAbility?: boolean;
  displayHiddenAbility?: boolean;
};

export const FormikAbilityFilter = <FormState extends GenericForm>({
  name,
  species,
  permitAny = true,
  displayHiddenAbility = false,
  mergeFirstSecondIfSameAbility = false,
}: FormikAbilityFilterProps<FormState>) => {
  const [{ value }, , { setValue }] = useField<AbilityType | null>(name);

  const [options, setOptions] = React.useState<
    {
      label: string;
      value: AbilityType | null;
    }[]
  >([]);

  React.useEffect(() => {
    if (species == null) {
      return;
    }

    getAbilityFilterOptions(
      species,
      permitAny,
      mergeFirstSecondIfSameAbility,
    ).then((opts) => {
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
  }, [mergeFirstSecondIfSameAbility, permitAny, setValue, species, value]);

  if (species == null) {
    return (
      // @ts-expect-error -- prop types guarantee this is correct
      <FormikRadio<FormState>
        name={name}
        options={
          displayHiddenAbility
            ? ability12HOptionsIfNoSpecies
            : ability12OptionsIfNoSpecies
        }
      />
    );
  }

  // No need to pass generic types since they're validated above
  // @ts-expect-error -- prop types guarantee this is correct
  return <FormikRadio name={name} options={options} />;
};
