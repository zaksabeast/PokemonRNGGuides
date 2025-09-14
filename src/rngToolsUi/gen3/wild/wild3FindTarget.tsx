import {
  rngTools,
  Species,
  Wild3SearcherResultMon,
  Wild3SearcherCycleData,
  Gen3Method,
  Wild3MapSetups,
  Wild3SearcherOptions,
} from "~/rngTools";
import {
  Field,
  FormikNumberInput,
  FormikSelect,
  FormikSwitch,
  ResultColumn,
  RngToolForm,
  RngToolSubmit,
  FormFieldTable,
  Flex,
  Typography,
  ResultTable,
} from "~/components";
import { toOptions } from "~/utils/options";
import { formatLargeInteger } from "~/utils/formatLargeInteger";
import { formatProbability } from "~/utils/formatProbability";
import { useFormContext } from "~/hooks/form";
import {
  getPkmFilterFields,
  pkmFilterSchema,
  getPkmFilterInitialValues,
  pkmFilterFieldsToRustInput,
} from "~/components/pkmFilter";
import { Static3Game } from "~/rngToolsUi/gen3/static/constants";
import React from "react";
import { z } from "zod";
import {
  species,
  genderRatioBySpecies,
  hasMultiplePossibleGenders,
  gen3Methods,
  gen3SpeciesHasVariableSize,
} from "~/types";
import { match, P } from "ts-pattern";

import { uniq, sortBy, orderBy, intersection } from "lodash-es";
import { FlattenIvs, ivColumns } from "~/rngToolsUi/shared/ivColumns";
import { Tooltip } from "antd";
import {
  gen3PkmFilterFieldsToRustInput,
  gen3PkmFilterSchema,
  getGen3PkmFilterFields,
  getGen3PkmFilterInitialValues,
} from "~/components/gen3PkmFilter";

import {
  gen3Leads,
  formatActionName,
  formatMapName,
  wild3Actions,
  formatLeadName,
  wild3RoamerStates,
  wild3MassOutbreakStates,
  wild3FeebasStates,
  formatRoamerStateName,
  formatMassOutbreakStateName,
  formatFeebasStateName,
  leadsLabels,
} from "./utils";
import { getWild3EmeraldGameData } from "./data/wild3GameData";
import { useWatch } from "react-hook-form";
import { atom, useAtom } from "jotai";

const emeraldWildGameData = getWild3EmeraldGameData();
const rngManipulatedLeadPidAtom = atom(false);

/*
TODO: Investigate duplicate setup entries

Possible UI improvements:
 - Display filter restrictiveness
 - Add Tooltip for Likelihood by lead speed columns.
 - Display warning if no maps or no leads are selected.
 - Display map names instead of formatted map IDs.
 - Disable gender field if only 1 possible gender, instead of hiding it.
 - Display ability names instead of First, Second, or Hidden.
 - Min/Max IVs should display the stat name.
 - Rename "None" to "Any" in filters.
*/

const Validator = z
  .object({
    species: z.enum(species),
    tid: z.number().int().min(0).max(0xffff),
    sid: z.number().int().min(0).max(0xffff),
    maps: z.array(z.string()).min(1),
    recommendedSetups: z.boolean(),
    // Limitation: value in Select must be a primitive, so we use the index instead of Gen3Lead.
    leadIdxs: z
      .array(
        z
          .number()
          .int()
          .min(0)
          .max(gen3Leads.length - 1),
      )
      .min(1),
    actions: z.array(z.enum(wild3Actions)).min(1),
    roamerStates: z.array(z.enum(wild3RoamerStates)).min(1),
    massOutbreakStates: z.array(z.enum(wild3MassOutbreakStates)).min(1),
    feebasStates: z.array(z.enum(wild3FeebasStates)).min(1),
    methods: z.array(z.enum(gen3Methods)).min(1),
    initial_advances: z.number().int().min(0).max(0xffffffff),
    max_advances: z.number().int().min(0).max(0xffffffff),
    max_result_count: z.number().int().min(1),
    rngManipulatedLeadPid: z.boolean(),
    mergeSimilarResults: z.boolean(),
    generate_even_if_impossible: z.boolean(),
  })
  .extend(pkmFilterSchema.shape)
  .extend(gen3PkmFilterSchema.shape);

