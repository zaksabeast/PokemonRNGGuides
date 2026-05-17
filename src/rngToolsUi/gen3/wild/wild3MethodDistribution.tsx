import {
  rngTools,
  Species,
  Wild3SearcherResultMon,
  Gen3Lead,
  Gen3Method,
  Wild3MethodDistributionResult,
  CycleAtMoment,
  Wild3GeneratorOptions,
} from "~/rngTools";
import {
  Field,
  ResultColumn,
  RngToolForm,
  RngToolSubmit,
  FormFieldTable,
  Icon,
  Typography,
} from "~/components";
import { formatProbability } from "~/utils/formatProbability";
import { useFormContext } from "~/hooks/form";
import {
  getPkmFilterInitialValues,
  pkmFilterFieldsToRustInput,
} from "~/components/pkmFilter";
import React from "react";

import { FlattenIvs, ivColumns } from "~/rngToolsUi/shared/ivColumns";
import { Translations } from "~/translations";
import {
  gen3PkmFilterFieldsToRustInput,
  getGen3PkmFilterInitialValues,
} from "~/components/gen3PkmFilter";

import { gen3Leads } from "./utils";
import { Wild3CycleAtMoments } from "./wild3CycleAtMoments";
import { getWild3EmeraldGameData } from "./data/wild3GameData";
import { formatLargeInteger } from "~/utils/formatLargeInteger";
import { Tooltip } from "antd";
import { getPossibleValuesForMap } from "./dataUtils";
import {
  AVERAGE_LEAD_CYCLE_SPEED,
  LeadCycleSpeedSelector,
} from "./leadCycleSpeedSelector";
import { lcrng_distance } from "~/utils/lcrng";
import { leadCycleSpeedTooltip } from "./wild3Labels";
import { useWatch } from "react-hook-form";
import { TargetSetup } from "./wild3CalibTargetSetupInput";

const emeraldWildGameData = getWild3EmeraldGameData();

export type FixedData = {
  targetSetup: TargetSetup;
  tid: number;
  sid: number;
  wantedPID: number | null; // This is to support Wild5. It should be replaced by a PID reroll count.
  idealLeadCycleSpeed: number | null;
  usingIdealLeadCycleSpeed: boolean;
  showTarget: boolean;
};

export type Props = {
  fixedData: FixedData;
  permitEnablingDebugOptions: boolean;
  setLeadCycleSpeed?: (leadCycleSpeed: number) => void;
  leadCycleSpeed?: number | null;
};

type FormState = {
  map: string;
  action: TargetSetup["action"];
  advance: number;
  leadIdx: number;
  leadCycleSpeed: number;
  usingWhiteFlute: boolean;
  feebasState: TargetSetup["feebasState"];
  roamerState: TargetSetup["roamerState"];
  massOutbreakState: TargetSetup["massOutbreakState"];
  usingPaintingReseeding: boolean;
  initial_seed: number;
  hasPreselectedData: boolean;
  wantedMethod: Gen3Method | null;
  safariPokeblock: TargetSetup["safariPokeblock"];
};

const getInitialValues = (fixedData: FixedData, leadCycleSpeed: number) => {
  const { targetSetup } = fixedData;
  const leadIdx = gen3Leads.findIndex(
    (lead) => JSON.stringify(lead) === JSON.stringify(targetSetup.lead),
  );

  return {
    map: targetSetup.map,
    action: targetSetup.action,
    advance: targetSetup.targetPaintingAdvs.after,
    leadIdx: Math.max(leadIdx, 0),
    leadCycleSpeed,
    usingWhiteFlute: targetSetup.requiresWhiteFlute,
    feebasState: targetSetup.feebasState,
    roamerState: targetSetup.roamerState,
    massOutbreakState: targetSetup.massOutbreakState,
    initial_seed: targetSetup.targetPaintingAdvs.before,
    hasPreselectedData: true,
    usingPaintingReseeding: targetSetup.targetPaintingAdvs.before !== 0,
    wantedMethod: targetSetup.targetMethod,
    safariPokeblock: targetSetup.safariPokeblock,
  };
};

