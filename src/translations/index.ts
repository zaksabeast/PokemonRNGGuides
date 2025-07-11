import React from "react";
import { LanguageKey } from "~/guides";
import { match } from "ts-pattern";

export type { Translations } from "./en";

const getTranslations = async (language: LanguageKey) => {
  const { translations } = await match(language)
    .with("en", () => import("./en"))
    .with("fr", () => import("./fr"))
    .with("es", () => import("./es"))
    .with("zh", () => import("./zh"))
    .with("it", () => import("./it"))
    .exhaustive();
  return translations;
};

export const useTranslations = (language: LanguageKey) => {
  const translation = React.useMemo(
    () => getTranslations(language),
    [language],
  );
  return React.use(translation);
};
