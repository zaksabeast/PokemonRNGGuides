import * as tst from "ts-toolbelt";
import { LanguageKey } from "~/guides";
import { en } from "./en";
import { fr } from "./fr";
import { es } from "./es";
import { zh } from "./zh";
import { it } from "./it";

type Translations<EnglishTranslation extends Record<string, string>> =
  tst.O.Required<
    Partial<Record<LanguageKey, Record<keyof EnglishTranslation, string>>>,
    "en"
  >;

const createTranslator = <
  EnglishTranslation extends Record<string, string>,
  TTranslations extends Translations<EnglishTranslation>,
>(
  translations: TTranslations,
) => {
  return (
    key: keyof TTranslations[keyof TTranslations],
    languageKey: keyof TTranslations,
  ) => translations[languageKey][key];
};

export const t = createTranslator({
  en,
  fr,
  es,
  zh,
  it,
});
