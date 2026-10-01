import React from "react";
import { ConfigProvider } from "antd";
import { ThemeProvider as EmotionThemeProvider } from "@emotion/react";
import { getTheme } from "~/theme";
import { emotionTheme } from "./emotion";
import { useAtom } from "jotai";
import { tempThemeColorAtom, useThemeMode } from "./tempThemeColor";

// This controls things like a radiating glow animation when clicking buttons
const DISABLED_WAVE = { disabled: true };

const TOOLTIP_CONFIG = {
  styles: {
    container: {
      color: "var(--ant-color-text)",
      // antd's default padding plus 4px
      padding:
        "calc(var(--ant-padding-sm) / 2 + 4px) calc(var(--ant-padding-xs) + 4px)",
      boxShadow:
        "0 2px 6px 0 rgb(0 0 0 / 0.16), 0 6px 20px 2px rgb(0 0 0 / 0.14)",
    },
  },
};

type Props = {
  children: React.ReactNode;
};

export const ThemeProvider = ({ children }: Props) => {
  const themeMode = useThemeMode();
  const [tempThemeColor] = useAtom(tempThemeColorAtom);
  const theme = getTheme({
    tempThemeColor,
    UNSAFE_mode: tempThemeColor == null ? undefined : themeMode,
  });

  return (
    <EmotionThemeProvider theme={emotionTheme}>
      <ConfigProvider
        theme={theme}
        wave={DISABLED_WAVE}
        tooltip={TOOLTIP_CONFIG}
      >
        {children}
      </ConfigProvider>
    </EmotionThemeProvider>
  );
};
