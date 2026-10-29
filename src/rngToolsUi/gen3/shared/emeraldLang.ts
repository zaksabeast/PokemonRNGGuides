import { EmeraldLang } from "~/rngTools";
import { languageByKey } from "~/types/language";

export const emeraldLangs = [
  "English",
  "French",
  "Italian",
  "Spanish",
  "German",
  "Japanese",
] as const satisfies EmeraldLang[];

export const emeraldLangLabels: Record<EmeraldLang, string> = {
  English: languageByKey.en.label,
  French: languageByKey.fr.label,
  Italian: languageByKey.it.label,
  Spanish: languageByKey.es.label,
  German: languageByKey.de.label,
  Japanese: "日本語",
};

export const getEmeraldLangOptions = <Lang extends EmeraldLang>(
  langs: readonly Lang[],
) => langs.map((lang) => ({ label: emeraldLangLabels[lang], value: lang }));
