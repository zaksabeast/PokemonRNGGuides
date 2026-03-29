import { AbilityType, Species, rngTools } from "~/rngTools";
import React from "react";
import { FormikRadio } from "./radio";
import { GenericForm, GuaranteeFormNameType } from "~/types";
import { useField } from "~/hooks/form";
import { ability } from "~/types/ability";
import { PkmFilterFields } from "./pkmFilter";

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

const abilityOptionsIfNoSpecies = ([null, ...ability] as const).map((abil) => ({
  label: abil ?? ("Any" as const),
  value: abil,
}));

const getAbilityFilterOptions = async (
  species: Species,
  permitAny: boolean,
  mergeFirstSecondIfSameAbility: boolean,
) => {
  const possibleAbilities = await rngTools.get_species_abilities(species);

  const any = {
    label: "Any",
    value: null,
  };

  if (possibleAbilities.length === 0) {
    return [any];
  }

  if (
    possibleAbilities.length === 1 ||
    (possibleAbilities.length === 2 &&
      possibleAbilities[1] === possibleAbilities[0])
  ) {
    if (mergeFirstSecondIfSameAbility) {
      return [
        {
          label: possibleAbilities[0],
          value: null,
        },
      ];
    }
    return [
      {
        label: possibleAbilities[0] + " (1)",
        value: "First" as const,
      },
      {
        label: possibleAbilities[0] + " (2)",
        value: "Second" as const,
      },
    ];
  }

  return [
    ...(permitAny ? [any] : []),
    {
      label: possibleAbilities[0],
      value: "First" as const,
    },
    {
      label: possibleAbilities[1],
      value: "Second" as const,
    },
  ];
};

export const FormikAbilityFilter = <FormState extends GenericForm>({
  name,
  species,
  permitAny = true,
  displayHiddenAbility = true,
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

  if (species == null || displayHiddenAbility) {
    return (
      <FormikRadio<PkmFilterFields>
        name="filter_ability"
        // @ts-expect-error -- prop types guarantee this is correct
        options={abilityOptionsIfNoSpecies}
      />
    );
  }

  // No need to pass generic types since they're validated above
  // @ts-expect-error -- prop types guarantee this is correct
  return <FormikRadio name={name} options={options} />;
};
