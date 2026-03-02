import { LanguageKey } from "~/guides";
import { keyBy } from "lodash-es";

type LanguageItem = {
  key: LanguageKey;
  label: string;
  type: "item";
};

export const languages: LanguageItem[] = [
  {
    key: "en",
    label: "English",
    type: "item",
  },
  {
    key: "es",
    label: "Español",
    type: "item",
  },
  {
    key: "zh",
    label: "简体中文",
    type: "item",
  },
  {
    key: "fr",
    label: "Français",
    type: "item",
  },
  {
    key: "it",
    label: "Italiano",
    type: "item",
  },
  {
    key: "de",
    label: "Deutsch",
    type: "item",
  },
];

export const languageByKey = keyBy(languages, (lang) => lang.key);
