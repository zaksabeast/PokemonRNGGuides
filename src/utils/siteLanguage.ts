import React from "react";
import * as tst from "ts-toolbelt";
import { LanguageKey } from "~/guides";

export type Translations<EnglishTranslation extends Record<string, string>> =
  tst.O.Required<
    Partial<Record<LanguageKey, Record<keyof EnglishTranslation, string>>>,
    "en"
  >;

export type Translator<
  TTranslations extends Translations<Record<string, string>>,
> = (key: keyof TTranslations[keyof TTranslations]) => string;

export const createTranslator = <
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

export const useTranslator = <
  EnglishTranslation extends Record<string, string>,
  TTranslations extends Translations<EnglishTranslation>,
>(
  translations: TTranslations,
  languageKey: keyof TTranslations,
) => {
  return React.useMemo(() => {
    return (key: keyof TTranslations[keyof TTranslations]) =>
      translations[languageKey][key];
  }, [translations, languageKey]);
};
