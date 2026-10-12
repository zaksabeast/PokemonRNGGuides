import { RadioField, SelectField, type SelectOption } from "~/components/form";
import { type GameConsole } from "~/rngTools";

export type TimerMode = "setup" | "run";

type TimerModeFieldProps = {
  value: TimerMode;
  onChange: (mode: TimerMode) => void;
  isRunning: boolean;
};

export const TimerModeField = ({
  value,
  onChange,
  isRunning,
}: TimerModeFieldProps) => (
  <RadioField<TimerMode>
    ariaLabel="Timer mode"
    cellSize="word"
    value={value}
    onChange={onChange}
    options={[
      { label: "Setup", value: "setup", disabled: isRunning },
      { label: "Run", value: "run" },
    ]}
  />
);

const beepOptions: SelectOption<number>[] = new Array(11)
  .fill(0)
  .map((_, index) => ({
    label: (index + 1).toString(),
    value: index,
  }));

type BeepsFieldProps = {
  value: number;
  onChange: (maxBeepCount: number) => void;
};

export const BeepsField = ({ value, onChange }: BeepsFieldProps) => (
  <SelectField<number>
    name="countdownBeeps"
    label="Beeps"
    value={value}
    onChange={onChange}
    options={beepOptions}
  />
);

const consoleOptions: SelectOption<GameConsole>[] = [
  { label: "GBA", value: "Gba" },
  { label: "NDS - Slot 2", value: "NdsSlot2" },
  { label: "NDS - Slot 1", value: "NdsSlot1" },
  { label: "DSI", value: "Dsi" },
  { label: "3DS", value: "ThreeDs" },
  { label: "Switch - FR/LG", value: "SwitchFrLg" },
];

const dsConsoleOptions: SelectOption<GameConsole>[] = [
  { label: "NDS - Slot 1", value: "NdsSlot1" },
  { label: "DSI", value: "Dsi" },
  { label: "3DS", value: "ThreeDs" },
];

type ConsoleFieldProps = {
  value: GameConsole;
  onChange: (console: GameConsole) => void;
  dsOnly?: boolean;
};

export const ConsoleField = ({
  value,
  onChange,
  dsOnly,
}: ConsoleFieldProps) => (
  <SelectField<GameConsole>
    name="console"
    label="Console"
    value={value}
    onChange={onChange}
    options={dsOnly === true ? dsConsoleOptions : consoleOptions}
  />
);
