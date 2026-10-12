import { useAtom } from "jotai";
import { match } from "ts-pattern";
import { Link } from "~/components";
import {
  FormCard,
  FormSection,
  RadioField,
  SelectField,
} from "~/components/form";
import { useActiveRouteTranslations } from "~/hooks/useActiveRoute";
import { DpPt, Gen4GameVersions, Gen4GameVersion } from "~/types/games";
import { toOptions } from "~/utils/options";
import { Gen4Console } from "../gen4types";
import { gen4StateAtom } from "./state";

type Props = {
  onlyDppt?: boolean;
};

export const Gen4ConfigSetup = ({ onlyDppt }: Props) => {
  const t = useActiveRouteTranslations();
  const [state, updateState] = useAtom(gen4StateAtom);
  const gameOptions = onlyDppt ? DpPt : Gen4GameVersions;

  const consoleOptions: { label: string; value: Gen4Console }[] = [
    { label: t["NDS/DSi"], value: "NdsDsi" },
    { label: t["3DS (Normal Settings)"], value: "3dsNormalSettings" },
    { label: t["3DS (Alt Settings)"], value: "3dsAltSettings" },
  ];

  const consoleHelp = match(state.config.console)
    .with("3dsNormalSettings", () => (
      <Link href="/3ds-helper/">
        {t["Learn how to use the 3DS Helper here"]}
      </Link>
    ))
    .with("3dsAltSettings", () => (
      <Link href="/3ds-alt-settings/">
        {t["Download the 3DS Alt Settings app here"]}
      </Link>
    ))
    .with("NdsDsi", () => undefined)
    .exhaustive();

  return (
    <FormCard>
      <FormSection>
        <SelectField<Gen4GameVersion>
          label={t["Game"]}
          value={state.config.game}
          options={toOptions(gameOptions, (game) => t[game])}
          onChange={(game) => updateState({ config: { game } })}
        />
        <RadioField<Gen4Console>
          label={t["Console"]}
          cellSize="word"
          value={state.config.console}
          options={consoleOptions}
          onChange={(gameConsole) =>
            updateState({ config: { console: gameConsole } })
          }
          helperText={consoleHelp}
        />
      </FormSection>
    </FormCard>
  );
};