type FormState = z.infer<typeof Validator>;

const getInitialValues = (): FormState => {
  return {
    species: "Abra",
    tid: 0,
    sid: 0,
    maps: [],
    leadIdxs: gen3Leads.map((_, i) => i),
    recommendedSetups: true,
    methods: ["Wild1", "Wild2", "Wild4"],
    actions: [...wild3Actions],
    roamerStates: [...wild3RoamerStates],
    feebasStates: [...wild3FeebasStates],
    massOutbreakStates: [...wild3MassOutbreakStates],
    initial_advances: 1000,
    max_advances: 10_000_000,
    max_result_count: 20,
    rngManipulatedLeadPid: false,
    mergeSimilarResults: true,
    generate_even_if_impossible: false,
    ...getPkmFilterInitialValues(),
    ...getGen3PkmFilterInitialValues(),
  };
};

const getTargetMonFields = (species: Species): Field[] => {
  const multipleGenders = hasMultiplePossibleGenders(
    genderRatioBySpecies,
    species,
  );

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
    ...getPkmFilterFields({ gender: multipleGenders }),
    ...getGen3PkmFilterFields({
      max_size: gen3SpeciesHasVariableSize(species),
    }),
  ];
  return targetMonFields;
};

const getPossibleValuesForSpecies = (species: Species) => {
  const setups = emeraldWildGameData.mapSetupsBySpecies.get(species) ?? [];

  return {
    maps: setups.map((setup) => setup.map_data.map_id),
    actions: uniq(setups.flatMap((setup) => setup.actions)),
    roamerStates: uniq(setups.flatMap((setup) => setup.roamer_states)),
    massOutbreakStates: uniq(
      setups.flatMap((setup) => setup.mass_outbreak_states),
    ),
    feebasStates: uniq(setups.flatMap((setup) => setup.feebas_states)),
  };
};

const RngManipulatedLeadPidSwitch = () => {
  const [, setRngManipulatedLeadPid] = useAtom(rngManipulatedLeadPidAtom);
  return (
    <FormikSwitch<FormState>
      name="rngManipulatedLeadPid"
      onChange={(isOn) => {
        setRngManipulatedLeadPid(isOn);
      }}
    />
  );
};

const getSetupFields = (
  species: Species,
  filter_shiny: boolean,
  recommendedSetups: boolean,
): Field[] => {
  const possVals = getPossibleValuesForSpecies(species);

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
    ...(recommendedSetups
      ? []
      : [
          {
            label: "Actions",
            input: (
              <FormikSelect<FormState, "actions">
                name="actions"
                options={toOptions(possVals.actions, formatActionName)}
                mode="multiple"
                fullWidth={true}
                selectAllNoneButtons={true}
              />
            ),
          },
          {
            label: "Maps",
            input: (
              <FormikSelect<FormState, "maps">
                name="maps"
                options={toOptions(possVals.maps, formatMapName)}
                mode="multiple"
                fullWidth={true}
                selectAllNoneButtons={true}
              />
            ),
          },
          {
            label: "Leads",
            input: (
              <FormikSelect<FormState, "leadIdxs">
                name="leadIdxs"
                options={leadsLabels}
                mode="multiple"
                selectAllNoneButtons={true}
              />
            ),
          },
          ...(possVals.roamerStates.length > 1
            ? [
                {
                  label: "Roamer states",
                  input: (
                    <FormikSelect<FormState, "roamerStates">
                      name="roamerStates"
                      options={toOptions(
                        possVals.roamerStates,
                        formatRoamerStateName,
                      )}
                      mode="multiple"
                    />
                  ),
                },
              ]
            : []),
          ...(possVals.massOutbreakStates.length > 1
            ? [
                {
                  label: "Mass outbreak states",
                  input: (
                    <FormikSelect<FormState, "massOutbreakStates">
                      name="roamerStates"
                      options={toOptions(
                        possVals.massOutbreakStates,
                        formatMassOutbreakStateName,
                      )}
                      mode="multiple"
                      selectAllNoneButtons={true}
                    />
                  ),
                },
              ]
            : []),
          ...(possVals.feebasStates.length > 1
            ? [
                {
                  label: "Feebas states",
                  input: (
                    <FormikSelect<FormState, "feebasStates">
                      name="feebasStates"
                      options={toOptions(
                        possVals.feebasStates,
                        formatFeebasStateName,
                      )}
                      mode="multiple"
                    />
                  ),
                },
              ]
            : []),
        ]),
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
      input: <RngManipulatedLeadPidSwitch />,
    },
    {
      label: "Initial advances",
      input: (
        <FormikNumberInput<FormState>
          name="initial_advances"
          numType="decimal"
        />
      ),
    },
    {
      label: "Max advances",
      input: (
        <FormikNumberInput<FormState> name="max_advances" numType="decimal" />
      ),
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

  const fields = React.useMemo((): Field[] => {
    return getSetupFields(species, filterShiny, recommendedSetups);
  }, [species, filterShiny, recommendedSetups]);

  return (
    <Flex vertical gap={8}>
      <Typography.Title level={5} p={0} m={0}>
        Considered Setups
      </Typography.Title>
      <FormFieldTable fields={fields} />
    </Flex>
  );
};

