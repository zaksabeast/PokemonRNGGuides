import { PrimitiveAtom, useAtom } from "jotai";
import { RadioGroup } from "~/components";
import { z } from "zod";
import { t } from "~/translations";
import { LanguageKey } from "~/guides";
import { useActiveRouteLanguage } from "~/hooks/useActiveRoute";

const Gen4ConsoleSchema = z.enum([
  "NdsDsi",
  "3dsNormalSettings",
  "3dsAltSettings",
]);

export type Gen4Console = z.infer<typeof Gen4ConsoleSchema>;

const getOptions = (language: LanguageKey = "en") => [
  { label: t("NDS/DSi", language), value: "NdsDsi" as const },
  {
    label: t("3DS (Normal Settings)", language),
    value: "3dsNormalSettings" as const,
  },
  {
    label: t("3DS (Alt Settings)", language),
    value: "3dsAltSettings" as const,
  },
];

type Gen4ConsoleSelectProps<State extends { console: Gen4Console }> = {
  stateAtom: PrimitiveAtom<State>;
};

export const Gen4ConsoleSelect = <State extends { console: Gen4Console }>({
  stateAtom,
}: Gen4ConsoleSelectProps<State>) => {
  const language = useActiveRouteLanguage();
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
      options={getOptions(language)}
    />
  );
};
