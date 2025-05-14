import React from "react";
import { Flex } from "./flex";
import { Steps } from "antd";
import { atom, useAtom } from "jotai";

const initialStep = 0;

const currentStepAtom = atom(initialStep);

type StepperProps = {
  titles: string[];
  children: React.ReactNode;
};

export const Stepper = React.memo(
  ({ titles, children }: StepperProps) => {
    const [currentStep, setCurrentStep] = useAtom(currentStepAtom);

    React.useEffect(() => {
      setCurrentStep(initialStep);
    }, [setCurrentStep]);

    const items = titles.map((title) => ({ title }));

    return (
      <>
        <Steps
          type="navigation"
          size="small"
          current={currentStep}
          onChange={setCurrentStep}
          items={items}
        />
        {children}
      </>
    );
  },
  (prev, next) => {
    return (
      JSON.stringify(prev.titles) === JSON.stringify(next.titles) &&
      prev.children == next.children
    );
  },
);

type StepProps = {
  step: number;
  children: React.ReactNode;
};

export const Step = ({ step, children }: StepProps) => {
  const [currentStep] = useAtom(currentStepAtom);
  return (
    <Flex vertical display={currentStep === step ? "flex" : "none"}>
      {children}
    </Flex>
  );
};
