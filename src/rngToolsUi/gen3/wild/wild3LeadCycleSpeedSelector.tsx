import {
  ResultColumn,
  Icon,
  Typography,
  ResultTable,
  Flex,
} from "~/components";
import {
  FormCard,
  FormSection,
  SwitchField,
  SelectField,
} from "~/components/form";
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
import {
  getWild3AudioInfluenceOptions,
  normalizeWild3AudioInfluences,
  getWild3InitialCycleDistributionForSetup,
  formatPlayingSong,
  formatWild3Weather,
} from "./wild3AudioInfluences";
import { toOptions } from "~/utils/options";
import type { Wild3Weather, PlayingSong } from "~/rngTools";

/*
Wild3LeadCycleSpeedSelector is used to set/calibrate leadCycleSpeed.
It is like Wild3LeadCycleSpeedInput, but displays the impact of lead cycle speed (method distribution).  
*/

export type Props = {
  targetSetup: TargetSetup;
  setWeather: (weather: Wild3Weather) => void;
  setPlayingSong: (playing_song: PlayingSong) => void;
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
  setWeather,
  setPlayingSong,
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
  const selectedSetup = React.useMemo(() => {
    const audioInfluences = normalizeWild3AudioInfluences(
      targetSetup.map,
      targetSetup.action,
      targetSetup,
    );

    return { ...targetSetup, ...audioInfluences };
  }, [targetSetup]);
  const { weathers, playingSongs } = getWild3AudioInfluenceOptions(
    targetSetup.map,
    targetSetup.action,
  );

  React.useEffect(() => {
    setLeadCycleSpeed(leadCycleSpeedProp ?? null);
  }, [leadCycleSpeedProp]);

  React.useEffect(() => {
    const distribution =
      getWild3InitialCycleDistributionForSetup(selectedSetup);
    if (distribution == null) {
      setDistributions(null);

      return;
    }

    setupToDistributions(selectedSetup, {
      LikelihoodForLead: {
        min_max_initial_cycle: [distribution.min, distribution.max],
        lead_cycle_spd: actualLeadCycleSpeed ?? 0,
      },
    }).then((val) => {
      setDistributions(val);
    });
  }, [actualLeadCycleSpeed, selectedSetup]);

  return (
    <>
      <FormCard>
        <FormSection>
          {weathers.length > 1 && (
            <SelectField
              label="Weather"
              value={selectedSetup.weather}
              options={toOptions(weathers, formatWild3Weather)}
              onChange={setWeather}
            />
          )}
          {playingSongs.length > 1 && (
            <SelectField
              label="Playing song"
              value={selectedSetup.playing_song}
              options={toOptions(playingSongs, formatPlayingSong)}
              onChange={setPlayingSong}
            />
          )}
          {targetSetup.lead === "Egg" ? (
            <Typography.Text>Egg lead can't be calibrated.</Typography.Text>
          ) : (
            <Wild3LeadCycleSpeedInput
              label="Lead Cycle Speed"
              {...leadCycleSpeedTooltip()}
              idealLeadCycleSpeed={
                distributions?.idealLeadCycleSpd ?? AVERAGE_LEAD_CYCLE_SPEED
              }
              leadCycleSpeed={leadCycleSpeed ?? AVERAGE_LEAD_CYCLE_SPEED}
              setLeadCycleSpeed={setLeadCycleSpeedProp}
            />
          )}
        </FormSection>
      </FormCard>

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
          targetSetup={selectedSetup}
        />
      )}
    </>
  );
};

export const Wild3LeadCycleSpeedSelectorWithBtn = ({
  targetSetup,
  setWeather,
  setPlayingSong,
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
          setWeather={setWeather}
          setPlayingSong={setPlayingSong}
          permitEnablingDebugOptions={permitEnablingDebugOptions}
          setLeadCycleSpeed={setLeadCycleSpeed}
          leadCycleSpeed={leadCycleSpeed}
        />
      )}
    </Flex>
  );
};
