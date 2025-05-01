import {
  // This is the only file where using the antd theme is okay
  // eslint-disable-next-line no-restricted-imports
  theme as themeTools,
} from "antd";
import { ScreenSize, CustomTheme } from "@emotion/react";
import { match } from "ts-pattern";

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

export type ThemeMode = "light" | "dark";

export type ThemePalette = {
  mask: boolean;
  mode: ThemeMode;
  colorLink: string;
  colorPrimary: string;
  colorBgBase: string;
  colorTextBase: string;
  colorBrandSecondary: string;
  colorTextLightSolid: string;
};

export const themePalette = {
  light: {
    mask: false,
    mode: "light",
    colorPrimary: "#7e3ff2",
    colorLink: "#7e3ff2",
    colorBgBase: "#fff",
    colorTextBase: "#000",
    colorBrandSecondary: "#eb2f96",
    colorTextLightSolid: "#fff",
  },
  dark: {
    mask: true,
    mode: "dark",
    colorPrimary: "#7e3ff2",
    colorLink: "#7e3ff2",
    colorBgBase: "#000",
    colorTextBase: "#fff",
    colorBrandSecondary: "#c41d7f",
    colorTextLightSolid: "#000",
  },
} satisfies Record<ThemeMode, ThemePalette>;

export const getTheme = (config: ThemePalette): CustomTheme => {
  const { mode, mask, ...colors } = config;
  const isLightMode = mode === "light";
  const algorithm =
    mode === "light" ? themeTools.defaultAlgorithm : themeTools.darkAlgorithm;

  const tokens = themeTools.getDesignToken({
    algorithm,
    token: {
      colorBgBase: colors.colorBgBase,
      colorLink: colors.colorLink,
      colorPrimary: colors.colorPrimary,
      colorTextLightSolid: colors.colorTextLightSolid,
      colorTextBase: colors.colorTextBase,
    },
  });

  const secondaryTokens = themeTools.getDesignToken({
    algorithm,
    token: {
      colorPrimary: colors.colorBrandSecondary,
    },
  });

  return {
    token: {
      ...tokens,
      ...(mask
        ? { colorBrandSecondary: secondaryTokens.colorPrimary }
        : {
            colorBgBase: colors.colorBgBase,
            colorLink: colors.colorLink,
            colorPrimary: colors.colorPrimary,
            colorTextLightSolid: colors.colorTextLightSolid,
            colorTextBase: colors.colorTextBase,
            colorBrandSecondary: colors.colorBrandSecondary,
          }),
      colorBrandSecondaryHover: secondaryTokens.colorPrimaryHover,
      colorBrandSecondaryBg: secondaryTokens.colorPrimaryBg,
      colorBrandSecondaryBorder: secondaryTokens.colorPrimaryBorder,
    },
    components: {
      Menu: isLightMode
        ? {}
        : {
            itemSelectedBg: colors.colorBgBase,
            itemSelectedColor: colors.colorLink,
            subMenuItemSelectedColor: colors.colorLink,
          },
      Drawer: isLightMode
        ? {}
        : {
            colorBgElevated: colors.colorBgBase,
          },
      Layout: {
        headerHeight: "64px",
        headerBg:
          mode === "light"
            ? "rgba(255, 255, 255, 0.6)"
            : "rgba(255, 255, 255, 0.1)",
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
