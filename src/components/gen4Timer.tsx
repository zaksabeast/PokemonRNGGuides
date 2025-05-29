import React from "react";
import { MultiTimer } from "~/components";
import { Gen4TimerAtom, useGen4Timer } from "~/hooks/useGen4Timer";

type Props = {
  trackerId: string;
  targetDelay: number;
  targetSecond: number;
  timer: Gen4TimerAtom;
};

export const Gen4Timer = ({
  trackerId,
  targetDelay,
  targetSecond,
  timer,
}: Props) => {
  const { ms, initTimer } = useGen4Timer(timer);

  React.useEffect(() => {
    initTimer({
      min_time_ms: 14000,
      target_delay: targetDelay,
      target_second: targetSecond,
    });
  }, [initTimer, targetDelay, targetSecond]);

  return (
    <MultiTimer
      milliseconds={ms}
      startButtonTrackerId={`${trackerId}_start`}
      stopButtonTrackerId={`${trackerId}_stop`}
    />
  );
};
