import { atom, useAtom } from "jotai";
import { ThemeMode } from "~/theme";

const setThemeMode = atom<ThemeMode>("light");
export const useThemeMode = () => useAtom(setThemeMode);
