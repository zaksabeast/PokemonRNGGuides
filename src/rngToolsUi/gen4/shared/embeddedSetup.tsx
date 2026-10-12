import React from "react";
import { Alert } from "~/components";
import {
  FormBody,
  FormSection,
  NumberField,
  PrimaryButton,
} from "~/components/form";
import { type Gen4TimerSettings } from "~/rngTools";
import { BeepsField } from "~/rngToolsUi/timer/setupParts";

export type Gen4EmbeddedSettings = Pick<
  Gen4TimerSettings,
  "calibratedDelay" | "calibratedSecond" | "targetSecond"
>;

type Props = {
  settings: Gen4EmbeddedSettings;
  maxBeepCount: number;
  setMaxBeepCount: (maxBeepCount: number) => void;
  onSet: (settings: Gen4EmbeddedSettings) => void;
};

export const Gen4EmbeddedSetup = ({
  settings,
  maxBeepCount,
  setMaxBeepCount,
  onSet,
}: Props) => {
  const [draft, setDraft] = React.useState(settings);

  const update = (updates: Partial<Gen4EmbeddedSettings>) =>
    setDraft({ ...draft, ...updates });

  return (
    <FormBody>
      <Alert
        type="warning"
        showIcon
        title="Only change these settings if you know what you're doing."
        description="The guide sets up this timer for you. Modifying it could ruin the RNG."
      />

      <FormSection title="Calibration">
        <NumberField
          name="calibratedDelay"
          label="Calibrated Delay"
          numType="float"
          value={draft.calibratedDelay}
          onChange={(calibratedDelay) =>
            update({ calibratedDelay: calibratedDelay ?? 0 })
          }
        />
        <NumberField
          name="calibratedSecond"
          label="Calibrated Seconds"
          numType="float"
          value={draft.calibratedSecond}
          onChange={(calibratedSecond) =>
            update({ calibratedSecond: calibratedSecond ?? 0 })
          }
        />
      </FormSection>

      <FormSection title="Rarely changes">
        <NumberField
          name="targetSecond"
          label="Target Seconds"
          numType="float"
          value={draft.targetSecond}
          onChange={(targetSecond) =>
            update({ targetSecond: targetSecond ?? 0 })
          }
        />
        <BeepsField value={maxBeepCount} onChange={setMaxBeepCount} />
      </FormSection>

      <PrimaryButton
        trackerId="set_gen4_embedded_timer"
        onClick={() => onSet(draft)}
      >
        Set Timer
      </PrimaryButton>
    </FormBody>
  );
};
