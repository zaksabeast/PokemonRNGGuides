import React from "react";
import { LanguageKey } from "~/guides";
import { match } from "ts-pattern";
import { translations as enTranslations, Translations } from "./en";

export type { Translations } from "./en";

const getTranslations = async (
  language: LanguageKey,
): Promise<Translations> => {
  const { translations } = await match(language)
    .with("en", () => ({ translations: null }))
    .with("fr", () => import("./fr"))
    .with("es", () => import("./es"))
    .with("zh", () => import("./zh"))
    .with("it", () => import("./it"))
    .exhaustive();
  return { ...enTranslations, ...translations };
};

export const useTranslations = (language: LanguageKey) => {
  const translation = React.useMemo(
    () => getTranslations(language),
    [language],
  );
  return React.use(translation);
};
