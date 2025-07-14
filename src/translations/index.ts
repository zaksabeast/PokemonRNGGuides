import React from "react";
import { LanguageKey } from "~/guides";
import { match } from "ts-pattern";
import { translations as enTranslations, Translations } from "./en";
import {
  pokeNavTrainers as enPokeNavTrainers,
  PokeNavTrainerTranslationPair,
} from "./en/pokeNav";

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
    .with("de", () => import("./de"))
    .exhaustive();
  return { ...enTranslations, ...translations };
};

const getPokeNavTranslations = async (
  language: LanguageKey,
): Promise<PokeNavTrainerTranslationPair> => {
  const { pokeNavTrainers } = await match(language)
    .with("en", () => ({ pokeNavTrainers: enPokeNavTrainers }))
    .with("fr", () => ({ pokeNavTrainers: enPokeNavTrainers }))
    .with("es", () => ({ pokeNavTrainers: enPokeNavTrainers }))
    .with("zh", () => ({ pokeNavTrainers: enPokeNavTrainers }))
    .with("it", () => ({ pokeNavTrainers: enPokeNavTrainers }))
    .with("de", () => import("./de/pokeNav"))
    .exhaustive();
  return pokeNavTrainers;
};

export const usePokeNavTranslations = (language: LanguageKey) => {
  const translation = React.useMemo(
    () => getPokeNavTranslations(language),
    [language],
  );
  return React.use(translation);
};

export const useTranslations = (language: LanguageKey) => {
  const translation = React.useMemo(
    () => getTranslations(language),
    [language],
  );
  return React.use(translation);
};
