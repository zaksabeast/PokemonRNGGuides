import { AbilityType, Species, rngTools } from "~/rngTools";
import React from "react";
import { FormikRadio } from "./radio";
import { GenericForm, GuaranteeFormNameType } from "~/types";
import { useField } from "~/hooks/form";
import { ability12, ability12H } from "~/types/ability";
import { abilities } from "~/translations/en/abilities";

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

const formatAbility = (ability: AbilityType | null) => ({
  label: ability ?? "Any",
  value: ability,
});

const ability12OptionsIfNoSpecies = ([null, ...ability12] as const).map(
  formatAbility,
);

const ability12HOptionsIfNoSpecies = ([null, ...ability12H] as const).map(
  formatAbility,
);

const getAbilityFilterOptions = async (
  species: Species,
  permitAny: boolean,
  mergeFirstSecondIfSameAbility: boolean,
) => {
  const possibleAbilities = await rngTools.get_species_abilities(species);
  const formattedAbilities = possibleAbilities.map(
    (ability) => abilities[ability],
  );

  const any = {
    label: "Any",
    value: null,
  };

  if (formattedAbilities.length === 0) {
    return [any];
  }

  if (
    formattedAbilities.length === 1 ||
    (formattedAbilities.length === 2 &&
      formattedAbilities[1] === formattedAbilities[0])
  ) {
    if (mergeFirstSecondIfSameAbility) {
      return [
        {
          label: formattedAbilities[0],
          value: null,
        },
      ];
    }
    return [
      ...(permitAny ? [any] : []),
      {
        label: formattedAbilities[0] + " (1)",
        value: "First" as const,
      },
      {
        label: formattedAbilities[0] + " (2)",
        value: "Second" as const,
      },
    ];
  }

  return [
    ...(permitAny ? [any] : []),
    {
      label: formattedAbilities[0],
      value: "First" as const,
    },
    {
      label: formattedAbilities[1],
      value: "Second" as const,
    },
  ];
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
      <FormikRadio<FormState>
        name={name}
        // @ts-expect-error -- prop types guarantee this is correct
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
