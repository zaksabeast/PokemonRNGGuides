import React from "react";
import { Steps } from "antd";
import { Flex, Button } from "~/components";
import { useCurrentStep } from "./state";

type StepperProps = {
  titles: string[];
  children: React.ReactNode;
};

export const Stepper = React.memo(
  ({ titles, children }: StepperProps) => {
    const [currentStep, setCurrentStep] = useCurrentStep();
    const hasRendered = React.useRef(false);
    const scrollRef = React.useRef<HTMLDivElement | null>(null);

    const previousStep = React.useCallback(
      () => setCurrentStep((prev) => prev - 1),
      [setCurrentStep],
    );
    const nextStep = React.useCallback(
      () => setCurrentStep((prev) => prev + 1),
      [setCurrentStep],
    );

    const scrollToDiv = React.useCallback(() => {
      scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }, []);

    React.useEffect(() => {
      // Don't scroll on initial render since there might be content
      // above the stepper that we don't want to scroll past.
      if (hasRendered.current) {
        scrollToDiv();
      }
    }, [currentStep, scrollToDiv]);

    React.useEffect(() => {
      hasRendered.current = true;
    }, []);

    React.useEffect(() => {
      setCurrentStep(0);
    }, [setCurrentStep]);

    const items = titles.map((title) => ({ title }));
    return (
      <Flex vertical gap={40}>
        <div ref={scrollRef} />
        <Steps
          onChange={setCurrentStep}
          current={currentStep}
          size="small"
          items={items}
        />
        {children}
        <Flex justify="space-between" align="center">
          <Button
            trackerId="stepper-previous-button"
            disabled={currentStep === 0}
            onClick={previousStep}
          >
            Previous
          </Button>
          <Button
            trackerId="stepper-next-button"
            disabled={currentStep === titles.length - 1}
            onClick={nextStep}
          >
            Next
          </Button>
        </Flex>
      </Flex>
    );
  },
  (prev, next) => {
    return (
      JSON.stringify(prev.titles) === JSON.stringify(next.titles) &&
      prev.children === next.children
    );
  },
);

type StepProps = {
  step: number;
  children: React.ReactNode;
};

export const Step = ({ step, children }: StepProps) => {
  const [currentStep] = useCurrentStep();
  return (
    <Flex
      vertical
      id={`step-${step}`}
      display={step === currentStep ? "flex" : "none"}
      gap={24}
    >
      {children}
    </Flex>
  );
};
