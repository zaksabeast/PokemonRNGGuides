import { atom, useAtom } from "jotai";

const setMobileNavDrawerOpen = atom<boolean>(false);
export const useMobileNavDrawerOpen = () => useAtom(setMobileNavDrawerOpen);
