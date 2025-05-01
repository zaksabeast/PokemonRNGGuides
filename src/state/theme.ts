import { atom, useAtom } from "jotai";
import { themePalette, ThemePalette } from "~/theme";

const setThemeMode = atom<ThemePalette>(themePalette.light);
export const useThemeMode = () => useAtom(setThemeMode);
