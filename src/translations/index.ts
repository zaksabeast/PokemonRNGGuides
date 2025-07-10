import { LanguageKey } from "~/guides";
import { en } from "./en";
import { fr } from "./fr";
import { es } from "./es";
import { zh } from "./zh";
import { it } from "./it";

export type { Translations } from "./en";

const translations = {
  en,
  fr,
  es,
  zh,
  it,
};

export const getTranslations = (language: LanguageKey) =>
  translations[language];
