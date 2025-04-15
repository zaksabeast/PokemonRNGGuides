import React from "react";
import { Flex, MultiTimer } from "~/components";
import { FindTargetAdvance } from "./findTarget";
import { CaughtMon, CaughtMonResult } from "./caughtMon";

const calculateMillis = (
  targetAdvance: number,
  hitAdvance: number,
): number[] => {
  // stubbed
  return [targetAdvance, hitAdvance * 1000];
};

export const ShinyStarter = () => {
  const [targetAdvance, setTargetAdvance] = React.useState(0);
  const [hitAdvance, setHitAdvance] = React.useState(0);

  const onClickCaughtMon = React.useCallback((caughtMon: CaughtMonResult) => {
    setHitAdvance(caughtMon.advance);
  }, []);

  const milliseconds = React.useMemo(() => {
    return calculateMillis(targetAdvance, hitAdvance);
  }, [targetAdvance, hitAdvance]);

  return (
    <Flex gap={16} vertical>
      <FindTargetAdvance setTargetAdvance={setTargetAdvance} />
      <MultiTimer
        minutesBeforeTarget={0}
        milliseconds={milliseconds}
        startButtonTrackerId="start_gen3_shiny_starter_timer"
        stopButtonTrackerId="stop_gen3_shiny_starter_timer"
      />
      <CaughtMon
        targetAdvance={targetAdvance}
        onClickCaughtMon={onClickCaughtMon}
      />
    </Flex>
  );
};
