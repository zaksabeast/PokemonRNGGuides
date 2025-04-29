import { ConfigProvider } from "antd";
import { ThemeProvider as EmotionThemeProvider } from "@emotion/react";
import { lightTheme, darkTheme } from "~/theme";
import { useThemeMode } from "~/state/theme";

type Props = {
  children: React.ReactNode;
};

export const ThemeProvider = ({ children }: Props) => {
  const [themeMode] = useThemeMode();
  const theme = themeMode === "dark" ? darkTheme : lightTheme;
  return (
    <EmotionThemeProvider theme={theme}>
      <ConfigProvider theme={theme}>{children}</ConfigProvider>
    </EmotionThemeProvider>
  );
};
