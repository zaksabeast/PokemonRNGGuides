import React from "react";
import { atom, useAtom } from "jotai";

type SurveyModalState = {
  isOpen: boolean;
};

const initialState: SurveyModalState = {
  isOpen: false,
};

const surveyModalAtom = atom<SurveyModalState>(initialState);

export const useSurveyModal = () => {
  const [state, setState] = useAtom(surveyModalAtom);

  const openModal = React.useCallback(() => {
    setState({ isOpen: true });
  }, [setState]);

  const closeModal = React.useCallback(() => {
    setState(initialState);
  }, [setState]);

  return {
    isOpen: state.isOpen,
    openModal,
    closeModal,
  };
};
