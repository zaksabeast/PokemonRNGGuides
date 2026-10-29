import { match } from "ts-pattern";
import { useActiveRouteTranslations } from "~/hooks/useActiveRoute";
import { useHydrate } from "~/hooks/useHydrate";
import { LanguageKey } from "~/types/language";
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
import { PokeNavGameLanguageKey } from "./constants";

// Every game language is imported directly, since lazy loading them
// would suspend the page when the game language is toggled.
const trainersByLanguage: Record<
  PokeNavGameLanguageKey,
  PokeNavTrainerTranslationPair
> = {
  en: enPokeNavTrainers,
  fr: frPokeNavTrainers,
  de: dePokeNavTrainers,
  it: itPokeNavTrainers,
  es: esPokeNavTrainers,
  ja: jaPokeNavTrainers,
};

const getGuideGameLanguage = (language: LanguageKey): PokeNavGameLanguageKey =>
  match(language)
    .with("en", "fr", "de", "it", "es", (language) => language)
    .with("zh", () => "en" as const)
    .exhaustive();

export const usePokeNavTrainerTranslations = () => {
  const t = useActiveRouteTranslations();
  const [lockedState] = usePokeNavGameLanguage();
  const { client } = useHydrate(lockedState);
  const savedLanguage = client?.gameLanguage ?? "default";
  const language =
    savedLanguage === "default"
      ? getGuideGameLanguage(t.language)
      : savedLanguage;
  const { withTitle, withoutTitle } = trainersByLanguage[language];

  // "None" isn't a trainer, so it stays in the guide's language
  return {
    language,
    translatedTrainers: {
      withTitle: { ...withTitle, None: t["None"] },
      withoutTitle: { ...withoutTitle, None: t["None"] },
    },
  };
};
