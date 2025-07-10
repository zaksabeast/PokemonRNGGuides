import { PrimitiveAtom, useAtom } from "jotai";
import { Gen4GameVersion } from "../gen4types";
import { Select } from "~/components";
import { toOptions } from "~/utils/options";
import { startCase } from "lodash-es";
import { createTranslator, Translations } from "~/utils/siteLanguage";
import { useActiveRouteLanguage } from "~/hooks/useActiveRoute";

const englishTranslations = {
  Diamond: "Diamond",
  Pearl: "Pearl",
  Platinum: "Platinum",
  HeartGold: "HeartGold",
  SoulSilver: "SoulSilver",
} as const;

const translations = {
  en: englishTranslations,
  es: englishTranslations,
  zh: englishTranslations,
  fr: englishTranslations,
  it: {
    Diamond: "Diamante",
    Pearl: "Perla",
    Platinum: "Platino",
    HeartGold: "Oro HeartGold",
    SoulSilver: "Argento SoulSilver",
  },
} as const satisfies Translations<Record<Gen4GameVersion, string>>;

const t = createTranslator(translations);

type SelectGameProps<State extends { game: Gen4GameVersion }> = {
  games: Gen4GameVersion[] | Readonly<Gen4GameVersion[]>;
  stateAtom: PrimitiveAtom<State>;
};

export const SelectGame = <State extends { game: Gen4GameVersion }>({
  games,
  stateAtom,
}: SelectGameProps<State>) => {
  const language = useActiveRouteLanguage();
  const formatGame = (game: Gen4GameVersion) => {
    return startCase(t(game, language));
  };
  const [state, setState] = useAtom(stateAtom);
  return (
    <Select<Gen4GameVersion>
      options={toOptions(games, formatGame)}
      value={state.game}
      onChange={(game) => setState((prev) => ({ ...prev, game }))}
    />
  );
};
