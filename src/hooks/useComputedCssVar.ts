import React from "react";
import { useIsHydrated } from "./useHydrate";
import { type ThemeMode } from "~/theme/themeMode";

export const useThemeSwitch = (cb: (theme: ThemeMode) => void) => {
  React.useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (
          mutation.type === "attributes" &&
          mutation.attributeName === "data-theme"
        ) {
          const theme =
            document.documentElement.getAttribute("data-theme") === "light"
              ? "light"
              : "dark";
          cb(theme);
        }
      }
    });

    observer.observe(document.documentElement, { attributes: true });

    return () => {
      observer.disconnect();
    };
  }, [cb]);
};

const getComputedStyleValue = (varName: string) => {
  return getComputedStyle(document.documentElement)
    .getPropertyValue(varName)
    .trim();
};

/**
 * In almost all cases, use Emotion.
 * useComputedCssVar is only for situations where you cannot use CSS directly, such as canvas colors.
 */
export const useComputedCssVar = (varName: string) => {
  const isHydrated = useIsHydrated();
  const [value, setValue] = React.useState<string | null>(() =>
    getComputedStyleValue(varName),
  );

  useThemeSwitch(() => {
    const newValue = getComputedStyleValue(varName);
    setValue(newValue);
  });

  return isHydrated ? value : "";
};
