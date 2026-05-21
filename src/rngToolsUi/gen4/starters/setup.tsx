import { Field, FormFieldTable, AtomSelect } from "~/components";
import { starterAtom } from "./state";
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
    input: (
      <AtomSelect
        atom={starterAtom}
        options={supportedGames}
        getValue={(state) => state.game}
        nextState={(prev, game) => ({ ...prev, game })}
      />
    ),
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
