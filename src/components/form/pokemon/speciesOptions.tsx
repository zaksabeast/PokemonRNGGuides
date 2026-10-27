import { Species } from "~/rngTools";
import { PokemonIcon } from "~/components/pokemonIcon";
import { species, formatSpeciesLabel } from "~/types/species";
import { sortBy, memoize } from "lodash-es";

const createLazyOptions = (end: number) => {
  return memoize(() => {
    const speciesByDex = species.slice(1, end).map((value) => ({
      value,
      label: formatSpeciesLabel(value),
      icon: <PokemonIcon species={value} size={24} />,
    }));
    const speciesOptionsByName = sortBy(speciesByDex, (option) => option.label);

    return {
      byDex: speciesByDex,
      byName: speciesOptionsByName,
      byFilteredName: <Value extends Species>(species: readonly Value[]) => {
        const includedSpecies = new Set<Species>(species);
        return speciesOptionsByName.filter(
          (option): option is typeof option & { value: Value } =>
            includedSpecies.has(option.value),
        );
      },
      byNameOptional: [
        { label: "None", value: "None" } as const,
        ...speciesOptionsByName,
      ],
    };
  });
};

// Form variants are packed contiguously,
// so these include species + forms
const gen3End = 393;
const gen4End = 529;
const gen5End = 649;

export const getGen3SpeciesOptions = createLazyOptions(gen3End);
export const getGen4SpeciesOptions = createLazyOptions(gen4End);
export const getGen5SpeciesOptions = createLazyOptions(gen5End);
