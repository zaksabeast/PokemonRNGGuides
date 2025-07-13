import { Field, FormFieldTable } from "~/components";
import { starterAtom } from "./state";
import { SelectGame } from "../shared/selectGame";
import { Gen4ConsoleSelect } from "../shared/consoleSelect";
import { Translations } from "~/translations";
import { useActiveRouteTranslations } from "~/hooks/useActiveRoute";

const supportedGames = [
  "Diamond",
  "Pearl",
  "Platinum",
  "HeartGold",
  "SoulSilver",
] as const;

const getFields = (t: Translations): Field[] => [
  {
    label: t["Game"],
    input: <SelectGame stateAtom={starterAtom} games={supportedGames} />,
  },
  {
    label: t["Console"],
    input: <Gen4ConsoleSelect stateAtom={starterAtom} />,
  },
];

export const Starter4Setup = () => {
  const t = useActiveRouteTranslations();
  const fields = getFields(t);
  return <FormFieldTable fields={fields} />;
};
