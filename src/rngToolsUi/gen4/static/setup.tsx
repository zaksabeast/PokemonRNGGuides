import { Field, FormFieldTable, AtomSelect } from "~/components";
import { static4Atom } from "./state";
import { type Gen4GameVersion } from "../gen4types";
import { Gen4ConsoleSelect } from "../shared/consoleSelect";
import { Translations } from "~/translations";
import { useActiveRouteTranslations } from "~/hooks/useActiveRoute";

// Use Gen4GameVersions once we add hgss support
const SupportedVersions: Gen4GameVersion[] = ["Diamond", "Pearl", "Platinum"];

const getFields = (t: Translations): Field[] => [
  {
    label: t["Game"],
    input: (
      <AtomSelect
        atom={static4Atom}
        options={SupportedVersions}
        getValue={(state) => state.game}
        nextState={(prev, game) => ({ ...prev, game })}
      />
    ),
  },
  {
    label: t["Console"],
    input: <Gen4ConsoleSelect stateAtom={static4Atom} />,
  },
];

export const Gen4StaticSetup = () => {
  const t = useActiveRouteTranslations();
  const fields = getFields(t);
  return <FormFieldTable fields={fields} />;
};
