import { AbilityType, Species, rngTools } from "~/rngTools";
import { ability12, ability12H } from "~/types/ability";
import { abilities } from "~/translations/en/abilities";

const formatAbility = (ability: AbilityType | null) => ({
  label: ability ?? "Any",
  value: ability,
});

export const ability12OptionsIfNoSpecies = ([null, ...ability12] as const).map(
  formatAbility,
);

export const ability12HOptionsIfNoSpecies = (
  [null, ...ability12H] as const
).map(formatAbility);

export const getAbilityFilterOptions = async (
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
