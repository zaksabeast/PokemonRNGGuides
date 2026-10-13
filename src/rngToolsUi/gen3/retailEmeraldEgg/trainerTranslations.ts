import { useActiveRouteTranslations } from "~/hooks/useActiveRoute";
import { useHydrate } from "~/hooks/useHydrate";
import { usePokeNavTranslations } from "~/translations";
import { pokeNavTrainers as jaPokeNavTrainers } from "~/translations/ja/pokeNav";
import { LanguageKey } from "~/types/language";
import { usePokeNavGameLanguage } from "./state";

export type PokeNavLanguage = LanguageKey | "ja";

export const usePokeNavTrainerTranslations = () => {
  const t = useActiveRouteTranslations();
  const [lockedState] = usePokeNavGameLanguage();
  const { client } = useHydrate(lockedState);
  const guideTrainers = usePokeNavTranslations(t.language);
  const isJapanese = client?.gameLanguage === "ja";
  const language: PokeNavLanguage = isJapanese ? "ja" : t.language;

  // Japanese names are imported directly, since lazy loading them
  // would suspend the page when the game language is toggled.
  return {
    language,
    translatedTrainers: isJapanese ? jaPokeNavTrainers : guideTrainers,
  };
};
