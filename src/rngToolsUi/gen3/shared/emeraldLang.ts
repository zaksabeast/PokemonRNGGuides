import { EmeraldLang } from "~/rngTools";
import { LanguageKey, languageByKey } from "~/types/language";

export const emeraldLangs = [
  "English",
  "French",
  "Italian",
  "Spanish",
  "German",
  "Japanese",
] as const satisfies EmeraldLang[];

// Japanese isn't a guide language, but its locale still sorts Japanese text
export const emeraldLangLocales: Record<EmeraldLang, LanguageKey | "ja"> = {
  English: "en",
  French: "fr",
  Italian: "it",
  Spanish: "es",
  German: "de",
  Japanese: "ja",
};

const getEmeraldLangLabel = (lang: EmeraldLang) => {
  const locale = emeraldLangLocales[lang];
  return locale === "ja" ? "日本語" : languageByKey[locale].label;
};

export const getEmeraldLangOptions = <Lang extends EmeraldLang>(
  langs: readonly Lang[],
) => langs.map((lang) => ({ label: getEmeraldLangLabel(lang), value: lang }));
