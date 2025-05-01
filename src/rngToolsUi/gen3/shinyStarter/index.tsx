import React from "react";
import { Flex, MultiTimer } from "~/components";
import { FindTargetAdvance } from "./findTarget";
import { CaughtMon } from "./caughtMon";
import { FormFieldTable } from "../../../components/formFieldTable";
import { Field } from "~/components";
import { Input } from "~/components/input";
import { TargetPokemon } from "./targetPokemon";

export type Game = "emerald" | "rs";
export type Starter = "Mudkip" | "Torchic" | "Treecko";

export type MinMax = {
  min: number;
  max: number;
};

export type MinMaxStats = {
  hp: MinMax;
  atk: MinMax;
  def: MinMax;
  spa: MinMax;
  spd: MinMax;
  spe: MinMax;
};

export type TargetStarter = {
  species: Starter;
  minMaxStats: MinMaxStats;
};

type Props = {
  game: Game;
};

export const ShinyStarter = ({ game }: Props) => {
  const [targetAdvance, setTargetAdvance] = React.useState(0);
  const [targetStarter, setTargetStarter] = React.useState<TargetStarter>({
    species: "Mudkip",
    minMaxStats: {
      hp: { min: 0, max: 0 },
      atk: { min: 0, max: 0 },
      def: { min: 0, max: 0 },
      spa: { min: 0, max: 0 },
      spd: { min: 0, max: 0 },
      spe: { min: 0, max: 0 },
    },
  });

  // 9 adv for calibration to open the bag. 3 adv for offset between pressing A and generating the Pokémon
  const [calibrationAndOffset, setCalibrationAndOffset] = React.useState(9 + 3);

  const milliseconds = React.useMemo(() => {
    const advFromTimer = targetAdvance - calibrationAndOffset;
    return [5000, Math.round((advFromTimer * 1000) / 59.7275)];
  }, [targetAdvance, calibrationAndOffset]);

  const minutesBeforeTarget = Math.floor(milliseconds[1] / 60000);

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
            onChange={(e) => {
              setCalibrationAndOffset(+e.target.value || 0);
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
          minutesBeforeTarget={minutesBeforeTarget}
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
