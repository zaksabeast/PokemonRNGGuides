import {
  // This is the only file where using the antd theme is okay
  // eslint-disable-next-line no-restricted-imports
  theme as themeTools,
  type ThemeConfig,
} from "antd";
import { type ThemeMode } from "./themeMode";
import { AliasToken } from "antd/es/theme/internal";

export const metaTagThemeColor = "#0B7A9C";
const lightModetokens: Partial<AliasToken> = {
  colorPrimary: "#0B7A9C",
  colorPrimaryHover: "#1592B8",
  colorPrimaryActive: "#065A76",
  colorPrimaryBorder: "#7CCBE6",
  colorPrimaryBorderHover: "#4DB3D6",
  colorPrimaryBg: "#BEE9F7",
  colorPrimaryBgHover: "#CFF0FA",

  colorBgBase: "#F6FBFB",
  colorBgLayout: "#EEF4F4",
  colorBgContainer: "#FFFFFF",
  colorBgElevated: "#F4F9F9",
  colorBgSpotlight: "#E6EEEE",

  colorFillQuaternary: "#EEF4F4",
  colorFillTertiary: "#E6EEEE",
  colorFillSecondary: "#D0E9F3",
  colorFill: "#D5DEDE",

  colorBorder: "#9AA5A5",
  colorBorderSecondary: "#C4D0D0",
  colorSplit: "#C4D0D0",

  colorTextBase: "#191C1C",
  colorText: "#191C1C",
  colorTextSecondary: "#3F4949",
  colorTextTertiary: "#6F7979",
  colorTextQuaternary: "#9AA5A5",
  // ~5:1 on colorFillTertiary, but still dimmer than colorTextSecondary
  colorTextDisabled: "#4D5E5E",

  colorSuccess: "#2A9D4F",
  colorSuccessBg: "#DDF5E5",
  colorSuccessBorder: "#7FD09A",
  colorWarning: "#D48806",
  colorWarningBg: "#FFF0B8",
  colorWarningBorder: "#F5C842",
  colorError: "#E5383B",
  colorErrorBg: "#FFE0DE",
  colorErrorBgHover: "#FFD0CD",
  colorErrorBorder: "#FF9A96",
  colorInfo: "#1668DC",
  colorInfoBg: "#D6EAFF",
  colorInfoBorder: "#6FB3FF",

  colorFillContentHover: "#E6EEEE",

  colorLink: "#0B7A9C",
  colorLinkHover: "#1592B8",
  colorLinkActive: "#065A76",

  fontFamily: "Roboto, 'Helvetica Neue', Arial, sans-serif",
  borderRadius: 20,
  controlHeight: 40,
  controlHeightLG: 56,
};

