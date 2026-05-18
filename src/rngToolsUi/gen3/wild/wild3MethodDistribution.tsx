import {
  Field,
  ResultColumn,
  RngToolForm,
  Icon,
  Typography,
} from "~/components";
import { formatProbability } from "~/utils/formatProbability";
import React from "react";

import { ivColumns } from "~/rngToolsUi/shared/ivColumns";
import { Translations } from "~/translations";

import { Wild3CycleAtMoments } from "./wild3CycleAtMoments";
import { formatLargeInteger } from "~/utils/formatLargeInteger";
import { Tooltip } from "antd";
import {
  AVERAGE_LEAD_CYCLE_SPEED,
  LeadCycleSpeedSelector,
} from "./leadCycleSpeedSelector";
import { leadCycleSpeedTooltip } from "./wild3Labels";
import { TargetSetup } from "./wild3CalibTargetSetupInput";
import {
  setupToDistributions,
  UiResult,
  Wild3Distributions,
} from "./wild3SetupToDistribution";

/*
Input: TargetSetup
Output: leadCycleSpeed
*/

export type Props = {
  targetSetup: TargetSetup;
  permitEnablingDebugOptions: boolean;
  setLeadCycleSpeed: (leadCycleSpeed: number) => void;
  leadCycleSpeed: number | null;
};

type FormState = {};

const getColumns = (
  _t: Translations,
  targetSetup: TargetSetup,
): ResultColumn<UiResult>[] => {
  const columns: ResultColumn<UiResult>[] = [
    {
      title: "",
      key: "isWanted",
      dataIndex: "pre_sweet_scent_cycle_ranges",
      render: (_, values) => {
        if (values.method !== targetSetup.targetMethod) {
          return null;
        }
        return (
          <Tooltip title="Target Pokémon">
            <Icon name="Pokeball" size={20} />
          </Tooltip>
        );
      },
    },
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
    { title: "Nature", dataIndex: "nature" },
    ...ivColumns,
  ];

  return columns;
};

const initialValues = {};

const getSubmitButtonLabel = (targetSetup: TargetSetup) => {
  const { targetPaintingAdvs } = targetSetup;
  const advs =
    targetPaintingAdvs.before !== 0
      ? `${formatLargeInteger(targetPaintingAdvs.before)} | ${formatLargeInteger(targetPaintingAdvs.after)}`
      : formatLargeInteger(targetPaintingAdvs.after);
  return `Generate all possible Pokémon encounters at advances ${advs}`;
};

export const Wild3MethodDistribution = ({
  targetSetup,
  permitEnablingDebugOptions,
  setLeadCycleSpeed: setLeadCycleSpeedProp,
  leadCycleSpeed: leadCycleSpeedProp,
}: Props) => {
  const [distributions, setDistributions] =
    React.useState<Wild3Distributions | null>(null);
  const [leadCycleSpeed, setLeadCycleSpeed] = React.useState<number | null>(
    leadCycleSpeedProp ?? null,
  );

  React.useEffect(() => {
    setLeadCycleSpeed(leadCycleSpeedProp ?? null);
  }, [leadCycleSpeedProp]);

  const updateResults = React.useCallback(async () => {
    setupToDistributions(targetSetup, leadCycleSpeed ?? 0).then(
      setDistributions,
    );
  }, [leadCycleSpeed, targetSetup]);

  React.useEffect(() => {
    updateResults();
  }, [leadCycleSpeed, updateResults]);

  const getColumnsProps = (t: Translations) => {
    return getColumns(t, targetSetup);
  };

  const fields: Field[] =
    targetSetup.lead === "Egg"
      ? []
      : [
          {
            label: "Lead Cycle Speed",
            ...leadCycleSpeedTooltip(),
            input: (
              <LeadCycleSpeedSelector
                idealLeadCycleSpeed={
                  distributions?.idealLeadCycleSpd ?? AVERAGE_LEAD_CYCLE_SPEED
                }
                leadCycleSpeed={leadCycleSpeed ?? AVERAGE_LEAD_CYCLE_SPEED}
                setLeadCycleSpeed={setLeadCycleSpeedProp}
              />
            ),
          },
        ];

  return (
    <>
      <RngToolForm<FormState, UiResult>
        getColumns={getColumnsProps}
        results={distributions?.uiResults ?? []}
        initialValues={initialValues}
        onSubmit={updateResults}
        submitTrackerId="wild3_method_distribution"
        rowKey="uid"
        submitButtonLabel={getSubmitButtonLabel(targetSetup)}
        fields={fields}
      />

      {distributions != null &&
        !distributions.hasError &&
        distributions.uiResults.length === 0 && (
          <Typography.Text strong fontSize={16}>
            Result: No Pokémon encounter when using that setup.
          </Typography.Text>
        )}

      {distributions != null && permitEnablingDebugOptions && (
        <Wild3CycleAtMoments
          leadCycleSpeed={leadCycleSpeed}
          cycleAtMomentsFromTool={distributions.cycle_at_moments}
          advanceAtSweetScent={distributions.advanceAtSweetScent}
        />
      )}
    </>
  );
};
