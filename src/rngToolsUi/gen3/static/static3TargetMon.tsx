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

import { getStatic3SpeciesEncounters, Static3Game } from "./constants";
import uniq from "lodash-es/uniq";
import { FormState } from "./static3TargetSetupSearcher";

export const getPossibleRoamingValuesForSpecies = (
  game: Static3Game,
  selectedSpecies: Species,
) => {
  return uniq(
    getStatic3SpeciesEncounters(game)
      .filter((encounter) => encounter.species === selectedSpecies)
      .map((encounter) => encounter.roaming),
  );
};

export const getPossibleSpecies = (game: Static3Game) => {
  return uniq(
    getStatic3SpeciesEncounters(game).map((encounter) => encounter.species),
  );
};

const getTargetMonFields = (
  game: Static3Game,
  selectedSpecies: Species,
): Field[] => {
  const possibleSpecies = getPossibleSpecies(game);
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
