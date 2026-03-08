import { Field, FormFieldTable } from "~/components";
import { static4Atom } from "./state";
import { type Gen4GameVersion } from "../gen4types";
import { SelectGame } from "../shared/selectGame";
import { Gen4ConsoleSelect } from "../shared/consoleSelect";

// Use Gen4GameVersions once we add hgss support
const SupportedVersions: Gen4GameVersion[] = ["Diamond", "Pearl", "Platinum"];

const fields: Field[] = [
  {
    label: "Game",
    input: <SelectGame stateAtom={static4Atom} games={SupportedVersions} />,
  },
  {
    label: "Console",
    input: <Gen4ConsoleSelect stateAtom={static4Atom} />,
  },
];

export const Gen4StaticSetup = () => {
  return <FormFieldTable fields={fields} />;
};
