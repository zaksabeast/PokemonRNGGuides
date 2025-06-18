import { Field, FormFieldTable } from "~/components";
import { starterAtom } from "./state";
import { SelectGame } from "../shared/selectGame";
import { TestMode3dsSwitch } from "../shared/is3dsSwitch";

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
    input: <TestMode3dsSwitch stateAtom={starterAtom} />,
  },
];

export const Starter4Setup = () => {
  return <FormFieldTable fields={fields} />;
};
