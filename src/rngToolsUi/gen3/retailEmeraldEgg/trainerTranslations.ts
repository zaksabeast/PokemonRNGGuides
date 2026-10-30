import React from "react";
import { memoize } from "lodash-es";
import { useActiveRouteTranslations } from "~/hooks/useActiveRoute";
import { useHydrate } from "~/hooks/useHydrate";
import { LanguageKey } from "~/types/language";
import type { PokeNavTrainerTranslationPair } from "~/translations/en/pokeNav";
import { usePokeNavGameLanguage } from "./state";
import { EmeraldLang } from "~/rngTools";
import {
  emeraldLangLocales,
  emeraldLangs,
  getEmeraldLangOptions,
} from "~/rngToolsUi/gen3/shared/emeraldLang";

const importGameLanguageTrainers: Record<
  EmeraldLang,
  () => Promise<{ pokeNavTrainers: PokeNavTrainerTranslationPair }>
> = {
  English: () => import("~/translations/en/pokeNav"),
  French: () => import("~/translations/fr/pokeNav"),
  Italian: () => import("~/translations/it/pokeNav"),
  Spanish: () => import("~/translations/es/pokeNav"),
  German: () => import("~/translations/de/pokeNav"),
  Japanese: () => import("~/translations/ja/pokeNav"),
};

const getGameLanguageTrainers = memoize(
  async (language: EmeraldLang): Promise<PokeNavTrainerTranslationPair> => {
    const { pokeNavTrainers } = await importGameLanguageTrainers[language]();
    return pokeNavTrainers;
  },
);

export const gameLanguageOptions = getEmeraldLangOptions(emeraldLangs);

const guideGameLanguages: Record<LanguageKey, EmeraldLang> = {
  en: "English",
  fr: "French",
  it: "Italian",
  es: "Spanish",
  de: "German",
  // Emerald wasn't released in Chinese
  zh: "English",
};

export const getGuideGameLanguage = (language: LanguageKey): EmeraldLang =>
  guideGameLanguages[language];

export const usePokeNavTrainerTranslations = () => {
  const t = useActiveRouteTranslations();
  const [lockedState] = usePokeNavGameLanguage();
  const { client } = useHydrate(lockedState);
  const savedLanguage = client?.gameLanguage ?? "default";
  const selectedLanguage =
    savedLanguage === "default"
      ? getGuideGameLanguage(t.language)
      : savedLanguage;
  // Deferring keeps the current names shown while a new language loads, including after hydration
  const language = React.useDeferredValue(selectedLanguage);
  const trainers = React.use(getGameLanguageTrainers(language));

  // "None" isn't a trainer, so it stays in the guide's language
  return {
    language,
    locale: emeraldLangLocales[language],
    translatedTrainers: {
      withTitle: { ...trainers.withTitle, None: t["None"] },
      withoutTitle: { ...trainers.withoutTitle, None: t["None"] },
    },
  };
};
