import { Species } from "~/rngTools";
import type { SelectOption } from "~/components/form/base/selectField";
import { species, formatSpeciesLabel } from "~/types/species";
import { sortBy, memoize } from "lodash-es";
import { SpeciesOptionIcon } from "./speciesOptionIcon";

const getSpeciesOptionDisplay = memoize((value: Species) => ({
  label: formatSpeciesLabel(value),
  icon: <SpeciesOptionIcon species={value} />,
}));

export const toSpeciesOptions = <Value extends Species>(
  speciesList: readonly Value[],
): SelectOption<Value>[] =>
  speciesList.map((value) => ({ ...getSpeciesOptionDisplay(value), value }));

const createLazySpecies = (end: number) => {
  return memoize(() => {
    const speciesByDex = species.slice(1, end);
    const speciesByName = sortBy(speciesByDex, formatSpeciesLabel);

    return {
      byDex: speciesByDex,
      byName: speciesByName,
      byFilteredName: <Value extends Species>(
        includedSpeciesList: readonly Value[],
      ) => {
        const includedSpecies = new Set<Species>(includedSpeciesList);

        return speciesByName.filter((value): value is Value =>
          includedSpecies.has(value),
        );
      },
    };
  });
};

// Form variants are packed contiguously,
// so these include species + forms
const gen3End = 393;
const gen4End = 529;
const gen5End = 649;

export const getGen3Species = createLazySpecies(gen3End);
export const getGen4Species = createLazySpecies(gen4End);
export const getGen5Species = createLazySpecies(gen5End);
