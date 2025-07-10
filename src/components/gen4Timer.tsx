import React from "react";
import { MultiTimer, Flex, MetronomeButton } from "~/components";
import { Gen4TimerAtom, useGen4Timer } from "~/hooks/useGen4Timer";
import { useMetronome } from "~/hooks/useMetronome";
import { FeatureConfig } from "~/types";

type Props = {
  trackerId: string;
  timer: Gen4TimerAtom;
  is3ds: boolean;
  fields?: React.ReactNode;
} & FeatureConfig<
  "selfInit",
  {
    targetDelay: number;
    targetSecond: number;
  }
>;

export const Gen4Timer = ({
  selfInit = true,
  trackerId,
  targetDelay,
  targetSecond,
  timer,
  is3ds,
  fields,
}: Props) => {
  const { ms, initTimer } = useGen4Timer(timer);
  const metronome = useMetronome({
    enableAudio: true,
  });

  React.useEffect(() => {
    if (!selfInit) {
      return;
    }
    initTimer({
      min_time_ms: is3ds ? 55_000 : 14_000,
      calibrated_delay: 600,
      calibrated_second: 14,
      target_delay: targetDelay,
      target_second: targetSecond,
    });
  }, [selfInit, initTimer, targetDelay, targetSecond, is3ds]);

  return (
    <Flex vertical gap={12}>
      <MultiTimer
        milliseconds={ms}
        disableStart={
          (is3ds && !metronome.isRunning) ||
          (metronome.isRunning && !metronome.justTicked)
        }
        startButtonTrackerId={`${trackerId}_start`}
        stopButtonTrackerId={`${trackerId}_stop`}
      />
      {is3ds && <MetronomeButton {...metronome} />}
      {fields}
    </Flex>
  );
};
