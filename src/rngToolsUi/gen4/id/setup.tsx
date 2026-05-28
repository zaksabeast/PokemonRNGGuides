import { Field, FormFieldTable, AtomSelect } from "~/components";
import { id4Atom, idTimerAtom } from "./state";
import { Gen4GameVersions } from "../gen4types";
import { Gen4ConsoleSelect } from "../shared/consoleSelect";
import { useAtom } from "jotai";

export const Gen4IdSetup = () => {
  const [, updateTimer] = useAtom(idTimerAtom);
  const fields: Field[] = [
    {
      label: "Game",
      input: (
        <AtomSelect
          atom={id4Atom}
          options={Gen4GameVersions}
          getValue={(state) => state.game}
          nextState={(prev, game) => ({ ...prev, game })}
        />
      ),
    },
    {
      label: "Console",
      input: (
        <Gen4ConsoleSelect
          stateAtom={id4Atom}
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
