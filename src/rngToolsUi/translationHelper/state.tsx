import { atom, useAtom } from "jotai";
import { LanguageKey } from "~/guides";
import { Route } from "~/routes/defs";

export type TranslationState =
  | {
      type: "guide";
      selectedGuide: Route | null;
      selectedLanguage: LanguageKey;
    }
  | {
      type: "tools";
      selectedGuide?: null;
      selectedLanguage: LanguageKey;
    };

const initialState: TranslationState = {
  type: "guide",
  selectedGuide: null,
  selectedLanguage: "en",
};

export const translationState = atom<TranslationState>(initialState);

export const useTranslationState = () => useAtom(translationState);
