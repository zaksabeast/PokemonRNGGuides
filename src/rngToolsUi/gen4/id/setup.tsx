import { Field, FormFieldTable } from "~/components";
import { id4Atom } from "./state";
import { Gen4GameVersions } from "../gen4types";
import { SelectGame } from "../shared/selectGame";
import { Is3dsSwitch } from "../shared/is3dsSwitch";

const fields: Field[] = [
  {
    label: "Game",
    input: <SelectGame stateAtom={id4Atom} games={Gen4GameVersions} />,
  },
  {
    label: "Using 3ds? (Coming soon)",
    input: <Is3dsSwitch stateAtom={id4Atom} disabled />,
  },
];

export const Gen4IdSetup = () => {
  return <FormFieldTable fields={fields} />;
};
