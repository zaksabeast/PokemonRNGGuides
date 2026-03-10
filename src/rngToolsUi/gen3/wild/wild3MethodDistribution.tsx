import {
  rngTools,
  Species,
  Wild3SearcherResultMon,
  Gen3Lead,
  Gen3Method,
  Wild3MethodDistributionResult,
  CycleAtMoment,
  Wild3GeneratorOptions,
  Wild3Action,
  Wild3MassOutbreakState,
  Wild3FeebasState,
  Wild3RoamerState,
} from "~/rngTools";
import {
  Field,
  FormikNumberInput,
  FormikSelect,
  ResultColumn,
  RngToolForm,
  RngToolSubmit,
  FormFieldTable,
  FormikRadio,
  FormikSwitch,
  Link,
  Icon,
} from "~/components";
import { toOptions } from "~/utils/options";
import { formatProbability } from "~/utils/formatProbability";
import { useFormContext } from "~/hooks/form";
import {
  getPkmFilterInitialValues,
  pkmFilterFieldsToRustInput,
} from "~/components/pkmFilter";
import React from "react";
import { z } from "zod";
import { match } from "ts-pattern";

import { FlattenIvs, ivColumns } from "~/rngToolsUi/shared/ivColumns";
import { Translations } from "~/translations";
import {
  gen3PkmFilterFieldsToRustInput,
  getGen3PkmFilterInitialValues,
} from "~/components/gen3PkmFilter";

import {
  formatMapName,
  formatActionName,
  wild3Actions,
  wild3FeebasStates,
  formatRoamerStateName,
  wild3RoamerStates,
  wild3MassOutbreakStates,
  formatMassOutbreakStateName,
  formatFeebasStateName,
  leadsLabels,
  gen3Leads,
} from "./utils";
import { useWatch } from "react-hook-form";
import { Wild3CycleAtMoments } from "./wild3CycleAtMoments";
import { uniq } from "lodash-es";
import { getWild3EmeraldGameData } from "./data/wild3GameData";
import { formatLargeInteger } from "~/utils/formatLargeInteger";
import { Tooltip } from "antd";
import { gen3Methods } from "~/types";

const emeraldWildGameData = getWild3EmeraldGameData();

const AVERAGE_LEAD_CYCLE_SPEED = 775;
const SLOWEST_LEAD_CYCLE_SPEED = 900;

type LeadSpeedType =
  | "Ideal"
  | "Fastest"
  | "Average"
  | "Slowest"
  | "From PID"
  | "Custom";

const leadSpeedTypes = [
  "Ideal",
  "Fastest",
  "Average",
  "Slowest",
  "From PID",
  "Custom",
] as const satisfies readonly LeadSpeedType[];

export type Props = {
  fixedData: {
    map: string;
    action: Wild3Action;
    advance: number;
    tid: number;
    sid: number;
    lead: Gen3Lead;
    roamerState: Wild3RoamerState;
    feebasState: Wild3FeebasState;
    massOutbreakState: Wild3MassOutbreakState;
    initial_seed: number;
    painting_advs: {
      adv_before_painting: number;
      adv_after_painting: number;
    } | null;
    wantedMethod: Gen3Method;
    wantedPID: number;
    idealLeadCycleSpeed: number;
    usingIdealLeadCycleSpeed: boolean;
  } | null;
};

const Validator = z.object({
  map: z.string(),
  action: z.enum(wild3Actions),
  advance: z.number().int().min(0).max(0xffffffff),
  tid: z.number().int().min(0).max(0xffff),
  sid: z.number().int().min(0).max(0xffff),
  // Limitation: value in Select must be a primitive, so we use the index instead of Gen3Lead.
  leadIdx: z
    .number()
    .min(0)
    .max(gen3Leads.length - 1),
  leadSpeedType: z.enum(leadSpeedTypes),
  leadPID: z.number().min(0).max(0xffffffff),
  leadCycleSpeed: z.number().min(0).max(SLOWEST_LEAD_CYCLE_SPEED),
  feebasState: z.enum(wild3FeebasStates),
  roamerState: z.enum(wild3RoamerStates),
  massOutbreakState: z.enum(wild3MassOutbreakStates),
  usingPaintingReseeding: z.boolean(),
  initial_seed: z.number().min(0).max(0xffffffff),
  hasPreselectedData: z.boolean(),
  wantedMethod: z.enum(gen3Methods).nullable(),
  wantedPID: z.number().min(0).max(0xffffffff).nullable(),
  idealLeadCycleSpeed: z
    .number()
    .min(0)
    .max(SLOWEST_LEAD_CYCLE_SPEED)
    .nullable(),
});

