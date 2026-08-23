import React from "react";
import { MultiTimer } from "./multiTimer";
import { Field, FormFieldTable } from "./formFieldTable";
import { Switch } from "./switch";
import { NumberInput } from "./numberInput";
import { useActiveRouteTranslations } from "~/hooks/useActiveRoute";
import { Gen3TimerAtom } from "~/rngToolsUi/timer/atoms";
import { useAtom } from "jotai";

type AdvancedSettingsProps = {
  timer: Gen3TimerAtom;
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
      label: t["Calibration"],
      tooltip: "For advanced users: save calibration between different RNGs.",
      input: (
        <NumberInput
          numType="float"
          name="calibration"
          value={timerSettings.settings.calibration}
          onChange={(value) => {
            if (value != null) {
              updateTimer({ calibration: value });
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
  targetAdvance: number;
  timer: Gen3TimerAtom;
  disableAdvancedSettings?: boolean;
};

export const Gen3Timer = ({
  trackerId,
  targetAdvance,
  timer,
  disableAdvancedSettings,
}: Props) => {
  const [settings, updateTimer] = useAtom(timer);

  React.useEffect(() => {
    updateTimer({ targetFrame: targetAdvance });
  }, [updateTimer, targetAdvance]);

  return (
    <MultiTimer
      milliseconds={settings.ms}
      startButtonTrackerId={`${trackerId}_start`}
      stopButtonTrackerId={`${trackerId}_stop`}
      slots={{
        aboveStartButton: !disableAdvancedSettings && (
          <AdvancedSettings timer={timer} />
        ),
      }}
    />
  );
};
