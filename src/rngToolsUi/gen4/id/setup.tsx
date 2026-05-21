import { Field, FormFieldTable, AtomSelect } from "~/components";
import { id4Atom } from "./state";
import { Gen4GameVersions } from "../gen4types";
import { Gen4ConsoleSelect } from "../shared/consoleSelect";

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
    input: <Gen4ConsoleSelect stateAtom={id4Atom} />,
  },
];

export const Gen4IdSetup = () => {
  return <FormFieldTable fields={fields} />;
};