type FormState = z.infer<typeof Validator>;

const getInitialValues = ({ fixedData }: Props): FormState => {
  if (fixedData == null) {
    return {
      map: "MAP_ROUTE101",
      action: "SweetScentLand",
      tid: 0,
      sid: 0,
      advance: 0,
      leadIdx: 0,
      leadSpeedType: "Average",
      leadPID: 0,
      leadCycleSpeed: 0,
      feebasState: "NotInMap",
      roamerState: "Inactive",
      massOutbreakState: "Inactive",
      usingPaintingReseeding: false,
      initial_seed: 0,
      hasPreselectedData: false,
      wantedMethod: null,
      wantedPID: null,
      idealLeadCycleSpeed: 0,
    };
  }

  const leadIdx = gen3Leads.findIndex(
    (lead) => JSON.stringify(lead) === JSON.stringify(fixedData.lead),
  );

  const leadSpeedType = fixedData.usingIdealLeadCycleSpeed
    ? "Ideal"
    : "Average";
  const leadCycleSpeed = fixedData.usingIdealLeadCycleSpeed
    ? fixedData.idealLeadCycleSpeed
    : AVERAGE_LEAD_CYCLE_SPEED;

  return {
    leadIdx: Math.max(leadIdx, 0),
    leadSpeedType,
    leadPID: 0,
    leadCycleSpeed,
    ...fixedData,
    hasPreselectedData: true,
    usingPaintingReseeding: fixedData.initial_seed !== 0,
  };
};

const getPossibleValuesForMap = (mapId: string, action: Wild3Action) => {
  const mapSetups = Array.from(emeraldWildGameData.mapSetupsBySpecies.values())
    .flat()
    .filter((mapSetup) => {
      return mapSetup.map_data.map_id === mapId;
    });

  const mapSetupsForAction = mapSetups.filter((mapSetup) => {
    return mapSetup.actions.includes(action);
  });

  const feebas_states = uniq(
    mapSetupsForAction.flatMap((mapSetup) => mapSetup.feebas_states),
  ).filter((state) => {
    // fix issue where "Not in Map" is selectable even when in Route 119
    // this is because of Tentacool which is both OldRod and SweetScentOnWater.
    // SweetScentOnWater has the feebas_state NotInMap
    return mapId !== "MAP_ROUTE119" || state !== "NotInMap";
  });

  return {
    actions: uniq(mapSetups.flatMap((mapSetup) => mapSetup.actions)),
    feebas_states,
    roamer_states: uniq(
      mapSetupsForAction.flatMap((mapSetup) => mapSetup.roamer_states),
    ),
    mass_outbreak_states: uniq(
      mapSetupsForAction.flatMap((mapSetup) => mapSetup.mass_outbreak_states),
    ),
  };
};