const getMethodLikelihoodColumValue = (
  cycleData: Wild3SearcherCycleData,
  method: Gen3Method,
) => {
  const probAsTxt = formatProbability(cycleData.method_probability);
  const end =
    cycleData.pre_sweet_scent_cycle_range.start +
    cycleData.pre_sweet_scent_cycle_range.len;
  const rangeAsTxt =
    end === 0
      ? `Method ${method} can't be triggered.`
      : `Method ${method} is triggered if the cycle counter is between ${cycleData.pre_sweet_scent_cycle_range.start} and ${end}.`;
  return (
    <Tooltip title={rangeAsTxt}>
      <div>{probAsTxt}</div>
    </Tooltip>
  );
};

const getResultSetupInfoColumns = ({
  rngManipulatedLeadPid,
  showMassOutbreak,
}: {
  rngManipulatedLeadPid: boolean;
  showMassOutbreak: boolean;
}): ResultColumn<ResultSetupInfo>[] => {
  const columns: ResultColumn<ResultSetupInfo>[] = [];
  columns.push(
    {
      title: "Advances",
      dataIndex: "advance",
      monospace: true,
      render: (adv) => {
        const durInMinutes = (adv / 59.7275 / 60).toFixed(1);
        return (
          <Tooltip title={`~${durInMinutes} min`}>
            <div>{formatLargeInteger(adv)}</div>
          </Tooltip>
        );
      },
    },
    { title: "Map", dataIndex: "mapName" },
    { title: "Player action", dataIndex: "actionName" },
    /*
    TODO: Support roamer and fishing in Feebas tile to catch non-Feebas Pokémon. 
    {
      title: "Roamer",
      dataIndex: "roamer_state",
      render: (roamerState) => {
        return match(roamerState)
          .with("Inactive", () => "Inactive")
          .with("ActiveNotInMap", () => "Roaming in another map")
          .with("ActiveInMapLatios", () => "Latios in map")
          .with("ActiveInMapLatias", () => "Latias in map")
          .exhaustive();
      },
    },
    {
      title: "Feebas Tile?",
      dataIndex: "feebas_state",
      render: (feebasState) => {
        return match(feebasState)
          .with("NotInMap", () => "N/A")
          .with("OnFeebasTile", () => "Yes")
          .with("InMapButNotOnFeebasTile", () => "No")
          .exhaustive();
      },
    },*/
    ...(showMassOutbreak
      ? ([
          {
            title: "Mass outbreak",
            dataIndex: "mass_outbreak_state",
            render: formatMassOutbreakStateName,
          },
        ] as const)
      : []),
  );

  if (!rngManipulatedLeadPid) {
    columns.push({
      title: (
        <>
          Method <br />
          Likelihood
        </>
      ),
      key: "<>Method <br />Likelihood</>",
      dataIndex: "cycle_data_by_lead",
      render: (cycle_data_by_lead, values) => {
        const text = (() => {
          if (cycle_data_by_lead == undefined) {
            return "";
          }
          const least_likely_common =
            cycle_data_by_lead.common_lower_lead.method_probability <
            cycle_data_by_lead.common_upper_lead.method_probability
              ? cycle_data_by_lead.common_lower_lead
              : cycle_data_by_lead.common_upper_lead;

          return formatProbability(least_likely_common.method_probability);
        })();

        return (
          <Tooltip title={`Method ${values.method}`}>
            <div>{text}</div>
          </Tooltip>
        );
      },
    });
  }

  columns.push({
    title: "Lead",
    dataIndex: "lead",
    render: formatLeadName,
  });

  if (rngManipulatedLeadPid) {
    columns.push(
      {
        title: "Ideal Lead Speed",
        dataIndex: "cycle_data_by_lead",
        render: (cycle_data_by_lead, values) => {
          if (cycle_data_by_lead == undefined) {
            return "";
          }
          if (values.lead === "Egg") {
            return "";
          }
          if (
            cycle_data_by_lead.ideal_lead.method_probability ===
              cycle_data_by_lead.slowest_lead.method_probability &&
            cycle_data_by_lead.ideal_lead.method_probability ===
              cycle_data_by_lead.fastest_lead.method_probability
          ) {
            return "Any";
          }
          const cycle = cycle_data_by_lead.ideal_lead.lead_pid_cycle_count;
          const label = match(cycle)
            .with(18, () => "Fastest")
            .with(900, () => "Slowest")
            .with(P.number, () => {
              return cycle + " cycles";
            })
            .exhaustive();

          return label;
        },
      },
      {
        title: "Method Likelyhood by Lead Speed",
        type: "group",
        columns: [
          {
            title: "Ideal",
            dataIndex: "cycle_data_by_lead",
            render: (cycle_data_by_lead, values) => {
              if (cycle_data_by_lead == undefined) {
                return "";
              }
              return getMethodLikelihoodColumValue(
                cycle_data_by_lead.ideal_lead,
                values.method,
              );
            },
          },
          {
            title: "Fastest",
            dataIndex: "cycle_data_by_lead",
            render: (cycle_data_by_lead, values) => {
              if (cycle_data_by_lead == undefined) {
                return "";
              }
              return getMethodLikelihoodColumValue(
                cycle_data_by_lead.fastest_lead,
                values.method,
              );
            },
          },
          {
            title: "Common",
            dataIndex: "cycle_data_by_lead",
            render: (cycle_data_by_lead, values) => {
              if (cycle_data_by_lead == undefined) {
                return "";
              }
              const least_likely_common =
                cycle_data_by_lead.common_lower_lead.method_probability <
                cycle_data_by_lead.common_upper_lead.method_probability
                  ? cycle_data_by_lead.common_lower_lead
                  : cycle_data_by_lead.common_upper_lead;
              return getMethodLikelihoodColumValue(
                least_likely_common,
                values.method,
              );
            },
          },
          {
            title: "Slowest",
            dataIndex: "cycle_data_by_lead",
            render: (cycle_data_by_lead, values) => {
              if (cycle_data_by_lead == undefined) {
                return "";
              }
              return getMethodLikelihoodColumValue(
                cycle_data_by_lead.slowest_lead,
                values.method,
              );
            },
          },
        ],
      },
    );
  }
  return columns;
};

