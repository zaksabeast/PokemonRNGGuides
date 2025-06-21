import { Alert } from "~/components";

export const Metronome3dsNotice = () => {
  return (
    <Alert
      showIcon
      type="info"
      message="3DS users"
      description="Start the metronome before starting the timer. This will help you hit your target more accurately.  Toggle the metronome offset if your calibration results have advance and delay offsets of 0, but second offset of 1."
    />
  );
};
