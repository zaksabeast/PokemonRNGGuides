import { Species } from "~/rngTools";
import {
  Field,
  FormikSelect,
  FormFieldTable,
  Flex,
  Typography,
} from "~/components";
import { toOptions } from "~/utils/options";
import { useFormContext } from "~/hooks/form";
import { getPkmFilterFields } from "~/components/pkmFilter";
import React from "react";
import { gen3SpeciesHasVariableSize } from "~/types";
import { getGen3PkmFilterFields } from "~/components/gen3PkmFilter";

import { getWild3EmeraldGameData } from "./data/wild3GameData";
import { useWatch } from "react-hook-form";
import { getPossibleValuesForSpecies } from "./wild3TargetMon";
import { FormState } from "./wild3FindTarget";

const emeraldWildGameData = getWild3EmeraldGameData();

const getTargetMonFields = (species: Species): Field[] => {
  const targetMonFields: Field[] = [
    {
      label: "Species",
      input: (
        <FormikSelect<FormState, "species">
          name="species"
          options={toOptions(emeraldWildGameData.species)}
        />
      ),
    },
    ...getPkmFilterFields({
      species,
      displayHiddenAbility: false,
    }),
    ...getGen3PkmFilterFields({
      max_size: gen3SpeciesHasVariableSize(species),
    }),
  ];
  return targetMonFields;
};

export const TargetMon = () => {
  const { setFieldValue } = useFormContext<FormState>();
  const species = useWatch<FormState, "species">({
    name: "species",
  });

  const fields = React.useMemo((): Field[] => {
    return getTargetMonFields(species);
  }, [species]);

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
    <Flex vertical gap={8}>
      <Typography.Title level={5} p={0} m={0}>
        Target Pokémon
      </Typography.Title>
      <FormFieldTable fields={fields} />
    </Flex>
  );
};
