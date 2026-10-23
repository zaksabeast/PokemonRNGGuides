import {
  ResultColumn,
  Icon,
  Typography,
  ResultTable,
  Flex,
} from "~/components";
import { FormCard, FormSection, SwitchField } from "~/components/form";
import { formatProbability } from "~/utils/formatProbability";
import React from "react";

import { ivColumns } from "~/rngToolsUi/shared/ivColumns";

import { Wild3CycleAtMoments } from "./wild3CycleAtMoments";
import { Tooltip } from "antd";
import {
  AVERAGE_LEAD_CYCLE_SPEED,
  Wild3LeadCycleSpeedInput,
} from "./wild3LeadCycleSpeedInput";
import { leadCycleSpeedTooltip } from "./wild3Labels";
import { TargetSetup } from "./wild3TargetSetupInput";
import {
  setupToDistributions,
  UiResult,
  Wild3Distributions,
} from "./wild3SetupToDistribution";
import { formatLargeInteger } from "~/utils/formatLargeInteger";

/*
Wild3LeadCycleSpeedSelector is used to set/calibrate leadCycleSpeed.
It is like Wild3LeadCycleSpeedInput, but displays the impact of lead cycle speed (method distribution).  
*/

export type Props = {
  targetSetup: TargetSetup;
  permitEnablingDebugOptions: boolean;
  setLeadCycleSpeed: (leadCycleSpeed: number) => void;
  leadCycleSpeed: number | null;
};

const getColumns = (targetSetup: TargetSetup): ResultColumn<UiResult>[] => {
  const columns: ResultColumn<UiResult>[] = [
    {
      title: "",
      key: "isWanted",
      dataIndex: "pre_sweet_scent_cycle_range",
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
      dataIndex: "pre_sweet_scent_cycle_range",
      render: (pre_sweet_scent_cycle_range) => {
        const range = pre_sweet_scent_cycle_range;
        return `${formatLargeInteger(range.start)} to ${formatLargeInteger(range.start + range.len - 1)}`;
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

export const Wild3LeadCycleSpeedSelector = ({
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
  const actualLeadCycleSpeed = targetSetup.lead === "Egg" ? 0 : leadCycleSpeed;

  React.useEffect(() => {
    setLeadCycleSpeed(leadCycleSpeedProp ?? null);
  }, [leadCycleSpeedProp]);

  React.useEffect(() => {
    setupToDistributions(targetSetup, {
      LikelihoodForLead: {
        weather: "Sunny",
        consider_bike: false,
        lead_cycle_spd: actualLeadCycleSpeed ?? 0,
      },
    }).then((val) => {
      setDistributions(val);
    });
  }, [actualLeadCycleSpeed, targetSetup]);

  return (
    <>
      {targetSetup.lead === "Egg" ? (
        <Typography.Text>Egg lead can't be calibrated.</Typography.Text>
      ) : (
        <FormCard>
          <FormSection>
            <Wild3LeadCycleSpeedInput
              label="Lead Cycle Speed"
              {...leadCycleSpeedTooltip()}
              idealLeadCycleSpeed={
                distributions?.idealLeadCycleSpd ?? AVERAGE_LEAD_CYCLE_SPEED
              }
              leadCycleSpeed={leadCycleSpeed ?? AVERAGE_LEAD_CYCLE_SPEED}
              setLeadCycleSpeed={setLeadCycleSpeedProp}
            />
          </FormSection>
        </FormCard>
      )}

      <ResultTable<UiResult>
        columns={getColumns(targetSetup)}
        rowKey="uid"
        dataSource={distributions?.uiResults ?? []}
      />

      {distributions != null &&
        !distributions.hasError &&
        distributions.uiResults.length === 0 && (
          <Typography.Text strong fontSize={16}>
            Result: No Pokémon encounter when using that setup.
          </Typography.Text>
        )}

      {permitEnablingDebugOptions && (
        <Wild3CycleAtMoments
          leadCycleSpeed={actualLeadCycleSpeed}
          targetSetup={targetSetup}
        />
      )}
    </>
  );
};

export const Wild3LeadCycleSpeedSelectorWithBtn = ({
  targetSetup,
  permitEnablingDebugOptions,
  setLeadCycleSpeed,
  leadCycleSpeed,
  initialDisplayLeadCycleSpdButton,
}: Props & {
  initialDisplayLeadCycleSpdButton: boolean;
}) => {
  const [displayLeadCycleSpeed, setDisplayLeadCycleSpeed] =
    React.useState<boolean>(!initialDisplayLeadCycleSpdButton);

  return (
    <Flex vertical gap={20}>
      {!displayLeadCycleSpeed && (
        <FormCard>
          <SwitchField
            label="Display lead cycle speed calibration?"
            onChange={setDisplayLeadCycleSpeed}
            value={displayLeadCycleSpeed}
          />
        </FormCard>
      )}
      {displayLeadCycleSpeed && (
        <Wild3LeadCycleSpeedSelector
          targetSetup={targetSetup}
          permitEnablingDebugOptions={permitEnablingDebugOptions}
          setLeadCycleSpeed={setLeadCycleSpeed}
          leadCycleSpeed={leadCycleSpeed}
        />
      )}
    </Flex>
  );
};
