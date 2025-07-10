import { Field, FormFieldTable } from "~/components";
import { starterAtom } from "./state";
import { SelectGame } from "../shared/selectGame";
import { Gen4ConsoleSelect } from "../shared/consoleSelect";
import { t } from "~/translations";
import { LanguageKey } from "~/guides";
import { useActiveRouteLanguage } from "~/hooks/useActiveRoute";

const supportedGames = [
  "Diamond",
  "Pearl",
  "Platinum",
  "HeartGold",
  "SoulSilver",
] as const;

const getFields = (language: LanguageKey = "en"): Field[] => [
  {
    label: t("Game", language),
    input: <SelectGame stateAtom={starterAtom} games={supportedGames} />,
  },
  {
    label: t("Console", language),
    input: <Gen4ConsoleSelect stateAtom={starterAtom} />,
  },
];

export const Starter4Setup = () => {
  const language = useActiveRouteLanguage();
  const fields = getFields(language);
  return <FormFieldTable fields={fields} />;
};
