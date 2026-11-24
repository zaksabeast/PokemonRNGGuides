import { getGen3SpeciesOptions } from "~/components/form/pokemon/speciesOptions";
import {
  FormSection,
  FormSelectField,
  Gen3PkmFilter,
  PkmFilter,
} from "~/components/form";
import { useFormContext, useWatch } from "~/hooks/form";
import React from "react";
import { gen3SpeciesHasVariableSize } from "~/types";

import { getWild3EmeraldGameData } from "./data/wild3GameData";
import { getPossibleValuesForSpecies } from "./wild3TargetMon";
import { FormState, Validator } from "./wild3TargetSetupSearcher";

const emeraldWildGameData = getWild3EmeraldGameData();

export const Wild3TargetMon = () => {
  const { setFieldValue } = useFormContext<FormState>();
  const { species, filter_min_lvl, filter_max_lvl } = useWatch({
    validationSchema: Validator,
    names: { species: true, filter_min_lvl: true, filter_max_lvl: true },
  });

  const speciesToUse = species ?? "Abra";

  // when user changes species, select all the possible setup values
  React.useEffect(() => {
    const possVals = getPossibleValuesForSpecies(speciesToUse);

    setFieldValue("maps", possVals.maps);
    setFieldValue("actions", possVals.actions);
    setFieldValue("roamerStates", possVals.roamerStates);
    setFieldValue("massOutbreakStates", possVals.massOutbreakStates);
    setFieldValue("feebasStates", possVals.feebasStates);

    if (possVals.levelRange != null) {
      if (filter_min_lvl != null && filter_min_lvl > possVals.levelRange.max) {
        setFieldValue("filter_min_lvl", possVals.levelRange.max);
      }
      if (filter_max_lvl != null && filter_max_lvl < possVals.levelRange.min) {
        setFieldValue("filter_max_lvl", possVals.levelRange.min);
      }
    }
  }, [speciesToUse, setFieldValue, filter_min_lvl, filter_max_lvl]);

  return (
    <FormSection title="Target Pokémon">
      <FormSelectField<FormState>
        name="species"
        label="Species"
        options={getGen3SpeciesOptions().byFilteredName(
          emeraldWildGameData.species,
        )}
      />
      <PkmFilter<FormState>
        generation={3}
        species={speciesToUse}
        displayHiddenAbility={false}
      />
      <Gen3PkmFilter<FormState>
        displayMaxSize={gen3SpeciesHasVariableSize(speciesToUse)}
        levelRange={getPossibleValuesForSpecies(speciesToUse).levelRange}
      />
    </FormSection>
  );
};
