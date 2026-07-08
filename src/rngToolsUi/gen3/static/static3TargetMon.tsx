import {
  Field,
  FormFieldTable,
  FormikSelect,
  FormikSwitch,
  Flex,
  Typography,
  Link,
} from "~/components";
import { getGen3PkmFilterFields } from "~/components/gen3PkmFilter";
import { getPkmFilterFields } from "~/components/pkmFilter";
import { useWatch } from "~/hooks/form";
import { Species } from "~/rngTools";
import { toOptions } from "~/utils/options";
import { z } from "zod";

import {
  hasMultiplePossibleRoamingValuesForSpecies,
  getPossibleStatic3Species,
  getStatic3SpeciesEncounter,
  Static3Game,
} from "./constants.tsx";
import { FormState } from "./static3TargetSetupSearcher";
import { targetSetupSearcherSchema } from "../pokemonRng/targetSetupSearcher";

const targetMonSchema = targetSetupSearcherSchema.extend({
  roaming: z.boolean(),
});

const getTargetMonFields = (
  game: Static3Game,
  selectedSpecies: Species,
  selectedRoaming: boolean,
  filter_shiny: boolean,
): Field[] => {
  const possibleSpecies = getPossibleStatic3Species(game);
  const hasMultiplePossibleRoaming = hasMultiplePossibleRoamingValuesForSpecies(
    game,
    selectedSpecies,
  );

  const selectedEncounter = getStatic3SpeciesEncounter(
    game,
    selectedSpecies,
    selectedRoaming,
  );

  const isStarter =
    selectedSpecies === "Mudkip" ||
    selectedSpecies === "Treecko" ||
    selectedSpecies === "Torchic";

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
      show: hasMultiplePossibleRoaming,
    },
    {
      label: "Map",
      input: selectedEncounter?.location,
      show: selectedEncounter != null,
    },
    {
      label: "Level",
      input: selectedEncounter?.lvl,
      show: selectedEncounter != null,
    },
    {
      label: "",
      input: (
        <>
          Note: Use <Link href="/emerald-shiny-starter/">Shiny Starter</Link>{" "}
          webtool if you don't know your SID.
        </>
      ),
      show: game === "emerald" && isStarter && filter_shiny,
    },
    ...getPkmFilterFields({
      species: selectedSpecies,
      displayHiddenAbility: false,
    }),
    ...getGen3PkmFilterFields(),
  ];
};

export const Static3TargetMon = ({ game }: { game: Static3Game }) => {
  const { species, roaming, filter_shiny } = useWatch({
    names: {
      species: true,
      roaming: true,
      filter_shiny: true,
    },
    validationSchema: targetMonSchema,
  });

  return (
    <Flex vertical gap={8}>
      <Typography.Title level={5} p={0} m={0}>
        Target Pokémon
      </Typography.Title>
      <FormFieldTable
        fields={getTargetMonFields(
          game,
          species ?? getPossibleStatic3Species(game)[0],
          roaming ?? false,
          filter_shiny ?? false,
        )}
      />
    </Flex>
  );
};
