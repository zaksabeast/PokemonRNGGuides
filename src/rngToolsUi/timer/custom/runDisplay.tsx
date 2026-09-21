import React from "react";
import { useTimerSequence } from "~/hooks/useTimerSequence";
import { RunView } from "../runView";
import {
  getHitLabel,
  getNumType,
  getTimerLabel,
  type AllTimerSettings,
} from "./state";

type Props = {
  settings: AllTimerSettings;
  milliseconds: number[];
  sequence: ReturnType<typeof useTimerSequence>;
  onEditInSetup: () => void;
  onCalibrate: (index: number, hit: number) => void;
};

export const RunDisplay = ({
  settings,
  milliseconds,
  sequence,
  onEditInSetup,
  onCalibrate,
}: Props) => {
  const [selectedIndex, setSelectedIndex] = React.useState<number | null>(null);
  const { timers } = settings;

  // Defaults to the last timer, since that is the target the user usually
  // observes, but any timer can be selected to calibrate it.
  const calibrationIndex = Math.min(
    selectedIndex ?? timers.length - 1,
    timers.length - 1,
  );
  const calibrationTimer = timers[calibrationIndex];

  return (
    <RunView
      sequence={sequence}
      milliseconds={milliseconds}
      startTrackerId="start_custom_timer"
      stopTrackerId="stop_custom_timer"
      listTitle="Timers"
      rows={timers.map((timer, index) => ({
        id: timer.timer_id,
        label: getTimerLabel(timer),
        ms: milliseconds[index] ?? 0,
      }))}
      selectedRowIndex={calibrationIndex}
      onSelectRow={setSelectedIndex}
      onEdit={onEditInSetup}
      hit={
        calibrationTimer == null
          ? undefined
          : {
              id: calibrationIndex,
              type: "single",
              label: getHitLabel(calibrationTimer),
              caption: `calibrates timer ${calibrationIndex + 1}`,
              numType: getNumType(calibrationTimer),
              trackerId: "calibrate_custom_timer",
              onCalibrate: (hit: number) => onCalibrate(calibrationIndex, hit),
            }
      }
    />
  );
};
