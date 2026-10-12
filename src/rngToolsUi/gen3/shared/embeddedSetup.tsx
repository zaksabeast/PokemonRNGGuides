import React from "react";
import { Alert } from "~/components";
import {
  FormBody,
  FormSection,
  NumberField,
  PrimaryButton,
} from "~/components/form";
import { type Gen3TimerSettings } from "~/rngTools";
import { BeepsField } from "~/rngToolsUi/timer/setupParts";

export type Gen3EmbeddedSettings = Pick<Gen3TimerSettings, "calibration">;

type Props = {
  settings: Gen3EmbeddedSettings;
  maxBeepCount: number;
  setMaxBeepCount: (maxBeepCount: number) => void;
  onSet: (settings: Gen3EmbeddedSettings) => void;
};

/**
 * The target frame comes from the guide,
 * so only calibration and rarely changed settings are editable here.
 */
export const Gen3EmbeddedSetup = ({
  settings,
  maxBeepCount,
  setMaxBeepCount,
  onSet,
}: Props) => {
  const [draft, setDraft] = React.useState(settings);

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
          name="calibration"
          label="Calibration"
          numType="float"
          value={draft.calibration}
          onChange={(calibration) =>
            setDraft({ ...draft, calibration: calibration ?? 0 })
          }
        />
      </FormSection>

      <FormSection title="Rarely changes">
        <BeepsField value={maxBeepCount} onChange={setMaxBeepCount} />
      </FormSection>

      <PrimaryButton
        trackerId="set_gen3_embedded_timer"
        onClick={() => onSet(draft)}
      >
        Set Timer
      </PrimaryButton>
    </FormBody>
  );
};
