import { Button, Flex } from "~/components";
import { useTranslationState } from "./state";
import { useCurrentStep } from "~/components/stepper/state";

export const ToolTranslationButton = () => {
  const [, setState] = useTranslationState();
  const [, setCurrentStep] = useCurrentStep();

  return (
    <Flex vertical gap={10}>
      <Button
        trackerId="translate"
        onClick={() => {
          setState((prev) => ({ ...prev, type: "tools", selectedGuide: null }));
          setCurrentStep((prev) => prev + 1);
        }}
      >
        Translate tools
      </Button>
    </Flex>
  );
};
