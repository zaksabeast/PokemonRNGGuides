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

const primaryColorScheme = {
  100: "#f8f0ff",
  200: "#f2e6ff",
  300: "#dbbdff",
  400: "#c194ff",
  500: "#a46bff",
  600: "#7e3ff2",
  700: "#5e2bcc",
  800: "#421ba6",
  900: "#2a0e80",
} as const;

type HexColor = `#${string}`;
type RGBColor = `rgb(${number}, ${number}, ${number})`;
type RGBAColor = `rgba(${number}, ${number}, ${number}, ${number})`;

type Color = HexColor | RGBColor | RGBAColor;

const isHexColor = (color: Color): color is HexColor => {
  return color.startsWith("#");
};

const hexToRgb = (hex: HexColor): RGBColor => {
  const bigint = parseInt(hex.slice(1), 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `rgb(${r}, ${g}, ${b})`;
};

const breakRgb = (rgb: RGBColor | RGBAColor): [number, number, number] => {
  const [r, g, b] = rgb
    .replace("rgb(", "")
    .replace(")", "")
    .split(",")
    .map(Number);
  return [r, g, b];
};

const addAlpha = (color: Color, alpha: number): RGBAColor => {
  const rgbColor = isHexColor(color) ? hexToRgb(color) : color;
  const [r, g, b] = breakRgb(rgbColor);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

const colors = {
  primary: primaryColorScheme[600],
  bgActive: primaryColorScheme[100],
  hover: primaryColorScheme[500],
  active: primaryColorScheme[700],
  primaryColorScheme,
} as const;

export type ThemeMode = "dark" | "light";

const getCustomTheme = (mode: ThemeMode): CustomTheme => {
  const algorithm =
    mode === "dark" ? themeTools.darkAlgorithm : themeTools.defaultAlgorithm;
  const tokens = themeTools.getDesignToken({
    algorithm,
  });
  return {
    token: {
      ...tokens,
      headerHeight: "64px",
      footerHeight: "58px",
      colorBgSupport: tokens.magenta1,
      colorBorderSupport: tokens.magenta5,
      colorFillSupportHover: tokens.magenta5,
      colorGreen: tokens.green8,
      colorRed: tokens.red6,
      colorAccent: tokens.magenta6,
      colorPrimary: primaryColorScheme[600],
      colorLink:
        mode === "dark" ? primaryColorScheme[400] : primaryColorScheme[600],
      colorPrimaryBorder: colors.primary,
      colorPrimaryActive: colors.active,
      colorPrimaryHover: colors.hover,
      colorPrimaryBg: colors.bgActive,
      controlItemBgActive:
        mode === "dark"
          ? addAlpha(primaryColorScheme[100], 0.1)
          : primaryColorScheme[100],
      colorLinkActive: colors.active,
      colorLinkHover: colors.hover,
      controlItemBgHover: "rgba(0, 0, 0, 0.04)",
    },
    components: {
      Menu: {
        subMenuItemSelectedColor:
          mode === "dark" ? primaryColorScheme[400] : primaryColorScheme[600],
        itemSelectedColor:
          mode === "dark" ? primaryColorScheme[300] : primaryColorScheme[600],
      },
      Layout: {
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
