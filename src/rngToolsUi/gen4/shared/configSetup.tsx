import { useAtomValue, useSetAtom } from "jotai";
import { match } from "ts-pattern";
import { Link } from "~/components";
import {
  FormCard,
  FormSection,
  RadioField,
  SelectField,
} from "~/components/form";
import { useActiveRouteTranslations } from "~/hooks/useActiveRoute";
import { Gen4GameVersion } from "~/types/games";
import { toOptions } from "~/utils/options";
import { Gen4Console } from "../gen4types";
import {
  gen4GuideGamesAtom,
  gen4SetupAtom,
  setGen4ConsoleAtom,
  setGen4GameAtom,
  setHgssAdvanceMethodAtom,
  type Gen4AdvanceMethod,
} from "./state/setup";

export const Gen4ConfigSetup = () => {
  const t = useActiveRouteTranslations();
  const setup = useAtomValue(gen4SetupAtom);
  const guideGames = useAtomValue(gen4GuideGamesAtom);
  const setGame = useSetAtom(setGen4GameAtom);
  const setConsole = useSetAtom(setGen4ConsoleAtom);
  const setAdvanceMethod = useSetAtom(setHgssAdvanceMethodAtom);

  const consoleOptions: { label: string; value: Gen4Console }[] = [
    { label: t["NDS/DSi"], value: "NdsDsi" },
    { label: t["3DS (Normal Settings)"], value: "3dsNormalSettings" },
    { label: t["3DS (Alt Settings)"], value: "3dsAltSettings" },
  ];

  const advanceMethodOptions: { label: string; value: Gen4AdvanceMethod }[] = [
    { label: t["Pokégear Calls"], value: "pokegearCall" },
    { label: t["Chatot"], value: "chatot" },
  ];

  const consoleHelp = match(setup.console)
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
          value={setup.game}
          options={toOptions(guideGames, (game) => t[game])}
          onChange={setGame}
        />
        <RadioField<Gen4Console>
          label={t["Console"]}
          cellSize="word"
          value={setup.console}
          options={consoleOptions}
          onChange={setConsole}
          helperText={consoleHelp}
        />
        {setup.group === "hgss" && (
          <RadioField<Gen4AdvanceMethod>
            label={t["Advance Method"]}
            cellSize="word"
            value={setup.advanceMethod}
            options={advanceMethodOptions}
            onChange={setAdvanceMethod}
          />
        )}
      </FormSection>
    </FormCard>
  );
};
