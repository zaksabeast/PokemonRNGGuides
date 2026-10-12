import React from "react";
import { Alert, Flex, Link, Typography } from "~/components";
import {
  FormCard,
  FormSection,
  NumberField,
  PrimaryButton,
} from "~/components/form";
import { type Gen4TimerSettings } from "~/rngTools";
import { BeepsField, ConsoleField } from "./setupParts";

type Props = {
  settings: Gen4TimerSettings;
  maxBeepCount: number;
  setMaxBeepCount: (maxBeepCount: number) => void;
  onSet: (settings: Gen4TimerSettings) => void;
};

export const Gen4Setup = ({
  settings,
  maxBeepCount,
  setMaxBeepCount,
  onSet,
}: Props) => {
  const [draft, setDraft] = React.useState(settings);

  const update = (updates: Partial<Gen4TimerSettings>) =>
    setDraft({ ...draft, ...updates });

  return (
    <FormCard>
      <FormSection title="Target">
        <NumberField
          name="targetDelay"
          label="Target Delay"
          numType="float"
          value={draft.targetDelay}
          onChange={(targetDelay) => update({ targetDelay: targetDelay ?? 0 })}
        />
        <NumberField
          name="targetSecond"
          label="Target Seconds"
          numType="float"
          value={draft.targetSecond}
          onChange={(targetSecond) =>
            update({ targetSecond: targetSecond ?? 0 })
          }
        />
        <NumberField
          name="minTimeMs"
          label="Min Time (ms)"
          numType="float"
          value={draft.minTimeMs}
          onChange={(minTimeMs) => update({ minTimeMs: minTimeMs ?? 0 })}
        />
      </FormSection>

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
        <ConsoleField
          dsOnly
          value={draft.console}
          onChange={(console) => update({ console })}
        />
        <BeepsField value={maxBeepCount} onChange={setMaxBeepCount} />
      </FormSection>

      <Alert
        type="tip"
        showIcon
        title="Want easier 3ds RNG?"
        description={
          <Flex vertical>
            <Typography.Text>
              Set the console to 3ds and click "Set Timer" to see the 3ds
              helper.
            </Typography.Text>
            <Link href="/3ds-helper/">
              View the 3ds Helper guide for more details.
            </Link>
          </Flex>
        }
      />

      <PrimaryButton trackerId="set_gen4_timer" onClick={() => onSet(draft)}>
        Set Timer
      </PrimaryButton>
    </FormCard>
  );
};
