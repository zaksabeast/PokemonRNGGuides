import { Select } from "~/components";
import { useTranslationState } from "./state";
import { LanguageKey } from "~/guides";
import { toOptions } from "~/utils/options";
import { toUpper } from "lodash-es";

const languageOptions = [
  "de",
  "en",
  "es",
  "fr",
  "it",
  "zh",
] as const satisfies LanguageKey[];

export const TranslationHelperSelectLanguage = () => {
  const [state, setState] = useTranslationState();

  return (
    <Select<LanguageKey>
      value={state.selectedLanguage}
      options={toOptions(languageOptions, toUpper)}
      onChange={(language) =>
        setState((prev) => ({ ...prev, selectedLanguage: language }))
      }
    />
  );
};
