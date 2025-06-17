import { Field, FormFieldTable } from "~/components";
import { starterAtom } from "./state";
import { SelectGame } from "../shared/selectGame";
import { Is3dsSwitch } from "../shared/is3dsSwitch";

const supportedGames = [
  "Diamond",
  "Pearl",
  "Platinum",
  "HeartGold",
  "SoulSilver",
] as const;

const fields: Field[] = [
  {
    label: "Game",
    input: <SelectGame stateAtom={starterAtom} games={supportedGames} />,
  },
  {
    label: "Using 3ds? (Coming soon)",
    input: <Is3dsSwitch stateAtom={starterAtom} disabled />,
  },
];

export const Starter4Setup = () => {
  return <FormFieldTable fields={fields} />;
};
