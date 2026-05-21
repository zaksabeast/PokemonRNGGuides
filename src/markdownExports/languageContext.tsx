import React from "react";
import { LanguageKey } from "~/types/language";

export const PageLanguageContext = React.createContext<LanguageKey>("en");

export const usePageLanguage = () => React.useContext(PageLanguageContext);
