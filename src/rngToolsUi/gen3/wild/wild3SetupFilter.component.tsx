import { Species } from "~/rngTools";
import {
  Field,
  FormikNumberInput,
  FormikSelect,
  FormikSwitch,
  FormFieldTable,
  Flex,
  Typography,
  Link,
} from "~/components";
import { toOptions } from "~/utils/options";
import React from "react";
import { gen3Methods } from "~/types";

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

const getSetupFields = (
  species: Species,
  filter_shiny: boolean,
  recommendedSetups: boolean,
  usingPaintingReseeding: boolean,
  letSearcherFindPaintingSeed: boolean,
): Field[] => {
  const possVals = getPossibleValuesForSpecies(species);
  const showAdvancedSetups = !recommendedSetups;

  const fields: Field[] = [
    {
      label: "Target Species",
      input: species,
    },
    {
      label: "TID",
      input: (
        <FormikNumberInput<FormState>
          name="tid"
          numType="decimal"
          disabled={!filter_shiny}
        />
      ),
    },
    {
      label: "SID",
      input: (
        <FormikNumberInput<FormState>
          name="sid"
          numType="decimal"
          disabled={!filter_shiny}
        />
      ),
    },
    {
      label: "Recommended Setups?",
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
    },
    {
      label: "Methods",
      input: (
        <FormikSelect<FormState, "methods">
          name="methods"
          options={toOptions(gen3Methods)}
          mode="multiple"
        />
      ),
    },
    {
      label: "RNG-manipulated lead PID",
      input: <FormikSwitch<FormState> name="rngManipulatedLeadPid" />,
    },

    {
      label: (
        <>
          Using{" "}
          <Link href="/emerald-painting-rng/" newTab>
            Painting Reseeding
          </Link>
          ?
        </>
      ),
      key: "usingPaintingReseeding",
      input: <FormikSwitch<FormState> name="usingPaintingReseeding" />,
    },

    {
      label: "Let searcher find painting seed?",
      input: <FormikSwitch<FormState> name="letSearcherFindPaintingSeed" />,
      show: usingPaintingReseeding,
    },

    {
      label: "Seed after painting reseeding",
      input: <FormikNumberInput<FormState> name="initial_seed" numType="hex" />,
      show: usingPaintingReseeding && !letSearcherFindPaintingSeed,
    },
    {
      label: "Min advances before reseeding",
      input: (
        <FormikNumberInput<FormState>
          name="min_adv_before_painting"
          numType="decimal"
        />
      ),
      show: usingPaintingReseeding && letSearcherFindPaintingSeed,
    },
    {
      label: "Min advances after reseeding",
      input: (
        <FormikNumberInput<FormState>
          name="min_adv_after_painting"
          numType="decimal"
        />
      ),
      show: usingPaintingReseeding,
    },
    {
      label: "Min advances",
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
        ? "Max advances after reseeding"
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

  const fields = React.useMemo((): Field[] => {
    return getSetupFields(
      species,
      filterShiny,
      recommendedSetups,
      usingPaintingReseeding,
      letSearcherFindPaintingSeed,
    );
  }, [
    species,
    filterShiny,
    recommendedSetups,
    usingPaintingReseeding,
    letSearcherFindPaintingSeed,
  ]);

  return (
    <Flex vertical gap={8}>
      <Typography.Title level={5} p={0} m={0}>
        Considered Setups
      </Typography.Title>
      <FormFieldTable fields={fields} />
    </Flex>
  );
};
