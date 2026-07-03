import { Gen3Method, Species } from "~/rngTools";
import {
  Field,
  FormikSelect,
  FormikSwitch,
  FormFieldTable,
  Flex,
  Typography,
  Link,
  FormikRadio,
} from "~/components";
import { toOptions } from "~/utils/options";

import {
  formatActionName,
  formatMapName,
  formatRoamerStateName,
  formatMassOutbreakStateName,
  formatFeebasStateName,
  leadsLabels,
} from "./utils";
import { useWatch } from "react-hook-form";
import { FormState } from "./wild3TargetSetupSearcher";
import { getPossibleValuesForSpecies } from "./wild3TargetMon";
import { wild3SafariPokeblockSearchOptLabels } from "~/types/pokeblock";
import {
  getPaintingSetupFilterFields as getPaintingSetupFilterFields,
  getTidSidSetupFilterFields,
} from "../pokemonRng/targetSetupSearcher";

const supportedGen3Methods = [
  "Wild1",
  "Wild2",
  "Wild3",
  "Wild4",
  // TODO: Support Wild5
] as const satisfies Gen3Method[];

const getSetupFields = (obj: {
  species: Species;
  filter_shiny: boolean;
  recommendedSetups: boolean;
  usingPaintingReseeding: boolean;
  letSearcherFindPaintingSeed: boolean;
  showAdvancedPaintingSettings: boolean;
  usingAceForSid: boolean;
}): Field[] => {
  const { species, recommendedSetups } = obj;

  const possVals = getPossibleValuesForSpecies(species);
  const showAdvancedSetups = !recommendedSetups;

  const fields: Field[] = [
    {
      label: "Target species",
      input: species,
    },
    {
      label: "Recommended setups?",
      input: <FormikSwitch<FormState> name="recommendedSetups" />,
    },
    ...getTidSidSetupFilterFields({ ...obj, game: "emerald" }),
    {
      label: "Actions",
      input: (
        <FormikSelect<FormState, "actions">
          name="actions"
          options={toOptions(possVals.actions, formatActionName)}
          mode="multiple"
          selectAllNoneButtons
        />
      ),
      show: showAdvancedSetups,
      indent: 1,
    },
    {
      label: "Maps",
      input: (
        <FormikSelect<FormState, "maps">
          name="maps"
          options={toOptions(possVals.maps, formatMapName)}
          mode="multiple"
          selectAllNoneButtons
        />
      ),
      show: showAdvancedSetups,
      indent: 1,
    },
    {
      label: "Leads",
      input: (
        <FormikSelect<FormState, "leadIdxs">
          name="leadIdxs"
          options={leadsLabels}
          mode="multiple"
          selectAllNoneButtons
        />
      ),
      show: showAdvancedSetups,
      indent: 1,
    },
    {
      label: "Using White Flute",
      tooltip:
        "White Flute greatly increases the odds of encountering Pokémon when using Rock Smash. It can be obtained from the Glass Workshop in Route 113.",
      input: <FormikSwitch<FormState> name="using_white_flute" />,
      show: showAdvancedSetups && possVals.actions.includes("RockSmash"),
      indent: 1,
    },
    {
      label: "Considered Pokéblocks",
      tooltip:
        "Putting a Pokéblock in a Pokéblock feeder in the Safari Zone increases the likehood encountering Pokémon with a particular nature.",
      input: (
        <FormikRadio<FormState>
          name="considered_safari_pokeblocks"
          options={wild3SafariPokeblockSearchOptLabels}
        />
      ),
      show: showAdvancedSetups && possVals.is_safari_pokeblock_usable,
      indent: 1,
    },
    {
      label: "Roamer states",
      input: (
        <FormikSelect<FormState, "roamerStates">
          name="roamerStates"
          options={toOptions(possVals.roamerStates, formatRoamerStateName)}
          mode="multiple"
        />
      ),
      show: showAdvancedSetups && possVals.roamerStates.length > 1,
      indent: 1,
    },
    {
      label: "Mass outbreak states",
      input: (
        <FormikSelect<FormState, "massOutbreakStates">
          name="massOutbreakStates"
          options={toOptions(
            possVals.massOutbreakStates,
            formatMassOutbreakStateName,
          )}
          mode="multiple"
          selectAllNoneButtons
        />
      ),
      show: showAdvancedSetups && possVals.massOutbreakStates.length > 1,
      indent: 1,
    },
    {
      label: "Feebas states",
      input: (
        <FormikSelect<FormState, "feebasStates">
          name="feebasStates"
          options={toOptions(possVals.feebasStates, formatFeebasStateName)}
          mode="multiple"
        />
      ),
      show: showAdvancedSetups && possVals.feebasStates.length > 1,
      indent: 1,
    },
    {
      label: "Methods",
      tooltip: (
        <>
          For advanced users. Learn more about{" "}
          <Link newTab href="/gba-methods/">
            methods
          </Link>
          .
        </>
      ),
      input: (
        <FormikSelect<FormState, "methods">
          name="methods"
          options={toOptions(supportedGen3Methods)}
          mode="multiple"
        />
      ),
      show: showAdvancedSetups,
      indent: 1,
    },
    ...getPaintingSetupFilterFields({
      ...obj,
      game: "emerald",
      usingDeadBattery: false,
      requireAceForPaintingReseeding: false,
    }),
    {
      label: "Display results with 0% likelihood",
      input: <FormikSwitch<FormState> name="generate_even_if_impossible" />,
    },
    {
      label: "RNG-manipulated lead PID",
      tooltip: (
        <>
          For advanced users.
          <br />
          If inactive, likelihood is calculated assuming you're using a common
          lead cycle speed.
          <br />
          If active, likelihood is calculated assuming you will catch a Pokémon
          with the optimal lead cycle speed then use it to catch your target
          Pokémon. Learn more about{" "}
          <Link newTab href="/gba-methods-lead-impact/">
            Methods & Leads
          </Link>
          .
        </>
      ),
      input: <FormikSwitch<FormState> name="rngManipulatedLeadPid" />,
    },
  ];
  return fields;
};

export const Wild3SetupFilter = () => {
  const species = useWatch<FormState, "species">({
    name: "species",
  });
  const filter_shiny = useWatch<FormState, "filter_shiny">({
    name: "filter_shiny",
  });
  const recommendedSetups = useWatch<FormState, "recommendedSetups">({
    name: "recommendedSetups",
  });
  const usingAceForSid = useWatch<FormState, "usingAceForSid">({
    name: "usingAceForSid",
  });
  const usingPaintingReseeding = useWatch<FormState, "usingPaintingReseeding">({
    name: "usingPaintingReseeding",
  });
  const letSearcherFindPaintingSeed = useWatch<
    FormState,
    "letSearcherFindPaintingSeed"
  >({
    name: "letSearcherFindPaintingSeed",
  });
  const showAdvancedPaintingSettings = useWatch<
    FormState,
    "showAdvancedPaintingSettings"
  >({
    name: "showAdvancedPaintingSettings",
  });

  const fields: Field[] = getSetupFields({
    species,
    filter_shiny,
    recommendedSetups,
    usingPaintingReseeding,
    letSearcherFindPaintingSeed,
    showAdvancedPaintingSettings,
    usingAceForSid,
  });

  return (
    <Flex vertical gap={8}>
      <Typography.Title level={5} p={0} m={0}>
        Considered Setups
      </Typography.Title>
      <FormFieldTable fields={fields} />
    </Flex>
  );
};
