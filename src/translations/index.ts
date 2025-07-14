import React from "react";
import { LanguageKey } from "~/guides";
import { match } from "ts-pattern";
import { translations as enTranslations, Translations } from "./en";
import {
  pokeNavTrainers as enPokeNavTrainers,
  PokeNavTrainerTranslationPair,
} from "./en/pokeNav";
import { sortLocale } from "~/utils/sortLocale";

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
  return { ...enTranslations, ...translations, language } as Translations;
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

export const translateOptions = <Value>({
  sort = false,
  t,
  options,
}: {
  sort?: boolean;
  t: Translations;
  options: { label: keyof Translations; value: Value }[];
}) => {
  const opts = options.map((option) => ({
    label: t[option.label],
    value: option.value,
  }));

  if (sort) {
    return sortLocale(opts, "label", t.language);
  }

  return opts;
};

export const translateColumns = <Value>({
  t,
  columns,
}: {
  t: Translations;
  columns: { title: keyof Translations; value: Value }[];
}) => {
  return columns.map((option) => ({
    title: t[option.title],
    value: option.value,
  }));
};