const darkModetokens: Partial<AliasToken> = {
  colorPrimary: "#4FC8F0",
  colorPrimaryHover: "#74D6F5",
  colorPrimaryActive: "#A8E8FA",
  colorPrimaryBorder: "#0B7A9C",
  colorPrimaryBorderHover: "#1592B8",
  colorPrimaryBg: "#0B5A78",
  colorPrimaryBgHover: "#0F6E90",

  colorBgBase: "#0E1415",
  colorBgLayout: "#0E1415",
  colorBgContainer: "#151C1D",
  colorBgElevated: "#1B2324",
  colorBgSpotlight: "#2E3838",

  colorFillQuaternary: "#202829",
  colorFillTertiary: "#2B3536",
  colorFillSecondary: "#2E4658",
  colorFill: "#2E4658",

  colorBorder: "#899393",
  colorBorderSecondary: "#3F4949",
  colorSplit: "#3F4949",

  colorTextBase: "#DEE4E4",
  colorText: "#DEE4E4",
  colorTextSecondary: "#BEC8C8",
  colorTextTertiary: "#899393",
  colorTextQuaternary: "#55605F",
  // ~5:1 on colorFillTertiary, but still dimmer than colorTextSecondary
  colorTextDisabled: "#A5B0B0",

  colorSuccess: "#6ADB8E",
  colorSuccessBg: "#12351F",
  colorSuccessBorder: "#2C7A47",
  colorWarning: "#F5B93A",
  colorWarningBg: "#3D2E0A",
  colorWarningBorder: "#8A6414",
  colorError: "#FF7B80",
  colorErrorBg: "#3F1618",
  colorErrorBgHover: "#4F1D20",
  colorErrorBorder: "#8F3438",
  colorInfo: "#5AA2FF",
  colorInfoBg: "#10294D",
  colorInfoBorder: "#2A5FA8",

  colorFillContentHover: "#2B3536",

  colorLink: "#4FC8F0",
  colorLinkHover: "#A8E8FA",
  colorLinkActive: "#A8E8FA",

  fontFamily: "Roboto, 'Helvetica Neue', Arial, sans-serif",
  borderRadius: 20,
  controlHeight: 40,
  controlHeightLG: 56,
};

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
    token: isLightMode ? lightModetokens : darkModetokens,
  });

  // Dark mode text is near-white, so shadows based on it glow instead of darken
  const shadowColor = isLightMode ? "var(--ant-color-text-base)" : "#000000";
  const shadows = {
    boxShadow: `0 6px 16px 0 rgb(from ${shadowColor} r g b / 0.08),
  0 3px 6px -4px rgb(from ${shadowColor} r g b / 0.12),
  0 9px 28px 8px rgb(from ${shadowColor} r g b / 0.05)`,
    boxShadowSecondary: `0 6px 16px 0 rgb(from ${shadowColor} r g b / 0.08),
  0 3px 6px -4px rgb(from ${shadowColor} r g b / 0.12),
  0 9px 28px 8px rgb(from ${shadowColor} r g b / 0.05)`,
    boxShadowTertiary: `0 1px 2px 0 rgb(from ${shadowColor} r g b / 0.03),
      0 1px 6px -1px rgb(from ${shadowColor} r g b / 0.02),
      0 2px 4px 0 rgb(from ${shadowColor} r g b / 0.02)`,
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
      Breadcrumb: {
        itemColor: tokens.colorTextLabel,
        lastItemColor: tokens.colorTextLabel,
        separatorMargin: 4,
      },
      Button: {
        defaultBorderColor: tokens.colorBorder,
        defaultBg: tokens.colorBgElevated,
        defaultHoverBg: tokens.colorBgElevated,
        defaultActiveBg: tokens.colorBgElevated,
        colorBgContainerDisabled: tokens.colorFillTertiary,
        borderColorDisabled: tokens.colorFillTertiary,
        primaryColor: isLightMode ? "#FFFFFF" : "#003546",
        primaryShadow: "none",
        defaultShadow: "none",
      },
      Card: {
        borderRadiusLG: 12,
      },
      Form: {
        itemMarginBottom: 6,
        labelHeight: "auto",
      },
      Input: {
        activeBorderColor: tokens.colorPrimary,
        hoverBorderColor: tokens.colorTextBase,
      },
      Layout: {
        headerHeight: 64,
        headerBg: tokens.colorBgLayout,
        siderBg: tokens.colorBgLayout,
        bodyBg: isLightMode ? tokens.colorBgBase : tokens.colorBgContainer,
      },
      Menu: {
        itemSelectedBg: isLightMode
          ? tokens.colorFillSecondary
          : tokens.colorFillQuaternary,
        itemSelectedColor: isLightMode ? "#0B2E3A" : tokens.colorPrimary,
        subMenuItemBg: tokens.colorBgLayout,
        itemMarginBlock: 2,
        itemHeight: 48,
        itemBg: tokens.colorBgLayout,
        colorSplit: tokens.colorBgLayout,
        itemBorderRadius: 28,
        borderRadiusLG: 28,
      },
      Radio: isLightMode
        ? {
            buttonCheckedBg: tokens.colorPrimaryBg,
            colorPrimary: tokens.colorPrimaryActive,
          }
        : {},
      Splitter: {
        splitBarDraggableSize: 100,
        splitBarSize: 4,
        splitTriggerSize: 10,
      },
      Tag: {
        defaultBg: tokens.colorPrimaryBg,
        defaultColor: isLightMode ? "#04475F" : tokens.colorLinkHover,
      },
    },
  };
};
