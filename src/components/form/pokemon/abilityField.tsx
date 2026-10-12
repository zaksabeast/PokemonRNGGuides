import React from "react";
import { type AbilityType, type Species } from "~/rngTools";
import {
  ability12HOptionsIfNoSpecies,
  ability12OptionsIfNoSpecies,
  getAbilityFilterOptions,
} from "~/components/abilityFilterOptions";
import { useActiveRouteTranslations } from "~/hooks/useActiveRoute";
import { GenericForm } from "~/types/form";
import { Paths } from "~/types";
import {
  FormRadioField,
  type RadioOption,
} from "~/components/form/base/radioField";

type AbilityForm = Record<string, AbilityType | null>;

type AbilityFilterFieldProps<FormState extends GenericForm> = {
  name: Paths<FormState, AbilityType | null>;
  /** Shows the species' ability names instead of slots */
  species?: Species;
  permitAny?: boolean;
  displayHiddenAbility?: boolean;
  /** Keep separate when the slot matters, e.g. an evolution has two different abilities */
  mergeFirstSecondIfSameAbility?: boolean;
};

export const AbilityFilterField = <FormState extends GenericForm>({
  name,
  species,
  permitAny = true,
  displayHiddenAbility = false,
  mergeFirstSecondIfSameAbility = false,
}: AbilityFilterFieldProps<FormState>) => {
  const t = useActiveRouteTranslations();
  const [speciesOptions, setSpeciesOptions] = React.useState<
    RadioOption<AbilityType | null>[]
  >([]);

  React.useEffect(() => {
    if (species == null) {
      return;
    }

    let cancelled = false;

    getAbilityFilterOptions(
      species,
      permitAny,
      mergeFirstSecondIfSameAbility,
    ).then((options) => {
      if (!cancelled) {
        setSpeciesOptions(options);
      }
    });

    return () => {
      cancelled = true;
    };
  }, [species, permitAny, mergeFirstSecondIfSameAbility]);

  const slotOptions = displayHiddenAbility
    ? ability12HOptionsIfNoSpecies
    : ability12OptionsIfNoSpecies;

  return (
    <FormRadioField<AbilityForm>
      name={name}
      label={t["Ability"]}
      cellSize="word"
      options={species == null ? slotOptions : speciesOptions}
    />
  );
};
