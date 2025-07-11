import React from "react";
import { Button, FormFieldTable, Flex, Field, Select } from "~/components";
import { useTranslationState } from "./state";
import { LanguageKey } from "~/guides";
import { toOptions } from "~/utils/options";
import { toUpper } from "lodash-es";
import { useCurrentStep } from "~/components/stepper/state";

const languageOptions = [
  "en",
  "es",
  "fr",
  "it",
  "zh",
] as const satisfies LanguageKey[];

export const ToolTranslationButton = () => {
  const [, setState] = useTranslationState();
  const [, setCurrentStep] = useCurrentStep();
  const [selectedLanguage, setSelectedLanguage] =
    React.useState<LanguageKey | null>(null);

  const fields: Field[] = React.useMemo(() => {
    return [
      {
        label: "Language",
        input: (
          <Select<LanguageKey>
            options={toOptions(languageOptions, toUpper)}
            onChange={setSelectedLanguage}
          />
        ),
      },
    ];
  }, []);

  return (
    <Flex vertical gap={10}>
      <FormFieldTable fields={fields} />
      <Button
        trackerId="translate"
        onClick={() => {
          setState({ type: "tools", selectedLanguage });
          setCurrentStep((prev) => prev + 1);
        }}
      >
        Translate tools
      </Button>
    </Flex>
  );
};
