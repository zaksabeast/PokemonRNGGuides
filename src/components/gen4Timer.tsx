import React from "react";
import { MultiTimer } from "~/components";
import { Gen4TimerAtom, useGen4Timer } from "~/hooks/useGen4Timer";

type Props = {
  trackerId: string;
  targetDelay: number;
  targetSecond: number;
  timer: Gen4TimerAtom;
  is3ds: boolean;
};

export const Gen4Timer = ({
  trackerId,
  targetDelay,
  targetSecond,
  timer,
  is3ds,
}: Props) => {
  const { ms, initTimer } = useGen4Timer(timer);

  React.useEffect(() => {
    initTimer({
      is3ds,
      min_time_ms: 14000,
      calibrated_delay: 600,
      calibrated_second: 14,
      target_delay: targetDelay,
      target_second: targetSecond,
    });
  }, [initTimer, targetDelay, targetSecond, is3ds]);

  return (
    <MultiTimer
      milliseconds={ms}
      startButtonTrackerId={`${trackerId}_start`}
      stopButtonTrackerId={`${trackerId}_stop`}
    />
  );
};