const getLeadCycleSpeedFields = (
  leadType: Gen3Lead,
  idealLeadCycleSpeed: number | null,
  usingIdealLeadCycleSpeed: boolean,
  setLeadCycleSpeed: (spd: number) => void,
): Field[] => {
  if (leadType === "Egg") {
    return [];
  }

  return [
    {
      label: "Lead Cycle Speed",
      ...leadCycleSpeedTooltip(),
      input: (
        <LeadCycleSpeedSelector
          idealLeadCycleSpeed={idealLeadCycleSpeed}
          idealLeadSelected={usingIdealLeadCycleSpeed}
          setLeadCycleSpeed={setLeadCycleSpeed}
        />
      ),
    },
  ];
};

export const Wild3MethodDistributionFields = ({
  onLeadCycleSpeedChanged,
  idealLeadCycleSpeed,
  usingIdealLeadCycleSpeed,
}: {
  onLeadCycleSpeedChanged: (leadCycleSpeed: number) => void;
  idealLeadCycleSpeed: number | null;
  usingIdealLeadCycleSpeed: boolean;
}) => {
  const { setFieldValue } = useFormContext<FormState>();
  const leadIdx = useWatch<FormState, "leadIdx">({
    name: "leadIdx",
  });

  const leadCycleSpeed = useWatch<FormState, "leadCycleSpeed">({
    name: "leadCycleSpeed",
  });

  const fields: Field[] = getLeadCycleSpeedFields(
    gen3Leads[leadIdx],
    idealLeadCycleSpeed,
    usingIdealLeadCycleSpeed,
    (spd) => setFieldValue("leadCycleSpeed", spd),
  );

  React.useEffect(() => {
    onLeadCycleSpeedChanged(leadCycleSpeed);
  }, [leadCycleSpeed, onLeadCycleSpeedChanged]);

  return <FormFieldTable fields={fields} />;
};

