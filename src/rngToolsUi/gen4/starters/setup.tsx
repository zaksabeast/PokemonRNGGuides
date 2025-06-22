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
    label: "3ds mode (Preview)",
    tooltip:
      "This feature is highly experimental! Please share your results in the Discord server!",
    input: <Is3dsSwitch stateAtom={starterAtom} />,
  },
];

export const Starter4Setup = () => {
  return <FormFieldTable fields={fields} />;
};
