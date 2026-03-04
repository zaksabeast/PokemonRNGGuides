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
  Icon,
  Link,
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
import React from "react";
import { z } from "zod";
import {
  species,
  genderRatioBySpecies,
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
import { formatDuration } from "~/utils/formatDuration";
import { formatHex } from "~/utils/formatHex";

const emeraldWildGameData = getWild3EmeraldGameData();
const rngManipulatedLeadPidAtom = atom(false);

// Painting is only worth doing if wanted advances is >= 200_000.
// The value must be the same as the one in in rust searcher files.
const DONT_USE_PAINTING_IF_BELOW_ADV = 200_000;

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
    usingPaintingReseeding: z.boolean(),
    letSearcherFindPaintingSeed: z.boolean(),
    initial_seed: z.number().int().min(0).max(0xffffffff),
    initial_advances: z.number().int().min(0).max(0xffffffff),
    min_adv_before_painting: z.number().int().min(0).max(0xffffffff),
    min_adv_after_painting: z.number().int().min(0).max(0xffffffff),
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
    usingPaintingReseeding: false,
    letSearcherFindPaintingSeed: true,
    initial_seed: 0,
    initial_advances: 1000,
    min_adv_before_painting: 1000,
    min_adv_after_painting: 10000,
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
  const genderRatio = genderRatioBySpecies[species];

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
    ...getPkmFilterFields({ genderRatio }),
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
  usingPaintingReseeding: boolean,
  letSearcherFindPaintingSeed: boolean,
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
                selectAllNoneButtons
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
                selectAllNoneButtons
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
                selectAllNoneButtons
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
                      name="massOutbreakStates"
                      options={toOptions(
                        possVals.massOutbreakStates,
                        formatMassOutbreakStateName,
                      )}
                      mode="multiple"
                      selectAllNoneButtons
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
      hide: !usingPaintingReseeding,
    },

    {
      label: "Seed after painting reseeding",
      input: <FormikNumberInput<FormState> name="initial_seed" numType="hex" />,
      hide: !(usingPaintingReseeding && !letSearcherFindPaintingSeed),
    },
    {
      label: "Min advances before reseeding",
      input: (
        <FormikNumberInput<FormState>
          name="min_adv_before_painting"
          numType="decimal"
        />
      ),
      hide: !(usingPaintingReseeding && letSearcherFindPaintingSeed),
    },
    {
      label: "Min advances after reseeding",
      input: (
        <FormikNumberInput<FormState>
          name="min_adv_after_painting"
          numType="decimal"
        />
      ),
      hide: !usingPaintingReseeding,
    },
    {
      label: "Min advances",
      input: (
        <FormikNumberInput<FormState>
          name="initial_advances"
          numType="decimal"
        />
      ),
      hide: usingPaintingReseeding,
    },
    {
      label: usingPaintingReseeding
        ? "Max advances after reseeding"
        : "Max advances",
      input: (
        <FormikNumberInput<FormState> name="max_advances" numType="decimal" />
      ),
      hide: !(usingPaintingReseeding && !letSearcherFindPaintingSeed),
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
  usesPainting,
}: {
  rngManipulatedLeadPid: boolean;
  showMassOutbreak: boolean;
  usesPainting: boolean;
}): ResultColumn<ResultSetupInfo>[] => {
  const columns: ResultColumn<ResultSetupInfo>[] = [];
  if (!usesPainting) {
    columns.push({
      title: "Advances",
      dataIndex: "advance",
      monospace: true,
      render: (adv, { seed }) => {
        const painting_seed = formatHex(seed);
        const durInMinutes = formatDuration(adv / 59.7275);
        return (
          <Tooltip
            title={`Seed when performing the player action: ${painting_seed}. (~${durInMinutes} min)`}
          >
            {formatLargeInteger(adv)}
          </Tooltip>
        );
      },
    });
  } else {
    columns.push({
      title: "Advances",
      type: "group",
      columns: [
        {
          title: "Before Reseed",
          dataIndex: "painting_advs",
          monospace: true,
          render: (painting_advs) => {
            if (painting_advs == null) {
              return "";
            }

            const adv = painting_advs.adv_before_painting;
            return (
              <Tooltip title={`Painting Seed: ${formatHex(adv, 2)}`}>
                {formatLargeInteger(adv)}
              </Tooltip>
            );
          },
        },
        {
          title: "After Reseed",
          dataIndex: "painting_advs",
          monospace: true,
          render: (painting_advs, { seed, actionName }) => {
            if (painting_advs == null) {
              return "";
            }

            return (
              <Tooltip
                title={`Seed at start of ${actionName}: ${formatHex(seed)}`}
              >
                {formatLargeInteger(painting_advs.adv_after_painting)}
              </Tooltip>
            );
          },
        },
      ],
    });
  }

  columns.push(
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
        title: (
          <div>
            {"Method Likelihood by "}
            <Link href="/gba-methods-lead-impact/" newTab>
              Lead Speed
            </Link>
          </div>
        ),
        key: "methodLikelihoodByLeadSpeed",
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
            title: (
              <Tooltip title="Lead PID speed equal to 18 cycles">
                <div>
                  Fastest <Icon name="InformationCircle" size={16} />
                </div>
              </Tooltip>
            ),
            key: "methodLikelihoodFastest",
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
            title: (
              <Tooltip title="Lead PID speed between 608 and 868 cycles (99.9% of all PIDs)">
                <div>
                  Common <Icon name="InformationCircle" size={16} />
                </div>
              </Tooltip>
            ),
            key: "methodLikelihoodCommon",
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
            title: (
              <Tooltip title="Lead PID speed equal to 900 cycles">
                <div>
                  Slowest <Icon name="InformationCircle" size={16} />
                </div>
              </Tooltip>
            ),
            key: "methodLikelihoodSlowest",
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

const getPidPathColumns = (
  letSearcherFindPaintingSeed: boolean,
): ResultColumn<PidPathResult>[] => {
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
    ...(letSearcherFindPaintingSeed
      ? [
          {
            title: "Painting?",
            dataIndex: "paintingAdvs",
            render: (paintingAdvs) => {
              return paintingAdvs != null ? "Yes" : "No";
            },
          } as ResultColumn<PidPathResult>,
        ]
      : []),
    {
      title: "Advances",
      dataIndex: "earliestAdvance",
      monospace: true,
      render: (earliestAdvance, { paintingAdvs }) => {
        if (paintingAdvs != null) {
          const { adv_before_painting: before, adv_after_painting: after } =
            paintingAdvs;
          const title = `${formatDuration(before / 59.7275)} | ${formatDuration(after / 59.7275)}`;

          return (
            <Tooltip title={title}>
              {formatLargeInteger(before)}
              {" | "}~{formatLargeInteger(after)}
            </Tooltip>
          );
        }

        return (
          <Tooltip title={formatDuration(earliestAdvance / 59.7275)}>
            <>~{formatLargeInteger(earliestAdvance)}</>
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
      render: (pid) => formatHex(pid),
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
  paintingAdvsCache: PaintingAdvsCache,
): Promise<PidPathResult | null> => {
  // Limitation: The UI components only support that all results for the same PidPath
  // requires painting, or none do. Having both only occurs in the rare cases that
  // the results overlap DONT_USE_PAINTING_IF_BELOW_ADV threshold.
  const hasPainting = results.some((res) => paintingAdvsCache.has(res.advance));
  if (hasPainting) {
    results = results.filter((res) => paintingAdvsCache.has(res.advance));
  }

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
        painting_advs: paintingAdvsCache.get(res.advance),
      };
    }),
  );

  const earliestAdvance = Math.min(...results.map((res) => res.advance));

  const paintingAdvs = paintingAdvsCache.get(earliestAdvance);

  const valueForSorting =
    paintingAdvs != null
      ? paintingAdvs.adv_before_painting +
        paintingAdvs.adv_after_painting +
        DONT_USE_PAINTING_IF_BELOW_ADV
      : earliestAdvance;

  return {
    ...firstRes,
    ...firstRes.ivs,
    earliestAdvance,
    paintingAdvs,
    valueForSorting,
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
    valueForSorting: number;
    paintingAdvs:
      | {
          adv_before_painting: number;
          adv_after_painting: number;
        }
      | undefined;
    resultSetupInfos: ResultSetupInfo[];
  }
>;

type ResultSetupInfo = Wild3SearcherResultMon & {
  uid: number;
  mapName: string;
  actionName: string;
  primaryLikelihood: number;
  painting_advs?: {
    adv_before_painting: number;
    adv_after_painting: number;
  };
};

type PaintingAdvsCache = Awaited<ReturnType<typeof createPaintingAdvsCache>>;

const createPaintingAdvsCache = async (
  opts: Wild3SearcherOptions["painting_opts"],
  advs: number[],
) => {
  const map = new Map<
    number,
    {
      adv_before_painting: number;
      adv_after_painting: number;
    }
  >();

  if (opts == null || advs.length === 0) {
    return map;
  }

  const advsWithoutDupe = new Uint32Array(new Set(advs));
  const painting_advs = await rngTools.find_fastest_painting_advs(
    opts,
    advsWithoutDupe,
  );
  if (painting_advs.length !== advsWithoutDupe.length) {
    return map;
  }

  painting_advs.forEach((painting_adv, i) => {
    if (painting_adv.adv_before_painting === 0) {
      return;
    }
    map.set(advsWithoutDupe[i], painting_adv);
  });

  return map;
};

export const Wild3SearcherFindTarget = () => {
  const [pidPathResults, setPidPathResults] = React.useState<PidPathResult[]>(
    [],
  );
  const [selectedPidPathResult, setSelectedPidPathResult] =
    React.useState<PidPathResult | null>(null);
  const [rngManipulatedLeadPid] = useAtom(rngManipulatedLeadPidAtom);

  const [letSearcherFindPaintingSeed, setLetSearcherFindPaintingSeed] =
    React.useState<boolean>(false);

  const onSubmit = React.useCallback<RngToolSubmit<FormState>>(
    async (values) => {
      const initial_seed =
        values.usingPaintingReseeding && !values.letSearcherFindPaintingSeed
          ? values.initial_seed
          : 0;

      const initial_advances = values.usingPaintingReseeding
        ? values.min_adv_after_painting
        : values.initial_advances;

      const map_setups = getMapSetupsConsideringStateSubsets(values);

      const painting_opts =
        values.usingPaintingReseeding && values.letSearcherFindPaintingSeed
          ? {
              min_adv_before_painting: values.min_adv_before_painting,
              min_adv_after_painting: values.min_adv_after_painting,
            }
          : null;

      const leadsToUse = values.recommendedSetups
        ? [...gen3Leads]
        : values.leadIdxs.map((i) => gen3Leads[i]);

      // max_advances field is hidden when searching for painting seed.
      // It's important to use a high max_advances value to ensure results
      // if the naive searching approach is used (when searching common traits).
      const max_advances =
        painting_opts != null ? 10_000_000 : values.max_advances;

      const opts: Wild3SearcherOptions = {
        initial_seed,
        tid: values.tid,
        sid: values.sid,
        gender_ratio: genderRatioBySpecies[values.species],
        initial_advances,
        max_advances,
        max_result_count: values.max_result_count,
        filter: pkmFilterFieldsToRustInput(values),
        gen3_filter: gen3PkmFilterFieldsToRustInput(values, values.species),
        leads: leadsToUse,
        map_setups,
        methods: values.methods,
        consider_cycles: true,
        consider_rng_manipulated_lead_pid: values.rngManipulatedLeadPid,
        generate_even_if_impossible: values.generate_even_if_impossible,
        painting_opts,
      };

      const resultsByPidPath = await rngTools.search_wild3(opts);
      const advs = resultsByPidPath
        .map((pidPath) => pidPath.vec.map((res) => res.advance))
        .flat();
      const paintingAdvsCache = await createPaintingAdvsCache(
        opts.painting_opts,
        advs,
      );
      setLetSearcherFindPaintingSeed(painting_opts != null);

      const pidPathResults = await Promise.all(
        resultsByPidPath.map((results) =>
          convertResultsForPidPathToPidPathResult(
            results.vec,
            map_setups,
            values.rngManipulatedLeadPid,
            paintingAdvsCache,
          ),
        ),
      );

      setPidPathResults(
        sortBy(
          pidPathResults.filter((el) => el != null),
          "valueForSorting",
        ),
      );
      setSelectedPidPathResult(null);
    },
    [],
  );

  const initialValues = React.useMemo(() => {
    return getInitialValues();
  }, []);

  const pidPathColumns = React.useMemo(() => {
    return getPidPathColumns(letSearcherFindPaintingSeed);
  }, [letSearcherFindPaintingSeed]);

  const resultSetupInfoColumns = React.useMemo(() => {
    const showMassOutbreak =
      selectedPidPathResult != null &&
      selectedPidPathResult.resultSetupInfos.some(
        (setup) => setup.mass_outbreak_state !== "Inactive",
      );
    const usesPainting =
      selectedPidPathResult?.resultSetupInfos.some(
        (res) => res.painting_advs != null,
      ) ?? false;

    return getResultSetupInfoColumns({
      rngManipulatedLeadPid,
      showMassOutbreak,
      usesPainting,
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
