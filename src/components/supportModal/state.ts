import React from "react";
import { atom, useAtom } from "jotai";

const supportModalAtom = atom({
  isOpen: false,
});

export const useSupportModal = () => {
  const [state, setState] = useAtom(supportModalAtom);

  const openSupportModal = React.useCallback(() => {
    setState({ isOpen: true });
  }, [setState]);

  const closeSupportModal = React.useCallback(() => {
    setState({ isOpen: false });
  }, [setState]);

  return {
    isOpen: state.isOpen,
    openSupportModal,
    closeSupportModal,
  };
};
