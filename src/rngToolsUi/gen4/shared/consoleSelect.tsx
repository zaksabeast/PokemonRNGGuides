import { PrimitiveAtom, useAtom } from "jotai";
import { RadioGroup } from "~/components";
import { z } from "zod";
import { Translations } from "~/translations";
import { useActiveRouteTranslations } from "~/hooks/useActiveRoute";

const Gen4ConsoleSchema = z.enum([
  "NdsDsi",
  "3dsNormalSettings",
  "3dsAltSettings",
]);

export type Gen4Console = z.infer<typeof Gen4ConsoleSchema>;

const getOptions = (t: Translations) => [
  { label: t["NDS/DSi"], value: "NdsDsi" as const },
  {
    label: t["3DS (Normal Settings)"],
    value: "3dsNormalSettings" as const,
  },
  {
    label: t["3DS (Alt Settings)"],
    value: "3dsAltSettings" as const,
  },
];

type Gen4ConsoleSelectProps<State extends { console: Gen4Console }> = {
  stateAtom: PrimitiveAtom<State>;
};

export const Gen4ConsoleSelect = <State extends { console: Gen4Console }>({
  stateAtom,
}: Gen4ConsoleSelectProps<State>) => {
  const t = useActiveRouteTranslations();
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
      options={getOptions(t)}
    />
  );
};