const getColumns = (
  _t: Translations,
  fixedData: FixedData,
): ResultColumn<UiResult>[] => {
  const columns: ResultColumn<UiResult>[] = [
    ...(fixedData.showTarget
      ? [
          {
            title: "",
            key: "isWanted",
            dataIndex: "pre_sweet_scent_cycle_ranges",
            render: (_, values) => {
              if (
                (fixedData.wantedPID !== null &&
                  values.pid !== fixedData.wantedPID) ||
                values.method !== fixedData.targetSetup.targetMethod
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
      tooltip:
        "Processor cycle counter when reaching start of the Pokémon generation.",
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
    ...(fixedData.showTarget
      ? []
      : [
          {
            title: "Shiny",
            dataIndex: "shiny",
            render: (shiny: boolean) => (shiny ? "Yes" : "No"),
          } as const,
        ]),
    { title: "Nature", dataIndex: "nature" },
    ...ivColumns,
  ];

  return columns;
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

const calculate = async (values: FormState, fixedData: FixedData) => {
  const initial_seed = values.usingPaintingReseeding ? values.initial_seed : 0;

  const { canUsePokeblock } = getPossibleValuesForMap(
    values.map,
    values.action,
  );

  const opts: Wild3GeneratorOptions = {
    tid: fixedData.tid,
    sid: fixedData.sid,
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
    using_white_flute: values.usingWhiteFlute,
    roamer_state: values.roamerState,
    mass_outbreak_state: values.massOutbreakState,
    feebas_state: values.feebasState,
    lead_cycle_speed: values.leadCycleSpeed,
    safari_pokeblock:
      canUsePokeblock && values.safariPokeblock !== null
        ? {
            Specific: values.safariPokeblock,
          }
        : null,
  };

  const map_data = emeraldWildGameData.maps_data.find(
    (table) => table.map_id === values.map,
  );
  if (map_data == null) {
    return {
      uiResults: [],
      cycle_at_moments: [],
      advanceAtSweetScent: 0,
      hasError: true,
    };
  }

  const { results, cycle_at_moments } =
    await rngTools.generate_gen3_wild_distribution(
      initial_seed,
      values.advance,
      opts,
      map_data,
    );

  return {
    uiResults: convertSearcherResultsToUIResults(results),
    cycle_at_moments,
    advanceAtSweetScent: lcrng_distance(0, initial_seed) + values.advance,
    hasError: false,
  };
};

const calcLeadCycleSpd = (values: FormState) => {
  const isEggLead = gen3Leads[values.leadIdx] === "Egg";
  return isEggLead ? null : values.leadCycleSpeed;
};

const getSubmitButtonLabel = (fixedData: FixedData) => {
  const { targetPaintingAdvs } = fixedData.targetSetup;
  const advs =
    targetPaintingAdvs.before !== 0
      ? `${formatLargeInteger(targetPaintingAdvs.before)} | ${formatLargeInteger(targetPaintingAdvs.after)}`
      : formatLargeInteger(targetPaintingAdvs.after);
  return `Generate all possible Pokémon encounters at advances ${advs}`;
};

export const Wild3MethodDistribution = ({
  fixedData,
  permitEnablingDebugOptions,
  setLeadCycleSpeed: setLeadCycleSpeedProp,
  leadCycleSpeed: leadCycleSpeedProp,
}: Props) => {
  const [hasError, setHasError] = React.useState(true);
  const [results, setResults] = React.useState<UiResult[]>([]);
  const [leadCycleSpeed, setLeadCycleSpeed] = React.useState<number | null>(
    leadCycleSpeedProp ?? null,
  );

  React.useEffect(() => {
    setLeadCycleSpeed(leadCycleSpeedProp ?? null);
  }, [leadCycleSpeedProp]);

  const [cycleAtMoments, setCycleAtMoments] = React.useState<CycleAtMoment[]>(
    [],
  );
  const [advanceAtSweetScent, setAdvanceAtSweetScent] = React.useState(0);

  const updateResults = React.useCallback(
    (values: FormState) => {
      calculate(values, fixedData).then(
        ({ uiResults, cycle_at_moments, advanceAtSweetScent, hasError }) => {
          setResults(uiResults);
          setCycleAtMoments(cycle_at_moments);
          setLeadCycleSpeed(calcLeadCycleSpd(values));
          setAdvanceAtSweetScent(advanceAtSweetScent);
          setHasError(hasError);
        },
      );
    },
    [fixedData, setResults, setCycleAtMoments],
  );

  const onSubmit: RngToolSubmit<FormState> = async (values) => {
    updateResults(values);
  };

  const initialLeadCycleSpeed =
    leadCycleSpeedProp ??
    (fixedData.usingIdealLeadCycleSpeed
      ? (fixedData.idealLeadCycleSpeed ?? AVERAGE_LEAD_CYCLE_SPEED)
      : fixedData.targetSetup.leadCycleSpeed);

  const initialValues = React.useMemo(
    () => getInitialValues(fixedData, initialLeadCycleSpeed),
    [fixedData, initialLeadCycleSpeed],
  );

  React.useEffect(() => {
    updateResults(initialValues);
  }, [updateResults, initialValues, fixedData]);

  const getColumnsProps = (t: Translations) => {
    return getColumns(t, fixedData);
  };

  const onLeadCycleSpeedChanged = (leadCycleSpeed: number) => {
    const values = getInitialValues(fixedData, leadCycleSpeed);
    setLeadCycleSpeed(calcLeadCycleSpd(values));
    updateResults(values);
    setLeadCycleSpeedProp?.(leadCycleSpeed);
  };

  return (
    <>
      <RngToolForm<FormState, UiResult>
        getColumns={getColumnsProps}
        results={results}
        initialValues={initialValues}
        values={initialValues}
        onSubmit={onSubmit}
        submitTrackerId="wild3_method_distribution"
        rowKey="uid"
        submitButtonLabel={getSubmitButtonLabel(fixedData)}
      >
        <Wild3MethodDistributionFields
          onLeadCycleSpeedChanged={onLeadCycleSpeedChanged}
          idealLeadCycleSpeed={fixedData.idealLeadCycleSpeed}
          usingIdealLeadCycleSpeed={fixedData.usingIdealLeadCycleSpeed}
        />
      </RngToolForm>

      {!hasError && results.length === 0 && (
        <Typography.Text strong fontSize={16}>
          Result: No Pokémon encounter when using that setup.
        </Typography.Text>
      )}

      {permitEnablingDebugOptions && (
        <Wild3CycleAtMoments
          leadCycleSpeed={leadCycleSpeed}
          cycleAtMomentsFromTool={cycleAtMoments}
          advanceAtSweetScent={advanceAtSweetScent}
        />
      )}
    </>
  );
};
