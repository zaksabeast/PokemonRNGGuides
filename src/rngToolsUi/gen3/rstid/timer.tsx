import { MultiTimer } from "~/components";
import { useRsTidState } from "./rstidState";

export const RsTidTimer = () => {
  const [state] = useRsTidState();
  const milliseconds = [
    5000,
    Math.round((state.target.advance - state.offset * 1000) / 59.7275),
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
