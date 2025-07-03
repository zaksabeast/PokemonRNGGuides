import { PrimitiveAtom, useAtom } from "jotai";
import { Switch, RadioGroup } from "~/components";
import { z } from "zod";

type Is3dsSwitchProps<State extends { is3ds: boolean }> = {
  disabled?: boolean;
  stateAtom: PrimitiveAtom<State>;
};

export const Is3dsSwitch = <State extends { is3ds: boolean }>({
  disabled,
  stateAtom,
}: Is3dsSwitchProps<State>) => {
  const [state, setState] = useAtom(stateAtom);
  return (
    <Switch
      disabled={disabled}
      value={state.is3ds}
      onChange={(is3ds: boolean) => setState((prev) => ({ ...prev, is3ds }))}
    />
  );
};

const Gen4ConsoleSchema = z.enum([
  "NdsDsi",
  "3dsNormalSettings",
  "3dsAltSettings",
]);

export type Gen4Console = z.infer<typeof Gen4ConsoleSchema>;

const options = [
  { label: "NDS/DSi", value: "NdsDsi" },
  { label: "3DS (Normal Settings)", value: "3dsNormalSettings" },
  { label: "3DS (Alt Settings)", value: "3dsAltSettings" },
];

type Gen4ConsoleSelectProps<State extends { console: Gen4Console }> = {
  stateAtom: PrimitiveAtom<State>;
};

export const Gen4ConsoleSelect = <State extends { console: Gen4Console }>({
  stateAtom,
}: Gen4ConsoleSelectProps<State>) => {
  const [state, setState] = useAtom(stateAtom);
  return (
    <RadioGroup
      name="gen4ConsoleRadio"
      optionType="button"
      value={state.console}
      onChange={({ target }) => {
        const value = Gen4ConsoleSchema.safeParse(target.value);
        if (!value.success) {
          // Shouldn't happen
          return;
        }
        setState((prev) => ({
          ...prev,
          console: value.data,
        }));
      }}
      options={options}
    />
  );
};
