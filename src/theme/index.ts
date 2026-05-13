import {
  // This is the only file where using the antd theme is okay
  // eslint-disable-next-line no-restricted-imports
  theme as themeTools,
  type ThemeConfig,
} from "antd";
import { type ThemeMode } from "./themeMode";

const primaryColor = "#9933ff";
export const metaTagThemeColor = "#722ed1";

type GetThemeProps = {
  /** Temporary theme color for experimental purposes */
  tempThemeColor?: string | null;
  /** Do not use at runtime. This is only when building dark mode styles. */
  UNSAFE_mode?: ThemeMode;
};

export const getTheme = ({
  tempThemeColor,
  UNSAFE_mode: mode = "light",
}: GetThemeProps = {}): ThemeConfig => {
  const isLightMode = mode === "light";
  const algorithm = isLightMode
    ? themeTools.defaultAlgorithm
    : themeTools.darkAlgorithm;

  const tokens = themeTools.getDesignToken({
    algorithm,
    token: {
      colorPrimary: tempThemeColor ?? primaryColor,
      colorLink: tempThemeColor ?? (isLightMode ? primaryColor : "#ad5cff"),
    },
  });

  const colorTextBase = "var(--ant-color-text-base)";
  const shadows = {
    boxShadow: `0 6px 16px 0 rgb(from ${colorTextBase} r g b 0.08),
  0 3px 6px -4px rgb(from ${colorTextBase} r g b 0.12),
  0 9px 28px 8px rgb(from ${colorTextBase} r g b 0.05)`,
    boxShadowSecondary: `0 6px 16px 0 rgb(from ${colorTextBase} r g b 0.08),
  0 3px 6px -4px rgb(from ${colorTextBase} r g b 0.12),
  0 9px 28px 8px rgb(from ${colorTextBase} r g b 0.05)`,
    boxShadowTertiary: `0 1px 2px 0 rgb(from ${colorTextBase} r g b 0.03),
      0 1px 6px -1px rgb(from ${colorTextBase} r g b 0.02),
      0 2px 4px 0 rgb(from ${colorTextBase} r g b 0.02)`,
  };

  return {
    cssVar:
      tempThemeColor == null ? { key: "_,:root,css-var-_R_397_" } : undefined,
    token: {
      ...tokens,
      ...shadows,
    },
    components: {
      Alert: {
        withDescriptionPadding: "12px 16px",
        lineHeight: 1.4,
      },
      Button: isLightMode
        ? undefined
        : {
            colorText: tokens.colorLink,
            primaryColor: "#111827",
          },
      Form: {
        itemMarginBottom: 6,
        labelHeight: "auto",
      },
      Layout: {
        headerHeight: "64px",
        headerBg: isLightMode ? "rgba(255, 255, 255, 0.6)" : "#000",
      },
      Menu: {
        subMenuItemSelectedColor: tokens.colorLink,
        itemSelectedColor: isLightMode ? "#6200ee" : tokens.colorText,
      },
    },
  };
};
