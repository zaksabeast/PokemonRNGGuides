import {
  // This is the only file where using the antd theme is okay
  // eslint-disable-next-line no-restricted-imports
  theme as themeTools,
} from "antd";
import { ScreenSize, CustomTheme } from "@emotion/react";
import { match } from "ts-pattern";
import { settings } from "~/settings";

const screenSizeMap = {
  // Ant Design breakpoints
  // sm: 576,
  // md: 768,
  // lg: 992,
  // xl: 1200,
  mobile: 768,
  tablet: 992,
  desktop: 1200,
};

export type ThemeMode = "dark" | "light";

const getCustomTheme = (mode: ThemeMode): CustomTheme => {
  const algorithm =
    mode === "dark" ? themeTools.darkAlgorithm : themeTools.defaultAlgorithm;

  const colorLink = mode === "dark" ? "#d676ff" : "#7e3ff2";

  const tokens = themeTools.getDesignToken({
    algorithm,
    token: {
      colorLink,
      colorPrimary: "#7e3ff2",
    },
  });

  const secondaryTokens = themeTools.getDesignToken({
    algorithm,
    token: {
      colorPrimary: mode === "dark" ? "#c41d7f" : tokens.magenta6,
    },
  });

  return {
    token: {
      ...tokens,
      colorBgBase: mode === "dark" ? "#121212" : "#fff",
      colorLink,
      colorBrandSecondary: secondaryTokens.colorPrimary,
      colorBrandSecondaryHover: secondaryTokens.colorPrimaryHover,
      colorBrandSecondaryBg: secondaryTokens.colorPrimaryBg,
      colorBrandSecondaryBorder: secondaryTokens.colorPrimaryBorder,
    },
    components: {
      Menu:
        mode === "light"
          ? {}
          : {
              itemSelectedBg: "#121212",
              itemSelectedColor: "#d676ff",
              subMenuItemSelectedColor: "#d676ff",
            },
      Drawer:
        mode === "light"
          ? {}
          : {
              colorBgElevated: "#121212",
            },
      Layout: {
        headerHeight: "64px",
        headerBg:
          mode === "dark"
            ? "rgba(255, 255, 255, 0.1)"
            : "rgba(255, 255, 255, 0.6)",
      },
    },
    mediaQueries: {
      up: (size: ScreenSize) => {
        return match(size)
          .with("mobile", () => `@media (min-width: ${screenSizeMap.mobile}px)`)
          .with("tablet", () => `@media (min-width: ${screenSizeMap.tablet}px)`)
          .with(
            "desktop",
            () => `@media (min-width: ${screenSizeMap.desktop}px)`,
          )
          .exhaustive();
      },
      down: (size: ScreenSize) => {
        return match(size)
          .with(
            "mobile",
            () => `@media (max-width: ${screenSizeMap.mobile - 1}px)`,
          )
          .with(
            "tablet",
            () => `@media (max-width: ${screenSizeMap.tablet - 1}px)`,
          )
          .with(
            "desktop",
            () => `@media (max-width: ${screenSizeMap.desktop - 1}px)`,
          )
          .exhaustive();
      },
    },
  };
};

export const lightTheme: CustomTheme = getCustomTheme("light");
export const darkTheme: CustomTheme = getCustomTheme("dark");

if (settings.isDev) {
  // Nice little hack to make the theme available in the browser console
  // for easy searching and debugging in dev
  window.theme = {
    light: lightTheme,
    dark: darkTheme,
  };
}
