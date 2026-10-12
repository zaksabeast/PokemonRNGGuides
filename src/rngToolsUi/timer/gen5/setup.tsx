import React from "react";
import {
  FormCard,
  FormSection,
  NumberField,
  PrimaryButton,
} from "~/components/form";
import { type GameConsole } from "~/rngTools";
import { BeepsField, ConsoleField } from "../setupParts";

type NumericKey<Settings> = {
  [Key in keyof Settings]: Settings[Key] extends number ? Key : never;
}[keyof Settings] &
  string;

export type SetupField<Settings> = {
  key: NumericKey<Settings>;
  label: string;
};

type Props<Settings extends { console: GameConsole }> = {
  settings: Settings;
  targetFields: SetupField<Settings>[];
  calibrationFields: SetupField<Settings>[];
  maxBeepCount: number;
  setMaxBeepCount: (maxBeepCount: number) => void;
  setTrackerId: string;
  onSet: (settings: Settings) => void;
};

export const Gen5Setup = <Settings extends { console: GameConsole }>({
  settings,
  targetFields,
  calibrationFields,
  maxBeepCount,
  setMaxBeepCount,
  setTrackerId,
  onSet,
}: Props<Settings>) => {
  const [draft, setDraft] = React.useState(settings);

  const renderField = ({ key, label }: SetupField<Settings>) => (
    <NumberField
      key={key}
      name={key}
      label={label}
      numType="float"
      // The key is constrained to numeric settings
      value={Number(draft[key])}
      onChange={(value) => {
        if (value == null) {
          return;
        }
        setDraft({ ...draft, [key]: value });
      }}
    />
  );

  return (
    <FormCard>
      <FormSection title="Target">{targetFields.map(renderField)}</FormSection>

      <FormSection title="Calibration">
        {calibrationFields.map(renderField)}
      </FormSection>

      <FormSection title="Rarely changes">
        <ConsoleField
          dsOnly
          value={draft.console}
          onChange={(console) => setDraft({ ...draft, console })}
        />
        <BeepsField value={maxBeepCount} onChange={setMaxBeepCount} />
      </FormSection>

      <PrimaryButton trackerId={setTrackerId} onClick={() => onSet(draft)}>
        Set Timer
      </PrimaryButton>
    </FormCard>
  );
};
