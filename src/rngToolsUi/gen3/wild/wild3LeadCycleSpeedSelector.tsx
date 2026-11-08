import {
  ResultColumn,
  Icon,
  Typography,
  ResultTable,
  Flex,
  PokemonName,
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
  type Wild3AudioInfluences,
  getWild3InitialCycleDistributionForSetup,
  formatPlayingSong,
  formatWild3Weather,
} from "./wild3AudioInfluences";
import { toOptions } from "~/utils/options";
import { getInitialCycleSummary } from "./data/initial_cycle_main";

/*
Wild3LeadCycleSpeedSelector is used to set/calibrate leadCycleSpeed.
It is like Wild3LeadCycleSpeedInput, but displays the impact of lead cycle speed (method distribution).  
*/

export type Props = {
  targetSetup: TargetSetup;
  audioInfluences: Wild3AudioInfluences;
  setAudioInfluences: (audioInfluences: Wild3AudioInfluences) => void;
  permitEnablingDebugOptions: boolean;
  setLeadCycleSpeed: (leadCycleSpeed: number) => void;
  leadCycleSpeed: number | null;
};

const getColumns = (targetSetup: TargetSetup): ResultColumn<UiResult>[] => {
  const columns: ResultColumn<UiResult>[] = [
    {
      title: "",
      key: "isWanted",
      dataIndex: "initial_cycle_range",
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
      title: "Initial cycle",
      tooltip:
        "Processor cycle counter when reaching start of the Pokémon generation.",
      dataIndex: "initial_cycle_range",
      render: (initial_cycle_range, { display_negative_cycle_as_0 }) => {
        const range = initial_cycle_range;
        const start = display_negative_cycle_as_0
          ? Math.max(range.start, 0)
          : range.start;

        return `${formatLargeInteger(start)} to ${formatLargeInteger(range.start + range.len - 1)}`;
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
    {
      title: "Species",
      dataIndex: "species",
      render: (species) => <PokemonName species={species} />,
    },
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
  audioInfluences,
  setAudioInfluences,
  permitEnablingDebugOptions,
  setLeadCycleSpeed: setLeadCycleSpeedProp,
  leadCycleSpeed: leadCycleSpeedProp,
}: Props) => {
  const [distributions, setDistributions] =
    React.useState<Wild3Distributions | null>(null);
  const actualLeadCycleSpeed =
    targetSetup.lead === "Egg" ? 0 : leadCycleSpeedProp;
  const selectedAudio = normalizeWild3AudioInfluences(
    targetSetup.map,
    targetSetup.action,
    audioInfluences,
  );
  const { weathers, playingSongs } = getWild3AudioInfluenceOptions(
    targetSetup.map,
    targetSetup.action,
  );
  const initialCycleDistribution = getWild3InitialCycleDistributionForSetup({
    ...targetSetup,
    ...selectedAudio,
  });
  const initialCycleSummary = getInitialCycleSummary(
    initialCycleDistribution?.distribution ?? [],
  );

  React.useEffect(() => {
    if (initialCycleDistribution == null) {
      setDistributions(null);
      return;
    }

    setupToDistributions(
      targetSetup,
      {
        LikelihoodForLead: {
          min_max_initial_cycle: [
            initialCycleDistribution.min,
            initialCycleDistribution.max,
          ],
          lead_cycle_spd: actualLeadCycleSpeed ?? 0,
        },
      },
      audioInfluences,
    ).then((val) => {
      setDistributions(val);
    });
  }, [
    actualLeadCycleSpeed,
    targetSetup,
    audioInfluences,
    initialCycleDistribution,
  ]);

  return (
    <>
      <FormCard>
        <FormSection>
          {weathers.length > 1 && (
            <SelectField
              label="Weather audio"
              value={selectedAudio.weather}
              options={toOptions(weathers, formatWild3Weather)}
              onChange={(weather) =>
                setAudioInfluences({ ...audioInfluences, weather })
              }
            />
          )}
          {playingSongs.length > 1 && (
            <SelectField
              label="Playing song"
              value={selectedAudio.playing_song}
              options={toOptions(playingSongs, formatPlayingSong)}
              onChange={(playing_song) =>
                setAudioInfluences({ ...audioInfluences, playing_song })
              }
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
              leadCycleSpeed={leadCycleSpeedProp ?? AVERAGE_LEAD_CYCLE_SPEED}
              setLeadCycleSpeed={setLeadCycleSpeedProp}
            />
          )}
        </FormSection>
        {initialCycleSummary != null && (
          <FormSection>
            Possible initial cycle:{" "}
            {formatLargeInteger(initialCycleSummary.min)} -{" "}
            {formatLargeInteger(initialCycleSummary.max)} (Median:{" "}
            {formatLargeInteger(initialCycleSummary.median)})
          </FormSection>
        )}
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
          targetSetup={targetSetup}
          audioInfluences={audioInfluences}
        />
      )}
    </>
  );
};

export const Wild3LeadCycleSpeedSelectorWithBtn = ({
  targetSetup,
  audioInfluences,
  setAudioInfluences,
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
          audioInfluences={audioInfluences}
          setAudioInfluences={setAudioInfluences}
          permitEnablingDebugOptions={permitEnablingDebugOptions}
          setLeadCycleSpeed={setLeadCycleSpeed}
          leadCycleSpeed={leadCycleSpeed}
        />
      )}
    </Flex>
  );
};
