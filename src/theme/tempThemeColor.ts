import React from "react";
import { atom } from "jotai";
import { ThemeMode } from "./themeMode";
import { ssrLocalStorage } from "~/state/localStorage";
import { useThemeSwitch } from "~/hooks/useComputedCssVar";

export const tempThemeColorAtom = atom<string | null>(null);

export const useThemeMode = () => {
  const [themeMode, setThemeMode] = React.useState<ThemeMode>(
    ssrLocalStorage.getItem("theme") === "dark" ? "dark" : "light",
  );

  useThemeSwitch(setThemeMode);

  return themeMode;
};
