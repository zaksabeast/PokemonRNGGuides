import React from "react";
import { atom, useAtom } from "jotai";

export const useFieldIds = () => {
  const id = React.useId();
  return {
    inputId: `${id}-input`,
    labelId: `${id}-label`,
    helperId: `${id}-helper`,
  };
};

export type FieldIds = ReturnType<typeof useFieldIds>;

// Only one info tooltip can be open on the page at a time
const openInfoTooltipIdAtom = atom<string | null>(null);

export const useInfoTooltip = () => {
  const id = React.useId();
  const [openId, setOpenId] = useAtom(openInfoTooltipIdAtom);
  const open = openId === id;

  return {
    cardId: `${id}-tooltip`,
    open,
    toggle: () => setOpenId(open ? null : id),
    close: () => setOpenId(null),
  };
};
