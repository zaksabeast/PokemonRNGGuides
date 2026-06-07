import {
  Field,
  FormFieldTable,
  FormikSelect,
  FormikSwitch,
  Flex,
  Typography,
} from "~/components";
import { getGen3PkmFilterFields } from "~/components/gen3PkmFilter";
import { getPkmFilterFields } from "~/components/pkmFilter";
import { Species } from "~/rngTools";
import { toOptions } from "~/utils/options";
import { useWatch } from "react-hook-form";

import {
  getPossibleRoamingValuesForSpecies,
  getPossibleStatic3Species,
  Static3Game,
} from "./constants";
import { FormState } from "./static3TargetSetupSearcher";

const getTargetMonFields = (
  game: Static3Game,
  selectedSpecies: Species,
): Field[] => {
  const possibleSpecies = getPossibleStatic3Species(game);
  const possibleRoaming = getPossibleRoamingValuesForSpecies(
    game,
    selectedSpecies,
  );

  return [
    {
      label: "Species",
      input: (
        <FormikSelect<FormState, "species">
          name="species"
          options={toOptions(possibleSpecies)}
        />
      ),
    },
    {
      label: "Roaming",
      input: <FormikSwitch<FormState> name="roaming" />,
      show: possibleRoaming.length > 1,
    },
    ...getPkmFilterFields({
      species: selectedSpecies,
      displayHiddenAbility: false,
    }),
    ...getGen3PkmFilterFields(),
  ];
};

export const Static3TargetMon = ({ game }: { game: Static3Game }) => {
  const species = useWatch<FormState, "species">({
    name: "species",
  });

  return (
    <Flex vertical gap={8}>
      <Typography.Title level={5} p={0} m={0}>
        Target Pokémon
      </Typography.Title>
      <FormFieldTable fields={getTargetMonFields(game, species)} />
    </Flex>
  );
};
