import { MultiTimer } from "~/components";
import { Gen3TidSidResult } from "~/rngTools";

type Result = Gen3TidSidResult & { time: number };

type RsTidTimerProps = {
  target: Result;
  offset: number;
};

export const RsTidTimer: React.FC<RsTidTimerProps> = ({ target, offset }) => {
  const milliseconds = [
    5000,
    Math.round((target.advance - offset * 1000) / 59.7275),
  ];
  const minutesBeforeTarget = Math.floor(milliseconds[1] / 60000);

  return (
    <MultiTimer
      startButtonTrackerId="start_rs_tid_timer"
      stopButtonTrackerId="stop_rs_tid_timer"
      milliseconds={milliseconds}
      minutesBeforeTarget={minutesBeforeTarget}
    />
  );
};
