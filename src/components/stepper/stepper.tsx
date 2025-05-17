import React from "react";
import { Steps } from "antd";
import { Flex } from "~/components";
import { useCurrentStep } from "./state";

type StepperProps = {
  titles: string[];
  children: React.ReactNode;
};

export const Stepper = React.memo(
  ({ titles, children }: StepperProps) => {
    const [currentStep, setCurrentStep] = useCurrentStep();

    React.useEffect(() => {
      setCurrentStep(0);
    }, [setCurrentStep]);

    const items = titles.map((title) => ({ title }));
    return (
      <Flex vertical gap={40}>
        <Steps
          onChange={setCurrentStep}
          current={currentStep}
          size="small"
          items={items}
        />
        {children}
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
    <Flex vertical display={step === currentStep ? "flex" : "none"} gap={24}>
      {children}
    </Flex>
  );
};
