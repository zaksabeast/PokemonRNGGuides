import { Field, FormFieldTable, AtomSelect } from "~/components";
import { starterAtom, starterTimer } from "./state";
import { Gen4ConsoleSelect } from "../shared/consoleSelect";
import { useActiveRouteTranslations } from "~/hooks/useActiveRoute";
import { useAtom } from "jotai";

const supportedGames = [
  "Diamond",
  "Pearl",
  "Platinum",
  "HeartGold",
  "SoulSilver",
] as const;

export const Starter4Setup = () => {
  const t = useActiveRouteTranslations();
  const [, updateTimer] = useAtom(starterTimer);
  const fields: Field[] = [
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
      input: (
        <Gen4ConsoleSelect
          stateAtom={starterAtom}
          onChange={(console) =>
            updateTimer({
              minTimeMs: console === "3dsNormalSettings" ? 55_000 : 14_000,
            })
          }
        />
      ),
    },
  ];

  return <FormFieldTable fields={fields} />;
};
