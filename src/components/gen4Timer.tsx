import React from "react";
import { MultiTimer, MultiTimerProps } from "./multiTimer";
import { MetronomeButton } from "./metronome";
import { Flex } from "./flex";
import { type Field, FormFieldTable } from "./formFieldTable";
import { NumberInput } from "./numberInput";
import { Gen4TimerAtom } from "~/rngToolsUi/timer/atoms";
import { useAtom } from "jotai";
import { useMetronome } from "~/hooks/useMetronome";
import { useActiveRouteTranslations } from "~/hooks/useActiveRoute";
import { Switch } from "./switch";

type AdvancedSettingsProps = {
  timer: Gen4TimerAtom;
};

const AdvancedSettings = ({ timer }: AdvancedSettingsProps) => {
  const [showAdvanced, setShowAdvanced] = React.useState(false);
  const t = useActiveRouteTranslations();
  const [timerSettings, updateTimer] = useAtom(timer);
  const fields: Field[] = [
    {
      label: t["Advanced Settings"],
      input: <Switch value={showAdvanced} onChange={setShowAdvanced} />,
    },
    {
      show: showAdvanced,
      indent: 1,
      label: t["Calibrated Delay"],
      tooltip: "Save calibration between different RNGs.",
      input: (
        <NumberInput
          numType="float"
          name="calibration"
          value={timerSettings.settings.calibratedDelay}
          onChange={(value) => {
            if (value != null) {
              updateTimer({ calibratedDelay: value });
            }
          }}
        />
      ),
    },
  ];

  return <FormFieldTable fields={fields} />;
};

type Props = {
  trackerId: string;
  timer: Gen4TimerAtom;
  is3ds: boolean;
  disableAdvancedSettings?: boolean;
  slots?: MultiTimerProps["slots"];
};

export const Gen4Timer = ({
  trackerId,
  timer,
  is3ds,
  disableAdvancedSettings: disableCalibrationField,
  slots,
}: Props) => {
  const [timerSettings] = useAtom(timer);
  const metronome = useMetronome({
    enableAudio: true,
  });

  return (
    <Flex vertical gap={12}>
      <MultiTimer
        milliseconds={timerSettings.ms}
        disableStart={
          (is3ds && !metronome.isRunning) ||
          (metronome.isRunning && !metronome.justTicked)
        }
        startButtonTrackerId={`${trackerId}_start`}
        stopButtonTrackerId={`${trackerId}_stop`}
        slots={{
          aboveStartButton: (
            <>
              {slots?.aboveStartButton}
              {!disableCalibrationField && <AdvancedSettings timer={timer} />}
            </>
          ),
          belowStartButton: (
            <>
              {is3ds && <MetronomeButton {...metronome} />}
              {slots?.belowStartButton}
            </>
          ),
        }}
      />
    </Flex>
  );
};