const getFields = (
  mapId: string,
  action: Wild3Action,
  leadType: Gen3Lead,
  leadSpeedType: LeadSpeedType,
  leadCycleSpeed: number,
  usingPaintingReseeding: boolean,
  equivalentInitialAdvs: number,
  hasPreselectedData: boolean,
): Field[] => {
  const { actions, feebas_states, roamer_states, mass_outbreak_states } =
    getPossibleValuesForMap(mapId, action);
  const fields: Field[] = [
    {
      label: "Map",
      input: (
        <FormikSelect<FormState, "map">
          name="map"
          options={toOptions(emeraldWildGameData.maps, formatMapName)}
        />
      ),
      show: !hasPreselectedData,
    },
  ];

  if (actions.length === 0) {
    return fields;
  }

  fields.push(
    {
      label: "Player action",
      input: (
        <FormikSelect<FormState, "action">
          name="action"
          options={toOptions(actions, formatActionName)}
        />
      ),
      show: !hasPreselectedData,
    },
    {
      label: "TID",
      input: <FormikNumberInput<FormState> name="tid" numType="decimal" />,
      show: !hasPreselectedData,
    },
    {
      label: "SID",
      input: <FormikNumberInput<FormState> name="sid" numType="decimal" />,
      show: !hasPreselectedData,
    },
    {
      label: "Lead",
      input: (
        <FormikSelect<FormState, "leadIdx">
          name="leadIdx"
          // Limitation: value must be a primitive, so we use the index instead of Gen3Lead.
          options={leadsLabels}
        />
      ),
      show: !hasPreselectedData,
    },
  );

  if (leadType !== "Egg") {
    fields.push({
      label: (
        <>
          <Link newTab href="/gba-methods-lead-impact/">
            Lead Speed
          </Link>{" "}
          <Tooltip title="The PID of the first Pokémon in the party impacts the RNG.">
            <Icon name="InformationCircle" size={16} />
          </Tooltip>
        </>
      ),
      key: "Lead Speed",
      input: (
        <FormikRadio<FormState>
          name="leadSpeedType"
          options={
            hasPreselectedData
              ? leadSpeedTypes.slice(0)
              : leadSpeedTypes.filter((el) => el !== "Ideal")
          }
        />
      ),
    });

    if (leadSpeedType === "From PID") {
      fields.push({
        label: "",
        key: "From PID",
        input: (
          <FormFieldTable
            fields={[
              {
                label: "Lead PID:",
                input: (
                  <FormikNumberInput<FormState> name="leadPID" numType="hex" />
                ),
              },
            ]}
          />
        ),
      });
    } else if (leadSpeedType === "Custom") {
      fields.push({
        label: "",
        key: "Custom",
        input: (
          <FormFieldTable
            fields={[
              {
                label: "PID modulo cycle count:",
                input: (
                  <FormikNumberInput<FormState>
                    name="leadCycleSpeed"
                    numType="decimal"
                  />
                ),
              },
            ]}
          />
        ),
      });
    }
    fields.push({
      label: "",
      key: "Cycle Count:",
      input: (
        <FormFieldTable
          fields={[
            {
              label: "Cycle Count:",
              input: `${leadCycleSpeed} cycles`,
            },
          ]}
        />
      ),
    });
  }

  fields.push({
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
    show: !hasPreselectedData,
  });

  fields.push({
    label: "Seed after reseeding",
    input: <FormikNumberInput<FormState> name="initial_seed" numType="hex" />,
    show: !hasPreselectedData && usingPaintingReseeding,
    indent: 1,
  });

  fields.push({
    label: usingPaintingReseeding ? "Advances after reseeding" : "Advances",
    input: <FormikNumberInput<FormState> name="advance" numType="decimal" />,
    show: !hasPreselectedData,
    indent: usingPaintingReseeding ? 1 : 0,
  });

  fields.push({
    label: "",
    key: "Equivalent to Advances",
    show: !hasPreselectedData && usingPaintingReseeding,
    input: (
      <>
        Equivalent to Advances = {formatLargeInteger(equivalentInitialAdvs)}{" "}
        without reseeding
      </>
    ),
    indent: 1,
  });

  if (feebas_states.length > 1) {
    fields.push({
      label: "Feebas state",
      input: (
        <FormikSelect<FormState, "feebasState">
          name="feebasState"
          options={toOptions(feebas_states, formatFeebasStateName)}
        />
      ),
      show: !hasPreselectedData,
    });
  }

  if (roamer_states.length > 1) {
    fields.push({
      label: "Roamer state",
      input: (
        <FormikSelect<FormState, "roamerState">
          name="roamerState"
          options={toOptions(roamer_states, formatRoamerStateName)}
        />
      ),
      show: !hasPreselectedData,
    });
  }

  if (mass_outbreak_states.length > 1) {
    fields.push({
      label: "Mass outbreak state",
      input: (
        <FormikSelect<FormState, "massOutbreakState">
          name="massOutbreakState"
          options={toOptions(mass_outbreak_states, formatMassOutbreakStateName)}
        />
      ),
      show: !hasPreselectedData,
    });
  }
  return fields;
};

