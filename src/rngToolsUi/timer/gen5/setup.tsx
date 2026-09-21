import React from "react";
import { Button, Flex, NumberInput } from "~/components";
import { type GameConsole } from "~/rngTools";
import { PRIMARY_BUTTON_HEIGHT } from "../constants";
import {
  BeepsRow,
  DsConsoleRow,
  FieldLabel,
  FieldRow,
  GroupLabel,
  GroupRule,
} from "../setupParts";

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
    <FieldRow key={key}>
      <FieldLabel>{label}</FieldLabel>
      <NumberInput
        name={key}
        numType="float"
        // The key is constrained to numeric settings
        value={Number(draft[key])}
        onChange={(value) => {
          if (value == null) {
            return;
          }
          setDraft({ ...draft, [key]: value });
        }}
        fullFlex
      />
    </FieldRow>
  );

  return (
    <Flex vertical gap={16}>
      <Flex vertical gap={10}>
        <GroupLabel>Target</GroupLabel>
        {targetFields.map(renderField)}
      </Flex>

      <Flex vertical gap={10}>
        <GroupLabel>Calibration</GroupLabel>
        {calibrationFields.map(renderField)}
      </Flex>

      <Flex vertical gap={10}>
        <GroupLabel>
          Rarely changes
          <GroupRule />
        </GroupLabel>

        <DsConsoleRow
          value={draft.console}
          onChange={(console) => setDraft({ ...draft, console })}
        />

        <BeepsRow value={maxBeepCount} onChange={setMaxBeepCount} />
      </Flex>

      <Button
        trackerId={setTrackerId}
        type="primary"
        height={PRIMARY_BUTTON_HEIGHT}
        onClick={() => onSet(draft)}
      >
        Set Timer
      </Button>
    </Flex>
  );
};
