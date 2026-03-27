import { AbilityType, Species, rngTools } from "~/rngTools";

export const getAbilityFilterOptions = async (
  species: Species,
  permitAny = true,
) => {
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
