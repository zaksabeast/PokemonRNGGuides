import { Gen3Method, Species } from "~/rngTools";
import {
  Field,
  FormikNumberInput,
  FormikSelect,
  FormikSwitch,
  FormFieldTable,
  Flex,
  Typography,
  Link,
  TooltipWithIcon,
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
import { FormState } from "./wild3FindTarget";
import { getPossibleValuesForSpecies } from "./wild3TargetMon";
import { FormikEmeraldFrameBeforePaintingInput } from "~/components/emeraldFrameBeforePainting";
import {
  minAdvsAfterPaintingLabel,
  minFramesBeforePaintingLabel,
  usingPaintingReseedingLabel,
} from "./wild3Labels";

const supportedGen3Methods = [
  "Wild1",
  "Wild2",
  "Wild3",
  "Wild4",
  // TODO: Support Wild5
] as const satisfies Gen3Method[];

const getSetupFields = (
  species: Species,
  filter_shiny: boolean,
  recommendedSetups: boolean,
  usingPaintingReseeding: boolean,
  letSearcherFindPaintingSeed: boolean,
  showAdvancedPaintingSettings: boolean,
): Field[] => {
  const possVals = getPossibleValuesForSpecies(species);
  const showAdvancedSetups = !recommendedSetups;

  const fields: Field[] = [
    {
      label: "Target species",
      input: species,
    },
    {
      label: "TID",
      input: filter_shiny ? (
        <FormikNumberInput<FormState> name="tid" numType="decimal" />
      ) : (
        <TooltipWithIcon title="The only impact of TID/SID is shininess and the target Pokemon is not shiny.">
          N/A
        </TooltipWithIcon>
      ),
    },
    {
      label: "SID",
      input: filter_shiny ? (
        <FormikNumberInput<FormState> name="sid" numType="decimal" />
      ) : (
        <TooltipWithIcon title="The only impact of TID/SID is shininess and the target Pokemon is not shiny.">
          N/A
        </TooltipWithIcon>
      ),
    },
    {
      label: "Recommended setups?",
      input: <FormikSwitch<FormState> name="recommendedSetups" />,
    },
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
    {
      label: "Using White Flute",
      tooltip:
        "White Flute greatly increases the odds of encountering Pokémon when using Rock Smash. It can be obtained from the Glass Workshop in Route 113.",
      input: <FormikSwitch<FormState> name="using_white_flute" />,
      show: showAdvancedSetups && possVals.actions.includes("RockSmash"),
      indent: 1,
    },

    {
      ...usingPaintingReseedingLabel(),
      input: <FormikSwitch<FormState> name="usingPaintingReseeding" />,
    },

    {
      label: "Let searcher find painting seed?",
      input: <FormikSwitch<FormState> name="letSearcherFindPaintingSeed" />,
      show: usingPaintingReseeding,
      indent: 1,
    },

    {
      label: "Frame before painting (Painting seed)",
      input: (
        <FormikEmeraldFrameBeforePaintingInput<FormState> name="initial_seed" />
      ),
      show: usingPaintingReseeding && !letSearcherFindPaintingSeed,
      indent: 1,
    },
    {
      label: "Show advanced painting settings?",
      input: <FormikSwitch<FormState> name="showAdvancedPaintingSettings" />,
      show: usingPaintingReseeding,
      indent: 1,
    },
    {
      ...minFramesBeforePaintingLabel(),
      input: (
        <FormikNumberInput<FormState>
          name="min_frame_before_painting"
          numType="decimal"
        />
      ),
      show:
        usingPaintingReseeding &&
        letSearcherFindPaintingSeed &&
        showAdvancedPaintingSettings,
      indent: 2,
    },
    {
      ...minAdvsAfterPaintingLabel(),
      input: (
        <FormikNumberInput<FormState>
          name="min_adv_after_painting"
          numType="decimal"
        />
      ),
      show: usingPaintingReseeding && showAdvancedPaintingSettings,
      indent: 2,
    },
    {
      label: "Min advances",
      tooltip:
        "To ensure there is enough time between booting the game and triggering the wild encounter.",
      input: (
        <FormikNumberInput<FormState>
          name="initial_advances"
          numType="decimal"
        />
      ),
      show: !usingPaintingReseeding,
    },
    {
      label: usingPaintingReseeding
        ? "Max advances after painting"
        : "Max advances",
      input: (
        <FormikNumberInput<FormState> name="max_advances" numType="decimal" />
      ),
      show: usingPaintingReseeding && !letSearcherFindPaintingSeed,
    },
    {
      label: "Max result count",
      input: (
        <FormikNumberInput<FormState>
          name="max_result_count"
          numType="decimal"
        />
      ),
    },
    {
      label: "Display results with 0% likelihood",
      input: <FormikSwitch<FormState> name="generate_even_if_impossible" />,
    },
    {
      label: "RNG-manipulated lead PID",
      tooltip: (
        <>
          For advanced users. Whether to consider setups that require catching a
          specific lead Pokemon with RNG-manipulation, then catching your real
          target Pokemon using that lead. Learn more about{" "}
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

export const SetupFilter = () => {
  const species = useWatch<FormState, "species">({
    name: "species",
  });
  const filterShiny = useWatch<FormState, "filter_shiny">({
    name: "filter_shiny",
  });
  const recommendedSetups = useWatch<FormState, "recommendedSetups">({
    name: "recommendedSetups",
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

  const fields: Field[] = getSetupFields(
    species,
    filterShiny,
    recommendedSetups,
    usingPaintingReseeding,
    letSearcherFindPaintingSeed,
    showAdvancedPaintingSettings,
  );

  return (
    <Flex vertical gap={8}>
      <Typography.Title level={5} p={0} m={0}>
        Considered Setups
      </Typography.Title>
      <FormFieldTable fields={fields} />
    </Flex>
  );
};
