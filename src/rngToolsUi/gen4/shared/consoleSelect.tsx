import { PrimitiveAtom, useAtom } from "jotai";
import { RadioGroup } from "~/components";
import { z } from "zod";

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
