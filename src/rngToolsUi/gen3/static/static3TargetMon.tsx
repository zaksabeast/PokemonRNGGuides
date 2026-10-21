import { getGen3SpeciesOptions } from "~/components/form/pokemon/speciesOptions";
import { Typography, Link } from "~/components";
import {
  FormSection,
  FormSelectField,
  FormSummary,
  FormSwitchField,
  Gen3PkmFilter,
  PkmFilter,
} from "~/components/form";
import { useWatch } from "~/hooks/form";
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

export const Static3TargetMon = ({ game }: { game: Static3Game }) => {
  const watched = useWatch({
    names: {
      species: true,
      roaming: true,
      filter_shiny: true,
    },
    validationSchema: targetMonSchema,
  });

  const possibleSpecies = getPossibleStatic3Species(game);
  const selectedSpecies = watched.species ?? possibleSpecies[0];
  const selectedRoaming = watched.roaming ?? false;
  const filterShiny = watched.filter_shiny ?? "Any";

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

  return (
    <FormSection title="Target Pokémon">
      <FormSelectField<FormState>
        name="species"
        label="Species"
        options={getGen3SpeciesOptions().byFilteredName(possibleSpecies)}
      />
      {hasMultiplePossibleRoaming && (
        <FormSwitchField<FormState> name="roaming" label="Roaming" />
      )}
      {selectedEncounter != null && (
        <FormSummary
          rows={[
            { label: "Map", value: selectedEncounter.location },
            { label: "Level", value: selectedEncounter.lvl },
          ]}
        />
      )}
      {game === "emerald" && isStarter && filterShiny !== "Any" && (
        <Typography.Text>
          Note: Use <Link href="/emerald-shiny-starter/">Shiny Starter</Link>{" "}
          webtool if you don't know your SID.
        </Typography.Text>
      )}
      <PkmFilter<FormState>
        generation={3}
        species={selectedSpecies}
        displayHiddenAbility={false}
      />
      <Gen3PkmFilter<FormState> />
    </FormSection>
  );
};
