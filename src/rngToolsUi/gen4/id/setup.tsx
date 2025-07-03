import { Field, FormFieldTable } from "~/components";
import { id4Atom } from "./state";
import { Gen4GameVersions } from "../gen4types";
import { SelectGame } from "../shared/selectGame";
import { Gen4ConsoleSelect } from "../shared/is3dsSwitch";

const fields: Field[] = [
  {
    label: "Game",
    input: <SelectGame stateAtom={id4Atom} games={Gen4GameVersions} />,
  },
  {
    label: "Console",
    input: <Gen4ConsoleSelect stateAtom={id4Atom} />,
  },
];

export const Gen4IdSetup = () => {
  return <FormFieldTable fields={fields} />;
};
