import { getGen3SpeciesOptions } from "~/types/species";
import {
  FormSection,
  FormSelectField,
  Gen3PkmFilter,
  PkmFilter,
} from "~/components/form";
import { useFormContext, useWatch_UNSAFE } from "~/hooks/form";
import React from "react";
import { gen3SpeciesHasVariableSize } from "~/types";

import { getWild3EmeraldGameData } from "./data/wild3GameData";
import { getPossibleValuesForSpecies } from "./wild3TargetMon";
import { FormState } from "./wild3TargetSetupSearcher";

const emeraldWildGameData = getWild3EmeraldGameData();

export const Wild3TargetMon = () => {
  const { setFieldValue } = useFormContext<FormState>();
  const species = useWatch_UNSAFE<FormState, "species">({
    name: "species",
  });

  // when user changes species, select all the possible setup values
  React.useEffect(() => {
    const possVals = getPossibleValuesForSpecies(species);

    setFieldValue("maps", possVals.maps);
    setFieldValue("actions", possVals.actions);
    setFieldValue("roamerStates", possVals.roamerStates);
    setFieldValue("massOutbreakStates", possVals.massOutbreakStates);
    setFieldValue("feebasStates", possVals.feebasStates);
  }, [species, setFieldValue]);

  return (
    <FormSection title="Target Pokémon">
      <FormSelectField<FormState>
        name="species"
        label="Species"
        options={getGen3SpeciesOptions().byFilteredName(
          emeraldWildGameData.species,
        )}
      />
      <PkmFilter<FormState> species={species} displayHiddenAbility={false} />
      <Gen3PkmFilter<FormState>
        displayMaxSize={gen3SpeciesHasVariableSize(species)}
      />
    </FormSection>
  );
};
