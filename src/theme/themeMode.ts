import { ssrLocalStorage } from "~/state/localStorage";

export type ThemeMode = "light" | "dark";

export const setTheme = (mode: ThemeMode) => {
  document.documentElement.dataset.theme = mode;
  ssrLocalStorage.setItem("theme", mode);
};
