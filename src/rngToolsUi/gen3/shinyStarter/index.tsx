import React from "react";
import { Flex, MultiTimer } from "~/components";
import { FindTargetAdvance } from "./findTarget";
import { CaughtMon } from "./caughtMon";
import { FormFieldTable } from "../../../components/formFieldTable";
import { Field } from "~/components";
import { Input } from "~/components/input";

export type Game = "emerald" | "rs";
export type Starter = "Mudkip" | "Torchic" | "Treecko";

type Props = {
  game: Game;
};

export const ShinyStarter = ({ game }: Props) => {
  const [targetAdvance, setTargetAdvance] = React.useState(0);

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
    <Flex gap={16} vertical>
      <FindTargetAdvance game={game} setTargetAdvance={setTargetAdvance} />
      {targetAdvance !== 0 && [
        <FormFieldTable fields={fields} />,
        <MultiTimer
          minutesBeforeTarget={minutesBeforeTarget}
          milliseconds={milliseconds}
          startButtonTrackerId="start_gen3_shiny_starter_timer"
          stopButtonTrackerId="stop_gen3_shiny_starter_timer"
        />,
        <CaughtMon
          game={game}
          targetAdvance={targetAdvance}
          setLatestHitAdv={setLatestHitAdv}
        />,
      ]}
    </Flex>
  );
};
