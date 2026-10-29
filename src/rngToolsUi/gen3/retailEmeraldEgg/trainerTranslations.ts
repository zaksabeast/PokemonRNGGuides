import { useActiveRouteTranslations } from "~/hooks/useActiveRoute";
import { useHydrate } from "~/hooks/useHydrate";
import { LanguageKey, languageByKey } from "~/types/language";
import {
  pokeNavTrainers as enPokeNavTrainers,
  PokeNavTrainerTranslationPair,
} from "~/translations/en/pokeNav";
import { pokeNavTrainers as frPokeNavTrainers } from "~/translations/fr/pokeNav";
import { pokeNavTrainers as dePokeNavTrainers } from "~/translations/de/pokeNav";
import { pokeNavTrainers as itPokeNavTrainers } from "~/translations/it/pokeNav";
import { pokeNavTrainers as esPokeNavTrainers } from "~/translations/es/pokeNav";
import { pokeNavTrainers as jaPokeNavTrainers } from "~/translations/ja/pokeNav";
import { usePokeNavGameLanguage } from "./state";
import { EmeraldLang } from "~/rngTools";
import { emeraldLangs } from "~/rngToolsUi/gen3/ace/emeraldLang";

type GameLanguageInfo = {
  label: string;
  // Used to sort trainer names the way the game language would
  locale: LanguageKey | "ja";
  trainers: PokeNavTrainerTranslationPair;
};

// Every game language is imported directly, since lazy loading them
// would suspend the page when the game language is toggled.
const gameLanguageInfo: Record<EmeraldLang, GameLanguageInfo> = {
  English: {
    label: languageByKey.en.label,
    locale: "en",
    trainers: enPokeNavTrainers,
  },
  French: {
    label: languageByKey.fr.label,
    locale: "fr",
    trainers: frPokeNavTrainers,
  },
  Italian: {
    label: languageByKey.it.label,
    locale: "it",
    trainers: itPokeNavTrainers,
  },
  Spanish: {
    label: languageByKey.es.label,
    locale: "es",
    trainers: esPokeNavTrainers,
  },
  German: {
    label: languageByKey.de.label,
    locale: "de",
    trainers: dePokeNavTrainers,
  },
  Japanese: { label: "日本語", locale: "ja", trainers: jaPokeNavTrainers },
};

export const gameLanguageOptions = emeraldLangs.map((language) => ({
  label: gameLanguageInfo[language].label,
  value: language,
}));

// Guide languages Emerald wasn't released in (e.g. zh) fall back to English
export const getGuideGameLanguage = (language: LanguageKey): EmeraldLang =>
  emeraldLangs.find((lang) => gameLanguageInfo[lang].locale === language) ??
  "English";

export const usePokeNavTrainerTranslations = () => {
  const t = useActiveRouteTranslations();
  const [lockedState] = usePokeNavGameLanguage();
  const { client } = useHydrate(lockedState);
  const savedLanguage = client?.gameLanguage ?? "default";
  const language =
    savedLanguage === "default"
      ? getGuideGameLanguage(t.language)
      : savedLanguage;
  const { locale, trainers } = gameLanguageInfo[language];

  // "None" isn't a trainer, so it stays in the guide's language
  return {
    language,
    locale,
    translatedTrainers: {
      withTitle: { ...trainers.withTitle, None: t["None"] },
      withoutTitle: { ...trainers.withoutTitle, None: t["None"] },
    },
  };
};