const getPidPathColumns = (): ResultColumn<PidPathResult>[] => {
  return [
    {
      title: "",
      dataIndex: "resultSetupInfos",
      render: (resultSetupInfos) =>
        `${resultSetupInfos.length} setup${resultSetupInfos.length > 1 ? "s" : ""}`,
    },
    {
      title: "Likelihood",
      dataIndex: "resultSetupInfos",
      key: "best_likelihood",
      render: (resultSetupInfos) => {
        return formatProbability(resultSetupInfos[0]?.primaryLikelihood ?? 0);
      },
    },
    {
      title: "Advances",
      dataIndex: "earliestAdvance",
      monospace: true,
      render: (adv) => {
        const durInMinutes = (adv / 59.7275 / 60).toFixed(1);
        return (
          <Tooltip title={`~${durInMinutes} min`}>
            <div>~{formatLargeInteger(adv)}</div>
          </Tooltip>
        );
      },
    },
    { title: "Nature", dataIndex: "nature" },
    {
      title: "Shiny",
      dataIndex: "shiny",
      render: (shiny: boolean) => (shiny ? "Yes" : "No"),
    },
    {
      title: "IV",
      type: "group",
      columns: ivColumns,
    },
    {
      title: "PID",
      dataIndex: "pid",
      monospace: true,
      render: (pid) => pid.toString(16).padStart(8, "0").toUpperCase(),
    },
    { title: "Ability", dataIndex: "ability" },
    { title: "Gender", dataIndex: "gender" },
    {
      title: "Hidden Power",
      type: "group",
      columns: [
        {
          title: "Type",
          dataIndex: "hidden_power",
          render: (hidden_power) => hidden_power.pokemon_type,
        },
        {
          title: "Power",
          dataIndex: "hidden_power",
          render: (hidden_power) => hidden_power.bp,
        },
      ],
    },
    {
      title: "PID speed",
      dataIndex: "pidCycleCount",
      render: (pidCycleCount) => `${pidCycleCount} cycles`,
    },
    {
      title: "Method",
      dataIndex: "method",
    },
  ];
};