export const Wild3MethodDistributionFields = ({
  clearResults,
}: {
  clearResults: () => void;
}) => {
  const { setFieldValue } = useFormContext<FormState>();
  const map = useWatch<FormState, "map">({ name: "map" });
  const leadIdx = useWatch<FormState, "leadIdx">({
    name: "leadIdx",
  });
  const leadSpeedType = useWatch<FormState, "leadSpeedType">({
    name: "leadSpeedType",
  });

  const leadCycleSpeed = useWatch<FormState, "leadCycleSpeed">({
    name: "leadCycleSpeed",
  });
  const leadPID = useWatch<FormState, "leadPID">({ name: "leadPID" });
  const action = useWatch<FormState, "action">({ name: "action" });
  const feebasState = useWatch<FormState, "feebasState">({
    name: "feebasState",
  });
  const massOutbreakState = useWatch<FormState, "massOutbreakState">({
    name: "massOutbreakState",
  });
  const roamerState = useWatch<FormState, "roamerState">({
    name: "roamerState",
  });
  const usingPaintingReseeding = useWatch<FormState, "usingPaintingReseeding">({
    name: "usingPaintingReseeding",
  });
  const initial_seed = useWatch<FormState, "initial_seed">({
    name: "initial_seed",
  });
  const advance = useWatch<FormState, "advance">({
    name: "advance",
  });
  const hasPreselectedData = useWatch<FormState, "hasPreselectedData">({
    name: "hasPreselectedData",
  });
  const idealLeadCycleSpeed = useWatch<FormState, "idealLeadCycleSpeed">({
    name: "idealLeadCycleSpeed",
  });

  const [equivalentInitialAdvs, setEquivalentInitialAdvs] = React.useState(0);
  React.useEffect(() => {
    rngTools.lcrng_distance(0, initial_seed).then((val) => {
      setEquivalentInitialAdvs(val + advance);
    });
  }, [initial_seed, advance]);

  const fields = React.useMemo((): Field[] => {
    return getFields(
      map,
      action,
      gen3Leads[leadIdx],
      leadSpeedType,
      leadCycleSpeed,
      usingPaintingReseeding,
      equivalentInitialAdvs,
      hasPreselectedData,
    );
  }, [
    map,
    action,
    leadIdx,
    leadSpeedType,
    leadCycleSpeed,
    usingPaintingReseeding,
    equivalentInitialAdvs,
    hasPreselectedData,
  ]);

  React.useEffect(() => {
    const possVals = getPossibleValuesForMap(map, action);
    if (
      possVals.actions.length > 0 &&
      possVals.actions.includes(action) === false
    ) {
      setFieldValue("action", possVals.actions[0]);
    }
    if (
      possVals.feebas_states.length > 0 &&
      possVals.feebas_states.includes(feebasState) === false
    ) {
      setFieldValue("feebasState", possVals.feebas_states[0]);
    }
    if (
      possVals.mass_outbreak_states.length > 0 &&
      possVals.mass_outbreak_states.includes(massOutbreakState) === false
    ) {
      setFieldValue("massOutbreakState", possVals.mass_outbreak_states[0]);
    }
    if (
      possVals.roamer_states.length > 0 &&
      possVals.roamer_states.includes(roamerState) === false
    ) {
      setFieldValue("roamerState", possVals.roamer_states[0]);
    }
  }, [map, action, feebasState, massOutbreakState, roamerState, setFieldValue]);

  React.useEffect(() => {
    calculateLeadCycleSpeed(
      leadSpeedType,
      leadCycleSpeed,
      leadPID,
      idealLeadCycleSpeed,
    ).then((leadCycleSpeed) => {
      setFieldValue("leadCycleSpeed", leadCycleSpeed);
    });
  }, [
    setFieldValue,
    leadCycleSpeed,
    leadSpeedType,
    leadPID,
    idealLeadCycleSpeed,
  ]);

  React.useEffect(() => {
    clearResults();
  }, [leadSpeedType, clearResults]);

  return <FormFieldTable fields={fields} />;
};

