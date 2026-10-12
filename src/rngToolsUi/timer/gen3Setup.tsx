import React from "react";
import {
  FormCard,
  FormSection,
  NumberField,
  PrimaryButton,
} from "~/components/form";
import { type Gen3TimerSettings } from "~/rngTools";
import { BeepsField, ConsoleField } from "./setupParts";

type Props = {
  settings: Gen3TimerSettings;
  maxBeepCount: number;
  setMaxBeepCount: (maxBeepCount: number) => void;
  onSet: (settings: Gen3TimerSettings) => void;
};

export const Gen3Setup = ({
  settings,
  maxBeepCount,
  setMaxBeepCount,
  onSet,
}: Props) => {
  const [draft, setDraft] = React.useState(settings);

  const update = (updates: Partial<Gen3TimerSettings>) =>
    setDraft({ ...draft, ...updates });

  return (
    <FormCard>
      <FormSection title="Target">
        <NumberField
          name="preTimer"
          label="Pre-Timer (ms)"
          numType="float"
          value={draft.preTimer}
          onChange={(preTimer) => update({ preTimer: preTimer ?? 0 })}
        />
        <NumberField
          name="targetFrame"
          label="Target Frame"
          numType="float"
          value={draft.targetFrame}
          onChange={(targetFrame) => update({ targetFrame: targetFrame ?? 0 })}
        />
      </FormSection>

      <FormSection title="Calibration">
        <NumberField
          name="calibration"
          label="Calibration"
          numType="float"
          value={draft.calibration}
          onChange={(calibration) => update({ calibration: calibration ?? 0 })}
        />
      </FormSection>

      <FormSection title="Rarely changes">
        <ConsoleField
          value={draft.console}
          onChange={(console) => update({ console })}
        />
        <BeepsField value={maxBeepCount} onChange={setMaxBeepCount} />
      </FormSection>

      <PrimaryButton trackerId="set_gen3_timer" onClick={() => onSet(draft)}>
        Set Timer
      </PrimaryButton>
    </FormCard>
  );
};