type Props = {
  game: Static3Game;
};

const getMapSetupsConsideringStateSubsets = (
  values: FormState,
): Wild3MapSetups[] => {
  const mapSetupsWithAllStates =
    emeraldWildGameData.mapSetupsBySpecies.get(values.species) ?? [];
  if (values.recommendedSetups) {
    // TODO: remove not needed states. right now, the filtering systematically occurs in searcher_reverse even if the user doesn't want it.
    return mapSetupsWithAllStates;
  }

  return mapSetupsWithAllStates
    .filter((mapSetupWithAllStates) => {
      return values.maps.includes(mapSetupWithAllStates.map_data.map_id);
    })
    .map((mapSetupWithAllStates) => {
      return {
        map_data: mapSetupWithAllStates.map_data,
        actions: intersection(mapSetupWithAllStates.actions, values.actions),
        roamer_states: intersection(
          mapSetupWithAllStates.roamer_states,
          values.roamerStates,
        ),
        mass_outbreak_states: intersection(
          mapSetupWithAllStates.mass_outbreak_states,
          values.massOutbreakStates,
        ),
        feebas_states: intersection(
          mapSetupWithAllStates.feebas_states,
          values.feebasStates,
        ),
      };
    });
};

let nextUid = 0;

const convertResultsForPidPathToPidPathResult = async (
  results: Wild3SearcherResultMon[],
  mapSetups: Wild3MapSetups[],
  rngManipulatedLeadPid: boolean,
): Promise<PidPathResult | null> => {
  if (results.length === 0) {
    return null;
  }

  const firstRes = results[0];

  const resultSetupInfos: ResultSetupInfo[] = await Promise.all(
    results.map((res) => {
      const mapSetup = mapSetups[res.map_idx];
      const mapName = formatMapName(mapSetup.map_data.map_id);
      const primaryLikelihood = (() => {
        const { cycle_data_by_lead } = res;
        if (cycle_data_by_lead == null) {
          return 0;
        }

        if (rngManipulatedLeadPid) {
          return cycle_data_by_lead.ideal_lead.method_probability;
        }

        return Math.min(
          cycle_data_by_lead.common_lower_lead.method_probability,
          cycle_data_by_lead.common_upper_lead.method_probability,
        );
      })();

      return {
        ...res,
        uid: nextUid++,
        mapName,
        actionName: formatActionName(res.action),
        primaryLikelihood,
      };
    }),
  );

  const earliestAdvance = Math.min(...results.map((res) => res.advance));

  return {
    ...firstRes,
    ...firstRes.ivs,
    earliestAdvance,
    uid: nextUid++,
    pidCycleCount: await rngTools.calculate_pid_speed(firstRes.pid),
    resultSetupInfos: orderBy(
      resultSetupInfos,
      ["primaryLikelihood", "advance", "method", "map_idx"],
      ["desc", "asc", "asc", "asc"],
    ),
  };
};

