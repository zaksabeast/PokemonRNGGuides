import React from "react";
import { useAtom } from "jotai";
import {
  Alert,
  Button,
  Flex,
  Field,
  NumberInput,
  ResultColumn,
  ResultTable,
  Typography,
} from "~/components";
import { EmbeddedRunTimer } from "~/rngToolsUi/timer/embeddedRunTimer";
import { CaughtMon } from "./caughtMon";
import { FormFieldTable } from "~/components/formFieldTable";
import { TargetPokemon } from "./targetPokemon";
import { defaultMinMaxStats, MinMaxStats } from "~/types/stat";
import { gen3ConsoleFpsMap } from "~/types/console";
import { GBA_FPS } from "~/utils/consts";
import {
  ShinyStarterTidSidResult,
  shinyStarterConsoleAtom,
  shinyStarterTidSidResultsAtom,
  usingDeadBatteryAtom,
} from "./state";
import { findTargetAdvanceForShinyPokemon } from "./calc";

export type Game = "emerald" | "rs";
export type Starter = "Mudkip" | "Torchic" | "Treecko";

export type TargetStarter = {
  species: Starter;
  minMaxStats: MinMaxStats;
};

type Props = {
  game: Game;
};

type SelectButtonProps = {
  result: ShinyStarterTidSidResult;
  onSelect: (target: ShinyStarterTidSidResult) => void;
};

const SelectButton = ({ result, onSelect }: SelectButtonProps) => {
  return (
    <Button
      trackerId="select_gen3_shiny_starter_tid_sid"
      onClick={() => {
        onSelect(result);
      }}
    >
      Select
    </Button>
  );
};

const getColumns = (
  onSelect: SelectButtonProps["onSelect"],
): ResultColumn<ShinyStarterTidSidResult>[] => [
  {
    title: "Select",
    dataIndex: "tid",
    disableVerticalPadding: true,
    render: (_, result) => <SelectButton result={result} onSelect={onSelect} />,
  },
  {
    title: (
      <div>
        Hit advance for
        <br />
        TID/SID generation
      </div>
    ),
    key: "tid_gen_adv",
    dataIndex: "tid_gen_adv",
    render: (val, values) => {
      const diffWithTarget = val - values.tid_gen_target_adv;
      if (diffWithTarget === 0) {
        return `${val}`;
      }
      if (diffWithTarget > 0) {
        return `${val} (+${diffWithTarget})`;
      }
      return `${val} (${diffWithTarget})`;
    },
  },
  {
    title: "SID",
    dataIndex: "sid",
    render: (sid, { crossedOut }) => {
      return <Typography.Text delete={crossedOut}>{sid}</Typography.Text>;
    },
  },
  {
    title: (
      <div>
        Advance for shiny
        <br />
        starter
      </div>
    ),
    key: "Advance",
    dataIndex: "earliest_shiny_adv",
    render: (val) => {
      const durInMinutes = (val / GBA_FPS / 60).toFixed(1);
      return `${val} (~${durInMinutes} min)`;
    },
  },
];

const CALIB = 9;
const OFFSET = 3;

/*
Data for testing: 
  TID=0. SID=10059.
  Target =    Male, Brave, HP 21, ATK 13, Def 10, Spa 10, Spd 10, Spe 8
  -1220 adv = Male, Brave, HP 21, ATK 13, Def 10, Spa 10, Spd 10, Spe 9
*/

export const ShinyEmeraldStarter = ({ game }: Props) => {
  const [usingDeadBattery] = useAtom(usingDeadBatteryAtom);
  const [consoleType] = useAtom(shinyStarterConsoleAtom);
  const [selectedTarget, setSelectedTarget] =
    React.useState<ShinyStarterTidSidResult | null>(null);
  const [tidSidResults, setTidSidResults] = useAtom(
    shinyStarterTidSidResultsAtom,
  );
  const [targetAdvance, setTargetAdvance] = React.useState(0);
  const [targetStarter, setTargetStarter] = React.useState<TargetStarter>({
    species: "Mudkip",
    minMaxStats: defaultMinMaxStats,
  });

  const [humanInputDelay, setHumanInputDelay] = React.useState<number | null>(
    0,
  );
  const crossOutSid = (sid: number) => {
    setTidSidResults((results) =>
      results.map((result) =>
        result.sid === sid ? { ...result, crossedOut: true } : result,
      ),
    );
  };

  React.useEffect(() => {
    if (selectedTarget == null) {
      return;
    }

    let cancelled = false;
    setTargetAdvance(0);

    findTargetAdvanceForShinyPokemon(
      game,
      selectedTarget.tid,
      selectedTarget.sid,
      usingDeadBattery,
    ).then((advance) => {
      if (!cancelled && advance !== null) {
        setTargetAdvance(advance);
      }
    });

    return () => {
      cancelled = true;
    };
  }, [game, selectedTarget, usingDeadBattery]);

  const advFromTimer = targetAdvance - (humanInputDelay ?? 0) - CALIB - OFFSET;
  const milliseconds = [
    5000,
    Math.round((advFromTimer * 1000) / gen3ConsoleFpsMap[consoleType]),
  ];

  const fields: Field[] = [
    { label: "TID", input: <>{selectedTarget?.tid ?? 0}</> },
    { label: "SID", input: <>{selectedTarget?.sid ?? 0}</> },
    {
      label: "Target advance",
      input: <>{targetAdvance}</>,
    },
    {
      label: "Calibration",
      tooltip: "Number of RNG advances not caused by frames. (Ex: NPC moving)",
      input: `${CALIB}`,
    },
    {
      label: "Offset",
      tooltip:
        "Number of RNG advances between the last player input and when the start of the Pokémon generation.",
      input: `${OFFSET}`,
    },
    {
      label: "Human input delay (advance)",
      tooltip:
        "Number of RNG advances caused by human reaction time between the timer ending and pressing the input.",
      input: (
        <NumberInput
          name="offset"
          numType="decimal"
          onChange={setHumanInputDelay}
          value={humanInputDelay}
        />
      ),
    },
  ];

  const setLatestHitAdv = (val: number) => {
    setHumanInputDelay((humanInputDelay ?? 0) + val - targetAdvance);
  };

  return (
    <Flex gap={32} vertical>
      {tidSidResults.length === 0 ? (
        <Alert type="warning" title="Complete Step 1 before continuing." />
      ) : (
        <ResultTable<ShinyStarterTidSidResult>
          columns={getColumns(setSelectedTarget)}
          dataSource={tidSidResults}
          rowKey="sid"
        />
      )}
      {selectedTarget != null && targetAdvance !== 0 && (
        <>
          <FormFieldTable fields={fields} />
          <EmbeddedRunTimer
            milliseconds={milliseconds}
            labels={[
              "Soft reset START+SELECT+A+B",
              "Select YES to choose your Pokémon",
            ]}
            startTrackerId="start_gen3_shiny_starter_timer"
            stopTrackerId="stop_gen3_shiny_starter_timer"
          />
          <TargetPokemon
            game={game}
            targetAdvance={targetAdvance}
            setTargetStarter={setTargetStarter}
          />
          <CaughtMon
            game={game}
            targetAdvance={targetAdvance}
            targetStarter={targetStarter}
            setLatestHitAdv={setLatestHitAdv}
            sid={selectedTarget?.sid ?? 0}
            crossOutSid={crossOutSid}
          />
        </>
      )}
    </Flex>
  );
};
