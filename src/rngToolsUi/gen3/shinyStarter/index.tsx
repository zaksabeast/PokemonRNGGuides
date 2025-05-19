import React from "react";
import { Flex, MultiTimer, Field, Input } from "~/components";
import { FindTargetAdvance } from "./findTarget";
import { CaughtMon } from "./caughtMon";
import { FormFieldTable } from "~/components/formFieldTable";
import { TargetPokemon } from "./targetPokemon";
import { defaultMinMaxStats, MinMaxStats } from "~/types/stat";

export type Game = "emerald" | "rs";
export type Starter = "Mudkip" | "Torchic" | "Treecko";

export type TargetStarter = {
  species: Starter;
  minMaxStats: MinMaxStats;
};

type Props = {
  game: Game;
};

export const ShinyHoennStarter = ({ game }: Props) => {
  const [targetAdvance, setTargetAdvance] = React.useState(0);
  const [targetStarter, setTargetStarter] = React.useState<TargetStarter>({
    species: "Mudkip",
    minMaxStats: defaultMinMaxStats,
  });

  // 9 adv for calibration to open the bag. 3 adv for offset between pressing A and generating the Pokémon
  const [calibrationAndOffset, setCalibrationAndOffset] = React.useState(9 + 3);

  const milliseconds = React.useMemo(() => {
    const advFromTimer = targetAdvance - calibrationAndOffset;
    return [5000, Math.round((advFromTimer * 1000) / 59.7275)];
  }, [targetAdvance, calibrationAndOffset]);

  const fields = React.useMemo((): Field[] => {
    return [
      {
        label: "Target advance",
        input: <>{targetAdvance}</>,
      },
      {
        label: "Calibration + Offset",
        input: (
          <Input
            name="offset"
            onChange={(event) => {
              setCalibrationAndOffset(+event.target.value || 0);
            }}
            value={calibrationAndOffset}
          />
        ),
      },
    ];
  }, [targetAdvance, calibrationAndOffset]);

  const setLatestHitAdv = React.useCallback(
    (val: number) => {
      setCalibrationAndOffset(calibrationAndOffset + val - targetAdvance);
    },
    [targetAdvance, calibrationAndOffset, setCalibrationAndOffset],
  );

  return (
    <Flex gap={32} vertical>
      <FindTargetAdvance game={game} setTargetAdvance={setTargetAdvance} />
      {targetAdvance !== 0 && [
        <FormFieldTable fields={fields} />,
        <MultiTimer
          milliseconds={milliseconds}
          startButtonTrackerId="start_gen3_shiny_starter_timer"
          stopButtonTrackerId="stop_gen3_shiny_starter_timer"
        />,
        <TargetPokemon
          game={game}
          targetAdvance={targetAdvance}
          targetStarter={targetStarter}
          setTargetStarter={setTargetStarter}
        />,
        <CaughtMon
          game={game}
          targetAdvance={targetAdvance}
          targetStarter={targetStarter}
          setLatestHitAdv={setLatestHitAdv}
        />,
      ]}
    </Flex>
  );
};
