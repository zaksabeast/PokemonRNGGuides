import React from "react";
import { ConfigProvider } from "antd";
import { ThemeProvider as EmotionThemeProvider } from "@emotion/react";
import { getTheme } from "~/theme";

// This controls things like a radiating glow animation when clicking buttons
const DISABLED_WAVE = { disabled: true };

type Props = {
  children: React.ReactNode;
};

export const ThemeProvider = ({ children }: Props) => {
  const theme = getTheme();
  return (
    <EmotionThemeProvider theme={theme}>
      <ConfigProvider theme={theme} wave={DISABLED_WAVE}>
        {children}
      </ConfigProvider>
    </EmotionThemeProvider>
  );
};
