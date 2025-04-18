import {
  // This is the only file where using the antd theme is okay
  // eslint-disable-next-line no-restricted-imports
  theme as themeTools,
} from "antd";
import { Theme, ScreenSize, CustomTheme } from "@emotion/react";
import { merge } from "lodash-es";
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

const defaultToken = themeTools.getDesignToken();

const customTheme: CustomTheme = {
  token: {
    headerHeight: "64px",
    footerHeight: "58px",
    colorBgSupport: defaultToken.magenta1,
    colorBorderSupport: defaultToken.magenta5,
    colorFillSupportHover: defaultToken.magenta5,
    colorGreen: defaultToken.green8,
    colorRed: defaultToken.red6,
  },
  mediaQueries: {
    up: (size: ScreenSize) => {
      return match(size)
        .with("mobile", () => `@media (min-width: ${screenSizeMap.mobile}px)`)
        .with("tablet", () => `@media (min-width: ${screenSizeMap.tablet}px)`)
        .with("desktop", () => `@media (min-width: ${screenSizeMap.desktop}px)`)
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
};

const colors = {
  primary: primaryColorScheme[600],
  bgActive: primaryColorScheme[100],
  hover: primaryColorScheme[500],
  active: primaryColorScheme[700],
  primaryColorScheme,
} as const;

const tokenOverrides = {
  colorPrimary: colors.primary,
  colorLink: colors.primary,
  colorPrimaryBorder: colors.primary,
  colorPrimaryActive: colors.active,
  colorPrimaryHover: colors.hover,
  colorPrimaryBg: colors.bgActive,
  controlItemBgActive: colors.bgActive,
  colorLinkActive: colors.active,
  colorLinkHover: colors.hover,
  controlItemBgHover: "rgba(0, 0, 0, 0.04)",
  colorFillSecondary: defaultToken.magenta6,
} satisfies Partial<Theme["token"]>;

export const antdTheme: Theme = {
  token: merge(defaultToken, tokenOverrides, customTheme.token),
  mediaQueries: customTheme.mediaQueries,
};

if (settings.isDev) {
  // Nice little hack to make the theme available in the browser console
  // for easy searching and debugging in dev
  window.theme = antdTheme;
}
