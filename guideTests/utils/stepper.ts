import { expect } from "vitest";
import { getStepperButton, isShown, waitFor } from "./dom";

export const createGoToStep = (
  container: HTMLElement,
  steps: HTMLElement[],
): ((targetStepIndex: number) => Promise<void>) => {
  const shownStepIndex = () => steps.findIndex(isShown);

  const waitForShownStepIndex = () => {
    return waitFor(() => {
      const stepIndex = shownStepIndex();
      expect(stepIndex).not.toBe(-1);

      return stepIndex;
    });
  };

  const moveTowardStep = async (
    fromStepIndex: number,
    targetStepIndex: number,
  ) => {
    const direction = fromStepIndex < targetStepIndex ? "next" : "previous";
    getStepperButton(container, direction).click();
    await waitFor(() => expect(shownStepIndex()).not.toBe(fromStepIndex));
  };

  return async (targetStepIndex: number) => {
    let fromStepIndex = await waitForShownStepIndex();

    while (fromStepIndex !== targetStepIndex) {
      await moveTowardStep(fromStepIndex, targetStepIndex);
      fromStepIndex = await waitForShownStepIndex();
    }
  };
};
