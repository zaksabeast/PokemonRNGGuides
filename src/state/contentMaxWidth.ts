import { atom, useAtom } from "jotai";

const maxWidthEnabled = atom(true);

export const useMaxWidthEnabled = () => useAtom(maxWidthEnabled);
