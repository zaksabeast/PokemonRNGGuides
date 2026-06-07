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
import { Species } from "~/rngTools";
import { toOptions } from "~/utils/options";
import { useWatch } from "react-hook-form";

import {
  getPossibleRoamingValuesForSpecies,
  getPossibleStatic3Species,
  getStatic3SpeciesEncounters,
  Static3Game,
} from "./constants";
import { FormState } from "./static3TargetSetupSearcher";

const getTargetMonFields = (
  game: Static3Game,
  selectedSpecies: Species,
  selectedRoaming: boolean,
  filter_shiny: boolean,
): Field[] => {
  const possibleSpecies = getPossibleStatic3Species(game);
  const possibleRoaming = getPossibleRoamingValuesForSpecies(
    game,
    selectedSpecies,
  );

  const selectedRoamingFixed = possibleRoaming.includes(selectedRoaming)
    ? selectedRoaming
    : possibleRoaming[0];
  const selectedEncounter = getStatic3SpeciesEncounters(game).find(
    (enc) =>
      enc.species === selectedSpecies && enc.roaming === selectedRoamingFixed,
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
      show: possibleRoaming.length > 1,
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
  const species = useWatch<FormState, "species">({
    name: "species",
  });
  const roaming = useWatch<FormState, "roaming">({
    name: "roaming",
  });
  const filter_shiny = useWatch<FormState, "filter_shiny">({
    name: "filter_shiny",
  });

  return (
    <Flex vertical gap={8}>
      <Typography.Title level={5} p={0} m={0}>
        Target Pokémon
      </Typography.Title>
      <FormFieldTable
        fields={getTargetMonFields(game, species, roaming, filter_shiny)}
      />
    </Flex>
  );
};
