import { MultiTimer } from "~/components";

type RsTidTimerProps = {
  targetAdvance: number;
  offset: number;
};

export const RsTidTimer: React.FC<RsTidTimerProps> = ({
  targetAdvance,
  offset,
}) => {
  const milliseconds = [
    5000,
    Math.round((targetAdvance - offset * 1000) / 59.7275),
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