const getColumns = (
  _t: Translations,
  fixedData: Props["fixedData"],
): ResultColumn<UiResult>[] => {
  const columns: ResultColumn<UiResult>[] = [
    ...(fixedData != null
      ? [
          {
            title: "",
            key: "isWanted",
            dataIndex: "pre_sweet_scent_cycle_ranges",
            render: (_, values) => {
              if (
                values.pid !== fixedData.wantedPID ||
                values.method !== fixedData.wantedMethod
              ) {
                return null;
              }
              return (
                <Tooltip title="Target Pokémon">
                  <Icon name="Pokeball" size={20} />
                </Tooltip>
              );
            },
          } as const as ResultColumn<UiResult>,
        ]
      : []),
    {
      title: (
        <>
          Cycle at start
          <br /> of Sweet Scent
        </>
      ),
      key: "Cycle at start",
      dataIndex: "pre_sweet_scent_cycle_ranges",
      render: (pre_sweet_scent_cycle_ranges) => {
        if (pre_sweet_scent_cycle_ranges.length === 0) {
          return "Less than 0";
        }

        const rangeTxts = pre_sweet_scent_cycle_ranges.map(
          (range) => `${range.start} - ${range.start + range.len - 1}`,
        );
        return rangeTxts.map((rangeTxt) => {
          return <div key={rangeTxt}>{rangeTxt}</div>;
        });
      },
    },
    {
      title: "Likelihood",
      dataIndex: "method_probability",
      render: (method_probability) => {
        return formatProbability(method_probability);
      },
    },
    { title: "Method", dataIndex: "method" },
    { title: "Species", dataIndex: "species" },
    {
      title: "PID",
      dataIndex: "pid",
      monospace: true,
      render: (pid) => pid.toString(16).padStart(8, "0").toUpperCase(),
    },
    ...(fixedData != null
      ? []
      : [
          {
            title: "Shiny",
            dataIndex: "shiny",
            render: (shiny: boolean) => (shiny ? "Yes" : "No"),
          } as const,
        ]),
    ...ivColumns,
  ];

  return columns;
};

const calculateLeadCycleSpeed = async (
  leadSpeedType: LeadSpeedType,
  leadCycleSpeed: number,
  leadPID: number,
  idealLeadCycleSpeed: number | null,
) => {
  return match(leadSpeedType)
    .with("Fastest", () => 18)
    .with("Slowest", () => SLOWEST_LEAD_CYCLE_SPEED)
    .with("Average", () => AVERAGE_LEAD_CYCLE_SPEED)
    .with("Custom", () => leadCycleSpeed)
    .with("From PID", () => rngTools.calculate_pid_speed(leadPID))
    .with("Ideal", () => idealLeadCycleSpeed ?? AVERAGE_LEAD_CYCLE_SPEED) // Technically not possible to choose Ideal if idealLeadCycleSpeed is null.
    .exhaustive();
};

type UiResult = FlattenIvs<
  Wild3SearcherResultMon & {
    species: Species;
    uid: number;
    method_probability: Wild3MethodDistributionResult["method_probability"];
    pre_sweet_scent_cycle_ranges: Wild3MethodDistributionResult["pre_sweet_scent_cycle_ranges"];
  }
>;

let nextUid = 0;
const convertSearcherResultToUIResult = (
  res: Wild3MethodDistributionResult,
): UiResult => {
  return {
    ...res.searcher_res,
    ...res.searcher_res.ivs,
    method_probability: res.method_probability,
    pre_sweet_scent_cycle_ranges: res.pre_sweet_scent_cycle_ranges,
    species: res.searcher_res.species,
    uid: nextUid++,
  };
};

const convertSearcherResultsToUIResults = (
  results: Wild3MethodDistributionResult[],
) => {
  return results
    .map((res) => convertSearcherResultToUIResult(res))
    .sort((lhs, rhs) => {
      const startDiff =
        (lhs.pre_sweet_scent_cycle_ranges[0]?.start ?? -1) -
        (rhs.pre_sweet_scent_cycle_ranges[0]?.start ?? -1);

      if (startDiff !== 0) {
        return startDiff;
      }
      return (
        (lhs.pre_sweet_scent_cycle_ranges[0]?.len ?? 0) -
        (rhs.pre_sweet_scent_cycle_ranges[0]?.len ?? 0)
      );
    });
};

