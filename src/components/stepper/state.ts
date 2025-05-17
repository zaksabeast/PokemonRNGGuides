import { atom, useAtom } from "jotai";

const currentStepAtom = atom(0);

export const useCurrentStep = () => useAtom(currentStepAtom);
