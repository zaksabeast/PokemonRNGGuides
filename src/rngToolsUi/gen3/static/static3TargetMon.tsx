import {
  Field,
  FormFieldTable,
  FormikSelect,
  Flex,
  Typography,
} from "~/components";
import { getGen3PkmFilterFields } from "~/components/gen3PkmFilter";
import { getPkmFilterFields } from "~/components/pkmFilter";
import { Species } from "~/rngTools";
import { toOptions } from "~/utils/options";
import { useWatch } from "react-hook-form";

import {
  FormState,
  getPossibleValuesForSpecies,
} from "./static3TargetSetupInput";

const getTargetMonFields = (species: Species): Field[] => {
  const possibleValues = getPossibleValuesForSpecies(species);
  return [
    {
      label: "Species",
      input: (
        <FormikSelect<FormState, "species">
          name="species"
          options={toOptions(possibleValues.species)}
        />
      ),
    },
    ...getPkmFilterFields({
      species,
      displayHiddenAbility: false,
    }),
    ...getGen3PkmFilterFields(),
  ];
};

export const Static3TargetMon = () => {
  const species = useWatch<FormState, "species">({
    name: "species",
  });

  return (
    <Flex vertical gap={8}>
      <Typography.Title level={5} p={0} m={0}>
        Target Pokémon
      </Typography.Title>
      <FormFieldTable fields={getTargetMonFields(species)} />
    </Flex>
  );
};
