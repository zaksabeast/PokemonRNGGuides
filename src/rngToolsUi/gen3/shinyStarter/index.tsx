import React from "react";
import { Flex, MultiTimer, Field, Input } from "~/components";
import { FindTargetAdvance } from "./findTarget";
import { CaughtMon } from "./caughtMon";
import { FormFieldTable } from "~/components/formFieldTable";
import { TargetPokemon } from "./targetPokemon";
import { defaultMinMaxStats, MinMaxStats } from "~/types/stat";
import { MS_PER_GBA_FRAME } from "~/utils/consts";

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

  const advFromTimer = targetAdvance - calibrationAndOffset;
  const milliseconds = [5000, Math.round(advFromTimer * MS_PER_GBA_FRAME)];

  const fields: Field[] = [
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
            const num = Number(event.target.value);
            setCalibrationAndOffset(Number.isFinite(num) ? num : 0);
          }}
          value={calibrationAndOffset}
        />
      ),
    },
  ];

  const setLatestHitAdv = (val: number) => {
    setCalibrationAndOffset(calibrationAndOffset + val - targetAdvance);
  };

  return (
    <Flex gap={32} vertical>
      <FindTargetAdvance game={game} setTargetAdvance={setTargetAdvance} />
      {targetAdvance !== 0 && (
        <>
          <FormFieldTable fields={fields} />
          <MultiTimer
            milliseconds={milliseconds}
            startButtonTrackerId="start_gen3_shiny_starter_timer"
            stopButtonTrackerId="stop_gen3_shiny_starter_timer"
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
          />
        </>
      )}
    </Flex>
  );
};
