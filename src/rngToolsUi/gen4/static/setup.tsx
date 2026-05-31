import { Field, FormFieldTable, AtomSelect } from "~/components";
import { static4Atom, static4TimerAtom } from "./state";
import { DpPt } from "../gen4types";
import { Gen4ConsoleSelect } from "../shared/consoleSelect";
import { useActiveRouteTranslations } from "~/hooks/useActiveRoute";
import { useAtom } from "jotai";

export const Gen4StaticSetup = () => {
  const t = useActiveRouteTranslations();
  const [, updateTimer] = useAtom(static4TimerAtom);
  const fields: Field[] = [
    {
      label: t["Game"],
      input: (
        <AtomSelect
          atom={static4Atom}
          options={DpPt}
          getValue={(state) => state.game}
          nextState={(prev, game) => ({ ...prev, game })}
        />
      ),
    },
    {
      label: t["Console"],
      input: (
        <Gen4ConsoleSelect
          stateAtom={static4Atom}
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
