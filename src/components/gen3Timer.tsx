import React from "react";
import { MultiTimer } from "~/components";
import { Gen3TimerAtom, useGen3Timer } from "~/hooks/useGen3Timer";

type Props = {
  trackerId: string;
  targetAdvance: number;
  timer: Gen3TimerAtom;
};

export const Gen3Timer = ({ trackerId, targetAdvance, timer }: Props) => {
  const { ms, initTimer } = useGen3Timer(timer);

  React.useEffect(() => {
    initTimer({ target_frame: targetAdvance });
  }, [initTimer, targetAdvance]);

  return (
    <MultiTimer
      milliseconds={ms}
      startButtonTrackerId={`${trackerId}_start`}
      stopButtonTrackerId={`${trackerId}_stop`}
    />
  );
};