const calculate = async (values: FormState) => {
  const initial_seed = values.usingPaintingReseeding ? values.initial_seed : 0;

  const opts: Wild3GeneratorOptions = {
    tid: values.tid,
    sid: values.sid,
    map_idx: 0,
    action: values.action,
    methods: ["Wild1", "Wild2", "Wild3", "Wild4", "Wild5"] as Gen3Method[],
    lead: gen3Leads[values.leadIdx],
    filter: pkmFilterFieldsToRustInput(getPkmFilterInitialValues()),
    gen3_filter: gen3PkmFilterFieldsToRustInput(
      getGen3PkmFilterInitialValues(),
      null,
    ),
    consider_cycles: true,
    consider_rng_manipulated_lead_pid: true,
    generate_even_if_impossible: true,
    roamer_state: values.roamerState,
    mass_outbreak_state: values.massOutbreakState,
    feebas_state: values.feebasState,
  };

  const map_data = emeraldWildGameData.maps_data.find(
    (table) => table.map_id === values.map,
  );
  if (map_data == null) {
    return {
      uiResults: [],
      cycle_at_moments: [],
    };
  }

  const { results, cycle_at_moments } =
    await rngTools.generate_gen3_wild_distribution(
      initial_seed,
      values.advance,
      opts,
      map_data,
      values.leadCycleSpeed,
    );

  return {
    uiResults: convertSearcherResultsToUIResults(results),
    cycle_at_moments,
  };
};

export const Wild3MethodDistribution = ({ fixedData }: Props) => {
  const [results, setResults] = React.useState<UiResult[]>([]);
  const [cycleAtMoments, setCycleAtMoments] = React.useState<CycleAtMoment[]>(
    [],
  );

  const updateResults = React.useCallback(
    (values: FormState) => {
      calculate(values).then(({ uiResults, cycle_at_moments }) => {
        setResults(uiResults);
        setCycleAtMoments(cycle_at_moments);
      });
    },
    [setResults, setCycleAtMoments],
  );

  const onSubmit = React.useCallback<RngToolSubmit<FormState>>(
    async (values) => {
      updateResults(values);
    },
    [updateResults],
  );

  const initialValues = React.useMemo(() => {
    return getInitialValues({ fixedData });
  }, [fixedData]);

  React.useEffect(() => {
    updateResults(initialValues);
  }, [updateResults, initialValues]);

  const clearResults = React.useCallback(() => {
    setResults([]);
    setCycleAtMoments([]);
  }, [setResults, setCycleAtMoments]);

  const submitButtonLabel = React.useMemo(() => {
    if (fixedData == null) {
      return undefined;
    }

    const advs =
      fixedData.painting_advs != null &&
      fixedData.painting_advs.adv_before_painting !== 0
        ? `${formatLargeInteger(fixedData.painting_advs.adv_before_painting)} | ${formatLargeInteger(fixedData.painting_advs.adv_after_painting)}`
        : formatLargeInteger(fixedData.advance);
    return `Generate all possible Pokémon encounters at advances ${advs}`;
  }, [fixedData]);

  const getColumnsProps = React.useCallback(
    (t: Translations) => {
      return getColumns(t, fixedData);
    },
    [fixedData],
  );

  return (
    <>
      <RngToolForm<FormState, UiResult>
        getColumns={getColumnsProps}
        results={results}
        validationSchema={Validator}
        initialValues={initialValues}
        values={initialValues}
        onSubmit={onSubmit}
        submitTrackerId="wild3_method_distribution"
        rowKey="uid"
        submitButtonLabel={submitButtonLabel}
      >
        <Wild3MethodDistributionFields clearResults={clearResults} />
      </RngToolForm>

      <Wild3CycleAtMoments cycleAtMoments={cycleAtMoments} />
    </>
  );
};
