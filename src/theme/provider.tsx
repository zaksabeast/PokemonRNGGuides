import React from "react";
import { ConfigProvider } from "antd";
import { ThemeProvider as EmotionThemeProvider } from "@emotion/react";
import { getTheme } from "~/theme";
import { useThemeMode } from "~/state/theme";

type Props = {
  children: React.ReactNode;
};

export const ThemeProvider = ({ children }: Props) => {
  const [themeMode] = useThemeMode();
  const theme = React.useMemo(() => getTheme(themeMode), [themeMode]);
  return (
    <EmotionThemeProvider theme={theme}>
      <ConfigProvider theme={theme}>{children}</ConfigProvider>
    </EmotionThemeProvider>
  );
};
