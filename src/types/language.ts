import { keyBy } from "lodash-es";
import { z } from "zod";

export const LanguageSchema = z.enum(["en", "es", "zh", "fr", "it", "de"]);

export type LanguageKey = z.infer<typeof LanguageSchema>;

type LanguageItem = {
  key: LanguageKey;
  label: string;
  shortLabel: string;
  type: "item";
};

export const languages: LanguageItem[] = [
  {
    key: "en",
    label: "English",
    shortLabel: "EN",
    type: "item",
  },
  {
    key: "es",
    label: "Español",
    shortLabel: "ES",
    type: "item",
  },
  {
    key: "zh",
    label: "简体中文",
    shortLabel: "简中",
    type: "item",
  },
  {
    key: "fr",
    label: "Français",
    shortLabel: "FR",
    type: "item",
  },
  {
    key: "it",
    label: "Italiano",
    shortLabel: "IT",
    type: "item",
  },
  {
    key: "de",
    label: "Deutsch",
    shortLabel: "DE",
    type: "item",
  },
];

export const languageByKey = keyBy(languages, (lang) => lang.key);