type PidPathResult = FlattenIvs<
  Wild3SearcherResultMon & {
    uid: number;
    pidCycleCount: number;
    earliestAdvance: number;
    resultSetupInfos: ResultSetupInfo[];
  }
>;

type ResultSetupInfo = Wild3SearcherResultMon & {
  uid: number;
  mapName: string;
  actionName: string;
  primaryLikelihood: number;
};

export const Wild3SearcherFindTarget = ({ game }: Props) => {
  const [pidPathResults, setPidPathResults] = React.useState<PidPathResult[]>(
    [],
  );
  const [selectedPidPathResult, setSelectedPidPathResult] =
    React.useState<PidPathResult | null>(null);
  const [rngManipulatedLeadPid] = useAtom(rngManipulatedLeadPidAtom);

  const initial_seed = game === "emerald" ? 0 : 0x5a0;

  const onSubmit = React.useCallback<RngToolSubmit<FormState>>(
    async (values) => {
      const map_setups = getMapSetupsConsideringStateSubsets(values);

      const leadsToUse = values.recommendedSetups
        ? [...gen3Leads]
        : values.leadIdxs.map((i) => gen3Leads[i]);
      const opts: Wild3SearcherOptions = {
        initial_seed,
        tid: values.tid,
        sid: values.sid,
        gender_ratio: genderRatioBySpecies[values.species],
        initial_advances: values.initial_advances,
        max_advances: values.max_advances,
        max_result_count: values.max_result_count,
        filter: pkmFilterFieldsToRustInput(values),
        gen3_filter: gen3PkmFilterFieldsToRustInput(values, values.species),
        leads: leadsToUse,
        map_setups,
        methods: values.methods,
        consider_cycles: true,
        consider_rng_manipulated_lead_pid: values.rngManipulatedLeadPid,
        generate_even_if_impossible: values.generate_even_if_impossible,
      };

      const resultsByPidPath = await rngTools.search_wild3(opts);

      const pidPathResults = await Promise.all(
        resultsByPidPath.map((results) =>
          convertResultsForPidPathToPidPathResult(
            results.vec,
            map_setups,
            values.rngManipulatedLeadPid,
          ),
        ),
      );

      setPidPathResults(
        sortBy(
          pidPathResults.filter((el) => el != null),
          "earliestAdvance",
        ),
      );
      setSelectedPidPathResult(null);
    },
    [initial_seed],
  );

  const initialValues = React.useMemo(() => {
    return getInitialValues();
  }, []);

  const pidPathColumns = React.useMemo(() => {
    return getPidPathColumns();
  }, []);

  const resultSetupInfoColumns = React.useMemo(() => {
    const showMassOutbreak =
      selectedPidPathResult != null &&
      selectedPidPathResult.resultSetupInfos.some(
        (setup) => setup.mass_outbreak_state !== "Inactive",
      );
    return getResultSetupInfoColumns({
      rngManipulatedLeadPid,
      showMassOutbreak,
    });
  }, [rngManipulatedLeadPid, selectedPidPathResult]);

  return (
    <>
      <RngToolForm<FormState, PidPathResult>
        columns={pidPathColumns}
        results={pidPathResults}
        validationSchema={Validator}
        initialValues={initialValues}
        onSubmit={onSubmit}
        submitTrackerId="wild3_find_target"
        rowKey="uid"
        onClickResultRow={setSelectedPidPathResult}
      >
        <TargetMon />
        <br />
        <SetupFilter />
      </RngToolForm>
      {selectedPidPathResult != null ? (
        <ResultTable<ResultSetupInfo>
          columns={resultSetupInfoColumns}
          rowKey="uid"
          dataSource={selectedPidPathResult.resultSetupInfos}
        />
      ) : null}
    </>
  );
};
