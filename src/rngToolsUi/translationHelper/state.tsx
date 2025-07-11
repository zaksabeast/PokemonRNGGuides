import { atom, useAtom } from "jotai";
import { LanguageKey } from "~/guides";
import { Route } from "~/routes/defs";

export type TranslationState =
  | {
      type: "guide";
      selectedGuide: Route | null;
      selectedLanguage?: undefined;
    }
  | {
      type: "tools";
      selectedGuide?: undefined;
      selectedLanguage: LanguageKey | null;
    };

const initialState: TranslationState = {
  type: "guide",
  selectedGuide: null,
};

export const translationState = atom<TranslationState>(initialState);

export const useTranslationState = () => useAtom(translationState);
