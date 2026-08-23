import React from "react";
import { ConfigProvider } from "antd";
import { ThemeProvider as EmotionThemeProvider } from "@emotion/react";
import { getTheme } from "~/theme";
import { emotionTheme } from "./emotion";
import { useAtom } from "jotai";
import { tempThemeColorAtom, useThemeMode } from "./tempThemeColor";

// This controls things like a radiating glow animation when clicking buttons
const DISABLED_WAVE = { disabled: true };

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
      <ConfigProvider theme={theme} wave={DISABLED_WAVE}>
        {children}
      </ConfigProvider>
    </EmotionThemeProvider>
  );
};
